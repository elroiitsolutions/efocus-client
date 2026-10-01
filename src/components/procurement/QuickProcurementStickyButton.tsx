import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import QuickProcurementModal from "./QuickProcurementModal";

export default function QuickProcurementStickyButton() {
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
      {/* Right Corner Sticky Floating Button */}
      <aside 
        aria-label="Quick Procurement Desk Floating Trigger"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end group"
      >
        <button
          onClick={() => {
            setDefaultMode("quote");
            setIsOpen(true);
          }}
          className="relative flex items-center gap-3 bg-[#111315] hover:bg-black text-white pl-4 pr-5 py-3 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.25)] border-2 border-white/20 hover:border-red-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          {/* Animated Glow Pill */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>

          {/* Button Text */}
          <div className="text-left flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white leading-tight">
              Quick Procurement Desk
            </span>
          </div>

          {/* Arrow */}
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </aside>

      {/* Popup Form Modal */}
      <QuickProcurementModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultMode={defaultMode}
      />
    </>
  );
}
