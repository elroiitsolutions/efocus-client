// Nexsas Logo Icon: Black rounded circle with dot matrix arrow
export function NexsasLogoIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-[#111315] text-white shrink-0 ${className}`}>
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        {/* Diamond dot pattern */}
        <circle cx="8" cy="8" r="1.75" />
        <circle cx="12" cy="8" r="1.75" />
        <circle cx="16" cy="8" r="1.75" />
        <circle cx="10" cy="12" r="1.75" />
        <circle cx="14" cy="12" r="1.75" />
        <circle cx="18" cy="12" r="1.75" />
        <circle cx="8" cy="16" r="1.75" />
        <circle cx="12" cy="16" r="1.75" />
        <circle cx="16" cy="16" r="1.75" />
      </svg>
    </div>
  );
}

// Nexsas Button Chip: Red circle with 3 angled dots
export function NexChipIcon({ bg = "bg-[#AF0202]", text = "text-white", className = "w-8 h-8" }: { bg?: string; text?: string; className?: string }) {
  return (
    <span className={`${className} rounded-full ${bg} flex items-center justify-center ${text} shrink-0 shadow-sm`}>
      <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
        <circle cx="5" cy="5" r="1.4" />
        <circle cx="9" cy="8" r="1.4" />
        <circle cx="5" cy="11" r="1.4" />
      </svg>
    </span>
  );
}

// Nexsas Section Pill Badge
export function NexBadge({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full ${dark ? 'bg-[#111315] text-white' : 'bg-white border border-gray-200/90 shadow-xs text-[#111315]'} text-xs font-semibold tracking-wide`}>
      <span className={`w-5 h-5 rounded-full ${dark ? 'bg-white text-black' : 'bg-[#111315] text-white'} flex items-center justify-center`}>
        <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
          <circle cx="5" cy="5" r="1.2" />
          <circle cx="9" cy="8" r="1.2" />
          <circle cx="5" cy="11" r="1.2" />
        </svg>
      </span>
      <span>{label}</span>
    </div>
  );
}
