"use client";

export default function StatsRibbon() {
  const stats = [
    {
      value: "90%",
      label: "Client Satisfaction",
      hasStar: false,
      icon: (
        <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0 shadow-2xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ),
    },
    {
      value: "10M+",
      label: "automated workflows",
      hasStar: false,
      icon: (
        <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0 shadow-2xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </span>
      ),
    },
    {
      value: "4.9",
      star: "★",
      label: "user rating",
      hasStar: true,
      icon: (
        <span className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs text-xs font-bold">
          ★
        </span>
      ),
    },
  ];

  // Repeat items for seamless 100% gapless continuous marquee
  const trackItems = [...stats, ...stats, ...stats, ...stats];

  return (
    <section 
      aria-label="Operational Metrics Ribbon" 
      className="w-full relative overflow-hidden py-3.5 sm:py-4.5 bg-[#fbfcfd] border-t border-gray-200/70 select-none group"
    >
      {/* 60fps Butter-Smooth Infinite Ribbon Marquee Keyframes (Right to Left) */}
      <style>{`
        @keyframes ribbonTicker {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        .stats-ribbon-track {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          min-width: 100%;
          animation: ribbonTicker 70s linear infinite;
          will-change: transform;
        }
        .group:hover .stats-ribbon-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Left Gradient Edge Fade */}
      <div 
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 bg-gradient-to-r from-[#fbfcfd] via-[#fbfcfd]/90 to-transparent z-10" 
        aria-hidden="true" 
      />

      {/* Right Gradient Edge Fade */}
      <div 
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 bg-gradient-to-l from-[#fbfcfd] via-[#fbfcfd]/90 to-transparent z-10" 
        aria-hidden="true" 
      />

      {/* Dual Track Container for 100% Gapless Loop */}
      <div className="flex w-full overflow-hidden items-center">
        {/* Track 1 */}
        <div className="stats-ribbon-track">
          {trackItems.map((item, idx) => (
            <div key={`stats-1-${idx}`} className="flex items-center shrink-0">
              {/* Stat Capsule Card matching eFocus Design System */}
              <div className="h-11 sm:h-12 px-4.5 sm:px-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all duration-300 flex items-center gap-3 cursor-default hover:-translate-y-0.5">
                {item.icon}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-[#111315] tracking-tight font-sans">
                    {item.value}
                  </span>
                  {item.hasStar && (
                    <span className="text-lg sm:text-xl text-[#7c3aed] leading-none select-none">
                      {item.star}
                    </span>
                  )}
                  <span className="text-xs sm:text-[13px] text-gray-500 font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Decorative Separator Pill between Stats */}
              <div className="flex items-center gap-2 mx-4 sm:mx-6 shrink-0 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AF0202]/70 shadow-[0_0_6px_rgba(175,2,2,0.35)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Track 2 (Identical clone for seamless loop) */}
        <div className="stats-ribbon-track" aria-hidden="true">
          {trackItems.map((item, idx) => (
            <div key={`stats-2-${idx}`} className="flex items-center shrink-0">
              {/* Stat Capsule Card matching eFocus Design System */}
              <div className="h-11 sm:h-12 px-4.5 sm:px-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all duration-300 flex items-center gap-3 cursor-default hover:-translate-y-0.5">
                {item.icon}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-[#111315] tracking-tight font-sans">
                    {item.value}
                  </span>
                  {item.hasStar && (
                    <span className="text-lg sm:text-xl text-[#7c3aed] leading-none select-none">
                      {item.star}
                    </span>
                  )}
                  <span className="text-xs sm:text-[13px] text-gray-500 font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Decorative Separator Pill between Stats */}
              <div className="flex items-center gap-2 mx-4 sm:mx-6 shrink-0 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AF0202]/70 shadow-[0_0_6px_rgba(175,2,2,0.35)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


