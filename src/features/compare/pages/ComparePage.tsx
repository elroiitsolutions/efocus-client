import { useCompareStore, type CompareItem } from "../store/compare.store"
import { useQuoteStore } from "@/features/quote/store/quote.store"
import { Trash2, ArrowLeft, ArrowLeftRight, ShoppingBag, Check, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

const BRAND_BADGE_THEMES: Record<string, { label?: string; className: string }> = {
  "3m": { label: "3M", className: "font-black text-[#D32F2F] tracking-tighter bg-red-50 border-red-200" },
  "ieee": { label: "IEEE", className: "font-black italic text-[#00629B] bg-white border-[#38bdf8]" },
  "iee": { label: "IEEE", className: "font-black italic text-[#00629B] bg-white border-[#38bdf8]" },
  "impinj": { label: "IMPINJ", className: "font-bold text-[#E84E1B] bg-orange-50 border-orange-200" },
  "honeywell": { label: "Honeywell", className: "font-black text-[#DE1F27] tracking-tight bg-red-50 border-red-200" },
  "weller": { label: "Weller", className: "font-bold text-[#00897B] bg-teal-50 border-teal-200" },
  "quick": { label: "QUICK", className: "font-bold text-[#1565C0] bg-gray-50 border-gray-200" },
  "fluke": { label: "FLUKE", className: "font-black text-black bg-[#FFD100] border-[#FFD100]" },
}

function MiniBrandBadge({ name }: { name: string }) {
  const brandKey = Object.keys(BRAND_BADGE_THEMES).find((key) =>
    (name || "").toLowerCase().includes(key)
  )
  const theme = brandKey ? BRAND_BADGE_THEMES[brandKey] : null
  const displayLabel = theme?.label || name || "Generic"
  const badgeStyle = theme?.className || "font-bold text-gray-700 bg-gray-100 border-gray-200"

  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded border inline-block ${badgeStyle}`}>
      {displayLabel}
    </span>
  )
}

export default function ComparePage() {
  const compareItems = useCompareStore((state) => state.items)
  const removeItem = useCompareStore((state) => state.removeItem)
  const clearCompare = useCompareStore((state) => state.clearCompare)

  const addItem = useQuoteStore((state) => state.addItem)
  const openDrawer = useQuoteStore((state) => state.openDrawer)
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAddToQuote = (item: CompareItem) => {
    addItem({
      id: item.id || item.sku,
      name: item.name,
      category: item.category,
      qty: 1,
      code: item.code || item.sku,
    })
    setAddedId(item.id || item.sku)
    setTimeout(() => setAddedId(null), 1800)
    openDrawer()
  }

  const handleAddAllToQuote = () => {
    compareItems.forEach((item) => {
      addItem({
        id: item.id || item.sku,
        name: item.name,
        category: item.category,
        qty: 1,
        code: item.code || item.sku,
      })
    })
    openDrawer()
  }

  return (
    <div className="bg-[#f9f9fb] min-h-screen py-12 sm:py-16 text-left">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#eaeaea] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-[#c8102e] flex items-center justify-center">
                <ArrowLeftRight size={18} strokeWidth={2.2} />
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#222222]">
                Product Comparison
              </h1>
              {compareItems.length > 0 && (
                <span className="text-xs font-bold text-gray-700 bg-gray-200/80 px-2 py-0.5 rounded-full">
                  {compareItems.length} {compareItems.length === 1 ? "Product" : "Products"}
                </span>
              )}
            </div>
            <p className="text-[13.6px] text-[#777777] mt-1.5">
              Side-by-side technical specification matrix to assist your engineering and procurement evaluation.
            </p>
          </div>

          {compareItems.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddAllToQuote}
                className="bg-[#111315] hover:bg-black text-white px-3.5 py-2 rounded-[6px] text-[12.5px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <ShoppingBag size={14} />
                <span>Add All to Quote Basket</span>
              </button>
              <button
                onClick={clearCompare}
                className="text-[13px] text-[#c8102e] hover:underline font-bold cursor-pointer py-1"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {compareItems.length === 0 ? (
          <div className="bg-white rounded-[10px] border border-[#eaeaea] py-24 text-center px-4 max-w-[800px] mx-auto shadow-2xs">
            <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <ArrowLeftRight size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">
              No products selected for comparison
            </h3>
            <p className="text-[14px] text-[#777777] max-w-md mx-auto mb-6">
              Click the compare icon (<ArrowLeftRight size={13} className="inline mx-1 text-gray-600" />) on any product details page or card to add it to this side-by-side technical comparison matrix.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80c25] text-white px-5 py-2.5 rounded-[6px] text-[13.6px] font-bold transition-colors shadow-xs"
            >
              <ArrowLeft size={16} /> Browse Component Catalog
            </Link>
          </div>
        ) : (
          /* Side-by-Side Comparison Matrix */
          <div className="space-y-6">
            <div className="bg-white rounded-[12px] border border-[#eaeaea] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
                  
                  {/* Top Row: Product Cards with Photos & Primary Actions */}
                  <thead>
                    <tr className="border-b border-[#eaeaea] bg-gray-50/50">
                      <th className="p-4 w-32 sm:w-44 font-bold text-gray-500 uppercase text-[10px] sm:text-[11px] tracking-wider align-top bg-gray-100/60">
                        Products
                      </th>
                      {compareItems.map((item) => (
                        <th key={item.id} className="p-4 sm:p-5 min-w-[220px] sm:min-w-[260px] max-w-[320px] align-top bg-white">
                          <div className="flex flex-col items-center text-center">
                            {/* Product Image */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-[#f8f9fa] border border-[#eaeaea] flex items-center justify-center p-2 mb-3">
                              <img
                                src={item.image || "/images/cat_cables_1785994179162.png"}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain"
                                onError={(e) => {
                                  ;(e.target as HTMLImageElement).src =
                                    "/images/cat_cables_1785994179162.png"
                                }}
                              />
                            </div>

                            {/* Brand Badge */}
                            <div className="mb-1.5">
                              <MiniBrandBadge name={item.brand || "Generic"} />
                            </div>

                            {/* Product Title */}
                            <Link
                              to={`/products/${item.sku}`}
                              className="font-heading font-bold text-[13px] sm:text-[14px] text-[#222222] hover:text-[#c8102e] transition-colors leading-snug line-clamp-2 min-h-[38px]"
                              title={item.name}
                            >
                              {item.name}
                            </Link>

                            {/* SKU Code */}
                            <span className="text-[11px] font-mono text-gray-500 font-semibold mt-1">
                              {item.code || item.sku}
                            </span>

                            {/* Action Buttons */}
                            <div className="mt-3.5 flex items-center gap-2 w-full">
                              <button
                                onClick={() => handleAddToQuote(item)}
                                className={`flex-1 py-2 px-3 rounded-[6px] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                  addedId === (item.id || item.sku)
                                    ? "bg-emerald-600 text-white"
                                    : "bg-[#c8102e] hover:bg-[#a80c25] text-white"
                                }`}
                              >
                                {addedId === (item.id || item.sku) ? (
                                  <>
                                    <Check size={14} /> Added!
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag size={13} /> Add to Quote
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => removeItem(item.id)}
                                className="w-8 h-8 rounded-[6px] border border-[#eaeaea] text-gray-400 hover:text-[#c8102e] hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                title="Remove from Comparison"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            {/* Link to view product */}
                            <Link
                              to={`/products/${item.sku}`}
                              className="mt-2 text-[11px] text-[#0284c7] hover:underline flex items-center gap-1 font-medium"
                            >
                              View Product Details <ExternalLink size={10} />
                            </Link>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Specification Breakdown Rows */}
                  <tbody className="divide-y divide-[#eaeaea]">
                    {/* Brand */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-700 bg-gray-50/70">
                        Brand
                      </td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3.5 sm:p-4">
                          <MiniBrandBadge name={item.brand || "Generic"} />
                        </td>
                      ))}
                    </tr>

                    {/* MPN / Catalog Code */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-700 bg-gray-50/70">
                        MPN / SKU
                      </td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3.5 sm:p-4 font-mono font-medium text-gray-900">
                          {item.code || item.sku}
                        </td>
                      ))}
                    </tr>

                    {/* Category */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-700 bg-gray-50/70">
                        Category
                      </td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3.5 sm:p-4 text-gray-800">
                          {item.category || "Industrial Sourcing"}
                        </td>
                      ))}
                    </tr>

                    {/* Key Spec 1 */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-700 bg-gray-50/70">
                        Specification 1
                      </td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3.5 sm:p-4 text-gray-900 font-medium">
                          {item.key_spec_1 || "Industrial Standard Grade"}
                        </td>
                      ))}
                    </tr>

                    {/* Key Spec 2 */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-700 bg-gray-50/70">
                        Specification 2
                      </td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3.5 sm:p-4 text-gray-900 font-medium">
                          {item.key_spec_2 || "Certified Direct Spec"}
                        </td>
                      ))}
                    </tr>

                    {/* Key Spec 3 */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-700 bg-gray-50/70">
                        Specification 3
                      </td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3.5 sm:p-4 text-gray-900 font-medium">
                          {item.key_spec_3 || "Drop-in Compatible"}
                        </td>
                      ))}
                    </tr>

                    {/* Availability */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-700 bg-gray-50/70">
                        Availability
                      </td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3.5 sm:p-4">
                          {item.stock_status === "out_of_stock" ? (
                            <span className="font-bold text-[#c8102e] bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[11px]">
                              Out of Stock
                            </span>
                          ) : (
                            <span className="font-bold text-[#16a34a] bg-green-50 border border-green-200 px-2 py-0.5 rounded text-[11px]">
                              In Stock
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Pricing */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-700 bg-gray-50/70">
                        Pricing Model
                      </td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3.5 sm:p-4 font-bold text-gray-900">
                          Custom B2B Quotation (GST Invoiced)
                        </td>
                      ))}
                    </tr>

                    {/* Short Description */}
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-700 bg-gray-50/70">
                        Overview
                      </td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3.5 sm:p-4 text-gray-600 text-[12px] leading-relaxed">
                          {item.short_description || "Industrial component designed for high-uptime manufacturing & automated production lines."}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Support Banner matching eFocus Theme */}
            <div className="bg-white border border-[#eaeaea] rounded-[10px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
              <div>
                <h4 className="font-heading font-bold text-[15px] text-gray-900">
                  Looking for a drop-in substitute or cross-reference matching?
                </h4>
                <p className="text-[12.5px] text-gray-500 mt-0.5">
                  Our application engineering team provides free cross-reference analysis for obsolete, high-lead-time, or alternative vendor parts.
                </p>
              </div>
              <Link
                to="/contact"
                className="bg-[#111315] hover:bg-black text-white px-5 py-2.5 rounded-[6px] text-[13px] font-bold shrink-0 transition-colors cursor-pointer"
              >
                Contact Engineering Desk
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
