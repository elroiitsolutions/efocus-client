import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { NexChipIcon, NexBadge } from "@/components/ui/NexIcons";
import { 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown, 
  Cpu, 
  Gauge, 
  Zap, 
  Wrench, 
  Sparkles, 
  HelpCircle, 
  FileText, 
  Microscope, 
  Cable, 
  Binary, 
  Activity, 
  Flame, 
  Monitor, 
  Cog, 
  Compass, 
  Layers, 
  Search, 
  CheckSquare
} from "lucide-react";

export default function ElectronicsEmsPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Electronics Manufacturing & EMS Equipment Sourcing | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    const targetDesc = "Explore SMT assembly solutions, PCB inspection systems, rework equipment, ESD protection, and component sourcing for electronics manufacturing and EMS.";
    if (metaDescription) {
      metaDescription.setAttribute("content", targetDesc);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", targetDesc);
      document.head.appendChild(metaDescription);
    }

    return () => {
      document.title = originalTitle;
      if (metaDescription && prevDesc) {
        metaDescription.setAttribute("content", prevDesc);
      }
    };
  }, []);

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Section Observer Triggers
  
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const categoriesRef = useRef<HTMLElement>(null);

  const [appsVisible, setAppsVisible] = useState(false);
  const appsRef = useRef<HTMLElement>(null);

  const [whyVisible, setWhyVisible] = useState(false);
  const whyRef = useRef<HTMLElement>(null);

    
  useEffect(() => {
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -40px 0px" };

    const handleObserve = (el: HTMLElement | null, setter: (val: boolean) => void) => {
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setter(true);
        }
      }, observerOptions);
      obs.observe(el);
      return () => obs.disconnect();
    };

    const cleanups = [
            handleObserve(categoriesRef.current, setCategoriesVisible),
      handleObserve(appsRef.current, setAppsVisible),
      handleObserve(whyRef.current, setWhyVisible),
    ];

    return () => {
      cleanups.forEach((c) => c && c());
    };
  }, []);

  
  
  
  
  // Section 2 Data: 12 Product Categories
  const productCategories = [
    {
      title: "SMT Assembly & Rework",
      desc: "Lead-free solder wire, stencil wipers, flux pens, desoldering braid, and micro-hot-air stations.",
      icon: Cpu,
    
    },
    {
      title: "PCB Inspection & Microscopy",
      desc: "Digital 4K video inspection microscopes, ring lights, polarizing filters, and optical measuring systems.",
      icon: Microscope,
    
    },
    {
      title: "Test & Measurement Instruments",
      desc: "Digital storage oscilloscopes, mixed-signal analyzers, 6.5-digit bench multimeters, and arbitrary waveform generators.",
      icon: Gauge,
     
    },
    {
      title: "Power Supplies & Electronic Loads",
      desc: "Programmable multi-channel DC sources, precision linear supplies, and DC electronic loads for stress testing.",
      icon: Zap,
     
    },
    {
      title: "ESD Protection Products",
      desc: "Conductive floor mats, static-dissipative tabletop runners, grounding wrist straps, and constant continuous monitors.",
      icon: ShieldCheck,
     
    },
    {
      title: "Cables, Connectors & Adapters",
      desc: "High-frequency RF coaxial test cables, BNC/SMA interconnects, ribbon harnesses, and industrial modular jack adapters.",
      icon: Cable,
      
    },
    {
      title: "PCB Test & Programming",
      desc: "Bed-of-nails pogo pin fixtures, in-circuit programmers (JTAG/SWD), boundary scan tools, and flash gang programmers.",
      icon: Binary,
      
    },
    {
      title: "Production Tools & Consumables",
      desc: "Calibrated ESD torque screwdrivers, precision side cutters, anti-magnetic tweezers, and high-temp Kapton tapes.",
      icon: Wrench,
      
    },
    {
      title: "Automated Test Equipment (ATE)",
      desc: "Rack-mount PXI/LXI instrument chassis, multiplexer switch matrices, and automated end-of-line functional test fixtures.",
      icon: Activity,
     
    },
    {
      title: "Thermal Management & Rework Accessories",
      desc: "Preheaters, BGA reballing kits, thermal imaging cameras, and heat-sink interface compounds for component recovery.",
      icon: Flame,
     
    },
    {
      title: "Workstations & Lab Equipment",
      desc: "Heavy-duty modular ESD workbenches, overhead instrument shelving, conductive task chairs, and fume extractors.",
      icon: Monitor,
     
    },
    {
      title: "Pneumatic & Assembly Equipment",
      desc: "Pneumatic screwfeeders, fluid dispensers for epoxies, solder paste depositors, and pick-and-place vacuum pens.",
      icon: Cog,
      
    },
  ];

  // Section 3 Data: Applications (5 Key Manufacturing Stages)
  const applications = [
    {
      title: "SMT/SMD LINE and Rework",
      desc: "Tools and equipment for soldering, component replacement, and board-level rework.",
      icon: Cpu,
      
     
    },
    {
      title: "Electrical Verification",
      desc: "Measurement equipment for checking electrical parameters during development, troubleshooting, and production testing.",
      icon: Gauge,
     
    },
    {
      title: "Functional Test Stations",
      desc: "Instruments and accessories used in test setups to evaluate defined product functions.",
      icon: Activity,
     
    },
    {
      title: "ESD-Controlled Work Areas",
      desc: "Products that support static-control practices around sensitive electronic assemblies.",
      icon: ShieldCheck,
      
     
    },
    {
      title: "New Product Introduction",
      desc: "Equipment and workstation requirements associated with prototype builds, process development, and production preparation.",
      icon: Sparkles,
      
     
    },
  ];

  // Section 4 Data: Why Choose Us (4 Sourcing Principles)
  const whyChoosePrinciples = [
    {
      title: "Specify Before Sourcing",
      desc: "Start with the required electrical ratings, measurement range, interfaces, package type, or application.",
      icon: Compass,
      tag: "Technical Scrubbing",
    },
    {
      title: "Consider the Complete Setup",
      desc: "Review relevant probes, leads, fixtures, cables, and accessories alongside the main equipment.",
      icon: Layers,
      tag: "Holistic Outfitting",
    },
    {
      title: "Account for Production Requirements",
      desc: "Identify quantities and intended use across engineering benches, production lines, and test stations.",
      icon: CheckSquare,
      tag: "Scale & Deployment",
    },
    {
      title: "Review Suitable Options",
      desc: "Compare relevant product specifications and supplier quotations against your stated requirements.",
      icon: Search,
      tag: "Multi-Brand Assessment",
    },
  ];

  // Section 5 Data: FAQs
  const faqs = [
    {
      question: "What can electronics manufacturers source through eFocus?",
      answer:
        "Requirements may include SMT and rework equipment, test instruments, ESD products, cables, connectors, power equipment, and workstation supplies.",
    },
    {
      question: "Can I submit a BOM for electronic components or production supplies?",
      answer:
        "Yes. Share your BOM or product list, including part numbers, specifications, and quantities, for sourcing review.",
    },
    {
      question: "Can you help identify suitable test instruments?",
      answer:
        "Share the measurement parameters, expected range, accuracy needs, interfaces, and application. Suitable options can then be reviewed.",
    },
    {
      question: "Can I request accessories along with the main instrument?",
      answer:
        "Yes. Include probes, leads, cables, connectors, and other setup requirements so they can be considered with the equipment enquiry.",
    },
    {
      question: "Do you support new production line requirements?",
      answer:
        "You can share the equipment and supply requirements for a new line or test station for review and sourcing coordination.",
    },
  ];

  // Application Presets for the Form
  
  
  const scrollToCategories = () => {
    const el = document.getElementById("product-categories") || document.getElementById("product-categories") || document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(el);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE PRODUCTION SOURCING FORM
          ========================================================================= */}
      <section 
        id="electronics-hero"
        className="w-full relative pt-6 sm:pt-10 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-gray-100 overflow-hidden"
      >
        {/* Soft Ambient Radial Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(175,2,2,0.07),transparent_70%)] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[100rem] mx-auto relative z-10 flex flex-col items-center text-center">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Industries</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">Electronics & EMS</span>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              
              {/* Eyebrow Pill with Pulsing Live Dot */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50/90 border border-red-200/80 text-red-700 text-xs sm:text-[13px] font-semibold tracking-wide mb-6 shadow-2xs hover:scale-[1.02] transition-transform animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#AF0202]"></span>
                </span>
                <span>ELECTRONICS MANUFACTURING & EMS SOURCING SOLUTIONS</span>
              </div>

              {/* Main H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 text-center animate-in fade-in slide-in-from-left-6 duration-700">
                Keep Your Electronics{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Production Moving
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-4xl mx-auto mb-8 text-center animate-in fade-in slide-in-from-left-8 duration-700">
                PCB assembly, component handling, and product testing depend on the right tools and equipment at every stage. eFocus Industrial helps electronics manufacturers and EMS providers source products for assembly lines, inspection areas, and test stations.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Link to="/quote?industry=electronics-ems" className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12 px-6">
                  <NexChipIcon className="w-8 h-8" />
                  <span>Source for Your Production Line</span>
                </Link>

                <button type="button" onClick={scrollToCategories} className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs cursor-pointer group">
                  <span>Explore Electronics Products</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: ELECTRONICS & EMS – PRODUCT CATEGORIES (12 CATEGORIES)
          ========================================================================= */}
      <section 
        id="product-categories"
        ref={categoriesRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[100rem] mx-auto">
          
          <div className={`text-center max-w-4xl mx-auto flex flex-col items-center mb-12 sm:mb-16 transition-all duration-700 ${
            categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Comprehensive Coverage" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Electronics & EMS – Product Categories
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Consolidate your SMT consumables, test instrumentation, ESD safeguards, and factory automation equipment under one verified procurement channel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {productCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 45}ms`,
                  }}
                  className={`rounded-3xl p-6 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 ${
                    categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs mb-4 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors leading-snug mb-2">
                      {cat.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: APPLICATIONS (5 STAGES)
          ========================================================================= */}
      <section 
        ref={appsRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[100rem] mx-auto">
          
          <div className={`text-center max-w-4xl mx-auto flex flex-col items-center mb-12 sm:mb-16 transition-all duration-700 ${
            appsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Production Workflow" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Applications Across the Manufacturing Floor
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Equip every workstation from surface-mount assembly and rework to electrical verification and final quality sign-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, idx) => {
              const Icon = app.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`benefit-card rounded-3xl p-7 sm:p-8 bg-white border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer group ${
                    appsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="benefit-icon w-12 h-12 rounded-2xl bg-[#fbfcfd] border border-gray-200 flex items-center justify-center text-[#AF0202] shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors leading-snug mb-2.5">
                      {app.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed mb-4">
                      {app.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-gray-100 group-hover:border-zinc-800 flex items-center text-xs font-semibold text-[#AF0202] group-hover:text-red-400">
                    <span>Source for {app.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: WHY CHOOSE US (4 SOURCING PRINCIPLES)
          ========================================================================= */}
      <section 
        ref={whyVisible ? undefined : whyRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[100rem] mx-auto">
          
          <div className={`text-center max-w-4xl mx-auto flex flex-col items-center mb-12 sm:mb-16 transition-all duration-700 ${
            whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Engineered Sourcing" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Why Choose eFocus Industrial?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We streamline electronics procurement by aligning technical ratings, accessories, bench volumes, and supplier pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoosePrinciples.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <div
                  key={idx}
                  style={{ transitionDelay: `${idx * 90}ms` }}
                  className={`rounded-3xl p-7 bg-[#fbfcfd] border border-gray-200/90 shadow-2xs hover:shadow-xl hover:border-red-300 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 ${
                    whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs mb-5 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 mb-3 border border-red-200/60">
                      {principle.tag}
                    </span>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2.5">
                      {principle.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto">
          
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center mb-12 sm:mb-16">
            <NexBadge label="Common Inquiries" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find answers regarding sourcing scope, BOM reviews, instrument identification, accessories, and new line support.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/90 bg-white shadow-2xs overflow-hidden transition-all duration-200 hover:border-red-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/70 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-gray-900 leading-snug flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-red-600 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-red-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/30 animate-in fade-in duration-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6: FINAL CTA BANNER
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="rounded-[36px] bg-gradient-to-br from-[#111315] via-[#1a1d21] to-black p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden shadow-2xl">
            
            {/* Background Ambient Aura */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-200 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>End-to-End Electronics & EMS Equipment Pipeline</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Building or Upgrading an Electronics Production Line?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Share your PCB assembly, test station, ESD, or production equipment requirements with eFocus Industrial.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/quote?industry=electronics-ems" className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#0d0f11] py-3.5 px-8 font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95 px-6">
                  <NexChipIcon className="w-8 h-8" />
                  <span>Submit Your Requirements</span>
                </Link>

                <Link
                  to="/procurement-solutions/bom-procurement"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-semibold border border-white/20 transition-all hover:scale-105"
                >
                  <FileText className="w-4 h-4 text-red-400" />
                  <span>Send Your BOM</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
