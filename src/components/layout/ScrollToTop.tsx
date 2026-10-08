import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  className?: string;
}

export default function ScrollToTop({ className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)) : 0;
      
      setScrollProgress(progress);
      setIsVisible(scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Circular progress calculations for r = 18
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      aria-label="Scroll to top navigation"
      className={cn(
        "pointer-events-auto relative flex items-center transition-all duration-300 ease-out group",
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-3 scale-90 pointer-events-none select-none",
        className
      )}
    >
      {/* Tooltip on hover (positioned to the left of the button) */}
      <div 
        role="tooltip"
        className="pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#111315]/95 text-white text-xs font-medium border border-white/10 shadow-xl opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50"
      >
        <span>Top</span>
        <span className="text-[10px] text-red-400 font-mono">
          {Math.round(scrollProgress)}%
        </span>
      </div>

      {/* Interactive Floating Circular Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        tabIndex={isVisible ? 0 : -1}
        className="relative w-11 h-11 rounded-full flex items-center justify-center bg-[#111315]/90 hover:bg-black text-white border border-white/20 hover:border-red-500/70 shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_0_20px_rgba(200,16,46,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111315]"
      >
        {/* SVG Circular Progress Track & Indicator */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 44 44"
          aria-hidden="true"
        >
          {/* Subtle background track */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-white/10"
          />
          {/* Active progress arc in eFocus red */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="transparent"
            stroke="#c8102e"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* Up Arrow Icon with micro-bounce on hover */}
        <ArrowUp
          className="w-4 h-4 text-white group-hover:text-red-400 group-hover:-translate-y-0.5 transition-all duration-200"
          strokeWidth={2.4}
        />
      </button>
    </div>
  );
}
