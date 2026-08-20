import { useState } from "react"
import { useQuoteStore } from "@/features/quote/store/quote.store"
import { Star, Check, Plus, Minus } from "lucide-react"

export default function ProductHighlight() {
  const addItem = useQuoteStore((state) => state.addItem)
  const openDrawer = useQuoteStore((state) => state.openDrawer)

  const [activeThumb, setActiveThumb] = useState(0)
  const [assemblyType, setAssemblyType] = useState("Ribbon Cables")
  const [insulation, setInsulation] = useState("Standard Flat Ribbon")
  const [qty, setQty] = useState(1)

  const thumbnails = [
    "/images/custom_harness_main_1785994250993.png",
    "/images/cat_cables_1785994179162.png",
    "/images/cat_rf_1785994214462.png",
    "/images/cat_tools_1785994233090.png",
  ]

  const assemblyOptions = [
    "Ribbon Cables",
    "Wire Harnesses",
    "Internal Wiring",
    "Custom Connectors",
  ]

  const insulationOptions = [
    { name: "Standard Flat Ribbon", colorClass: "bg-gray-400" },
    { name: "Rose Accent Line", colorClass: "bg-[#B20602]" },
    { name: "High-Temp Black Silicone", colorClass: "bg-gray-800" },
    { name: "Shielded Braided Sleeving", colorClass: "bg-slate-500" },
  ]

  const handleAddToQuote = () => {
    addItem({
      id: "CST-HIGHLIGHT",
      name: `Custom Build - ${assemblyType} (${insulation})`,
      category: "Custom & Assembly",
      qty: qty,
      code: "CST-001–006",
      specs: {
        assemblyType,
        insulationOption: insulation,
      },
    })
    openDrawer()
  }

  return (
    <section className="py-16 max-w-[1380px] mx-auto px-4 sm:px-6" id="custom-highlight">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[16px] border border-[#eaeaea] p-4 sm:p-6 lg:p-10 shadow-sm">
        {/* Left Side: Thumbnail Slider */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-[10px] border border-[#eaeaea] overflow-hidden bg-gray-50 flex items-center justify-center p-6">
            <span className="absolute top-4 left-4 bg-[#B20602] text-white text-[10px] font-bold px-2.5 py-1 rounded-[4px] tracking-wider uppercase">
              SPEC BUILT
            </span>
            <img
              src={thumbnails[activeThumb]}
              alt="Custom Ribbon & Wire Harness Assemblies"
              className="max-h-[340px] w-auto object-contain transition-opacity duration-300"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  "https://placehold.co/400x400/ffffff/ee2761?text=Harness"
              }}
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {thumbnails.map((thumb, idx) => (
              <div
                key={idx}
                onClick={() => setActiveThumb(idx)}
                className={`aspect-square rounded-[6px] border-2 cursor-pointer overflow-hidden p-2 flex items-center justify-center bg-gray-50 ${
                  activeThumb === idx ? "border-[#B20602]" : "border-[#eaeaea] hover:border-gray-400"
                }`}
              >
                <img
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  className="max-h-full w-auto object-contain"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      "https://placehold.co/100x100/ffffff/ee2761?text=Harness"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Options Form details */}
        <div className="flex flex-col justify-start text-left">
          <div>
            <span className="text-[12px] font-bold text-[#777777] uppercase tracking-wider">
              CST-001–006 &bull; CUSTOM & ASSEMBLY
            </span>
            <h2 className="font-heading text-[28px] sm:text-[34px] font-extrabold text-[#222222] tracking-tight leading-tight mt-1.5">
              Ribbon, Harnesses & Custom Builds
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-[13px] text-[#555555] font-semibold">
                5.0 (IPC-WHMA-A-620 Spec Certified)
              </span>
            </div>

            <p className="text-[#555555] text-[14.4px] mt-4 leading-relaxed">
              Engineered and assembled to exact pinout, length, and shielding requirements. Sourced, crimped, and 100% continuity-tested prior to dispatch from one accountable vendor.
            </p>

            {/* Option Selection Group 1 */}
            <div className="mt-6 flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#222222]">
                Select Assembly Type:
              </label>
              <div className="flex flex-wrap gap-2">
                {assemblyOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAssemblyType(opt)}
                    className={`px-4 py-2 rounded-[6px] text-[12.8px] font-bold border transition-colors cursor-pointer ${
                      assemblyType === opt
                        ? "bg-[#B20602] border-[#B20602] text-white"
                        : "bg-[#f4f5f8] border-[#eaeaea] text-[#555555] hover:border-gray-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Option Selection Group 2 */}
            <div className="mt-6 flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#222222]">
                Insulation & Sheath Option:
              </label>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex gap-2">
                  {insulationOptions.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => setInsulation(opt.name)}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer ${opt.colorClass} ${
                        insulation === opt.name ? "border-[#B20602] scale-110" : "border-transparent"
                      }`}
                      title={opt.name}
                    />
                  ))}
                </div>
                <span className="text-[13px] text-[#555555] font-semibold">
                  {insulation}
                </span>
              </div>
            </div>
          </div>

          {/* Qty Picker & CTA Button */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div className="flex items-center border border-[#d1d5db] rounded-[6px] overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 bg-[#f4f5f8] hover:bg-gray-200 text-[#555555] font-bold cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="text"
                  value={qty}
                  readOnly
                  className="w-12 text-center text-[14.4px] font-bold text-[#222222] border-none outline-none bg-white"
                  aria-label="Quantity"
                />
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 bg-[#f4f5f8] hover:bg-gray-200 text-[#555555] font-bold cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToQuote}
                className="bg-[#B20602] hover:bg-[#900502] text-white px-6 py-3 rounded-[6px] text-[14px] font-bold transition-colors cursor-pointer flex-1"
              >
                Request Custom Build Quote
              </button>
            </div>

            {/* Bullets lists */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[13px] text-[#555555]">
                <Check size={16} className="text-[#B20602]" strokeWidth={3} />
                <span>Single-Vendor Procurement — zero split orders</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#555555]">
                <Check size={16} className="text-[#B20602]" strokeWidth={3} />
                <span>100% Continuity, Hipot & Pinout Verifications</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#555555]">
                <Check size={16} className="text-[#B20602]" strokeWidth={3} />
                <span>Dispatched fast with batch traceability labels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
