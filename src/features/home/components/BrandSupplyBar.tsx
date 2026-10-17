"use client";

export default function BrandSupplyBar() {
  const clients = [
    {
      name: "Delta",
      logo: "/images/clients/delta.webp",
      className: "h-5 sm:h-6 md:h-[26px] max-w-[130px] sm:max-w-[150px] md:max-w-[160px]",
    },
    {
      name: "Bharat FIH",
      logo: "/images/clients/bharat-fih.webp",
      className: "h-6 sm:h-7 md:h-[32px] max-w-[110px] sm:max-w-[130px] md:max-w-[140px]",
    },
    {
      name: "Ashok Leyland",
      logo: "/images/clients/ashok-leyland.webp",
      className: "h-7 sm:h-8 md:h-[42px] max-w-[110px] sm:max-w-[130px] md:max-w-[145px]",
    },
    {
      name: "Valeo",
      logo: "/images/clients/valeo.webp",
      className: "h-7 sm:h-8 md:h-[38px] max-w-[90px] sm:max-w-[105px] md:max-w-[120px]",
    },
    {
      name: "Hyundai",
      logo: "/images/clients/hyundai.webp",
      className: "h-8 sm:h-10 md:h-[48px] max-w-[80px] sm:max-w-[100px] md:max-w-[120px]",
    },
    {
      name: "Tata Electronics",
      logo: "/images/clients/tata-electronics.webp",
      className: "h-8 sm:h-10 md:h-[48px] max-w-[90px] sm:max-w-[115px] md:max-w-[130px]",
    },
    {
      name: "Motorola",
      logo: "/images/clients/motorola.webp",
      className: "h-6 sm:h-7 md:h-[29px] max-w-[110px] sm:max-w-[130px] md:max-w-[135px]",
    },
    {
      name: "Wistron",
      logo: "/images/clients/wistron.webp",
      className: "h-5 sm:h-6 md:h-[27px] max-w-[120px] sm:max-w-[140px] md:max-w-[145px]",
    },
    {
      name: "HCL",
      logo: "/images/clients/hcl.webp",
      className: "h-5 sm:h-6 md:h-[25px] max-w-[130px] sm:max-w-[150px] md:max-w-[165px]",
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
      <div className="flex w-full overflow-hidden items-center min-h-[64px] sm:min-h-[72px]">
        {/* Track 1 */}
        <div className="brand-ribbon-track">
          {trackClients.map((client, idx) => (
            <div
              key={`client-1-${client.name}-${idx}`}
              className="shrink-0 px-6 sm:px-8 md:px-10 py-1 flex items-center justify-center h-14 sm:h-16 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 select-none cursor-default"
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
              className="shrink-0 px-6 sm:px-8 md:px-10 py-1 flex items-center justify-center h-14 sm:h-16 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 select-none cursor-default"
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
