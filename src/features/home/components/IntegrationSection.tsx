export default function IntegrationSection() {
  const brands = [
    {
      name: "FLUKE",
      logo: "/images/brands/fluke.webp",
      className: "h-4 sm:h-5 md:h-[20px] max-w-[90px] sm:max-w-[105px] md:max-w-[115px]",
    },
    {
      name: "Weller",
      logo: "/images/brands/weller.webp",
      className: "h-4 sm:h-5 md:h-[21px] max-w-[80px] sm:max-w-[95px] md:max-w-[105px]",
    },
    {
      name: "ZEBRA",
      logo: "/images/brands/zebra.svg",
      className: "h-4 sm:h-5 md:h-[20px] max-w-[65px] sm:max-w-[75px] md:max-w-[85px]",
    },
    {
      name: "3M",
      logo: "/images/brands/3m.webp",
      className: "h-3.5 sm:h-4 md:h-[18px] max-w-[40px] sm:max-w-[48px] md:max-w-[55px]",
    },
    {
      name: "Honeywell",
      logo: "/images/brands/honeywell.webp",
      className: "h-3.5 sm:h-4.5 md:h-[19px] max-w-[90px] sm:max-w-[105px] md:max-w-[115px]",
    },
    {
      name: "Keysight",
      logo: "/images/brands/keysight.webp",
      className: "h-3.5 sm:h-4.5 md:h-[19px] max-w-[95px] sm:max-w-[110px] md:max-w-[120px]",
    },
    {
      name: "Impinj",
      logo: "/images/brands/impinj.webp",
      className: "h-4.5 sm:h-5.5 md:h-[23px] max-w-[65px] sm:max-w-[75px] md:max-w-[85px]",
    },
    {
      name: "Amphenol",
      logo: "/images/brands/amphenol.webp",
      className: "h-4 sm:h-5 md:h-[20px] max-w-[85px] sm:max-w-[98px] md:max-w-[110px]",
    },
  ];

  // Repeat for continuous seamless infinite loop
  const trackBrands = [...brands, ...brands, ...brands];

  return (
    <section className="w-full py-6 sm:py-7 bg-white border-t border-gray-100 overflow-hidden relative">
      {/* Section Header */}
      <div className="w-full max-w-[100rem] mx-auto px-4 text-center mb-3 sm:mb-4">
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
      <div className="w-full relative overflow-hidden select-none py-1.5">
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
        <div className="flex w-full overflow-hidden items-center min-h-[46px] sm:min-h-[52px]">
          {/* Track 1 */}
          <div className="brand-ribbon-track">
            {trackBrands.map((b, idx) => (
              <div
                key={`brand-1-${b.name}-${idx}`}
                className="shrink-0 px-5 sm:px-7 md:px-8 py-1 flex items-center justify-center h-11 sm:h-12 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 select-none cursor-default"
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
                className="shrink-0 px-5 sm:px-7 md:px-8 py-1 flex items-center justify-center h-11 sm:h-12 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 select-none cursor-default"
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
