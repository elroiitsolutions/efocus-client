import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, CheckCircle2, RotateCw, Loader2 } from "lucide-react"

interface RequestProductModalProps {
  isOpen: boolean
  onClose: () => void
  initialProductName?: string
}

export default function RequestProductModal({
  isOpen,
  onClose,
  initialProductName = "",
}: RequestProductModalProps) {
  const [query, setQuery] = useState(initialProductName || "")
  const [userContact, setUserContact] = useState("")
  const [isRobotVerified, setIsRobotVerified] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery(initialProductName || "")
      setUserContact("")
      setIsRobotVerified(false)
      setErrorMessage("")
      setIsSubmitted(false)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, initialProductName])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || typeof document === "undefined") return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!query.trim()) {
      setErrorMessage("Please enter a product name, part number, or URL.")
      return
    }

    if (!isRobotVerified) {
      setErrorMessage("Please complete the verification checkbox.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 900)
  }

  const handleReset = () => {
    setQuery("")
    setUserContact("")
    setIsRobotVerified(false)
    setErrorMessage("")
    setIsSubmitted(false)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3.5 sm:p-5 bg-black/60 backdrop-blur-xs overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="relative w-full max-w-[480px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-left"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={19} />
        </button>

        {isSubmitted ? (
          /* Success Screen */
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-xs">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-heading text-xl font-bold text-gray-900">
              Request Received!
            </h3>
            <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-sm mx-auto">
              We've logged your request for <strong>"{query}"</strong>. Our procurement & application engineering team will locate availability and update our catalog shortly.
            </p>
            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header matching Image 2 */}
            <div className="text-center pt-1">
              <h2 className="font-heading text-2xl font-black text-[#111315] tracking-tight">
                Let us know!
              </h2>
              <p className="text-xs sm:text-[13px] font-semibold text-[#0284c7] underline decoration-[#0284c7]/60 underline-offset-3 mt-1.5">
                We'll try to get your product on our website as early as possible
              </p>
            </div>

            {/* Main Search Input */}
            <div className="pt-2">
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  if (errorMessage) setErrorMessage("")
                }}
                placeholder="Type anything – Product Name / Part No / Brand Name / Product Link"
                className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] text-gray-900 placeholder:text-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b91c1c]/20 focus:border-[#b91c1c] transition-all shadow-2xs"
              />
            </div>

            {/* Optional Email Notification Input (eFocus UI addition for real B2B utility) */}
            <div>
              <input
                type="email"
                value={userContact}
                onChange={(e) => setUserContact(e.target.value)}
                placeholder="Your email (optional - to notify you when available)"
                className="w-full px-3.5 py-2 text-xs text-gray-900 placeholder:text-gray-400 bg-gray-50/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b91c1c]/20 focus:border-[#b91c1c] transition-all"
              />
            </div>

            {/* ReCAPTCHA Style Verification Box matching Image 2 */}
            <div className="bg-[#f9fafb] border border-gray-300 rounded-lg p-3 flex items-center justify-between shadow-2xs">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isRobotVerified}
                  onChange={(e) => {
                    setIsRobotVerified(e.target.checked)
                    if (errorMessage) setErrorMessage("")
                  }}
                  className="w-5 h-5 rounded border-gray-300 text-[#b91c1c] focus:ring-[#b91c1c] cursor-pointer"
                />
                <span className="text-xs sm:text-[13px] font-medium text-gray-700">
                  I'm not a robot
                </span>
              </label>

              {/* Recaptcha Branding */}
              <div className="flex flex-col items-center opacity-70">
                <div className="w-6 h-6 flex items-center justify-center text-[#1a73e8]">
                  <RotateCw size={17} strokeWidth={2.2} />
                </div>
                <span className="text-[8.5px] text-gray-500 font-semibold tracking-tight -mt-0.5">
                  reCAPTCHA
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-xs sm:text-[13px] tracking-wide shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 active:scale-99"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit</span>
              )}
            </button>

            {/* Validation / Error Message matching Image 2 */}
            {errorMessage && (
              <p className="text-xs font-semibold text-[#dc2626] text-center pt-0.5 animate-in fade-in duration-150">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </div>,
    document.body
  )
}
