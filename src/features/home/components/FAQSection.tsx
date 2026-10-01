import { useState, useEffect, useRef } from "react";
import { NexBadge } from "@/components/ui/NexIcons";
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
      title: "Application Engineering Validation",
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
    {
      number: "07",
      title: "Complete Lifecycle Field Support",
      details:
        "Beyond delivery, get hands-on support including on-site product demos, bench repairs, preventive maintenance (AMC), and operator training.",
      highlight: "On-Site AMC & Demos",
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
      className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 relative overflow-hidden" 
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
          GLOBE BACKGROUND (matching CTA section globe)
          z-0 = behind everything
          ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-[-80px] sm:top-[-100px] md:top-[-120px] -translate-x-1/2 w-[750px] sm:w-[850px] md:w-[950px] lg:w-[1050px] max-w-none opacity-80">
          <Globe />
        </div>

        {/* Soft bottom fade so cards sit cleanly on white */}
        <div className="absolute left-0 right-0 top-[280px] sm:top-[340px] h-[300px] bg-gradient-to-b from-transparent via-white/80 to-white" />
      </div>

      <div className="w-full max-w-[100rem] mx-auto relative z-10">
        
        {/* Centered Heading Section with Down-to-Top Reveal */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto space-y-4 mb-14 sm:mb-16 flex flex-col items-center">
          
          {/* Badge */}
          <div 
            style={{
              animation: isHeaderVisible ? "whyTextSlideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0ms both" : "none",
              opacity: isHeaderVisible ? undefined : 0,
            }}
            className="inline-flex justify-center"
          >
            <NexBadge label="Why Choose Us?" />
          </div>
          
          {/* Main Title: Centered with eFocus logo */}
          <h2 
            style={{
              animation: isHeaderVisible ? "whyTextSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 120ms both" : "none",
              opacity: isHeaderVisible ? undefined : 0,
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#111315] tracking-tight leading-[1.18] text-center"
          >
            Why{" "}
            <span className="inline-flex items-center align-middle mx-1 sm:mx-2">
              <img
                src="/logo.png"
                alt="eFocus"
                className="h-8 sm:h-11 md:h-13 lg:h-[56px] w-auto object-contain select-none inline-block hover:scale-105 transition-transform duration-300"
              />
            </span>{" "}
          ?
          </h2>

          {/* Subtitle */}
          {/* <p 
            style={{
              animation: isHeaderVisible ? "whyTextSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 240ms both" : "none",
              opacity: isHeaderVisible ? undefined : 0,
            }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed text-center"
          >
            We eliminate technical ambiguity, vendor fragmentation, and plant downtime with end-to-end technical procurement ownership.
          </p> */}
          
          {/* Talk to an Engineer CTA Button */}
          {/* <div 
            style={{
              animation: isHeaderVisible ? "whyTextSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 360ms both" : "none",
              opacity: isHeaderVisible ? undefined : 0,
            }}
            className="pt-2 flex justify-center"
          >
            <button
              type="button"
              onClick={handleOpenQuote}
              className="nex-button-swap inline-flex items-center justify-center gap-3 bg-[#111315] hover:bg-black text-white pl-2 pr-6 py-3 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer group active:scale-95"
            >
              <NexChipIcon />
              <span>Talk to an Engineer</span>
            </button>
          </div> */}
        </div>

        {/* Box Type Contents: Row 1 = 3 cols, Row 2 = 3 cols, Row 3 = Last one centered */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyEfocusItems.map((item, idx) => {
            const isLast = idx === whyEfocusItems.length - 1;
            return (
              <div
                key={idx}
                style={{
                  animation: isGridVisible
                    ? `whyBoxEntrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms both`
                    : "none",
                  opacity: isGridVisible ? undefined : 0,
                }}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative group bg-white border border-gray-200/80 hover:border-gray-300 shadow-2xs hover:shadow-md ${
                  isLast
                    ? "md:col-span-2 md:max-w-xl md:mx-auto lg:max-w-none lg:col-span-1 lg:col-start-2 lg:mx-0 w-full"
                    : ""
                }`}
              >
                <div>
                  {/* Top Row: Number & Highlight Pill */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md border bg-red-50 text-[#AF0202] border-red-100">
                      {item.number}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border bg-emerald-50 text-emerald-800 border-emerald-200/60 shadow-2xs">
                      <svg
                        className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item.highlight}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-[19px] font-bold tracking-tight leading-snug mb-3 text-[#111315] group-hover:text-black">
                    {item.title}
                  </h3>

                  {/* Answer / Details (Always Open & Visible) */}
                  <div className="flex items-start gap-3 pt-1">
                    <span
                      className="w-1 h-5 rounded-full shrink-0 mt-1 bg-[#AF0202] shadow-[0_0_8px_rgba(175,2,2,0.25)]"
                      aria-hidden="true"
                    />
                    <p className="text-sm sm:text-[14px] leading-relaxed font-normal text-gray-600">
                      {item.details}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        {/* <div className="mt-12 sm:mt-14 flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F8F9FA] border border-gray-200/80 text-xs text-gray-600 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-gray-900">eFocus Supply SLA Guarantee:</span>
            <span>100% genuine authorized OEM distribution, NABL-traceable calibration, zero plant downtime commitment.</span>
          </div>
        </div> */}

      </div>
    </section>
  );
}
