import { Link } from "react-router-dom";

export default function IntegrationSection() {
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const brands = [
    {
      name: "FLUKE",
      color: "#FFC20E",
      textColor: "#000000",
      customRender: (
        <span className="bg-[#FFC20E] text-black font-black italic px-2.5 py-0.5 text-[14px] sm:text-[15px] tracking-wider rounded-[3px] shadow-2xs leading-tight">
          FLUKE
        </span>
      ),
    },
    {
      name: "QUICK",
      color: "#00A3E0",
      textColor: "#00A3E0",
      customRender: (
        <span className="font-extrabold text-[#00A3E0] tracking-tight text-[16px] sm:text-[17px] font-mono leading-tight">
          QUICK
        </span>
      ),
    },
    {
      name: "Weller",
      color: "#005596",
      textColor: "#005596",
      customRender: (
        <span className="font-black text-[#005596] tracking-tight text-[17px] sm:text-[18px] italic font-serif leading-tight">
          Weller
        </span>
      ),
    },
    {
      name: "ZEBRA",
      color: "#000000",
      textColor: "#000000",
      customRender: (
        <span className="font-black text-black tracking-[0.16em] text-[14px] sm:text-[15px] leading-tight">
          ZEBRA
        </span>
      ),
    },
    {
      name: "3M",
      color: "#ED1C24",
      textColor: "#ED1C24",
      customRender: (
        <span className="font-black text-[#ED1C24] text-[18px] sm:text-[20px] tracking-tighter leading-tight">
          3M
        </span>
      ),
    },
    {
      name: "Honeywell",
      color: "#DE1F27",
      textColor: "#DE1F27",
      customRender: (
        <span className="font-extrabold text-[#DE1F27] tracking-tight text-[16px] sm:text-[17px] font-sans leading-tight">
          Honeywell
        </span>
      ),
    },
    {
      name: "Chroma",
      color: "#004B87",
      textColor: "#004B87",
      customRender: (
        <span className="font-black text-[#004B87] tracking-tight text-[16px] sm:text-[17px] leading-tight">
          Chroma
        </span>
      ),
    },
    {
      name: "Keysight",
      color: "#E51937",
      textColor: "#E51937",
      customRender: (
        <span className="font-extrabold text-[#E51937] tracking-tight text-[15px] sm:text-[16px] leading-tight">
          KEYSIGHT
        </span>
      ),
    },
    {
      name: "Impinj",
      color: "#E84E1B",
      textColor: "#E84E1B",
      customRender: (
        <span className="font-black text-[#E84E1B] tracking-tight text-[15px] sm:text-[16px] leading-tight">
          IMPINJ
        </span>
      ),
    },
    {
      name: "TE Connectivity",
      color: "#E56A2B",
      textColor: "#E56A2B",
      customRender: (
        <span className="font-black text-[#E56A2B] tracking-tighter text-[16px] sm:text-[17px] leading-tight">
          TE
        </span>
      ),
    },
    {
      name: "Amphenol",
      color: "#003A70",
      textColor: "#003A70",
      customRender: (
        <span className="font-bold text-[#003A70] tracking-normal text-[15px] sm:text-[16px] italic leading-tight">
          Amphenol
        </span>
      ),
    },
  ];

  // Quadruple the array for perfectly seamless continuous infinite loop
  const trackBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="w-full py-8 sm:py-10 bg-white border-t border-gray-100 overflow-hidden relative">
      {/* Section Header */}
      <div className="w-full max-w-[100rem] mx-auto px-4 text-center mb-4 sm:mb-5">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0d0f11] tracking-tight">
          Authorized & Multi-Brand Industrial Partner
        </h2>
      </div>

      {/* Style keyframe for continuous sliding marquee */}
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
          animation: brandRibbonTickerReverse 70s linear infinite;
          will-change: transform;
        }
        .group:hover .brand-ribbon-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Dual Track Container with Gradient Edge Fades */}
      <div className="w-full relative overflow-hidden group select-none py-3">
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
        <div className="flex w-full overflow-hidden items-center">
          {/* Track 1 */}
          <div className="brand-ribbon-track">
            {trackBrands.map((b, idx) => (
              <Link
                key={`brand-1-${b.name}-${idx}`}
                to={`/products?brand=${slugify(b.name)}`}
                className="shrink-0 px-6 sm:px-8 md:px-10 py-2 flex items-center justify-center grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer select-none"
                title={`Filter products by ${b.name}`}
              >
                {b.customRender}
              </Link>
            ))}
          </div>

          {/* Track 2 (Identical clone for seamless continuous infinite marquee) */}
          <div className="brand-ribbon-track" aria-hidden="true">
            {trackBrands.map((b, idx) => (
              <Link
                key={`brand-2-${b.name}-${idx}`}
                to={`/products?brand=${slugify(b.name)}`}
                className="shrink-0 px-6 sm:px-8 md:px-10 py-2 flex items-center justify-center grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer select-none"
                title={`Filter products by ${b.name}`}
              >
                {b.customRender}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
