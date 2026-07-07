# Portfolio Site Specification

> 이 문서는 포트폴리오 사이트의 페이지별 스펙을 정의합니다.
> 개발 진행에 따라 지속적으로 업데이트됩니다.

---

## 🎯 사이트 컨셉

**Hero Copy**
```
Complex problems, Structured systems.
어려운 문제를 구조로 풀고, 없던 체계를 만드는 프론트엔드 엔지니어.
```

**디자인 시스템** (2026-06-30 ADR: "Deep Wine" 컨셉 → "다크 우선 + 시안/블루 네온" 컨셉으로 전환)
- 기본 테마: 다크 모드 우선 (`next-themes`, `defaultTheme="dark"`) + 라이트 모드 토글 지원
- Primary: `#0f172a` (Deep Dark Blue)
- Secondary: `#1d4ed8` (다크) / `#2563eb` (라이트) — Blue
- Accent: `#22d3ee` (다크) / `#0f766e` (라이트) — Cyan/Teal 포인트 컬러
- Background: `#060816` (다크) / `#f4f7ff` (라이트)
- Font: Inter, Pretendard Variable, Noto Sans KR

---

## 🗺️ 사이트맵

```
/           → Hero
/about      → About & Timeline
/projects   → Project Case Studies
/lab        → Live Demos
/blog       → Blog (MDX)
/blog/[slug]→ Blog 상세 (AI 요약 포함)
/chat       → Ask My Career (AI 챗봇)
```

---

## 📄 페이지별 스펙

### 1. `/` — Hero

**목적:** 첫인상. 역량을 강렬하게 각인.

**구성 요소**
- Three.js 기반 3D 배경 (은은하게 움직이는 파티클 or 기하 오브젝트)
- 메인 카피: `Complex problems, Structured systems.`
- 서브 카피: `어려운 문제를 구조로 풀고, 없던 체계를 만드는 프론트엔드 엔지니어.`
- 핵심 기술 스택 배지 (React, TypeScript, Next.js, Three.js 등)
- 스크롤 유도 CTA (About 섹션으로 이동)

**기술 포인트**
- Three.js는 `dynamic import` + `Suspense`로 SSR 분리 처리
- 성능: Lighthouse 기준 LCP 영향 최소화

---

### 2. `/about` — About

**목적:** "왜 이 사람인가"에 대한 스토리텔링.

**구성 요소**
- 수직 타임라인
  - ~2021 : LG Display 공장 엔지니어
  - ~2023~ : Full-stack Development Immersion (독학 및 부트캠프, 기술적 전환기)
  - 2025~ : Medit (웹 프론트엔드 엔지니어, 시스템 구축 및 메인 피처 리드)
- 스토리 포인트: "왜 개발자인가"가 아닌 "어떤 태도로 소프트웨어를 대하는가" 중심
- 강조 블록: 혼자 시작한 것들
  - GitHub Actions 공용 레포 구축 (팀 전체 레포 적용)
  - react-components 패키지 최초 배포 (컴포넌트 50%+ 기여)
  - MOS Web Portal 프로젝트 CLI 없이 0부터 세팅
- 기술 스택 섹션 (카테고리별 정리)

**Tech Stack 상세**

### 🌐 Frontend (Core & Libraries)
* React (React 19 Beta 선행 도입 및 아키텍처 검토 경험)
* TypeScript (명시적 타입 선언을 통한 엄격한 타입 안정성 확보)
* Next.js (개인 프로젝트 및 아키텍처 검토)
* Vanilla Extract (정적 스타일링 및 제로 런타임 CSS 기술 스택)
* Emotion / styled-components (CSS-in-JS 스타일링 아키텍처 고도화)
* Tailwind CSS (빌드 산출물 비교 및 전환 경험)
* MUI (Material UI - 상용 패키지 대규모 마이그레이션 및 커스텀 컴포넌트 대체 경험)
* HTML5 / CSS3 / Web 표준 (window.print, Print CSS 인프라 구축)
* 3D Canvas / WebGL (사내 3D 렌더링 모듈 연동 및 런타임 성능 최적화 경험)

### 📦 State Management & Data Fetching
* React Query (TanStack Query - 서버 상태 동기화 및 캐싱 전략 수립)
* Zustand (경량화된 전사 전역 상태 관리 체계 설계)
* React Hooks (무한 스크롤, 상태 제어 등 전사 공통 커스텀 훅 패키지 단독 개발)

### 🛠️ Tooling & API Automation
* Orval (OpenAPI 스펙 기반 API 코드 자동 생성 스크립트 구축 및 DX 개선)
* Vite (빌드 및 개발 환경 생산성 개선)
* modern-screenshot / html-to-image (웹 화면 캡처 및 PDF 렌더링 엔진 기술 검토)
* Nx (Micro Frontend Architecture - MFA 도입을 위한 모노레포 빌드 시스템 검토)

### 🧪 Testing & Quality Control
* Vitest (jsdom 기반 컴포넌트 단위 테스트 환경 구축)
* Playwright (E2E 테스트 자동화 및 시나리오 구축)
* ESLint / Stylistic (코드 정적 분석 및 포맷팅 컨벤션 표준화)

### 🚀 Infra & DevOps (CI/CD)
* GitHub Actions (정적 분석, PR 워크플로우 자동화)
* Semantic Release (커밋 기반 자동 버전 관리 및 NPM/GitHub Package Registry 배포 자동화)
* Git / GitHub (브랜치 전략 운영 및 기민한 코드 리뷰 문화 주도)

### 📊 Collaboration & Domain
* Jira / Slack / Figma (디자인 시안 분석 및 컴포넌트 단위 매핑 협업)
* 대규모 데이터 중심의 논리적 사고 및 공정/운영 프로세스 이해도 (이전 엔지니어링 경력 기반)

---

### 3. `/projects` — Projects

**목적:** 실제로 어떤 어려운 문제를 어떻게 풀었는지 증명.

**구성 요소**
- 프로젝트 카드 목록 (핵심 3개 + 기타)
- 카드 클릭 → 상세 페이지 (`/projects/[slug]`)

**핵심 프로젝트 3개**

| 프로젝트 | 핵심 어필 |
|---|---|
| Medit AuraVue | X-ray 좌표 기반 자동 캡처, 3D Canvas crop, Before/After Slider, 특허 출원 도전 |
| Medit Checkpoint | 클라이언트 PDF 생성, 22개국 다국어 폰트 대응, Safari/iOS 렌더링 이슈 해결 |
| Medit Cloud (NX) | NX Monorepo + MFE 구조 설계, Webpack Module Federation, Vitest + Playwright 환경 구축 |

**상세 페이지 구조 (Challenge / Action / Result)**
```
Challenge  → 어떤 문제가 있었나
Action     → 내가 어떻게 접근했나 (기술적 근거 포함)
Result     → 결과 및 임팩트
```

---

### 4. `/lab` — Lab

**목적:** 기술적 실험과 라이브 데모. "이 사람 직접 만들 줄 안다" 증명.

**데모 2개**

**① 3D Playground**
- 마우스로 3D 오브젝트 조작
- 좌표값 실시간 추출 및 표시
- 바운딩 박스 시각화
- → 별도 npm 패키지로 분리 후 install해서 사용 (엔지니어링 자산화)

**② PDF Generator**
- 브라우저에서 직접 PDF 생성
- 폰트 로딩 과정 시각화
- 다국어 폰트 렌더링 데모
- → react-pdf/renderer 활용

---

### 5. `/blog` — Blog

**목적:** "고민하고 쓰는 개발자"임을 증명하는 공간.

**구성 요소**
- MDX 파일 기반 (로컬 작성 → 빌드 시 포함)
- 카테고리: `TIL` / `Deep Dive` / `회고`
- 목록 페이지: 카드형 레이아웃, 카테고리 필터

**첫 글 후보 (우선순위 순)**
1. "react-pdf vs jsPDF — 우리가 선택한 이유" (이미 비교 경험 있음)
2. "html-to-image vs html2canvas — DOM 캡처 패키지 비교"
3. "Tailwind v4 CSS-first 시스템으로의 전환"

**블로그 상세 페이지 (`/blog/[slug]`)**
- AI 요약 버튼 → Claude API 호출 → 핵심 3줄 요약
- 예상 읽기 시간 표시
- 목차 (TOC) 자동 생성

---

### 6. `/chat` — Ask My Career

**목적:** 채용 담당자가 직접 "이 사람"에게 질문하는 경험 제공.

**동작 방식**
- 사용자가 질문 입력 (예: "PDF 관련 경험이 있나요?")
- 내 이력/성과 데이터 기반으로 Claude API가 답변
- RAG 구조 (이력 데이터 임베딩)

**학습 데이터 후보**
- 주요 프로젝트 성과 요약
- 기술 스택 및 경험 레벨
- 패키지 비교 및 기술 선정 근거
- 문제 해결 사례

**UX**
- 채팅 인터페이스
- 추천 질문 버튼 3~5개 (예: "3D 경험이 있나요?", "어떤 패키지를 선호하나요?")
- 답변 후 관련 프로젝트/블로그 링크 연결

---

## 🏁 Milestone 계획

| Milestone | 포함 페이지 | 목표 |
|---|---|---|
| Milestone 1: Foundation & Identity | Hero, About | 사이트 첫인상과 스토리 완성 |
| Milestone 2: Deep-Dive Technical Proof | Projects, Lab | 기술력 증명 콘텐츠 완성 |
| Milestone 3: Thought Leadership & Interaction | Blog, Ask My Career | 차별화 기능 완성 |

---

## 📌 미결정 사항

- [ ] 3D 패키지 이름 결정
- [ ] Blog MDX 라이브러리 선정 (contentlayer2 vs next-mdx-remote vs fumadocs)
- [ ] AI 챗봇 RAG 구조 상세 설계
- [ ] `/projects/[slug]` 상세 페이지 포함 여부 (카드에서 모달로 처리할지)
