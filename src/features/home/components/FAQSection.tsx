import { useState, useEffect, useRef } from "react";
import Globe from "@/components/ui/Globe";

export default function FAQSection() {
  const whyEfocusItems = [
    {
      number: "01",
      title: "80% Reduction in PO Admin",
      details:
        "Replace 500+ component suppliers, individual POs, and complex accounting with a single GST vendor profile and one monthly invoice.",
      highlight: "Single GST & Monthly Invoice",
    },
    {
      number: "02",
      title: "Local Buffer Stock Reserves",
      details:
        "Eliminate costly line stoppages with regional warehouse stock reserved for your critical spares, tools, and high-turnover consumables.",
      highlight: "Zero Line Stoppages",
    },
    {
      number: "03",
      title: "Application Validation & Field Support",
      details:
        "In-house engineers pre-verify hardware specifications, electrical parameters, and application suitability before fulfillment to eliminate ordering errors.",
      highlight: "In-House Pre-Verification",
    },
    {
      number: "04",
      title: "Instant EOL & Cross-Referencing Alternatives",
      details:
        "When components go obsolete or face long lead times, our engineering team identifies and validates drop-in technical replacements immediately.",
      highlight: "Drop-In Technical Replacements",
    },
    {
      number: "05",
      title: "Multi-Standard Compliance Readiness",
      details:
        "Eliminate quality audit headaches. Precision hardware arrives shipped with complete compliance documentation (NABL-Traceable Calibration Certs, ISO/IEC 17025, CE, RoHS / REACH, ESD S20.20, and BIS compliance).",
      highlight: "NABL, ISO, CE & BIS Ready",
    },
    {
      number: "06",
      title: "12-Month ARC Price Protection",
      details:
        "Lock in fixed unit pricing on high-turnover items through Annual Rate Contracts to insulate your plant budget against market inflation.",
      highlight: "Fixed Annual Unit Pricing",
    },
  ];

  const [isGridVisible, setIsGridVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (headerEl) {
      const rect = headerEl.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        setIsHeaderVisible(true);
      }

      const headerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
      );

      headerObserver.observe(headerEl);
    }

    const gridEl = gridRef.current;
    if (gridEl) {
      const rect = gridEl.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        setIsGridVisible(true);
      }

      const gridObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsGridVisible(true);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      gridObserver.observe(gridEl);
    }
  }, []);

  return (
    <section 
      className="w-full pt-10 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 relative overflow-hidden" 
      id="faq"
      aria-label="Why eFocus for Industrial Manufacturing"
    >
      {/* Down-to-Top Text Slide-Up & Staggered Box Entrance Animation Keyframes */}
      <style>{`
        @keyframes whyTextSlideUp {
          0% {
            opacity: 0;
            transform: translateY(32px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        @keyframes whyBoxEntrance {
          0% {
            opacity: 0;
            transform: translateY(36px) scale(0.96);
            filter: blur(6px);
          }
          60% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
      `}</style>

      {/* =========================================
          GLOBE BACKGROUND & AMBIENT GLOW
          z-0 = behind everything
          ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Soft center ambient radial aura */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[850px] sm:w-[1050px] h-[550px] bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(175,2,2,0.04),transparent_70%)] pointer-events-none" />

        <div className="absolute left-1/2 top-1 sm:top-2 -translate-x-1/2 w-[700px] sm:w-[800px] md:w-[900px] lg:w-[1000px] max-w-none opacity-85">
          <Globe />
        </div>

        {/* Soft bottom fade so cards sit cleanly on white with gentle atmospheric blend */}
        <div className="absolute left-0 right-0 top-[160px] sm:top-[190px] md:top-[210px] h-[340px] bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none" />
      </div>

      <div className="w-full max-w-[100rem] mx-auto relative z-10">
        
        {/* Centered Heading Section with Down-to-Top Reveal */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 flex flex-col items-center">
          {/* Main Title: Centered with eFocus logo */}
          <h2 
            style={{
              animation: isHeaderVisible ? "whyTextSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 120ms both" : "none",
              opacity: isHeaderVisible ? undefined : 0,
            }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.18] text-center"
          >
            Why{" "}
            <span className="inline-flex items-center align-middle mx-1 sm:mx-1.5 -mt-1 sm:-mt-1.5">
              <img
                src="/logo.png"
                alt="eFocus"
                className="h-7 sm:h-9 md:h-11 lg:h-[44px] w-auto object-contain select-none inline-block hover:scale-105 transition-transform duration-300"
              />
            </span>
            ?
          </h2>
        </div>

        {/* Box Type Contents: Balanced 3x2 Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {whyEfocusItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                animation: isGridVisible
                  ? `whyBoxEntrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 130}ms both`
                  : "none",
                opacity: isGridVisible ? undefined : 0,
              }}
              className="rounded-2xl p-5 sm:p-6 flex flex-col justify-between transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:z-30 relative group bg-white/95 backdrop-blur-md border border-gray-200/80 hover:border-red-300 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_-12px_rgba(175,2,2,0.2),0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer select-none will-change-transform before:absolute before:inset-x-0 before:top-0 before:h-[2.5px] before:bg-gradient-to-r before:from-transparent before:via-[#AF0202] before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300 after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-red-500/[0.03] after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300 after:pointer-events-none w-full"
            >
                <div className="relative z-10">
                  {/* Top Row: Highlight Title Badge in Brand Logo Color */}
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-semibold tracking-wide border border-red-100 bg-red-50/70 text-[#AF0202] shadow-2xs group-hover:border-red-200 group-hover:bg-red-50/90 transition-all duration-300 whitespace-nowrap">
                      <svg
                        className="w-3.5 h-3.5 text-[#AF0202] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item.highlight}</span>
                    </span>
                  </div>

                  {/* Title with Number Badge */}
                  <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold tracking-tight leading-snug text-[#0d0f11] group-hover:text-[#AF0202] transition-colors duration-200 flex items-start gap-3">
                    <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-gradient-to-br from-red-50 to-red-100/70 border border-red-200/70 text-[#AF0202] font-mono text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:scale-105 group-hover:bg-[#AF0202] group-hover:text-white group-hover:border-[#AF0202] group-hover:shadow-[0_4px_12px_rgba(175,2,2,0.25)] transition-all duration-300 select-none">
                      {item.number}
                    </span>
                    <span className="pt-0.5">{item.title}</span>
                  </h3>
                </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
