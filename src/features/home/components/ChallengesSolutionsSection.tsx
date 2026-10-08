import { useState, useEffect, useRef } from "react";

type CategoryTab = "technical" | "commercial" | "fulfillment";

interface OwnershipPair {
  id: string;
  category: "technical" | "commercial" | "fulfillment";
  code: string;
  // phaseTag: string;
  challengeTitle: string;
  solutionTitle: string;
  solutionDesc: string;
  iconType: "scoping" | "suppliers" | "rfqs" | "specs" | "alternates" | "pricing" | "logistics" | "compliance" | "commission" | "support";
}

const ALL_PAIRS: OwnershipPair[] = [
  // 1. Technical & Specs (Exact 3 items from screenshot)
  {
    id: "t-1",
    category: "technical",
    code: "01",
    // phaseTag: "Parametric Mapping",
    challengeTitle: "Unclear / Complex Requirements",
    solutionTitle: "Application Engineering Scoping",
    solutionDesc: "Parametric mapping & functional spec validation",
    iconType: "scoping",
  },
  {
    id: "t-2",
    category: "technical",
    code: "04",
    // phaseTag: "Spec Verification",
    challengeTitle: "Technical Ambiguity & Spec Matching",
    solutionTitle: "Component Spec Validation",
    solutionDesc: "Electrical, mechanical & environmental verification",
    iconType: "specs",
  },
  {
    id: "t-3",
    category: "technical",
    code: "05",
    // phaseTag: "Alternate Sourcing",
    challengeTitle: "Complex Comparisons & EOL Friction",
    solutionTitle: "Alternate Engineering",
    solutionDesc: "Technical cross-referencing for EOL & long-lead parts",
    iconType: "alternates",
  },

  // 2. Commercial & Sourcing (Exact 4 items from screenshot)
  {
    id: "m-1",
    category: "commercial",
    code: "02",
    // phaseTag: "Single-Window Sourcing",
    challengeTitle: "Multiple Suppliers & Fragmented Sourcing",
    solutionTitle: "Channel & OEM Aggregation",
    solutionDesc: "Single-window sourcing across authorized global brands",
    iconType: "suppliers",
  },
  {
    id: "m-2",
    category: "commercial",
    code: "03",
    // phaseTag: "Consolidated Billing",
    challengeTitle: "Excessive RFQs & Vendor Sprawl",
    solutionTitle: "Commercial Consolidation",
    solutionDesc: "Multi-category RFQs merged into 1 GST invoice",
    iconType: "rfqs",
  },
  {
    id: "m-3",
    category: "commercial",
    code: "06",
    // phaseTag: "Contract Discounts",
    challengeTitle: "Price & Commercial Negotiation",
    solutionTitle: "Volume Scale Optimization",
    solutionDesc: "Tiered pricing leverage & enterprise contract discounts",
    iconType: "pricing",
  },
  {
    id: "m-4",
    category: "commercial",
    code: "07",
    // phaseTag: "Centralized Workflows",
    challengeTitle: "PO & Order Administration Overhead",
    solutionTitle: "Enterprise Account Execution",
    solutionDesc: "Single PO intake & centralized billing workflows",
    iconType: "rfqs",
  },

  // 3. Fulfillment & Quality (Exact 5 items from screenshot)
  {
    id: "f-1",
    category: "fulfillment",
    code: "08",
    // phaseTag: "Dedicated Manager",
    challengeTitle: "Supplier Follow-ups & Fragmented Leads",
    solutionTitle: "Single-Point Account Management",
    solutionDesc: "1 dedicated manager for multi-brand orders",
    iconType: "suppliers",
  },
  {
    id: "f-2",
    category: "fulfillment",
    code: "09",
    // phaseTag: "Transit Control",
    challengeTitle: "Delivery & Logistics Tracking",
    solutionTitle: "Supply Chain Tracking",
    solutionDesc: "Buffer stock management & end-to-end transit control",
    iconType: "logistics",
  },
  {
    id: "f-3",
    category: "fulfillment",
    code: "10",
    // phaseTag: "Global Certification",
    challengeTitle: "Documentation & Quality Compliance",
    solutionTitle: "Pre-Delivery Compliance Staging",
    solutionDesc: "NABL certs, ISO, CE, RoHS, REACH & BIS documentation",
    iconType: "compliance",
  },
  {
    id: "f-4",
    category: "fulfillment",
    code: "11",
    // phaseTag: "On-Site Assembly",
    challengeTitle: "Installation & Setup Requirements",
    solutionTitle: "Integration & Commissioning",
    solutionDesc: "On-site assembly, system hookup & validation",
    iconType: "commission",
  },
  {
    id: "f-5",
    category: "fulfillment",
    code: "12",
    // phaseTag: "Lifecycle & AMC",
    challengeTitle: "After-Sales Support",
    solutionTitle: "Lifecycle Maintenance",
    solutionDesc: "AMC contracts",
    iconType: "support",
  },
];

// Distinct Challenge Icons for Left Slices
function LeftSliceIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      // Requirement Scoping
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="14" cy="13" r="3.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 24a6.5 6.5 0 0113 0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5.5a1.8 1.8 0 012.6 1c0 1-1.2 1.3-1.2 2.2v.3" />
          <circle cx="14.4" cy="10.2" r="0.6" fill="currentColor" stroke="none" />
          <rect x="2" y="5" width="5.5" height="5.5" rx="1.2" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.7 6.7l2.1 2.1m0-2.1l-2.1 2.1" strokeWidth="1.5" />
          <rect x="20.5" y="5" width="5.5" height="5.5" rx="1.2" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.8 7.6l1.2 1.2 2-2.2" strokeWidth="1.5" />
        </svg>
      );
    case 1:
      // Multi-supplier team with mechanical gear
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="9" cy="8.5" r="2.2" />
          <circle cx="14" cy="7.5" r="2.4" />
          <circle cx="19" cy="8.5" r="2.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 15a4 4 0 017 0M15.5 15a4 4 0 017 0" />
          <circle cx="14" cy="19" r="3" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 14.5v1.5M14 22v1.5M9.5 19h1.5M17 19h1.5M10.8 15.8l1.1 1.1M16.1 21.1l1.1 1.1M10.8 22.2l1.1-1.1M16.1 16.9l1.1-1.1" strokeWidth="1.8" />
        </svg>
      );
    case 2:
      // Paperwork & documentation overload
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="8" cy="10" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 21a5 5 0 018.5-2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.5l1.5 2.5-1.5 3" />
          <rect x="15" y="14" width="10" height="7" rx="1.2" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11h10M16 8h8M17 5h6" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 17.5h4" strokeWidth="1.5" />
        </svg>
      );
    case 3:
      // Uncertainty / comparison questions
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="14" cy="16" r="3.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 25a7 7 0 0114 0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5l-2-1.5" />
          <circle cx="6" cy="7" r="3.2" strokeWidth="1.4" />
          <text x="6" y="9.2" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="currentColor" stroke="none">?</text>
          <circle cx="11.5" cy="5" r="3.2" strokeWidth="1.4" />
          <text x="11.5" y="7.2" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="currentColor" stroke="none">?</text>
          <circle cx="17" cy="5" r="3.2" strokeWidth="1.4" />
          <text x="17" y="7.2" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="currentColor" stroke="none">?</text>
          <circle cx="22.5" cy="7" r="3.2" strokeWidth="1.4" />
          <text x="22.5" y="9.2" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="currentColor" stroke="none">?</text>
        </svg>
      );
    case 4:
    default:
      // Maintenance and warranty tooling
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5v2.8l2 2" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 18.5l3.5 3.5M21 16a2.8 2.8 0 00-4 4l-2-2 4-4 2 2z" strokeWidth="1.5" />
        </svg>
      );
  }
}

// Distinct Responsibility Icons for Right Slices
function RightSliceIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      // Engineering scoping & idea
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="10" cy="14" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 24a6 6 0 0110.5-2" />
          <rect x="15" y="15" width="7" height="9" rx="1.5" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 18h2M17.5 21h2" strokeWidth="1.4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 5.5a2.5 2.5 0 014 2c0 1-.8 1.4-1 2.2h-2c-.2-.8-1-1.2-1-2.2a2.5 2.5 0 010-.01z" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 11h2" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.5v1.2M7.5 4.5l.8.8M16.5 4.5l-.8.8" strokeWidth="1.4" />
        </svg>
      );
    case 1:
      // Channel aggregation & partnership
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="5.5" y="4" width="4.5" height="4.5" rx="1" strokeWidth="1.4" />
          <rect x="11.8" y="3" width="4.5" height="4.5" rx="1" strokeWidth="1.4" />
          <rect x="18" y="4" width="4.5" height="4.5" rx="1" strokeWidth="1.4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6.2h1.8M16.3 6.2h1.7" strokeWidth="1.4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 17l4 3.5 3-3-2-2-4 2.5z" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 17l-4 3.5-3-3 2-2 4 2.5z" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20.5l4-3.5 3 3" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15l3 2M25 15l-3 2" strokeWidth="1.5" />
        </svg>
      );
    case 2:
      // GST invoice consolidation
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10l4 4v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 4v4h4" strokeWidth="1.5" />
          <text x="9" y="11.5" fontSize="5" fontWeight="900" fontFamily="monospace" fill="currentColor" stroke="none">GST</text>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h11" strokeWidth="1.2" />
          <circle cx="13.5" cy="18.5" r="3.2" strokeWidth="1.5" />
          <text x="13.5" y="20.3" textAnchor="middle" fontSize="5" fontWeight="bold" fill="currentColor" stroke="none">₹</text>
        </svg>
      );
    case 3:
      // Quality checklist & verification
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="5.5" y="4" width="17" height="20" rx="2" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 4V2.5h7V4" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 9l1.5 1.5 2.5-2.5" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5h5" strokeWidth="1.4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14l1.5 1.5 2.5-2.5" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 14.5h5" strokeWidth="1.4" />
          <circle cx="16" cy="19.5" r="4.2" fill="#d7f6dc" stroke="#16a34a" strokeWidth="1.4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 19.5h1.2l.6-1.5c.2-.5.7-.6 1.1-.3.2.2.3.5.2.8l-.4 1h1.2c.4 0 .7.3.7.7v.5c0 .3-.1.6-.4.7l-.6 1.2h-3.6v-3.1z" stroke="#15803d" strokeWidth="1.2" fill="none" />
        </svg>
      );
    case 4:
    default:
      // Lifecycle maintenance & AMC guarantee shield
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 4l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V7l7-3z" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 14l2.5 2.5 5-5" stroke="#16a34a" strokeWidth="1.8" />
        </svg>
      );
  }
}

// Helper to compute SVG sector path for left / right wheel
function getWheelSlicePath(
  side: "left" | "right",
  index: number,
  total: number,
  cx: number,
  cy: number,
  r: number
) {
  const step = Math.PI / total;
  let startAngle: number;
  let endAngle: number;

  if (side === "left") {
    startAngle = -Math.PI / 2 - index * step;
    endAngle = -Math.PI / 2 - (index + 1) * step;
  } else {
    startAngle = -Math.PI / 2 + index * step;
    endAngle = -Math.PI / 2 + (index + 1) * step;
  }

  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);

  const sweepFlag = side === "right" ? 1 : 0;
  return `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 ${sweepFlag} ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
}

// Helper to compute icon position within each sector
function getIconPosition(
  side: "left" | "right",
  index: number,
  total: number,
  cx: number,
  cy: number,
  rIcon: number
) {
  const step = Math.PI / total;
  let midAngle: number;
  if (side === "left") {
    midAngle = -Math.PI / 2 - (index + 0.5) * step;
  } else {
    midAngle = -Math.PI / 2 + (index + 0.5) * step;
  }
  return {
    x: cx + rIcon * Math.cos(midAngle),
    y: cy + rIcon * Math.sin(midAngle),
  };
}

export default function ChallengesSolutionsSection() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("technical");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [animCycle, setAnimCycle] = useState(0);

  useEffect(() => {
    const checkVisibility = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          setHasEntered(true);
        }
      }
    };

    // Immediate check on mount/hydration
    checkVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          setAnimCycle((c) => c + 1);
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px -20px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", checkVisibility, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  // Only the 3 requested tabs
  const categoryTabs: { id: CategoryTab; label: string }[] = [
    { id: "technical", label: "Technical & Specs" },
    { id: "commercial", label: "Commercial & Sourcing" },
    { id: "fulfillment", label: "Fulfillment & Quality" },
  ];

  // Exact items for the active tab (3 for technical, 4 for commercial, 5 for fulfillment)
  const displayedItems = ALL_PAIRS.filter((item) => item.category === activeTab);
  const total = displayedItems.length;

  // Geometry tailored for 3, 4, or 5 items
  const wheelSize = total === 3 ? 340 : total === 5 ? 420 : 360;
  const r = wheelSize / 2;
  const cx = r;
  const cy = r;
  const rIcon = total === 3 ? r * 0.68 : total === 5 ? r * 0.72 : r * 0.70;
  const logoSize = total === 3 ? 144 : total === 5 ? 168 : 160;
  const cardHeightClass = total === 5 ? "h-[76px] lg:h-[80px]" : "h-[86px]";
  const rowSpacingClass = total === 5 ? "space-y-3" : "space-y-4";

  return (
    <section
      ref={sectionRef}
      className="w-full pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
      id="challenges-solutions"
    >
      {/* Dynamic Keyframes for Rich Smooth Left/Right Slide Animations (Cinematic Slow Glide) */}
      <style>{`
        /* Left Card Entrance: Smooth, slow, elegant glide in from outer left end */
        @keyframes efRowSlideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-130px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Right Card Entrance: Smooth, slow, elegant glide in from outer right end */
        @keyframes efRowSlideInRight {
          0% {
            opacity: 0;
            transform: translateX(130px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Left Badge Pop & Spin */
        @keyframes efBadgePopLeft {
          0% {
            opacity: 0;
            transform: scale(0.6) rotate(-30deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.08) rotate(4deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        /* Right Badge Pop & Spin */
        @keyframes efBadgePopRight {
          0% {
            opacity: 0;
            transform: scale(0.6) rotate(30deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.08) rotate(-4deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        /* Center Wheel Entrance: Slow, graceful, stately rotation and scale */
        @keyframes efWheelSpinEnter {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.92) rotate(-5deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }

        @keyframes efLogoPulse {
          0%, 100% {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(175, 2, 2, 0);
          }
          50% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14), 0 0 24px 3px rgba(175, 2, 2, 0.14);
          }
        }

        .ef-animate-wheel {
          animation: efWheelSpinEnter 2.0s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .ef-animate-logo {
          animation: efLogoPulse 3.5s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header with Scroll Entry Animation */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* <div className={`flex justify-center mb-3 transition-all duration-700 delay-100 ease-out ${
            hasEntered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-90"
          }`}>
            <NexBadge label="Operational Ownership" />
          </div> */}

          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0d0f11] mb-3 leading-[1.2] transition-all duration-700 delay-200 ease-out ${
            hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            Your Requirement Challenges,<br className="hidden sm:inline" /> Our Responsibility
          </h2>

          {/* <p className={`text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-normal transition-all duration-700 delay-300 ease-out ${
            hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            From initial specification to after-sales maintenance, eFocus takes complete technical
            ownership of your factory procurement pipeline.
          </p> */}
        </div>

        {/* 3 Core Category Tabs with Scroll Entry Animation */}
        <div className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-10 transition-all duration-700 delay-[380ms] ease-out ${
          hasEntered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3"
        }`}>
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setHoveredRow(null);
                  setAnimCycle((c) => c + 1);
                }}
                className={`px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-2xs active:scale-95 ${
                  isActive
                    ? "bg-[#AF0202] hover:bg-[#8f0202] text-white ring-2 ring-[#AF0202]/30 shadow-md scale-105"
                    : "bg-white text-gray-800 hover:text-black hover:border-gray-400 border border-gray-300 hover:shadow-xs"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* DIAGRAM CONTAINER with Scroll Entry Animation & Ref for Precise Trigger */}
        <div
          ref={diagramRef}
          className={`w-full max-w-[1180px] mx-auto transition-all duration-700 ease-out ${
            hasEntered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.98]"
          }`}
        >
          
          {/* Top Column Headers */}
          <div className="grid grid-cols-2 gap-8 mb-5 px-6 sm:px-12 overflow-hidden">
            {/* Left Header */}
            <div className={`flex items-center justify-start gap-2.5 text-[#b91c1c] transition-all duration-700 delay-[460ms] ease-out ${
              hasEntered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}>
              <span className="w-6 h-6 rounded-full border-2 border-[#b91c1c] flex items-center justify-center text-xs font-bold shrink-0">
                i
              </span>
              <span className="font-extrabold text-sm sm:text-lg tracking-tight text-[#b91c1c]">
                Your Team&apos;s Challenge
              </span>
            </div>

            {/* Right Header */}
            <div className={`flex items-center justify-end gap-2.5 text-[#15803d] transition-all duration-700 delay-[460ms] ease-out ${
              hasEntered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}>
              <span className="w-6 h-6 rounded-full border-2 border-[#15803d] flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </span>
              <span className="font-extrabold text-sm sm:text-lg tracking-tight text-[#15803d]">
                eFocus Industrial Responsibility
              </span>
            </div>
          </div>

          {/* Desktop & Tablet Diagram Layout */}
          <div className="hidden md:block relative w-full py-4">
            
            {/* CENTRAL WHEEL HUB - Smooth Entrance & Interactive Glow */}
            <div
              key={`wheel-${activeTab}-${animCycle}`}
              className={`absolute top-1/2 left-1/2 z-20 pointer-events-none ${
                hasEntered ? "ef-animate-wheel" : "opacity-0"
              }`}
            >
              
              {/* Outer Sliced Circular Dial */}
              <div
                style={{ width: `${wheelSize}px`, height: `${wheelSize}px` }}
                className="relative rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden bg-white transition-all duration-300"
              >
                
                {/* SVG Pie Slices background */}
                <svg className="w-full h-full" viewBox={`0 0 ${wheelSize} ${wheelSize}`}>
                  {/* Left Slices: White fill with #EF4444 outline */}
                  {Array.from({ length: total }).map((_, i) => {
                    const isRowHovered = hoveredRow === i;
                    return (
                      <path
                        key={`left-slice-${i}`}
                        d={getWheelSlicePath("left", i, total, cx, cy, r)}
                        fill={isRowHovered ? "#fff5f5" : "#ffffff"}
                        stroke={isRowHovered ? "#dc2626" : "#ef4444"}
                        strokeWidth={isRowHovered ? "2.5" : "1.5"}
                        className="transition-all duration-300"
                      />
                    );
                  })}

                  {/* Right Slices: White fill with #16A34A outline */}
                  {Array.from({ length: total }).map((_, i) => {
                    const isRowHovered = hoveredRow === i;
                    return (
                      <path
                        key={`right-slice-${i}`}
                        d={getWheelSlicePath("right", i, total, cx, cy, r)}
                        fill={isRowHovered ? "#f0fdf4" : "#ffffff"}
                        stroke={isRowHovered ? "#15803d" : "#16a34a"}
                        strokeWidth={isRowHovered ? "2.5" : "1.5"}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </svg>

                {/* Left Spoke Icons placed inside each slice */}
                {Array.from({ length: total }).map((_, i) => {
                  const pos = getIconPosition("left", i, total, cx, cy, rIcon);
                  const isRowHovered = hoveredRow === i;
                  return (
                    <div
                      key={`left-icon-${i}`}
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        transform: `translate(-50%, -50%) scale(${isRowHovered ? 1.25 : 1})`,
                        filter: isRowHovered ? "drop-shadow(0 4px 6px rgba(0,0,0,0.18))" : "none",
                      }}
                      className="absolute transition-all duration-300"
                    >
                      <LeftSliceIcon index={i} />
                    </div>
                  );
                })}

                {/* Right Spoke Icons placed inside each slice */}
                {Array.from({ length: total }).map((_, i) => {
                  const pos = getIconPosition("right", i, total, cx, cy, rIcon);
                  const isRowHovered = hoveredRow === i;
                  return (
                    <div
                      key={`right-icon-${i}`}
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        transform: `translate(-50%, -50%) scale(${isRowHovered ? 1.25 : 1})`,
                        filter: isRowHovered ? "drop-shadow(0 4px 6px rgba(0,0,0,0.18))" : "none",
                      }}
                      className="absolute transition-all duration-300"
                    >
                      <RightSliceIcon index={i} />
                    </div>
                  );
                })}

                {/* Center Core White Badge with Exact Logo */}
                <div
                  style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-gray-200/80 ef-animate-logo flex items-center justify-center p-4 transition-all duration-300 pointer-events-auto hover:scale-105 cursor-pointer shadow-sm"
                >
                  <img
                    src="/logo.png"
                    alt="eFocus"
                    className="w-full max-w-[105px] sm:max-w-[115px] h-auto object-contain select-none"
                    draggable={false}
                  />
                </div>

              </div>
            </div>

            {/* PAIRED HORIZONTAL ROWS - SEAMLESSLY JOINED TO THE ROUND CENTER WHEEL */}
            <div
              key={`rows-${activeTab}-${animCycle}`}
              className={`${rowSpacingClass} relative z-10 transition-all duration-300`}
            >
              {displayedItems.map((item, idx) => {
                const isHovered = hoveredRow === idx;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className="grid grid-cols-2 gap-1 sm:gap-2 items-center group/row"
                  >
                    
                    {/* Left Pink Card (Your Team's Challenge) */}
                    <div
                      style={
                        hasEntered
                          ? {
                              animation: `efRowSlideInLeft 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${
                                520 + idx * 160
                              }ms both`,
                            }
                          : { opacity: 0 }
                      }
                      className="flex items-center justify-end w-full"
                    >
                      <div
                        className={`w-full ${cardHeightClass} rounded-l-full bg-white border border-[#ef4444] pl-5 sm:pl-7 pr-36 lg:pr-48 flex items-center justify-start gap-3.5 transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? "border-[#ef4444] shadow-md translate-x-1.5 ring-1 ring-[#ef4444]/20"
                            : "border-[#ef4444] shadow-2xs hover:shadow-xs"
                        }`}
                      >
                        
                        {/* Far Left: Circular Red (X) Badge with Entrance Pop & Spin */}
                        <div
                          style={
                            hasEntered
                              ? {
                                  animation: `efBadgePopLeft 0.85s cubic-bezier(0.25, 1, 0.5, 1) ${idx * 160 + 200}ms both`,
                                }
                              : {}
                          }
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#ef4444] bg-white text-[#ef4444] flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-300 ${
                            isHovered ? "rotate-90 scale-110" : ""
                          }`}
                        >
                          <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>

                        {/* Challenge Text */}
                        <div className="flex flex-col text-left min-w-0">
                          <h4 className="text-xs sm:text-[13px] lg:text-sm font-bold text-[#0d0f11] tracking-tight leading-snug">
                            {item.challengeTitle}
                          </h4>
                          <span className="text-[11px] font-medium text-gray-500 mt-0.5">
                            {/* Phase: {item.phaseTag} */}
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* Right Green Card (eFocus Industrial Responsibility) */}
                    <div
                      style={
                        hasEntered
                          ? {
                              animation: `efRowSlideInRight 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${
                                520 + idx * 160
                              }ms both`,
                            }
                          : { opacity: 0 }
                      }
                      className="flex items-center justify-start w-full"
                    >
                      <div
                        className={`w-full ${cardHeightClass} rounded-r-full bg-white border border-[#16a34a] pl-36 lg:pl-48 pr-5 sm:pr-7 flex items-center justify-end gap-3.5 transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? "border-[#16a34a] shadow-md -translate-x-1.5 ring-1 ring-[#16a34a]/20"
                            : "border-[#16a34a] shadow-2xs hover:shadow-xs"
                        }`}
                      >

                        {/* Responsibility Text (Right-aligned) */}
                        <div className="flex flex-col text-right min-w-0">
                          <h4 className="text-xs sm:text-[13px] lg:text-sm font-bold text-[#0d0f11] tracking-tight leading-snug">
                            {item.solutionTitle}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-gray-600 leading-snug mt-0.5 line-clamp-2">
                            {item.solutionDesc}
                          </p>
                        </div>

                        {/* Far Right: Circular Green (✓) Badge with Entrance Pop & Spin */}
                        <div
                          style={
                            hasEntered
                              ? {
                                  animation: `efBadgePopRight 0.85s cubic-bezier(0.25, 1, 0.5, 1) ${idx * 160 + 200}ms both`,
                                }
                              : {}
                          }
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#16a34a] bg-white text-[#16a34a] flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-300 ${
                            isHovered ? "scale-110 -rotate-6" : ""
                          }`}
                        >
                          <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>

                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Mobile & Small Screen Stacked View */}
          <div
            key={`mobile-${activeTab}-${animCycle}`}
            className="md:hidden space-y-4"
          >
            {displayedItems.map((item, idx) => (
              <div
                key={item.id}
                style={
                  hasEntered
                    ? {
                        animation: `efRowSlideInLeft 1.0s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 140}ms both`,
                      }
                    : { opacity: 0 }
                }
                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs space-y-3 hover:shadow-xs transition-shadow duration-300"
              >
                {/* Challenge Block */}
                <div className="bg-white border border-[#ef4444] rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                  <div className="w-9 h-9 rounded-full border-2 border-[#ef4444] bg-white text-[#ef4444] flex items-center justify-center shrink-0 shadow-2xs">
                    <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 leading-snug">{item.challengeTitle}</h4>
                  </div>
                </div>

                {/* Transition Arrow */}
                <div className="flex items-center justify-center text-gray-400">
                  <svg className="w-4 h-4 text-emerald-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Responsibility Block */}
                <div className="bg-white border border-[#16a34a] rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex flex-col text-left">
                    <h4 className="text-xs font-bold text-gray-900">{item.solutionTitle}</h4>
                    <p className="text-[11px] text-gray-600 mt-0.5">{item.solutionDesc}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-[#16a34a] bg-white text-[#16a34a] flex items-center justify-center shrink-0 shadow-2xs">
                    <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Procurement Banner Card */}
        {/* <div className={`mt-12 sm:mt-16 bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-700 delay-500 ease-out ${
          hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 rounded-full bg-[#111315] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              eF
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#0d0f11]">
                Need complete turnkey ownership of your production line?
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                Our application engineers scope specifications, audit line parameters, and consolidate multi-vendor BOMs under 1 GST profile.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openModal("quote", "Application Engineering Assessment")}
              className="nex-button-swap inline-flex items-center gap-2 bg-[#111315] hover:bg-black text-white pl-2 pr-5 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              <NexChipIcon />
              <span>Talk to an Engineer</span>
            </button>
            <button
              onClick={() => openModal("bom", "BOM Pipeline Sourcing")}
              className="nex-button-swap inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-[#111315] pl-2 pr-5 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all shadow-2xs hover:border-gray-300 cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </span>
              <span>Upload BOM</span>
            </button>
          </div>
        </div> */}

      </div>
    </section>
  );
}
