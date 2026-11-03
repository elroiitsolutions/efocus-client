import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NexChipIcon, NexBadge } from "@/components/ui/NexIcons";
import { 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown, 
  Radio, 
  Activity, 
  Zap, 
  Layers, 
  Sliders,
  BarChart3,
  Cable,
  Network,
  Sparkles,
  Check,
  TowerControl,
  Wifi,
  Waves
} from "lucide-react";

export default function TelecomRfPage() {
  // Page SEO / Metadata Title & Description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Telecom & RF Test Equipment Sourcing Solutions | eFocus Industrial";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescription?.getAttribute("content") || "";
    const targetDesc = "Source RF analysers, signal generators, vector network analysers, spectrum analysers, antenna testing equipment, and wireless communication test instruments with eFocus.";
    
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

  // FAQ Accordion Active State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    
  // 12 Product Categories matching client spec
  const productCategories = [
    {
      title: "Spectrum Analysers",
      desc: "For analysing frequency components, signal levels, harmonics, and unwanted emissions.",
      badge: "Up to 67 GHz & Real-Time",
      icon: BarChart3,
      tags: ["Phase Noise", "Harmonic Distortion", "Spurious Emissions", "Real-Time Bandwidth"],
    },
    {
      title: "Vector Network Analysers (VNAs)",
      desc: "For measuring S-parameters, impedance, reflection, and transmission characteristics of RF components.",
      badge: "2-Port & 4-Port Multiport",
      icon: Waves,
      tags: ["S11, S21, S12, S22", "Smith Chart", "Time-Domain Reflectometry (TDR)", "Cal Kits"],
    },
    {
      title: "RF Signal Generators",
      desc: "For generating controlled RF signals for receiver testing, component evaluation, and laboratory measurements.",
      badge: "CW & Vector Modulated",
      icon: Radio,
      tags: ["IQ Modulation", "Low Phase Noise", "Fast Frequency Switching", "Cellular Waveforms"],
    },
    {
      title: "RF Power Meters and Sensors",
      desc: "For measuring RF power levels across applicable frequency ranges.",
      badge: "Peak & Average Power",
      icon: Zap,
      tags: ["Diode Sensors", "Thermal Sensors", "USB Power Sensors", "Wide Dynamic Range"],
    },
    {
      title: "Antenna Test and Measurement Equipment",
      desc: "Equipment and accessories for antenna characterisation, impedance measurements, and RF performance evaluation.",
      badge: "VSWR, Return Loss & Gain",
      icon: TowerControl,
      tags: ["Anechoic Chamber Accessories", "Near-Field Probes", "Positioners", "Radiation Patterns"],
    },
    {
      title: "Wireless Communication Testers",
      desc: "Test equipment for applicable cellular, wireless, and communication technologies.",
      badge: "5G NR, LTE, WiFi 7 & BLE",
      icon: Wifi,
      tags: ["Call Box Testing", "Over-The-Air (OTA)", "Protocol Testing", "Throughput Verification"],
    },
    {
      title: "Oscilloscopes and High-Frequency Probes",
      desc: "For observing time-domain signals, modulation behaviour, and high-speed electronic waveforms.",
      badge: "High-Bandwidth & Low Loading",
      icon: Activity,
      tags: ["Differential Active Probes", "Eye Diagram", "Jitter Analysis", "Serial Bus Decoding"],
    },
    {
      title: "Signal Analysers and Modulation Analysers",
      desc: "For examining modulation quality and signal characteristics in supported communication systems.",
      badge: "EVM, Constellation & BER",
      icon: Sliders,
      tags: ["Digital Demodulation", "EVM Analysis", "Constellation Display", "Spectral Mask"],
    },
    {
      title: "RF Amplifiers and Attenuators",
      desc: "Components for RF signal conditioning, level control, and measurement setups.",
      badge: "Low Noise & Power Amplification",
      icon: Layers,
      tags: ["Low Noise Amplifiers (LNA)", "Fixed & Step Attenuators", "High Power Handling"],
    },
    {
      title: "RF Cables, Connectors and Adapters",
      desc: "Coaxial cables, RF connectors, adapters, and interconnect accessories for measurement applications.",
      badge: "Phase-Stable & Armored",
      icon: Cable,
      tags: ["SMA, N-Type, 2.92mm, 3.5mm", "Precision Torque Wrenches", "Phase-Matched Sets"],
    },
    {
      title: "Directional Couplers, Splitters and Combiners",
      desc: "RF components used for signal distribution, sampling, and routing in test configurations.",
      badge: "High Directivity & Low Loss",
      icon: Network,
      tags: ["Dual-Directional Couplers", "Wilkinson Power Dividers", "Broadband Matching"],
    },
    {
      title: "EMI/EMC Pre-Compliance Test Equipment",
      desc: "Applicable receivers, probes, antennas, and accessories for preliminary electromagnetic interference investigations.",
      badge: "Conducted & Radiated EMC",
      icon: ShieldCheck,
      tags: ["LISNs", "Near-Field Sniffer Probes", "Biconical Antennas", "CISPR Filters"],
    },
  ];

  // 6 Applications matching client spec
  const applications = [
    {
      title: "RF Component Characterisation",
      desc: "Filters, amplifiers, antennas, and other RF components need to be evaluated for frequency response, impedance matching, and signal transmission. VNAs and spectrum analysers support these measurements.",
      icon: Waves,
      category: "Passive & Active Devices",
      tags: ["Bandpass Filters", "Power Amplifiers", "Diplexers", "Impedance Matching"],
    },
    {
      title: "Antenna Performance Evaluation",
      desc: "Antenna testing involves parameters such as return loss, VSWR, impedance, and radiation characteristics. Suitable instruments and accessories help engineers assess antenna performance according to the test method.",
      icon: TowerControl,
      category: "Antenna & Propagation",
      tags: ["VSWR Sweep", "Return Loss", "Input Impedance", "Gain Verification"],
    },
    {
      title: "Wireless Transmitter and Receiver Testing",
      desc: "Communication equipment needs to be evaluated for output power, frequency accuracy, modulation quality, and receiver performance. RF signal generators and wireless communication testers support applicable test procedures.",
      icon: Radio,
      category: "Transceiver Verification",
      tags: ["Tx Output Power", "Rx Sensitivity", "Adjacent Channel Power", "EVM"],
    },
    {
      title: "Spectrum Monitoring and Interference Investigation",
      desc: "Unwanted signals, harmonics, and interference can affect wireless system performance. Spectrum analysers help engineers identify and examine signals across the required frequency range.",
      icon: BarChart3,
      category: "Signal Integrity & Monitoring",
      tags: ["Spurious Emissions", "Intermodulation", "Co-Channel Interference", "Spectrogram"],
    },
    {
      title: "RF Network and Signal Distribution Testing",
      desc: "RF cables, connectors, couplers, splitters, and related components influence signal transmission. Appropriate measurement instruments help evaluate connectivity and RF path performance.",
      icon: Cable,
      category: "RF Transmission Lines",
      tags: ["Cable Insertion Loss", "Connector Repeatability", "Path Loss Calibration", "Power Division"],
    },
    {
      title: "EMI/EMC Pre-Compliance Investigation",
      desc: "Engineering teams can use suitable receivers, probes, antennas, and measurement accessories to investigate potential electromagnetic interference issues before formal compliance testing.",
      icon: ShieldCheck,
      category: "Pre-Compliance Bench",
      tags: ["Conducted Emissions", "Radiated Sniffing", "Shielding Effectiveness", "Harmonic Limits"],
    },
  ];

  // 5 Why Choose eFocus Industrial Pillars matching client spec
  const whyPoints = [
    {
      number: "01",
      title: "Frequency-Range Consideration",
      desc: "Review the operating frequency range, bandwidth, and measurement range before selecting suitable RF instruments.",
      icon: Waves,
    },
    {
      number: "02",
      title: "Measurement-Parameter Matching",
      desc: "Consider parameters such as S-parameters, VSWR, return loss, output power, phase noise, and modulation quality according to the application.",
      icon: Sliders,
    },
    {
      number: "03",
      title: "RF Accessory Compatibility",
      desc: "Account for connector types, cable frequency ratings, impedance, attenuation, and power handling when selecting supporting components.",
      icon: Cable,
    },
    {
      number: "04",
      title: "Equipment for Different RF Workflows",
      desc: "Explore sourcing options across signal generation, spectrum analysis, network characterisation, antenna testing, and wireless communication measurements.",
      icon: Layers,
    },
    {
      number: "05",
      title: "Application-Based Technical Review",
      desc: "Share the RF component, communication technology, or measurement objective to help identify relevant equipment options.",
      icon: Activity,
    },
  ];

  // 6 FAQs matching client spec exactly
  const faqs = [
    {
      q: "What RF test instruments can I source through eFocus Industrial?",
      a: "Enquiries may include spectrum analysers, vector network analysers, RF signal generators, power meters, wireless communication testers, oscilloscopes, and RF accessories.",
    },
    {
      q: "Which instrument is suitable for measuring antenna parameters?",
      a: "A vector network analyser is commonly used for measurements such as S11, return loss, and VSWR. The appropriate setup depends on the antenna frequency range, calibration requirements, and measurement method.",
    },
    {
      q: "Can I source equipment for 5G and wireless communication testing?",
      a: "You can share the technology, frequency bands, bandwidth, signal parameters, and test objectives so suitable equipment options can be reviewed.",
    },
    {
      q: "How do I select a spectrum analyser?",
      a: "Important considerations include frequency range, resolution bandwidth, displayed average noise level, phase noise, amplitude accuracy, and required analysis functions.",
    },
    {
      q: "Can I source RF cables and connectors along with instruments?",
      a: "Yes. Include connector types, cable lengths, impedance, frequency range, and power requirements so compatible accessories can be considered.",
    },
    {
      q: "Can you support EMI/EMC pre-compliance requirements?",
      a: "You can enquire about applicable receivers, probes, antennas, and measurement accessories based on the emissions or interference investigation required.",
    },
  ];

  
  const scrollToCategories = () => {
    const el = document.getElementById("product-categories") || document.getElementById("product-categories") || document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(el);
      }
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen text-[#0d0f11] font-sans antialiased overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE TECHNICAL SOURCING FORM
          ========================================================================= */}
      <section 
        id="telecom-rf-hero"
        className="w-full relative pt-6 sm:pt-10 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-gray-100 overflow-hidden bg-gradient-to-b from-[#fbfcfd] via-white to-[#f8f9fa]"
      >
        {/* Soft Ambient Radial Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(175,2,2,0.07),transparent_70%)] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-rose-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[100rem] mx-auto relative z-10 flex flex-col items-center text-center">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Industries</span>
            <span>/</span>
            <span className="text-red-600 font-semibold">Telecom & RF</span>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              
              {/* Eyebrow Pill with Pulsing Live Dot */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50/90 border border-red-200/80 text-red-700 text-xs sm:text-[13px] font-semibold tracking-wide mb-6 shadow-2xs hover:scale-[1.02] transition-transform animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#AF0202]"></span>
                </span>
                <span>TELECOM & RF TEST SOLUTIONS</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] font-extrabold text-[#0d0f11] tracking-tight leading-[1.12] mb-5 text-center animate-in fade-in slide-in-from-left-6 duration-700">
                Measure, Analyse and Validate{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                  RF Performance
                </span>
              </h1>

              {/* Subtitle & Value Proposition (Exact Client Copy) */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-4xl mx-auto mb-4 text-center animate-in fade-in slide-in-from-left-8 duration-700">
                Reliable wireless communication depends on signal quality, frequency performance, and the behaviour of RF components and systems.
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8 text-center animate-in fade-in slide-in-from-left-8 duration-700">
                eFocus helps telecom manufacturers, RF engineers, and communication technology teams source test instruments, RF accessories, and measurement equipment for wireless development, component evaluation, and network testing applications.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Link to="/quote?industry=telecom-rf" className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12 px-6">
                  <NexChipIcon className="w-8 h-8" />
                  <span>Discuss Your RF Requirements</span>
                </Link>

                <button type="button" onClick={scrollToCategories} className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white hover:bg-gray-50 text-gray-800 text-sm sm:text-base font-medium border border-gray-200 transition-all hover:scale-[1.02] shadow-2xs cursor-pointer group">
                  <span>Explore Equipment Categories</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PRODUCT CATEGORIES (12 CATEGORIES)
          ========================================================================= */}
      <section 
        id="product-categories" 
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[100rem] mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center mb-12 sm:mb-16">
            <NexBadge label="Instrumentation Portfolio" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Equipment for Telecom & RF Test Engineering
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Source high-precision instruments, phase-matched RF accessories, and wireless test hardware through one dedicated industrial sourcing partner.
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
            <Link to="/quote?industry=telecom-rf" className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all cursor-pointer h-12 px-8 px-6">
              <NexChipIcon className="w-8 h-8" />
              <span>Enquire About RF Test Equipment</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: APPLICATIONS (6 CORE WORKFLOWS)
          ========================================================================= */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center mb-12 sm:mb-16">
            <NexBadge label="Verification Workflows" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Applications Across Telecom & RF Engineering
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From component-level characterisation to OTA wireless validation and pre-compliance checks, configure your test setup around exact signal parameters.
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
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white border-b border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center mb-12 sm:mb-16">
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
                  Need Help Matching RF Test Hardware?
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Send us your target component frequency, connector standards, or wireless protocol specs. Our application engineers will help review compatible instrument configurations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.location.href='/quote?industry=telecom-rf'}
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
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#fbfcfd] border-b border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <NexBadge label="Questions & Answers" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0f11] tracking-tight mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find answers regarding RF instrumentation, antenna parameters, 5G wireless testing, and cabling accessories.
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
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0d0f11] via-[#111315] to-[#1c1f24] p-8 sm:p-14 border border-gray-800 text-white overflow-hidden shadow-2xl">
            {/* Ambient Red Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-red-400 text-xs font-semibold mb-4 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Telecom & RF Desk</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Working on an RF or Wireless Communication Project?
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-8">
                From RF component characterisation to antenna measurements and wireless testing, share your technical requirements with eFocus Industrial to discuss suitable equipment sourcing options.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link to="/quote?industry=telecom-rf" className="group nex-button-swap inline-flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-red-600/30 transition-all cursor-pointer h-12 px-8 px-6">
                  <NexChipIcon className="w-8 h-8" />
                  <span>Submit Your RF Requirements</span>
                </Link>

                <button
                  type="button"
                  onClick={() => window.location.href='/quote?industry=telecom-rf'}
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm sm:text-base font-medium border border-white/20 transition-all cursor-pointer"
                >
                  <span>Discuss Your Application</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Authorized Instrument Sourcing
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

    </div>
  );
}
