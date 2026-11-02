import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { NexChipIcon, NexBadge } from "@/components/ui/NexIcons";
import CountUp from "@/components/ui/CountUp";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Sliders, 
  Settings, 
  Wrench, 
  PlayCircle, 
  GraduationCap, 
  Check, 
  Cpu, 
  Car, 
  FlaskConical, 
  Zap, 
  Radio, 
  Factory, 
  Layers, 
  Compass, 
  CalendarCheck,
  FileCheck2
} from "lucide-react";
import { FormSubmissionService } from "@/services/formSubmission.service";
import SuccessModal from "@/components/ui/SuccessModal";

export default function ServicesPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Engineering Support Services | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    const targetDesc = "Technical services for industrial and engineering equipment, including application engineering, calibration, AMC & repair, installation, and product demonstrations.";
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

  // Form State
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceRequired, setServiceRequired] = useState("Application Engineering");
  const [instrumentDetails, setInstrumentDetails] = useState("");
  const [makeAndModel, setMakeAndModel] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState("");

  // Section Observer Triggers
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesRef = useRef<HTMLElement>(null);

  const [workflowVisible, setWorkflowVisible] = useState(false);
  const workflowRef = useRef<HTMLElement>(null);

  const [benefitVisible, setBenefitVisible] = useState(false);
  const benefitRef = useRef<HTMLElement>(null);

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
      handleObserve(servicesRef.current, setServicesVisible),
      handleObserve(workflowRef.current, setWorkflowVisible),
      handleObserve(benefitRef.current, setBenefitVisible),
    ];

    return () => {
      cleanups.forEach((c) => c && c());
    };
  }, []);

  // Scroll to form with optional pre-selected service
  const triggerServiceSelect = (serviceName: string) => {
    setServiceRequired(serviceName);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const firstInput = formRef.current?.querySelector("input");
    firstInput?.focus();
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const firstInput = formRef.current?.querySelector("input");
    firstInput?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !companyName.trim() || !email.trim() || !instrumentDetails.trim() || !description.trim()) {
      alert("Please fill in all required fields (Full Name, Company Name, Business Email, Instrument Details, and Description).");
      return;
    }

    setIsSubmitting(true);
    try {
      await FormSubmissionService.submitForm({
        form_name: "Engineering Support Services Enquiry",
        form_type: "engineering_services",
        name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        service_required: serviceRequired,
        instrument_details: instrumentDetails.trim(),
        make_and_model: makeAndModel.trim() || undefined,
        message: `Service Required: ${serviceRequired}\nInstrument / Equipment: ${instrumentDetails.trim()}\nMake & Model: ${makeAndModel.trim() || "Not specified"}\n\nDescription of Requirement:\n${description.trim()}`,
      });

      setSubmitterEmail(email.trim());
      setIsSuccessOpen(true);
      // Reset form
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setServiceRequired("Application Engineering");
      setInstrumentDetails("");
      setMakeAndModel("");
      setDescription("");
    } catch (err: any) {
      console.error("Services enquiry submission failed:", err);
      alert(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section 2 Data: 6 Core Services
  const servicesList = [
    {
      id: "application-engineering",
      number: "01",
      title: "Application Engineering",
      desc: "Get technical guidance to identify equipment and solutions that align with your application requirements, specifications, and testing objectives.",
      icon: Sliders,
      ctaText: "Discuss Your Application",
      bullets: [
        "Application requirement assessment",
        "Technical specification review",
        "Equipment and solution selection support",
        "Application-based recommendations",
      ],
    },
    {
      id: "calibration",
      number: "02",
      title: "Calibration",
      desc: "Access calibration support for applicable test and measurement instruments to help maintain measurement confidence and support your quality processes.",
      icon: Settings,
      ctaText: "Enquire About Calibration",
      bullets: [
        "Instrument calibration coordination",
        "Calibration requirement assessment",
        "Support based on instrument type and scope",
        "Calibration documentation, as applicable",
      ],
    },
    {
      id: "amc-repair",
      number: "03",
      title: "AMC & Repair",
      desc: "Address equipment servicing and repair requirements through maintenance planning and technical support based on the instrument, its condition, and the service required.",
      icon: Wrench,
      ctaText: "Request Maintenance Support",
      bullets: [
        "Annual Maintenance Contract enquiries",
        "Equipment fault assessment",
        "Repair and servicing coordination",
        "Maintenance support based on agreed scope",
      ],
    },
    {
      id: "installation-setup",
      number: "04",
      title: "Installation & Setup",
      desc: "Get support with equipment installation and setup based on the product, application, and agreed project scope.",
      icon: ShieldCheck,
      ctaText: "Discuss Installation Requirements",
      bullets: [
        "Equipment installation coordination",
        "Initial configuration and setup",
        "Connection and interface checks, where applicable",
        "Basic operational guidance",
      ],
    },
    {
      id: "product-demo",
      number: "05",
      title: "Product Demo",
      desc: "Understand equipment features and application suitability through product demonstrations tailored to your technical requirements.",
      icon: PlayCircle,
      ctaText: "Request a Product Demo",
      bullets: [
        "Application-specific demonstrations",
        "Feature and functionality walkthroughs",
        "Measurement and operating procedure overview",
        "Technical questions and requirement clarification",
      ],
    },
    {
      id: "technical-training",
      number: "06",
      title: "Technical Training",
      desc: "Help engineering teams understand equipment operation and its application through technical training aligned with their instruments and learning requirements.",
      icon: GraduationCap,
      ctaText: "Enquire About Training",
      bullets: [
        "Instrument operation and configuration",
        "Measurement techniques and best practices",
        "Application-focused learning sessions",
        "Training for relevant engineering teams",
      ],
    },
  ];

  // Section 3 Data: How We Support Your Requirements (4-Step Workflow)
  const workflowSteps = [
    {
      step: "01",
      title: "Understand the Requirement",
      desc: "We review your equipment, application, or service needs.",
      icon: Compass,
    },
    {
      step: "02",
      title: "Define the Service Scope",
      desc: "The required support is identified based on the instrument, application, and technical requirements.",
      icon: Layers,
    },
    {
      step: "03",
      title: "Coordinate the Service",
      desc: "The appropriate service approach, schedule, and scope are discussed and confirmed.",
      icon: CalendarCheck,
    },
    {
      step: "04",
      title: "Provide Relevant Technical Support",
      desc: "Support is delivered according to the confirmed service scope and applicable terms.",
      icon: FileCheck2,
    },
  ];

  // Section 4 Data: Who Can Benefit? (6 Industry Sectors)
  const beneficiarySectors = [
    {
      title: "Electronics Manufacturing and Testing",
      desc: "SMT line maintenance, board-level debug instruments, ESD certification, and operator training.",
      icon: Cpu,
    },
    {
      title: "Automotive and EV Engineering",
      desc: "High-voltage battery test calibration, traction inverter setup, and CAN FD interface guidance.",
      icon: Car,
    },
    {
      title: "R&D and Validation Laboratories",
      desc: "Precision calibration compliance, signal integrity setup, and bespoke instrument evaluations.",
      icon: FlaskConical,
    },
    {
      title: "Power Electronics",
      desc: "High-power DC regenerative load commissioning, thermal monitoring, and safety verification.",
      icon: Zap,
    },
    {
      title: "RF and Wireless Testing",
      desc: "Spectrum analyzer verification, cable loss compensation, and RF shielding assessments.",
      icon: Radio,
    },
    {
      title: "Industrial Production and Quality Control",
      desc: "End-of-line test station setup, scheduled preventive AMC, and compliance documentation.",
      icon: Factory,
    },
  ];

  // Service Preset Chips for Form
  const serviceOptions = [
    "Application Engineering",
    "Calibration",
    "AMC & Repair",
    "Installation & Setup",
    "Product Demo",
    "Technical Training",
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfcfd] overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE SERVICE ENQUIRY FORM
          ========================================================================= */}
      <section 
        id="services-hero"
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
            <span className="text-gray-400">Engineering Hub</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">Support Services</span>
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
                <span>ENGINEERING SUPPORT SERVICES</span>
              </div>

              {/* Main H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 animate-in fade-in slide-in-from-left-6 duration-700">
                Technical Support Beyond{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  Equipment Sourcing
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
                The right equipment needs the right technical support. eFocus Industrial provides engineering, calibration, maintenance, installation, demo, and training services to support your operations.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>Submit Service Enquiry</span>
                </button>

                <a
                  href="#our-services"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Verified Performance Stats Ribbon with Auto-Increment Animation */}
              <div 
                ref={statsRef}
                className="w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-gray-200/80"
              >
                {/* Stat 1: 6 Core Services */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={6} suffix=" Pillars" duration={1400} />
                    ) : (
                      <span>6 Pillars</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Engineering Scope</span>
                    <Sliders className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    From demo to annual maintenance
                  </p>
                </div>

                {/* Stat 2: NABL & ISO Traceable */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={100} suffix="%" duration={1800} />
                    ) : (
                      <span>100%</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Certified Quality</span>
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    NABL/ISO accredited partners
                  </p>
                </div>

                {/* Stat 3: 24–48h Rapid Turnaround */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/90 border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-red-200 transition-all duration-300 group">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#AF0202] tracking-tight">
                    {statsVisible ? (
                      <CountUp value={24} suffix="h" duration={1400} />
                    ) : (
                      <span>24h</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1.5">
                    <span>Response Window</span>
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 hidden sm:inline group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    Fast technical consultation
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Certified Technicians & OEM Standards</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>On-Site Commissioning Available</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>Single GST Service Billing</span>
                </span>
              </div>

            </div>

            {/* Right Column: Interactive Form "Submit Service Enquiry" */}
            <div className="lg:col-span-5" ref={formRef}>
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
                
                {/* Form Header Accent Bar with Shimmer */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-[#AF0202] to-black" />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      Submit Service Enquiry
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Request engineering guidance, calibration, repair, or training.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#AF0202] flex items-center justify-center shrink-0 shadow-2xs">
                    <Sliders className="w-5 h-5" />
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
                        placeholder="e.g. Sanjay Patel"
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
                        placeholder="e.g. Apex Diagnostics"
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
                        placeholder="engineering@company.com"
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

                  {/* Service Required * (Interactive Chips Selection) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {serviceOptions.map((service) => {
                        const isSelected = serviceRequired === service;
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setServiceRequired(service)}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-medium text-left border transition-all cursor-pointer truncate ${
                              isSelected
                                ? "bg-red-50 border-red-500 text-red-700 font-semibold shadow-2xs"
                                : "bg-gray-50/60 border-gray-200 text-gray-600 hover:bg-gray-100/70"
                            }`}
                          >
                            <span className="mr-1">{isSelected ? "●" : "○"}</span>
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Instrument / Equipment Details & Make/Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Instrument / Equipment Details <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={instrumentDetails}
                        onChange={(e) => setInstrumentDetails(e.target.value)}
                        placeholder="e.g. 4-Channel Oscilloscope, DC Load"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Make and Model
                      </label>
                      <input
                        type="text"
                        value={makeAndModel}
                        onChange={(e) => setMakeAndModel(e.target.value)}
                        placeholder="e.g. Keysight InfiniiVision, Rohde & Schwarz"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Description of Requirement * */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Description of Requirement <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2.5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Outline specific fault symptoms, desired calibration intervals, demo objectives, or operator training scope..."
                      className="w-full px-3.5 py-2 rounded-xl bg-gray-50/70 border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none resize-none"
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
                          <span>Submitting Service Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <NexChipIcon className="w-7 h-7" />
                          <span>Submit Service Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      🔒 Confirmed against OEM parameters & traceable calibration certificates.
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: OUR SERVICES (6 CORE PILLARS WITH ACTION BUTTONS)
          ========================================================================= */}
      <section 
        id="our-services"
        ref={servicesRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Support Services Portfolio" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Technical Support for Your Equipment and Applications
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From early application guidance to ongoing calibration, preventative maintenance, and operator training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-7 sm:p-8 bg-[#fbfcfd] border border-gray-200/90 shadow-2xs hover:shadow-xl hover:border-red-300 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 ${
                    servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    {/* Header with Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-[#AF0202] group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-110">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-gray-400 group-hover:text-red-600 transition-colors">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#AF0202] transition-colors leading-snug mb-3">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    {/* Bullet List */}
                    <div className="space-y-2.5 pt-4 border-t border-gray-100 mb-6">
                      {service.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-gray-600">
                          <div className="w-4 h-4 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic CTA Button triggering form selection */}
                  <div>
                    <button
                      type="button"
                      onClick={() => triggerServiceSelect(service.title)}
                      className="w-full py-2.5 px-4 rounded-xl bg-white group-hover:bg-[#111315] text-gray-800 group-hover:text-white text-xs font-bold border border-gray-200 group-hover:border-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>{service.ctaText}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: HOW WE SUPPORT YOUR REQUIREMENTS (4-STEP WORKFLOW)
          ========================================================================= */}
      <section 
        ref={workflowRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            workflowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Execution Methodology" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              How We Support Your Requirements
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              A transparent, structured process designed to align technical capabilities with your project milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 100}ms`,
                  }}
                  className={`rounded-3xl p-7 bg-white border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 relative overflow-hidden ${
                    workflowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-50/50 rounded-bl-full pointer-events-none group-hover:bg-red-100/50 transition-colors" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#fbfcfd] border border-gray-200 flex items-center justify-center text-[#AF0202] group-hover:scale-110 group-hover:bg-[#AF0202] group-hover:text-white transition-all duration-300 shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-mono font-extrabold text-red-600">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2.5">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: WHO CAN BENEFIT? (6 SECTORS)
          ========================================================================= */}
      <section 
        ref={benefitRef}
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[102rem] mx-auto">
          
          <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${
            benefitVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <NexBadge label="Target Domains" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Who Can Benefit?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our engineering services are trusted across high-reliability industries and specialized laboratory teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficiarySectors.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  className={`rounded-3xl p-6 sm:p-7 bg-[#fbfcfd] border border-gray-200/80 hover:border-red-300 shadow-2xs hover:shadow-lg transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 ${
                    benefitVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 group-hover:bg-[#111315] group-hover:border-black flex items-center justify-center text-gray-800 group-hover:text-white transition-all duration-300 shadow-2xs mb-4 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                      {sector.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {sector.desc}
                    </p>
                  </div>
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
                <span>Dedicated Technical Support Infrastructure</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Need Technical Support for Your Equipment?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                From application guidance to maintenance and training, discuss your requirements with eFocus Industrial.
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#0d0f11] py-3.5 px-8 font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              >
                <NexChipIcon className="w-8 h-8" />
                <span>Talk to Our Team</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Service Enquiry Received!"
        message="Thank you for contacting eFocus Engineering Support Services. Our technical support specialists will review your instrument parameters and contact you within 24–48 hours."
        submitterEmail={submitterEmail}
      />

    </div>
  );
}
