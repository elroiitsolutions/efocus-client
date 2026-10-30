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
  Zap, 
  Activity, 
  Layers, 
  Upload, 
  Paperclip, 
  X, 
  Sliders,
  BarChart3,
  FileSpreadsheet,
  Cable,
  Sparkles,
  Check,
  Flame,
  BatteryCharging,
  Gauge,
  Sun,
  ShieldAlert
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

export default function PowerEnergyPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Power & Energy Testing Equipment Sourcing | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    const targetDesc = "Source power analysers, programmable power supplies, electronic loads, electrical measurement instruments, and energy testing equipment with eFocus Industrial.";
    
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

  // Form State
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [applicationFocus, setApplicationFocus] = useState("Power Converter Efficiency Evaluation");
  const [powerRating, setPowerRating] = useState("1 kW to 10 kW (Laboratory & Inverter Development)");
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
      setApplicationFocus(prefillTask);
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
        form_name: "Power & Energy Test Equipment Enquiry",
        form_type: "power_energy_sourcing",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: `Power & Energy Sourcing: ${applicationFocus}`,
        requirement_type: applicationFocus,
        power_rating: powerRating,
        product_categories: selectedCategories.length > 0 ? selectedCategories.join(", ") : undefined,
        message: specifications.trim() 
          ? `Application Focus: ${applicationFocus}\nPower Rating / Voltage: ${powerRating}\nCategories: ${selectedCategories.join(", ") || "General Power Test Setup"}\n\nTechnical Specifications & Equipment Requirements:\n${specifications.trim()}`
          : `Application Focus: ${applicationFocus}\nPower Rating / Voltage: ${powerRating}\nCategories: ${selectedCategories.join(", ") || "General Power Test Setup"}`,
        file: file || undefined,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setApplicationFocus("Power Converter Efficiency Evaluation");
      setPowerRating("1 kW to 10 kW (Laboratory & Inverter Development)");
      setSelectedCategories([]);
      setSpecifications("");
      removeFile();
    } catch (err: any) {
      console.error("Power & Energy submission failed:", err);
      alert(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 12 Product Categories matching client spec exactly
  const productCategories = [
    {
      title: "Power Analysers",
      desc: "For measuring electrical power, efficiency, harmonics, and other power-related parameters.",
      badge: "High-Bandwidth & Multi-Channel",
      icon: BarChart3,
      tags: ["Conversion Efficiency (η)", "Harmonics Analysis", "0.01% Accuracy", "Multi-Phase 1P/3P"],
    },
    {
      title: "Programmable AC Power Sources",
      desc: "For supplying controlled AC power during equipment development and electrical testing.",
      badge: "Grid Simulation & Harmonics",
      icon: Zap,
      tags: ["Arbitrary Waveforms", "Voltage Dips & Interruptions", "45 Hz - 1000 Hz", "Regenerative Option"],
    },
    {
      title: "Programmable DC Power Supplies",
      desc: "For controlled DC power delivery in electrical, electronic, and power conversion test setups.",
      badge: "Clean High-Power DC",
      icon: Sliders,
      tags: ["Wide V/I Envelopes", "Low Ripple & Noise", "Fast Slew Rate", "Remote Sensing"],
    },
    {
      title: "Electronic Loads",
      desc: "For evaluating power supplies, converters, chargers, and other power-producing devices under controlled loading conditions.",
      badge: "Dynamic CC / CV / CR / CP",
      icon: Layers,
      tags: ["Transient Step Response", "Short-Circuit Testing", "Battery Discharge", "Parallel Master-Slave"],
    },
    {
      title: "Regenerative Electronic Loads",
      desc: "For applications requiring energy recovery during suitable electronic load testing.",
      badge: "Up to 96% Energy Grid Feedback",
      icon: Activity,
      tags: ["Low Heat Dissipation", "Substantial Energy Savings", "Bi-Directional Sourcing", "High-Power Density"],
    },
    {
      title: "Digital Multimeters & Electrical Measurement Instruments",
      desc: "For measuring voltage, current, resistance, and other electrical parameters.",
      badge: "High Resolution & Bench DMM",
      icon: Gauge,
      tags: ["6.5 to 8.5 Digits", "True RMS Measurements", "Kelvin 4-Wire Sense", "Isolated Digitizing"],
    },
    {
      title: "Power Quality Analysers",
      desc: "For investigating harmonics, voltage variations, power factor, and other power quality parameters.",
      badge: "IEC 61000-4-30 Class A",
      icon: Flame,
      tags: ["Flicker & Sags/Swells", "Transient Capture", "Power Factor (cos φ)", "Harmonics up to 50th"],
    },
    {
      title: "Oscilloscopes & Differential Probes",
      desc: "For observing switching waveforms, transient behaviour, and electrical signals in power electronic circuits.",
      badge: "High-Voltage Isolation",
      icon: Activity,
      tags: ["GaN/SiC High CMRR", "Optically Isolated Probes", "Switching Loss Analysis", "Double-Pulse Test"],
    },
    {
      title: "Energy Meters & Measurement Systems",
      desc: "For electrical energy measurement and monitoring applications.",
      badge: "Sub-Metering & Smart Grid",
      icon: Gauge,
      tags: ["Active / Reactive kWh", "Data Logging", "RS-485 / Modbus", "Class 0.2S Accuracy"],
    },
    {
      title: "Battery Testing & Measurement Equipment",
      desc: "For evaluating battery voltage, current, capacity, and related electrical characteristics.",
      badge: "Cyclers & Internal Resistance",
      icon: BatteryCharging,
      tags: ["AC IR / DC IR Metrology", "Cell Balancing", "Charge/Discharge Profiling", "State-of-Health (SoH)"],
    },
    {
      title: "Data Acquisition & Monitoring Systems",
      desc: "For collecting electrical and operating data from test setups and energy systems.",
      badge: "Multi-Channel Temperature & V/I",
      icon: Cable,
      tags: ["High-Voltage DAQ Modules", "Thermocouple Logging", "Isolated Transducers", "LXI / PXIe"],
    },
    {
      title: "Electrical Safety & Insulation Testing Instruments",
      desc: "For insulation resistance, continuity, and applicable electrical safety measurements.",
      badge: "Hipot & Ground Bond",
      icon: ShieldAlert,
      tags: ["Dielectric Breakdown", "Megohm Insulation", "Ground Continuity", "IEC / UL Safety Standards"],
    },
  ];

  // 6 Applications matching client spec exactly
  const applications = [
    {
      title: "Power Converter Efficiency Evaluation",
      desc: "AC/DC converters, DC/DC converters, and inverters need to be evaluated for input-output performance and conversion losses. Power analysers and appropriate measurement accessories help engineers examine efficiency and electrical behaviour.",
      icon: Zap,
      category: "Power Conversion",
      tags: ["Conversion Losses", "Efficiency Curves (η)", "Total Harmonic Distortion", "Input/Output Power"],
    },
    {
      title: "Inverter and Renewable Energy Testing",
      desc: "Solar inverters and other renewable energy conversion systems require evaluation under different electrical operating conditions. Programmable AC/DC sources, electronic loads, and power analysers can support relevant laboratory test setups.",
      icon: Sun,
      category: "Renewable & Solar",
      tags: ["MPPT Tracking Accuracy", "Anti-Islanding Validation", "Grid Interconnection", "Low Voltage Ride-Through"],
    },
    {
      title: "Battery Energy Storage Systems",
      desc: "Battery storage applications require electrical measurements during charging, discharging, and performance evaluation. Suitable battery test equipment, power supplies, and electronic loads can support these activities.",
      icon: BatteryCharging,
      category: "BESS & Energy Storage",
      tags: ["C-Rate Cycling", "Capacity Degradation", "Thermal Rise", "Internal Impedance"],
    },
    {
      title: "Power Quality Investigation",
      desc: "Electrical networks can experience harmonics, voltage fluctuations, and power factor issues. Power quality analysers help engineers measure and investigate these parameters.",
      icon: Flame,
      category: "Grid & Distribution",
      tags: ["Harmonic Pollution", "Voltage Sags & Swells", "Displacement Power Factor", "Energy Audits"],
    },
    {
      title: "Switching Power Supply Validation",
      desc: "Power supply development involves examining switching waveforms, ripple, transient response, and electrical performance. Oscilloscopes, differential probes, and electronic loads support these measurement tasks.",
      icon: Activity,
      category: "SMPS & Topology",
      tags: ["Switching Transients", "Output Ripple (mVpp)", "Loop Stability / Bode Plot", "Dynamic Step Load"],
    },
    {
      title: "Electrical Equipment Testing",
      desc: "Electrical equipment manufacturers and engineering laboratories require instruments for voltage, current, insulation, continuity, and other electrical measurements.",
      icon: ShieldAlert,
      category: "Compliance & Safety",
      tags: ["Hipot Withstand", "Insulation Resistance", "Protective Earth Bond", "Dielectric Stress"],
    },
  ];

  // 5 Why Choose eFocus Industrial Pillars matching client spec exactly
  const whyPoints = [
    {
      number: "01",
      title: "Power Rating Consideration",
      desc: "Review voltage, current, power, frequency, and load requirements before identifying suitable test equipment.",
      icon: Zap,
    },
    {
      number: "02",
      title: "Measurement Accuracy and Bandwidth",
      desc: "Consider measurement accuracy, bandwidth, sampling capability, and signal characteristics for the intended electrical test.",
      icon: Gauge,
    },
    {
      number: "03",
      title: "Source and Load Equipment Options",
      desc: "Explore programmable power sources and electronic loads for controlled electrical testing applications.",
      icon: Sliders,
    },
    {
      number: "04",
      title: "Complete Measurement Setup Consideration",
      desc: "Include appropriate probes, current sensors, cables, and measurement accessories alongside the primary instruments.",
      icon: Cable,
    },
    {
      number: "05",
      title: "Application-Based Equipment Review",
      desc: "Share the system specifications and test objectives to help identify relevant instruments and sourcing options.",
      icon: FileSpreadsheet,
    },
  ];

  // 6 FAQs matching client spec exactly
  const faqs = [
    {
      q: "What equipment can I source for power electronics testing?",
      a: "Enquiries may include power analysers, programmable AC/DC sources, electronic loads, oscilloscopes, differential probes, multimeters, and electrical measurement accessories.",
    },
    {
      q: "Which instrument is used to measure power conversion efficiency?",
      a: "A suitable power analyser can measure input and output electrical parameters to calculate conversion efficiency. Instrument selection depends on the power level, waveform characteristics, bandwidth, and required accuracy.",
    },
    {
      q: "Can I source equipment for solar inverter testing?",
      a: "Yes. Share the inverter ratings, AC/DC operating ranges, power levels, and test objectives to review suitable sourcing options.",
    },
    {
      q: "What equipment is used for battery energy storage testing?",
      a: "Depending on the battery and test requirements, equipment may include battery testers, programmable power supplies, electronic loads, and electrical measurement instruments.",
    },
    {
      q: "How do I select an electronic load?",
      a: "Important factors include voltage range, current range, power rating, operating modes, dynamic response, and whether regenerative operation is required.",
    },
    {
      q: "Can I submit a complete power testing laboratory requirement?",
      a: "Yes. Share your equipment list, technical specifications, and quantities for sourcing review.",
    },
  ];

  return (
    <div className="bg-[#fafbfc] min-h-screen text-[#0d0f11] font-sans antialiased overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE TECHNICAL SOURCING FORM
          ========================================================================= */}
      <section 
        id="power-energy-hero"
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
            <span className="text-red-600 font-semibold">Power & Energy</span>
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
                <span>POWER & ENERGY TEST SOLUTIONS</span>
              </div>

              {/* Main Heading (Exact Client Title) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Measure Power.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Evaluate Efficiency.
                </span>{" "}
                Validate Performance.
              </h1>

              {/* Subtitle & Value Proposition (Exact Client Copy) */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-4 animate-in fade-in slide-in-from-left-8 duration-700">
                Power generation, conversion, distribution, and storage systems require accurate electrical measurements at different stages of operation. Understanding voltage, current, power quality, and conversion losses is essential when evaluating electrical and energy systems.
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                eFocus helps power engineering teams, energy equipment manufacturers, and R&D laboratories source electrical test instruments, programmable power equipment, and measurement accessories for their applications.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={() => scrollToForm()}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Discuss Your Application</span>
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
                {/* Stat 1: Up to 1500V / High Power Testing */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    <CountUp value={1500} suffix="V" duration={1600} />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>High Voltage DC/AC</span>
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Solar inverters & BESS
                  </p>
                </div>

                {/* Stat 2: 96% Regenerative Energy Recovery */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    <span>96%</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Regenerative Recovery</span>
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Energy grid feedback loads
                  </p>
                </div>

                {/* Stat 3: 24-48h Sourcing Review */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    <CountUp value={24} suffix="–48h" duration={1400} />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Fast Turnaround</span>
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Direct OEM technical review
                  </p>
                </div>
              </div>

              {/* Value Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  NABL Traceable Calibration
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  High-Voltage Differential Probes
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-red-600" />
                  Single Landed GST Invoicing
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
                    Discuss Your Application
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Share your power ratings, inverter specs, or lab equipment requirements for a tailored technical proposal.
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
                        placeholder="e.g. Anand Kulkarni"
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
                        placeholder="e.g. SunGrid Energy Systems"
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
                        placeholder="engineering@sungrid.com"
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

                  {/* Application Focus Select */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Primary Application Focus
                    </label>
                    <Select value={applicationFocus} onValueChange={setApplicationFocus}>
                      <SelectTrigger className="w-full h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Select application focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Power Converter Efficiency Evaluation">
                          Power Converter Efficiency Evaluation (AC/DC, DC/DC)
                        </SelectItem>
                        <SelectItem value="Inverter and Renewable Energy Testing">
                          Inverter & Renewable Energy Testing (Solar Inverters, MPPT)
                        </SelectItem>
                        <SelectItem value="Battery Energy Storage Systems">
                          Battery Energy Storage Systems (BESS, Charge/Discharge)
                        </SelectItem>
                        <SelectItem value="Power Quality Investigation">
                          Power Quality Investigation (Harmonics, Sags, Flicker)
                        </SelectItem>
                        <SelectItem value="Switching Power Supply Validation">
                          Switching Power Supply Validation (SMPS, Waveforms, Ripple)
                        </SelectItem>
                        <SelectItem value="Electrical Equipment Testing">
                          Electrical Equipment Testing (Hipot, Insulation, Safety)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Power Rating Select */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Target Power Rating / Voltage Range
                    </label>
                    <Select value={powerRating} onValueChange={setPowerRating}>
                      <SelectTrigger className="w-full h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Select power rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Under 1 kW (Low-Power SMPS & Embedded Power)">
                          Under 1 kW (Low-Power SMPS & Embedded Power)
                        </SelectItem>
                        <SelectItem value="1 kW to 10 kW (Laboratory & Inverter Development)">
                          1 kW to 10 kW (Laboratory & Inverter Development)
                        </SelectItem>
                        <SelectItem value="10 kW to 50 kW (Commercial Inverters & Industrial Drives)">
                          10 kW to 50 kW (Commercial Inverters & Industrial Drives)
                        </SelectItem>
                        <SelectItem value="50 kW to 500+ kW (Grid-Tied BESS & Heavy Power)">
                          50 kW to 500+ kW (Grid-Tied BESS & Heavy Power)
                        </SelectItem>
                        <SelectItem value="High-Voltage Insulation up to 5 kV / 10 kV">
                          High-Voltage Insulation up to 5 kV / 10 kV
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
                        "Power Analysers",
                        "Programmable AC Sources",
                        "Programmable DC Supplies",
                        "Electronic Loads",
                        "Regenerative Loads",
                        "Power Quality Analysers",
                        "HV Differential Probes",
                        "Battery Testing Systems",
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

                  {/* Technical Specifications / Target Instruments */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Technical Specifications / Target Instruments
                    </label>
                    <textarea
                      rows={2}
                      value={specifications}
                      onChange={(e) => setSpecifications(e.target.value)}
                      placeholder="e.g. 3-phase power analyser with 0.05% accuracy, 30 kW regenerative electronic load, Chroma/Yokogawa preference, 1000V differential probe..."
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
                            Upload BOM, BOQ or Electrical Specs (XLSX, CSV, PDF up to 25MB)
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
                          <span>Discuss Your Application</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Strictly confidential. Commercial NDA protection for proprietary power electronics & laboratory setups.
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
              Equipment for Power & Energy Test Systems
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Source high-precision power analysers, high-voltage programmable sources, regenerative electronic loads, and safety test hardware through one dedicated partner.
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

                    {/* Description (Exact Client Text) */}
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
              <span>Enquire About Power & Energy Equipment</span>
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
              Applications Across Power & Energy Systems
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From efficiency mapping to renewable inverter validation and grid compliance, configure instrumentation around your exact electrical test objectives.
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

                    {/* Exact Client Application Text */}
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
              Why Choose eFocus Industrial?
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
                  Need Help Sizing Power Testing Equipment?
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Send us your voltage levels, current requirements, dynamic load profiles, or inverter schematics. Our technical desk will help review compatible instrument topologies.
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
              Find answers regarding power electronics test instruments, conversion efficiency, solar inverter validation, and battery testing setups.
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
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in duration-300">
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
                <span>Dedicated Power & Energy Desk</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Building or Upgrading a Power Testing Setup?
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-8">
                Whether you are evaluating converters, testing inverters, analysing power quality, or working on battery energy storage, share your technical requirements with eFocus Industrial.
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
                  Authorized Power Instrumentation
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Single Landed GST Invoicing
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
        title="Power & Energy Sourcing Enquiry Received!"
        message={`Thank you for your enquiry. Your requirement has been logged in our system. Our technical power engineering team will review your specifications and contact you at ${submitterEmail} within 24 to 48 hours.`}
        submitterEmail={submitterEmail}
      />
    </div>
  );
}
