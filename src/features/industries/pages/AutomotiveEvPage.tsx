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
  Car, 
  BatteryCharging, 
  Zap, 
  Gauge, 
  Activity, 
  Cpu, 
  Network, 
  Cable, 
  Sparkles, 
  HelpCircle, 
  FileText, 
  Upload, 
  Paperclip, 
  X, 
  Compass, 
  Layers, 
  Search, 
  Sliders, 
  Radio, 
  Boxes
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

export default function AutomotiveEvPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Automotive & EV Testing Equipment & Sourcing | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Source battery testing equipment, electrical test instruments, ECU validation tools, and automotive production test solutions with eFocus Industrial."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "Source battery testing equipment, electrical test instruments, ECU validation tools, and automotive production test solutions with eFocus Industrial."
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
  const [applicationFocus, setApplicationFocus] = useState("EV Battery & BMS Testing");
  const [testingRequirements, setTestingRequirements] = useState("");
  const [voltagePowerRating, setVoltagePowerRating] = useState("400V–800V High Voltage");
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

    if (!fullName.trim() || !companyName.trim() || !email.trim() || !testingRequirements.trim()) {
      alert("Please fill in all required fields (Full Name, Company Name, Business Email, and Testing Requirements).");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Automotive & EV Testing Sourcing Enquiry",
        form_type: "automotive_ev_sourcing",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        application_focus: applicationFocus,
        voltage_power_rating: voltagePowerRating,
        message: `Application Focus: ${applicationFocus}\nVoltage/Power Range: ${voltagePowerRating}\n\nTesting & Equipment Requirements:\n${testingRequirements.trim()}`,
        file: file,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setApplicationFocus("EV Battery & BMS Testing");
      setTestingRequirements("");
      setVoltagePowerRating("400V–800V High Voltage");
      removeFile();
    } catch (err: any) {
      console.error("Automotive & EV submission failed:", err);
      alert(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2 Data: 12 Product Categories
  const productCategories = [
    {
      title: "Battery Testing Equipment",
      desc: "High-accuracy cell cyclers, pack simulators, EIS electrochemical impedance analyzers, and thermal chamber interfaces.",
      icon: BatteryCharging,
      tags: ["Cell Cyclers", "Pack Simulators", "EIS Analyzers"],
    },
    {
      title: "Programmable DC Power Supplies",
      desc: "Bidirectional high-voltage DC sources, autoranging regenerative supplies, and low-ripple benchtop power units.",
      icon: Zap,
      tags: ["Bidirectional DC", "Autoranging 1500V", "Fast Transient"],
    },
    {
      title: "Electronic Loads and Regenerative Loads",
      desc: "Grid-regenerative loads up to 96% efficiency, dynamic pulse loading units, and sink-source test modules.",
      icon: Activity,
      tags: ["Regenerative Loads", "Dynamic Pulsing", "Sink-Source"],
    },
    {
      title: "Power Analysers",
      desc: "Multi-phase precision power analyzers, motor-inverter efficiency meters, and harmonic distortion analyzers.",
      icon: Gauge,
      tags: ["Multi-Phase Power", "Motor Efficiency", "0.01% Accuracy"],
    },
    {
      title: "Oscilloscopes and Probes",
      desc: "High-voltage differential probes (up to 6kV), isolated-channel scopes, and Rogowski current probes for fast SiC/GaN switching.",
      icon: Sliders,
      tags: ["High-Voltage Diff Probes", "Rogowski Coils", "SiC/GaN Switching"],
    },
    {
      title: "Digital Multimeters and Electrical Test Instruments",
      desc: "Precision 6.5–8.5 digit DMMs, milliohm meters for busbars, insulation resistance testers, and micro-ohm bond meters.",
      icon: Boxes,
      tags: ["Busbar Milliohm", "Hipot Insulation", "8.5-Digit Precision"],
    },
    {
      title: "Data Acquisition (DAQ) Systems",
      desc: "Multi-channel isolated temperature loggers (thermocouple/RTD), CAN-synchronized strain DAQ, and high-speed telemetry.",
      icon: Layers,
      tags: ["Multi-Channel DAQ", "Isolated Temperature", "CAN-Synced"],
    },
    {
      title: "ECU and Embedded System Test Equipment",
      desc: "Hardware-in-the-Loop (HIL) simulators, fault insertion units, breakout boxes, and sensor emulation hardware.",
      icon: Cpu,
      tags: ["HIL Simulation", "Fault Insertion", "Sensor Emulation"],
    },
    {
      title: "CAN, LIN and Automotive Communication Interfaces",
      desc: "Automotive Ethernet (100BASE-T1/1000BASE-T1), CAN FD, LIN, FlexRay interface gateways, and bus monitor dongles.",
      icon: Network,
      tags: ["CAN FD / LIN", "Automotive Ethernet", "FlexRay Gateways"],
    },
    {
      title: "High-Voltage Measurement Accessories",
      desc: "Safety banana plugs, interlock breakout boxes, HV safety probes, and insulated hand tools tested up to 1000V CAT IV.",
      icon: ShieldCheck,
      tags: ["1000V CAT IV", "HV Breakout Boxes", "Safety Interlocks"],
    },
    {
      title: "Cables, Connectors and Test Fixtures",
      desc: "AEC-Q compliant automotive wiring harnesses, Fakra/HSD RF cables, high-current battery test connectors, and custom test beds.",
      icon: Cable,
      tags: ["High-Current Harnesses", "Fakra / HSD", "Custom Fixtures"],
    },
    {
      title: "Automated Test Equipment (ATE) and EOL Test Systems",
      desc: "Turnkey production line test racks, automated switching matrices, pneumatic contactors, and rapid EOL test sequencers.",
      icon: Car,
      tags: ["EOL Test Sequencers", "Switching Matrices", "Turnkey Test Racks"],
    },
  ];

  // Section 3 Data: Applications (6 Key Tasks)
  const applications = [
    {
      title: "EV Battery & BMS Testing",
      desc: "Source equipment for battery evaluation, voltage and current measurement, and battery management system testing.",
      icon: BatteryCharging,
      tag: "Battery Packs & Modules",
      capabilities: "Cell-level OCV/IR profiling, multi-cell balancing verification, thermal runaway monitoring, and BMS CAN telemetry validation.",
    },
    {
      title: "Power Electronics Validation",
      desc: "Explore instruments for evaluating converters, inverters, onboard chargers, and other power electronic systems.",
      icon: Zap,
      tag: "Inverters & OBC",
      capabilities: "High-efficiency motor drive analysis, bidirectional V2G charge/discharge cycles, and GaN/SiC dv/dt switching characterization.",
    },
    {
      title: "ECU & Automotive Electronics Testing",
      desc: "Find test instruments and interface accessories for electronic control units, sensors, and embedded automotive systems.",
      icon: Cpu,
      tag: "Vehicle Control Units",
      capabilities: "Microcontroller boundary scans, sleep current evaluation in nanoamps, and CAN FD fault-injection robustness testing.",
    },
    {
      title: "End-of-Line (EOL) Testing",
      desc: "Source instruments, switching systems, and test accessories for defined checks during automotive manufacturing.",
      icon: Car,
      tag: "Assembly Line QA",
      capabilities: "Automated Hipot dielectric breakdown, continuity verification, functional contactor activation, and rapid pass/fail logging.",
    },
    {
      title: "Automotive Electrical Systems",
      desc: "Support electrical measurements and troubleshooting for vehicle wiring, electronic modules, and electrical subsystems.",
      icon: Cable,
      tag: "Wire Harness & Fuses",
      capabilities: "Drop-voltage diagnostics across main chassis lines, harness micro-resistance checks, and parasitic battery drain logging.",
    },
    {
      title: "ADAS & Vehicle Electronics Development",
      desc: "Explore relevant measurement equipment and test accessories for development and validation of automotive electronic systems.",
      icon: Radio,
      tag: "Radar, Lidar & Vision",
      capabilities: "Automotive Ethernet signal integrity, 77GHz radar target simulator interface cables, and camera deserializer link verification.",
    },
  ];

  // Section 4 Data: Why eFocus? (4 Pillars)
  const whyChoosePillars = [
    {
      title: "Application-Led Equipment Selection",
      desc: "Start with the test objective, system specifications, and intended operating conditions.",
      icon: Compass,
      tag: "Targeted Objective",
    },
    {
      title: "Electrical Rating Consideration",
      desc: "Review voltage, current, power, bandwidth, and measurement requirements when identifying suitable products.",
      icon: Zap,
      tag: "Safety & Ratings",
    },
    {
      title: "Instrument and Accessory Matching",
      desc: "Consider compatible probes, cables, connectors, and interfaces alongside the primary equipment.",
      icon: Layers,
      tag: "Complete Ecosystem",
    },
    {
      title: "Support Across Development and Production",
      desc: "Discuss equipment requirements for engineering laboratories, validation benches, and manufacturing test stations.",
      icon: Search,
      tag: "R&D to High Volume",
    },
  ];

  // Section 5 Data: FAQs
  const faqs = [
    {
      question: "What automotive and EV testing products can I source?",
      answer:
        "Enquiries may include battery test equipment, programmable power supplies, electronic loads, power analysers, oscilloscopes, DAQ systems, automotive interfaces, and test accessories.",
    },
    {
      question: "Can you support EV battery and BMS testing requirements?",
      answer:
        "Share the battery voltage and current ranges, test objectives, and required operating modes so suitable equipment options can be reviewed.",
    },
    {
      question: "Can I enquire about ECU testing equipment?",
      answer:
        "Yes. Provide details of the ECU, communication interfaces, signals, and intended test procedure to help identify relevant products.",
    },
    {
      question: "Do you support end-of-line testing requirements?",
      answer:
        "You can share the required production checks, test sequence, interfaces, and throughput needs for equipment sourcing review.",
    },
    {
      question: "Can I submit a complete equipment list for an EV laboratory?",
      answer:
        "Yes. Share your equipment list or BOM with specifications and quantities for review.",
    },
  ];

  // Application Presets for the Form
  const applicationPresets = [
    "EV Battery & BMS Testing",
    "Power Electronics Validation",
    "ECU & Embedded Electronics",
    "End-of-Line (EOL) Testing",
    "Automotive Electrical Systems",
    "ADAS & Sensor Development",
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE AUTOMOTIVE TESTING FORM
          ========================================================================= */}
      <section 
        id="automotive-hero"
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
            <span className="text-red-600 font-semibold">Automotive & EV Solutions</span>
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
                <span>AUTOMOTIVE & EV TESTING & SOURCING SOLUTIONS</span>
              </div>

              {/* Main H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Equip Your Automotive Testing and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  EV Development
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                From battery systems and power electronics to vehicle control units, automotive engineering requires dependable testing equipment throughout development and production. We help automotive manufacturers, EV companies, and engineering teams source test instruments, electrical equipment, connectivity products, and production test accessories suited to their technical requirements.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Discuss Your Testing Requirements</span>
                </button>

                <a
                  href="#automotive-categories"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>Explore Automotive & EV Products</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 1500V+ High-Voltage Testing */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={1500} suffix="V+" duration={1600} />
                    ) : (
                      <span>1500V+</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>HV Test Rating</span>
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Battery, inverter & SiC systems
                  </p>
                </div>

                {/* Stat 2: 100% Automotive Grade Support */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={100} suffix="%" duration={1800} />
                    ) : (
                      <span>100%</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>AEC-Q & ISO Spec</span>
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Traceable NABL calibration
                  </p>
                </div>

                {/* Stat 3: 48h RFQ Turnaround */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={48} suffix="h" duration={1400} />
                    ) : (
                      <span>48h</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>RFQ Turnaround</span>
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Complete instrument & probe quote
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ISO 26262 & High-Voltage Safety</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>CAN FD, LIN & Automotive Ethernet</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>Lab Setup & End-of-Line Production</span>
                </span>
              </div>

            </div>

            {/* Right Column: Interactive Form "Plan Your Automotive & EV Test Setup" */}
            <div className="lg:col-span-5" ref={formRef}>
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
                
                {/* Form Header Accent Bar with Shimmer */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-[#AF0202] to-black" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Plan Your Automotive & EV Test Setup
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Submit test parameters or upload your instrument list.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center shrink-0 shadow-2xs">
                    <Car className="w-5 h-5" />
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
                        placeholder="e.g. Alok Verma"
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
                        placeholder="e.g. Electra Drive Systems"
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
                        placeholder="testing@company.com"
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

                  {/* Automotive / EV Application Focus (Chips) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Application Focus <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {applicationPresets.map((preset) => {
                        const isSelected = applicationFocus === preset;
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setApplicationFocus(preset)}
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

                  {/* Testing & Equipment Requirements * */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Testing & Equipment Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={testingRequirements}
                      onChange={(e) => setTestingRequirements(e.target.value)}
                      placeholder="Specify test equipment (power analyzers, regenerative loads, scopes, DAQ), interfaces, or ECU test procedures..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Voltage & Power Rating Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Voltage / Power Operating Range
                    </label>
                    <Select value={voltagePowerRating} onValueChange={setVoltagePowerRating}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select voltage / power range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12V / 24V / 48V Low Voltage (ECU & Sensors)">12V / 24V / 48V Low Voltage (ECU, Body & Sensors)</SelectItem>
                        <SelectItem value="400V–800V High Voltage">400V–800V High Voltage (Traction Inverter & Battery Pack)</SelectItem>
                        <SelectItem value="1000V–1500V Heavy Commercial / Fast Charging">1000V–1500V Heavy Commercial / Fast Charging Infrastructure</SelectItem>
                        <SelectItem value="Complete Lab / Multi-Voltage Setup">Complete Lab / Multi-Voltage Setup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Optional Equipment List / Spec Document Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Attach Equipment List or Test Spec <span className="text-gray-400 font-normal">(Optional)</span>
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
                          Upload test BOM, instrument list, or datasheet (.xlsx, .csv, .pdf)
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
                          <span>Submitting Testing Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Submit Testing Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Strictly confidential. Non-disclosure protection for proprietary test protocols.
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: PRODUCT CATEGORIES (12 CATEGORIES)
          ========================================================================= */}
      <section 
        id="automotive-categories"
        ref={categoriesRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Instrumentation Portfolio" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Automotive & EV Testing Equipment Categories
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Equip your validation lab and production lines with calibrated instruments, regenerative power loads, and high-voltage safety accessories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mb-12">
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

          {/* Categories Sourcing CTA Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12 px-8"
            >
              <NexChipIcon className="w-8 h-8" />
              <span>Enquire About Automotive Test Equipment</span>
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: AUTOMOTIVE & EV APPLICATIONS (6 KEY TASKS)
          ========================================================================= */}
      <section 
        ref={appsRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            appsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Application Specializations" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Supporting Critical Automotive Engineering Tasks
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Precision test infrastructure tailored for battery modules, high-power traction drives, embedded ECUs, and end-of-line verification.
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
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600 group-hover:bg-red-950 group-hover:text-red-300 transition-colors">
                        {app.tag}
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
                        <span className="font-semibold text-gray-700 group-hover:text-gray-200">Core Capabilities: </span>
                        {app.capabilities}
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
          SECTION 4: WHY eFOCUS? (4 PILLARS)
          ========================================================================= */}
      <section 
        ref={whyVisible ? undefined : whyRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Automotive Advantage" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Why eFocus Industrial?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We align instrumentation with electrical ratings, test standards, and compatible probe interfaces for seamless validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoosePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
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
                      {pillar.tag}
                    </span>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2.5">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {pillar.desc}
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
            <NexBadge label="Testing Inquiries" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find answers regarding automotive test equipment, battery & BMS verification, ECU interfaces, EOL test racks, and EV lab submissions.
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
                <span>Automotive & EV Sourcing Infrastructure</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Planning Your Next Automotive or EV Test Setup?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Share your battery testing, power electronics, ECU validation, or production test requirements with eFocus Industrial.
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
                  <span>Share Your Equipment List</span>
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
        title="Testing Enquiry Received!"
        message="Thank you for submitting your automotive and EV test equipment requirements. Our automotive application specialists will review your voltage/current parameters and contact you with a tailored technical quotation within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
