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
  Sparkles, 
  HelpCircle, 
  FileText, 
  Upload, 
  Paperclip, 
  X, 
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
import { FormSubmissionService } from "@/services/formSubmission.service";
import SuccessModal from "@/components/ui/SuccessModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ElectronicsEmsPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Electronics Manufacturing & EMS Equipment Sourcing | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Find SMT assembly supplies, ESD protection, electronic test equipment, and production tools for electronics manufacturers and EMS providers."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "Find SMT assembly supplies, ESD protection, electronic test equipment, and production tools for electronics manufacturers and EMS providers."
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
  const [productionFocus, setProductionFocus] = useState("SMT/SMD Line & Rework");
  const [equipmentRequirements, setEquipmentRequirements] = useState("");
  const [timeline, setTimeline] = useState("1–3 Months");
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Section Observer Triggers
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const categoriesRef = useRef<HTMLElement>(null);

  const [appsVisible, setAppsVisible] = useState(false);
  const appsRef = useRef<HTMLElement>(null);

  const [whyVisible, setWhyVisible] = useState(false);
  const whyRef = useRef<HTMLElement>(null);

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
      handleObserve(categoriesRef.current, setCategoriesVisible),
      handleObserve(appsRef.current, setAppsVisible),
      handleObserve(whyRef.current, setWhyVisible),
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
      alert("Please fill in all required fields (Full Name, Company Name, Business Email, and Production Requirements).");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Electronics & EMS Production Sourcing Enquiry",
        form_type: "electronics_ems_sourcing",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        production_focus: productionFocus,
        delivery_timeline: timeline,
        message: `Production Focus: ${productionFocus}\nExpected Timeline: ${timeline}\n\nRequirements:\n${equipmentRequirements.trim()}`,
        file: file,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setProductionFocus("SMT/SMD Line & Rework");
      setEquipmentRequirements("");
      setTimeline("1–3 Months");
      removeFile();
    } catch (err: any) {
      console.error("Electronics & EMS submission failed:", err);
      alert(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2 Data: 12 Product Categories
  const productCategories = [
    {
      title: "SMT Assembly & Rework",
      desc: "Lead-free solder wire, stencil wipers, flux pens, desoldering braid, and micro-hot-air stations.",
      icon: Cpu,
      tags: ["Soldering Stations", "Rework Nozzles", "Solder Paste"],
    },
    {
      title: "PCB Inspection & Microscopy",
      desc: "Digital 4K video inspection microscopes, ring lights, polarizing filters, and optical measuring systems.",
      icon: Microscope,
      tags: ["Video Microscopes", "Magnifying Lamps", "Comparative QA"],
    },
    {
      title: "Test & Measurement Instruments",
      desc: "Digital storage oscilloscopes, mixed-signal analyzers, 6.5-digit bench multimeters, and arbitrary waveform generators.",
      icon: Gauge,
      tags: ["Oscilloscopes", "Benchtop DMMs", "LCR Meters"],
    },
    {
      title: "Power Supplies & Electronic Loads",
      desc: "Programmable multi-channel DC sources, precision linear supplies, and DC electronic loads for stress testing.",
      icon: Zap,
      tags: ["Programmable DC", "Electronic Loads", "Isolated Sources"],
    },
    {
      title: "ESD Protection Products",
      desc: "Conductive floor mats, static-dissipative tabletop runners, grounding wrist straps, and constant continuous monitors.",
      icon: ShieldCheck,
      tags: ["Anti-Static Mats", "Grounding Monitors", "ESD Packaging"],
    },
    {
      title: "Cables, Connectors & Adapters",
      desc: "High-frequency RF coaxial test cables, BNC/SMA interconnects, ribbon harnesses, and industrial modular jack adapters.",
      icon: Cable,
      tags: ["RF Cables", "BNC/SMA Adapters", "Custom Harnesses"],
    },
    {
      title: "PCB Test & Programming",
      desc: "Bed-of-nails pogo pin fixtures, in-circuit programmers (JTAG/SWD), boundary scan tools, and flash gang programmers.",
      icon: Binary,
      tags: ["Pogo Pin Fixtures", "In-Circuit Debuggers", "Flash Programmers"],
    },
    {
      title: "Production Tools & Consumables",
      desc: "Calibrated ESD torque screwdrivers, precision side cutters, anti-magnetic tweezers, and high-temp Kapton tapes.",
      icon: Wrench,
      tags: ["Torque Drivers", "Precision Cutters", "Kapton Polyimide"],
    },
    {
      title: "Automated Test Equipment (ATE)",
      desc: "Rack-mount PXI/LXI instrument chassis, multiplexer switch matrices, and automated end-of-line functional test fixtures.",
      icon: Activity,
      tags: ["PXI Chassis", "Switch Matrices", "ATE Racks"],
    },
    {
      title: "Thermal Management & Rework Accessories",
      desc: "Preheaters, BGA reballing kits, thermal imaging cameras, and heat-sink interface compounds for component recovery.",
      icon: Flame,
      tags: ["Infrared Preheaters", "BGA Stencils", "Thermal Cameras"],
    },
    {
      title: "Workstations & Lab Equipment",
      desc: "Heavy-duty modular ESD workbenches, overhead instrument shelving, conductive task chairs, and fume extractors.",
      icon: Monitor,
      tags: ["Modular Benches", "ESD Seating", "Fume Extraction"],
    },
    {
      title: "Pneumatic & Assembly Equipment",
      desc: "Pneumatic screwfeeders, fluid dispensers for epoxies, solder paste depositors, and pick-and-place vacuum pens.",
      icon: Cog,
      tags: ["Fluid Dispensers", "Screw Feeders", "Vacuum Handling"],
    },
  ];

  // Section 3 Data: Applications (5 Key Manufacturing Stages)
  const applications = [
    {
      title: "SMT/SMD LINE and Rework",
      desc: "Tools and equipment for soldering, component replacement, and board-level rework.",
      icon: Cpu,
      stage: "Stage 01",
      details: "Precision soldering iron stations, hot-air nozzles, BGA placement alignment, and localized PCB thermal profiles.",
    },
    {
      title: "Electrical Verification",
      desc: "Measurement equipment for checking electrical parameters during development, troubleshooting, and production testing.",
      icon: Gauge,
      stage: "Stage 02",
      details: "Traceable calibration multimeters, mixed-domain scopes, LCR bridge analyzers, and high-speed signal integrity checks.",
    },
    {
      title: "Functional Test Stations",
      desc: "Instruments and accessories used in test setups to evaluate defined product functions.",
      icon: Activity,
      stage: "Stage 03",
      details: "Programmable DC stimulus, dynamic electronic load sinking, automated DAQ scanning, and pass/fail GO/NO-GO software fixtures.",
    },
    {
      title: "ESD-Controlled Work Areas",
      desc: "Products that support static-control practices around sensitive electronic assemblies.",
      icon: ShieldCheck,
      stage: "Stage 04",
      details: "ANSI/ESD S20.20 compliant table runners, wrist strap verification units, ionizers, and conductive component storage bins.",
    },
    {
      title: "New Product Introduction",
      desc: "Equipment and workstation requirements associated with prototype builds, process development, and production preparation.",
      icon: Sparkles,
      stage: "Stage 05",
      details: "Flexible staging benches, rapid prototype test rigs, quick-turn stencil printers, and pilot lot quality inspection stations.",
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
  const applicationPresets = [
    "SMT/SMD Line & Rework",
    "Electrical Verification",
    "Functional Test Stations",
    "ESD-Controlled Work Areas",
    "New Product Introduction (NPI)",
    "Complete Plant Setup",
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE PRODUCTION SOURCING FORM
          ========================================================================= */}
      <section 
        id="electronics-hero"
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
            <span className="text-gray-400">Industries</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">Electronics & EMS</span>
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
                <span>ELECTRONICS MANUFACTURING & EMS SOURCING SOLUTIONS</span>
              </div>

              {/* Main H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Keep Your Electronics{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Production Moving
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                PCB assembly, component handling, and product testing depend on the right tools and equipment at every stage. eFocus Industrial helps electronics manufacturers and EMS providers source products for assembly lines, inspection areas, and test stations.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Source for Your Production Line</span>
                </button>

                <a
                  href="#product-categories"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>Explore Electronics Products</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 12 Product Categories */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={12} suffix="+" duration={1600} />
                    ) : (
                      <span>12+</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Product Domains</span>
                    <Boxes className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    SMT, ATE, ESD & test gear
                  </p>
                </div>

                {/* Stat 2: 100% Traceable Sourcing */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={100} suffix="%" duration={1800} />
                    ) : (
                      <span>100%</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Authorized Supply</span>
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    OEM datasheets & warranties
                  </p>
                </div>

                {/* Stat 3: 24–48h Turnaround */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={48} suffix="h" duration={1400} />
                    ) : (
                      <span>48h</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>BOM Quotation</span>
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Single consolidated invoice
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>IPC & ESD S20.20 Standard</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>BOM Multi-Brand Line Matching</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>NPI & High-Volume Production</span>
                </span>
              </div>

            </div>

            {/* Right Column: Interactive Form "Source for Your Production Line" */}
            <div className="lg:col-span-5" ref={formRef}>
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
                
                {/* Form Header Accent Bar with Shimmer */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-[#AF0202] to-black" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Source for Your Production Line
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Submit requirements or attach an SMT / test equipment list.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center shrink-0 shadow-2xs">
                    <Cpu className="w-5 h-5" />
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
                        placeholder="e.g. Rajesh Nair"
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
                        placeholder="e.g. Vexen EMS Technologies"
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
                        placeholder="sourcing@company.com"
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

                  {/* Production Line / Application Focus (Chips) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Production Line / Application Focus <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {applicationPresets.map((preset) => {
                        const isSelected = productionFocus === preset;
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setProductionFocus(preset)}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-medium text-left border transition-all cursor-pointer truncate ${
                              isSelected
                                ? "bg-red-50 border-red-500 text-red-700 font-semibold shadow-2xs"
                                : "bg-gray-50/60 border-gray-200 text-gray-600 hover:bg-gray-100/70"
                            }`}
                          >
                            <span className="mr-1">{isSelected ? "●" : "○"}</span>
                            {preset}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Equipment & Sourcing Requirements * */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Equipment & Sourcing Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={equipmentRequirements}
                      onChange={(e) => setEquipmentRequirements(e.target.value)}
                      placeholder="Specify part numbers, target quantities, soldering stations, test meters, ESD protection, or microscope specs..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Expected Timeline */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Expected Timeline
                    </label>
                    <Select value={timeline} onValueChange={setTimeline}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select expected timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks) — Urgent Line Stoppage / Spare</SelectItem>
                        <SelectItem value="2–4 Weeks">2–4 Weeks (Pilot Line / NPI Batch)</SelectItem>
                        <SelectItem value="1–3 Months">1–3 Months (Planned SMT Expansion)</SelectItem>
                        <SelectItem value="Quarterly / Phased Rollout">Quarterly / Phased Rollout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Optional BOM / BOQ / Spec Document Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Attach BOM / Requirements Document <span className="text-gray-400 font-normal">(Optional)</span>
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
                          Upload BOM spreadsheet, equipment list, or spec sheet (.xlsx, .csv, .pdf)
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
                          <span>Submitting Production Request...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Submit Production Sourcing Request</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Guaranteed NDA confidentiality & technical component scrubbing.
                    </p>
                  </div>

                </form>

              </div>
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
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
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

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-gray-100">
                    {cat.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white border border-gray-200/80 text-[10px] font-medium text-gray-600 group-hover:border-red-200 group-hover:text-red-700 transition-colors"
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
          SECTION 3: APPLICATIONS (5 STAGES)
          ========================================================================= */}
      <section 
        ref={appsRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
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
                      <span className="text-[11px] font-mono font-bold tracking-wider text-red-600 group-hover:text-red-400 transition-colors uppercase">
                        {app.stage}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors leading-snug mb-2.5">
                      {app.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed mb-4">
                      {app.desc}
                    </p>

                    <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-zinc-900/80 border border-gray-200/80 group-hover:border-zinc-800 transition-colors">
                      <p className="text-[11px] text-gray-500 group-hover:text-gray-400 leading-relaxed">
                        <span className="font-semibold text-gray-700 group-hover:text-gray-200">Key Outfitting: </span>
                        {app.details}
                      </p>
                    </div>
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
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
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
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Common Inquiries" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find answers regarding sourcing scope, BOM reviews, instrument identification, accessories, and new line support.
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
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-[36px] bg-gradient-to-br from-[#111315] via-[#1a1d21] to-black p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden shadow-2xl">
            
            {/* Background Ambient Aura */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
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
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#0d0f11] py-3.5 px-8 font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Submit Your Requirements</span>
                </button>

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

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Production Sourcing Request Received!"
        message="Thank you for submitting your electronics production line requirements. Our EMS and industrial specialists will review your equipment specifications and contact you with a consolidated proposal within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
