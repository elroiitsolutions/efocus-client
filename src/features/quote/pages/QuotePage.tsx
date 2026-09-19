import React, { useState } from "react"
import { useQuoteStore } from "../store/quote.store"
import { Trash2, Plus, Minus, FileText } from "lucide-react"
import { Link } from "react-router-dom"
import SuccessModal from "@/components/ui/SuccessModal"

export default function QuotePage() {
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

  return (
    <>
    <div className="bg-[#f9f9fb] min-h-screen py-16 text-left">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="border-b border-[#eaeaea] pb-6 mb-8">
          <h1 className="font-heading text-3xl font-extrabold text-[#222222]">
            Consolidated Quote Basket
          </h1>
          <p className="text-[13.6px] text-[#777777] mt-1">
            Submit your multi-line RFQ below. Sourced quotes will be unified into one single shipping invoice.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-[10px] border border-[#eaeaea] py-24 text-center">
            <p className="text-[15.2px] text-[#777777] mb-4">
              Your quote request basket is currently empty.
            </p>
            <Link
              to="/products"
              className="bg-[#c8102e] hover:bg-[#a80c25] text-white px-6 py-2.5 rounded-[6px] text-[13.6px] font-bold inline-block"
            >
              Browse Stocked Lines
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Table */}
            <div className="lg:col-span-7 bg-white rounded-[10px] border border-[#eaeaea] p-4 sm:p-6 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-center pb-4 border-b border-[#eaeaea]">
                <h3 className="font-heading text-[16px] font-bold text-[#222222]">
                  Quote Lines ({items.length})
                </h3>
                <button
                  onClick={clearQuote}
                  className="text-[12px] text-[#c8102e] hover:underline font-bold"
                >
                  Remove All
                </button>
              </div>

              <div className="flex flex-col gap-4 divide-y divide-[#eaeaea]">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pt-4 first:pt-0">
                    <div>
                      <span className="text-[10px] font-bold text-[#c8102e] uppercase tracking-wide">
                        {item.code}
                      </span>
                      <h4 className="font-heading text-[14.4px] font-bold text-[#222222] mt-0.5">
                        {item.name}
                      </h4>
                      <span className="text-[11.2px] text-[#777777]">{item.category}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center border border-[#d1d5db] rounded-[4px] overflow-hidden bg-white">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="px-2 py-1 bg-[#f4f5f8] hover:bg-gray-200 text-[#555555] font-bold"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-[13px] font-bold text-[#222222]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="px-2 py-1 bg-[#f4f5f8] hover:bg-gray-200 text-[#555555] font-bold"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-[#c8102e] p-1.5 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Intake Form details */}
            <div className="lg:col-span-5 bg-[#fafbfd] border border-[#eaeaea] rounded-[10px] p-4 sm:p-6 shadow-sm flex flex-col gap-6">
              <h3 className="font-heading text-[18px] font-bold text-[#222222] border-b border-[#eaeaea] pb-4 flex items-center gap-2">
                <FileText size={18} className="text-[#c8102e]" />
                <span>Submit Sourcing RFQ</span>
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#222222]">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-white border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#c8102e]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#222222]">Business Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                    className="w-full bg-white border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#c8102e]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#222222]">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Electronics Ltd."
                    required
                    className="w-full bg-white border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#c8102e]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#222222]">
                    Consolidation Notes / Special Instructions
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Please source matching alternative lead-free fluxes, consolidate into one shipment by Aug 20th..."
                    rows={4}
                    className="w-full bg-white border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#c8102e]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#c8102e] hover:bg-[#a80c25] text-white py-3 rounded-[6px] text-[14px] font-bold transition-colors cursor-pointer w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    <SuccessModal
      isOpen={isSuccessOpen}
      onClose={handleSuccessClose}
      title="Request Submitted!"
      message="Your consolidated quote request has been sent to chandruravichandran1536@gmail.com. Sourced matches will also be emailed to you."
      submitterEmail={formData.email}
    />
    </>
  )
}
