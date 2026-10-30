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
  Plane, 
  Radio, 
  Network, 
  Activity, 
  Zap, 
  Boxes, 
  Cable, 
  Sparkles, 
  Upload, 
  Paperclip, 
  X, 
  Compass, 
  Layers, 
  Cpu,
  Wrench,
  HelpCircle
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

export default function AerospaceDefencePage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Aerospace & Defence Test Equipment Sourcing | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore RF and microwave instruments, avionics interface products, signal analysis equipment, and electronic test solutions for aerospace and defence engineering."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "Explore RF and microwave instruments, avionics interface products, signal analysis equipment, and electronic test solutions for aerospace and defence engineering."
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
  const [applicationFocus, setApplicationFocus] = useState("RF & Microwave Characterisation");
  const [frequencyRange, setFrequencyRange] = useState("6 GHz to 26.5 GHz (X-Band & Ku-Band Radar)");
  const [equipmentRequirements, setEquipmentRequirements] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Stats ribbon animation trigger
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
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
        form_name: "Aerospace & Defence Test Equipment Enquiry",
        form_type: "aerospace_defence_sourcing",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        application_focus: applicationFocus,
        frequency_range: frequencyRange,
        message: `Application Focus: ${applicationFocus}\nFrequency/Interface Range: ${frequencyRange}\n\nEquipment Requirements & Specs:\n${equipmentRequirements.trim()}`,
        file: file,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setApplicationFocus("RF & Microwave Characterisation");
      setFrequencyRange("6 GHz to 26.5 GHz (X-Band & Ku-Band Radar)");
      setEquipmentRequirements("");
      removeFile();
    } catch (err: any) {
      console.error("Aerospace & Defence submission failed:", err);
      alert(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2: 6 Specialised Product Categories
  const productCategories = [
    {
      title: "RF & Microwave Instruments",
      desc: "High-frequency precision instruments for frequency response, radar signal synthesis, and multiport network characterisation.",
      icon: Radio,
      items: [
        "Spectrum analysers",
        "RF signal generators",
        "Vector network analysers",
        "RF power meters and sensors"
      ],
      tags: ["Up to 67 GHz", "Phase Noise Analysis", "Multiport S-Parameters"],
    },
    {
      title: "Avionics & Data Bus Interfaces",
      desc: "Rugged flight-line and laboratory bus testing interfaces supporting legacy and modern mission-critical avionics protocols.",
      icon: Network,
      items: [
        "MIL-STD-1553 interface and test products",
        "ARINC 429 interface and test products",
        "Protocol monitoring and analysis hardware"
      ],
      tags: ["MIL-STD-1553", "ARINC 429", "Bus Monitor & Injector"],
    },
    {
      title: "Electronic Signal Analysis",
      desc: "Fast digital and mixed-signal oscilloscopes with deep memory, logic analyzers, and differential probes for waveform verification.",
      icon: Activity,
      items: [
        "Digital and mixed-signal oscilloscopes",
        "High-voltage and differential probes",
        "Logic analysers",
        "Function and arbitrary waveform generators"
      ],
      tags: ["12-Bit High Definition", "Differential Probes", "Eye Diagrams"],
    },
    {
      title: "Power Test Equipment",
      desc: "Clean programmable sources, regenerative electronic loads, and power analyzers tailored for 400Hz aircraft AC and 28V DC power.",
      icon: Zap,
      items: [
        "Programmable AC/DC power sources",
        "Electronic loads",
        "Power analysers",
        "Digital multimeters"
      ],
      tags: ["400 Hz Aircraft AC", "28V DC Avionics", "Regenerative Loads"],
    },
    {
      title: "Data Acquisition & Test Integration",
      desc: "Modular automated test systems (ATE) offering high channel density, precision signal conditioning, and switching matrices.",
      icon: Boxes,
      items: [
        "DAQ modules",
        "Switching systems",
        "Signal conditioning products",
        "Electronic test fixtures"
      ],
      tags: ["PXIe / LXI Architecture", "High Channel Density", "Matrix Switching"],
    },
    {
      title: "RF Connectivity & Accessories",
      desc: "Phase-matched coaxial test cables, high-frequency connectors, calibration standards, and ruggedized waveguide accessories.",
      icon: Cable,
      items: [
        "Coaxial cables",
        "RF connectors and adapters",
        "Attenuators",
        "Terminations and measurement accessories"
      ],
      tags: ["Phase-Stable Armored", "SMA / 2.92mm / 3.5mm", "Precision Cal Kits"],
    },
  ];

  // Section 3: 6 Applications Across Aerospace & Defence Workflows
  const applications = [
    {
      title: "RF and Microwave Characterisation",
      desc: "Engineers evaluating RF components and subsystems may need to measure frequency response, signal power, spectrum, or network characteristics. Instrument selection depends on the frequency range and measurement objective.",
      icon: Radio,
      category: "Radar & RF Modules",
      tags: ["S-Parameters", "Harmonic Distortion", "Intermodulation", "Gain Compression"],
    },
    {
      title: "Avionics Communication Testing",
      desc: "Avionics equipment may use standards such as MIL-STD-1553 and ARINC 429. Suitable interface products can support communication monitoring, data analysis, and testing according to the required configuration.",
      icon: Plane,
      category: "Flight-Line & Flight-Deck",
      tags: ["Dual-Redundant Bus", "Word Verification", "Label Decoding", "Error Injection"],
    },
    {
      title: "Electronic Signal Debugging",
      desc: "Digital and mixed-signal circuits can exhibit timing errors, noise, ringing, or signal distortion. Oscilloscopes, probes, and logic analysers help engineers investigate waveform behaviour.",
      icon: Activity,
      category: "R&D & Embedded Systems",
      tags: ["Signal Integrity", "Jitter Analysis", "Clock Skew", "Transient Spikes"],
    },
    {
      title: "Power Subsystem Validation",
      desc: "Reliable electronic power system performance depends on stable operating conditions and precise electrical measurements. Programmable sources, electronic loads, and power analysers support relevant verification tasks.",
      icon: Zap,
      category: "Power Conversion & Distribution",
      tags: ["MIL-STD-704", "DO-160 Power Transients", "Inrush Current", "Efficiency"],
    },
    {
      title: "Test Bench Development",
      desc: "Engineering laboratories may need coordinated instruments, switching systems, cables, and fixtures to build measurement setups around specific devices and test procedures.",
      icon: Boxes,
      category: "ATE & Lab Integration",
      tags: ["Rackmount Integration", "Switch Matrix", "Automated Fixtures", "Calibration Kits"],
    },
    {
      title: "Maintenance and Fault Investigation",
      desc: "Electrical measurement instruments and suitable accessories support troubleshooting of electronic assemblies and supported equipment during maintenance activities.",
      icon: Wrench,
      category: "MRO & Depot Diagnostics",
      tags: ["Field Portability", "Line Replaceable Units (LRU)", "Component Isolation", "Fault Tracing"],
    },
  ];

  // Section 4: Why Choose eFocus Industrial (5 Pillars)
  const whyPoints = [
    {
      number: "01",
      title: "Specification-Led Sourcing",
      desc: "Identify equipment based on required frequency range, bandwidth, voltage, current, measurement functions, and interface standards.",
      icon: Compass,
    },
    {
      number: "02",
      title: "Application and Interface Consideration",
      desc: "Review how the instrument connects to the device under test, including required communication interfaces, probes, cables, and adapters.",
      icon: Cpu,
    },
    {
      number: "03",
      title: "Instrument and Accessory Coordination",
      desc: "Consider supporting components alongside the primary instrument to help address connection and compatibility requirements.",
      icon: Cable,
    },
    {
      number: "04",
      title: "Multiple Test Equipment Categories",
      desc: "Explore sourcing options across RF, microwave, avionics interfaces, power testing, and electronic measurement through one technical sourcing contact.",
      icon: Layers,
    },
    {
      number: "05",
      title: "Requirements for Custom Test Setups",
      desc: "Explore instrumentation, switching, and interface hardware requirements for laboratory and automated testing applications based on the defined project scope.",
      icon: Boxes,
    },
  ];

  // Section 5: FAQs
  const faqs = [
    {
      question: "What test equipment can I source for aerospace and defence applications?",
      answer: "Requirements may include RF instruments, spectrum analysers, network analysers, oscilloscopes, avionics interface products, power equipment, DAQ systems, and measurement accessories.",
    },
    {
      question: "Can I enquire about MIL-STD-1553 or ARINC 429 interface products?",
      answer: "Please share the applicable standards, interface specifications, and intended test applications to help us identify suitable products for your requirements.",
    },
    {
      question: "How do I select an RF or microwave instrument?",
      answer: "The selection depends on the frequency range, signal levels, measurement type, required accuracy, and other application-specific specifications.",
    },
    {
      question: "Can I source equipment for a custom electronic test bench?",
      answer: "You can submit the instrument list, switching requirements, interfaces, and test objectives for sourcing review. Integration scope should be confirmed separately.",
    },
    {
      question: "Can I submit a BOM or equipment list?",
      answer: "Yes. Share part numbers, specifications, quantities, and any compatibility requirements to help review suitable sourcing options.",
    },
  ];

  const focusOptions = [
    "RF & Microwave Characterisation",
    "Avionics (1553 / 429)",
    "Electronic Signal Analysis",
    "Power Subsystem Validation",
    "Test Bench / ATE Integration",
    "Maintenance & Depot MRO",
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden selection:bg-red-500 selection:text-white">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE TECHNICAL SOURCING FORM
          ========================================================================= */}
      <section 
        id="aerospace-hero"
        className="w-full relative pt-6 sm:pt-10 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden"
      >
        {/* Soft Ambient Radial Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(175,2,2,0.07),transparent_70%)] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-rose-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[102rem] mx-auto relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Industries</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">Aerospace & Defence</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
            
            {/* Left Column: Heading, Value Prop, Auto-Increment Stats */}
            <div className="lg:col-span-7 flex flex-col items-start pt-2">
              
              {/* Eyebrow Pill with Pulsing Live Dot */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50/90 border border-red-200/80 text-red-700 text-xs sm:text-[13px] font-semibold tracking-wide mb-6 shadow-2xs hover:scale-[1.02] transition-transform">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#AF0202]"></span>
                </span>
                <span>AEROSPACE & DEFENCE TEST EQUIPMENT SOURCING</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5">
                Precision Test Equipment for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Aerospace & Defence Engineering
                </span>
              </h1>

              {/* Subtitle & Value Proposition */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-4">
                From RF signal analysis to avionics communication testing, aerospace and defence engineering requires instruments suited to specific signals, interfaces, and verification objectives.
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mb-8">
                eFocus helps engineering teams source test and measurement instruments, specialised interface hardware, and accessories for electronic development, system validation, and maintenance applications.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Discuss Your Application</span>
                </button>

                <a
                  href="#product-categories"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>Explore Product Categories</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 67 GHz Frequency Bandwidth */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={67} suffix=" GHz" duration={1600} />
                    ) : (
                      <span>67 GHz</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>RF Bandwidth</span>
                    <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Microwave & radar signals
                  </p>
                </div>

                {/* Stat 2: MIL-STD Protocols */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    <span>MIL-STD</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>1553 & 429 Bus</span>
                    <Network className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Avionics interface support
                  </p>
                </div>

                {/* Stat 3: 24-48h Response */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={24} suffix="–48h" duration={1400} />
                    ) : (
                      <span>24–48h</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Fast Turnaround</span>
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Technical RFQ matching
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Technical Sourcing Form */}
            <div ref={formRef} className="lg:col-span-5 w-full">
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xs">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />

                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-600 uppercase tracking-wider mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Technical Sourcing Desk</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Discuss Your Application
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Share your frequency range, avionics bus standard, or test specs for a tailored technical proposal.
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
                        placeholder="e.g. Dr. Rajesh Verma"
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
                        placeholder="e.g. AeroSys Dynamics / R&D"
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
                        placeholder="verma@aerosys.in"
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

                  {/* Primary Application Focus (Interactive Chips) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Primary Application Focus <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {focusOptions.map((opt) => {
                        const isSelected = applicationFocus === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setApplicationFocus(opt)}
                            className={`py-2 px-2.5 rounded-xl text-[11px] font-medium text-left border transition-all cursor-pointer truncate ${
                              isSelected
                                ? "bg-red-50 border-red-500 text-red-700 font-semibold shadow-2xs"
                                : "bg-gray-50/60 border-gray-200 text-gray-600 hover:bg-gray-100/70"
                            }`}
                          >
                            <span className="mr-1">{isSelected ? "●" : "○"}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Frequency & Interface Standard (Shadcn Select) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Frequency & Interface Standard
                    </label>
                    <Select value={frequencyRange} onValueChange={setFrequencyRange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency & interface standard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DC to 6 GHz (General Avionics & VHF/UHF Comms)">DC to 6 GHz (General Avionics & VHF/UHF Comms)</SelectItem>
                        <SelectItem value="6 GHz to 26.5 GHz (X-Band & Ku-Band Radar)">6 GHz to 26.5 GHz (X-Band & Ku-Band Radar)</SelectItem>
                        <SelectItem value="26.5 GHz to 67+ GHz (Ka-Band & mmWave EW/Satcom)">26.5 GHz to 67+ GHz (Ka-Band & mmWave EW/Satcom)</SelectItem>
                        <SelectItem value="MIL-STD-1553 & ARINC 429 Bus Interface">MIL-STD-1553 & ARINC 429 Bus Interface</SelectItem>
                        <SelectItem value="400 Hz Aircraft AC / 28V DC Avionics Power">400 Hz Aircraft AC / 28V DC Avionics Power</SelectItem>
                        <SelectItem value="Modular PXIe / LXI Automated Test Integration">Modular PXIe / LXI Automated Test Integration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Equipment Requirements / Specs * */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Equipment Requirements / Signal Specs <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={equipmentRequirements}
                      onChange={(e) => setEquipmentRequirements(e.target.value)}
                      placeholder="Specify required bandwidth, instrument type, avionics standard, channel count, or target make/model..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Optional File Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Attach Spec Sheet / BOM / BOQ <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    {file ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50/60 border border-red-200 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <Paperclip className="w-4 h-4 text-red-600 shrink-0" />
                          <span className="font-medium text-gray-800 truncate">{file.name}</span>
                          <span className="text-gray-400 shrink-0">({(file.size / 1024).toFixed(0)} KB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-red-100 rounded-md text-red-600 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-gray-300 hover:border-red-400 bg-gray-50/50 hover:bg-red-50/30 rounded-xl p-2.5 text-center cursor-pointer transition-all"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
                          className="hidden"
                        />
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                          <Upload className="w-3.5 h-3.5 text-red-600" />
                          <span className="font-medium text-gray-700">Click to upload specifications</span>
                          <span className="text-[10px] text-gray-400">(PDF, Excel up to 10MB)</span>
                        </div>
                      </div>
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
                          <span>Transmitting Specifications...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Discuss Your Application</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Strictly confidential. NDA protection for defence & proprietary protocols.
                    </p>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PRODUCT CATEGORIES (6 DOMAINS)
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
              Aerospace & Defence – Product Categories
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Source high-precision instruments, avionics interface adapters, and certified microwave components through one dedicated partner.
            </p>
          </div>

          {/* 6 Category Cards Grid */}
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

                    {/* Bullet Items */}
                    <div className="space-y-2 mb-5 pt-3 border-t border-gray-100">
                      {cat.items.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
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
              onClick={scrollToForm}
              className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12 px-6"
            >
              <NexChipIcon className="w-8 h-8" />
              <span>Find Equipment for Your Application</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: APPLICATIONS ACROSS WORKFLOWS
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-[102rem] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Verification Workflows" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Equipment Requirements Across Aerospace & Defence Workflows
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Every phase—from component-level RF characterisation to LRU depot troubleshooting—demands measurement tools engineered for exact signal environments.
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
              Equipment Selection Starts with the Test Requirement
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
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-red-600 shadow-2xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                      {item.number}
                    </span>
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
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Common Inquiries" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find answers regarding aerospace instrumentation, avionics protocols, BOM sourcing, and procurement workflows.
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
                <span>Dedicated Aerospace & Defence Desk</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Have a Specialist Test or Measurement Requirement?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Share your aerospace or defence engineering requirements with eFocus Industrial. We can review the specifications and discuss suitable equipment sourcing options.
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

                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-semibold border border-white/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <Radio className="w-4 h-4 text-red-400" />
                  <span>Discuss Your Application</span>
                </button>
              </div>

              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 border-t border-white/10 mt-8">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Direct OEM Sourcing & Calibration
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-red-400" />
                  24–48h Turnaround on Technical BOQs
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
        submitterEmail={submitterEmail}
        title="Aerospace & Defence Sourcing Enquiry Submitted!"
        message="Our aerospace test engineering desk has received your application specs. A dedicated application engineer will review your interface and frequency requirements and get back to you within 24–48 hours."
      />
    </div>
  );
}
