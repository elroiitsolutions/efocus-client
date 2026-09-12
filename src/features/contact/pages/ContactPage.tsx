import React, { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import SuccessModal from "@/components/ui/SuccessModal"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
      const response = await fetch(`https://formsubmit.co/ajax/chandruravichandran1536@gmail.com`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Contact Form Message: ${formData.subject}`,
          "Sender Name": formData.name,
          "Sender Email": formData.email,
          "Subject": formData.subject,
          "Message Content": formData.message
        }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setIsSuccessOpen(true)
      } else {
        alert("Failed to send message. Please try again.")
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
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <>
    <div className="bg-[#f9f9fb] min-h-screen py-16 text-left">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-extrabold text-[#222222] tracking-tight">
            Contact Direct Sales
          </h1>
          <p className="text-[#777777] text-[16px] mt-3 max-w-[700px] mx-auto">
            Get in touch for custom design specifications, volume quotes, or supply agreements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Columns */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-[10px] border border-[#eaeaea] p-6 shadow-sm flex flex-col gap-6">
              <h3 className="font-heading text-[18px] font-bold text-[#222222] border-b border-[#eaeaea] pb-4">
                Sourcing Details
              </h3>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#FFF1F2] text-[#c8102e] rounded-full flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#222222]">Direct Email</h4>
                  <a
                    href="mailto:chandruravichandran1536@gmail.com"
                    className="text-[13px] text-[#555555] font-semibold hover:text-[#c8102e]"
                  >
                    chandruravichandran1536@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#FFF1F2] text-[#c8102e] rounded-full flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#222222]">Phone / WhatsApp</h4>
                  <a
                    href="tel:+917397242650"
                    className="text-[13px] text-[#555555] font-semibold hover:text-[#c8102e]"
                  >
                    +91 7397 242 650
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#FFF1F2] text-[#c8102e] rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#222222]">Operations Office</h4>
                  <p className="text-[13px] text-[#555555] leading-relaxed">
                    eFOCUS Industrial Solutions,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="bg-white rounded-[10px] border border-[#eaeaea] p-6 shadow-sm text-[13.6px] text-[#555555]">
              <h4 className="font-heading text-[15.2px] font-bold text-[#222222] mb-3">
                Working Hours
              </h4>
              <p>Monday – Friday: 9:00 AM – 6:00 PM IST</p>
              <p className="mt-1">Saturday: 9:00 AM – 1:00 PM IST</p>
              <div className="mt-4 bg-[#f9f9fb] p-3 rounded-[6px] border border-[#eaeaea] text-[12.8px]">
                We reply to email requests and drawing submissions within 4-6 business hours.
              </div>
            </div>

          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7 bg-white rounded-[10px] border border-[#eaeaea] p-4 sm:p-6 lg:p-10 shadow-sm">
            <h3 className="font-heading text-[18px] font-bold text-[#222222] border-b border-[#eaeaea] pb-4 flex items-center gap-2 mb-6">
              <MessageSquare size={18} className="text-[#c8102e]" />
              <span>Send Message</span>
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12.8px] font-bold text-[#222222]">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#c8102e]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12.8px] font-bold text-[#222222]">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#c8102e]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12.8px] font-bold text-[#222222]">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Custom RF cable assembly quote request"
                  required
                  className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#c8102e]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12.8px] font-bold text-[#222222]">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify dimensions, connector requirements, or raw part references..."
                  rows={5}
                  required
                  className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#c8102e]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#c8102e] hover:bg-[#a80c25] text-white py-3 rounded-[6px] text-[14px] font-bold transition-colors cursor-pointer w-full mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Sourcing Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
    <SuccessModal
      isOpen={isSuccessOpen}
      onClose={handleSuccessClose}
      title="Message Sent!"
      message="Thank you! Your sourcing request has been successfully sent to chandruravichandran1536@gmail.com. We will get back to you as soon as possible."
      submitterEmail={formData.email}
    />
    </>
  )
}
