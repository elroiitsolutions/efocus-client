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
  Stethoscope, 
  FlaskConical, 
  Layers, 
  Upload, 
  X, 
  FileSpreadsheet, 
  Cable, 
  Check, 
  Gauge, 
  Activity, 
  Zap, 
  Thermometer, 
  Droplets, 
  Scale, 
  ShieldAlert, 
  Boxes, 
  Compass, 
  Sliders, 
  Wrench,
  Microscope
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

export default function PharmaMedicalPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Pharma & Medical Equipment Sourcing India | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    const targetDesc = "Source laboratory instruments, measurement equipment, electrical testing tools and production accessories for pharmaceutical and medical device manufacturing.";
    
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
  const [applicationFocus, setApplicationFocus] = useState("Pharmaceutical Quality Control Laboratories");
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
        form_name: "Pharma & Medical Equipment Sourcing Enquiry",
        form_type: "pharma_medical_sourcing",
        name: fullName.trim() || undefined,
        company_name: companyName.trim() || undefined,
        email: email.trim(),
        phone: phone.trim() || undefined,
        requirement_type: applicationFocus,
        part_numbers: selectedCategories.length > 0 ? selectedCategories.join(", ") : undefined,
        message: specifications.trim()
          ? `Application Focus: ${applicationFocus}\nCategories: ${selectedCategories.join(", ") || "General Pharma/Medical Setup"}\n\nTechnical Specifications & Equipment Requirements:\n${specifications.trim()}`
          : `Application Focus: ${applicationFocus}\nCategories: ${selectedCategories.join(", ") || "General Pharma/Medical Setup"}`,
        file: file || undefined,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setApplicationFocus("Pharmaceutical Quality Control Laboratories");
      setSelectedCategories([]);
      setSpecifications("");
      removeFile();
    } catch (err: any) {
      console.error("Pharma & Medical submission failed:", err);
      alert(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 12 Product Categories matching client spec exactly
  const productCategories = [
    {
      title: "Laboratory Measurement Instruments",
      desc: "Digital multimeters, precision measurement tools and electrical testing instruments.",
      badge: "High-Resolution Bench & Handheld",
      icon: Gauge,
      tags: ["6.5-8.5 Digit DMMs", "True RMS Metrology", "Kelvin 4-Wire Sense", "Isolated Digitizers"],
    },
    {
      title: "Temperature Measurement Equipment",
      desc: "Digital thermometers, temperature probes, sensors and monitoring accessories.",
      badge: "High-Accuracy RTD & Thermocouple",
      icon: Thermometer,
      tags: ["PT100/PT1000 Probes", "Calibrated Digital Dataloggers", "Multi-Point Sensors", "Cold Chain Loggers"],
    },
    {
      title: "Humidity & Environmental Monitoring",
      desc: "Humidity meters, environmental sensors and monitoring instruments.",
      badge: "Cleanroom Compliance",
      icon: Droplets,
      tags: ["%RH Transmitters", "Dew Point Meters", "Cleanroom Differential Pressure", "Aerosol Particle Counters"],
    },
    {
      title: "Analytical Laboratory Equipment",
      desc: "Laboratory instruments and accessories for measurement and analysis applications.",
      badge: "QC & Analytical Chemistry",
      icon: Microscope,
      tags: ["pH & Conductivity Meters", "Spectrophotometer Accessories", "Refractometers", "Titration Tools"],
    },
    {
      title: "Weighing & Measurement Accessories",
      desc: "Laboratory balances and related measurement accessories, subject to sourcing availability.",
      badge: "Analytical & Micro Precision",
      icon: Scale,
      tags: ["0.1mg Precision Balances", "Draft Shields", "Calibration Weights (Class E2/F1)", "Anti-Vibration Tables"],
    },
    {
      title: "Power Supplies & Electronic Loads",
      desc: "Programmable power supplies and electronic loads for electrical and electronic testing.",
      badge: "Low-Noise & Medical Grade",
      icon: Zap,
      tags: ["Clean DC Bench Sourcing", "Leakage Current Isolation", "Programmable Slew", "Battery Cyclers"],
    },
    {
      title: "Oscilloscopes & Signal Measurement Instruments",
      desc: "Instruments for testing electronic circuits and medical device electronics.",
      badge: "Medical Embedded Circuit Validation",
      icon: Activity,
      tags: ["Mixed Signal (MSO)", "Differential Probing", "Low-Noise Analog Frontend", "Serial Bus Decoding"],
    },
    {
      title: "Data Acquisition Systems",
      desc: "Data acquisition modules, signal conditioning and measurement accessories.",
      badge: "Multi-Channel Validation",
      icon: Layers,
      tags: ["Isolated Temperature & Voltage", "Automated DAQ Chassis", "FDA 21 CFR Part 11 Audit Trail", "USB/Ethernet DAQ"],
    },
    {
      title: "ESD Protection Products",
      desc: "ESD mats, wrist straps, grounding accessories and workstation protection products.",
      badge: "Cleanroom Safe ANSI/ESD S20.20",
      icon: ShieldAlert,
      tags: ["Dissipative Table Mats", "Grounding Hardware", "Continuous Monitors", "ESD Ionization Bars"],
    },
    {
      title: "Cleanroom & Laboratory Consumables",
      desc: "Selected handling, workstation and laboratory support products.",
      badge: "Lint-Free & Sterilisation-Ready",
      icon: FlaskConical,
      tags: ["Cleanroom Wipes (ISO Class 4-6)", "Sterile Swabs", "Conductive Packaging", "ESD Tweezers & Tools"],
    },
    {
      title: "Cables, Connectors & Electrical Accessories",
      desc: "Test leads, connectors, adapters and electrical connectivity products.",
      badge: "Gold-Plated & Medical Grade",
      icon: Cable,
      tags: ["Silicone High-Flex Leads", "BNC & Banana Adapters", "Circular Medical Connectors", "Shielded Patch Leads"],
    },
    {
      title: "Workstations & Laboratory Setup Products",
      desc: "Technical workbenches, storage and supporting workstation equipment.",
      badge: "Ergonomic & Chemical Resistant",
      icon: Boxes,
      tags: ["Modular ESD Benches", "Overhead LED Task Lighting", "Laminar Flow Hood Accessories", "Component Storage Bins"],
    },
  ];

  // 6 Applications matching client spec exactly
  const applications = [
    {
      title: "Pharmaceutical Quality Control Laboratories",
      desc: "Source measurement instruments and laboratory accessories for routine testing, equipment checks and quality control workflows.",
      icon: FlaskConical,
      highlights: ["Batch Verification Metrology", "Instrument Calibration Tracking", "GLP/GMP Alignment"],
    },
    {
      title: "Production Environment Monitoring",
      desc: "Identify temperature, humidity and environmental measurement products for monitoring relevant operating conditions.",
      icon: Droplets,
      highlights: ["Cleanroom Humidity & Temp Tracking", "Differential Pressure Logging", "Storage Chamber Qualification"],
    },
    {
      title: "Medical Device Electronics Testing",
      desc: "Find oscilloscopes, power supplies, electronic loads and electrical measurement instruments for testing electronic assemblies used in medical devices.",
      icon: Activity,
      highlights: ["IEC 60601 Electrical Safety Checks", "Signal Integrity on Biosensors", "Leakage Current Verification"],
    },
    {
      title: "Medical Device Manufacturing",
      desc: "Source ESD protection, cables, connectors, test accessories and workstation products for electronics assembly and production activities.",
      icon: Stethoscope,
      highlights: ["EPA Production Workcells", "Medical Cable Assembly", "Packaging & Clean Handling"],
    },
    {
      title: "Research & Development Laboratories",
      desc: "Coordinate sourcing requirements for measurement instruments, data acquisition equipment and laboratory support products used in development and validation work.",
      icon: Microscope,
      highlights: ["Biomedical Sensor Prototyping", "Multi-Channel Telemetry DAQ", "Design Verification (DVT)"],
    },
    {
      title: "Equipment Maintenance & Electrical Checks",
      desc: "Source electrical measurement instruments, replacement accessories and related products for maintenance and troubleshooting activities.",
      icon: Wrench,
      highlights: ["Autoclave & Incubator Diagnostics", "Preventive Maintenance PM Tooling", "Rapid Spare Leads & Sensors"],
    },
  ];

  // 5 Why Choose eFocus Pillars matching client spec exactly
  const whyChoosePillars = [
    {
      title: "Sourcing Across Multiple Technical Categories",
      desc: "Coordinate requirements for laboratory instruments, electrical measurement products, ESD protection, connectivity and workstation equipment.",
      icon: Layers,
    },
    {
      title: "Requirement-Based Product Identification",
      desc: "Share product specifications, existing part numbers or application details to explore suitable sourcing options.",
      icon: Compass,
    },
    {
      title: "Attention to Technical Specifications",
      desc: "Consider measurement range, accuracy, resolution, sensor compatibility, electrical ratings and interface requirements when reviewing product options.",
      icon: Sliders,
    },
    {
      title: "Supplier Enquiry Coordination",
      desc: "Manage product enquiries and supplier communication through a single sourcing contact.",
      icon: ShieldCheck,
    },
    {
      title: "Support for Different Project Requirements",
      desc: "Source products for laboratory setup, production expansion, medical device development and equipment replacement requirements.",
      icon: Clock,
    },
  ];

  // 6 FAQs matching client spec exactly
  const faqs = [
    {
      q: "What products can I source for pharmaceutical and medical manufacturing?",
      a: "You can enquire about laboratory measurement instruments, temperature and humidity monitoring products, electrical test equipment, ESD products, cables, connectors and workstation accessories.",
    },
    {
      q: "Can I source laboratory instruments for pharmaceutical QC applications?",
      a: "You can share the instrument type, measurement requirements and specifications to explore suitable sourcing options.",
    },
    {
      q: "Can I source equipment for medical device electronics testing?",
      a: "Yes. You can enquire about oscilloscopes, programmable power supplies, electronic loads, multimeters, data acquisition systems and related test accessories.",
    },
    {
      q: "Do you supply cleanroom-certified equipment?",
      a: "Cleanroom suitability and certification depend on the specific product and manufacturer documentation. Share your environmental and compliance requirements so the product options can be checked.",
    },
    {
      q: "Can I submit a BOM for a laboratory or production setup?",
      a: "Yes. Share your BOM with part numbers, descriptions and quantities for sourcing review and supplier enquiry coordination.",
    },
    {
      q: "Can you help identify alternatives for an existing laboratory instrument?",
      a: "Share the manufacturer, model number and required measurement specifications. Alternative options can be explored based on the application and technical requirements.",
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
            <span className="text-red-600 font-semibold">Pharma & Medical</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2">
                <NexBadge label="Pharma & Medical Equipment Sourcing" />
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#AF0202] border border-red-100 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Cleanroom & Laboratory Engineering
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0d0f11] tracking-tight leading-[1.12]">
                Equipment Sourcing for Pharmaceutical & Medical Manufacturing
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                From laboratory measurements to production and quality control requirements, eFocus Industrial helps pharmaceutical companies, medical device manufacturers and research teams source technical equipment and supporting products across multiple suppliers.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToForm()}
                  className="px-6 py-3.5 rounded-full bg-[#AF0202] hover:bg-[#8e0202] text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <NexChipIcon className="w-6 h-6" />
                  <span>Share Your Requirement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#categories"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold transition-all shadow-2xs hover:border-gray-300"
                >
                  Explore Product Categories
                </a>
              </div>

              {/* Verified Performance Stats Ribbon */}
              <div className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80">
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#AF0202] tracking-tight">
                    <CountUp value={12} suffix="+" duration={1400} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Lab & Production Categories
                  </p>
                </div>

                <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#AF0202] tracking-tight">
                    <CountUp value={150} suffix="+" duration={1600} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Pharma & Medical Brands
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
                  100% Genuine Traceable Instruments
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Cleanroom & ESD Suitable Products
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Consolidated GST Invoicing
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
                      Share Your Requirement
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Get a single consolidated quote for pharma & medical equipment.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center shrink-0">
                    <FlaskConical className="w-5 h-5" />
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
                        placeholder="e.g. Dr. Priya Raman"
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
                        placeholder="e.g. BioMed Laboratories Pvt Ltd"
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
                        placeholder="priya.raman@biomed.com"
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
                      Application Focus
                    </label>
                    <Select value={applicationFocus} onValueChange={setApplicationFocus}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select application" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pharmaceutical Quality Control Laboratories">Pharmaceutical Quality Control Laboratories</SelectItem>
                        <SelectItem value="Production Environment Monitoring">Production Environment Monitoring</SelectItem>
                        <SelectItem value="Medical Device Electronics Testing">Medical Device Electronics Testing</SelectItem>
                        <SelectItem value="Medical Device Manufacturing">Medical Device Manufacturing</SelectItem>
                        <SelectItem value="Research & Development Laboratories">Research & Development Laboratories</SelectItem>
                        <SelectItem value="Equipment Maintenance & Electrical Checks">Equipment Maintenance & Electrical Checks</SelectItem>
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
                        "Lab Measurement",
                        "Temperature Probes",
                        "Humidity & Environment",
                        "Analytical Equipment",
                        "Weighing Balances",
                        "Power Supplies & Loads",
                        "Oscilloscopes",
                        "DAQ Modules",
                        "ESD Protection",
                        "Cleanroom Supplies",
                        "Cables & Leads",
                        "Workstations & Storage",
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
                      Equipment Specifications / Instrument Models / Quantities
                    </label>
                    <textarea
                      rows={2}
                      value={specifications}
                      onChange={(e) => setSpecifications(e.target.value)}
                      placeholder="e.g. Fluke 289 DMM (Qty: 2), Testo 175-H1 Temp/Humidity Loggers (Qty: 4), Class E2 Weight Set, ESD Table Matting..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* File Upload (Drag & Drop or Browse) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Upload Equipment List / BOM (Optional)
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
                          <span>Submitting Pharma / Medical Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Submit Pharma / Medical Enquiry</span>
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
              Equipment for Pharma Laboratories & Medical Device Manufacturing
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Explore product categories relevant to pharmaceutical production environments, laboratory operations and medical device manufacturing.
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
              Applied Solutions for Cleanrooms, Labs & Device Assembly
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From pharmaceutical testing benches to medical electronic circuit validation, explore where our sourcing portfolio supports your operations.
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
              We streamline technical sourcing for pharmaceutical QA/QC laboratories, cleanroom facilities, and medical device manufacturing.
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
              Clear answers regarding laboratory instruments, cleanroom compliance, medical electronics testing, and BOM procurement.
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
          <NexBadge label="Initiate Laboratory & Medical Sourcing" />
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Planning a Pharma or Medical Manufacturing Setup?
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Share your requirements for laboratory instruments, measurement equipment, production accessories and technical sourcing support.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToForm()}
              className="px-8 py-4 rounded-full bg-[#AF0202] hover:bg-[#8e0202] text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <NexChipIcon className="w-6 h-6" />
              <span>Submit Your Requirement</span>
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
              NABL / Traceable Calibration Options
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Cleanroom / ESD Grade Equipment
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
        title="Pharma & Medical Equipment Enquiry Submitted"
        message="Thank you for sharing your requirements. Our technical procurement specialists will review your specifications and revert with pricing and availability within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
