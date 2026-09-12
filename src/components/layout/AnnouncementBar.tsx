import { MapPin, Phone } from "lucide-react"

export default function AnnouncementBar() {
  return (
    <div className="bg-[#f2f5f9] border-b border-[#e5e9f0] py-2 text-[12.5px] sm:text-[13px]">
      <div className="site-container flex items-center justify-start gap-5 sm:gap-7 flex-wrap">
        {/* Location */}
        <div className="flex items-center gap-1.5 font-bold text-[#111111]">
          <MapPin size={15} className="text-[#c8102e] shrink-0" />
          <span>Chennai, TN</span>
        </div>

        {/* Sales Phone */}
        <a
          href="tel:+914428001234"
          className="flex items-center gap-1.5 font-bold text-[#111111] hover:text-[#c8102e] transition-colors"
        >
          <Phone size={14.5} className="text-[#15803d] shrink-0" />
          <span>Sales: +91 44 2800 1234</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/919840012345"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-bold text-[#111111] hover:text-[#25D366] transition-colors"
        >
          <svg
            className="w-4 h-4 text-[#25D366] fill-current shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.3.301-.501.101-.2.05-.376-.025-.527-.075-.15-.678-1.633-.929-2.235-.245-.587-.494-.507-.678-.517-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.028-1.054 2.508 1.079 2.909 1.23 3.109c.15.2 2.124 3.243 5.145 4.549.719.311 1.281.497 1.719.636.723.23 1.381.197 1.902.12.58-.087 1.78-.727 2.031-1.429.251-.702.251-1.303.176-1.429-.076-.125-.276-.2-.577-.35zM12.04 2C6.516 2 2.025 6.49 2.025 12.013c0 1.942.556 3.753 1.52 5.289L2 22l4.839-1.503c1.48.887 3.208 1.401 5.201 1.401 5.524 0 10.015-4.49 10.015-10.013C22.055 6.49 17.564 2 12.04 2z" />
          </svg>
          <span>WhatsApp: +91 98400 12345</span>
        </a>
      </div>
    </div>
  )
}
