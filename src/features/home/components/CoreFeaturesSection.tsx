import { useState, useEffect, useRef } from "react";
import { NexChipIcon } from "@/components/ui/NexIcons";

export default function CoreFeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleOpenProcurement = (mode: "quote" | "bom", title: string) => {
    window.dispatchEvent(
      new CustomEvent("open-procurement-modal", {
        detail: { mode, title },
      })
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" 
      id="core-features"
      aria-label="Procurement Sourcing Desk"
    >
      <span id="procurement-desk" className="sr-only" />

      {/* Entrance and Floating Keyframes */}
      <style>{`
        @keyframes procurementSlideUp {
          0% {
            opacity: 0;
            transform: translateY(28px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        @keyframes procurementIconPop {
          0% {
            opacity: 0;
            transform: scale(0.75) translateY(18px);
            filter: blur(6px);
          }
          65% {
            opacity: 1;
            transform: scale(1.06) translateY(-2px);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
        }
        @keyframes procurementButtonsSlide {
          0% {
            opacity: 0;
            transform: translateX(24px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes cartFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>

      {/* Subtle Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-blue-500/[0.04] rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-red-500/[0.03] rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-[100rem] mx-auto">
        
        {/* Main Row: Left (Icon + Text) | Right (Action Buttons) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 xl:gap-12">
          
          {/* Left Side: Illustration + Titles */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-1 min-w-0">
            
            {/* 3D Illustration / Icon with Entrance Pop + Gentle Float */}
            <div 
              style={{
                animation: isVisible ? "procurementIconPop 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0ms both" : "none",
                opacity: isVisible ? undefined : 0,
              }}
              className="shrink-0 relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center select-none"
            >
              <div 
                style={{
                  animation: isVisible ? "cartFloat 4.2s ease-in-out 0.9s infinite" : "none",
                }}
                className="w-full h-full"
              >
                <svg viewBox="0 0 96 96" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Clipboard base */}
                  <rect x="10" y="14" width="38" height="52" rx="7" fill="#3B82F6" fillOpacity="0.15" />
                  <rect x="12" y="16" width="34" height="48" rx="5" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2.5" />
                  {/* Clipboard Top Clip */}
                  <rect x="22" y="10" width="14" height="8" rx="3" fill="#2563EB" />
                  <circle cx="29" cy="14" r="1.5" fill="#FFFFFF" />
                  {/* Checklist lines on clipboard */}
                  <rect x="18" y="26" width="5" height="5" rx="1.5" fill="#2563EB" />
                  <path d="M19 28.5L20.5 30L22 27" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="26" y="27.5" width="16" height="2" rx="1" fill="#93C5FD" />
                  
                  <rect x="18" y="36" width="5" height="5" rx="1.5" fill="#2563EB" />
                  <path d="M19 38.5L20.5 40L22 37" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="26" y="37.5" width="16" height="2" rx="1" fill="#93C5FD" />

                  <rect x="18" y="46" width="5" height="5" rx="1.5" fill="#2563EB" />
                  <path d="M19 48.5L20.5 50L22 47" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="26" y="47.5" width="14" height="2" rx="1" fill="#93C5FD" />

                  {/* Shopping Cart with Parcel Boxes */}
                  {/* Parcel Box 1 */}
                  <rect x="52" y="28" width="18" height="15" rx="2" fill="#D97706" />
                  <rect x="54" y="30" width="14" height="11" rx="1" fill="#F59E0B" />
                  <path d="M61 28V43M52 35H70" stroke="#B45309" strokeWidth="1.5" strokeDasharray="2 1" />
                  {/* Parcel Box 2 (stacked) */}
                  <rect x="42" y="33" width="16" height="14" rx="2" fill="#B45309" />
                  <rect x="43.5" y="34.5" width="13" height="11" rx="1" fill="#D97706" />
                  <path d="M50 33V47M42 40H58" stroke="#92400E" strokeWidth="1.5" strokeDasharray="2 1" />

                  {/* Shopping Cart Wire Basket */}
                  <path d="M36 44H78L72 64H44L36 44Z" fill="#1E293B" fillOpacity="0.08" />
                  <path d="M30 40H36L44 65H73L79 46H38" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Cart grid wires */}
                  <path d="M47 47V63M56 47V63M65 47V63M40 52H76M42 58H74" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" />
                  {/* Wheels */}
                  <circle cx="47" cy="71" r="4.5" fill="#334155" />
                  <circle cx="47" cy="71" r="2" fill="#E2E8F0" />
                  <circle cx="69" cy="71" r="4.5" fill="#334155" />
                  <circle cx="69" cy="71" r="2" fill="#E2E8F0" />
                </svg>
              </div>
            </div>

            {/* Heading + Subtitle */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div 
                style={{
                  animation: isVisible ? "procurementSlideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 90ms both" : "none",
                  opacity: isVisible ? undefined : 0,
                }}
                className="flex items-center gap-2 mb-1"
              >
                {/* <NexBadge label="Procurement Sourcing Desk" /> */}
              </div>

              <h3 
                style={{
                  animation: isVisible ? "procurementSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 180ms both" : "none",
                  opacity: isVisible ? undefined : 0,
                }}
                className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#0d0f11] tracking-tight leading-snug"
              >
                YOU GIVE US THE REQUIREMENT. WE MANAGE THE PROCUREMENT.
              </h3>

              <p 
                style={{
                  animation: isVisible ? "procurementSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 270ms both" : "none",
                  opacity: isVisible ? undefined : 0,
                }}
                className="text-sm sm:text-[15px] text-gray-600 leading-relaxed max-w-3xl"
              >
                Stop chasing multiple vendors. Send your technical specs or BOM spreadsheet to receive a consolidated GST quote within 2 to 4 business hours.
              </p>
            </div>

          </div>

          {/* Right Side: Action Buttons side by side with Staggered Entrance */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-3.5 shrink-0">
            
            {/* Button 1: Send My Requirement */}
            <div
              style={{
                animation: isVisible ? "procurementButtonsSlide 0.75s cubic-bezier(0.16, 1, 0.3, 1) 340ms both" : "none",
                opacity: isVisible ? undefined : 0,
              }}
            >
              <button
                type="button"
                onClick={() => handleOpenProcurement("quote", "Send My Technical Requirement")}
                className="w-full sm:w-auto nex-button-swap inline-flex items-center justify-center gap-2.5 bg-[#111315] hover:bg-black text-white py-3 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer group active:scale-95 whitespace-nowrap"
              >
                <NexChipIcon />
                <span>Send My Requirement</span>
              </button>
            </div>

            {/* Button 2: Upload BOM */}
            <div
              style={{
                animation: isVisible ? "procurementButtonsSlide 0.75s cubic-bezier(0.16, 1, 0.3, 1) 430ms both" : "none",
                opacity: isVisible ? undefined : 0,
              }}
            >
              <button
                type="button"
                onClick={() => handleOpenProcurement("bom", "Upload BOM Spreadsheet")}
                className="w-full sm:w-auto nex-button-swap inline-flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-900 text-[#111315] py-3 rounded-full font-medium text-sm transition-all shadow-2xs hover:shadow-xs cursor-pointer group active:scale-95 whitespace-nowrap"
              >
                <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-gray-800 shrink-0 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </span>
                <span>Upload BOM</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
