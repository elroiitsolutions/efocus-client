export default function IntegrationSection() {
  const brands = [
    {
      name: "FLUKE",
      logo: "/images/brands/fluke.webp",
      className: "h-6 sm:h-7 md:h-[28px] max-w-[125px] sm:max-w-[140px] md:max-w-[150px]",
    },
    {
      name: "Weller",
      logo: "/images/brands/weller.webp",
      className: "h-6 sm:h-7 md:h-[29px] max-w-[105px] sm:max-w-[120px] md:max-w-[130px]",
    },
    {
      name: "ZEBRA",
      logo: "/images/brands/zebra.svg",
      className: "h-6 sm:h-7 md:h-[28px] max-w-[85px] sm:max-w-[95px] md:max-w-[105px]",
    },
    {
      name: "3M",
      logo: "/images/brands/3m.webp",
      className: "h-5 sm:h-6 md:h-[25px] max-w-[50px] sm:max-w-[60px] md:max-w-[70px]",
    },
    {
      name: "Honeywell",
      logo: "/images/brands/honeywell.webp",
      className: "h-5 sm:h-6 md:h-[26px] max-w-[120px] sm:max-w-[135px] md:max-w-[145px]",
    },
    {
      name: "Keysight",
      logo: "/images/brands/keysight.webp",
      className: "h-5 sm:h-6 md:h-[26px] max-w-[130px] sm:max-w-[145px] md:max-w-[155px]",
    },
    {
      name: "Impinj",
      logo: "/images/brands/impinj.webp",
      className: "h-7 sm:h-8 md:h-[32px] max-w-[80px] sm:max-w-[95px] md:max-w-[105px]",
    },
    {
      name: "Amphenol",
      logo: "/images/brands/amphenol.webp",
      className: "h-6 sm:h-7 md:h-[27px] max-w-[115px] sm:max-w-[130px] md:max-w-[140px]",
    },
  ];

  // Repeat for continuous seamless infinite loop
  const trackBrands = [...brands, ...brands, ...brands];

  return (
    <section className="w-full py-8 sm:py-10 bg-white border-t border-gray-100 overflow-hidden relative">
      {/* Section Header */}
      <div className="w-full max-w-[100rem] mx-auto px-4 text-center mb-4 sm:mb-5">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0d0f11] tracking-tight">
          Authorized & Multi-Brand Industrial Partner
        </h2>
      </div>

      {/* Style keyframe for continuous sliding marquee (non-stopping on hover) */}
      <style>{`
        @keyframes brandRibbonTickerReverse {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .brand-ribbon-track {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          min-width: 100%;
          animation: brandRibbonTickerReverse 60s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Dual Track Container with Gradient Edge Fades */}
      <div className="w-full relative overflow-hidden select-none py-2">
        {/* Left Gradient Edge Fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 bg-gradient-to-r from-white via-white/90 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Right Gradient Edge Fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 bg-gradient-to-l from-white via-white/90 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Marquee Track */}
        <div className="flex w-full overflow-hidden items-center min-h-[56px] sm:min-h-[64px]">
          {/* Track 1 */}
          <div className="brand-ribbon-track">
            {trackBrands.map((b, idx) => (
              <div
                key={`brand-1-${b.name}-${idx}`}
                className="shrink-0 px-6 sm:px-8 md:px-10 py-1 flex items-center justify-center h-14 sm:h-16 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 select-none cursor-default"
                title={b.name}
              >
                <img
                  src={b.logo}
                  alt={b.name}
                  className={`${b.className} w-auto object-contain select-none pointer-events-none`}
                  loading="eager"
                />
              </div>
            ))}
          </div>

          {/* Track 2 (Identical clone for seamless continuous infinite marquee) */}
          <div className="brand-ribbon-track" aria-hidden="true">
            {trackBrands.map((b, idx) => (
              <div
                key={`brand-2-${b.name}-${idx}`}
                className="shrink-0 px-6 sm:px-8 md:px-10 py-1 flex items-center justify-center h-14 sm:h-16 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 select-none cursor-default"
                title={b.name}
              >
                <img
                  src={b.logo}
                  alt={b.name}
                  className={`${b.className} w-auto object-contain select-none pointer-events-none`}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
