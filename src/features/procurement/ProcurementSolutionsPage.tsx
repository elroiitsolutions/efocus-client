import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { NexChipIcon, NexBadge } from "@/components/ui/NexIcons";
import CountUp from "@/components/ui/CountUp";
import { 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  ChevronDown, 
  Cpu, 
  Globe, 
  Search, 
  Repeat, 
  PackageCheck, 
  Sparkles,
  AlertCircle,
  HelpCircle,
  Layers,
  Building2,
  Wrench
} from "lucide-react";
import { FormSubmissionService } from "@/services/formSubmission.service";
import SuccessModal from "@/components/ui/SuccessModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProcurementSolutionsPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Enterprise BOM Procurement & Component Sourcing Solutions | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Eliminate supply chain friction. Single-quote line-item matching, proactive lifecycle scrubbing, and consolidated GST-compliant delivery for electronics manufacturing."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "Eliminate supply chain friction. Single-quote line-item matching, proactive lifecycle scrubbing, and consolidated GST-compliant delivery for electronics manufacturing."
      );
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

  // Form State
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requirementType, setRequirementType] = useState("Complete BOM");
  const [preferredBrands, setPreferredBrands] = useState("");
  const [deliveryTimeline, setDeliveryTimeline] = useState("Immediate (1–2 Weeks)");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Stats ribbon animation trigger
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Section Observer Triggers
  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesRef = useRef<HTMLElement>(null);

  const [workflowVisible, setWorkflowVisible] = useState(false);
  const workflowRef = useRef<HTMLElement>(null);

  const [qaVisible, setQaVisible] = useState(false);
  const qaRef = useRef<HTMLElement>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      handleObserve(statsRef.current, setStatsVisible),
      handleObserve(servicesRef.current, setServicesVisible),
      handleObserve(workflowRef.current, setWorkflowVisible),
      handleObserve(qaRef.current, setQaVisible),
    ];

    return () => {
      cleanups.forEach((c) => c && c());
    };
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const firstInput = formRef.current?.querySelector("input");
    firstInput?.focus();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    const allowedExtensions = [".xlsx", ".xls", ".csv", ".pdf"];
    const ext = uploadedFile.name.substring(uploadedFile.name.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      setFileError("Invalid format. Please upload .xlsx, .csv, or .pdf files.");
      setFile(null);
      return;
    }

    if (uploadedFile.size > 25 * 1024 * 1024) {
      setFileError("File size exceeds 25MB limit.");
      setFile(null);
      return;
    }

    setFileError(null);
    setFile(uploadedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || !fullName.trim() || !email.trim()) {
      alert("Please fill in all required fields (Full Name, Company Name, and Business Email).");
      return;
    }

    if (!file && !additionalDetails.trim()) {
      setFileError("Please upload your BOM file (.xlsx, .csv, or .pdf) or paste part numbers below.");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Enterprise BOM Procurement Sourcing Enquiry",
        form_type: "bom_procurement",
        company_name: companyName.trim(),
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        requirement_type: requirementType,
        delivery_timeline: deliveryTimeline,
        message: additionalDetails.trim() 
          ? `Requirement: ${requirementType}\nPreferred Brands: ${preferredBrands || "Any"}\nTimeline: ${deliveryTimeline}\n\nNotes/Line Items:\n${additionalDetails.trim()}`
          : `Requirement: ${requirementType}\nPreferred Brands: ${preferredBrands || "Any"}\nTimeline: ${deliveryTimeline}`,
        file: file,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setRequirementType("Complete BOM");
      setPreferredBrands("");
      setDeliveryTimeline("Immediate (1–2 Weeks)");
      setAdditionalDetails("");
      setFile(null);
      setFileError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      console.error("BOM submission failed:", err);
      alert(err.message || "Failed to submit BOM. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4 Core Sourcing Services
  const sourcingServices = [
    {
      number: "01",
      title: "Technical BOM Scrubbing & Cross-Referencing",
      desc: "Every Bill of Materials uploaded to eFocus undergoes automated parsing followed by an engineering review. We verify active MPNs, flag obsolete (EOL) or Not Recommended for New Designs (NRND) parts, and supply fully qualified drop-in alternatives without compromising board spin specs.",
      icon: Search,
      tags: ["Active MPN Verification", "EOL / NRND Scrubbing", "Drop-In Alternatives"],
    },
    {
      number: "02",
      title: "Global Multi-Channel Aggregation",
      desc: "Bypass the complexity of juggling multiple franchised distributors and global spot markets. We aggregate active, passive, electromechanical, and interconnect lines into a single consolidated fulfillment stream, optimizing line-item pricing and volume breaks.",
      icon: Globe,
      tags: ["Multi-Channel Aggregation", "Volume Price Breaks", "Single PO Stream"],
    },
    {
      number: "03",
      title: "Hard-to-Find & EOL Component Procurement",
      desc: "When supply shortages stall assembly lines, eFocus leverages verified global supply networks across 30+ countries. We locate hard-to-find, high-demand, and allocated semiconductors while guaranteeing authenticity through rigorous batch verification.",
      icon: Cpu,
      tags: ["Allocated Semiconductors", "30+ Countries Reach", "Batch Authenticity"],
    },
    {
      number: "04",
      title: "Programme & Blanket Sourcing",
      desc: "Designed for recurring production lines, our blanket procurement agreements offer locked revision-controlled BOMs, forecast-based buffer stock holding, and scheduled batch releases to keep assembly lines running continuously.",
      icon: Repeat,
      tags: ["Revision-Controlled BOMs", "Buffer Stock Holding", "Scheduled Batch Releases"],
    },
  ];

  // The eFocus 4-Step Procurement Workflow
  const workflowSteps = [
    {
      step: "01",
      badge: "Instant Parsing",
      title: "BOM Upload & Parsing",
      desc: "Submit your BOM file (.xlsx, .csv, or KiCad/Altium exports). Our parser extracts MPNs, target quantities, and manufacturer preferences instantly.",
      icon: UploadCloud,
    },
    {
      step: "02",
      badge: "24–48 Hours",
      title: "Technical Review & Single Offer",
      desc: "Within 24–48 hours, receive a line-by-line quote detailing landed unit costs in INR, lead times, lifecycle risks, and recommended drop-in alternates.",
      icon: Clock,
    },
    {
      step: "03",
      badge: "Quality Verified",
      title: "Quality Verification & Consolidation",
      desc: "Components are sourced through authorized channels, undergo visual and batch inspection, and are consolidated into ESD-safe packaging at our facility.",
      icon: ShieldCheck,
    },
    {
      step: "04",
      badge: "Doorstep Delivery",
      title: "Doorstep Delivery & Single Invoice",
      desc: "Your entire consignment arrives in a single delivery, complete with lot genealogy documentation and a single GST-compliant invoice.",
      icon: PackageCheck,
    },
  ];

  // Procurement Models in the Suite
  const procurementModels = [
    {
      title: "BOM Procurement",
      desc: "Line-by-line electronic BOM matching, lifecycle analysis, and kitted PCBA component delivery.",
      href: "/procurement-solutions/bom-procurement",
      icon: UploadCloud,
      badge: "Primary Sourcing",
    },
    {
      title: "Vendor Consolidation",
      desc: "Consolidate hundreds of disparate suppliers into a single master vendor agreement with unified invoicing.",
      href: "/procurement-solutions/vendor-consolidation",
      icon: Building2,
      badge: "Admin Reduction",
    },
    {
      title: "Annual Rate Contracts (ARC)",
      desc: "Lock in fixed pricing for 12 months with pre-committed buffer stock and scheduled production drops.",
      href: "/procurement-solutions/annual-rate-contracts",
      icon: Repeat,
      badge: "Price Stability",
    },
    {
      title: "Project Procurement",
      desc: "Dedicated end-to-end sourcing for turnkey CapEx projects, research labs, and factory rollouts.",
      href: "/procurement-solutions/project-procurement",
      icon: Layers,
      badge: "Full Turnkey",
    },
    {
      title: "Turnkey Workstations",
      desc: "Custom-configured ESD workstations, calibrated test equipment racks, and tool stations ready for deployment.",
      href: "/procurement-solutions/turnkey-workstations",
      icon: Wrench,
      badge: "Line Readiness",
    },
  ];

  // Quality Assurance Comparison Matrix
  const comparisonRows = [
    {
      feature: "Lifecycle Protection",
      traditional: "Blind substitution; risk of buying EOL or counter-market stock.",
      efocus: "Proactive engineering review with pre-approved drop-in alternates.",
      highlight: "Guaranteed Active Lifecycle",
    },
    {
      feature: "Landed Pricing & Import Friction",
      traditional: "Multiple foreign currency transactions, split duties & customs friction.",
      efocus: "Single INR landed quote with 100% GST compliance and doorstep delivery.",
      highlight: "100% GST & Zero Customs Headaches",
    },
    {
      feature: "Quality & Traceability",
      traditional: "Minimal or absent incoming inspection across fragmented brokers.",
      efocus: "Visual, dimensional, and batch verification with full lot traceability.",
      highlight: "Full Lot & Certificate Traceability",
    },
    {
      feature: "Fulfillment Efficiency",
      traditional: "Disjointed partial shipments causing PCBA assembly line delays.",
      efocus: "Consolidated kit delivery tailored for PCBA assembly lines.",
      highlight: "Line-Ready Consolidated Kits",
    },
  ];

  // FAQs
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
          SECTION 1: HERO & INTERACTIVE BOM UPLOAD FORM
          ========================================================================= */}
      <section 
        id="procurement-hero"
        className="w-full relative pt-6 sm:pt-10 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden"
      >
        {/* Soft Ambient Radial Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(175,2,2,0.07),transparent_70%)] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[102rem] mx-auto relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-red-600 font-semibold">Procurement Solutions</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
            
            {/* Left Column: Heading, Value Prop, Auto-Increment Stats */}
            <div className="lg:col-span-7 flex flex-col items-start pt-2">
              
              {/* Eyebrow Pill with Pulsing Live Dot */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50/90 border border-red-200/80 text-red-700 text-xs sm:text-[13px] font-semibold tracking-wide mb-6 shadow-2xs hover:scale-[1.02] transition-transform animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#AF0202]"></span>
                </span>
                <span>ENTERPRISE BOM PROCUREMENT & SOURCING INFRASTRUCTURE</span>
              </div>

              {/* Main H1 with Gradient Accent */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[52px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Enterprise BOM Procurement &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Component Sourcing Solutions
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                Eliminate supply chain friction. Single-quote line-item matching, proactive lifecycle scrubbing, and consolidated GST-compliant delivery for electronics manufacturing.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Upload Your BOM (XLSX/CSV)</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs cursor-pointer"
                >
                  <span>Request Technical Consultation</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 10K+ Line Items/Year */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={10} suffix="K+" duration={1800} />
                    ) : (
                      <span>10K+</span>
                    )}
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 hidden sm:inline group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Line Items Sourced / Year
                  </p>
                </div>

                {/* Stat 2: 30+ Countries */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={30} suffix="+" duration={1600} />
                    ) : (
                      <span>30+</span>
                    )}
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 hidden sm:inline group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Global Sourcing Network
                  </p>
                </div>

                {/* Stat 3: 24–48h Turnaround */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={24} suffix="–48h" duration={1400} />
                    ) : (
                      <span>24–48h</span>
                    )}
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Single Landed Offer
                  </p>
                </div>
              </div>

              {/* Value Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Landed GST Invoicing
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Active Lifecycle Pre-Check
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  Traceable Certificate of Conformance
                </span>
              </div>

            </div>

            {/* Right Column: "Upload Your BOM" Interactive Form */}
            <div ref={formRef} className="lg:col-span-5 w-full">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_24px_60px_rgba(175,2,2,0.08)]">
                
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Upload Your BOM
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Submit requirements for an itemized INR landed quotation.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-[11px] font-bold border border-red-200/80 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    24–48h SLA
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Apex Electronics Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Business Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="procurement@apexelectronics.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Sourcing Requirement Type */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Sourcing Requirement Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Complete BOM",
                        "Selected Line Items",
                        "Hard-to-Find & EOL",
                        "Blanket Sourcing",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setRequirementType(item)}
                          className={`py-2 px-3 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                            requirementType === item
                              ? "bg-red-50 border-red-500 text-red-700 font-semibold shadow-2xs"
                              : "bg-gray-50/60 border-gray-200 text-gray-600 hover:bg-gray-100/70"
                          }`}
                        >
                          <span className="mr-1.5">{requirementType === item ? "●" : "○"}</span>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Brands & Delivery Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Preferred Brands <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={preferredBrands}
                        onChange={(e) => setPreferredBrands(e.target.value)}
                        placeholder="e.g. TI, ST, Omron, Microchip"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Delivery Timeline
                      </label>
                      <Select value={deliveryTimeline} onValueChange={setDeliveryTimeline}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select delivery timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Immediate (1–2 Weeks)">Immediate (1–2 Weeks)</SelectItem>
                          <SelectItem value="Standard (2–4 Weeks)">Standard (2–4 Weeks)</SelectItem>
                          <SelectItem value="Scheduled Monthly Batches">Scheduled Monthly Batches</SelectItem>
                          <SelectItem value="Blanket Supply Contract">Blanket Supply Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Target MPNs or Requirements Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Target MPNs or Special Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Specify acceptable pin-compatible drop-in alternates, target landed unit price, or project specs..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Upload BOM File Area with Drag-and-Drop */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Upload BOM File (.xlsx, .csv, .pdf) <span className="text-red-500">*</span>
                    </label>
                    
                    {!file ? (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all ${
                          isDragging
                            ? "border-red-500 bg-red-50/50 scale-[1.01]"
                            : "border-gray-300 hover:border-red-400 bg-gray-50/50 hover:bg-red-50/20"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          accept=".xlsx,.xls,.csv,.pdf"
                          className="hidden"
                        />
                        <div className="w-10 h-10 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2 shadow-2xs">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                          Click to browse or drag & drop BOM file
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Accepted: <span className="font-semibold text-gray-700">Excel (.xlsx, .xls), CSV, PDF</span> (Max 25MB)
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-red-50/70 border border-red-200">
                        <div className="flex items-center gap-3 truncate">
                          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-gray-900 truncate">{file.name}</p>
                            <p className="text-[11px] text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {fileError && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {fileError}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#111315] hover:bg-black text-white text-sm font-bold shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Parsing & Transmitting BOM...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Request Consolidated BOM Quote</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Strictly confidential. NDA protection & engineering pre-check.
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: END-TO-END INDUSTRIAL BOM SOURCING SERVICES (4 Core Pillars)
          ========================================================================= */}
      <section 
        ref={servicesRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 relative"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Full-Cycle Capabilities" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              End-to-End Industrial BOM Sourcing Services
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Consolidate every bill-of-materials requirement under one dedicated procurement partner—optimizing line costs, eliminating component obsolescence, and guaranteeing authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sourcingServices.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 100}ms`,
                  }}
                  className={`rounded-3xl p-7 sm:p-8 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(175,2,2,0.08)] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 ${
                    servicesVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-110">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                        Service {service.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors leading-snug mb-3">
                      {service.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/60">
                    {service.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-white border border-gray-200/80 text-xs font-medium text-gray-600 group-hover:border-red-200 group-hover:text-gray-900 group-hover:bg-red-50/50 transition-all duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section CTA Button */}
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={scrollToForm}
              className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12 px-7"
            >
              <NexChipIcon className="w-8 h-8" />
              <span>Submit Your BOM for Scrubbing</span>
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE eFOCUS 4-STEP PROCUREMENT WORKFLOW
          ========================================================================= */}
      <section 
        id="how-it-works" 
        ref={workflowRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100 relative"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            workflowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Structured Execution" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              The eFocus 4-Step Procurement Workflow
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              A transparent, accountable transition from raw BOM file to production-ready consolidated dock delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 110}ms`,
                  }}
                  className={`rounded-3xl p-6 sm:p-7 bg-white border border-gray-200/90 shadow-2xs hover:shadow-xl hover:border-red-300 transition-all duration-500 flex flex-col justify-between relative group hover:-translate-y-2 ${
                    workflowVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#AF0202] to-black text-white font-mono text-sm font-black flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300">
                        {step.step}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-red-700 transition-colors">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2.5">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-red-600 group-hover:text-red-700 transition-colors">
                    <span className="flex items-center gap-1.5">
                      <StepIcon className="w-4 h-4 text-red-500" />
                      Step {idx + 1} of 4
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-200" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: COMPLETE PORTFOLIO OF B2B PROCUREMENT MODELS
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Flexible Engagement Models" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Explore Our Full Procurement Suite
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From one-time spot BOM sourcing to enterprise vendor consolidation and long-term rate contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {procurementModels.map((model, idx) => {
              const Icon = model.icon;
              return (
                <Link
                  key={idx}
                  to={model.href}
                  className="rounded-3xl p-6 sm:p-7 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-110">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full group-hover:bg-red-100 transition-colors">
                        {model.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors mb-2">
                      {model.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                      {model.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 group-hover:text-red-700 pt-4 border-t border-gray-100">
                    <span>Explore Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: QUALITY ASSURANCE & INDUSTRIAL COMPLIANCE (Comparison Matrix)
          ========================================================================= */}
      <section 
        ref={qaRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            qaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Risk-Free Procurement Matrix" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Quality Assurance & Supply Chain Compliance
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Why leading electronics manufacturers, EMS providers, and OEMs choose eFocus over traditional parts brokers.
            </p>
          </div>

          <div className={`hidden md:block overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-md transition-all duration-700 ${
            qaVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-98"
          }`}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 w-1/4">
                    Procurement Dimension
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 w-3/8">
                    Traditional Parts Brokers
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50/50 w-3/8">
                    <div className="flex items-center gap-2">
                      <span>eFocus Enterprise Procurement</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#AF0202] text-white shadow-2xs">
                        Recommended
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-5 px-6 text-sm font-bold text-gray-900 align-top">
                      {row.feature}
                      <span className="block text-[11px] font-normal text-red-600 mt-0.5">
                        {row.highlight}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-500 align-top leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                          ✕
                        </span>
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-900 font-medium bg-red-50/20 group-hover:bg-red-50/40 align-top leading-relaxed transition-colors">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                        <span className="text-gray-900 font-semibold">{row.efocus}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Comparison Cards */}
          <div className="md:hidden space-y-4">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="rounded-2xl bg-white border border-gray-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm">{row.feature}</h4>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    {row.highlight}
                  </span>
                </div>
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl space-y-1">
                  <span className="font-semibold text-gray-600 block">Traditional:</span>
                  <p>{row.traditional}</p>
                </div>
                <div className="text-xs text-gray-900 bg-red-50/40 border border-red-100 p-3 rounded-xl space-y-1">
                  <span className="font-bold text-red-700 block flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> eFocus Enterprise:
                  </span>
                  <p className="font-medium">{row.efocus}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FREQUENTLY ASKED QUESTIONS (3 User Questions)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Common Inquiries" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find answers regarding BOM file formats, EOL component handling, and GST invoicing.
            </p>
          </div>

          <div className="space-y-3.5">
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
          SECTION 7: FINAL CTA BANNER (Standard Rounded Floating Card)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-[36px] bg-gradient-to-br from-[#111315] via-[#1a1d21] to-black p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden shadow-2xl">
            
            {/* Background Ambient Aura */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-200 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Enterprise BOM Sourcing Infrastructure</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Ready to Optimize Your Supply Chain?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Upload your BOM for a consolidated quote today. Proactive lifecycle scrubbing, single-quote line matching, and 100% landed GST invoicing.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#0d0f11] py-3.5 px-8 font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Upload Your BOM (XLSX/CSV)</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-semibold border border-white/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-red-400" />
                  <span>Request Technical Consultation</span>
                </button>
              </div>

              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 border-t border-white/10 mt-8">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Direct OEM Sourcing & Traceability
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-red-400" />
                  24–48h Technical Quote Turnaround
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  100% Landed GST Invoicing
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="BOM Sourcing Request Received!"
        message="Thank you for submitting your bill of materials. Our engineering procurement desk is scrubbing your MPNs and will furnish an itemized landed INR quote within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
