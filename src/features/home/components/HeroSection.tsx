import { useState, useEffect } from "react";
import { NexChipIcon } from "@/components/ui/NexIcons";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModal = (mode: "quote" | "bom", title?: string) => {
    window.dispatchEvent(
      new CustomEvent("open-procurement-modal", {
        detail: { mode, title },
      })
    );
  };

  const slides = [
    {
      id: "slide-1",
      // badge: "Procurement Solutions",
      tabLabel: "Vendor Consolidation",
      heading: "One Partner. One Invoice. Zero Plant Downtime.",
      subtext:
        "Stop managing multiple suppliers. Streamline 100% of your procurement under a single GST vendor profile—replacing endless follow-ups with guaranteed fast quotes, one monthly invoice, and 80% less PO admin.",
      ctas: [
        // {
        //   label: "Consolidate Procurement",
        //   variant: "primary" as const,
        //   action: () => openModal("quote", "Vendor Consolidation RFQ"),
        // },
        // {
        //   label: "Upload BOM",
        //   variant: "secondary" as const,
        //   action: () => openModal("bom", "BOM Procurement"),
        // },
      ],
      metrics: [
        // { label: "PO Admin Saved", value: "80%" },
        // { label: "Single Profile", value: "1 GST" },
        // { label: "Quote Turnaround", value: "< 4 Hrs" },
      ],
      // preview: {
      //   tag: "Single GST Profile Active",
      //   title: "Vendor Consolidation Hub",
      //   items: [
      //     { name: "Multiple OEM Suppliers", value: "10+ Vendors Managed", status: "Consolidated" },
      //     { name: "Billing Administration", value: "1 Monthly Tax Invoice", status: "Active" },
      //     { name: "Supply Line SLA", value: "Guaranteed Zero Downtime", status: "Verified" },
      //   ],
      // },
    },
    {
      id: "slide-2",
      // badge: "Turnkey Plant Setup",
      tabLabel: "Turnkey Plant Setup",
      heading: "Complete Plant & Assembly Setup—Tailored Entirely to Your End Product",
      subtext:
        "Don't waste critical engineering cycles figuring out which instruments and tools will optimize your throughput. From direct production machinery to indirect plant consumables, we evaluate, supply, and commission your entire facility under one roof.",
      ctas: [
        {
          label: "Plan New Plant/Line Setup",
          variant: "primary" as const,
          action: () => openModal("quote", "Turnkey Plant Setup RFQ"),
        },
        {
          label: "Talk to an Application Engineer",
          variant: "secondary" as const,
          action: () => openModal("quote", "Application Engineering Consultation"),
        },
      ],
      metrics: [
        // { label: "Facility Setup", value: "100%" },
        // { label: "Expert Guidance", value: "End-to-End" },
        // { label: "Throughput Optimization", value: "Tailored" },
      ],
      preview: {
        tag: "Turnkey Facility Matrix",
        title: "Plant & Assembly Infrastructure",
        items: [
          { name: "Production Machinery", value: "SMT & Assembly Systems", status: "Commissioned" },
          { name: "Soldering & Rework", value: "Precision German Benches", status: "Commissioned" },
          { name: "Inspection & Test", value: "Fluke & Chroma Calibrated", status: "Ready" },
        ],
      },
    },
    {
      id: "slide-3",
      // badge: "Custom BOM Consolidation",
      tabLabel: "Custom BOM Bundle",
      heading: "Building a Custom Bill of Materials (BOM)?",
      subtext:
        "We can bundle hardware, accessories, and calibration services across all four pillars into a single consolidated quotation.",
      ctas: [
        {
          label: "Request Custom BOM Quote",
          variant: "primary" as const,
          action: () => openModal("bom", "Request Custom BOM Quote"),
        },
        {
          label: "Talk to an Application Engineer",
          variant: "secondary" as const,
          action: () => openModal("quote", "Application Engineering Consultation"),
        },
      ],
      metrics: [
        // { label: "Hardware Pillars", value: "All 4" },
        // { label: "File Types", value: ".XLSX / .CSV" },
        // { label: "Consolidated RFQ", value: "Instant" },
      ],
      preview: {
        tag: "Automated BOM Aggregator",
        title: "Four-Pillar Hardware Matrix",
        items: [
          { name: "Pillar 1: SMT Assembly", value: "Feeders, Nozzles & Solder", status: "Bundled" },
          { name: "Pillar 2: Cables & RF", value: "TE / Amphenol Connectors", status: "Bundled" },
          { name: "Pillar 3: Test & Cal", value: "NABL / OEM Traceable", status: "Bundled" },
        ],
      },
    },
  ];

  // Auto-advance slides automatically one by one every 4.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4800);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  return (
    <section className="relative w-full overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-4.5rem)]" id="hero">
      {/* Background Video with Enhanced Clarity & Atmospheric Transition */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-900">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[1.03] contrast-[1.06]"
          src="/hero%20video/videoo.mp4"
          poster="/hero%20video/frame_35_hd.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Cinematic gradient allowing clear video viewing while blending seamlessly into the page */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,252,253,0.4)_0%,rgba(251,252,253,0.1)_25%,rgba(251,252,253,0.05)_45%,rgba(251,252,253,0.45)_75%,#fbfcfd_100%)]"
          aria-hidden="true"
        />
      </div>

      {/* Style keyframes for attractive, coordinated animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroProgressAnim {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes heroFadeUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroFadeDown {
          0% {
            opacity: 0;
            transform: translateY(-18px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes heroSlideCardIn {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes heroCardStagger {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes heroSlideContentIn {
          0% {
            opacity: 0;
            transform: translateX(18px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes heroMetricPop {
          0% {
            opacity: 0;
            transform: scale(0.88) translateY(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes heroAmbientGlow {
          0%, 100% {
            opacity: 0.75;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.95;
            transform: translate(-50%, -50%) scale(1.06);
          }
        }
      `}} />

      {/* Unified Side-by-Side Hero Container (Text on Left, Slide on Right) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
        
        {/* LEFT COLUMN: Hero Header Content (Text) */}
        <div className="lg:col-span-5 xl:col-span-5 order-1 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left relative">
          
          {/* Soft Radial Backlight with Gentle Breathing Glow */}
          <div 
            style={{
              animation: "heroAmbientGlow 7s ease-in-out infinite",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-[340px] bg-white/85 rounded-full blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* User Avatars Social Proof Pill */}
          {/* <div 
            style={{
              animation: isMounted ? "heroFadeDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" : "none",
              opacity: isMounted ? undefined : 0,
            }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-2xs mb-4 sm:mb-5 hover:border-gray-300 hover:shadow-xs transition-all duration-300 group cursor-default"
          >
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80"
                alt="User"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white object-cover group-hover:scale-105 transition-transform"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80"
                alt="User"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white object-cover group-hover:scale-105 transition-transform delay-75"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80"
                alt="User"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white object-cover group-hover:scale-105 transition-transform delay-150"
              />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-700">
              Trusted by <span className="font-bold text-[#0d0f11]">500+</span> EMS, Aerospace & Automotive Plants across India
            </span>
          </div> */}

          {/* Hero Title */}
          {/* <h1 
            style={{
              animation: isMounted ? "heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both" : "none",
              opacity: isMounted ? undefined : 0,
            }}
            className="text-2xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-bold tracking-tight text-[#0d0f11] leading-[1.12] mb-3 sm:mb-4 drop-shadow-xs"
          >
            Industrial Hardware &<br />
            Precision Engineering Solutions
          </h1> */}

          {/* Subtitle */}
          {/* <p 
            style={{
              animation: isMounted ? "heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.34s both" : "none",
              opacity: isMounted ? undefined : 0,
            }}
            className="text-xs sm:text-sm lg:text-base text-[#1e232d] max-w-xl mb-5 sm:mb-6 leading-relaxed font-normal"
          >
            Direct technical marketplace and supply partner for precision test instruments, SMT assembly equipment, and industrial hardware.
          </p> */}

          {/* Top Hero CTAs */}
          {/* <div 
            style={{
              animation: isMounted ? "heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.46s both" : "none",
              opacity: isMounted ? undefined : 0,
            }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6 sm:mb-7"
          >
            <button
              onClick={() => openModal("quote")}
              className="group nex-button-swap flex items-center gap-2.5 bg-[#111315] hover:bg-black text-white pl-2 pr-5 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:shadow-lg active:scale-95"
            >
              <NexChipIcon />
              <span>Get a Quick Quote</span>
            </button>

            <button
              onClick={() => openModal("bom")}
              className="group nex-button-swap flex items-center gap-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-[#111315] pl-2 pr-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all shadow-xs hover:border-gray-300 cursor-pointer hover:shadow-sm active:scale-95"
            >
              <span className="w-7 h-7 rounded-full bg-[#f3f4f6] flex items-center justify-center text-gray-900 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </span>
              <span>Upload BOM</span>
            </button>
          </div> */}

          {/* Trust Guarantees Row with Clean Backdrop Cards */}
          {/* <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-lg pt-4 border-t border-gray-200/70">
            <div 
              style={{
                animation: isMounted ? "heroCardStagger 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.58s both" : "none",
                opacity: isMounted ? undefined : 0,
              }}
              className="flex flex-col bg-white/85 backdrop-blur-xs border border-gray-200/70 rounded-xl p-2.5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 hover:border-gray-300 transition-all duration-300"
            >
              <span className="text-xs sm:text-[13px] font-bold text-[#0d0f11] flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Single Profile
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">1 GST Vendor</span>
            </div>
            <div 
              style={{
                animation: isMounted ? "heroCardStagger 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.68s both" : "none",
                opacity: isMounted ? undefined : 0,
              }}
              className="flex flex-col bg-white/85 backdrop-blur-xs border border-gray-200/70 rounded-xl p-2.5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 hover:border-gray-300 transition-all duration-300"
            >
              <span className="text-xs sm:text-[13px] font-bold text-[#0d0f11] flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Fast Quote
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">&lt; 4h Turnaround</span>
            </div>
            <div 
              style={{
                animation: isMounted ? "heroCardStagger 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.78s both" : "none",
                opacity: isMounted ? undefined : 0,
              }}
              className="flex flex-col bg-white/85 backdrop-blur-xs border border-gray-200/70 rounded-xl p-2.5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 hover:border-gray-300 transition-all duration-300"
            >
              <span className="text-xs sm:text-[13px] font-bold text-[#0d0f11] flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Zero Downtime
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">SLA Guaranteed</span>
            </div>
          </div> */}

        </div>

        {/* RIGHT COLUMN: Hero Interactive Slides Showcase */}
        <div 
          style={{
            animation: isMounted ? "heroSlideCardIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both" : "none",
            opacity: isMounted ? undefined : 0,
          }}
          className="lg:col-span-7 xl:col-span-7 order-2 lg:order-2 w-full"
        >
          <div className="w-full rounded-[24px] sm:rounded-[28px] overflow-hidden border border-gray-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_70px_-15px_rgba(0,0,0,0.16)] bg-white/95 backdrop-blur-md p-4 sm:p-5 lg:p-6 relative flex flex-col transition-all duration-500">
            
            {/* Top Interactive Slide Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-3.5 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {slides.map((s, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 overflow-hidden ${
                        isActive
                          ? "bg-[#0d0f11] text-white shadow-xs"
                          : "bg-gray-100/90 hover:bg-gray-200/80 text-gray-700"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#AF0202] animate-pulse" : "bg-gray-400"}`} />
                      <span>{s.tabLabel}</span>
                      <span className={`text-[10px] font-mono ${isActive ? "text-gray-300" : "text-gray-400"}`}>
                        0{idx + 1}
                      </span>

                      {/* Active Timer Progress Line on the Tab */}
                      {isActive && (
                        <span 
                          key={`tab-progress-${currentSlide}`}
                          className="absolute bottom-0 left-0 h-[2.5px] bg-[#AF0202] rounded-full"
                          style={{
                            animation: "heroProgressAnim 4.8s linear forwards",
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Carousel Controls */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="font-mono text-[11px] text-gray-400 mr-1">
                  0{currentSlide + 1} / 0{slides.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                  }
                  className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Continuous Sliding Viewport Track */}
            <div className="relative overflow-hidden w-full pt-3 sm:pt-4">
              <div 
                className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, sIdx) => {
                  const isActive = sIdx === currentSlide;
                  return (
                    <div 
                      key={slide.id} 
                      className="w-full shrink-0 min-w-full flex flex-col items-start text-left px-0.5"
                    >

                      {/* Top-aligned heading container with consistent height */}
                      <div className="w-full min-h-[3rem] sm:min-h-[3.6rem] flex items-start mb-2">
                        <h2 
                          style={{
                            animation: isActive ? "heroSlideContentIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 80ms both" : "none",
                          }}
                          className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0d0f11] tracking-tight leading-[1.25]"
                        >
                          {slide.heading}
                        </h2>
                      </div>

                      {/* Top-aligned subtext container with consistent 3-line height */}
                      <div className="w-full min-h-[4rem] sm:min-h-[4.5rem] flex items-start mb-3.5 sm:mb-4">
                        <p 
                          style={{
                            animation: isActive ? "heroSlideContentIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 130ms both" : "none",
                          }}
                          className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal"
                        >
                          {slide.subtext}
                        </p>
                      </div>

                      {/* Action Buttons: Anchored at the exact same vertical baseline across all slides */}
                      {slide.ctas && slide.ctas.length > 0 && (
                        <div 
                          style={{
                            animation: isActive ? "heroSlideContentIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 180ms both" : "none",
                          }}
                          className="flex flex-wrap items-center gap-3 min-h-[42px] mb-1"
                        >
                          {slide.ctas.map((cta, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={cta.action}
                              className={`nex-button-swap inline-flex items-center gap-2.5 pl-2 pr-5 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                                cta.variant === "primary"
                                  ? "bg-[#0d0f11] hover:bg-black text-white shadow-xs"
                                  : "bg-white hover:bg-gray-50 border border-gray-200 text-[#111315] shadow-2xs hover:border-gray-300"
                              }`}
                            >
                              <NexChipIcon />
                              <span>{cta.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Segmented Bottom Progress Indicators */}
            <div className="grid grid-cols-3 gap-2 w-full mt-3 pt-3 border-t border-gray-100">
              {slides.map((_, idx) => {
                const isPast = idx < currentSlide;
                const isCurrent = idx === currentSlide;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className="h-1.5 rounded-full bg-gray-100 overflow-hidden relative cursor-pointer group"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {isPast && <div className="w-full h-full bg-[#0d0f11]" />}
                    {isCurrent && (
                      <div 
                        key={`bottom-bar-${currentSlide}`}
                        className="h-full bg-[#0d0f11] rounded-full"
                        style={{
                          animation: "heroProgressAnim 4.8s linear forwards",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


