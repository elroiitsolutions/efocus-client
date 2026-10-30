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
  Factory, 
  Cpu, 
  Layers, 
  Upload, 
  X, 
  Sliders, 
  FileSpreadsheet, 
  Cable, 
  Check, 
  Gauge, 
  Activity, 
  Network, 
  Monitor, 
  Zap, 
  Power, 
  Settings, 
  Compass, 
  Wrench,
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

export default function IndustrialAutomationPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Industrial Automation Equipment Sourcing | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    const targetDesc = "Source automation components, control equipment and industrial measurement instruments for machine building, production systems and plant operations with eFocus.";
    
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
  const [applicationFocus, setApplicationFocus] = useState("Machine Control & Automation");
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

  const scrollToForm = (prefillCategory?: string) => {
    if (prefillCategory && !selectedCategories.includes(prefillCategory)) {
      setSelectedCategories(prev => [...prev, prefillCategory]);
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const firstInput = formRef.current?.querySelector("input");
    firstInput?.focus();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 25 * 1024 * 1024) {
        alert("File size exceeds 25MB limit.");
        return;
      }
      setFile(selected);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleCategory = (catName: string) => {
    setSelectedCategories(prev => 
      prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
    );
  };

  // Submit Handler connected to backend FormSubmissionService
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      alert("Please provide at least a business email or phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Industrial Automation Equipment Sourcing Enquiry",
        form_type: "industrial_automation_sourcing",
        name: fullName.trim() || undefined,
        company_name: companyName.trim() || undefined,
        email: email.trim(),
        phone: phone.trim() || undefined,
        requirement_type: applicationFocus,
        part_numbers: selectedCategories.length > 0 ? selectedCategories.join(", ") : undefined,
        message: specifications.trim()
          ? `Application Focus: ${applicationFocus}\nCategories: ${selectedCategories.join(", ") || "General Automation Setup"}\n\nTechnical Specifications & Equipment Requirements:\n${specifications.trim()}`
          : `Application Focus: ${applicationFocus}\nCategories: ${selectedCategories.join(", ") || "General Automation Setup"}`,
        file: file || undefined,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setApplicationFocus("Machine Control & Automation");
      setSelectedCategories([]);
      setSpecifications("");
      removeFile();
    } catch (err: any) {
      console.error("Industrial Automation submission failed:", err);
      alert(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 12 Product Categories matching client spec exactly
  const productCategories = [
    {
      title: "PLC Systems & Accessories",
      desc: "Programmable logic controllers, I/O modules and related accessories.",
      badge: "Digital & Analog I/O",
      icon: Cpu,
      tags: ["Modular PLCs", "Compact PLCs", "Remote I/O", "Communication Modules"],
    },
    {
      title: "HMI Panels & Industrial Displays",
      desc: "Operator interfaces, industrial displays and panel accessories.",
      badge: "Touch & Ruggedised IP66",
      icon: Monitor,
      tags: ["TFT Touchscreens", "Industrial PCs", "Keypad Displays", "Mounting Brackets"],
    },
    {
      title: "Industrial Sensors",
      desc: "Proximity, photoelectric, temperature, pressure and position sensors.",
      badge: "High-Precision Detection",
      icon: Gauge,
      tags: ["Inductive Proximity", "Photoelectric", "RTD/Thermocouple", "Pressure Transducers"],
    },
    {
      title: "Drives & Motor Control",
      desc: "Variable frequency drives, motor starters and speed control equipment.",
      badge: "VFD & Servo Motion",
      icon: Activity,
      tags: ["AC Variable Frequency Drives", "Soft Starters", "Servo Drives", "Contactors"],
    },
    {
      title: "Industrial Power Supplies",
      desc: "DIN-rail power supplies, DC supplies and power conversion products.",
      badge: "DIN-Rail & Redundancy",
      icon: Zap,
      tags: ["24V DC Regulated", "Redundancy Modules", "Buffer Units", "DC-DC Converters"],
    },
    {
      title: "Relays & Switching Devices",
      desc: "Control relays, contactors, circuit protection and switching components.",
      badge: "Circuit Safety & Isolation",
      icon: Power,
      tags: ["Electromechanical Relays", "Solid State Relays (SSR)", "MCBs & MPCB", "Safety Relays"],
    },
    {
      title: "Industrial Cables & Connectors",
      desc: "Control cables, signal cables, communication cables and industrial connectors.",
      badge: "Shielded & Heavy-Duty",
      icon: Cable,
      tags: ["M12 & M8 Circular", "Profinet / Modbus Cable", "Drag Chain Flexible", "Heavy-Duty Multipin"],
    },
    {
      title: "Measurement & Monitoring Instruments",
      desc: "Digital multimeters, clamp meters, power analysers and electrical monitoring equipment.",
      badge: "Panel & Field Metrology",
      icon: Sliders,
      tags: ["Energy Monitoring Meters", "Clamp Multimeters", "Phase Indicators", "Insulation Testers"],
    },
    {
      title: "Data Acquisition Systems",
      desc: "DAQ modules, signal conditioning and data monitoring equipment.",
      badge: "Multi-Channel Logging",
      icon: Layers,
      tags: ["Analog Input Modules", "Signal Isolators", "Temperature Loggers", "Modbus Gateways"],
    },
    {
      title: "Industrial Communication Products",
      desc: "Ethernet switches, communication interfaces and industrial networking accessories.",
      badge: "Managed & Unmanaged",
      icon: Network,
      tags: ["Industrial Ethernet Switches", "RS-485 / RS-232 Converters", "Wireless Bridges", "Fieldbus Gateways"],
    },
    {
      title: "Pneumatic & Automation Components",
      desc: "Solenoid valves, pneumatic fittings, actuators and air preparation accessories.",
      badge: "Directional & Motion",
      icon: Settings,
      tags: ["Solenoid Valves", "Air Filter Regulators", "Push-in Fittings", "Cylinders & Actuators"],
    },
    {
      title: "Control Panel Accessories",
      desc: "Terminal blocks, enclosures, cable management and panel-mounting accessories.",
      badge: "Organised Panel Builds",
      icon: Boxes,
      tags: ["Push-in Terminal Blocks", "DIN-Rail Channels", "Wire Ducts & Glands", "Industrial Enclosures"],
    },
  ];

  // 6 Applications matching client spec exactly
  const applications = [
    {
      title: "Machine Control and Automation",
      desc: "Source PLCs, I/O modules, sensors and control accessories for machine-level automation and control panel requirements.",
      icon: Cpu,
      highlights: ["Logic Sequencing & Interlocks", "Sensor Integration", "Machine Safety Circuits"],
    },
    {
      title: "Production Line Monitoring",
      desc: "Identify measurement and data acquisition equipment for monitoring operating parameters, machine status and production processes.",
      icon: Activity,
      highlights: ["Throughput Tracking", "OEE Monitoring", "Sensor Telemetry Logging"],
    },
    {
      title: "Motor and Drive Applications",
      desc: "Find suitable drives, motor control equipment and electrical measurement instruments for speed control and motor performance checks.",
      icon: Settings,
      highlights: ["VFD Speed Regulation", "Torque Control", "Inrush & Current Monitoring"],
    },
    {
      title: "Industrial Communication",
      desc: "Source networking products, communication interfaces and compatible cables for data exchange between automation devices.",
      icon: Network,
      highlights: ["Ethernet/IP & Profinet", "Modbus RTU/TCP", "SCADA & Device Integration"],
    },
    {
      title: "Control Panel Development",
      desc: "Coordinate requirements for power supplies, relays, circuit protection, terminal blocks and panel accessories.",
      icon: Boxes,
      highlights: ["Panel Layout Optimization", "DIN-Rail Component Sourcing", "Thermal & Cable Routing"],
    },
    {
      title: "Plant Maintenance and Troubleshooting",
      desc: "Source electrical test instruments, replacement components and maintenance-related products for industrial equipment support.",
      icon: Wrench,
      highlights: ["Fault Diagnostics", "Component Replacement", "Predictive Metering"],
    },
  ];

  // 5 Why Choose eFocus Pillars matching client spec exactly
  const whyChoosePillars = [
    {
      title: "Multiple Product Categories Through One Sourcing Partner",
      desc: "Coordinate requirements across automation, electrical, connectivity, measurement and maintenance product categories.",
      icon: Layers,
    },
    {
      title: "Requirement-Based Product Identification",
      desc: "Share your specifications, existing part numbers or application details to help identify suitable product options.",
      icon: Compass,
    },
    {
      title: "Technical and Compatibility Consideration",
      desc: "Review important details such as voltage ratings, current ratings, I/O requirements, communication protocols, sensor types and connector specifications.",
      icon: Sliders,
    },
    {
      title: "Supplier Coordination",
      desc: "Manage product enquiries and supplier communication through a single sourcing contact.",
      icon: ShieldCheck,
    },
    {
      title: "Support for Project and Maintenance Requirements",
      desc: "Source products for new automation projects, control panel development, equipment upgrades and ongoing maintenance needs.",
      icon: Clock,
    },
  ];

  // 6 FAQs matching client spec exactly
  const faqs = [
    {
      q: "What industrial automation products can I source through eFocus Industrial?",
      a: "You can enquire about PLCs, HMI panels, sensors, drives, power supplies, relays, industrial cables, communication products, measurement instruments and control panel accessories.",
    },
    {
      q: "Can I submit a list of automation components for sourcing?",
      a: "Yes. Share your BOM, part numbers or product specifications. The requirement can be reviewed for suitable sourcing options.",
    },
    {
      q: "Can you help identify alternatives for an existing automation component?",
      a: "Share the manufacturer, model number and technical specifications of the existing component. Suitable alternatives can be explored based on compatibility and application requirements.",
    },
    {
      q: "Can I source components for a new control panel project?",
      a: "Yes. You can submit the component list or project requirements covering control, power distribution, protection, connectivity and panel accessories.",
    },
    {
      q: "Do you support recurring industrial automation purchases?",
      a: "You can share your recurring requirements for sourcing coordination and repeat purchase enquiries.",
    },
    {
      q: "What information should I provide when requesting a quotation?",
      a: "Include the product name, manufacturer or part number, technical specifications, required quantity and any relevant application details.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fbfcfd] text-[#0d0f11] flex flex-col items-center">
      
      {/* =========================================================================
          SECTION 1: HERO & SOURCING ENQUIRY FORM
          ========================================================================= */}
      <section className="w-full pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="w-full max-w-[102rem] mx-auto">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-6 sm:mb-8">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-600">Industries</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">Industrial Automation</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2">
                <NexBadge label="Industrial Automation & Control Sourcing" />
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#AF0202] border border-red-100 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5" />
                  Plant & Machine Engineering
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0d0f11] tracking-tight leading-[1.12]">
                Industrial Automation Equipment for Smarter, More Reliable Operations
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Source automation components, control equipment and industrial measurement instruments for machine building, production systems and plant operations. eFocus helps engineering and procurement teams coordinate technical requirements across multiple product categories and suppliers.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToForm()}
                  className="px-6 py-3.5 rounded-full bg-[#AF0202] hover:bg-[#8e0202] text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <NexChipIcon className="w-6 h-6" />
                  <span>Share Your Automation Requirement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#categories"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold transition-all shadow-2xs hover:border-gray-300"
                >
                  Explore Automation Products
                </a>
              </div>

              {/* Verified Performance Stats Ribbon */}
              <div className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80">
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#AF0202] tracking-tight">
                    <CountUp value={12} suffix="+" duration={1400} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Product Categories
                  </p>
                </div>

                <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#AF0202] tracking-tight">
                    <CountUp value={200} suffix="+" duration={1600} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Control & Sensor Brands
                  </p>
                </div>

                <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#AF0202] tracking-tight">
                    <span>24–48h</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Technical Quote Turnaround
                  </p>
                </div>
              </div>

              {/* Trust & Compliance Badges */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500 pt-1">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Genuine Authorized Sourcing
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Multi-Category Single PO
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-amber-600" />
                  BOM Cross-Referencing
                </span>
              </div>

            </div>

            {/* Right Column: Sourcing Enquiry Form */}
            <div ref={formRef} className="lg:col-span-5 w-full">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_24px_60px_rgba(175,2,2,0.08)]">
                
                {/* Accent Top Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-[#AF0202] to-black" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Share Automation Requirement
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Get a consolidated technical quotation for control & plant hardware.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center shrink-0">
                    <Factory className="w-5 h-5" />
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
                        placeholder="e.g. Suresh Kumar"
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
                        placeholder="e.g. Precision Automation Ltd"
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
                        placeholder="suresh@company.com"
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
                        placeholder="+91 98400 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Application Focus */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Automation Application Focus
                    </label>
                    <Select value={applicationFocus} onValueChange={setApplicationFocus}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select application" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Machine Control & Automation">Machine Control & Automation</SelectItem>
                        <SelectItem value="Production Line Monitoring">Production Line Monitoring</SelectItem>
                        <SelectItem value="Motor & Drive Applications">Motor & Drive Applications</SelectItem>
                        <SelectItem value="Industrial Communication & Networking">Industrial Communication & Networking</SelectItem>
                        <SelectItem value="Control Panel Development">Control Panel Development</SelectItem>
                        <SelectItem value="Plant Maintenance & Troubleshooting">Plant Maintenance & Troubleshooting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Product Categories Required (Multi-Select Chips) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-gray-700">
                        Product Categories Required
                      </label>
                      <span className="text-[11px] text-gray-400">Click to select multiple</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1.5 rounded-xl bg-gray-50 border border-gray-200">
                      {[
                        "PLCs & I/O",
                        "HMI & Displays",
                        "Sensors",
                        "Drives & VFD",
                        "Power Supplies",
                        "Relays & Switches",
                        "Cables & Connectors",
                        "Measurement & Meters",
                        "DAQ Systems",
                        "Industrial Networking",
                        "Pneumatics",
                        "Panel Accessories",
                      ].map((cat) => {
                        const isSelected = selectedCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? "bg-red-600 text-white shadow-2xs"
                                : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"
                            }`}
                          >
                            <span>{cat}</span>
                            {isSelected && <Check className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Technical Specifications / Part Numbers */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Equipment Specifications / MPNs / Quantities
                    </label>
                    <textarea
                      rows={2}
                      value={specifications}
                      onChange={(e) => setSpecifications(e.target.value)}
                      placeholder="e.g. Siemens S7-1200 CPU 1214C (Qty: 2), Omron E2E Proximity Sensors (Qty: 20), Weidmüller 24V 10A PSU..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* File Upload (Drag & Drop or Browse) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Upload Component List / BOM (Optional)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".xlsx,.xls,.csv,.pdf,.doc,.docx"
                      className="hidden"
                    />

                    {file ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50/60 border border-red-200 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <FileSpreadsheet className="w-4 h-4 text-red-600 shrink-0" />
                          <span className="font-medium text-gray-900 truncate">{file.name}</span>
                          <span className="text-gray-400">({(file.size / 1024).toFixed(0)} KB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 hover:border-red-400 rounded-xl p-3 text-center cursor-pointer transition-all bg-gray-50/50 hover:bg-red-50/20 group"
                      >
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 group-hover:text-red-700">
                          <Upload className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                          <span>Drag & drop BOM or <strong className="text-red-600 underline">browse</strong></span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Supports Excel (.xlsx), CSV, PDF (up to 25MB)
                        </p>
                      </div>
                    )}
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
                          <span>Submitting Automation Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Submit Automation Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Official B2B response within 24–48 hours. Landed GST invoice.
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
      <section id="categories" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Comprehensive Hardware Portfolio" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Equipment for Industrial Control, Automation & Plant Operations
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find equipment and components for industrial control, machine automation, monitoring and maintenance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 hover:shadow-[0_12px_32px_rgba(175,2,2,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/90 text-[#AF0202] flex items-center justify-center group-hover:scale-110 group-hover:bg-red-50 transition-all duration-300 shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100/80 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-red-700 transition-colors">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors mb-2">
                      {cat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      {cat.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cat.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium text-gray-500 bg-white border border-gray-200/80 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollToForm(cat.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#AF0202] text-gray-700 hover:text-white border border-gray-200 hover:border-[#AF0202] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group/btn"
                  >
                    <span>Enquire About {cat.title.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: APPLICATIONS (6 APPLICATIONS)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Target Industry Applications" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Applied Automation Across Machine & Plant Lifecycles
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From machine-level control panels to plant-wide industrial communications, explore how our sourcing solutions support your automation projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, idx) => {
              const Icon = app.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {app.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      {app.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 space-y-1.5">
                    {app.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-gray-500">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: WHY CHOOSE eFOCUS INDUSTRIAL? (5 PILLARS)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Value Driven Sourcing" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Why Choose eFocus Industrial?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We eliminate procurement friction for automation teams, OEM builders, and plant managers through single-point technical sourcing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoosePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#fbfcfd] border border-gray-200/80 hover:border-red-200 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 text-[#AF0202] flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: FREQUENTLY ASKED QUESTIONS (6 FAQS)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <NexBadge label="Common Sourcing Questions" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Clear answers regarding industrial automation parts, multi-brand procurement, BOM matching, and quotations.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/90 bg-white overflow-hidden transition-all duration-200 shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-red-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
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
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#111315] via-[#1a1c1e] to-black text-white relative overflow-hidden">
        
        {/* Glow & Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#AF0202_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <NexBadge label="Initiate Automation Procurement" />
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Planning an Industrial Automation Project?
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From control components and sensors to industrial networking and measurement equipment, share your requirements with eFocus Industrial.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToForm()}
              className="px-8 py-4 rounded-full bg-[#AF0202] hover:bg-[#8e0202] text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <NexChipIcon className="w-6 h-6" />
              <span>Submit Your Automation Requirement</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollToForm()}
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
            >
              Discuss Your Application
            </button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              BOM line-item breakdown
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Authorized factory warranties
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Consolidated single GST invoicing
            </span>
          </div>

        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Industrial Automation Enquiry Submitted"
        message="Thank you for sharing your automation requirements. Our engineering procurement team will review your specifications and revert within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
