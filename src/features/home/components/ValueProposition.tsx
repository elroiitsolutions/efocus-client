import { Clock, ShieldCheck, PackageCheck } from "lucide-react"

export default function ValueProposition() {
  const badges = [
    {
      title: "Fast Turnaround",
      desc: "Official GST quotes within 2 to 4 business hours",
      icon: <Clock size={24} className="text-[#0284c7]" />,
      bgCircle: "bg-[#e0f2fe] border-[#bae6fd]",
    },
    {
      title: "Compliance Ready",
      desc: "Datasheets & calibration certificates included",
      icon: <ShieldCheck size={24} className="text-[#16a34a]" />,
      bgCircle: "bg-[#dcfce7] border-[#bbf7d0]",
    },
    {
      title: "Production Stock",
      desc: "Bulk quantities available for immediate site dispatch",
      icon: <PackageCheck size={24} className="text-[#dc2626]" />,
      bgCircle: "bg-[#fee2e2] border-[#fecaca]",
    },
  ]

  return (
    <section className="bg-white py-6 border-b border-[#eaeaea]">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {badges.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 text-left ${
                idx > 0 ? "pt-4 md:pt-0 md:pl-8" : ""
              }`}
            >
              {/* Circular Icon matching home.pdf */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${item.bgCircle}`}
              >
                {item.icon}
              </div>

              {/* Text content */}
              <div>
                <h4 className="font-heading text-[15.5px] font-bold text-[#1f2937] leading-snug">
                  {item.title}
                </h4>
                <p className="text-[12.8px] text-[#6b7280] mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
