# 학습 로그 (raw)

> 커밋 안 하는 개인 메모. 나중에 괜찮은 내용은 `/blog`(TIL / Deep Dive / 회고)로 다듬어서 옮길 것.
> 회사/집 두 군데서 작업하는 내용은 각자 쌓아뒀다가 나중에 수동으로 합칠 예정.

## 2026-07-02

### Next.js 16: `middleware.ts` → `proxy.ts`
- Next 16부터 `middleware.ts`가 `proxy.ts`로 이름이 바뀜(기능은 동일, "네트워크 경계/라우팅"이라는 역할을 더 명확히 하려는 리네이밍).
- `edge` 런타임은 `proxy`에서 지원 안 함 — `proxy`는 항상 `nodejs` 런타임. edge가 꼭 필요하면 아직은 `middleware`를 유지해야 함.
- default export 이름은 `proxy`로 바꾸는 걸 권장하지만, `export default` 형태면 함수명이 뭐든 동작은 함 (`next-intl`의 `createMiddleware()` 리턴값을 그냥 default export해도 문제없음).
- 이런 breaking change가 있다는 걸 몰랐으면 라이브러리 문서만 보고 삽질했을 듯 — Next 버전 업그레이드 가이드(`node_modules/next/dist/docs/.../upgrading/version-16.md`)를 먼저 훑는 습관이 도움이 됨.

### SVG 아이콘: 정적 sprite vs 런타임 Portal 주입
- 아이콘 시스템 짤 때 두 가지 큰 방향이 있음:
  1. 빌드타임에 `<symbol>` 모아서 단일 `sprites.svg` 정적 파일 생성 → `<svg><use href="/sprites.svg#id" /></svg>`로 참조. 서버 컴포넌트로 렌더링 가능, SSR에 바로 보임, 브라우저가 파일 한 번만 캐싱.
  2. 런타임에 React Portal로 심볼들을 DOM에 주입(`SvgSpritePortal` 패턴) → client mount가 필수라 SSR 이점이 사라지고 첫 렌더에 깜빡임(FOIC) 가능성 있음.
- Next.js 앱이 Server Component 중심 설계를 지향한다면 1번이 훨씬 잘 맞음.
- 번들러가 dev/build에서 다르면(Webpack vs Turbopack처럼) SVGR 같은 "svg를 컴포넌트로 import" 방식은 로더 설정을 두 번 관리해야 해서 부담 — 정적 sprite 방식은 번들러 로더가 아예 필요 없어서 이 문제를 통째로 피해감.

### Node 24는 TypeScript를 네이티브로 실행함
- `ts-node`, `tsx` 같은 트랜스파일러 없이 `node scripts/foo.mts` 그대로 실행 가능 (Node의 타입 스트리핑 지원).
- 빌드 스크립트를 `.mjs` 대신 `.ts`/`.mts`로 짜면 `tsc --noEmit` 타입체크 대상에도 자동으로 들어가서 안전망이 하나 더 생김.

### next-intl 라이브러리 선정 근거
- `next-i18next`는 원래 Pages Router용이라 App Router 지원이 v16에서야 생겼고 `i18next`/`react-i18next` 의존성이 추가로 붙음.
- `next-intl`은 App Router 전용 설계라 RSC 네이티브 지원, 의존성 가벼움. `npm view <pkg> peerDependencies`로 Next 16 지원 여부를 사전에 확인하는 습관 유용함.

### next-intl `localePrefix` 3가지 전략
- `always`: 모든 언어에 프리픽스 (`/ko/about`, `/en/about`). next-intl v3부터 기본값이 이걸로 바뀜.
- `as-needed`: 기본 언어만 프리픽스 생략, 나머지는 프리픽스 유지. **주의**: 명시적으로 `locale`을 넘기는 네비게이션(예: 언어 스위처의 `router.replace(path, {locale})`)은 `localePrefix` 설정과 무관하게 항상 프리픽스를 강제로 붙이는 라이브러리 내부 동작이 있음(공식 소스 코드 주석에 명시됨, 이슈 #2020 참고). 그래서 기본 언어로 전환할 때 `/ko`를 거쳤다가 미들웨어가 다시 `/`로 리다이렉트하는 불필요한 한 단계가 생김 → `getPathname()`으로 직접 경로 계산해서 우회 가능.
- `never`: URL에 언어 정보가 아예 없음. locale은 `NEXT_LOCALE` 쿠키 + 최초 방문 시 `Accept-Language`로만 판단, 미들웨어가 내부적으로만 rewrite. **트레이드오프**: 언어별 별도 URL이 없어서 검색엔진이 ko/en을 따로 색인 못 함 (다국어 SEO 불리).
- "다른 사이트들도 언어 바꾸면 URL이 그대로인 경우가 흔한가?" → 오히려 그 반대(모든 언어에 프리픽스 붙이는 `always`가 next-intl 자체 기본값)라, `never`를 쓰는 건 SEO보다 UX 일관성(같은 URL 공유 등)을 우선하는 선택에 가까움.

### `next-themes` + React 19 콘솔 에러 (알려진 이슈, 우리 코드 문제 아님)
- `next-themes`가 FOUC 방지용으로 hydration 전에 `<script>` 태그를 직접 주입하는데, React 19부터 컴포넌트 트리 안의 `<script>` 태그에 일괄 경고를 띄우기 시작함 → "Encountered a script tag while rendering React component" 콘솔 에러.
- 실제로는 SSR 시점에 스크립트가 정상 동작해서 다크모드 자체엔 문제 없는 false positive. `next-themes` 레포가 오래 방치돼서 자체 수정 가능성 낮음.
- Next.js 16.2의 `browserToTerminal` 기능 때문에 브라우저 콘솔 에러가 터미널에도 그대로 찍혀서 전보다 눈에 잘 띔.
- 관련 이슈: pacocoursey/next-themes#385, #387, shadcn-ui/ui#10200

### 워크스페이스 루트 오탐 경고
- `npm run dev` 실행할 때마다 "Next.js inferred your workspace root..." 경고가 뜨는데, 원인은 홈 디렉토리(`/Users/medit`)에 이 프로젝트와 무관한 `package.json`/`package-lock.json`이 따로 있어서 Next가 그쪽을 workspace root로 잘못 추론한 것. `outputFileTracingRoot`로 명시하거나 홈 디렉토리의 파일을 정리하면 해결될 듯 (아직 미해결).

## 2026-07-03

### next-intl: `setRequestLocale` 없으면 `generateStaticParams` 있어도 동적 렌더링으로 강등됨
- `generateStaticParams`로 `/ko`, `/en` 경로를 미리 뽑아내도, layout/page 안에서 `getTranslations()` 같은 next-intl 서버 API를 부를 때 `setRequestLocale(locale)`을 안 호출하면 next-intl이 `next/headers`(요청 헤더)에서 locale을 읽으려는 fallback 경로를 탐. Next.js는 `headers()`/`cookies()`에 접근하는 순간 그 라우트를 동적 렌더링으로 취급하므로, `generateStaticParams`가 있어도 실제로는 매 요청마다 서버에서 다시 렌더링되고 있었음.
- 근거: next-intl 소스 `RequestLocale.js` — `setRequestLocale`을 안 쓰면 요청 시점에 헤더에서 locale을 읽는 경로를 탐.
- 해결: locale을 쓰는 layout/page마다 `params`에서 locale을 받은 직후 `setRequestLocale(locale)` 호출.
- 확인 방법: `next build` 로그에서 라우트 앞에 `●`(SSG, `generateStaticParams` 사용)가 붙는지 `ƒ`(동적)가 붙는지로 바로 확인 가능. 코드가 그럴듯해 보여도 내부적으로 헤더/쿠키를 건드리는 순간 조용히 동적으로 바뀔 수 있어서, i18n 라이브러리 붙일 땐 항상 빌드 로그로 직접 확인하는 습관이 필요함.

### `generateMetadata`로 로케일별 SEO — 알아둘 것들
- 정적 `export const metadata = {...}`와 `generateMetadata()` 함수는 같은 라우트 세그먼트에서 동시에 export 불가. 값이 요청/로케일에 따라 달라져야 하면 `generateMetadata`로 가야 함.
- 메타데이터는 root layout → 하위 layout → page 순서로 평가되고 **얕은 병합(shallow merge)** 됨 — 같은 키(`title`, `openGraph` 등)를 하위 세그먼트가 정의하면 부분 필드만 덮어쓰는 게 아니라 그 키 통째로 교체됨. 나중에 `/projects/[slug]` 같은 하위 페이지에 개별 title을 넣으면 상위에서 설정한 `openGraph.description` 같은 게 통째로 사라질 수 있음 — 공유하고 싶은 필드는 별도 변수로 빼서 스프레드하는 패턴이 필요.
- `Metadata` 네임스페이스 값을 가져올 때 `generateMetadata` 안에서는 `getTranslations({ locale, namespace })`처럼 locale을 명시적으로 넘겨야 함. page 컴포넌트에서 쓰는 `getTranslations('Hero')`(인자 없이 네임스페이스만)는 `setRequestLocale`이 세팅해둔 요청 컨텍스트에 의존하는데, `generateMetadata`는 그 컨텍스트가 아직 없을 수 있어 params에서 받은 locale을 직접 넘기는 게 안전함.
- Cache Components(`cacheComponents` 설정)를 켜면 `generateMetadata`가 `params`/`cookies()`/`headers()` 같은 런타임 값에 접근하는 순간 "런타임 의존"으로 취급되어, 나머지 페이지가 완전히 정적일 땐 빌드 에러가 남(의도한 동작인지 명시하라는 경고). 지금 프로젝트는 `cacheComponents`가 꺼져 있어서 해당 없지만, 나중에 켜면 이 부분 다시 확인 필요.

## 2026-07-07

### `next-themes` 콘솔 에러의 실제 원인과 정식 수정안
- 원인: `ThemeScript`(next-themes 내부 컴포넌트)가 SSR 때 FOUC 방지용으로 만든 `<script>`를 클라이언트 렌더링 시에도 그대로 다시 생성해서 React 19가 경고를 띄움. 스크립트는 hydration 전에 이미 한 번 실행됐으므로 클라이언트에서 다시 만들 필요가 없는 게 핵심.
- 메인테이너 쪽에 머지 대기 중인 정식 수정([pacocoursey/next-themes#386](https://github.com/pacocoursey/next-themes/pull/386))이 있음 — `typeof window !== 'undefined'`일 때 `null` 반환하는 한 줄이 전부.
- 라이브러리가 방치 상태라 정식 릴리스를 못 기다릴 땐 `patch-package`로 이 수정을 그대로 로컬에 적용하는 게, 통째로 교체/재구현하는 것보다 리스크가 훨씬 작음.
- **주의**: 업스트림 이슈 댓글 중 `@teispace/next-themes`라는 "drop-in replacement" 패키지 설치 + codemod 실행을 권하는 게 있었는데, 이모지 헤더/과장된 문구 등 전형적인 자기홍보·스팸 패턴이라 무시함. 출처 불분명한 패키지를 설치하고 `src/` 전체에 codemod를 돌리라는 제안은 공급망 리스크로 보고 거름.

### `git stash`는 `node_modules`를 되돌리지 않는다
- 패치 적용 전/후를 비교하려고 `git stash`로 `package.json` 변경을 되돌려도, `node_modules` 안의 실제 파일은 전혀 안 바뀜. 게다가 `postinstall` 스크립트로 `patch-package`를 등록해두면, `rm -rf node_modules && npm install`로 완전히 재설치해도 postinstall이 패치를 자동으로 다시 적용해버려서 "패치 없는 원본 상태" 재현 자체가 안 됨.
- 즉 이 방식의 재현 테스트는 "버그가 원래 없었다"를 증명하지 못하고, "패치가 다시 씌워졌다"와 구분이 안 됨. 원본 동작을 정말 확인하려면 `postinstall` 스크립트 자체를 빼거나 `--ignore-scripts`로 설치해야 함.

### 이 프로젝트 Next.js 문서에서 확인한 "SSR에서만 렌더링" 패턴
- `node_modules/next/dist/docs`(커스텀 Next 버전 문서)의 CSS-in-JS 가이드에 `if (typeof window !== 'undefined') return <>{children}</>` 같은 패턴이 공식적으로 나옴 (styled-components 레지스트리 예제). next-themes PR #386이 쓴 수정과 동일한 패턴이라, 이게 이 Next 버전에서도 정석으로 취급되는 접근임을 확인.

## 2026-07-08

### vanilla-extract의 Next 플러그인은 Turbopack 미지원 (Webpack 전용)
- `@vanilla-extract/next-plugin`으로 전체 스타일링을 마이그레이션했더니 `npm run dev`(강제로 `--webpack`)에서는 잘 되는데 `npm run build`(`next build`, Next 16 기본값 Turbopack)에서 `Styles were unable to be assigned to a file` 에러로 빌드가 깨짐.
- 원인: 이 플러그인은 순수 Webpack loader/config 확장이라 Turbopack 파이프라인에는 전혀 개입하지 못함. `.css.ts` 파일의 `style()`/`createGlobalTheme()` 호출이 빌드타임 매크로로 치환돼야 하는데 Turbopack에선 그 변환 자체가 안 일어남.
- 이 프로젝트는 dev/build가 서로 다른 번들러를 쓰는 구조라(SVG 스프라이트 항목 참고) 이런 "번들러 전용 플러그인"은 애초에 후보에서 제외해야 함 — `npm run build`까지 실제로 돌려봐야 확실히 검증됨(`npm run dev`만으로는 이 문제를 못 발견함).

### Tailwind v4의 `@theme`/`@utility`/`@layer`는 plain CSS로 거의 1:1 변환 가능
- `@theme { --x: y }` 블록은 사실 `:root { --x: y }`와 동일 — Tailwind가 값을 유틸리티 클래스 생성에도 쓴다는 점만 다르고, CSS 커스텀 프로퍼티 자체는 그대로.
- `@utility name { ... }`는 `.name { ... }`과 동일 — Tailwind가 트리쉐이킹/클래스 등록을 해준다는 차이뿐.
- `@layer base { ... }`는 Tailwind 전용 문법이 아니라 **표준 CSS Cascade Layers** 문법이라, Tailwind를 완전히 제거해도 그대로 쓸 수 있음.
- 즉 Tailwind v4 CSS-first 설정은 "빌드 스텝이 곁들여진 plain CSS"에 가까워서, 유틸리티 클래스 생성 기능만 걷어내면 나머지는 거의 그대로 옮겨감.

### CSS 미디어 쿼리 안의 `rem`은 페이지의 `font-size` 오버라이드를 안 따른다
- 이 프로젝트는 `:root { font-size: 62.5% }`로 1rem = 10px을 만들어 쓰는데, `@media (min-width: 64rem)`처럼 미디어 쿼리 조건 안에 rem을 쓰면 이 오버라이드가 적용되지 않고 **브라우저 기본값(보통 16px)** 기준으로 계산됨. `64rem`을 640px로 의도했다면 실제로는 1024px이 되어버림.
- CSS 스펙상 media feature의 length 값은 initial containing block 기준으로 resolve되기 때문 — 저자 스타일시트의 `:root` font-size는 미디어 쿼리 평가에 영향을 못 줌.
- 그래서 이 프로젝트에서는 미디어 쿼리 브레이크포인트를 rem이 아니라 `px`로 그대로 씀(`@media screen and (min-width: 640px)`) — 오히려 이게 Tailwind의 원래 브레이크포인트 동작과 정확히 일치함.

### CSS Modules로 Tailwind 유틸리티를 대체할 때 쓴 패턴들
- 색상 opacity 변형(Tailwind의 `bg-color/50` 같은 모디파이어)은 `color-mix(in srgb, var(--color-x) 50%, transparent)`로 대체.
- 공유 베이스 스타일 확장(예: 아이콘 placeholder ↔ 실제 버튼)은 CSS Modules 표준 기능인 `composes: base;` 로 처리 — 단 stylelint의 `property-no-unknown`이 `composes`를 표준 CSS로 인식 못 해서 `ignoreProperties`에 명시적으로 추가해야 함.
- `.module.css`는 JS에서 `styles.xxx`로 접근하기 때문에 클래스명을 camelCase로 쓰는 게 자연스러운데, stylelint-config-standard의 `selector-class-pattern` 기본값(kebab-case)과 충돌함 → `overrides`로 `*.module.css` 파일에만 별도 패턴 적용.

## 2026-07-10

### Next.js 16.2: `error.tsx`에 `unstable_retry` prop 추가
- 기존엔 `error.js`가 `{ error, reset }`만 받았는데, v16.2.0부터 `unstable_retry`가 추가됨. 공식 문서가 "대부분의 경우 `reset()` 대신 이걸 써라"라고 명시적으로 권장 — 세그먼트를 다시 fetch하고 다시 렌더링을 시도하는 쪽이고, `reset()`은 그냥 에러 상태만 지우고 다시 렌더링(refetch 없이)하는 차이가 있는 듯.
- `error.js`는 여전히 Client Component여야 하고(`'use client'` 필수), `generateMetadata`/`metadata` export가 안 됨 — 필요하면 React 19의 `<title>` 컴포넌트를 직접 렌더링하라고 안내함.

### `not-found.js`는 props를 전혀 못 받는다
- `params`조차 못 받음(공식 문서에 명시: "not-found.js or global-not-found.js components do not accept any props"). locale별 분기가 필요하면 `params`가 아니라 해당 세그먼트(`[locale]/layout.tsx`)가 이미 세워둔 request-scoped 컨텍스트(next-intl의 `getTranslations()`가 인자 없이도 동작하는 것과 동일한 원리)에 의존해야 함.

### `global-not-found.js` (experimental, v15.4.0~) — 루트가 동적 세그먼트인 경우를 위한 기능
- 일반 `app/not-found.tsx`는 어차피 루트 레이아웃 하위에서 렌더링되는데, 이 프로젝트처럼 **루트 레이아웃 자체가 `[locale]/layout.tsx`(최상위 동적 세그먼트)인 경우** 일관된 404를 구성하기 애매한 상황이 될 수 있음 — 공식 문서가 이 경우를 `global-not-found` 도입 사유 두 가지 중 하나로 명시적으로 예시함(나머지 하나는 root layout이 여러 개인 경우).
- `global-not-found.js`는 라우팅 레벨에서 처리되어 레이아웃/페이지 렌더링을 아예 안 타므로, `<html>`/`<body>`와 전역 스타일/폰트를 전부 직접 import해야 함(일반 not-found.js와 다른 점).
- 우리 프로젝트는 next-intl 미들웨어가 모든 경로를 내부적으로 `[locale]`이 붙은 경로로 rewrite해버려서, "`[locale]`에 전혀 도달 못 하는" 진짜 최상위 404가 실질적으로 안 생김 → 지금은 `[locale]/not-found.tsx`만으로 충분하다고 판단하고 `global-not-found`는 보류.

## 2026-07-15

### 프론트엔드 업계 최근 지형 변화 정리 (~2026-07 기준)
- 어디서 받은 "이번 주 헤드라인" 요약을 검색으로 팩트체크함. 내용 자체는 다 맞는데, 대부분 "이번 주" 소식이 아니라 최근 몇 달 사이 이미 자리 잡은 변화들이라 시점 프레이밍만 정정. 나중에 `/blog`로 옮길 때는 "이번 주 헤드라인"이 아니라 "최근 프론트엔드 지형 변화 정리"로 제목 잡을 것.
- **React Foundation 출범** — Linux Foundation 산하로 2026-02-24 공식 출범. React/React Native/JSX 등이 Meta 단독 소유에서 벗어남. Platinum 창립 멤버 8곳(Amazon, Callstack, Expo, Huawei, Meta, Microsoft, Software Mansion, Vercel). 기술 방향은 여전히 컨트리뷰터 중심(거버넌스와 기술 의사결정 분리). ([react.dev 공지](https://react.dev/blog/2026/02/24/the-react-foundation))
- **React 19.2** — 2025-10-01 릴리스. `<Activity />`(visible/hidden 모드로 안 보이는 화면을 미리 렌더링하거나 상태 보존), `useEffectEvent`(Effect 의존성 추적 밖에서 동작하는 콜백, `exhaustive-deps` 린트가 이제 인식함), React Compiler 연동 eslint 규칙(`eslint-plugin-react-hooks` flat config 기본화 + opt-in Compiler 규칙) 포함. ([react.dev 릴리스 노트](https://react.dev/blog/2025/10/01/react-19-2))
- **CRA(Create React App) 사실상 폐지** — 2025-02-14 공식 발표. 지금은 유지보수 모드(보안 패치/의존성 업데이트 없음). 신규 프로젝트는 Next.js/React Router/Expo 같은 프레임워크 또는 Vite/Parcel/Rsbuild 권장. ([react.dev 공지](https://react.dev/blog/2025/02/14/sunsetting-create-react-app))
- **Angular Zoneless + Vitest 기본화** — Angular 21(2025-11)부터 신규 프로젝트에 zone.js 없이 signal 기반 change detection, Vitest가 Jasmine/Karma 대체 기본값. Angular 22가 2026-06 최신 stable. React와의 "무거움" 격차가 좁혀졌다는 평가. ([Angular 21 정리](https://javascript-conference.com/blog/angular-21-signal-forms-zoneless-vitest/))
- **PPR(Partial Prerendering)** — Next.js 16(2025-10)에서 `experimental.ppr` 플래그가 제거되고 `cacheComponents: true`("Cache Components")로 재편되어 정식 stable. 원문엔 그냥 "PPR"이라고만 나오는데 실제 설정 이름이 바뀐 부분이라 우리 프로젝트(Next 16.2.x, `cacheComponents` 꺼둔 상태)에 나중에 켤 일 있으면 이 이름으로 찾아야 함. ([Next.js PPR 플랫폼 가이드](https://nextjs.org/docs/app/guides/ppr-platform-guide))
- **Vue는 "안정 성장"만은 아님** — 원문은 Vue를 "큰 구조 변화 없이 DX 집중"이라 했는데, 실제론 Vue 3.6 "Vapor Mode"(alien-signals 기반 반응성 시스템 전면 재설계)가 2026년 중 예정 — 이것도 꽤 큰 구조 변화라 과소평가된 서술.
- 이 정리 자체가 "이번 주 공부"로 받은 원문을 검증 없이 베낀 게 아니라 WebSearch로 날짜/버전 하나하나 확인한 결과라는 점 기록.

## 2026-07-16

### GeekNews(hada.io) 스크랩 2건

**「Machine Learning Study 혼자 해보기」** — [hada.io 토픽](https://news.hada.io/topic?id=31479) / [원문(GitHub)](https://github.com/teddylee777/machine-learning)
- Python 기초 → 수학/통계 → 전통 ML → 딥러닝 → LLM → 캐글 실전까지 단계별로 강의/블로그/논문 링크를 모아둔 큐레이션 레포. 여러 기여자가 계속 채워넣는 방식.
- 프론트엔드 쪽 일하면서 ML 기초를 다시 잡고 싶을 때 커리큘럼 순서 참고용으로 북마크해둘 만함. 지금 당장 볼 자료는 아니고, 나중에 AI 챗봇(이슈 #35, `/chat`) 작업할 때 RAG/임베딩 기초 다질 때 다시 볼 것.

### 「The Whispering Earring」(2012, Scott Alexander) + AI 위임 관련 HN 댓글 스레드

[원문](https://croissanthology.com/earring)

- SF 단편. 항상 "옳은" 조언을 속삭이는 귀걸이가 처음엔 인생의 큰 결정(진로, 관계)만 도와주다가 점점 근육 제어 같은 미세한 영역까지 잠식함. 착용자는 "비정상적으로 성공한" 삶을 살지만, 정작 뇌를 열어보면 신피질(이성)은 위축되고 반사 영역만 비대해져 있음.
- 핵심 반전: 위험은 귀걸이가 **틀려서**가 아니라 **항상 맞아서** 생김 — 맞으니까 매번의 위임이 국지적으로 합리적으로 보이고, 그래서 위임을 스스로 멈출 지점이 없어짐. 결말 논평도 냉소적: "우리 남은 자유의지는 우리가 잘나서가 아니라 우리가 어리석어서(완벽한 최적화 도구가 없어서) 보존된다."
- 이걸 계기로 관련 HN 댓글 스레드(AI 위임 관련 논쟁)도 같이 읽음. 그중 실제로 쓸모 있던 두 가지:
  1. **계산기 vs LLM 비유는 결론이 나 있음** — 계산기는 문제 정의가 끝난 뒤의 연산만 대체하는데, LLM은 "무엇을 물어야 하는가"라는 문제 정의 단계 자체를 대신할 수 있어서 종류가 다른 위임. 계산기 세대도 "대략 이 정도 답이 나올 것"이라는 감각(자릿수 추정)은 유지해야 오류를 감지할 수 있다는 지적이 여러 댓글에서 반복됨 — 이게 없으면 GPS 오타를 못 잡아내는 것과 똑같은 구조.
  2. **"외골격 vs 귀걸이" 사용 구분이 제일 실용적인 기준** — 원하는 결과의 형태를 먼저 정하고 실행만 시키는 것(외골격, 예: "xyz 거리 공간에 kd-tree 구현해줘")은 사고를 이미 마친 뒤의 자동화라 검토가 쉽고 사고력 위축이 적음. 반면 "이제 뭐 할까?"를 계속 되묻는 것(귀걸이)은 판단의 루프 자체를 넘기는 거라 위험함.
- **자기반성 메모**: 이 대화를 하면서 나 스스로도 Claude를 "외골격"보다 "귀걸이" 쪽으로 쓴 적이 있다는 걸 인정하게 됨. 특히 판단/방향 자체를 먼저 묻는 질문("이제 뭐 하면 좋을지 봐줘" 같은 식)이 반복되면 위 구분에서 위험한 쪽에 가까워짐 — 완전히 하지 말자는 건 아니고, 최소한 "지금 이건 외골격으로 쓰는 건가, 귀걸이로 쓰는 건가"를 자문하는 습관을 들이자는 정도로 남겨둠.

**「우리는 너무 많은 생각을 AI에 떠넘기고 있는가?」** — [hada.io 토픽](https://news.hada.io/topic?id=31458) / [원문](https://www.artfish.ai/p/offloading-thinking-to-ai)
- 핵심 논지: 검색엔진은 "출처 평가 + 종합"은 사람이 했지만, 요즘 AI 도구는 그 중간 사고 과정까지 대신 처리해버림. 가설을 먼저 세우고 AI로 검증하면 사고를 보완하지만, 처음부터 AI에 맡기면 그 학습 기회 자체가 사라진다는 대비가 핵심 예시(포르투갈 역사 케이스).
- 댓글 논점 중 눈에 띈 것: "계산기 vs LLM" 비교 — 계산기는 연산만 대체하지만 LLM은 사고 과정 자체를 우회한다는 점에서 질적으로 다르다는 반박. 그리고 AI를 비판적 검토 없이 "신탁"처럼 쓰는 태도에 대한 우려.
- 지금 세션에서 하고 있는 작업 방식과 바로 연결되는 지점: 지난 프론트엔드 트렌드 요약(2026-07-15 항목)을 받았을 때 그대로 옮기지 않고 WebSearch로 날짜/버전을 검증한 것처럼, "AI가 준 답을 그대로 내 지식으로 흡수하지 않고 검증하는 습관"이 이 글이 말하는 위험(사고 위임)을 실제로 상쇄하는 실천이라는 걸 다시 확인함.

## 2026-07-21

### GeekNews(hada.io) 주말~월요일 스크랩 5건

**「우리는 떼돈을 벌게 될 것이다」** — [hada.io 토픽](https://news.hada.io/topic?id=31518) / [원문(rocketpoweredjetpants.com)](https://rocketpoweredjetpants.com)
- AI 코딩 도구 확산이 5년에 걸쳐 개발자 노동시장을 재편할 거라는 예측. LLM이 기존 코드를 재사용하기보다 새 코드를 추가하는 걸 선호해서 중복·복잡도가 쌓이고, 그걸 정리할 숙련 시니어의 가치가 급등하는 반면 주니어 채용은 줄어드는 시나리오("Y2K 시대 COBOL 개발자"에 비유).
- 댓글: AI 생성 저품질 코드 정리가 그 자체로 시장이 될 거라는 관점, 비효율적인 LLM 도입 부분을 기존 결정론적 알고리즘으로 되돌리는 게 오히려 기회라는 반론도 있음.

**「2026년 7월 오픈소스 AI 현황」** — [hada.io 토픽](https://news.hada.io/topic?id=31538) / [원문(stateofopensource.ai)](https://stateofopensource.ai)
- Mozilla CTO 보고서. 추론 비용이 36개월간 50배 하락, 오픈 모델이 2026년 중반 토큰 처리량 과반 차지, 폐쇄형과의 역량 격차는 평균 3.3%까지 좁혀짐. 개발자 79%가 오픈 모델을 써보긴 했지만 실제 프로덕션 도달률은 51%에 그침.
- 핵심 논지는 경쟁의 중심이 "모델 자체"에서 "에이전트 하네스(실행 프레임워크)"로 옮겨가고 있다는 것 — 표준화·배포 도구·운영 신뢰 부족이 병목. 댓글에서는 "AI가 쓴 것 같은 문체"라는 진정성 지적과 Mozilla의 언행 불일치 비판도 있었음.

**「Claude Fable 5, 7월 20일부터 Max/Team Premium 요금제에 기본 포함」** — [hada.io 토픽](https://news.hada.io/topic?id=31545) / [원문(x.com/claudeai)](https://x.com/claudeai)
- Max/Team Premium은 7/20부터 요금제 한도의 50%까지 Fable 5 이용 가능, Pro/Team Standard는 계속 Usage 크레딧 소모지만 $100 크레딧 일회성 지급.
- 댓글 반응은 상당히 부정적: 반복된 정책 변경("다음주까지만" 식 번복)과 Claude Code CLI 종량제 정책 변경 등이 겹치면서 신뢰도 훼손, 이 불확실성이 OpenAI/Moonshot 같은 경쟁사를 상대적으로 더 매력적으로 보이게 만든다는 지적.

**「AI 기업 로고는 왜 항문처럼 보일까? (2025)」** — [hada.io 토픽](https://news.hada.io/topic?id=31566) / [원문(velvetshark.com)](https://velvetshark.com)
- 가벼운 글. AI 기업 로고들(OpenAI, Claude 등)이 원형+중앙 빈 공간+방사형 요소를 반복하는 이유를 파레이돌리아(추상 형태에서 익숙한 패턴을 찾는 심리 현상)와 "위원회식 디자인이 만드는 동질화"로 설명.
- 댓글: Claude 로고만 유독 뚜렷하고 나머지는 자동차 바퀴/카메라 렌즈로도 해석 가능하다는 반박, OpenAI 공식 브랜드 설명엔 "직각"을 언급하는데 실제 로고엔 직각이 없다는 사실 오류 지적, iPhone의 둥근 모서리 디자인 철학이 업계 전반에 퍼진 역사적 맥락 언급.

**[important] 「당신이 안 보는 사이 프론트엔드에 무슨 일이 있었나」** — [hada.io 토픽](https://news.hada.io/topic?id=31587) / [원문(davidpoblador.com)](https://davidpoblador.com)
- 2008년경 개발을 놓은 사람들을 위해 지난 20년 프론트엔드 진화를 "레이어가 쌓이는 구조"로 정리: jQuery(2006-10, AJAX 대중화) → 프레임워크(2010-15, React/Vue/Angular 선언적 UI) → 빌드 시스템(2012-18, 번들링/트랜스파일) → 개발도구(2018-24, Go/Rust 기반 Vite/esbuild/SWC 고속화) → 서버 렌더링(2014-26, SPA 초기 로딩 문제 해결 대신 hydration 비용 발생) → 엔지니어링 도구(2015-26, TypeScript/Tailwind/shadcn 표준화) → 배포(2015-26, Git 연동 자동배포·엣지 컴퓨팅) → AI(2023-26, 자연어 코드 생성으로 직군 경계 붕괴).
- 결론이 흥미로움: "20년을 돌아 FTP 업로드 방식과 비슷한 지점으로 복귀했다"는 자조적 회고 — 각 레이어가 이전 레이어의 문제를 풀면서 새 문제를 만드는 걸 반복.
- 이 프로젝트(폴리오)가 지금 겪고 있는 결정들(Turbopack vs Webpack, Tailwind 제거하고 CSS Modules로 회귀, next-intl 등)이 바로 이 글이 말하는 "레이어 쌓기" 역사의 한 단면이라 겹쳐 읽을 만함 — 특히 Tailwind를 걷어낸 우리 선택([[conventions_tailwind]] 참고)이 글에서 말하는 "엔지니어링 도구 표준화" 레이어에 대한 개별 프로젝트 차원의 반례로 읽힘.

## 2026-07-22

### 「웹 개발자를 위한 Safari MCP 서버를 소개합니다」(번역)

[번역글(emewjin.log)](https://emewjin.github.io/introduce-safari-mcp/) / [원문(Apple WebKit 블로그)](https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/)

- Apple WebKit 팀이 공식 공개한 MCP 서버. AI 에이전트가 Safari에 직접 붙어서 DOM 접근, 스크린샷, 콘솔 로그, 네트워크 요청 분석 등을 수행하게 해줌 — 탭 관리·JS 실행·페이지 상호작용 포함 15개 이상 도구 제공.
- 문제의식: 기존 워크플로우는 사람이 브라우저와 에디터/터미널을 오가며 눈으로 확인하고 말로 옮겨 설명해야 했는데, 이 서버는 에이전트가 브라우저 상태를 직접 조회해서 "알아서" 디버깅하게 만드는 게 목적.
- 요구사항: **Safari Technology Preview 247+** 필요, "Show features for web developers"·"Enable remote automation and external agents" 옵션 활성화 필요. **macOS 전용**(설치 경로가 `/Applications/Safari Technology Preview.app`로 고정).
- 설치: `claude mcp add safari-mcp-stp -- "/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver" --mcp`
- 개인 메모: [[feedback_browser_verification]]에 남겨둔 대로 이 프로젝트(폴리오)에서 브라우저 시각 검증은 항상 사용자가 직접 하기로 되어 있어서 당장 도입 대상은 아니지만, Safari 전용(WebKit 렌더링) 크로스브라우저 검증 도구가 필요해지면 후보로 재검토할 만함. Playwright의 브라우저 자동화와 달리 Apple 공식 도구라 WebKit 특유의 버그(현재 next-themes 이슈 [[project_issue54_paused]] 같은)를 볼 때 신뢰도가 더 높을 수 있음.

## 2026-07-24

### 해시(hash)에도 "보안용"과 "식별용"이 따로 있다
- 같은 해시 함수라도 쓰임새에 따라 요구되는 성질이 다름.
- **보안용** (전자서명, 비밀번호 저장, 메시지 인증): 공격자가 의도적으로 같은 해시값을 만드는 데이터를 조작할 수 있는지가 중요. MD5/SHA-1은 충돌 공격이 실증되어 이 용도로는 이미 폐기(deprecated)됨.
- **식별/무결성용** (파일 동일성 체크, 캐시 키, git 커밋 해시): "우연히 같은 값이 나올 확률"만 문제고 악의적 조작 시나리오 자체가 없어서, MD5처럼 "약한" 해시도 실무에서 널리 쓰임.
- 추가로: 브라우저의 `crypto.subtle`(Web Crypto API)은 스펙상 "secure context"(HTTPS/localhost)에서만 열리는데, 앱을 감싸는 네이티브 WebView가 커스텀 스킴이나 `file://`로 로드하면 이게 아예 막혀서 SHA-1/SHA-256 같은 네이티브 해싱이 통째로 안 되는 경우가 있음 — 알고리즘 선택과 별개로 "환경이 그 API 자체를 지원하는가"가 진짜 제약이 될 수 있다는 걸 배움.
- 참고 링크: [MDN, Secure Contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) / [MDN, SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle) / [Wikipedia, MD5 - Security](https://en.wikipedia.org/wiki/MD5#Security)

### 장식용 이미지는 alt=""가 정답이다
- `<img>`의 `alt`는 무조건 채워야 하는 게 아니라, 이미지가 실제로 전달하는 정보가 있을 때만 설명적으로 채워야 함. 파일명을 그대로 넣는 것(`alt="PdfCover"` 같은)은 스크린리더 사용자에게 의미 없는 소음만 추가함.
- 이미지가 순수 장식/배경용이고, 실제 동작이나 정보는 옆의 텍스트/버튼이 이미 전달하고 있다면 `alt=""`로 비워서 스크린리더가 아예 건너뛰게 하는 게 맞는 접근성 처리임.
- 참고 링크: [W3C WAI, An alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decorative/) / [WebAIM, Alternative Text](https://webaim.org/techniques/alttext/) / [MDN, `<img>`: alt 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt)
