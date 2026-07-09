type ProjectContent = {
  title: string;
  tagline: string;
  challenge: string[];
  action: string[];
  result: string[];
};

export type Project = {
  slug: string;
  ko: ProjectContent;
  en: ProjectContent;
};

export const PROJECTS: Project[] = [
  {
    slug: 'auravue',
    ko: {
      title: 'Medit AuraVue: 3D 그래픽스 연동 및 대시보드 렌더링 최적화',
      tagline: 'X-ray 좌표 기반 자동 캡처, 3D Canvas crop, Before/After Slider, 특허 출원 도전',
      challenge: [
        'WebGL/3D Canvas 기반의 스캔 데이터 제어 기능(악궁 선택, 교합면 보기 등)이 포함된 대시보드 화면에서 복잡한 UI 컨텍스트가 얽혀 무한 리렌더링이 발생하는 성능 병목 현상이 있었습니다.',
        '3D 렌더링 모듈과 일반 UI 컴포넌트 간의 렌더링 라이프사이클이 분리되지 않아 화면이 버벅이거나 런타임 성능이 저하되는 문제가 존재했습니다.',
      ],
      action: [
        '비대해진 UI 컨텍스트를 도메인 및 책임별로 촘촘하게 분리하는 대대적인 리팩토링을 주도했습니다.',
        '3D Canvas 모듈의 데이터 흐름을 분석하여 불필요하게 중복으로 호출되던 API 구조를 완전히 개선하고, 상태 변경이 불필요한 렌더링을 유발하지 않도록 방어하는 아키텍처를 적용했습니다.',
      ],
      result: [
        '화면 단의 렌더링 런타임 성능을 대폭 최적화하여 복잡한 3D 교합 히트맵 및 데이터 인터랙션 시에도 버벅임 없는 안정적인 프레임율(FPS)을 확보했습니다.',
        '컴포넌트 간 결합도가 낮아져 추후 새로운 3D 기능이나 UI 요소를 추가하기 용이한 확장성 높은 코드를 완성했습니다.',
      ],
    },
    en: {
      title: 'Medit AuraVue: 3D Graphics Integration & Dashboard Rendering Optimization',
      tagline: 'X-ray coordinate-based auto-capture, 3D canvas cropping, a before/after slider, and a patent application in progress',
      challenge: [
        'The dashboard screen — which includes WebGL/3D Canvas-based scan data controls (arch selection, occlusal view, etc.) — suffered a performance bottleneck where tangled UI context caused infinite re-renders.',
        "The 3D rendering module and regular UI components didn't have separated rendering lifecycles, causing the screen to stutter and degrading runtime performance.",
      ],
      action: [
        'Led a large-scale refactor that split the bloated UI context tightly by domain and responsibility.',
        "Analyzed the 3D Canvas module's data flow to remove redundant duplicate API calls, and applied an architecture that prevents state changes from triggering unnecessary re-renders.",
      ],
      result: [
        'Dramatically optimized rendering runtime performance, achieving a stable frame rate with no stuttering even during complex 3D occlusal heatmap rendering and data interaction.',
        'Lowered coupling between components, resulting in highly extensible code that makes it easy to add new 3D features or UI elements going forward.',
      ],
    },
  },
  {
    slug: 'checkpoint',
    ko: {
      title: 'Checkpoint: 차세대 웹 표준 문서 플랫폼 PoC 리드',
      tagline: '클라이언트 PDF 생성, 22개국 다국어 폰트 대응, Safari/iOS 렌더링 이슈 해결',
      challenge: [
        '기존 PDF 생성 방식(@react-pdf/renderer로 HTML을 이미지 캡처 후 조립)은 파일 생성 로딩 시간이 매우 길고, 텍스트가 전부 이미지로 변환되어 검색이나 복사가 불가능하다는 고질적인 한계가 있었습니다.',
        '또한 글로벌 출시 과정에서 CJK 폰트 깨짐, SVG 스타일 유실, 브라우저별 레이아웃 편차 등의 트러블 슈팅 이슈가 지속해서 발생했습니다.',
      ],
      action: [
        '기존 PDF 생성 방식 대신 사용자가 브라우저에서 즉시 확인하고 제어할 수 있는 차세대 HTML Report Viewer 도입을 제안하고 사전 PoC를 주도했습니다.',
        'window.print()와 Print CSS 기반으로 브라우저 크로스 테스트를 진행하여 대부분의 문서 스펙을 웹 표준으로 검증하고, Safari 환경에서 미리보기가 미세하게 틀어지는 레이아웃 이슈까지 예외 처리로 방어했습니다.',
        '더불어 기존 html-to-image 패키지의 속도 및 렌더링 한계를 극복하기 위해 최신 캡처 엔진인 modern-screenshot 도입 타당성을 정교하게 검토하고 문서화했습니다.',
      ],
      result: [
        'React 컴포넌트를 100% 그대로 재사용하면서 실제 텍스트 복사/검색이 가능한 웹 표준 문서 환경을 성공적으로 검증했습니다.',
        '단순 조회를 넘어 블록 단위 드래그 재배열(Drag & Drop) 및 인라인 텍스트 편집 기능까지 가볍게 연동할 수 있음을 완벽히 PoC로 증명하여, 향후 WYSIWYG 편집이나 3D Viewer 삽입까지 확장 가능한 강력한 문서 인프라 기틀을 마련했습니다.',
      ],
    },
    en: {
      title: 'Checkpoint: Leading a PoC for a Next-Generation Web-Standard Document Platform',
      tagline: 'Client-side PDF generation, multilingual font support across 22 countries, and resolving Safari/iOS rendering issues',
      challenge: [
        "The existing PDF pipeline (capturing HTML as images via @react-pdf/renderer and assembling them) had a chronic limitation: file generation was very slow, and since all text was converted to images, it couldn't be searched or copied.",
        'During the global rollout, we also kept running into troubleshooting issues — broken CJK fonts, lost SVG styles, and layout discrepancies across browsers.',
      ],
      action: [
        'Proposed a next-generation HTML report viewer — letting users view and control the document instantly in the browser — instead of the existing PDF pipeline, and led the upfront PoC.',
        'Ran cross-browser tests based on window.print() and Print CSS to validate most document specs against web standards, and guarded against subtle Safari preview layout shifts with dedicated exception handling.',
        'Also rigorously evaluated and documented the feasibility of adopting modern-screenshot, a newer capture engine, to overcome the speed and rendering limits of the existing html-to-image package.',
      ],
      result: [
        'Successfully validated a web-standard document environment that reuses React components 100% as-is while supporting real text copy and search.',
        'Proved via PoC that block-level drag-and-drop reordering and inline text editing could be layered on lightly, beyond simple viewing — laying a strong foundation for a document infrastructure extensible to future WYSIWYG editing or embedded 3D viewers.',
      ],
    },
  },
  {
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
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
