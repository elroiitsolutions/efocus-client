import React, { useState } from "react"
import { useQuoteStore } from "../store/quote.store"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingBag, Send } from "lucide-react"
import SuccessModal from "@/components/ui/SuccessModal"

export default function QuoteDrawer() {
  const isDrawerOpen = useQuoteStore((state) => state.isDrawerOpen)
  const closeDrawer = useQuoteStore((state) => state.closeDrawer)
  const items = useQuoteStore((state) => state.items)
  const updateQty = useQuoteStore((state) => state.updateQty)
  const removeItem = useQuoteStore((state) => state.removeItem)
  const clearQuote = useQuoteStore((state) => state.clearQuote)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const itemsFormatted = items.map((item, idx) => 
        `${idx + 1}. [${item.name}] - Part/SKU: ${item.code || item.id} | Category: ${item.category} | Qty: ${item.qty}`
      ).join('\n\n');

      const response = await fetch(`https://formsubmit.co/ajax/chandruravichandran1536@gmail.com`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Consolidated Quote Request from ${formData.name} (${formData.company})`,
          "Customer Name": formData.name,
          "Work Email": formData.email,
          "Company Name": formData.company,
          "Additional Message": formData.message || "None",
          "Requested Products List": itemsFormatted
        }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setIsSuccessOpen(true)
        clearQuote()
        closeDrawer()
      } else {
        alert("Failed to submit quote request. Please try again.")
      }
    } catch (err) {
      console.error(err)
      alert("Failed to connect to the server. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    setIsSuccessOpen(false)
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <>
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent
        side="right"
        className="w-[100vw] max-w-[440px] flex flex-col h-full p-0 bg-white overflow-hidden"
      >
        {/* ─── Drawer Header ─── */}
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-[#eaeaea] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FFF1F2] flex items-center justify-center">
                <ShoppingBag size={18} className="text-[#c8102e]" />
              </div>
              <div>
                <SheetTitle className="text-[18px] font-bold text-[#222222] leading-tight">
                  Quote Basket
                </SheetTitle>
                <SheetDescription className="text-[12px] text-[#888888] mt-0">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </SheetDescription>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* ─── Info Banner ─── */}
        <div className="px-5 pt-4 shrink-0">
          <div className="text-[12.5px] text-[#555555] leading-relaxed bg-[#f4f8ff] px-3.5 py-3 rounded-lg border border-[#dce6f5]">
            Items will be sent to{" "}
            <strong className="text-[#222222]">chandruravichandran1536@gmail.com</strong>{" "}
            for consolidated single-vendor pricing.
          </div>
        </div>

        {/* ─── Items List (scrollable middle section) ─── */}
        <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#f4f5f8] flex items-center justify-center mb-4">
                <ShoppingBag size={28} className="text-[#bbbbbb]" />
              </div>
              <p className="text-[#777777] text-[15px] font-medium mb-1">
                Your basket is empty
              </p>
              <p className="text-[#999999] text-[13px] mb-5">
                Add products to request a quote
              </p>
              <button
                onClick={closeDrawer}
                className="bg-[#c8102e] hover:bg-[#a80c25] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold transition-colors cursor-pointer"
              >
                Explore Stocked Lines
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#eaeaea] rounded-lg p-3.5 hover:border-[#d1d5db] transition-colors"
                >
                  {/* Top Row: Code + Remove */}
                  <div className="flex items-center justify-between mb-1.5">
                    <Badge
                      variant="outline"
                      className="text-[10.5px] font-bold text-[#c8102e] border-[#c8102e]/30 bg-[#FFF1F2] px-2 py-0 h-5 rounded-full uppercase tracking-wider"
                    >
                      {item.code}
                    </Badge>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#bbbbbb] hover:text-[#c8102e] transition-colors p-0.5 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Product Name */}
                  <h5 className="text-[13.5px] font-semibold text-[#222222] leading-snug line-clamp-2 mb-1">
                    {item.name}
                  </h5>

                  {/* Category */}
                  <p className="text-[11.5px] text-[#888888] mb-2.5">{item.category}</p>

                  {/* Specs (if present) */}
                  {item.specs && (
                    <div className="text-[11px] text-[#666666] bg-[#f7f8fa] px-2.5 py-1.5 rounded-md mb-2.5 space-y-0.5">
                      {item.specs.assemblyType && (
                        <div>
                          <span className="text-[#999999]">Type:</span>{" "}
                          {item.specs.assemblyType}
                        </div>
                      )}
                      {item.specs.insulationOption && (
                        <div>
                          <span className="text-[#999999]">Insulation:</span>{" "}
                          {item.specs.insulationOption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-[#999999] font-medium mr-1.5">Qty</span>
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-[#d1d5db] bg-[#f9fafb] hover:bg-[#eaeaea] text-[#555555] cursor-pointer transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-9 text-center text-[13px] font-bold text-[#222222]">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-[#d1d5db] bg-[#f9fafb] hover:bg-[#eaeaea] text-[#555555] cursor-pointer transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Clear All */}
              {items.length > 1 && (
                <button
                  onClick={clearQuote}
                  className="text-[12px] text-[#999999] hover:text-[#c8102e] transition-colors self-end mt-1 cursor-pointer font-medium"
                >
                  Clear all items
                </button>
              )}
            </div>
          )}
        </div>

        {/* ─── Footer Quote Form ─── */}
        {items.length > 0 && (
          <div className="border-t border-[#eaeaea] bg-[#f9fafb] shrink-0 max-h-[45vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3.5">
              <Separator className="mb-0.5" />
              <p className="text-[12px] text-[#777777] font-medium -mt-2">
                Complete the form below to submit your quote request
              </p>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#333333]">
                  Full Name <span className="text-[#c8102e]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-white border border-[#d1d5db] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]/20 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#333333]">
                  Work Email <span className="text-[#c8102e]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  className="bg-white border border-[#d1d5db] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]/20 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#333333]">
                  Company / EMS Name <span className="text-[#c8102e]">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Electronics Ltd."
                  required
                  className="bg-white border border-[#d1d5db] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]/20 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c8102e] hover:bg-[#a80c25] text-white py-3 rounded-lg text-[13.5px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Submit Consolidated Quote Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </SheetContent>
    </Sheet>
    <SuccessModal
      isOpen={isSuccessOpen}
      onClose={handleSuccessClose}
      title="Request Submitted!"
      message="Your consolidated quote request has been sent to chandruravichandran1536@gmail.com. We will be in touch shortly with unified vendor pricing."
      submitterEmail={formData.email}
    />
    </>
  )
}
