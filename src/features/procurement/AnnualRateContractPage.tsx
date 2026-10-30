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
  CalendarCheck,
  Layers,
  FlaskConical,
  Building,
  Briefcase
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

export default function AnnualRateContractPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Annual Rate Contract (ARC) for Indirect Materials | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Simplify recurring purchases with agreed commercial terms and a structured procurement process with eFocus Industrial Annual Rate Contracts (ARC)."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "Simplify recurring purchases with agreed commercial terms and a structured procurement process with eFocus Industrial Annual Rate Contracts (ARC)."
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [estimatedAnnualRequirement, setEstimatedAnnualRequirement] = useState("₹10 Lakhs – ₹50 Lakhs");
  const [additionalRequirements, setAdditionalRequirements] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Section Observer Triggers
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const [benefitsVisible, setBenefitsVisible] = useState(false);
  const benefitsRef = useRef<HTMLElement>(null);

  const [pillarsVisible, setPillarsVisible] = useState(false);
  const pillarsRef = useRef<HTMLElement>(null);

  const [designedVisible, setDesignedVisible] = useState(false);
  const designedRef = useRef<HTMLElement>(null);

  const formRef = useRef<HTMLDivElement>(null);

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
      handleObserve(benefitsRef.current, setBenefitsVisible),
      handleObserve(pillarsRef.current, setPillarsVisible),
      handleObserve(designedRef.current, setDesignedVisible),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !companyName.trim() || !email.trim()) {
      alert("Please fill in all required fields (Full Name, Company Name, and Business Email).");
      return;
    }

    if (selectedCategories.length === 0) {
      alert("Please select at least one product category required for ARC.");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Annual Rate Contract (ARC) Inquiry",
        form_type: "annual_rate_contract",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        product_categories: selectedCategories.join(", "),
        estimated_annual_requirement: estimatedAnnualRequirement,
        message: additionalRequirements.trim() || `ARC Request: ${selectedCategories.join(", ")}. Annual Value: ${estimatedAnnualRequirement}`,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setSelectedCategories([]);
      setEstimatedAnnualRequirement("₹10 Lakhs – ₹50 Lakhs");
      setAdditionalRequirements("");
    } catch (err: any) {
      console.error("ARC submission failed:", err);
      alert(err.message || "Failed to submit ARC request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2 Data: Key Benefits (3 Cards)
  const arcBenefits = [
    {
      title: "Planned Annual Purchasing",
      desc: "Simplify recurring purchase based on estimated demand and buffer reserves.",
      icon: CalendarCheck,
      highlight: "Demand Forecasting",
    },
    {
      title: "Agreed Pricing & Terms",
      desc: "Define product rates and commercial conditions for a mutually agreed duration.",
      icon: FileCheck,
      highlight: "Price Stability",
    },
    {
      title: "Multi-Category Procurement",
      desc: "Coordinate requirements across technical and industrial product categories under one contract.",
      icon: Layers,
      highlight: "Single Sourcing Channel",
    },
  ];

  // Section 3 Data: Annual Contracts for Recurring Industrial Requirements (6 Core Pillars)
  const arcCategories = [
    {
      title: "Electronic Components & Connectivity",
      desc: "Electronic components, connectors, cables and related accessories.",
      icon: Cpu,
      tags: ["ICs & Passives", "Wire Harnesses", "Industrial Connectors"],
    },
    {
      title: "Test & Measurement Instruments",
      desc: "Electrical, electronic and industrial testing equipment for engineering and laboratory applications.",
      icon: Gauge,
      tags: ["Oscilloscopes", "Multimeters", "Traceable Calibration"],
    },
    {
      title: "Power & Electrical Products",
      desc: "Power supplies, electrical components and supporting industrial equipment.",
      icon: Zap,
      tags: ["DIN-Rail SMPS", "DC-DC Modules", "Circuit Breakers"],
    },
    {
      title: "SMT & Production Supplies",
      desc: "Production equipment, assembly accessories and manufacturing-related supplies.",
      icon: Boxes,
      tags: ["Soldering Stations", "Lead-Free Solder", "PCB Handling Racks"],
    },
    {
      title: "Tools & MRO",
      desc: "Maintenance, repair and operations products, tools and industrial consumables.",
      icon: Wrench,
      tags: ["Torque Drivers", "Precision Cutters", "Shop-Floor Consumables"],
    },
    {
      title: "ESD, Lab & Workstations",
      desc: "ESD protection products, laboratory supplies and engineering workstation requirements.",
      icon: ShieldCheck,
      tags: ["Anti-Static Mats", "Modular Benches", "Fume Extractors"],
    },
  ];

  // Section 4 Data: Designed for Businesses with Recurring Procurement Needs (6 Verticals)
  const recurringSectors = [
    {
      title: "Electronics Manufacturing",
      desc: "Organise repeat purchases of components, production supplies and technical products.",
      icon: Cpu,
    },
    {
      title: "Automotive & EV",
      desc: "Plan recurring requirements for manufacturing, testing and maintenance operations.",
      icon: Car,
    },
    {
      title: "OEMs & Tier-1 Suppliers",
      desc: "Structure repeat purchasing for production and engineering requirements.",
      icon: Factory,
    },
    {
      title: "R&D and Engineering Laboratories",
      desc: "Manage recurring requirements for testing equipment, accessories and laboratory supplies.",
      icon: FlaskConical,
    },
    {
      title: "Industrial Manufacturing",
      desc: "Organise purchasing needs for maintenance, operations and production support.",
      icon: Building,
    },
    {
      title: "Procurement Teams",
      desc: "Establish a more structured approach to supplier coordination and recurring purchases.",
      icon: Briefcase,
    },
  ];

  // Section 5 Data: FAQs
  const faqs = [
    {
      question: "What is an Annual Rate Contract (ARC)?",
      answer:
        "An Annual Rate Contract is a formal arrangement that establishes agreed prices and procurement terms for selected products over a defined period, usually one year.",
    },
    {
      question: "How does an annual rate contract work?",
      answer:
        "The buyer shares recurring procurement needs and estimated quantities. Based on these details, suitable suppliers are identified, and the parties agree on product specifications, pricing, contract period, delivery terms and purchase procedures.",
    },
    {
      question: "Which products are suitable for an ARC?",
      answer:
        "An ARC may cover products purchased regularly, such as electronic components, electrical supplies, tools, MRO consumables, production materials and selected test and measurement equipment. The coverage is determined by the buyer’s requirements and the supplier’s ability to fulfil them.",
    },
    {
      question: "Are prices fixed throughout the ARC period?",
      answer:
        "Not always. Price stability depends on the agreed contract terms, including the validity period, permitted revisions and applicable exceptions.",
    },
    {
      question: "Does an ARC ensure continuous product availability?",
      answer:
        "No. Supply continuity depends on supplier capacity, stock levels, lead times, agreed quantities and the commitments specified in the contract.",
    },
    {
      question: "Can an ARC include products from multiple brands?",
      answer:
        "An ARC can cover products across multiple brands, subject to supplier arrangements and agreed terms. Each product is reviewed for specification compliance, sourcing availability and commercial suitability.",
    },
    {
      question: "How can we request an annual rate contract?",
      answer:
        "Share your product requirements, specifications, projected annual quantities and ordering frequency through our enquiry form. Our team will review the details and explore suitable sourcing options and contract arrangements.",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE ARC ENQUIRY FORM
          ========================================================================= */}
      <section 
        id="arc-hero"
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
            <span className="text-gray-400">Procurement Solutions</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">Annual Rate Contracts</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
            
            {/* Left Column: Heading, Value Prop, Auto-Increment Stats */}
            <div className="lg:col-span-7 flex flex-col items-start pt-2">
              
              {/* Eyebrow Pill with Pulsing Dot */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50/90 border border-red-200/80 text-red-700 text-xs sm:text-[13px] font-semibold tracking-wide mb-6 shadow-2xs hover:scale-[1.02] transition-transform animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#AF0202]"></span>
                </span>
                <span>ANNUAL RATE CONTRACT (ARC) FOR INDIRECT MATERIALS</span>
              </div>

              {/* Main H1 with Gradient Accent */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Annual Rate Contract (ARC) for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Indirect Materials
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                Simplify recurring purchases with agreed commercial terms and a structured procurement process.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Explore ARC</span>
                </button>

                <a
                  href="#arc-categories"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>Covered Categories</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 12 Months Contract Period */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={12} suffix=" Months" duration={1800} />
                    ) : (
                      <span>12 Months</span>
                    )}
                    <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 hidden sm:inline group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Agreed Terms Validity
                  </p>
                </div>

                {/* Stat 2: 100% Landed GST Invoicing */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={100} suffix="%" duration={1800} />
                    ) : (
                      <span>100%</span>
                    )}
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Landed GST Compliance
                  </p>
                </div>

                {/* Stat 3: 8+ Industrial Categories */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={8} suffix="+" duration={1500} />
                    ) : (
                      <span>8+</span>
                    )}
                    <Boxes className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 hidden sm:inline group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Supported Pillars
                  </p>
                </div>
              </div>

              {/* Compliance & SLA Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5 text-xs text-gray-500">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Pre-Agreed Commercials
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Scheduled Call-Offs
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  Buffer Stock Availability
                </span>
              </div>

            </div>

            {/* Right Column: "Request an ARC" Interactive Form */}
            <div ref={formRef} className="lg:col-span-5 w-full">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_24px_60px_rgba(175,2,2,0.08)]">
                
                {/* Form Header Accent Bar with Shimmer */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-[#AF0202] to-black" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Annual Rate Contract Enquiry
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Submit projected requirements to initiate contract discussions.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center shrink-0 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
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
                        placeholder="e.g. Bharat Electronics Ltd"
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
                        placeholder="procurement@company.com"
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

                  {/* Product Categories Required (Multi-Select Chips) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-gray-700">
                        Product Categories Required <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-gray-400">Select all that apply</span>
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

                  {/* Estimated Annual Requirement */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Estimated Annual Requirement
                    </label>
                    <Select
                      value={estimatedAnnualRequirement}
                      onValueChange={setEstimatedAnnualRequirement}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select annual requirement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Under ₹10 Lakhs">Under ₹10 Lakhs / Year</SelectItem>
                        <SelectItem value="₹10 Lakhs – ₹50 Lakhs">₹10 Lakhs – ₹50 Lakhs / Year</SelectItem>
                        <SelectItem value="₹50 Lakhs – ₹2 Crore">₹50 Lakhs – ₹2 Crore / Year</SelectItem>
                        <SelectItem value="₹2 Crore+">₹2 Crore+ / Year (Enterprise ARC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Additional Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={additionalRequirements}
                      onChange={(e) => setAdditionalRequirements(e.target.value)}
                      placeholder="Specify preferred brands, delivery locations, call-off batch frequency, or product lists..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
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
                          <span>Submitting ARC Request...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Submit Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Guaranteed commercial confidentiality & technical scrubbing.
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: BENEFITS
          ========================================================================= */}
      <section 
        ref={benefitsRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Key Advantages" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Benefits of an Annual Rate Contract
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Lock in fixed commercial terms and streamline regular replenishments across multiple engineering categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {arcBenefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 100}ms`,
                  }}
                  className={`benefit-card rounded-3xl p-7 sm:p-8 bg-[#fbfcfd] border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer group ${
                    benefitsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                  }`}
                >
                  <div>
                    <div className="benefit-icon w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#AF0202] mb-6 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 mb-3 group-hover:bg-red-950 group-hover:text-red-300 transition-colors">
                      {b.highlight}
                    </span>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors leading-snug mb-3">
                      {b.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: ANNUAL CONTRACTS FOR RECURRING INDUSTRIAL REQUIREMENTS
          ========================================================================= */}
      <section 
        id="arc-categories"
        ref={pillarsRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Multi-Category Scope" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Annual Contracts for Recurring Industrial Requirements
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Consolidate your recurring bill-of-materials and shop-floor consumables under one structured master agreement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {arcCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-6 sm:p-7 bg-white border border-gray-200/80 hover:border-red-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(175,2,2,0.08)] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 hover:scale-[1.01] ${
                    pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                    {cat.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200/80 text-[11px] font-medium text-gray-600 group-hover:border-red-200 group-hover:text-gray-900 group-hover:bg-red-50/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: DESIGNED FOR BUSINESSES WITH RECURRING PROCUREMENT NEEDS
          ========================================================================= */}
      <section 
        ref={designedRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            designedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Target Organizations" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Designed for Businesses with Recurring Procurement Needs
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Tailored for manufacturing leaders, test labs, and strategic purchasing teams across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recurringSectors.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-6 sm:p-7 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-lg transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 ${
                    designedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs mb-4 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                      {sector.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {sector.desc}
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
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="ARC Queries" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find answers regarding rate fixations, multi-brand inclusions, ordering procedures, and delivery schedules.
            </p>
          </div>

          <div className="space-y-3.5">
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
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
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
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-[36px] bg-gradient-to-br from-[#111315] via-[#1a1d21] to-black p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden shadow-2xl">
            
            {/* Background Ambient Aura */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-200 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Structured Commercial Terms for 12 Months</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Make Recurring purchases Easier.
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                Turn repeat purchasing requirements into a more structured procurement process.
              </p>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-8">
                Connect with eFocus Industrial to discuss your annual product requirements and explore suitable rate contract arrangements.
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#0d0f11] py-3.5 px-8 font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              >
                <NexChipIcon className="w-8 h-8" />
                <span>Start Your ARC Enquiry</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="ARC Enquiry Received!"
        message="Thank you for sharing your projected annual procurement requirements. Our rate contract team will review your categories and contact you to structure a tailored proposal within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
