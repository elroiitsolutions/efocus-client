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
  Activity, 
  Zap, 
  Layers, 
  Upload, 
  Paperclip, 
  X, 
  Sliders,
  Radio,
  BarChart3,
  FileSpreadsheet,
  Cable,
  Microchip,
  Network,
  Sparkles,
  Check
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

export default function SemiconductorPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Semiconductor Test Equipment & Sourcing Solutions | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Source semiconductor characterisation instruments, source measure units, precision electrical measurement equipment, probes, and automated test hardware with eFocus Industrial."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "Source semiconductor characterisation instruments, source measure units, precision electrical measurement equipment, probes, and automated test hardware with eFocus Industrial."
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
  const [characterisationTask, setCharacterisationTask] = useState("Current-Voltage (I-V) Characterisation");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToForm = (prefillTask?: string) => {
    if (prefillTask) {
      setCharacterisationTask(prefillTask);
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const firstInput = formRef.current?.querySelector("input");
    firstInput?.focus();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 25 * 1024 * 1024) {
        alert("File size exceeds 25MB limit.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Semiconductor Test & Measurement Enquiry",
        form_type: "semiconductor_test_sourcing",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: `Semiconductor Sourcing: ${characterisationTask}`,
        requirement_type: characterisationTask,
        product_categories: selectedCategories.length > 0 ? selectedCategories.join(", ") : undefined,
        message: specifications.trim() || `Characterisation Task: ${characterisationTask}. Categories: ${selectedCategories.join(", ") || "General test setup"}`,
        file: file || undefined,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setCharacterisationTask("Current-Voltage (I-V) Characterisation");
      setSelectedCategories([]);
      setSpecifications("");
      removeFile();
    } catch (err: any) {
      console.error("Semiconductor test submission failed:", err);
      alert(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 12 Product Categories matching prompt
  const productCategories = [
    {
      title: "Source Measure Units (SMUs)",
      desc: "For sourcing voltage or current while measuring the corresponding electrical response of semiconductor devices.",
      badge: "I-V Sweep & Pulse",
      icon: Activity,
      tags: ["Four-Quadrant Operation", "Pulsed Sourcing", "Sub-pA Resolution"],
    },
    {
      title: "Semiconductor Parameter Analysers",
      desc: "For detailed electrical characterisation of devices, including applicable current-voltage and capacitance-voltage measurements.",
      badge: "Multi-Channel C-V / I-V",
      icon: BarChart3,
      tags: ["Wafer-Level Testing", "Quasi-Static C-V", "Automated Sequences"],
    },
    {
      title: "Precision Digital Multimeters",
      desc: "For high-resolution electrical measurements during device evaluation and laboratory testing.",
      badge: "6.5 to 8.5 Digits",
      icon: Sliders,
      tags: ["Low-Noise Metrology", "High-Speed Digitizing", "Kelvin Sensing"],
    },
    {
      title: "Low-Current Measurement Instruments",
      desc: "Electrometers and picoammeters for applications involving very low currents and high-resistance measurements.",
      badge: "fA Resolution & Guarding",
      icon: Zap,
      tags: ["Sub-femtoampere", "Triaxial Guarding", "Volume Resistivity"],
    },
    {
      title: "Semiconductor Test Systems",
      desc: "Applicable electrical test systems and instrumentation for device evaluation and automated measurement workflows.",
      badge: "Automated Workflows",
      icon: Cpu,
      tags: ["Rack & Bench ATE", "Multi-Die Probing", "Production Screening"],
    },
    {
      title: "Oscilloscopes and High-Speed Probes",
      desc: "For observing switching behaviour, transient signals, and high-speed electronic waveforms.",
      badge: "GHz Bandwidth & Low Loading",
      icon: Radio,
      tags: ["Active Differential Probes", "Transient Analysis", "Eye Diagram"],
    },
    {
      title: "Programmable Power Supplies",
      desc: "For providing controlled electrical power to semiconductor test setups and supporting circuits.",
      badge: "Low Ripple & Clean DC",
      icon: Zap,
      tags: ["Fast Transient Slew", "Isolated Channels", "Remote Sensing"],
    },
    {
      title: "Electronic Loads",
      desc: "For controlled loading of power devices, converters, and related electronic circuits.",
      badge: "Dynamic Load Profiling",
      icon: Layers,
      tags: ["CC / CV / CR / CP Modes", "High Slew Rates", "Transient Cycling"],
    },
    {
      title: "LCR Meters and Impedance Analysers",
      desc: "For characterising capacitance, inductance, resistance, and impedance where relevant to the device or component under test.",
      badge: "Frequency Sweep to GHz",
      icon: Activity,
      tags: ["Dielectric Testing", "Wide Frequency Range", "C-V Profiling"],
    },
    {
      title: "Wafer Probing and Device Connection Accessories",
      desc: "Probe stations, probe cards, probe needles, and related connection hardware, subject to sourcing availability.",
      badge: "Sub-Micron Positioning",
      icon: Microchip,
      tags: ["Manual & Semi-Auto", "RF Probe Tips", "Vacuum Chucks"],
    },
    {
      title: "Switching and Data Acquisition Systems",
      desc: "For routing measurement signals and collecting electrical data in multi-channel test setups.",
      badge: "Low-Thermal Matrix",
      icon: Network,
      tags: ["Multiplexers", "Low Offset Voltage", "GPIB / LXI / PXIe"],
    },
    {
      title: "Semiconductor Test Fixtures, Cables and Connectors",
      desc: "Low-noise cables, specialised connectors, test fixtures, and device interfaces selected for the measurement requirements.",
      badge: "Triaxial Low-Noise Shielding",
      icon: Cable,
      tags: ["Triaxial to BNC", "Zero-Insertion Sockets", "Shielded Enclosures"],
    },
  ];

  // 6 Applications matching prompt
  const applications = [
    {
      title: "Current-Voltage (I-V) Characterisation",
      desc: "Measure how a semiconductor device responds to applied voltage or current. SMUs and parameter analysers can support the evaluation of leakage current, threshold behaviour, and other device-specific electrical characteristics.",
      icon: Activity,
      category: "Electrical Device Physics",
      tags: ["Leakage Current", "Threshold Voltage (Vth)", "Sub-threshold Slope"],
    },
    {
      title: "Capacitance-Voltage (C-V) Measurements",
      desc: "Evaluate capacitance changes with applied voltage for relevant semiconductor devices and structures. Equipment selection depends on the required measurement range, frequency, and test configuration.",
      icon: Sliders,
      category: "Dielectric & Interface Metrology",
      tags: ["Doping Profiles", "Oxide Thickness", "Interface Trap Density (Dit)"],
    },
    {
      title: "Low-Leakage Current Measurement",
      desc: "Investigate small currents in semiconductor devices, insulation structures, and high-resistance applications. Instrument resolution, noise, guarding, and connection quality can influence the measurement.",
      icon: Zap,
      category: "Ultra-Sensitive Metrology",
      tags: ["fA / pA Electrometry", "Driven Guard Shields", "Surface Leakage Analysis"],
    },
    {
      title: "Power Semiconductor Evaluation",
      desc: "Assess electrical behaviour in relevant power devices and circuits using suitable power sources, loads, oscilloscopes, and probes. Voltage, current, switching speed, and safe operating limits must be considered.",
      icon: Cpu,
      category: "Wide Bandgap & Power",
      tags: ["SiC & GaN Qualification", "High-Voltage RDS(on)", "Dynamic SOA Testing"],
    },
    {
      title: "High-Speed Device Testing",
      desc: "Observe signal transitions and switching behaviour in high-speed electronic devices. Bandwidth, probe loading, connection layout, and measurement setup are important factors.",
      icon: Radio,
      category: "RF & High-Speed Verification",
      tags: ["Picosecond Rise Times", "Low-Capacitance Probing", "Transient Waveforms"],
    },
    {
      title: "Automated Device Characterisation",
      desc: "Use compatible instruments, switching hardware, and control interfaces to support repeatable measurements across multiple devices or test points.",
      icon: Network,
      category: "Production & Multi-Site Screening",
      tags: ["Multi-Die Wafer Screening", "Automated Matrix Switching", "Python / LabVIEW Control"],
    },
  ];

  // 5 Why Choose eFocus Industrial Pillars matching prompt
  const whyPoints = [
    {
      number: "01",
      title: "Measurement-Range Matching",
      desc: "Review current, voltage, resistance, capacitance, and frequency requirements before identifying suitable instruments.",
      icon: Activity,
    },
    {
      number: "02",
      title: "Low-Level Measurement Considerations",
      desc: "Account for noise, resolution, guarding, cabling, and fixture requirements when sourcing equipment for sensitive measurements.",
      icon: ShieldCheck,
    },
    {
      number: "03",
      title: "Device and Interface Compatibility",
      desc: "Consider package type, test connections, probe requirements, and instrument interfaces as part of the equipment enquiry.",
      icon: Microchip,
    },
    {
      number: "04",
      title: "From Individual Instruments to Test Setups",
      desc: "Discuss sourcing requirements for standalone instruments, supporting accessories, and compatible test-system components.",
      icon: Layers,
    },
    {
      number: "05",
      title: "Application-Specific Equipment Review",
      desc: "Share your device type, test objectives, and measurement parameters to help narrow down relevant product options.",
      icon: FileSpreadsheet,
    },
  ];

  // 5 FAQs matching prompt
  const faqs = [
    {
      q: "What equipment is used for semiconductor characterisation?",
      a: "Depending on the device and test objective, equipment may include SMUs, semiconductor parameter analysers, precision multimeters, electrometers, LCR meters, and specialised probing accessories.",
    },
    {
      q: "Which instrument is suitable for low-leakage current measurements?",
      a: "Electrometers or picoammeters may be suitable, depending on the current range, required resolution, noise environment, and test configuration.",
    },
    {
      q: "Can I source equipment for I-V and C-V measurements?",
      a: "You can share the device type, voltage and current ranges, capacitance range, and measurement frequency requirements for equipment sourcing review.",
    },
    {
      q: "Can you support power semiconductor testing requirements?",
      a: "Share the device ratings, switching characteristics, and test objectives so relevant power equipment, loads, oscilloscopes, and probes can be reviewed.",
    },
    {
      q: "Can I submit a complete semiconductor laboratory equipment list?",
      a: "Yes. Share your BOM or equipment list with part numbers, specifications, and quantities to review potential sourcing options.",
    },
  ];

  return (
    <div className="bg-[#fafbfc] min-h-screen text-[#0d0f11] font-sans antialiased overflow-x-hidden">
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE TECHNICAL SOURCING FORM
          ========================================================================= */}
      <section 
        id="semiconductor-hero"
        className="w-full relative pt-6 sm:pt-10 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden bg-gradient-to-b from-[#fbfcfd] via-white to-[#f8f9fa]"
      >
        {/* Soft Ambient Radial Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(175,2,2,0.07),transparent_70%)] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-rose-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[102rem] mx-auto relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Industries</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">Semiconductor</span>
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
                <span>SEMICONDUCTOR TEST & MEASUREMENT SOLUTIONS</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Precision Measurement for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Semiconductor Development
                </span>{" "}
                and Testing
              </h1>

              {/* Subtitle & Value Proposition */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-4 animate-in fade-in slide-in-from-left-8 duration-700">
                Semiconductor devices operate across demanding electrical and measurement ranges. Characterising device behaviour requires suitable instruments, stable test conditions, and compatible probing and connection hardware.
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                We help semiconductor engineering teams source precision test instruments, power equipment, measurement accessories, and test-system components for device evaluation, R&D, and production test applications.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={() => scrollToForm()}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Discuss Your Test Requirements</span>
                </button>

                <a
                  href="#product-categories"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>Explore Equipment Categories</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Verified Performance Stats Ribbon */}
              <div className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80">
                {/* Stat 1: 100+ Sourcing Brands */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    <CountUp value={100} suffix="+" duration={1600} />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Instrument Brands</span>
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Authorized global suppliers
                  </p>
                </div>

                {/* Stat 2: fA / pA Low-Current Resolution */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    <span>fA / pA</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Current Resolution</span>
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Electrometers & SMUs
                  </p>
                </div>

                {/* Stat 3: 1 PO Unified GST Invoicing */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    <span>1 PO</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Unified Invoicing</span>
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Consolidated lab sourcing
                  </p>
                </div>
              </div>

              {/* Value Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  NABL Traceable Test Options
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  Cleanroom & ESD Safe Probing
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-red-600" />
                  24–48h Technical Sourcing Review
                </span>
              </div>
            </div>

            {/* Right Column: Hero Technical Sourcing Form */}
            <div ref={formRef} className="lg:col-span-5 w-full">
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xs">
                {/* Top Brand Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />

                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-600 uppercase tracking-wider mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Technical Sourcing Desk</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Discuss Your Test Requirements
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Share your device specifications, characterisation objectives, or laboratory equipment list for a tailored technical proposal.
                  </p>
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
                        placeholder="e.g. Dr. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Company / Lab Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Bharat Semi Labs Ltd"
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

                  {/* Characterisation Task Select (Shadcn Select) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Primary Characterisation Task
                    </label>
                    <Select value={characterisationTask} onValueChange={setCharacterisationTask}>
                      <SelectTrigger className="w-full h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Select characterisation task" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Current-Voltage (I-V) Characterisation">
                          Current-Voltage (I-V) Characterisation (SMUs / Analysers)
                        </SelectItem>
                        <SelectItem value="Capacitance-Voltage (C-V) Measurements">
                          Capacitance-Voltage (C-V) Measurements (LCR / Parameter)
                        </SelectItem>
                        <SelectItem value="Low-Leakage Current Measurement">
                          Low-Leakage Current Measurement (Electrometers / Picoammeters)
                        </SelectItem>
                        <SelectItem value="Power Semiconductor Evaluation">
                          Power Semiconductor Evaluation (SiC / GaN / IGBT / MOSFET)
                        </SelectItem>
                        <SelectItem value="High-Speed Device Testing">
                          High-Speed Device Testing (Oscilloscopes / High-Speed Probes)
                        </SelectItem>
                        <SelectItem value="Automated Device Characterisation">
                          Automated Device Characterisation & Wafer Probing
                        </SelectItem>
                        <SelectItem value="Complete Semiconductor Lab BOM Sourcing">
                          Complete Semiconductor Lab BOM Sourcing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Equipment Categories (Multi-select Chips) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-gray-700">
                        Equipment Categories Needed
                      </label>
                      <span className="text-[10px] text-gray-400">Select applicable items</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        "Source Measure Units (SMUs)",
                        "Parameter Analysers",
                        "Precision DMMs (6.5-8.5)",
                        "Low-Current Electrometers",
                        "Wafer Probing Accessories",
                        "Oscilloscopes & Probes",
                        "LCR & Impedance Analysers",
                        "Power Supplies & DC Loads",
                      ].map((cat) => {
                        const isSelected = selectedCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className={`py-2 px-2.5 rounded-xl text-[11px] font-medium text-left border transition-all cursor-pointer truncate ${
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

                  {/* Device Specifications / Target Instruments */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Device Specifications / Target Instruments
                    </label>
                    <textarea
                      rows={2}
                      value={specifications}
                      onChange={(e) => setSpecifications(e.target.value)}
                      placeholder="e.g. SiC MOSFET testing, 1500V 100A pulses, Keysight/Keithley SMU preference, wafer probe card pinout..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Optional File Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Attach Spec Sheet / Lab BOM <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    {file ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50/60 border border-red-200 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <Paperclip className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span className="font-semibold text-gray-900 truncate">{file.name}</span>
                          <span className="text-gray-500 text-[11px]">
                            ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-gray-200 hover:border-red-400 rounded-xl p-3 text-center cursor-pointer transition-all bg-gray-50/50 hover:bg-red-50/20 group"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Upload className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                          <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                            Upload BOM, BOQ or Device Specs (XLSX, CSV, PDF up to 25MB)
                          </span>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".xlsx,.xls,.csv,.pdf,.doc,.docx"
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
                          <span>Transmitting Specifications...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Submit Test Requirements</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Strictly confidential. NDA protection for proprietary device specs & research protocols.
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
        id="product-categories" 
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Instrumentation Portfolio" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Equipment for Semiconductor Characterisation and Test
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Source high-precision instruments, low-noise measurement interfaces, and automated test-bench hardware through one dedicated industrial partner.
            </p>
          </div>

          {/* 12 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {productCategories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="rounded-3xl p-6 sm:p-7 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Icon & Category Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-110">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-400 group-hover:text-red-500 font-mono transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#AF0202] transition-colors">
                      {cat.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      {cat.desc}
                    </p>

                    {/* Badge */}
                    <div className="mb-4">
                      <span className="inline-block text-[11px] font-semibold text-red-700 bg-red-50/90 border border-red-200/70 px-2.5 py-1 rounded-md">
                        {cat.badge}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white text-gray-600 text-[11px] font-medium border border-gray-200/80"
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
          <div className="text-center">
            <button
              type="button"
              onClick={() => scrollToForm()}
              className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12 px-8"
            >
              <NexChipIcon className="w-8 h-8" />
              <span>Enquire About Semiconductor Test Equipment</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: APPLICATIONS (6 CORE WORKFLOWS)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-[102rem] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Verification Workflows" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Measurement Tasks Across the Semiconductor Test Workflow
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From wafer-level evaluation to packaged power devices, we assist engineering teams in configuring instruments for repeatable, high-integrity measurements.
            </p>
          </div>

          {/* 6 Applications Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => {
              const AppIcon = app.icon;
              return (
                <div
                  key={app.title}
                  className="rounded-3xl bg-white border border-gray-200/80 p-6 sm:p-7 shadow-2xs hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                        <AppIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {app.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2.5">
                      {app.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      {app.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                    {app.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-red-50/70 text-red-700 text-[11px] font-medium border border-red-100"
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
          SECTION 4: WHY CHOOSE eFOCUS INDUSTRIAL?
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="w-full max-w-[102rem] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Why Choose Us" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Select Instruments Around Device Characteristics
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We focus on technical compatibility, interface requirements, and supporting fixtures—not just part numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPoints.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.number}
                  className="rounded-3xl border border-gray-200/80 bg-[#fbfcfd] p-6 sm:p-7 hover:bg-white hover:shadow-xl hover:border-red-200 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}

            {/* Direct Consult Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#111315] via-[#1c1f24] to-[#111315] p-6 sm:p-7 text-white flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs font-mono text-red-400 uppercase tracking-wider block mb-2 font-bold">
                  Technical Desk
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  Need Help Configuring Test Setups?
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Send us your target device datasheet or characterisation objectives. Our application engineers will help review compatible instrument topologies.
                </p>
              </div>
              <button
                type="button"
                onClick={() => scrollToForm()}
                className="mt-6 w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Discuss Your Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <NexBadge label="Questions & Answers" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Key considerations when sourcing semiconductor characterisation instrumentation and lab setups.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-200/90 shadow-2xs overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base text-gray-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-red-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
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
        <div className="w-full max-w-[102rem] mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0d0f11] via-[#111315] to-[#1c1f24] p-8 sm:p-14 border border-gray-800 text-white overflow-hidden shadow-2xl">
            {/* Ambient Red Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-red-400 text-xs font-semibold mb-4 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Semiconductor Sourcing Desk</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Planning a Semiconductor Measurement or Test Setup?
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-8">
                Share your device specifications, characterisation objectives, or laboratory equipment list with eFocus Industrial to discuss suitable sourcing options.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToForm()}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-red-600/30 transition-all cursor-pointer h-12 px-8"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Submit Your Requirements</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToForm()}
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm sm:text-base font-medium border border-white/20 transition-all cursor-pointer"
                >
                  <span>Discuss Your Application</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Authorized Sourcing Lines
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Single GST Invoicing
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Manufacturer Warranty Protected
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Semiconductor Test Enquiry Received!"
        message={`Thank you for your enquiry. Your requirement has been logged in our system. Our technical team will review your specifications and contact you at ${submitterEmail} within 24 to 48 hours.`}
        submitterEmail={submitterEmail}
      />
    </div>
  );
}
