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
