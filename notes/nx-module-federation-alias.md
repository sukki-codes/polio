# Nx + Module Federation에서 path alias를 전체 적용할 수 없는 이유

## TL;DR

Nx 모노레포 + Webpack Module Federation 구조에서, 각 앱(host/mfe1/mfe2/case-box/patient)이 자기 내부 파일 참조에 `@components/*`, `@layouts/*`, `@pages/*` 같은 **범용 이름의 path alias**를 쓰면, 그 파일이 Module Federation의 remote-entry 체인을 통해 **다른 앱의 tsc가 함께 훑는 대상**이 될 경우 타입체크가 깨진다. 원인은 TypeScript의 `paths` 해석이 "그 파일을 소유한 프로젝트의 alias 테이블"이 아니라 "그 파일을 지금 읽고 있는(entry point로 삼은) 프로젝트의 alias 테이블"을 기준으로 이뤄지기 때문이다. 같은 이름(`@layouts/*` 등)을 모든 앱이 각자 다른 폴더에 매핑해서 재사용하고 있어서, 남의 파일을 내 alias 테이블로 잘못 해석해버리는 충돌이 발생한다.

이건 런타임(브라우저)에는 영향이 없다 — 각 MFE는 자기 자신의 webpack으로 독립적으로 빌드/서빙되고, host는 그 결과물을 네트워크로 로드할 뿐이라 alias 충돌이 번들링 단계엔 안 끼어든다. **오직 `tsc`/CI 타입체크에서만 터진다.**

## 배경

- Nx 모노레포, 5개 앱(`host`, `mfe1`, `mfe2`, `case-box`, `patient`)이 Webpack Module Federation으로 연결됨.
- host의 `tsconfig.json`은 다른 앱들을 이렇게 타입 레벨로 참조한다:
  ```json
  "mfe2/Module": ["../../apps/mfe2/src/remote-entry.ts"]
  ```
- 각 앱은 자기 내부용으로 동일한 이름의 alias를 반복 정의한다 (예: `apps/host/tsconfig.json`과 `apps/mfe2/tsconfig.json` 둘 다 `"@layouts/*"`를 갖고 있지만, 각각 `apps/host/src/layouts/*`, `apps/mfe2/src/layouts/*`로 서로 다른 곳을 가리킴).

## 재현 과정

1. `apps/mfe2/src/routes/_mainLayout/case-box.tsx`류 파일에서 상대경로 import(`../../pages/CaseBoxPage`)를 alias(`@pages/CaseBoxPage`)로 바꿔도 되는지 궁금해서 시작.
2. `apps/mfe2`의 상대경로 import들을 전부 이미 정의돼 있던 alias(`@components/*`, `@layouts/*`, `@pages/*`, `@hooks/*`)로 치환 + `@context/*` alias 신규 추가.
3. `apps/mfe2/tsconfig.json` 단독 기준 `tsc --noEmit`은 통과.
4. 그런데 `apps/host/tsconfig.json` 기준 `tsc --noEmit`을 돌리면 아래 에러 발생:
   ```
   apps/mfe2/src/app/module.tsx(3,24): error TS2307: Cannot find module '@layouts/MainLayout' or its corresponding type declarations.
   apps/mfe2/src/app/module.tsx(4,18): error TS2307: Cannot find module '@pages/Main' or its corresponding type declarations.
   ```
5. 상대경로로 되돌리면 host의 tsc가 다시 깨끗해짐 → alias 전환이 원인임을 확정.

## 원인 메커니즘

- `apps/host/src/routes/mfe2.tsx`가 `import('mfe2/Module')`로 mfe2를 동적 로드한다.
- host의 tsc가 이 타입을 확인하려고 host tsconfig의 `"mfe2/Module"` 매핑을 따라 `apps/mfe2/src/remote-entry.ts`를 읽고, 거기서 다시 `module.tsx` → `MainLayout.tsx`/`Main.tsx` → ... 로 이어지는 **mfe2의 소스 파일들을 전부 host와 같은 컴파일 컨텍스트 안에서** 훑는다.
- 이때 `module.tsx` 안의 `import MainLayout from '@layouts/MainLayout'`을 resolve하는 주체는 "이 컴파일을 시작한 tsconfig" = host의 tsconfig다. host의 `@layouts/*`는 `apps/host/src/layouts/*`를 가리키므로, mfe2가 기대한 `apps/mfe2/src/layouts/*`가 아니라 host 자신의 폴더에서 `MainLayout`을 찾다가 실패한다.
- 상대경로(`../layouts/MainLayout`)였다면 이런 문제가 없다 — 상대경로는 누가 resolve하든 항상 파일시스템상의 같은 위치를 가리키기 때문.

## 어디까지 안전한가 (reachability 분석)

이 문제는 **remote-entry.ts에서 시작하는 import 트리에 실제로 포함된 파일에만** 해당한다. mfe2를 예로 실제 조사한 결과:

- `remote-entry.ts` → `module.tsx` (host가 federation으로 가져다 쓰는 진입점)
  - → `MainLayout.tsx`, `Main.tsx` → `Navigator`, `GraphicsContainer`, 각종 `*Mode.tsx`, `context/*`, `hooks/*` 등 **사실상 앱 기능 코드 거의 전부**
- `main.ts` → `bootstrap.tsx` → `app.tsx` → `router.ts` → `routes/*.tsx` (mfe2를 **독립 실행**할 때만 쓰는 자체 라우터, host는 절대 안 건드림)

즉 "alias를 써도 안전한 파일"은 **federation으로 노출되지 않는, 그 앱을 단독 실행할 때만 쓰이는 코드**(주로 라우트 등록 파일)뿐이다. 이번 케이스에서는 18개 후보 파일 중 딱 2개(`routes/_mainLayout.tsx`, `routes/_mainLayout/main.tsx`)만 안전했고, 나머지 16개는 전부 remote-entry 체인에 걸려 상대경로로 되돌려야 했다.

## 별개의 문제: `@libs/*` 공유 라이브러리는 런타임 싱글턴이 안 된다

이건 위 문제와 원인이 다르지만 같은 "왜 alias를 다 못 쓰나" 계열의 질문에서 같이 나온 이슈라 기록.

- `@libs/api`, `@libs/stores`, `@libs/components` 등은 `libs/*/src/index.ts` **소스 파일로 직접 resolve**되는 alias다.
- Module Federation의 `shared` 싱글턴 메커니즘(`tools/module-federation/shared-config.ts`)은 `react`, `react-dom`, `@emotion/*` 같은 **진짜 npm 패키지**만 등록돼 있고, `@libs/*`는 등록되어 있지 않다.
- 그 결과 `@libs/*`는 각 앱(host/mfe1/mfe2/case-box/patient)의 번들에 **소스가 그대로 인라인**되어, 코드는 공유되지만 **런타임 인스턴스는 앱마다 별도**다.
- 그래서 `@libs/stores`의 Jotai atom처럼 "상태"를 갖는 모듈을 여러 앱에서 같은 상태로 기대하고 쓰면 안 된다 (host에서 바뀐 상태가 mfe2 번들의 atom엔 반영 안 됨). `@libs/utils`처럼 순수 함수만 있는 모듈은 문제 없음.
- 이 리포에서 실제 채택한 해법: 진짜로 런타임 싱글턴이 필요한 라이브러리(`react-use`, `react-components`, `renderer` 등)는 아예 `@medit-platform/*`라는 **퍼블리시된 npm 패키지**로 분리해서 `package.json`의 일반 dependency + module federation `shared`에 등록해서 쓴다.

## 결론 / 앞으로 참고할 것

1. **remote-entry(federation 진입점)에서 도달 가능한 파일**은 앱 이름을 안 타는 범용 alias(`@components/*`, `@pages/*` 등)를 쓰면 안 된다 — 다른 앱의 tsc가 그 파일을 훑을 때 자기 alias 테이블로 잘못 resolve해서 깨진다. 이런 파일은 상대경로를 유지한다.
2. 앱을 **독립 실행할 때만** 쓰이는 코드(자체 라우터 등, host/다른 remote가 절대 안 건드리는 파일)는 alias를 써도 안전하다.
3. 만약 전체를 alias화하고 싶다면 두 가지 방법이 있으나 둘 다 별도 설계 검토가 필요하다:
   - 앱 이름을 alias 자체에 네임스페이스로 박기 (`@mfe2-layouts/*`처럼) — 충돌은 피하지만, host를 포함한 **모든 소비 측 tsconfig가 그 앱의 alias까지 알아야** 해서 설정 중복/유지보수 비용이 커진다.
   - 진짜 npm 패키지로 승격 (기존에 `@medit-platform/*`에 이미 쓰고 있는 패턴) — 가장 근본적이지만 퍼블리시 파이프라인이 필요.
4. "상태를 앱 간에 공유해야 하는 라이브러리"(`@libs/stores` 등)는 alias 문제와 별개로, Module Federation의 `shared` 싱글턴 등록 여부부터 확인해야 한다 — 안 돼 있으면 alias를 아무리 잘 써도 상태는 앱마다 분리된다.
