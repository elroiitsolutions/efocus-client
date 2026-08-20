import { Link } from "react-router-dom"

export default function SubHeroBanners() {
  const banners = [
    {
      title: "SMT, Rework & Assembly",
      desc: "Soldering wire, paste, flux, nozzles & hot air rework bench systems.",
      bgClass: "bg-[#fff4ea]",
      link: "/categories/smt-rework-assembly",
      image: "/images/bento_smt_1785994353600.png",
    },
    {
      title: "RF & Microwave Assemblies",
      desc: "Coaxial jumpers, SMA, BNC, N-Type, semi-rigid & low-loss RF leads.",
      bgClass: "bg-[#e2f7f8]",
      link: "/categories/rf-microwave",
      image: "/images/cat_rf_1785994214462.png",
    },
    {
      title: "Industrial Control & Automation",
      desc: "Sensor, servo, PLC, robot cabling, drag chain & feedback lines.",
      bgClass: "bg-[#e0f2fe]",
      link: "/categories/cables-connectivity",
      image: "/images/cat_cables_1785994179162.png",
    },
  ]

  return (
    <section className="max-w-[1380px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.title}
            className={`${banner.bgClass} rounded-[16px] overflow-hidden p-8 flex flex-col justify-between min-h-[320px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative group`}
          >
            {/* Top Text content */}
            <div className="z-10 relative max-w-[70%]">
              <h3 className="font-heading text-[20px] font-bold text-[#222222] leading-tight">
                {banner.title}
              </h3>
              <p className="text-[13px] text-[#555555] mt-2 leading-relaxed">
                {banner.desc}
              </p>
              <Link
                to={banner.link}
                className="inline-block mt-4 bg-white hover:bg-gray-50 text-[#222222] px-4 py-2.5 rounded-[6px] text-[12px] font-bold shadow-sm transition-colors border border-[#eaeaea]"
              >
                Shop Now &rarr;
              </Link>
            </div>

            {/* Float Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute right-0 bottom-0 max-h-[160px] w-auto object-contain transform translate-x-4 translate-y-4 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  "https://placehold.co/150x150/ffffff/ee2761?text=Product"
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
