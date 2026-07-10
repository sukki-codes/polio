# 🏛️ Project Architecture & Setup Log

## 🎯 2026-04-23: Project Initialization

### 아키텍처 결정 사항
- Framework : Next.js (App Router)
- Styling : Tailwind CSS v4 (CSS-first approach)
- Design Token : Deep Dark Blue / Wine 컨셉의 시각적 아이덴티티 구축

### 주요 설정
- Font : Inter, Pretendard Variable 기반 폰트 적용으로 Typography 최적화
- Unit : 1rem = 10px 전략으로 개발 생산성 향상

## 🎯 2026-04-27: CodeRabbit AI 코드 리뷰 자동화 도입

### Context
- **Path Instructions**: 경로별 컨텍스트 주입으로 도메인 특화 리뷰 유도
  - `src/components/common/**` : SRP, Tailwind v4 @theme, use client 남용 검토
  - `src/components/features/**` : 비즈니스 로직 분리 및 Server Component 우선 설계 검토
  - `src/components/layout/**` : 레이아웃 역할 순수성 검토
  - `src/app/**` : App Router 컨벤션 및 SEO metadata 누락 검토
  - `src/hooks/**` : 네이밍, 단일 관심사, 불필요한 리렌더링 패턴 검토
  - `**/*.css` : 1rem = 10px 전략 준수 및 @theme 토큰 사용 여부 검토
  - `docs/**` : ADR 형식 준수 여부 검토
- **Knowledge Base**: `scope: auto` 설정으로 리뷰 누적 학습 활성화
- **Custom Command**: `@coderabbitai portfolio-check` — 포트폴리오 관점 Best Practice 검토 커맨드 등록

### Decision
- CodeRabbit을 PR 기반 AI 코드 리뷰 도구로 채택
- 리뷰 프로필: `assertive` (타이트한 품질 기준 유지)
- 리뷰 언어: `ko-KR` (한국어 피드백)

### Consequences
- 혼자 진행하는 프로젝트에서 코드 품질 기준선을 일관되게 유지하기 위함
- Path Instructions를 통해 프로젝트 컨벤션을 AI에 점진적으로 학습시키는 구조 채택
- 리뷰가 쌓일수록 knowledge_base가 강화되어 프로젝트 후반부로 갈수록 리뷰 정확도 향상 기대

## 🎯 2026-04-29: 디자인 파운데이션 확립

### Context
- 초기 Next.js 보일러플레이트 구조(`app/`)를 `src/` 기반으로 정비 필요
- 폰트·색상·간격 단위 등 디자인 시스템의 기준값이 미확정 상태
- Tailwind v4 환경에서 `1rem = 10px` 전략과 spacing 단위의 정합성 문제 존재

### Decision

#### 1. 디렉토리 구조
- `app/` → `src/app/` 이동, Next.js src directory 컨벤션 채택
- `tsconfig.json` path alias: `@/*` → `./src/*`
- 루트 레이아웃 분리: `src/app/layout.tsx` + `src/components/layout/Header.tsx`

#### 2. 폰트
- Geist / Geist_Mono 제거
- **Inter** (`next/font/google`, CSS variable `--font-inter`) + **Pretendard Variable** (jsdelivr CDN, dynamic subset)
- `--font-sans` 폴백 순서: `var(--font-inter)` → `Pretendard Variable` → `Noto Sans KR`

#### 3. Spacing 단위 확정
- `@theme { --spacing: 0.1rem }` 설정으로 **1 Tailwind unit = 1px** 달성
- `h-640` = `64rem` = `640px` 처럼 숫자가 픽셀과 1:1 대응
- `[value]px` 임의값 대신 canonical 숫자 클래스 사용 원칙
- **보류**: `w-5xl` 등 Tailwind 내장 named size 대신 전용 custom 토큰으로 교체 예정

#### 4. 컬러 스킴 — 라이트 모드 우선
- `--color-bg-main` : `#020617` → `#f8f7ff` (라벤더 톤 밝은 배경)
- `--color-text-main` : `#f8fafc` → `#0f172a`
- `--color-text-sub` : `#94a3b8` → `#64748b`
- 다크모드는 추후 별도 작업 예정

#### 5. CSS 유틸리티 추가
- `@utility dot-grid` : 28px 도트 그리드 배경 패턴
- `@utility gradient-text` : `text-main` → `accent` 135° 그라디언트 텍스트

### Consequences
- spacing 단위가 픽셀과 1:1 대응되어 디자인 수치를 코드에 그대로 옮길 수 있음
- 라이트 모드 기준으로 먼저 구축 후 `dark:` variant로 다크모드를 레이어링하는 전략 채택
- Tailwind 내장 named size(`w-5xl` 등) 미사용 원칙 수립 → 모든 크기값을 @theme 토큰으로 관리 예정

## 🎯 2026-04-29: CSS @layer base 전략 확정

### Context

- Tailwind v4 환경에서 전역 리셋 스타일을 레이어 없이 작성하면 Tailwind 유틸리티 클래스가 리셋 스타일을 오버라이드하지 못하는 우선순위 역전 문제 발생
- 프로젝트가 내장 named size(`w-5xl` 등) 대신 숫자형 클래스를 canonical로 쓰는 원칙을 세웠으나 VSCode Tailwind LSP가 canonical 클래스로 바꾸라는 경고를 계속 표시해 노이즈 발생

### Decision

- 전역 리셋 스타일 전체를 `@layer base { ... }`로 감싸 Tailwind 레이어 우선순위 체계에 편입
- VSCode 설정 `tailwindCSS.lint.suggestCanonicalClasses: "ignore"`로 numeric 클래스 제안 경고 억제

### Consequences

- Tailwind 유틸리티 클래스가 리셋 스타일보다 항상 높은 우선순위를 가지게 됨
- `@layer base → components → utilities` 구조가 확립되어 이후 커스텀 스타일 추가 시 레이어 위치 결정 기준이 생김

---

## 🎯 2026-04-29: GitHub 이슈 템플릿 도입

### Context

- 혼자 진행하는 프로젝트지만 이슈를 체계적으로 분류하고 추적하기 위한 최소한의 구조가 필요했음

### Decision

- `.github/ISSUE_TEMPLATE/` 하위에 `bug.yml`, `feature.yml`, `chore.yml` 세 가지 YAML 기반 템플릿 추가
- `bug.yml`에서 "재현 단계"를 필수 항목으로 지정해 불완전한 버그 리포트를 사전에 방지

### Consequences

- 이슈 유형이 세 가지로 명확히 분류되어 작업 성격(버그 수정 / 기능 추가 / 유지보수)이 한눈에 파악됨

---

## 🎯 2026-06-30: GitHub Actions 개발 워크플로우 자동화

### Context

- PR과 이슈를 열 때마다 수동으로 Assignee를 지정해야 하는 번거로움이 있었음
- 의존성 업데이트를 수동으로 관리하면 보안 패치가 지연될 위험이 있었음

### Decision

- **Auto-assignee** (`auto-assignee.yml`): 이슈/PR이 열릴 때 `actions/github-script`로 `sukki-codes`를 자동 할당
- **Dependabot** (`.github/dependabot.yml`): npm 패키지와 GitHub Actions 모두 주 1회 자동 업데이트 PR 생성, `open-pull-requests-limit: 10`

### Consequences

- 이슈/PR 생성 직후 Assignee가 자동 설정되어 트래킹 누락이 없어짐
- 의존성 보안 패치가 주 단위로 자동 제안되어 관리 부담 감소

---

## 🎯 2026-06-30: 글로벌 테마 시스템 및 다크/라이트 모드 인프라 구축

### Context

- 초기 포트폴리오 화면은 라이트 모드 중심으로만 구성되어 있어, 다크 모드 전환 경험이 없었음
- 포트폴리오 사이트로 확장하면서 시크한 다크 그레이와 네온 포인트 컬러 기반의 시각적 정체성이 필요했음
- 향후 섹션 확장, 3D 인터랙션, 테스트/배포 자동화 등으로 프로젝트가 성장할 것을 고려해 전역 테마 관리 인프라가 필요했음

### Decision

- `next-themes`를 도입해 `class` 기반의 다크/라이트 테마 스위칭을 전역적으로 구성; `defaultTheme=”dark”`, `enableSystem={false}`로 시스템 테마를 무시하고 다크 모드를 기본값으로 고정
- `src/app/layout.tsx`에 `ThemeProvider`를 연결하고 `suppressHydrationWarning`을 적용해 초기 렌더링 안정성을 확보
- `src/styles/globals.css`에 `:root` / `:root.light` 기반으로 배경, 텍스트, 카드, 테두리, 포인트 컬러 토큰을 분리 정의
- `src/components/layout/ThemeToggle.tsx`를 추가해 헤더에서 테마 토글이 동작하도록 구성
- 기본 시각 방향을 “다크 우선 + 시안/블루 계열 네온 포인트”로 정리

### Consequences

- 다크/라이트 모드 전환이 전역적으로 일관되게 동작하게 되어 이후 섹션 확장 시 테마 토큰 재사용이 쉬워짐
- 포트폴리오의 시각적 톤이 더 기술적이고 세련된 방향으로 정리됨
- 향후 3D 히어로, 섹션 카드, CTA 등 UI 요소를 테마 토큰 기반으로 확장하기 쉬워짐

---

## 🎯 2026-07-01: Lint 도구 정비 — Stylelint 도입 및 ESLint v9 고정

### Context

- CSS 파일에 대한 린트 커버리지가 없어 Tailwind v4 전용 at-rule(`@theme`, `@utility` 등) 사용 시 표준 위반 여부를 자동으로 검증할 수 없었음
- Dependabot이 ESLint를 v10으로 올린 뒤 `npm run lint`가 크래시하는 문제가 발생
- Stylelint가 lint 스크립트와 별개로 운영되어 CI/pre-commit에서 CSS 오류가 누락될 위험이 있었음

### Decision

- **Stylelint 도입**: `stylelint-config-standard` 기반으로 `.stylelintrc.json` 추가; Tailwind v4 at-rule을 `ignoreAtRules`로 화이트리스트 처리, `import-notation: string` 강제; `ts/tsx` 파일 제외
- **ESLint v9 고정**: ESLint v10이 `npm run lint` 실행 시 크래시를 일으키는 것을 확인 후 `^9`로 다운그레이드
- **Lint 스크립트 통합**: `"lint": "eslint && npm run stylelint"`로 단일 진입점 유지

### Consequences

- `npm run lint` 한 번으로 TS/JS + CSS 모두 검사됨
- Tailwind v4 전용 문법이 오탐되지 않으면서 실제 CSS 오류는 잡아냄
- ESLint v10 호환성 문제 해결 전까지 dependabot의 v10 bump PR은 별도 검증 후 머지 필요

---

## 🎯 2026-07-01: PR Status-Check CI 워크플로우 도입

### Context

- 린트 도구를 정비했지만 PR 단계에서 자동으로 통과 여부를 검증하는 게이팅 장치가 없었음
- 로컬에서 `npm run lint`를 실행하지 않은 채 머지될 경우 품질 기준이 우회될 수 있었음

### Decision

- `.github/workflows/static-analysis.yml` 추가: 모든 PR에서 ESLint → Stylelint → TypeScript 타입 체크를 순서대로 실행
- `concurrency` 설정으로 같은 PR에 새 커밋이 푸시되면 이전 실행을 자동 취소해 리소스 낭비 방지
- `actions/checkout`, `actions/setup-node` 모두 커밋 해시로 고정(핀닝)해 서플라이 체인 공격 방어
- Node.js 버전은 24로 고정

### Consequences

- PR 머지 전에 린트·타입 오류가 반드시 통과되어야 하므로 코드 품질 게이팅이 자동화됨
- 로컬 린트 실행을 잊어도 CI가 잡아줌
- 워크플로우 파일의 Action 버전이 핀닝되어 예기치 않은 업스트림 변경에 영향을 받지 않음

---

## 🎯 2026-07-02: SVG Sprite 시스템 도입

### Context

- 아이콘을 컴포넌트마다 개별 import하면 번들 크기가 커지고 관리가 분산됨
- 이 프로젝트는 `dev`는 Webpack(`next dev --webpack`), `build`는 Turbopack(Next 16 기본값)을 각각 사용해, SVGR처럼 번들러 로더에 의존하는 svg-to-component 방식은 두 번들러 설정을 각각 만들고 계속 동기화해야 하는 부담이 있음
- 다크/라이트 테마 전환 인프라(2026-06-30 ADR)가 이미 있어 아이콘도 `currentColor` 기반으로 테마 토큰과 자연스럽게 연동될 필요가 있음
- CodeRabbit path instructions로 Server Component 우선 설계를 지향하는데, 검토했던 대안(Portal로 심볼을 런타임에 DOM에 주입하는 방식)은 client mount가 필요해 SSR 이점이 사라지고 초기 렌더에 아이콘 깜빡임(FOIC)이 생길 수 있음

### Decision

- `scripts/build-svg-sprite.mts`: `src/icons/*.svg` 원본을 스캔해 `<symbol>`로 묶은 단일 `public/sprites.svg`를 생성하는 빌드타임 스크립트 도입. Node 24의 네이티브 TypeScript 실행 지원을 활용해 별도 트랜스파일 없이 `.mts`로 작성(`tsc` 타입체크 대상에도 포함)
- `npm run icons`로 실행하며 `predev`/`prebuild`에 연결해 항상 최신 sprite를 보장
- 생성된 `public/sprites.svg`는 `.gitignore`에 추가해 버전관리 대상에서 제외 — 단일 소스는 `src/icons/*.svg`
- `src/components/common/Icon.tsx` 공통 컴포넌트 추가: `<svg><use href="/sprites.svg#icon-{name}" /></svg>`를 렌더링하는 서버 컴포넌트로, 번들러나 클라이언트 마운트에 의존하지 않음
- 아이콘 소스는 `fill="none" stroke="currentColor"` 기반으로 작성해 테마 토큰 색상을 그대로 상속받도록 함
- `ThemeToggle`의 인라인 sun/moon SVG를 `Icon` 컴포넌트로 교체해 실사용 검증

### Consequences

- `src/icons/`에 svg 파일만 추가하면 별도 등록 없이 sprite에 자동 반영됨
- Turbopack/Webpack 번들러 차이에 영향받지 않는 아이콘 파이프라인 확보
- 브라우저가 `sprites.svg`를 최초 1회만 캐싱하므로 이후 페이지 이동 시 재다운로드가 없음
- 서버 컴포넌트로 아이콘을 렌더링할 수 있어 SSR 시점에 바로 아이콘이 보이고 클라이언트 마운트를 기다릴 필요가 없음
- 아이콘 개수가 늘어나면 `Icon.tsx`의 `IconName` 유니언 타입을 수동으로 유지보수해야 함 — 개수가 많아지면 codegen 도입을 재검토

## 🎯 2026-07-02: i18n(ko/en) 인프라 도입

### Context

- 포트폴리오를 해외 채용 담당자에게도 노출하려면 한국어/영어 2개 언어 지원이 필요했음
- 이 프로젝트의 Next.js 16.2.9는 `middleware.ts`가 `proxy.ts`로 이름이 바뀐 breaking change가 있어(2026-06-30 이전 세션 확인), 라이브러리가 이 컨벤션을 지원하는지 사전 확인이 필요했음

### Decision

- **라이브러리**: `next-intl`(v4)을 선정. `next-i18next`는 원래 Pages Router 중심 라이브러리라 App Router 지원이 v16에서야 추가됐고 `i18next`/`react-i18next` 런타임 의존성이 추가로 필요한 반면, `next-intl`은 App Router 전용으로 설계돼 RSC를 네이티브 지원하고 의존성이 가벼움. 이 프로젝트가 지금까지 `next-themes` 하나만 신중하게 추가해온 미니멀한 의존성 기조와도 맞음. `next-intl`의 peerDependencies가 `next: ^16.0.0`을 명시적으로 지원함을 npm에서 확인
- **URL 구조**: `localePrefix: 'never'` 채택 — 언어와 무관하게 URL은 항상 PORTFOLIO-SPEC 사이트맵과 동일(`/about` 등)하고, locale은 URL이 아니라 `NEXT_LOCALE` 쿠키(+최초 방문 시 `Accept-Language`)로만 판단해 미들웨어가 내부적으로만 rewrite함. `defaultLocale: 'ko'`
  - 처음엔 `as-needed`(기본 언어만 프리픽스 생략, 영어는 `/en/about`)로 시작했으나, 영어로 전환해도 URL이 안 바뀌길 원하는 게 실제 요구사항이었음이 확인돼 `never`로 변경
  - 트레이드오프: 언어별로 별도 URL이 없어 검색엔진이 ko/en 페이지를 따로 색인하지 못함(다국어 SEO 불리). 포트폴리오 사이트 특성상 감수하기로 함
- **라우팅 구조**: `src/app/[locale]/layout.tsx`를 루트 레이아웃으로 승격(`app/layout.tsx` 별도 유지 안 함), `src/app/[locale]/page.tsx`로 Hero 이동. `hasLocale`로 유효하지 않은 locale은 `notFound()` 처리
- **Proxy**: `src/proxy.ts`에 `next-intl/middleware`의 `createMiddleware(routing)`을 `export default` — Next 16의 `proxy.ts` 컨벤션을 그대로 따르되 함수명은 바꾸지 않아도 동작함을 확인
- **설정 위치**: `src/i18n/routing.ts`(locale 목록/기본값), `src/i18n/request.ts`(요청별 메시지 로딩), `src/i18n/navigation.ts`(locale-aware `Link`/`useRouter`/`usePathname`)로 분리
- **메시지 파일**: `src/messages/ko.json`, `src/messages/en.json` (프로젝트 전체가 `src/` 기반 구조를 따르므로 루트의 `messages/` 대신 `src/messages/`에 배치)
- **Header 내비게이션**: `next/link` 대신 `@/i18n/navigation`의 `Link`로 교체해 라우팅 시 locale이 유지되도록 함
- **언어 전환 UI**: `src/components/layout/LocaleSwitcher.tsx` 추가 — `ThemeToggle`과 동일한 시각적 패턴(다음 상태를 보여주는 pill 버튼)으로 헤더에 배치. `localePrefix: 'never'`라 URL이 바뀌지 않으므로, 클릭 시 `NEXT_LOCALE` 쿠키만 갱신하고 `router.refresh()`로 같은 경로에서 서버 컴포넌트를 다시 렌더링함
- **Hero 카피 정리**: 기존 구현 카피("Systems that feel alive.")가 PORTFOLIO-SPEC에 정의된 공식 카피("Complex problems, Structured systems.")와 달랐던 것을 이번에 공식 카피로 맞춤. 영어 헤드라인은 두 언어 모두 동일하게 유지하고(브랜드 태그라인), 서브카피만 언어별로 번역

### Consequences

- 기본 언어 URL이 PORTFOLIO-SPEC 사이트맵과 그대로 일치해 기존 문서·링크 구조를 재작성할 필요가 없음
- 이후 페이지(`/about`, `/projects` 등)를 추가할 때도 `src/app/[locale]/` 하위에 만들면 자동으로 i18n이 적용됨
- 새 텍스트를 추가할 때는 `src/messages/ko.json`과 `en.json`에 동일한 키를 반드시 함께 추가해야 함 — 누락 시 `next-intl`이 빌드/런타임에 에러를 발생시켜 조기에 발견 가능
- Hero 카피가 PORTFOLIO-SPEC과 다시 일치하게 되어 문서와 실제 구현 간의 드리프트가 해소됨

## 🎯 2026-07-08: Tailwind CSS 제거 → CSS Modules 전환

### Context

- Tailwind 유틸리티 클래스 기반 스타일링에 대한 불만(#60) — 성능 문제가 아니라 `className="flex items-center gap-4 ..."` 식 작성 방식 자체의 가독성/유지보수성 문제. 컴포넌트가 5~6개뿐인 지금이 전환 비용이 가장 낮은 시점이라 판단
- 1차로 vanilla-extract(제로 런타임 CSS-in-TS)를 채택해 전체 마이그레이션을 완료했으나, `next build`에서 "Styles were unable to be assigned to a file" 에러로 프로덕션 빌드가 깨짐
- 원인: `@vanilla-extract/next-plugin`은 Webpack 전용 플러그인인데, 이 프로젝트는 `npm run dev`가 `--webpack`을 강제하는 반면 `npm run build`(`next build`)는 Next 16 기본값인 Turbopack을 사용함(2026-07-02 SVG Sprite ADR에서 이미 "dev/build 번들러가 다르다"는 제약을 명시한 바 있음). vanilla-extract는 dev에서는 동작하지만 build에서는 전혀 동작하지 않음
- 이는 SVG Sprite ADR에서 SVGR 대신 정적 스프라이트를 택했던 것과 동일한 종류의 문제(번들러 로더 의존 방식은 dev/build 두 번들러 설정을 각각 만들고 동기화해야 함) — vanilla-extract도 같은 이유로 기각

### Decision

- **CSS Modules**로 전환 — Next.js가 Webpack/Turbopack 양쪽에 기본 내장 지원하므로 번들러 종속성 문제 자체가 발생하지 않음
- `src/styles/globals.css`: Tailwind `@theme{}` 블록의 색상/폰트/섀도우/z-index 토큰을 `:root{}`의 일반 CSS 커스텀 프로퍼티로, `@utility dot-grid/gradient-text`를 일반 `.dot-grid`/`.gradient-text` 클래스로 전환. `@layer base{}`는 Tailwind 전용 문법이 아니라 CSS Cascade Layers 표준 문법이라 그대로 유지 가능했음. `:root`/`:root.light`의 다크/라이트 토큰 오버라이드 구조는 변경 없음
- 컴포넌트별 스타일은 `Component.module.css`로 분리(`Header`, `LocaleSwitcher`, `ThemeToggle`, `layout`, `page`, `about/page`), `import styles from './X.module.css'` 후 `styles.className`으로 사용. 클래스명은 JS 프로퍼티 접근을 위해 camelCase 사용
- 공유 베이스 스타일 확장은 CSS Modules의 `composes` 문법 사용(`ThemeToggle`의 placeholder/button)
- 반응형 분기(`sm:`, `md:` 등 Tailwind 프리픽스)는 `@media screen and (min-width: 640px|768px) { ... }`로 직접 작성
- stylelint: `.stylelintrc.json`에 `*.module.css` 파일만 camelCase 클래스 선택자를 허용하는 `overrides` 추가, `composes`를 `property-no-unknown`의 예외로 등록, `media-feature-range-notation`을 `prefix`(`min-width:` 표기)로 고정
- `tailwindcss`, `@tailwindcss/postcss`, `postcss.config.mjs`, `@vanilla-extract/*` 전부 제거
- `.coderabbit.yaml`의 Tailwind `@theme` 관련 path instructions를 CSS Modules/커스텀 프로퍼티 기준으로 갱신

### Consequences

- Webpack/Turbopack 번들러 차이가 이제 스타일링 레이어에서도 전혀 문제가 되지 않음(SVG 스프라이트에 이어 두 번째로 이 원칙을 지킨 사례)
- 토큰 이름에 대한 컴파일 타임 타입 체크(vanilla-extract가 제공했던 자동완성/오타 검출)는 포기 — 대신 stylelint의 `custom-property-*` 계열 규칙과 코드리뷰로 보완
- 컴포넌트 스타일이 `.tsx` 옆 `.module.css`로 물리적으로 분리되어, 기존 Tailwind 인라인 className 방식보다 파일 탐색 비용이 늘어남(하지만 이게 애초에 #60이 원했던 방향 — 긴 유틸리티 문자열 대신 이름 붙은 CSS 규칙)
- vanilla-extract 도입/제거 과정에서 소요된 작업은 되돌렸지만, "이 프로젝트는 번들러에 종속적인 스타일링 도구를 쓰지 않는다"는 원칙이 이번 사례로 재확인되어 향후 스타일링 도구 검토 시 체크리스트로 활용 가능

## 🎯 2026-07-10: Projects 페이지 — 콘텐츠 구조 및 라우팅 방식 결정

### Context

- PORTFOLIO-SPEC의 "미결정 사항"에 `/projects/[slug]` 상세 페이지를 별도 라우트로 만들지, 카드에서 모달로 처리할지가 남아있었음
- 핵심 프로젝트 3개(AuraVue/Checkpoint/Cloud)의 Challenge/Action/Result 콘텐츠는 문단 단위의 긴 텍스트라, 기존 `src/messages/{ko,en}.json`(짧은 UI 문자열 카탈로그)에 그대로 넣기엔 관심사가 섞이고 파일이 비대해짐
- 이 케이스 스터디 콘텐츠는 앞으로도 계속 늘어날 예정(사용자 확인)이라, 처음부터 구조를 잘못 잡으면 나중에 되돌리는 비용이 커짐

### Decision

- **라우팅**: 모달 대신 독립 라우트(`/projects`, `/projects/[slug]`) 채택 — URL 공유/북마크 가능성과 SEO 인덱싱을 위해, 그리고 이 프로젝트가 지금까지 모든 콘텐츠를 실제 라우트로 만들어온 것과의 일관성 때문
- **콘텐츠 위치**: 케이스 스터디 본문을 `src/messages/*.json`이 아니라 별도 `src/content/projects/`에 분리
  - `src/content/projects/types.ts`: 공유 타입(`Project`, `ProjectContent`)
  - `src/content/projects/{slug}.ts`: 프로젝트 1개당 파일 1개, `ko`/`en` 콘텐츠를 함께 보유
  - `src/content/projects/index.ts`: 개별 파일을 모아 `PROJECTS` 배열과 `getProject(slug)` export
  - JSON이 아니라 TypeScript로 작성 — `ko`/`en` 중 하나를 빼먹으면 `tsc`가 즉시 잡아줌(JSON은 이 보호가 없음)
  - 프로젝트 개수가 적을 때(3개) 미리 파일을 쪼개는 선택 — 늘어난 뒤 쪼개는 것보다 지금 비용이 훨씬 낮다고 판단(Tailwind 제거·SVG 스프라이트 ADR과 같은 "숫자 적을 때가 전환 비용 최저" 원칙의 반복 적용)
- **UI 문자열 vs 콘텐츠 분리 원칙 확정**: `src/messages/*.json`은 헤딩/버튼 등 짧은 재사용 UI 문자열 전용, 긴 본문형 콘텐츠는 `src/content/`로 — 추후 Blog 페이지(#34, MDX 예정)도 이 원칙을 따르게 됨

### Consequences

- 프로젝트가 늘어나도 `src/content/projects/`에 파일만 추가하면 되고, `PROJECTS` 소비 쪽(`getStaticParams`, 목록/상세 페이지) 코드는 변경 불필요
- 언어별 URL이 별도로 없는 기존 `localePrefix: 'never'` 정책과 동일하게, `/projects/[slug]`도 로케일 프리픽스 없이 동작
- "기타 프로젝트"(핵심 3개 외)를 상세 페이지 없이 카드만 보여줄지 등 세부 정책은 아직 미정 — 실제로 그런 콘텐츠가 생기기 전까지는 추측성 설계를 피하고 이슈로 남겨둠
