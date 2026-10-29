import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { NexChipIcon, NexBadge } from "@/components/ui/NexIcons";
import CountUp from "@/components/ui/CountUp";
import { 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Award, 
  TrendingUp, 
  ChevronDown, 
  Cpu, 
  Gauge, 
  Zap, 
  Wrench, 
  Boxes, 
  Building2, 
  Car, 
  Layers, 
  Repeat, 
  GraduationCap, 
  Factory, 
  Sparkles,
  AlertCircle,
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

export default function BomProcurementPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Industrial BOM Procurement & Sourcing Services India | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Streamline electronics manufacturing with eFocus Industrial. End-to-end BOM procurement, global component sourcing, EOL risk management, and single GST invoicing."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        "Streamline electronics manufacturing with eFocus Industrial. End-to-end BOM procurement, global component sourcing, EOL risk management, and single GST invoicing."
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
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requirementType, setRequirementType] = useState("Complete BOM");
  const [preferredBrands, setPreferredBrands] = useState("");
  const [deliveryTimeline, setDeliveryTimeline] = useState("Immediate (1-2 Weeks)");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Stats ribbon animation trigger
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Section Observer Triggers
  const [sourcingVisible, setSourcingVisible] = useState(false);
  const sourcingRef = useRef<HTMLElement>(null);

  const [qaVisible, setQaVisible] = useState(false);
  const qaRef = useRef<HTMLElement>(null);

  const [benefitsVisible, setBenefitsVisible] = useState(false);
  const benefitsRef = useRef<HTMLElement>(null);

  const [workflowVisible, setWorkflowVisible] = useState(false);
  const workflowRef = useRef<HTMLElement>(null);

  const [industriesVisible, setIndustriesVisible] = useState(false);
  const industriesRef = useRef<HTMLElement>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generic Intersection Observer hook for on-scroll animations
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
      handleObserve(sourcingRef.current, setSourcingVisible),
      handleObserve(qaRef.current, setQaVisible),
      handleObserve(benefitsRef.current, setBenefitsVisible),
      handleObserve(workflowRef.current, setWorkflowVisible),
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    setFileError(null);
    const validExtensions = [".xlsx", ".xls", ".csv", ".pdf"];
    const fileName = uploadedFile.name.toLowerCase();
    const isValid = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setFileError("Invalid file type. Please upload Excel (.xlsx, .xls), CSV (.csv), or PDF (.pdf).");
      return;
    }

    if (uploadedFile.size > 25 * 1024 * 1024) {
      setFileError("File exceeds 25MB maximum upload limit.");
      return;
    }

    setFile(uploadedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || !contactPerson.trim() || !email.trim()) {
      alert("Please fill in all required fields (Company Name, Contact Person, and Business Email).");
      return;
    }

    if (!file) {
      setFileError("Please upload your BOM file (Excel, CSV, or PDF).");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "BOM Procurement Inquiry",
        form_type: "bom_procurement",
        company_name: companyName.trim(),
        name: contactPerson.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        requirement_type: requirementType,
        preferred_brands: preferredBrands.trim() || undefined,
        delivery_timeline: deliveryTimeline,
        message: additionalDetails.trim() || `Requirement: ${requirementType}. Delivery: ${deliveryTimeline}. Brands: ${preferredBrands || "Any"}`,
        file: file,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setCompanyName("");
      setContactPerson("");
      setEmail("");
      setPhone("");
      setRequirementType("Complete BOM");
      setPreferredBrands("");
      setDeliveryTimeline("Immediate (1-2 Weeks)");
      setAdditionalDetails("");
      setFile(null);
      setFileError(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error("BOM submission failed:", err);
      alert(err.message || "Failed to submit BOM request. Please verify connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2 Data: What We Source
  const sourcingCategories = [
    {
      title: "Electronic Components & Connectivity",
      icon: Cpu,
      description: "Microcontrollers, ICs, passive components, industrial connectors, and cabling.",
      tags: ["Semiconductors", "Passive Pass-through", "Interconnects", "MIL-Spec Wire"],
    },
    {
      title: "Test & Measurement",
      icon: Gauge,
      description: "Oscilloscopes, multimeters, power analyzers, leads, and diagnostic probes.",
      tags: ["Digital Scopes", "Power Analyzers", "Traceable Calibrated", "Probes & Leads"],
    },
    {
      title: "Power & Electrical",
      icon: Zap,
      description: "DIN-rail power supplies, DC-DC modules, circuit breakers, and relays.",
      tags: ["DIN-Rail SMPS", "DC-DC Converters", "Switchgear", "Industrial Relays"],
    },
    {
      title: "SMT & Production",
      icon: Boxes,
      description: "Soldering stations, lead-free solder paste, flux, and PCB handling racks.",
      tags: ["Micro-Soldering", "Lead-Free Solder", "PCB Handling Racks", "Flux Chemistry"],
    },
    {
      title: "Tools & MRO",
      icon: Wrench,
      description: "Precision cutters, strippers, crimpers, fasteners, and maintenance supplies.",
      tags: ["ESD Torque Tools", "Precision Crimpers", "Factory Fasteners", "MRO Consumables"],
    },
    {
      title: "ESD, Lab & Workstations",
      icon: ShieldCheck,
      description: "Anti-static mats, wrist straps, modular workbenches, and fume extractors.",
      tags: ["S20.20 Standard", "Modular Benches", "Fume Extraction", "Anti-Static Mats"],
    },
  ];

  // Section 3 Data: Quality Assurance Comparison Table
  const comparisonRows = [
    {
      feature: "Lifecycle Protection",
      traditional: "Blind substitution; risk of buying EOL stock.",
      efocus: "Engineering BOM review with pre-approved alternates.",
      highlight: "Guaranteed Active Lifecycle",
    },
    {
      feature: "Invoicing & Compliance",
      traditional: "Multiple foreign currency transactions & customs hassle.",
      efocus: "Single INR landed quote with 100% GST compliance.",
      highlight: "100% GST & Zero Customs Headaches",
    },
    {
      feature: "Quality Verification",
      traditional: "Minimal incoming inspection.",
      efocus: "Visual, dimensional, and batch verification with full lot traceability.",
      highlight: "Full Lot & Certificate Traceability",
    },
    {
      feature: "Fulfillment Efficiency",
      traditional: "Fragmented shipments causing line delays.",
      efocus: "Consolidated kit delivery tailored for PCBA assembly lines.",
      highlight: "Line-Ready Consolidated Kits",
    },
  ];

  // Section 4 Data: Key Benefits
  const keyBenefits = [
    {
      number: "01",
      title: "Unified Purchasing",
      desc: "Combine electronic components, test instruments, power units, and shop-floor tools under a single Purchase Order.",
      pill: "Single PO Simplicity",
    },
    {
      number: "02",
      title: "Landed Rupee Pricing",
      desc: "Zero hidden import fees, full GST compliance, and transparent invoicing with zero exchange-rate volatility.",
      pill: "Transparent INR Landed",
    },
    {
      number: "03",
      title: "Proactive Engineering Review",
      desc: "In-house technical scrubbing to flag EOL, NRND, and long-lead components before order placement.",
      pill: "Zero Line Stoppages",
    },
    {
      number: "04",
      title: "One Point of Contact",
      desc: "Coordinate BOM-related enquiries, technical substitutions, and order follow-ups through one dedicated procurement partner.",
      pill: "Dedicated Key Account Team",
    },
  ];

  // Section 5 Data: How It Works
  const workflowSteps = [
    {
      step: "01",
      title: "Upload Requirements",
      desc: "Send your complete or partial bill of materials in Excel, CSV, or PDF format with MPNs or descriptions.",
      time: "Step 1",
    },
    {
      step: "02",
      title: "Receive Consolidated Quote",
      desc: "Get itemized INR pricing within 24–48 hours, complete with lead times, datasheets, and alternate options.",
      time: "24–48 Hours",
    },
    {
      step: "03",
      title: "Inspect & Pack",
      desc: "Components undergo batch inspection, counterfeit checks, and ESD-safe moisture barrier kit packaging.",
      time: "Quality Verified",
    },
    {
      step: "04",
      title: "Doorstep Delivery",
      desc: "Receive a single synchronized shipment with a local GST tax invoice and full certification documents.",
      time: "On-Time Fulfillment",
    },
  ];

  // Section 6 Data: Industries We Support
  const industries = [
    {
      name: "Electronics Manufacturers (EMS)",
      desc: "Scale batch builds with scheduled line deliveries, zero-counterfeit component verification, and consolidated BOM fulfillment.",
      icon: Cpu,
      tag: "Batch Production Ready",
    },
    {
      name: "Automotive & EV Companies",
      desc: "Source high-reliability semiconductors, automotive-grade connectors, battery testing tools, and power electronics for modern vehicle systems.",
      icon: Car,
      tag: "AEC-Q & ISO Ready",
    },
    {
      name: "OEMs & Tier-1 Suppliers",
      desc: "Streamline volume assembly with locked revision control, pre-approved drop-in alternates, and long-term blanket supply contracts.",
      icon: Factory,
      tag: "Blanket Supply & ARC",
    },
    {
      name: "R&D & Engineering Teams",
      desc: "Fast-track new product development with small-batch component packages, benchtop test equipment, and prototyping supplies.",
      icon: Sparkles,
      tag: "Rapid Prototyping",
    },
    {
      name: "Manufacturing & Industrial Plants",
      desc: "Keep operations running smoothly with shop-floor MRO supplies, precision tools, soldering systems, and workplace safety gear.",
      icon: Building2,
      tag: "Zero Downtime",
    },
    {
      name: "System Integrators",
      desc: "Source multi-brand control gear, power supplies, cables, and enclosures through a single procurement channel.",
      icon: Layers,
      tag: "Turnkey Integration",
    },
    {
      name: "Procurement Managers & Teams",
      desc: "Replace fragmented vendor management with one consolidated RFQ, a unified landed quote, and a single GST invoice.",
      icon: Repeat,
      tag: "Admin Overhead Slashed",
    },
    {
      name: "Universities & Research Labs",
      desc: "Equip educational labs and research facilities with calibrated test instruments, ESD workstations, and experimental components.",
      icon: GraduationCap,
      tag: "Educational & Research",
    },
  ];

  // Section 7 Data: FAQs
  const faqs = [
    {
      question: "What is BOM procurement?",
      answer:
        "BOM procurement means sourcing the products or components listed in a Bill of Materials. It helps purchasing teams manage multi-item sourcing through a coordinated process.",
    },
    {
      question: "Can I send a BOM with multiple brands?",
      answer:
        "Yes. You can submit requirements involving multiple brands. Sourcing depends on the requested products, supplier availability and feasibility.",
    },
    {
      question: "What if I don't know the part number?",
      answer:
        "Share the product description, specifications, application or any information you have. Our team can review the details and clarify what is needed.",
    },
    {
      question: "Can I request alternative products?",
      answer:
        "Yes, you can indicate whether alternatives are acceptable. Any proposed alternative should be checked for suitability and approved by your team before ordering.",
    },
    {
      question: "How do I get a quotation?",
      answer:
        "Upload your BOM through the enquiry form. After reviewing the requirements and clarifying any missing details, the team can provide a quotation based on available sourcing options.",
    },
    {
      question: "Does submitting a BOM confirm the price or availability?",
      answer:
        "No. The quotation process confirms the applicable pricing, availability and delivery terms before you place an order.",
    },
    {
      question: "Can I submit only a few items instead of a complete BOM?",
      answer:
        "Yes. You can submit selected line items if you do not need the entire BOM sourced.",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden">
      
      {/* Keyframe Styles for Rich Micro-Animations */}
      <style>{`
        @keyframes bomFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes bomGlowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.04); }
        }
      `}</style>

      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE BOM UPLOAD FORM
          ========================================================================= */}
      <section 
        id="bom-hero"
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
            <span className="text-red-600 font-semibold">BOM Procurement</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
            
            {/* Left Column: Heading, Value Prop, Animated Stats */}
            <div className="lg:col-span-7 flex flex-col items-start pt-2">
              
              {/* Eyebrow Pill with Pulsing Dot */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50/90 border border-red-200/80 text-red-700 text-xs sm:text-[13px] font-semibold tracking-wide mb-6 shadow-2xs hover:scale-[1.02] transition-transform animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#AF0202]"></span>
                </span>
                <span>One BOM. Multiple Requirements. One Procurement Partner.</span>
              </div>

              {/* Main H1 with Gradient Accent */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                BOM Procurement Services for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Engineering & Industrial
                </span>{" "}
                Requirements
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                Consolidate your entire BOM into a single PO, one clear quote, and one GST invoice.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Upload Your BOM</span>
                </button>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>Explore Workflow</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 12+ Years */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={12} suffix="+" duration={1800} />
                    ) : (
                      <span>12+</span>
                    )}
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 hidden sm:inline group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Years of Experience
                  </p>
                </div>

                {/* Stat 2: 90% Client Satisfaction */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={90} suffix="%" duration={1800} />
                    ) : (
                      <span>90%</span>
                    )}
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Client Satisfaction
                  </p>
                </div>

                {/* Stat 3: 10K+ Line Items/Year */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={10} suffix="K+" duration={1800} />
                    ) : (
                      <span>10K+</span>
                    )}
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 hidden sm:inline group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Line Items/Year
                  </p>
                </div>
              </div>

              {/* Compliance & SLA Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5 text-xs text-gray-500">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Landed GST Invoice
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-blue-600" />
                  24–48h Fast Turnaround
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100/90 hover:bg-gray-200/80 transition-colors px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  Zero Counterfeit Guaranteed
                </span>
              </div>

            </div>

            {/* Right Column: "Send Us Your BOM" Interactive Form */}
            <div ref={formRef} className="lg:col-span-5 w-full">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_24px_60px_rgba(175,2,2,0.08)]">
                
                {/* Form Header Accent Bar with Shimmer */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-[#AF0202] to-black" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Send Us Your BOM
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Submit requirements for an itemized INR landed quotation.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center shrink-0 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Company Name & Contact Person */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
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

                  {/* What Do You Need? Option Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      What Do You Need?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Complete BOM",
                        "Selected Line Items",
                        "Recurring Requirements",
                        "Project Requirements",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setRequirementType(item)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                            requirementType === item
                              ? "bg-red-50 border-red-500 text-red-700 font-semibold shadow-2xs scale-[1.01]"
                              : "bg-gray-50/60 border-gray-200 text-gray-700 hover:bg-gray-100/70"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Brands & Required Delivery Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Preferred Brands
                      </label>
                      <input
                        type="text"
                        value={preferredBrands}
                        onChange={(e) => setPreferredBrands(e.target.value)}
                        placeholder="e.g. TI, ST, Omron, Keysight"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Required Delivery Timeline
                      </label>
                      <Select
                        value={deliveryTimeline}
                        onValueChange={(val) => setDeliveryTimeline(val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select delivery timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Immediate (1-2 Weeks)">Immediate (1–2 Weeks)</SelectItem>
                          <SelectItem value="Standard (2-4 Weeks)">Standard (2–4 Weeks)</SelectItem>
                          <SelectItem value="Scheduled Monthly Deliveries">Scheduled Monthly Batches</SelectItem>
                          <SelectItem value="Flexible / Budget Planning">Flexible / Budgetary RFQ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Additional Details
                    </label>
                    <textarea
                      rows={2}
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Specify drop-in alternate acceptability, target landed price, or application specs..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Upload BOM File Area with Drag-and-Drop */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Upload BOM File <span className="text-red-500">*</span>
                    </label>
                    
                    {!file ? (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                          isDragging
                            ? "border-red-500 bg-red-50/60 scale-[1.02]"
                            : "border-gray-300 hover:border-red-400 bg-gray-50/40 hover:bg-gray-50/90"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".xlsx,.xls,.csv,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <UploadCloud className="w-8 h-8 mx-auto text-gray-400 group-hover:text-red-600 transition-colors mb-2 animate-bounce duration-[2000ms]" />
                        <p className="text-xs font-semibold text-gray-800">
                          Click to browse or drag & drop BOM file
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Accepted formats: <span className="font-semibold text-gray-700">Excel (.xlsx, .xls), CSV and PDF</span> (Max 25MB)
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 border border-red-200 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <FileText className="w-5 h-5 text-red-600 shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-semibold text-gray-900 truncate">{file.name}</p>
                            <p className="text-[10px] text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-100 transition-colors"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {fileError && (
                      <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {fileError}
                      </p>
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
                          <span>Processing Your BOM...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Request a BOM Quote</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Guaranteed NDA confidentiality & engineering pre-check.
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHAT WE SOURCE (6 Industrial Pillars)
          ========================================================================= */}
      <section 
        ref={sourcingRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 relative"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            sourcingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Comprehensive Industrial Sourcing" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              What We Source
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Consolidate every bill-of-materials category under a single vendor profile — from high-frequency semiconductors to shop-floor test benches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sourcingCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-6 sm:p-7 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(175,2,2,0.08)] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 hover:scale-[1.01] ${
                    sourcingVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#AF0202] group-hover:border-[#AF0202] flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs mb-5 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors leading-snug mb-2.5">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-200/60">
                    {cat.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-gray-200/80 text-[11px] font-medium text-gray-600 group-hover:border-red-200 group-hover:text-gray-900 group-hover:bg-red-50/50 transition-all duration-200"
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
          SECTION 3: QUALITY ASSURANCE & INDUSTRIAL COMPLIANCE (Comparison Matrix)
          ========================================================================= */}
      <section 
        ref={qaRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            qaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Risk-Free Procurement Matrix" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Quality Assurance & Industrial Compliance
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Why leading OEMs and EMS plants choose eFocus Industrial Procurement over traditional parts brokers.
            </p>
          </div>

          {/* Desktop & Tablet Table with Hover Highlight Rows */}
          <div className={`hidden md:block overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-lg transition-all duration-700 ${
            qaVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-98"
          }`}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 w-1/4">
                    Feature
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 w-3/8">
                    Traditional Parts Brokers
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50/50 w-3/8">
                    <div className="flex items-center gap-2">
                      <span>eFocus Industrial Procurement</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#AF0202] text-white shadow-2xs">
                        Recommended
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-red-50/30 transition-colors group duration-200"
                  >
                    <td className="py-5 px-6 font-bold text-sm text-gray-900 align-top group-hover:text-red-700 transition-colors">
                      {row.feature}
                      <span className="block text-[11px] text-gray-400 font-normal mt-0.5">
                        {row.highlight}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-500 align-top leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          ✕
                        </span>
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-900 font-medium bg-red-50/20 group-hover:bg-red-50/40 align-top leading-relaxed transition-colors">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-2xs">
                          ✓
                        </span>
                        <span className="text-gray-900 font-semibold">{row.efocus}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Stack */}
          <div className="md:hidden space-y-4">
            {comparisonRows.map((row, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm space-y-3 hover:border-red-200 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="font-bold text-sm text-gray-900">{row.feature}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    {row.highlight}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-gray-50 text-gray-500">
                    <span className="font-semibold text-gray-700 block mb-1">Traditional Brokers:</span>
                    ✕ {row.traditional}
                  </div>
                  <div className="p-2.5 rounded-xl bg-red-50/70 text-gray-900 border border-red-200">
                    <span className="font-semibold text-red-700 block mb-1">eFocus Procurement:</span>
                    ✓ {row.efocus}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: KEY BENEFITS (4 Bento Advantage Cards with Signature Black Hover)
          ========================================================================= */}
      <section 
        ref={benefitsRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Operational Value" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Key Benefits
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Designed for plant managers, purchasing directors, and design engineers to eliminate administrative drag.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyBenefits.map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
                className={`benefit-card rounded-3xl p-6 sm:p-7 bg-[#fbfcfd] border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer group ${
                  benefitsVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <div>
                  <div className="benefit-icon w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#AF0202] font-mono font-black text-sm mb-6 shadow-2xs">
                    {benefit.number}
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 mb-3 group-hover:bg-red-950 group-hover:text-red-300 transition-colors">
                    {benefit.pill}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors leading-snug mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: HOW IT WORKS (Sequential Connected Workflow with Moving Pulse)
          ========================================================================= */}
      <section 
        id="how-it-works" 
        ref={workflowRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100 relative"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            workflowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Transparent Sourcing Lifecycle" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From raw spreadsheet to quality-inspected PCBA kit delivered directly to your dock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  transitionDelay: `${idx * 110}ms`,
                }}
                className={`rounded-3xl p-6 sm:p-7 bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-500 flex flex-col justify-between relative group hover:-translate-y-2 ${
                  workflowVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#AF0202] to-black text-white font-mono text-sm font-black flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-red-700 transition-colors">
                      {step.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-red-600 group-hover:text-red-700 transition-colors">
                  <span>Step {idx + 1} of 4</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1.5 duration-200" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6: INDUSTRIES WE SUPPORT (8 Domain Tiles)
          ========================================================================= */}
      <section 
        ref={industriesRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            industriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Target Sectors & Verticals" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Industries We Support
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Serving high-reliability manufacturing, automotive innovators, defense contractors, and research institutions across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 70}ms`,
                  }}
                  className={`rounded-3xl p-6 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 ${
                    industriesVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                  }`}
                >
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs mb-4 group-hover:scale-110">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="inline-block text-[10.5px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mb-2 group-hover:bg-red-100 transition-colors">
                      {ind.tag}
                    </span>

                    <h3 className="text-base sm:text-[17px] font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                      {ind.name}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed">
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
          SECTION 7: FREQUENTLY ASKED QUESTIONS (Accordion with Smooth Height Transition)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd]">
        <div className="w-full max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <NexBadge label="Got Questions?" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find quick answers regarding our BOM submission guidelines, alternates review, pricing, and order fulfillment.
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

          {/* Bottom Direct Assistance Strip */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-gray-900 to-[#111315] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl hover:shadow-2xl transition-all">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold">Have a high-mix or obsolete BOM?</h3>
              <p className="text-xs sm:text-sm text-gray-300">
                Our application engineers scrub line items against global authorized databases within 2 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToForm}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shrink-0 shadow-md hover:shadow-red-500/20 cursor-pointer"
            >
              Upload Spreadsheet Now
            </button>
          </div>

        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="BOM Request Received!"
        message="Thank you for submitting your bill of materials. Our engineering procurement desk is reviewing your requirements and will furnish an itemized landed INR quote within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
