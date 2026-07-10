import type { Project } from './types';

export const checkpoint: Project = {
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
};
