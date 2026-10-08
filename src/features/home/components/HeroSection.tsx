import { useState, useEffect, useRef } from "react";
import { NexChipIcon } from "@/components/ui/NexIcons";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const openModal = (mode: "quote" | "bom", title?: string) => {
    window.dispatchEvent(
      new CustomEvent("open-procurement-modal", {
        detail: { mode, title },
      })
    );
  };

  const slides = [
    {
      id: "slide-1",
      tabLabel: "Vendor Consolidation",
      heading: "One Partner. One Invoice. Zero Plant Downtime.",
      subtext:
        "Stop managing multiple suppliers. Streamline 100% of your procurement under a single GST vendor profile.",
      ctas: [
        {
          label: "Consolidate Your Procurement",
          variant: "primary" as const,
          action: () => openModal("quote", "Vendor Consolidation RFQ"),
        },
        {
          label: "Get a Fast Quote",
          variant: "secondary" as const,
          action: () => openModal("quote", "Get a Fast Quote"),
        },
      ],
    },
    {
      id: "slide-2",
      tabLabel: "Turnkey Plant Setup",
      heading: "Complete Plant & Assembly Setup, Tailored to Your Product",
      subtext:
        "Don't waste critical engineering cycles figuring out which instruments and tools will optimize your throughput.",
      ctas: [
        {
          label: "Plan Plant Setup",
          variant: "primary" as const,
          action: () => openModal("quote", "Turnkey Plant Setup RFQ"),
        },
        {
          label: "Talk to an Engineer",
          variant: "secondary" as const,
          action: () => openModal("quote", "Application Engineering Consultation"),
        },
      ],
    },
    {
      id: "slide-3",
      tabLabel: "Custom BOM Bundle",
      heading: "Building a Custom Bill of Materials (BOM)?",
      subtext:
        "We can bundle hardware, accessories, and calibration services across all four pillars into a single consolidated quotation.",
      ctas: [
        {
          label: "Request Custom BOM Quote",
          variant: "primary" as const,
          action: () => openModal("bom", "Request Custom BOM Quote"),
        },
        {
          label: "Talk to an Engineer",
          variant: "secondary" as const,
          action: () => openModal("quote", "Application Engineering Consultation"),
        },
      ],
    },
  ];

  // Touch swipe support for smooth mobile sliding
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      // Swiped left -> Next slide
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (diff < -45) {
      // Swiped right -> Previous slide
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
    setTouchStart(null);
  };

  // Auto-advance slides automatically one by one every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  return (
    <section 
      className="relative w-full overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[92vh] sm:min-h-screen" 
      id="hero"
    >
      {/* Background Video with Cinematic Dark Contrast Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          src="/hero%20video/video.mp4"
          poster="/hero%20video/frame_35_hd.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero%20video/video.mp4" type="video/mp4" />
        </video>

        {/* Primary directional dark gradient for typography contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/45 to-black/45"
          aria-hidden="true"
        />

        {/* Vignette top & bottom */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50"
          aria-hidden="true"
        />

      </div>


      {/* Hero Content Container (Card Removed - Typography Plays Directly on Video) */}
      <div 
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center text-left py-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Interactive Slide Tabs - Hidden on mobile, visible on desktop/tablet */}
        <div className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {slides.map((s, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 backdrop-blur-md border ${
                  isActive
                    ? "bg-white/20 text-white border-white/50 shadow-md scale-[1.02]"
                    : "bg-black/35 hover:bg-black/55 text-white/75 border-white/15"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? "bg-red-500 animate-pulse" : "bg-white/40"}`} />
                <span>{s.tabLabel}</span>
                <span className={`text-[11px] font-mono ${isActive ? "text-white" : "text-white/50"}`}>
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated Playing Text Directly Over Background (Reference Styling) */}
        <div key={slides[currentSlide].id} className="animate-in fade-in slide-in-from-bottom-3 duration-500 max-w-4xl">
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.14] mb-4 sm:mb-5 drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)]">
            {slides[currentSlide].heading}
          </h1>

          {/* Supporting Subtitle */}
          <p className="text-sm sm:text-lg lg:text-xl text-gray-200/95 leading-relaxed font-normal mb-8 sm:mb-10 max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {slides[currentSlide].subtext}
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
            {slides[currentSlide].ctas.map((cta, idx) => (
              <button
                key={idx}
                onClick={cta.action}
                className={`inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] ${
                  cta.variant === "primary"
                    ? "bg-white hover:bg-gray-100 text-[#0d0f11]"
                    : "bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md"
                }`}
              >
                {cta.variant === "primary" && <NexChipIcon />}
                <span>{cta.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slide Counter & Navigation Controls (01/03, 02/03, 03/03) */}
        <div className="flex items-center gap-2 mb-0">
          <div className="inline-flex items-center gap-2.5 text-white/90 text-xs sm:text-sm font-mono bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
            <span className="font-semibold text-white tracking-wider">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <div className="flex items-center gap-1 ml-1 border-l border-white/20 pl-2">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer text-xs sm:text-sm font-bold leading-none"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer text-xs sm:text-sm font-bold leading-none"
                aria-label="Next slide"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
