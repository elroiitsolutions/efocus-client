import { Truck, ShieldCheck, ShieldAlert, Award } from "lucide-react"

export default function ValueProposition() {
  const props = [
    {
      title: "Single-Vendor Procurement",
      desc: "Sourced, assembled and dispatched from one accountable partner.",
      icon: <Truck size={28} className="text-[#B20602]" />,
    },
    {
      title: "Spec Built",
      desc: "Engineered and assembled to spec, stocked deep for instant dispatch.",
      icon: <ShieldCheck size={28} className="text-[#B20602]" />,
    },
    {
      title: "Trusted Assembly",
      desc: "Relied on by top EMS lines, automotive & semiconductor teams.",
      icon: <Award size={28} className="text-[#B20602]" />,
    },
    {
      title: "ESD & ISO Certified",
      desc: "Full static protection and rigorous quality control assurance.",
      icon: <ShieldAlert size={28} className="text-[#B20602]" />,
    },
  ]

  return (
    <section className="border-t border-[#eaeaea] py-12 bg-white">
      <div className="max-w-[1380px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map((prop, idx) => (
            <div key={idx} className="flex gap-4 items-start text-left">
              <div className="w-12 h-12 rounded-[10px] bg-[#FFF0F0] flex items-center justify-center shrink-0">
                {prop.icon}
              </div>
              <div>
                <h4 className="text-[15.2px] font-bold text-[#222222]">
                  {prop.title}
                </h4>
                <p className="text-[12.8px] text-[#777777] mt-1 leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
