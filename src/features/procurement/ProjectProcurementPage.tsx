import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { NexChipIcon, NexBadge } from "@/components/ui/NexIcons";
import CountUp from "@/components/ui/CountUp";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  Cpu, 
  Gauge, 
  Zap, 
  Wrench, 
  Boxes, 
  Car, 
  Factory, 
  Sparkles,
  HelpCircle,
  FileCheck,
  FileText,
  Layers,
  FlaskConical,
  Building,
  Target,
  Upload,
  Paperclip,
  X,
  Search,
  GitBranch,
  Network
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

export default function ProjectProcurementPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Project Procurement Services for Industrial Requirements | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "From electronic components to test equipment and industrial supplies, eFocus helps businesses source products based on project specifications, quantities and application requirements."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "From electronic components to test equipment and industrial supplies, eFocus helps businesses source products based on project specifications, quantities and application requirements."
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

  // Form State
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectRequirements, setProjectRequirements] = useState("");
  const [expectedDeliveryTimeline, setExpectedDeliveryTimeline] = useState("1–3 Months");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Section Observer Triggers
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const [solutionsVisible, setSolutionsVisible] = useState(false);
  const solutionsRef = useRef<HTMLElement>(null);

  const [sourceVisible, setSourceVisible] = useState(false);
  const sourceRef = useRef<HTMLElement>(null);

  const [whyVisible, setWhyVisible] = useState(false);
  const whyRef = useRef<HTMLElement>(null);

  const [industriesVisible, setIndustriesVisible] = useState(false);
  const industriesRef = useRef<HTMLElement>(null);

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
      handleObserve(solutionsRef.current, setSolutionsVisible),
      handleObserve(sourceRef.current, setSourceVisible),
      handleObserve(whyRef.current, setWhyVisible),
      handleObserve(industriesRef.current, setIndustriesVisible),
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

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !companyName.trim() || !email.trim() || !projectRequirements.trim()) {
      alert("Please fill in all required fields (Full Name, Company Name, Business Email, and Project Requirements).");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Project Procurement Enquiry",
        form_type: "project_procurement",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        delivery_timeline: expectedDeliveryTimeline,
        product_categories: selectedCategories.join(", "),
        message: `Project Scope:\n${projectRequirements.trim()}\n\nExpected Timeline: ${expectedDeliveryTimeline}\nSelected Focus Categories: ${selectedCategories.join(", ")}`,
        file: file,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setProjectRequirements("");
      setExpectedDeliveryTimeline("1–3 Months");
      setSelectedCategories([]);
      removeFile();
    } catch (err: any) {
      console.error("Project procurement submission failed:", err);
      alert(err.message || "Failed to submit project inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2 Data: Our Project Procurement Solution (4 Pillars)
  const procurementSolutions = [
    {
      title: "BOM & BOQ-Based Sourcing",
      desc: "Share your Bill of Materials (BOM), Bill of Quantities (BOQ) or project requirement list to initiate sourcing.",
      icon: FileText,
      badge: "Requirement Ingestion",
    },
    {
      title: "Multi-Category Procurement",
      desc: "Explore products across relevant technical and industrial categories through one procurement partner.",
      icon: Layers,
      badge: "Cross-Disciplinary",
    },
    {
      title: "Technical Requirement Evaluation",
      desc: "Assess product specifications, intended applications and compatibility requirements to identify suitable options.",
      icon: Target,
      badge: "Application Engineering",
    },
    {
      title: "Quotation & Order Coordination",
      desc: "Coordinate quotations, commercial terms and order-related communication within the agreed project scope.",
      icon: FileCheck,
      badge: "Commercial Alignment",
    },
  ];

  // Section 3 Data: What We Source (6 Core Pillars)
  const sourcedCategories = [
    {
      title: "Electronic Components & Connectivity",
      desc: "Electronic components, connectors, cables and connectivity accessories.",
      icon: Cpu,
      items: ["Active & Passive ICs", "Industrial Wiring Harnesses", "Circular & Terminal Connectors"],
    },
    {
      title: "Test & Measurement Instruments",
      desc: "Testing equipment and instruments for engineering, validation and laboratory applications.",
      icon: Gauge,
      items: ["Digital Storage Oscilloscopes", "Spectrum Analyzers", "Multi-Channel DAQ Units"],
    },
    {
      title: "Power & Electrical Products",
      desc: "Power supplies, electrical components and related industrial products.",
      icon: Zap,
      items: ["Programmable DC Sources", "DIN-Rail Industrial PSUs", "Switchgear & Distribution"],
    },
    {
      title: "SMT & Production Supplies",
      desc: "Electronics manufacturing, assembly and production-related supplies.",
      icon: Boxes,
      items: ["Reflow & Stencil Tools", "Soldering & Desoldering Stations", "ESD Magazine Racks"],
    },
    {
      title: "Tools & MRO",
      desc: "Industrial tools, maintenance products and operational consumables.",
      icon: Wrench,
      items: ["Calibrated Torque Tools", "Precision Strippers & Cutters", "Plant Maintenance Consumables"],
    },
    {
      title: "ESD, Lab & Workstations",
      desc: "ESD protection products, laboratory supplies and engineering workstation requirements.",
      icon: ShieldCheck,
      items: ["Modular Engineering Benches", "Conductive Flooring & Mats", "Cleanroom Fume Extraction"],
    },
  ];

  // Section 4 Data: Why Choose eFocus Industrial? (5 Differentiators)
  const whyChooseReasons = [
    {
      title: "Technical Requirement-Based Sourcing",
      desc: "Match procurement options to the specified product details, order quantities and intended applications.",
      icon: Search,
      highlight: "Precision Match",
    },
    {
      title: "Integrated Project Sourcing",
      desc: "Bring together requirements for technical equipment and industrial supplies across a project.",
      icon: Network,
      highlight: "Unified Scope",
    },
    {
      title: "BOM & BOQ-Based Sourcing",
      desc: "Use your bill of materials, bill of quantities or project documents to define procurement needs.",
      icon: FileText,
      highlight: "Document Driven",
    },
    {
      title: "Application-Focused Evaluation",
      desc: "Review intended use, technical compatibility and product requirements before selecting suitable options.",
      icon: GitBranch,
      highlight: "Engineering First",
    },
    {
      title: "Coordinated Procurement Process",
      desc: "Manage sourcing enquiries, quotation reviews and order-related communication through one procurement partner.",
      icon: CheckCircle2,
      highlight: "Single Touchpoint",
    },
  ];

  // Section 5 Data: Project Procurement Across Engineering-Driven Industries (6 Verticals)
  const engineeringIndustries = [
    {
      title: "Electronics Manufacturing",
      desc: "Turnkey BOM fulfillment, SMT production consumables, and automated board test instrumentation.",
      icon: Cpu,
    },
    {
      title: "Automotive & EV",
      desc: "Battery testing rigs, wire harnesses, automotive-grade sensors, and rugged shop-floor tooling.",
      icon: Car,
    },
    {
      title: "OEMs & Tier-1 Suppliers",
      desc: "Assembly station outfitting, standardized components, and batch procurement under strict QA.",
      icon: Factory,
    },
    {
      title: "R&D and Engineering Laboratories",
      desc: "Precision test benches, RF enclosures, calibration tools, and rapid prototyping supplies.",
      icon: FlaskConical,
    },
    {
      title: "Industrial Manufacturing",
      desc: "Plant automation power drops, electrical distribution, sensor networks, and plant MRO supplies.",
      icon: Building,
    },
    {
      title: "System Integrators",
      desc: "Multi-vendor hardware bundling, customized wiring looms, and single-source project billing.",
      icon: Layers,
    },
  ];

  // Section 6 Data: FAQs
  const faqs = [
    {
      question: "What is project procurement?",
      answer:
        "Project procurement involves sourcing the products, equipment, components and supplies required for a defined engineering or industrial project.",
    },
    {
      question: "How is project procurement different from BOM procurement?",
      answer:
        "BOM procurement involves sourcing components listed in a Bill of Materials, while project procurement covers broader material, equipment and purchasing needs across the project lifecycle.",
    },
    {
      question: "Can I share a BOM or BOQ for sourcing?",
      answer:
        "Yes. You can share your BOM, BOQ, product list or technical requirement document to help initiate the sourcing process.",
    },
    {
      question: "Can eFocus Industrial source products across multiple brands?",
      answer:
        "Sourcing options can be explored across relevant brands and suppliers, subject to product specifications, availability and commercial feasibility.",
    },
    {
      question: "What information is required to start?",
      answer:
        "Share product specifications, quantities, preferred brands where applicable, project requirements and expected delivery timelines.",
    },
    {
      question: "Does project procurement include installation or project execution?",
      answer:
        "The scope varies according to the project requirements and the services agreed upon. Product sourcing and procurement coordination do not automatically include installation or complete project execution.",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE PROJECT ENQUIRY FORM
          ========================================================================= */}
      <section 
        id="project-hero"
        className="w-full relative pt-6 sm:pt-10 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden"
      >
        {/* Ambient Radial Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(175,2,2,0.07),transparent_70%)] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[102rem] mx-auto relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Procurement Solutions</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">Project Procurement</span>
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
                <span>ONE PROJECT. MULTIPLE REQUIREMENTS. ONE PROCUREMENT PARTNER.</span>
              </div>

              {/* Main H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Project Procurement Services for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Industrial Requirements
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                From electronic components to test equipment and industrial supplies, eFocus helps businesses source products based on project specifications, quantities and application requirements.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Discuss Your Project</span>
                </button>

                <a
                  href="#what-we-source"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>What We Source</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 100% Technical Match */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={100} suffix="%" duration={1800} />
                    ) : (
                      <span>100%</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Spec Compliance</span>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Scrubbed against BOQ & datasheet
                  </p>
                </div>

                {/* Stat 2: 1 Single PO Consolidation */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={1} prefix="Single " suffix=" PO" duration={1400} />
                    ) : (
                      <span>Single PO</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Consolidated Invoicing</span>
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Single GST bill for all lines
                  </p>
                </div>

                {/* Stat 3: 48-Hour Turnaround */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={48} suffix="h" duration={1600} />
                    ) : (
                      <span>48h</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>RFQ Turnaround</span>
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Multi-brand pricing & lead times
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>BOM & BOQ Analysis</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Milestone-Based Dispatch</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>NPI & Production Scale</span>
                </span>
              </div>

            </div>

            {/* Right Column: Interactive Form "Tell Us About Your Project" */}
            <div className="lg:col-span-5" ref={formRef}>
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
                
                {/* Form Header Accent Bar with Shimmer */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-[#AF0202] to-black" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Tell Us About Your Project
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Submit project requirements or upload your BOM/BOQ file.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center shrink-0 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Anand Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Apex Robotics"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Business Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="projects@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
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

                  {/* Project Categories Required (Multi-Select Chips) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-gray-700">
                        Product Categories to Source
                      </label>
                      <span className="text-[10px] text-gray-400">Select applicable categories</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        "Electronic Components & Connectivity",
                        "Test & Measurement Instruments",
                        "Power & Electrical Products",
                        "SMT & Production Supplies",
                        "Tools & MRO",
                        "ESD, Lab & Workstations",
                      ].map((cat) => {
                        const isSelected = selectedCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-medium text-left border transition-all cursor-pointer truncate ${
                              isSelected
                                ? "bg-red-50 border-red-500 text-red-700 font-semibold shadow-2xs"
                                : "bg-gray-50/60 border-gray-200 text-gray-600 hover:bg-gray-100/70"
                            }`}
                          >
                            <span className="mr-1">{isSelected ? "✓" : "+"}</span>
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expected Delivery Timeline */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Expected Delivery Timeline
                    </label>
                    <Select
                      value={expectedDeliveryTimeline}
                      onValueChange={setExpectedDeliveryTimeline}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select delivery timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks) — Urgent Batch</SelectItem>
                        <SelectItem value="2–4 Weeks">2–4 Weeks (Standard NPI Phase)</SelectItem>
                        <SelectItem value="1–3 Months">1–3 Months (Milestone-Based Rollout)</SelectItem>
                        <SelectItem value="Quarterly / Planned Project Phase">Quarterly / Planned Project Phase</SelectItem>
                        <SelectItem value="Flexible / Long Lead Consultation">Flexible / Long Lead Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Requirements * */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Project Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={projectRequirements}
                      onChange={(e) => setProjectRequirements(e.target.value)}
                      placeholder="Outline part numbers, quantities, target specifications, compliance needs, or special application details..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Optional File Upload (BOM / BOQ / Drawings) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Upload BOM / BOQ Document <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    {file ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50/60 border border-red-200 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <Paperclip className="w-4 h-4 text-red-600 shrink-0" />
                          <span className="font-semibold text-gray-900 truncate">{file.name}</span>
                          <span className="text-[11px] text-gray-500 shrink-0">
                            ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-700 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-gray-300 rounded-xl p-2.5 text-center hover:border-red-400 hover:bg-red-50/20 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                      >
                        <Upload className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                        <span className="text-xs text-gray-600 group-hover:text-gray-900 font-medium">
                          Attach BOM / BOQ spreadsheet or PDF (.xlsx, .csv, .pdf)
                        </span>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".xlsx,.xls,.csv,.pdf,.zip"
                      className="hidden"
                    />
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
                          <span>Submitting Project Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Submit Project Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Strictly confidential. Non-disclosure protection for engineering specifications.
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: OUR PROJECT PROCUREMENT SOLUTION (4 PILLARS)
          ========================================================================= */}
      <section 
        ref={solutionsRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            solutionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Methodology & Scope" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Our Project Procurement Solution
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Structured workflow from BOM/BOQ ingestion to multi-category technical evaluation and single-point order execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {procurementSolutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 90}ms`,
                  }}
                  className={`benefit-card rounded-3xl p-7 sm:p-8 bg-[#fbfcfd] border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer group ${
                    solutionsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                  }`}
                >
                  <div>
                    <div className="benefit-icon w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#AF0202] mb-6 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 mb-3 group-hover:bg-red-950 group-hover:text-red-300 transition-colors">
                      {sol.badge}
                    </span>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors leading-snug mb-3">
                      {sol.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 group-hover:border-zinc-800 flex items-center text-xs font-semibold text-[#AF0202] group-hover:text-red-400">
                    <span>Explore Process</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: WHAT WE SOURCE (6 CATEGORIES)
          ========================================================================= */}
      <section 
        id="what-we-source"
        ref={sourceRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            sourceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Comprehensive Coverage" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              What We Source
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Consolidate high-spec active components, heavy plant testing gear, shop-floor tooling, and workstations under one order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sourcedCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-6 sm:p-7 bg-white border border-gray-200/80 hover:border-red-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(175,2,2,0.08)] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 hover:scale-[1.01] ${
                    sourceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center mb-5 shadow-2xs group-hover:scale-110 group-hover:bg-[#AF0202] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors leading-snug mb-2.5">
                      {cat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                    {cat.items.map((item, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200/80 text-[11px] font-medium text-gray-600 group-hover:border-red-200 group-hover:text-gray-900 group-hover:bg-red-50/50 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sourcing CTA Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12 px-8"
            >
              <NexChipIcon className="w-8 h-8" />
              <span>Share Your Product Requirements</span>
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: WHY CHOOSE eFOCUS INDUSTRIAL? (5 DIFFERENTIATORS)
          ========================================================================= */}
      <section 
        ref={whyRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Value Proposition" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Why Choose eFocus Industrial?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Engineered for seamless project execution with technical scrubbing, commercial consolidation, and accountable delivery.
            </p>
          </div>

          {/* 5 Feature Cards: 3 on Top Row, 2 on Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {whyChooseReasons.slice(0, 3).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                  className={`rounded-3xl p-7 bg-[#fbfcfd] border border-gray-200/90 shadow-2xs hover:shadow-lg hover:border-red-300 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 ${
                    whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200/60">
                        {item.highlight}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseReasons.slice(3, 5).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx + 3}
                  style={{ transitionDelay: `${(idx + 3) * 100}ms` }}
                  className={`rounded-3xl p-7 bg-[#fbfcfd] border border-gray-200/90 shadow-2xs hover:shadow-lg hover:border-red-300 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 ${
                    whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200/60">
                        {item.highlight}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: PROJECT PROCUREMENT ACROSS ENGINEERING-DRIVEN INDUSTRIES
          ========================================================================= */}
      <section 
        ref={industriesRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            industriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Target Applications" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Project Procurement Across Engineering-Driven Industries
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Delivering customized project BOM fulfillment for mission-critical industrial and hardware manufacturing sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringIndustries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-6 sm:p-7 bg-white border border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-lg transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 ${
                    industriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#fbfcfd] border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs mb-4 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                      {ind.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6: FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Clarifications" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find answers regarding project scope, BOM/BOQ uploads, cross-brand sourcing, and execution policies.
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
          SECTION 7: FINAL CTA BANNER
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd]">
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-[36px] bg-gradient-to-br from-[#111315] via-[#1a1d21] to-black p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden shadow-2xl">
            
            {/* Background Ambient Aura */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-200 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Multi-Disciplinary Project Sourcing</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Have a Project to Source?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Share your technical and industrial product requirements with eFocus Industrial.
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#0d0f11] py-3.5 px-8 font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              >
                <NexChipIcon className="w-8 h-8" />
                <span>Start Your Project Enquiry</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Project Enquiry Received!"
        message="Thank you for sharing your project procurement requirements. Our engineering sourcing specialists will review your specifications/BOM and contact you with a consolidated proposal within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
