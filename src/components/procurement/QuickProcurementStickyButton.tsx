import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import QuickProcurementModal from "./QuickProcurementModal";

interface QuickProcurementStickyButtonProps {
  className?: string;
}

export default function QuickProcurementStickyButton({ className }: QuickProcurementStickyButtonProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultMode, setDefaultMode] = useState<"quote" | "bom">("quote");

  useEffect(() => {
    // Global event listener to allow navbar buttons ("Upload BOM", "Get a Quote") to trigger the modal
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: "quote" | "bom" }>;
      setDefaultMode(customEvent.detail?.mode || "quote");
      setIsOpen(true);
    };

    window.addEventListener("open-procurement-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-procurement-modal", handleOpenModal);
    };
  }, []);

  return (
    <>
      {/* Quick Procurement Floating Trigger Button */}
      <div 
        aria-label="Quick Procurement Desk Floating Trigger"
        className={cn(
          className 
            ? "pointer-events-auto flex flex-col items-end group" 
            : "fixed bottom-6 right-6 z-40 flex flex-col items-end group",
          className
        )}
      >
        <button
          onClick={() => {
            setDefaultMode("quote");
            setIsOpen(true);
          }}
          className="relative flex items-center gap-2 sm:gap-3 bg-[#111315] hover:bg-black text-white pl-3.5 pr-4 py-2.5 sm:pl-4 sm:pr-5 sm:py-3 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.25)] border-2 border-white/20 hover:border-red-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          {/* Animated Glow Pill */}
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-500"></span>
          </span>

          {/* Button Text */}
          <div className="text-left flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white leading-tight">
              Quick Procurement Desk
            </span>
          </div>

          {/* Arrow */}
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* Popup Form Modal */}
      <QuickProcurementModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultMode={defaultMode}
      />
    </>
  );
}
