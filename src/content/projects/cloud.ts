import type { Project } from './types';

export const cloud: Project = {
  slug: 'cloud',
  ko: {
    title: 'Medit Cloud: API 자동화 세팅 및 CI/CD 개발 인프라 구축',
    tagline: 'NX Monorepo + MFE 구조 설계, Webpack Module Federation, Vitest + Playwright 환경 구축',
    challenge: [
      '멀티 프로젝트/모노레포 환경에서 백엔드 API 스펙이 변경될 때마다 프론트엔드 단에서 수동으로 타입을 맞추고 훅을 작성해야 하는 소모적인 반복 작업이 발생하여 DX(개발자 경험)를 저해하고 있었습니다.',
      '토큰 만료 시 세션이 끊겨 유저가 튕기거나, 배포 시마다 버전을 수동으로 기입하여 휴먼 에러가 발생할 가능성이 존재했습니다.',
    ],
    action: [
      'OpenAPI 스펙을 기반으로 Orval을 전격 도입하여 React Query(TanStack Query) 훅을 자동으로 생성하는 환경을 완벽하게 구축했습니다. 이 과정에서 자동 생성 스크립트 특유의 불필요한 빈 줄이 대량 발생하는 이슈까지 직접 리팩토링하여 스크립트 퀄리티를 높였습니다.',
      '유저 세션 안정을 위해 Access Token 만료 시점을 정교하게 감지하고, 백그라운드에서 자동으로 토큰을 갱신(Refresh Token 연동)해 주는 안전한 API 호출 파이프라인을 설계했습니다.',
      'GitHub Actions와 Semantic Release를 연동하여 PR 생성 시 코드 정적 분석(ESLint, TypeScript, Stylistic)을 자동화하고, 커밋 메시지를 파싱하여 유의적 버전 계산 및 NPM/GitHub 패키지 배포가 원클릭으로 이루어지도록 파이프라인을 정착시켰습니다.',
    ],
    result: [
      'API 명세 변경에 따른 휴먼 에러를 제로화하고 로그인 및 서버 상태 캐싱 전략을 공통화하여 팀 내 개발 생산성(DX)을 극대화했습니다.',
      '패키지 배포 및 버전 관리 프로세스를 100% 자동화함으로써 릴리즈 코스트를 완벽히 제거하고, 팀원들이 오직 비즈니스 로직 설계에만 몰입할 수 있는 단단한 표준 인프라를 선물했습니다.',
    ],
  },
  en: {
    title: 'Medit Cloud: API Automation Setup & CI/CD Infrastructure',
    tagline: 'NX monorepo + MFE architecture design, Webpack Module Federation, and a Vitest + Playwright testing environment',
    challenge: [
      'In a multi-project/monorepo environment, every backend API spec change forced the frontend to manually match types and write hooks — a repetitive, costly task that hurt developer experience.',
      'There was also a risk of users being kicked out when tokens expired, and of human error from manually entering version numbers on every deploy.',
    ],
    action: [
      'Fully adopted Orval on top of the OpenAPI spec to build an environment that auto-generates React Query (TanStack Query) hooks — including refactoring the generator scripts themselves to fix the excessive blank lines they produced, improving script quality.',
      'Designed a secure API call pipeline that precisely detects access-token expiry and automatically refreshes tokens in the background (via refresh-token integration) to keep user sessions stable.',
      'Integrated GitHub Actions with Semantic Release to automate static analysis (ESLint, TypeScript, Stylistic) on every PR, and established a pipeline that parses commit messages to compute semantic versions and publish to NPM/GitHub Packages in one click.',
    ],
    result: [
      'Eliminated human error from API spec changes and unified the login/server-state caching strategy, maximizing team developer productivity.',
      'Fully automated package publishing and version management, eliminating release overhead entirely and delivering a solid standard infrastructure that lets teammates focus purely on business logic.',
    ],
  },
};
