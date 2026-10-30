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
  Repeat, 
  Factory, 
  Sparkles,
  HelpCircle,
  FileCheck,
  TrendingDown,
  Users2,
  FileText,
  DollarSign,
  Compass,
  PackageCheck,
  Plane,
  Radio,
  Microchip,
  Cable,
  Tag,
  Monitor
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

export default function VendorConsolidationPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Industrial Vendor Consolidation Services | eFocus Industrial Solutions";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Streamline multi-supplier procurement with eFocus Industrial. Consolidate hardware, tooling, electronics, and MRO under a single PO and GST invoice."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "Streamline multi-supplier procurement with eFocus Industrial. Consolidate hardware, tooling, electronics, and MRO under a single PO and GST invoice."
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
  const [industry, setIndustry] = useState("Electronics Manufacturing & EMS");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [supplierCount, setSupplierCount] = useState("6–15 Suppliers");
  const [procurementChallenges, setProcurementChallenges] = useState("Multiple POs & Invoicing Admin");
  const [additionalRequirements, setAdditionalRequirements] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Section Observer Triggers
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const [pillarsVisible, setPillarsVisible] = useState(false);
  const pillarsRef = useRef<HTMLElement>(null);

  const [whyVisible, setWhyVisible] = useState(false);
  const whyRef = useRef<HTMLElement>(null);

  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const categoriesRef = useRef<HTMLElement>(null);

  const [industriesVisible, setIndustriesVisible] = useState(false);
  const industriesRef = useRef<HTMLElement>(null);

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
      handleObserve(pillarsRef.current, setPillarsVisible),
      handleObserve(whyRef.current, setWhyVisible),
      handleObserve(categoriesRef.current, setCategoriesVisible),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !companyName.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all required fields (Full Name, Company Name, Business Email, and Phone Number).");
      return;
    }

    if (selectedCategories.length === 0) {
      alert("Please select at least one product category to consolidate.");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Vendor Consolidation Inquiry",
        form_type: "vendor_consolidation",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        industry: industry,
        product_categories: selectedCategories.join(", "),
        current_suppliers: supplierCount,
        procurement_challenges: procurementChallenges,
        message: additionalRequirements.trim() || `Consolidating: ${selectedCategories.join(", ")}. Suppliers: ${supplierCount}. Challenge: ${procurementChallenges}`,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setIndustry("Electronics Manufacturing & EMS");
      setSelectedCategories([]);
      setSupplierCount("6–15 Suppliers");
      setProcurementChallenges("Multiple POs & Invoicing Admin");
      setAdditionalRequirements("");
    } catch (err: any) {
      console.error("Vendor consolidation submission failed:", err);
      alert(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2 Data: 6 Core Operational Pillars
  const operationalPillars = [
    {
      title: "Reduce Administrative Workload",
      desc: "Spend less time managing separate supplier communications, quotations and routine follow-ups.",
      icon: Clock,
      stat: "80%",
      statLabel: "Less Paperwork",
    },
    {
      title: "Simplified Supplier Management",
      desc: "Bring multiple supplier relationships together to streamline sourcing and strengthen supply chain coordination.",
      icon: Users2,
      stat: "1 PO",
      statLabel: "Single Account Handle",
    },
    {
      title: "Improved Supplier Collaboration",
      desc: "Develop closer supplier partnerships and support better quotation negotiations through consolidated purchasing requirements.",
      icon: Repeat,
      stat: "Direct",
      statLabel: "Factory Alignment",
    },
    {
      title: "Cost Optimisation & Efficiency",
      desc: "Reduce avoidable coordination overhead and identify potential purchasing and logistics savings.",
      icon: DollarSign,
      stat: "Zero",
      statLabel: "Hidden Freight Fees",
    },
    {
      title: "Vendor Selection & Reliability",
      desc: "Evaluate suitable suppliers against product specifications, quality requirements and reliability criteria to support more consistent sourcing.",
      icon: ShieldCheck,
      stat: "100%",
      statLabel: "Pre-Vetted Brands",
    },
    {
      title: "Coordinated Order Fulfilment",
      desc: "Manage order updates and delivery follow-ups through one point of contact, ensuring better visibility and coordination across multiple sourcing requirements.",
      icon: PackageCheck,
      stat: "Synchronized",
      statLabel: "Line Deliveries",
    },
  ];

  // Section 3 Data: Why eFocus?
  const whyEfocusPoints = [
    {
      title: "Wide Product Coverage",
      desc: "Source across multiple industrial and technical categories without onboarding dozens of niche vendors.",
      icon: Boxes,
      highlight: "8 Core Sectors",
    },
    {
      title: "Application-Aware Sourcing",
      desc: "Align product selection with the intended application, electrical tolerances, and technical specifications.",
      icon: Compass,
      highlight: "In-House Engineering",
    },
    {
      title: "Adaptable Sourcing Support",
      desc: "Manage BOM-driven, project-specific, and recurring procurement requirements with utmost flexibility.",
      icon: Repeat,
      highlight: "BOM, ARC & Turnkey",
    },
    {
      title: "Technical Support Access",
      desc: "Connect relevant sourcing requirements with available engineering services, calibration, and commissioning.",
      icon: Wrench,
      highlight: "NABL & ISO Traceable",
    },
    {
      title: "One Point of Contact",
      desc: "Simplify coordination across diverse product requirements with a dedicated key account manager.",
      icon: FileCheck,
      highlight: "Single GST Profile",
    },
  ];

  // Section 4 Data: Product Categories
  const productCategories = [
    { name: "SMT Assembly & Rework", icon: Cpu, desc: "Reflow, rework stations, lead-free solder paste & PCB handling", href: "/products?category=smt-rework-assembly" },
    { name: "Cables & Connectivity", icon: Cable, desc: "Industrial wire harnesses, RF jumpers & high-speed connectors", href: "/products?category=cables-connectivity" },
    { name: "Power & Electrical", icon: Zap, desc: "DIN-rail power supplies, DC-DC modules, breakers & relays", href: "/products?category=power-electrical" },
    { name: "Testing & Measurement", icon: Gauge, desc: "Oscilloscopes, spectrum analyzers, multimeters & probes", href: "/products?category=testing-measurement" },
    { name: "ESD & RF Products", icon: Radio, desc: "Cleanroom static protection, shielding & RF test enclosures", href: "/products?category=esd-rf" },
    { name: "Tools & MRO", icon: Wrench, desc: "Precision torque drivers, crimpers & maintenance consumables", href: "/products?category=tools-mro" },
    { name: "IT Hardware & Workstations", icon: Monitor, desc: "Ergonomic ESD benches, servers & rugged edge computing", href: "/products?category=it-hardware-workstation" },
    { name: "Labelling & Identification", icon: Tag, desc: "High-temp polyimide PCB labels & industrial barcode printers", href: "/products?category=labelling-identification" },
  ];

  // Section 5 Data: Industries We Support
  const industries = [
    { name: "Electronics Manufacturing & EMS", icon: Cpu, desc: "Batch assembly lines, component kits & automated surface mount support." },
    { name: "Automotive & EV Assembly", icon: Car, desc: "AEC-Q certified parts, high-voltage testing & automotive wire harnesses." },
    { name: "Aerospace & Defence", icon: Plane, desc: "MIL-spec reliability, radar testing tools & ruggedized industrial enclosures." },
    { name: "Semiconductor & R&D Labs", icon: Microchip, desc: "Cleanroom ESD control, wafer handling & precision benchtop instruments." },
    { name: "Telecom & RF", icon: Radio, desc: "5G base station testing, antennas, microwave cables & shielding." },
    { name: "Power, Energy & Industrial Automation", icon: Factory, desc: "PLC cabling, industrial robotics, switchgear & grid monitoring tools." },
  ];

  // Section 6 Data: FAQs
  const faqs = [
    {
      question: "What is vendor consolidation?",
      answer:
        "Vendor consolidation involves combining purchasing requirements through a smaller network of suppliers to simplify sourcing coordination and supplier management.",
    },
    {
      question: "How does vendor consolidation simplify purchasing?",
      answer:
        "It reduces the effort involved in managing multiple suppliers by streamlining quotation handling, order coordination and delivery tracking.",
    },
    {
      question: "Can I consolidate products from different categories?",
      answer:
        "Yes. You can submit a multi-category product list covering relevant industrial and technical products for sourcing review.",
    },
    {
      question: "Can I submit a BOM for vendor consolidation?",
      answer:
        "Yes. Share your BOM or product list so the requirements can be reviewed and suitable sourcing options identified.",
    },
    {
      question: "Does vendor consolidation guarantee cost savings?",
      answer:
        "Not necessarily. The financial benefits depend on factors such as purchase quantities, product availability, supplier pricing, transportation costs and agreed terms. A consolidated supplier network can help minimize administrative tasks and make purchasing activities easier to manage.",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE SIMPLIFY YOUR SOURCING FORM
          ========================================================================= */}
      <section 
        id="consolidation-hero"
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
            <span className="text-red-600 font-semibold">Vendor Consolidation</span>
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
                <span>VENDOR CONSOLIDATION FOR INDUSTRIAL BUSINESSES</span>
              </div>

              {/* Main H1 with Gradient Accent */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Multiple Suppliers.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  One Streamlined Sourcing
                </span>{" "}
                Partner.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                Managing different suppliers for different products creates unnecessary coordination. eFocus Indus brings diverse industrial product requirements together through one point of contact, helping your team manage sourcing with greater simplicity and control.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Consolidate Your Requirements</span>
                </button>

                <Link
                  to="/procurement-solutions/bom-procurement"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>Submit Your BOM</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 80% Reduction in PO Admin */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={80} suffix="%" duration={1800} />
                    ) : (
                      <span>80%</span>
                    )}
                    <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    PO Admin Reduction
                  </p>
                </div>

                {/* Stat 2: 100+ Authorized Brands */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={100} suffix="+" duration={1800} />
                    ) : (
                      <span>100+</span>
                    )}
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Industrial Brands
                  </p>
                </div>

                {/* Stat 3: 1 Single Point of Contact */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={1} suffix=" PO" duration={1200} />
                    ) : (
                      <span>1 PO</span>
                    )}
                    <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 hidden sm:inline group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Unified GST Invoicing
                  </p>
                </div>
              </div>

              {/* Compliance & SLA Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5 text-xs text-gray-500">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Landed GST Profile
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Consolidated Dispatch
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  SLA Guaranteed Terms
                </span>
              </div>

            </div>

            {/* Right Column: "Simplify Your Sourcing" Interactive Form */}
            <div ref={formRef} className="lg:col-span-5 w-full">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_24px_60px_rgba(175,2,2,0.08)]">
                
                {/* Form Header Accent Bar with Shimmer */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-[#AF0202] to-black" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Simplify Your Sourcing
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Tell us about your multi-supplier setup for a consolidation plan.
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
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Industry Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics Manufacturing & EMS">Electronics Manufacturing & EMS</SelectItem>
                        <SelectItem value="Automotive & EV Assembly">Automotive & EV Assembly</SelectItem>
                        <SelectItem value="Aerospace & Defence">Aerospace & Defence</SelectItem>
                        <SelectItem value="Semiconductor & R&D Labs">Semiconductor & R&D Labs</SelectItem>
                        <SelectItem value="Telecom & RF">Telecom & RF</SelectItem>
                        <SelectItem value="Power, Energy & Industrial Automation">Power, Energy & Industrial Automation</SelectItem>
                        <SelectItem value="General Industrial & Heavy Engineering">General Industrial & Heavy Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Product Categories to Consolidate (Multi-Select Chips) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-gray-700">
                        Product Categories to Consolidate <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-gray-400">Select all that apply</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        "SMT Assembly & Rework",
                        "Cables & Connectivity",
                        "Power & Electrical",
                        "Testing & Measurement",
                        "ESD & RF Products",
                        "Tools & MRO",
                        "IT Hardware & Workstations",
                        "Labelling & Identification",
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

                  {/* Number of Current Suppliers & Key Challenges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Number of Current Suppliers
                      </label>
                      <Select value={supplierCount} onValueChange={setSupplierCount}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select supplier count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1–5 Suppliers">1–5 Suppliers</SelectItem>
                          <SelectItem value="6–15 Suppliers">6–15 Suppliers</SelectItem>
                          <SelectItem value="16–50 Suppliers">16–50 Suppliers</SelectItem>
                          <SelectItem value="50+ Suppliers">50+ Suppliers (High Overhead)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Key Procurement Challenges
                      </label>
                      <Select value={procurementChallenges} onValueChange={setProcurementChallenges}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select challenge" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Multiple POs & Invoicing Admin">Multiple POs & Invoicing Admin</SelectItem>
                          <SelectItem value="Inconsistent Lead Times & Delays">Inconsistent Lead Times & Delays</SelectItem>
                          <SelectItem value="Customs & Currency Fluctuations">Customs & Currency Fluctuations</SelectItem>
                          <SelectItem value="MOQ & High Minimum Order Constraints">MOQ & Minimum Order Constraints</SelectItem>
                          <SelectItem value="Part Obsolescence (EOL) & Alternates">Part Obsolescence (EOL) & Alternates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                      placeholder="Share current monthly spend, target timeline, or specific supplier consolidation goals..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#111315] hover:bg-black text-white text-sm font-bold shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Preparing Consolidation Plan...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Discuss Consolidation</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 No commitment. Direct consultation with procurement specialists.
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: LESS TIME MANAGING VENDORS. MORE TIME MOVING BUSINESS FORWARD.
          ========================================================================= */}
      <section 
        ref={pillarsRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Operational Efficiency" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Less Time Managing Vendors. More Time Moving Business Forward.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Consolidating suppliers eliminates coordination drag, slashes PO processing costs, and strengthens delivery predictability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operationalPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-6 sm:p-7 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(175,2,2,0.08)] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 hover:scale-[1.01] ${
                    pillarsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#AF0202] group-hover:border-[#AF0202] flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-110">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold text-[#AF0202] bg-red-50 border border-red-100 px-2.5 py-1 rounded-full font-mono">
                        {pillar.stat}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors leading-snug mb-2.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                    <span>{pillar.statLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: WHY EFOCUS?
          ========================================================================= */}
      <section 
        ref={whyRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Strategic Advantages" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Why eFocus?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We operate not as a transactional broker, but as an engineered extension of your procurement and plant operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {whyEfocusPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 90}ms`,
                  }}
                  className={`benefit-card rounded-3xl p-6 bg-white border border-gray-200/90 shadow-2xs hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer group ${
                    whyVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                  }`}
                >
                  <div>
                    <div className="benefit-icon w-11 h-11 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center mb-5 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 mb-2 group-hover:bg-red-950 group-hover:text-red-300 transition-colors">
                      {point.highlight}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-white transition-colors leading-snug mb-2.5">
                      {point.title}
                    </h3>

                    <p className="text-xs text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: PRODUCT CATEGORIES
          ========================================================================= */}
      <section 
        ref={categoriesRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Multi-Category Catalog" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Product Categories
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Consolidate hardware, tooling, electronics, power units, and plant safety gear across all 8 essential manufacturing domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {productCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  to={cat.href}
                  style={{
                    transitionDelay: `${idx * 60}ms`,
                  }}
                  className={`rounded-3xl p-6 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 ${
                    categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs mb-4 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                      {cat.name}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-red-600">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Share Your Product List Strip */}
          <div className="text-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
            >
              <NexChipIcon className="w-8 h-8" />
              <span>Share Your Product List</span>
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: INDUSTRIES WE SUPPORT
          ========================================================================= */}
      <section 
        ref={industriesRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            industriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Target Sectors" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Industries We Support
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Consolidated procurement tailored to meet strict domain standards, traceabilities, and audit compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => {
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
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center mb-4 shadow-2xs group-hover:scale-110 group-hover:bg-[#AF0202] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                      {ind.name}
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
            <NexBadge label="Vendor Consolidation FAQ" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Understand how vendor consolidation simplifies multi-category purchasing and reduces operational friction.
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
          SECTION 7: FINAL CTA
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
                <span>Single PO Invoicing for 100+ Hardware Brands</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Fewer Vendor Hassles. Better Control Over Sourcing.
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Bring your industrial product requirements together with eFocus Indus and make multi-vendor coordination easier.
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#0d0f11] py-3.5 px-8 font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              >
                <NexChipIcon className="w-8 h-8" />
                <span>Start Your Vendor Consolidation</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Consolidation Request Received!"
        message="Thank you for sharing your multi-supplier requirements. Our procurement consolidation team will review your categories and prepare a tailored single-vendor strategy within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
