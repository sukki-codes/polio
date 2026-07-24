export type BlockType = 'heading' | 'image-placeholder' | 'paragraph';

export type Block = {
  content: string;
  id: string;
  type: BlockType;
};

export type DemoLocale = 'ar' | 'en' | 'ja' | 'ko';

export const DEMO_LOCALES: DemoLocale[] = ['ko', 'en', 'ja', 'ar'];

export const REPORT_SEED: Record<DemoLocale, Block[]> = {
  ar: [
    { id: 'ar-1', type: 'heading', content: 'تقرير فحص الجودة للربع الرابع 2026' },
    { id: 'ar-2', type: 'paragraph', content: 'يلخص هذا التقرير النتائج التي تم جمعها أثناء عملية الفحص.' },
    { id: 'ar-3', type: 'image-placeholder', content: 'التقاط صورة الفحص' },
    { id: 'ar-4', type: 'paragraph', content: 'لم يتم العثور على أي ملاحظات غير طبيعية في جميع العناصر التي تم فحصها.' },
  ],
  en: [
    { id: 'en-1', type: 'heading', content: 'Q4 2026 Quality Inspection Report' },
    { id: 'en-2', type: 'paragraph', content: 'This report summarizes the results collected during the inspection process.' },
    { id: 'en-3', type: 'image-placeholder', content: 'Inspection image capture' },
    { id: 'en-4', type: 'paragraph', content: 'No anomalies were found across all inspected items.' },
  ],
  ja: [
    { id: 'ja-1', type: 'heading', content: '2026年第4四半期 品質検査レポート' },
    { id: 'ja-2', type: 'paragraph', content: '本レポートは検査工程で収集された結果をまとめたものです。' },
    { id: 'ja-3', type: 'image-placeholder', content: '検査画像キャプチャ' },
    { id: 'ja-4', type: 'paragraph', content: '全項目において異常所見は見つかりませんでした。' },
  ],
  ko: [
    { id: 'ko-1', type: 'heading', content: '2026년 4분기 품질 검사 리포트' },
    { id: 'ko-2', type: 'paragraph', content: '이 리포트는 검사 공정에서 수집된 결과를 요약합니다.' },
    { id: 'ko-3', type: 'image-placeholder', content: '검사 이미지 캡처' },
    { id: 'ko-4', type: 'paragraph', content: '전체 항목 중 이상 소견은 발견되지 않았습니다.' },
  ],
};
