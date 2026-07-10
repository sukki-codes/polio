import type { Project } from './types';

export const auravue: Project = {
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
};
