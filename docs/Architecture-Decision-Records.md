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
