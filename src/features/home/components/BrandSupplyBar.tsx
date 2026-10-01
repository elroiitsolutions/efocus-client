"use client";

export default function BrandSupplyBar() {
  const clients = [
    {
      name: "Delta",
      customRender: (
        <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-all duration-200">
          <svg className="w-5 h-5 text-[#0066b2] fill-current shrink-0" viewBox="0 0 24 24">
            <polygon points="12,2 2,22 22,22" />
          </svg>
          <span className="font-extrabold text-[15px] sm:text-[16px] tracking-wider text-[#111315]">
            DELTA
          </span>
        </div>
      ),
    },
    {
      name: "Bharat FIH",
      customRender: (
        <div className="flex flex-col items-start opacity-80 hover:opacity-100 transition-all duration-200 leading-none">
          <span className="font-extrabold text-[14px] sm:text-[15px] tracking-tight text-[#111315]">
            BHARAT FIH
          </span>
          <span className="text-[7.5px] text-gray-500 font-medium mt-0.5 tracking-tight">
            A Foxconn Technology Group Company
          </span>
        </div>
      ),
    },
    {
      name: "Ashok Leyland",
      customRender: (
        <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-all duration-200">
          <div className="w-5 h-5 rounded-full border border-gray-900 flex items-center justify-center font-bold text-[9px] text-gray-900 shrink-0">
            L
          </div>
          <span className="font-bold text-[12px] sm:text-[13px] tracking-wider text-[#111315]">
            ASHOK LEYLAND
          </span>
        </div>
      ),
    },
    {
      name: "Valeo",
      customRender: (
        <div className="flex items-center opacity-85 hover:opacity-100 transition-all duration-200">
          <span className="font-black text-[18px] sm:text-[19px] italic text-[#6ca82b]">
            Valeo
          </span>
        </div>
      ),
    },
    {
      name: "Hyundai",
      customRender: (
        <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-all duration-200 leading-none">
          <svg className="w-6 h-4 text-[#002c6c] shrink-0" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <ellipse cx="12" cy="8" rx="10" ry="6" />
            <path d="M8,4 L10,4 L11,12 L9,12 Z M14,4 L16,4 L15,12 L13,12 Z M9.5,8 L14.5,8" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span className="text-[7.5px] font-bold tracking-widest text-[#111315] mt-1">
            HYUNDAI
          </span>
        </div>
      ),
    },
    {
      name: "Tata Electronics",
      customRender: (
        <div className="flex flex-col items-start opacity-80 hover:opacity-100 transition-all duration-200 leading-none">
          <span className="font-bold text-[13px] sm:text-[14px] tracking-wider text-[#004B87]">
            TATA
          </span>
          <span className="text-[7.5px] tracking-wider text-gray-500 uppercase mt-0.5 font-semibold">
            ELECTRONICS
          </span>
        </div>
      ),
    },
    {
      name: "Motorola",
      customRender: (
        <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-all duration-200">
          <div className="w-5 h-5 rounded-full border border-gray-900 flex items-center justify-center font-extrabold text-[11px] italic text-gray-900 shrink-0">
            M
          </div>
          <span className="font-bold text-[13px] sm:text-[14px] tracking-tight text-[#111315]">
            motorola
          </span>
        </div>
      ),
    },
    {
      name: "Wistron",
      customRender: (
        <div className="flex items-center opacity-80 hover:opacity-100 transition-all duration-200">
          <span className="font-extrabold text-[15px] sm:text-[16px] tracking-tight text-[#111315] italic">
            wistron
          </span>
        </div>
      ),
    },
    {
      name: "CVRDE (DRDO)",
      customRender: (
        <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-all duration-200">
          <div className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center font-bold text-[7px] text-gray-900 shrink-0">
            DRDO
          </div>
          <span className="font-bold text-[11px] sm:text-[12px] tracking-tight text-[#111315]">
            CVRDE
          </span>
        </div>
      ),
    },
    {
      name: "ISRO",
      customRender: (
        <div className="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-all duration-200">
          <span className="font-extrabold text-[14px] sm:text-[15px] tracking-widest text-[#F37021]">
            ISRO
          </span>
        </div>
      ),
    },
    {
      name: "TANGEDCO",
      customRender: (
        <div className="flex items-center opacity-80 hover:opacity-100 transition-all duration-200">
          <span className="font-bold text-[12px] sm:text-[13px] tracking-wider text-[#111315]">
            TANGEDCO
          </span>
        </div>
      ),
    },
    {
      name: "HCL",
      customRender: (
        <div className="flex items-center opacity-85 hover:opacity-100 transition-all duration-200">
          <span className="font-black text-[17px] sm:text-[18px] tracking-tight text-[#0066B2]">
            HCL
          </span>
        </div>
      ),
    },
  ];

  // Repeat clients to ensure seamless continuous coverage on any display
  const trackClients = [...clients, ...clients];

  return (
    <section 
      aria-label="Our Valuable Clients"
      className="w-full bg-[#fbfcfd] pt-3 pb-4 sm:pt-3.5 sm:pb-5 border-b border-gray-200/70 relative overflow-hidden select-none group"
    >
      {/* Reverse 60fps Butter-Smooth Infinite Ribbon Marquee Keyframes */}
      <style>{`
        @keyframes brandRibbonTickerReverse {
          0% {
            transform: translate3d(-100%, 0, 0);
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
          animation: brandRibbonTickerReverse 65s linear infinite;
          will-change: transform;
        }
        .group:hover .brand-ribbon-track {
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

      {/* Compact Section Heading */}
      <div className="w-full max-w-[100rem] mx-auto px-4 text-center mb-3 sm:mb-4">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white border border-gray-200/80 shadow-2xs text-[11px] sm:text-xs font-semibold text-gray-600">
          <span>Our Valuable Clients</span>
        </div>
      </div>

      {/* Dual Track Container for 100% Gapless Loop moving Left-to-Right */}
      <div className="flex w-full overflow-hidden items-center">
        {/* Track 1 */}
        <div className="brand-ribbon-track">
          {trackClients.map((client, idx) => (
            <div
              key={`client-1-${client.name}-${idx}`}
              className="shrink-0 px-6 sm:px-8 md:px-10 py-2 flex items-center justify-center grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer select-none"
              title={client.name}
            >
              {client.customRender}
            </div>
          ))}
        </div>

        {/* Track 2 (Identical clone for seamless continuous infinite marquee) */}
        <div className="brand-ribbon-track" aria-hidden="true">
          {trackClients.map((client, idx) => (
            <div
              key={`client-2-${client.name}-${idx}`}
              className="shrink-0 px-6 sm:px-8 md:px-10 py-2 flex items-center justify-center grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer select-none"
              title={client.name}
            >
              {client.customRender}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
