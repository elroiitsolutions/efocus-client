"use client";

export default function BrandSupplyBar() {
  const clients = [
    {
      name: "Delta",
      logo: "/images/clients/delta.webp",
      className: "h-3.5 sm:h-4 md:h-[18px] max-w-[95px] sm:max-w-[110px] md:max-w-[120px]",
    },
    {
      name: "Bharat FIH",
      logo: "/images/clients/bharat-fih.webp",
      className: "h-4 sm:h-4.5 md:h-[20px] max-w-[80px] sm:max-w-[95px] md:max-w-[105px]",
    },
    {
      name: "Ashok Leyland",
      logo: "/images/clients/ashok-leyland.webp",
      className: "h-4.5 sm:h-5 md:h-[24px] max-w-[75px] sm:max-w-[90px] md:max-w-[100px]",
    },
    {
      name: "Valeo",
      logo: "/images/clients/valeo.webp",
      className: "h-4 sm:h-4.5 md:h-[22px] max-w-[65px] sm:max-w-[75px] md:max-w-[85px]",
    },
    {
      name: "Hyundai",
      logo: "/images/clients/hyundai.webp",
      className: "h-4.5 sm:h-5 md:h-[24px] max-w-[60px] sm:max-w-[72px] md:max-w-[80px]",
    },
    {
      name: "Tata Electronics",
      logo: "/images/clients/tata-electronics.webp",
      className: "h-4.5 sm:h-5 md:h-[25px] max-w-[65px] sm:max-w-[78px] md:max-w-[88px]",
    },
    {
      name: "Motorola",
      logo: "/images/clients/motorola.webp",
      className: "h-4 sm:h-4.5 md:h-[20px] max-w-[80px] sm:max-w-[95px] md:max-w-[105px]",
    },
    {
      name: "Wistron",
      logo: "/images/clients/wistron.webp",
      className: "h-3.5 sm:h-4 md:h-[18px] max-w-[85px] sm:max-w-[100px] md:max-w-[110px]",
    },
    {
      name: "HCL",
      logo: "/images/clients/hcl.webp",
      className: "h-3.5 sm:h-4 md:h-[18px] max-w-[85px] sm:max-w-[100px] md:max-w-[110px]",
    },
  ];

  // Repeat clients to ensure seamless continuous coverage on any display
  const trackClients = [...clients, ...clients];

  return (
    <section
      aria-label="Our Valuable Clients"
      className="w-full bg-[#fbfcfd] pt-3 pb-4 sm:pt-3.5 sm:pb-5 border-b border-gray-200/70 relative overflow-hidden select-none"
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
          animation: brandRibbonTickerReverse 50s linear infinite;
          will-change: transform;
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

      {/* Section Heading */}
      <div className="w-full max-w-[100rem] mx-auto px-4 text-center mb-4 sm:mb-5">
        <div className="inline-flex items-center gap-2.5">
          <h2 className="text-base sm:text-lg md:text-3xl font-black text-[#0d0f11] tracking-tight">
            Our Valuable Clients
          </h2>
        </div>
      </div>

      {/* Dual Track Container for 100% Gapless Loop moving Left-to-Right */}
      <div className="flex w-full overflow-hidden items-center min-h-[44px] sm:min-h-[48px]">
        {/* Track 1 */}
        <div className="brand-ribbon-track">
          {trackClients.map((client, idx) => (
            <div
              key={`client-1-${client.name}-${idx}`}
              className="shrink-0 px-4 sm:px-6 md:px-8 py-0.5 flex items-center justify-center h-10 sm:h-11 md:h-12 opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-200 select-none cursor-default"
              title={client.name}
            >
              <img
                src={client.logo}
                alt={client.name}
                className={`${client.className} w-auto object-contain select-none pointer-events-none`}
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Track 2 (Identical clone for seamless continuous infinite marquee) */}
        <div className="brand-ribbon-track" aria-hidden="true">
          {trackClients.map((client, idx) => (
            <div
              key={`client-2-${client.name}-${idx}`}
              className="shrink-0 px-4 sm:px-6 md:px-8 py-0.5 flex items-center justify-center h-10 sm:h-11 md:h-12 opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-200 select-none cursor-default"
              title={client.name}
            >
              <img
                src={client.logo}
                alt={client.name}
                className={`${client.className} w-auto object-contain select-none pointer-events-none`}
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
