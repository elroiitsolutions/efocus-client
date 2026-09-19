import React, { useState } from "react"
import { Star, CheckCircle2, X } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  submitterEmail?: string
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  submitterEmail
}: SuccessModalProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedbackText, setFeedbackText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Please select a star rating first!")
      return
    }

    setIsSubmitting(true)
    try {
      await fetch("https://formsubmit.co/ajax/chandruravichandran1536@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Customer Feedback: ${rating} Stars`,
          "Submitter Email": submitterEmail || "Anonymous",
          "Feedback Rating": `${rating} Stars`,
          "User Comments": feedbackText || "No comments left."
        })
      })
      setIsSubmitted(true)
    } catch (err) {
      console.error("Failed to send feedback:", err)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out animate-fade-in">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-2xl border border-[#eaeaea] overflow-hidden transform scale-95 opacity-0 animate-scale-up flex flex-col relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#999999] hover:text-[#222222] transition-colors p-1.5 rounded-full hover:bg-[#f4f5f8] cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          {/* Animated Success Icon */}
          <div className="w-16 h-16 bg-[#FFF1F2] rounded-full flex items-center justify-center mb-5 animate-bounce-slow">
            <CheckCircle2 size={36} className="text-[#c8102e]" />
          </div>

          <h2 className="font-heading text-2xl font-extrabold text-[#222222] mb-2 leading-tight">
            {title}
          </h2>
          <p className="text-[14px] text-[#555555] leading-relaxed mb-6 px-2">
            {message}
          </p>

          <hr className="w-full border-t border-[#eaeaea] mb-6" />

          {/* Feedback Form */}
          {!isSubmitted ? (
            <form onSubmit={handleFeedbackSubmit} className="w-full flex flex-col items-center">
              <h4 className="text-[14px] font-bold text-[#222222] mb-3">
                How would you rate your experience?
              </h4>

              {/* Star Rating Selectors */}
              <div className="flex items-center gap-1.5 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={`transition-colors duration-150 ${
                        star <= (hoverRating || rating)
                          ? "fill-[#FFC107] text-[#FFC107]"
                          : "text-[#d1d5db]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Comments Textarea */}
              <div className="w-full mb-5 text-left">
                <label className="text-[12px] font-semibold text-[#777777] mb-1.5 block">
                  Add a comment (Optional)
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tell us what you liked or how we can improve..."
                  rows={3}
                  className="w-full bg-[#f9fafb] border border-[#d1d5db] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#c8102e] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Actions */}
              <div className="w-full flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-[#d1d5db] hover:bg-[#f4f5f8] text-[#555555] py-2.5 rounded-lg text-[13.5px] font-semibold transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  disabled={rating === 0 || isSubmitting}
                  className="flex-1 bg-[#c8102e] hover:bg-[#a80c25] text-white py-2.5 rounded-lg text-[13.5px] font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          ) : (
            <div className="w-full flex flex-col items-center py-4 animate-fade-in">
              <h4 className="text-[16px] font-bold text-[#c8102e] mb-1.5">
                Thank you for your feedback!
              </h4>
              <p className="text-[13px] text-[#777777] mb-6">
                Your rating helps us improve our custom industrial cabling service.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-[#222222] hover:bg-[#111111] text-white py-2.5 rounded-lg text-[13.5px] font-semibold transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
