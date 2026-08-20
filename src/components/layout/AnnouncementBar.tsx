export default function AnnouncementBar() {
  return (
    <div className="bg-[#B20602] text-white text-[13px] font-medium py-[8.8px]">
      <div className="max-w-[1380px] mx-auto px-6 flex justify-between items-center gap-4">
        {/* Top Socials */}
        <div className="flex gap-[13.6px] items-center">
          <a href="#" aria-label="Twitter" className="opacity-90 hover:opacity-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="opacity-90 hover:opacity-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="opacity-90 hover:opacity-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* Center Text */}
        {/* <div className="font-semibold text-center flex-1 hidden sm:block">
          <span>
            The full product range, one accountable vendor. &bull;{" "}
            <a href="#brochure" className="underline hover:text-gray-200">
              Cat. No. EF-2026/CI Brochure &rarr;
            </a>
          </span>
        </div> */}

        {/* Empty Spacer to visually balance top socials */}
        <div className="hidden sm:block w-[70px]" />
      </div>
    </div>
  )
}
