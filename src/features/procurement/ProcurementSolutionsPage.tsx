import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { NexChipIcon, NexBadge } from "@/components/ui/NexIcons";
import { 
  UploadCloud, 
  ArrowRight, 
  Clock, 
  ChevronDown, 
  Cpu, 
  Globe, 
  Search, 
  Repeat, 
  PackageCheck, 
  HelpCircle,
  FileText
} from "lucide-react";

export default function ProcurementSolutionsPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Enterprise BOM Procurement & Component Sourcing Solutions | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    const targetDesc = "Eliminate supply chain friction. Single-quote line-item matching, proactive lifecycle scrubbing, and consolidated GST-compliant delivery for electronics manufacturing.";
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

  // Always scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, []);

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Section Observer Triggers
  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesRef = useRef<HTMLElement>(null);

  const [workflowVisible, setWorkflowVisible] = useState(false);
  const workflowRef = useRef<HTMLElement>(null);

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
      handleObserve(servicesRef.current, setServicesVisible),
      handleObserve(workflowRef.current, setWorkflowVisible),
    ];

    return () => {
      cleanups.forEach((c) => c && c());
    };
  }, []);

  // 4 Core Sourcing Services
  const sourcingServices = [
    {
      number: "1",
      title: "Technical BOM Scrubbing & Cross-Referencing",
      desc: "Every Bill of Materials uploaded to eFocus undergoes automated parsing followed by an engineering review. We verify active MPNs, flag obsolete (EOL) or Not Recommended for New Designs (NRND) parts, and supply fully qualified drop-in alternatives without compromising board spin specs.",
      icon: Search,
    },
    {
      number: "2",
      title: "Global Multi-Channel Aggregation",
      desc: "Bypass the complexity of juggling multiple franchised distributors and global spot markets. We aggregate active, passive, electromechanical, and interconnect lines into a single consolidated fulfillment stream, optimizing line-item pricing and volume breaks.",
      icon: Globe,
    },
    {
      number: "3",
      title: "Hard-to-Find & EOL Component Procurement",
      desc: "When supply shortages stall assembly lines, eFocus leverages verified global supply networks across 30+ countries. We locate hard-to-find, high-demand, and allocated semiconductors while guaranteeing authenticity through rigorous batch verification.",
      icon: Cpu,
    },
    {
      number: "4",
      title: "Programme & Blanket Sourcing",
      desc: "Designed for recurring production lines, our blanket procurement agreements offer locked revision-controlled BOMs, forecast-based buffer stock holding, and scheduled batch releases to keep assembly lines running continuously.",
      icon: Repeat,
    },
  ];

  // The eFocus 4-Step Procurement Workflow
  const workflowSteps = [
    {
      step: "01",
      title: "BOM Upload & Parsing",
      desc: "Submit your BOM file (.xlsx, .csv, or KiCad/Altium exports). Our parser extracts MPNs, target quantities, and manufacturer preferences instantly.",
      icon: UploadCloud,
    },
    {
      step: "02",
      title: "Technical Review & Single Offer",
      desc: "Within 24–48 hours, receive a line-by-line quote detailing landed unit costs in INR, lead times, lifecycle risks, and recommended drop-in alternates.",
      icon: Clock,
    },
    {
      step: "03",
      title: "Quality Verification & Consolidation",
      desc: "Components are sourced through authorized channels, undergo visual and batch inspection, and are consolidated into ESD-safe packaging at our facility.",
      icon: PackageCheck,
    },
    {
      step: "04",
      title: "Doorstep Delivery & Single Invoice",
      desc: "Your entire consignment arrives in a single delivery, complete with lot genealogy documentation and a single GST-compliant invoice.",
      icon: FileText,
    },
  ];

  // 3 FAQs strictly matching provided spec
  const faqs = [
    {
      question: "What file formats are accepted for BOM upload?",
      answer:
        "We accept .xlsx, .csv, and standard exports from EDA tools including Altium, KiCad, Eagle, and EasyEDA. Custom manual spreadsheets are parsed and normalized by our technical team.",
    },
    {
      question: "How does eFocus handle End-of-Life (EOL) or out-of-stock components?",
      answer:
        "During technical review, any EOL, NRND, or out-of-stock part is flagged. Our procurement engineers identify pin-compatible, drop-in alternatives with matching datasheets for your approval before order confirmation.",
    },
    {
      question: "Are components covered by GST and local invoicing in India?",
      answer:
        "Yes. All quotes provided by eFocus Industrial are fully landed in Indian Rupees (INR) and include customs clearance, local freight, and a single GST-compliant invoice.",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden selection:bg-red-500 selection:text-white">
      
      {/* =========================================================================
          HERO SECTION (CENTERED, BALANCED, NO EMPTY RIGHT SIDE)
          ========================================================================= */}
      <section 
        id="procurement-hero"
        className="w-full relative pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-gray-100 overflow-hidden"
      >
        {/* Soft Ambient Radial Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(175,2,2,0.06),transparent_70%)] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[100rem] mx-auto relative z-10 flex flex-col items-center text-center">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-red-600 font-semibold">Procurement Solutions</span>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-semibold tracking-wide uppercase mb-6 shadow-2xs hover:scale-[1.02] transition-transform animate-in fade-in slide-in-from-left-4 duration-500">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>Enterprise BOM Procurement & Component Sourcing Solutions</span>
            </div>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.14] mb-6 animate-in fade-in slide-in-from-left-6 duration-700 text-center">
              Enterprise BOM Procurement &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                Component Sourcing Solutions
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed mb-10 max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-left-8 duration-700">
              Eliminate supply chain friction. Single-quote line-item matching, proactive lifecycle scrubbing, and consolidated GST-compliant delivery for electronics manufacturing.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Link
                to="/procurement-solutions/bom-procurement#bom-upload"
                className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
              >
                <NexChipIcon className="w-8 h-8" />
                <span>Upload Your BOM (XLSX/CSV)</span>
              </Link>

              <Link
                to="/quote?solution=bom"
                className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs cursor-pointer"
              >
                <span>Request Technical Consultation</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 1: END-TO-END INDUSTRIAL BOM SOURCING SERVICES (4 Items)
          ========================================================================= */}
      <section 
        ref={servicesRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white border-b border-gray-100 relative"
      >
        <div className="w-full max-w-[100rem] mx-auto">
          
          <div className={`text-center max-w-4xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Full-Cycle Capabilities" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              End-to-End Industrial BOM Sourcing Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sourcingServices.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-7 sm:p-9 bg-[#fbfcfd] border border-gray-200/90 hover:border-red-300 shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 ${
                    servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-105">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors leading-snug mb-3">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE EFOCUS 4-STEP PROCUREMENT WORKFLOW (4 Steps)
          ========================================================================= */}
      <section 
        ref={workflowRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#fbfcfd] border-b border-gray-100 relative"
      >
        <div className="w-full max-w-[100rem] mx-auto">
          
          <div className={`text-center max-w-4xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            workflowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Execution Roadmap" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              The eFocus 4-Step Procurement Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-6 bg-white border border-gray-200/90 shadow-2xs hover:shadow-xl hover:border-red-300 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 ${
                    workflowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#fbfcfd] border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-red-600 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-105">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-red-600 transition-colors">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors leading-snug mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FREQUENTLY ASKED QUESTIONS (3 Questions)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white border-b border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto">
          
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Common Inquiries" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/90 bg-[#fbfcfd] shadow-2xs overflow-hidden transition-all duration-200 hover:border-red-200"
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
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-white animate-in fade-in duration-300">
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
          SECTION 4: FINAL CTA BANNER
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="rounded-[36px] bg-gradient-to-br from-[#111315] via-[#1a1d21] to-black p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden shadow-2xl">
            
            {/* Background Ambient Aura */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Ready to optimize your supply chain?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Upload your BOM for a consolidated quote today.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/procurement-solutions/bom-procurement#bom-upload"
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#0d0f11] py-3.5 px-8 font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Upload Your BOM (XLSX/CSV)</span>
                </Link>

                <Link
                  to="/quote?solution=bom"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-semibold border border-white/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-red-400" />
                  <span>Request Technical Consultation</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
