import { useState, useEffect, useRef } from "react";
import { NexBadge } from "@/components/ui/NexIcons";
import PromiseSection from "./PromiseSection";

interface ProcurementSolution {
  id: "setup" | "consolidation" | "bom";
  name: string;
  // tagline: string;
  shortDesc: string;
  badge: string;
  scopeLabel: string;
  scopeValue: string;
  buttonText: string;
  modalMode: "quote" | "bom";
  points: {
    title: string;
    description: string;
  }[];
}

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<"setup" | "consolidation" | "bom">("setup");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const planKeys: ("setup" | "consolidation" | "bom")[] = ["setup", "consolidation", "bom"];

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
          } else if (entry.boundingClientRect.top > 0) {
            setIsHeaderVisible(false);
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );

      headerObserver.observe(headerEl);
    }

    const contentEl = contentRef.current;
    if (contentEl) {
      const rect = contentEl.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        setIsContentVisible(true);
      }

      const contentObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsContentVisible(true);
          } else if (entry.boundingClientRect.top > 0) {
            setIsContentVisible(false);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      contentObserver.observe(contentEl);
    }
  }, []);

  // Auto-advance tabs like HeroSection carousel (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSelectedPlan((prev) => {
        const nextIdx = (planKeys.indexOf(prev) + 1) % planKeys.length;
        return planKeys[nextIdx];
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [selectedPlan, isPaused]);

  const solutions: Record<string, ProcurementSolution> = {
    setup: {
      id: "setup",
      name: "New Plant & Facility Setup",
      // tagline: "Turnkey lines, workstations & commissioning",
      shortDesc:
        "",
      badge: "Turnkey Execution",
      scopeLabel: "",
      scopeValue: "",
      buttonText: "Plan Plant / Line Setup",
      modalMode: "quote",
      points: [
        {
          title: "Project Procurement",
          description:
            "Turnkey sourcing for greenfield plants, assembly lines, and R&D labs to eliminate setup delays.",
        },
        {
          title: "Turnkey Workstations",
          description:
            "Complete ergonomic ESD workstations integrated with instruments, power drops, on-site setup, and commissioning.",
        },
        {
          title: "Technical Validation",
          description:
            "In-house application engineers pre-verify electrical parameters, specs, and line compatibility before purchase.",
        },
        {
          title: "Full Lifecycle Support",
          description:
            "On-site demos, installation, bench testing, AMC contracts, and operator training.",
        },
      ],
    },
    consolidation: {
      id: "consolidation",
      name: "Consolidate Supplier Base",
      // tagline: "Shift 500+ suppliers under 1 GST partner",
      shortDesc:
        "",
      badge: "Vendor Consolidation",
      scopeLabel: "",
      scopeValue: "",
      buttonText: "Consolidate Vendor Sourcing",
      modalMode: "quote",
      points: [
        {
          title: "Vendor Consolidation",
          description:
            "Shift 500+ plant hardware, tool, and MRO suppliers under 1 trusted GST partner profile.",
        },
        {
          title: "Annual Rate Contracts (ARC)",
          description:
            "Lock in 12-month fixed pricing and dedicated buffer stock to insulate your budget from inflation.",
        },
        {
          title: "Recurring Procurement",
          description:
            "Automate routine plant orders so your team spends zero time creating and chasing POs.",
        },
        {
          title: "Single Point of Contact",
          description:
            "1 dedicated account manager handles all multi-brand quotes, unified billing, and post-sales support.",
        },
      ],
    },
    bom: {
      id: "bom",
      name: "BOM Requirement Sourcing",
      shortDesc:
        "",
      badge: "BOM Sourcing Engine",
      scopeLabel: "",
      scopeValue: "",
      buttonText: "Upload BOM for Quotation",
      modalMode: "bom",
      points: [
        {
          title: "BOM Procurement Engine",
          description:
            "Upload multi-line spreadsheets (XLSX, CSV, PDF) for batch sourcing and single-quote consolidation.",
        },
        {
          title: "Multi-Brand Sourcing",
          description:
            "Direct access to tier-1 authorized manufacturers across all 8 hardware categories.",
        },
        {
          title: "Alternate Engineering",
          description:
            "Fast technical cross-referencing to find drop-in equivalents for EOL and long lead-time parts.",
        },
        {
          title: "Compliance Staging",
          description:
            "Orders delivered pre-calibrated with NABL certs, datasheets, and ISO/CE/RoHS documentation.",
        },
      ],
    },
  };

  const current = solutions[selectedPlan];
  const currentPlanIdx = planKeys.indexOf(selectedPlan);

  const tabItems = [
    {
      id: "setup" as const,
      num: "1",
      title: "New Plant & Facility Setup",
      // subtitle: "Turnkey lines, workstations & commissioning",
    },
    {
      id: "consolidation" as const,
      num: "2",
      title: "Consolidate Supplier Base",
      // subtitle: "Shift 500+ suppliers under 1 GST partner",
    },
    {
      id: "bom" as const,
      num: "3",
      title: "BOM Requirement Sourcing",
      // subtitle: "Batch spreadsheets & single quote",
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="w-full py-18  sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#f4f6fa] relative overflow-hidden" 
      id="services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span id="pricing" className="sr-only" />
      <span id="solutions" className="sr-only" />

      {/* Hero-Style Keyframes with Crisp Transitions (No Blur) */}
      <style>{`
        @keyframes psProgressAnim {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes psFadeUp {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes psFadeDown {
          0% {
            opacity: 0;
            transform: translateY(-16px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes psSlideCardIn {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes psTabStagger {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes psSlideContentIn {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes psFeaturePoint {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes psAmbientGlow {
          0%, 100% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }
      `}</style>

      {/* Soft Ambient Radial Backlight Glow matching Hero Section */}
      <div 
        style={{
          animation: "psAmbientGlow 7s ease-in-out infinite",
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-red-500/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-[100rem] mx-auto relative z-10">
        
        {/* Header with Smooth Cascading Down-to-Top Text Slide Animations */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14">
          <div
            style={{
              animation: isHeaderVisible ? "psFadeDown 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0ms both" : "none",
              opacity: isHeaderVisible ? undefined : 0,
            }}
          >
            <NexBadge label="Procurement Solutions" />
          </div>

          <h2 
            style={{
              animation: isHeaderVisible ? "psFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 120ms both" : "none",
              opacity: isHeaderVisible ? undefined : 0,
            }}
            className="text-3xl sm:text-5xl font-semibold text-[#0d0f11] tracking-tight mt-5 mb-4"
          >
            Tailored Procurement Solutions for Every Operational Need 
          </h2>

          <p 
            style={{
              animation: isHeaderVisible ? "psFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 240ms both" : "none",
              opacity: isHeaderVisible ? undefined : 0,
            }}
            className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            Whether setting up a new plant, streamlining vendor supply, or fulfilling complex BOMs—we engineer the exact sourcing pipeline for your facility. 
          </p>
        </div>

        {/* Layout: Top 3 Solution Tabs in Same Line, Below Dynamic Details Card */}
        <div 
          ref={contentRef}
          className="max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Top Row: 3 Solution Selector Tabs in Same Line - Staggered 1 by 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-6 sm:mb-8">
            {tabItems.map((tab, idx) => {
              const isActive = selectedPlan === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => {
                    setSelectedPlan(tab.id);
                    setIsPaused(true);
                  }}
                  style={{
                    animation: isContentVisible ? `psTabStagger 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms both` : "none",
                    opacity: isContentVisible ? undefined : 0,
                  }}
                  className={`relative py-4 px-4 sm:px-6 rounded-[20px] sm:rounded-[24px] cursor-pointer transition-all duration-300 flex items-center justify-center text-center border overflow-hidden group select-none hover:-translate-y-0.5 ${
                    isActive
                      ? "bg-white border-gray-200 shadow-md ring-1 ring-black/5"
                      : "bg-white/60 border-transparent hover:bg-white hover:border-gray-200/60 shadow-2xs hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2.5 min-w-0">
                    <span 
                      className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${
                        isActive 
                          ? "bg-[#AF0202] shadow-[0_0_8px_rgba(175,2,2,0.5)] animate-pulse" 
                          : "bg-gray-300 group-hover:bg-gray-400"
                      }`} 
                    />
                    <div className={`text-sm sm:text-[15px] lg:text-base font-semibold tracking-tight transition-colors text-center ${
                      isActive ? "text-[#0d0f11] font-bold" : "text-gray-700 group-hover:text-black"
                    }`}>
                      {tab.num}. {tab.title}
                    </div>
                  </div>

                  {/* Active bottom line indicator */}
                  {isActive && (
                    <span 
                      key={`tab-indicator-${tab.id}`}
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#AF0202]"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Area: Active Solution Showcase Card */}
          <div 
            style={{
              animation: isContentVisible ? "psSlideCardIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) 320ms both" : "none",
              opacity: isContentVisible ? undefined : 0,
            }}
            className="w-full"
          >
            <div
              key={current.id}
              style={{
                animation: "psSlideContentIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
              className="bg-white border border-gray-200/90 rounded-[32px] p-7 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top accent edge */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#AF0202]/30 to-transparent" />

              <div>
                {/* Header Row: Badge & Model Tag + Quick Slide Indicators (Centered) */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-800">
                      {current.badge}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">
                      0{currentPlanIdx + 1} / 0{planKeys.length}
                    </span>
                  </div>
                  {current.scopeLabel && (
                    <div className="text-right">
                      <span className="text-[11px] font-medium text-gray-400 block uppercase tracking-wider">
                        {current.scopeLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#111315]">
                        {current.scopeValue}
                      </span>
                    </div>
                  )}
                </div>

                {/* Solution Title - Aligned Center */}
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d0f11] tracking-tight pb-3 border-b border-gray-100 text-center">
                  {current.name}
                </h3>

                {/* Subtitle Description */}
                {current.shortDesc ? (
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed mt-4 mb-6 text-center max-w-2xl mx-auto">
                    {current.shortDesc}
                  </p>
                ) : (
                  <div className="mb-6" />
                )}

                {/* 4 Feature Points Staggered in 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
                  {current.points.map((pt, idx) => (
                    <div 
                      key={`${current.id}-pt-${idx}`} 
                      style={{
                        animation: `psFeaturePoint 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${80 + idx * 70}ms both`,
                      }}
                      className="flex items-start gap-3 group/pt p-3 rounded-xl hover:bg-gray-50/70 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/60 shadow-2xs group-hover/pt:scale-110 transition-transform duration-250">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="text-sm leading-relaxed">
                        <span className="font-bold text-gray-900">{pt.title}: </span>
                        <span className="text-gray-600">{pt.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          </div>

        </div>
        
        {/* Core Engineering Commitment: Our Promise (Integrated) */}
        <PromiseSection embedded />

      </div>
    </section>
  );
}

