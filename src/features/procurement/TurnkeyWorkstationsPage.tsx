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
  Gauge, 
  Zap, 
  Boxes, 
  Sparkles, 
  HelpCircle, 
  FlaskConical, 
  Hammer, 
  Search, 
  Upload, 
  Paperclip, 
  X, 
  Layers, 
  Settings, 
  Compass
} from "lucide-react";
import { FormSubmissionService } from "@/services/formSubmission.service";
import SuccessModal from "@/components/ui/SuccessModal";

export default function TurnkeyWorkstationsPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Turnkey Workstation Equipment Sourcing | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "From testing instruments and power supplies to ESD accessories and workstation essentials, eFocus helps businesses source equipment based on application needs and technical specifications."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "From testing instruments and power supplies to ESD accessories and workstation essentials, eFocus helps businesses source equipment based on application needs and technical specifications."
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
  const [workstationApplication, setWorkstationApplication] = useState("Electronics Testing & Debug");
  const [equipmentRequirements, setEquipmentRequirements] = useState("");
  const [additionalSpecifications, setAdditionalSpecifications] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Section Observer Triggers
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const [whyVisible, setWhyVisible] = useState(false);
  const whyRef = useRef<HTMLElement>(null);

  const [equipmentVisible, setEquipmentVisible] = useState(false);
  const equipmentRef = useRef<HTMLElement>(null);

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
      handleObserve(whyRef.current, setWhyVisible),
      handleObserve(equipmentRef.current, setEquipmentVisible),
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

    if (!fullName.trim() || !companyName.trim() || !email.trim() || !equipmentRequirements.trim()) {
      alert("Please fill in all required fields (Full Name, Company Name, Business Email, and Equipment Requirements).");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Turnkey Workstation Equipment Inquiry",
        form_type: "turnkey_workstations",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        workstation_application: workstationApplication,
        message: `Workstation Application: ${workstationApplication}\n\nEquipment Requirements:\n${equipmentRequirements.trim()}\n\nAdditional Specifications:\n${additionalSpecifications.trim() || "None specified"}`,
        file: file,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setWorkstationApplication("Electronics Testing & Debug");
      setEquipmentRequirements("");
      setAdditionalSpecifications("");
      removeFile();
    } catch (err: any) {
      console.error("Turnkey workstation submission failed:", err);
      alert(err.message || "Failed to submit workstation enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2 Data: Why Choose eFocus? (4 Differentiators)
  const whyChoosePillars = [
    {
      title: "Application-Based Equipment Selection",
      desc: "Choose equipment that aligns with the workstation’s intended use and specific technical requirements.",
      icon: Compass,
      highlight: "Application Matched",
    },
    {
      title: "Technical Requirement Assessment",
      desc: "Review key specifications and performance requirements to identify appropriate equipment.",
      icon: Search,
      highlight: "Spec Verification",
    },
    {
      title: "Equipment & Accessory Integration",
      desc: "Check interface requirements, electrical compatibility and necessary accessories to support proper equipment integration.",
      icon: Settings,
      highlight: "Compatibility Checked",
    },
    {
      title: "Flexible Equipment Lists",
      desc: "Start with a complete equipment list or identify requirements in stages.",
      icon: Layers,
      highlight: "Modular Rollout",
    },
  ];

  // Section 3 Data: Build Your Workstation Around the Right Equipment (6 Core Categories)
  const workstationEquipmentCategories = [
    {
      title: "Test & Measurement Instruments",
      desc: "Oscilloscopes, digital multimeters and application-specific testing equipment.",
      icon: Gauge,
      examples: ["Digital Storage Oscilloscopes", "6.5 Digit Precision DMMs", "RF Spectrum Analyzers"],
    },
    {
      title: "Power Solutions",
      desc: "Power supply units and compatible electrical accessories.",
      icon: Zap,
      examples: ["Programmable Benchtop DC Sources", "Isolated Variacs", "Surge-Protected Power Strips"],
    },
    {
      title: "ESD Protection Products",
      desc: "Anti-static mats, grounding accessories and other solutions designed to control electrostatic discharge.",
      icon: ShieldCheck,
      examples: ["Dissipative Tabletop & Floor Mats", "Constant Ground Monitors", "Conductive Wrist Straps"],
    },
    {
      title: "Assembly Tools",
      desc: "Soldering equipment, hand tools and electronics repair accessories.",
      icon: Hammer,
      examples: ["Micro-Soldering Stations", "ESD-Safe Torque Drivers", "Thermal Desoldering Tweezers"],
    },
    {
      title: "Laboratory Essentials",
      desc: "Selected instruments, accessories and supporting equipment.",
      icon: FlaskConical,
      examples: ["Magnifying Inspection Lamps", "Precision Calibration Weights", "Chemical Fume Extractors"],
    },
    {
      title: "Workstation Accessories",
      desc: "Equipment carts, storage systems and supplementary items to support an organised workstation setup.",
      icon: Boxes,
      examples: ["Modular Overhead Shelves", "Component Bin Rails", "Mobile Instrument Trolleys"],
    },
  ];

  // Section 4 Data: FAQs
  const faqs = [
    {
      question: "What types of workstations can you support?",
      answer:
        "We can help identify equipment requirements for electronics testing, assembly, repair, engineering labs and specific industrial inspection tasks.",
    },
    {
      question: "Can I source equipment for my existing workstation layout?",
      answer:
        "Yes. Provide your workstation layout, current equipment details or technical specifications so we can explore appropriate sourcing options.",
    },
    {
      question: "Can I procure equipment without workstation furniture?",
      answer:
        "Yes. Equipment-only sourcing is possible, depending on product availability and the feasibility of fulfilling your requirements.",
    },
    {
      question: "Does turnkey workstation sourcing include installation?",
      answer:
        "Installation, integration and workstation setup are not included.",
    },
  ];

  // Workstation Application Options for Quick Selection
  const applicationPresets = [
    "Electronics Testing & Debug",
    "SMT / PCB Assembly",
    "R&D & Engineering Lab",
    "Device Repair & Rework",
    "Industrial Inspection & QA",
    "Cleanroom / ESD Facility",
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE WORKSTATION ENQUIRY FORM
          ========================================================================= */}
      <section 
        id="workstation-hero"
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
            <span className="text-red-600 font-semibold">Turnkey Workstations</span>
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
                <span>WORKSTATION EQUIPMENT SOURCING FOR INDUSTRIAL & LAB APPLICATIONS</span>
              </div>

              {/* Main H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Turnkey Workstation{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Equipment Sourcing
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                From testing instruments and power supplies to ESD accessories and workstation essentials, eFocus helps businesses source equipment based on application needs and technical specifications.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Discuss Your Workstation Requirements</span>
                </button>

                <a
                  href="#workstation-equipment"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>Explore Equipment Categories</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 6+ Domains */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={6} suffix="+" duration={1600} />
                    ) : (
                      <span>6+</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Equipment Domains</span>
                    <Boxes className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Instruments, power, ESD & tools
                  </p>
                </div>

                {/* Stat 2: 100% Application Match */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={100} suffix="%" duration={1800} />
                    ) : (
                      <span>100%</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Application Matched</span>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Fit for testing, assembly or lab
                  </p>
                </div>

                {/* Stat 3: Complete or Staged */}
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
                    Bundled equipment & accessories
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ESD-Safe & Certified</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Equipment-Only Sourcing Available</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>NABL Calibration Support</span>
                </span>
              </div>

            </div>

            {/* Right Column: Interactive Form "Plan Your Workstation Setup" */}
            <div className="lg:col-span-5" ref={formRef}>
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
                
                {/* Form Header Accent Bar with Shimmer */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-[#AF0202] to-black" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Plan Your Workstation Setup
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Specify equipment requirements or layout considerations.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center shrink-0 shadow-2xs">
                    <Hammer className="w-5 h-5" />
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
                        placeholder="e.g. Vikram Joshi"
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
                        placeholder="e.g. Zenith Instruments"
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
                        placeholder="workstations@company.com"
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

                  {/* Workstation Application * (Quick Chips Selection) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Workstation Application <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {applicationPresets.map((app) => {
                        const isSelected = workstationApplication === app;
                        return (
                          <button
                            key={app}
                            type="button"
                            onClick={() => setWorkstationApplication(app)}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-medium text-left border transition-all cursor-pointer truncate ${
                              isSelected
                                ? "bg-red-50 border-red-500 text-red-700 font-semibold shadow-2xs"
                                : "bg-gray-50/60 border-gray-200 text-gray-600 hover:bg-gray-100/70"
                            }`}
                          >
                            <span className="mr-1">{isSelected ? "●" : "○"}</span>
                            {app}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Equipment Requirements * */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Equipment Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={equipmentRequirements}
                      onChange={(e) => setEquipmentRequirements(e.target.value)}
                      placeholder="List required instruments (oscilloscopes, power supplies, multimeters), soldering stations, ESD mats, or accessories..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Additional Specifications */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Additional Specifications
                    </label>
                    <textarea
                      rows={2}
                      value={additionalSpecifications}
                      onChange={(e) => setAdditionalSpecifications(e.target.value)}
                      placeholder="Specify existing bench dimensions, power drop ratings (230V/110V), ESD surface resistivity targets, or brand preferences..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Optional Layout / Equipment List Attachment */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Attach Layout or Equipment List <span className="text-gray-400 font-normal">(Optional)</span>
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
                          Upload drawing, equipment spreadsheet, or layout (.pdf, .xlsx, .png)
                        </span>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".xlsx,.xls,.csv,.pdf,.png,.jpg,.jpeg,.zip"
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
                          <span>Submitting Workstation Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Submit Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Technical scrubbing & compatibility verified before quoting.
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: WHY CHOOSE eFOCUS ? (4 PILLARS)
          ========================================================================= */}
      <section 
        ref={whyRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Key Differentiators" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Why Choose eFocus ?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We eliminate equipment mismatches through rigorous application matching, technical parameter checks, and accessory compatibility verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoosePillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 90}ms`,
                  }}
                  className={`benefit-card rounded-3xl p-7 sm:p-8 bg-[#fbfcfd] border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer group ${
                    whyVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                  }`}
                >
                  <div>
                    <div className="benefit-icon w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#AF0202] mb-6 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 mb-3 group-hover:bg-red-950 group-hover:text-red-300 transition-colors">
                      {p.highlight}
                    </span>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors leading-snug mb-3">
                      {p.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 group-hover:border-zinc-800 flex items-center text-xs font-semibold text-[#AF0202] group-hover:text-red-400">
                    <span>Explore Benefit</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: BUILD YOUR WORKSTATION AROUND THE RIGHT EQUIPMENT (6 DOMAINS)
          ========================================================================= */}
      <section 
        id="workstation-equipment"
        ref={equipmentRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            equipmentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Equipment Ecosystem" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Build Your Workstation Around the Right Equipment.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Curate the ideal configuration for engineering verification, electronics assembly, rework, or plant inspection tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {workstationEquipmentCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-6 sm:p-7 bg-white border border-gray-200/80 hover:border-red-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(175,2,2,0.08)] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 hover:scale-[1.01] ${
                    equipmentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                    {cat.examples.map((item, tIdx) => (
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
              <span>Enquire About Equipment</span>
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Common Inquiries" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find answers regarding workstation support, existing layout outfitting, equipment-only procurement, and setup boundaries.
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
          SECTION 5: FINAL CTA BANNER
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
                <span>Engineered Benchtop & Station Solutions</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Planning a New Workstation?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Tell us about your application and equipment requirements. We will help you explore suitable sourcing options.
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#0d0f11] py-3.5 px-8 font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              >
                <NexChipIcon className="w-8 h-8" />
                <span>Discuss Your Workstation Requirements</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Workstation Enquiry Received!"
        message="Thank you for sharing your workstation equipment requirements. Our technical team will review your application specifications and contact you with a customized equipment list and proposal within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
