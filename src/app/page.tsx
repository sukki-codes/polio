export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-15 py-80">
      {/* 도트 그리드 배경 */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* 컬러 글로우 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-640 w-5xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[13rem]" />
        <div className="absolute -bottom-60 -left-40 h-350 w-500 rounded-full bg-secondary/20 blur-[9rem]" />
        <div className="absolute -right-40 top-0 h-280 w-340 rounded-full bg-accent/5 blur-[7rem]" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center gap-20 text-center">
        {/* 뱃지 */}
        <div className="flex items-center gap-8 rounded-full border border-accent/20 bg-accent/6 px-16 py-7">
          <span className="h-7 w-7 animate-pulse rounded-full bg-accent" />
          <span className="text-[1.1rem] font-medium tracking-[0.14em] text-accent uppercase">
            AI Platform
          </span>
        </div>

        {/* 헤드라인 */}
        <h1 className="max-w-740 text-[4rem] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[5.2rem] md:text-[6.4rem]">
          <span className="gradient-text">Intelligence</span>
          <br />
          <span className="text-text-main">meets design.</span>
        </h1>

        {/* 서브텍스트 */}
        <p className="max-w-520 text-[1.6rem] leading-[1.8] text-text-sub">
          Build, explore, and scale with a platform crafted for the future of AI.
        </p>

        {/* CTA 버튼 */}
        <div className="mt-5 flex flex-col gap-8 sm:flex-row">
          <button className="rounded-full bg-accent px-30 py-13 text-[1.4rem] font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-[#7c3aed] hover:shadow-accent/40">
            Get Started
          </button>
          <button className="rounded-full border border-black/10 px-30 py-13 text-[1.4rem] font-medium text-text-sub transition-all duration-200 hover:border-black/20 hover:bg-black/4 hover:text-text-main">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
