import { Link } from "react-router-dom"

export default function FactoryRange() {
  const tickerItems = [
    "SINGLE-VENDOR PROCUREMENT",
    "SPEC BUILT TO DRAWING",
    "TRUSTED EMS & R&D ASSEMBLY",
    "47 STOCKED LINE ITEMS",
    "100% IPC-WHMA-A-620 CERTIFIED",
    "chandruravichandran1536@gmail.com",
    "+91 7397 242 650",
  ]

  const bentoItems = {
    large: {
      cat: "CAT 01",
      title: "SMT, Rework & Assembly",
      desc: "Everything the pick-and-place, stencil printer & rework bench consume — splice to squeegee.",
      link: "/categories/smt-rework-assembly",
      image: "/images/bento_smt_1785994353600.png",
    },
    medium: {
      cat: "CAT 02",
      title: "Industrial Networking & Fiber",
      desc: "Ethernet patch cords, LC fiber cables, unmanaged switches & PoE injectors.",
      link: "/categories/cables-connectivity",
      image: "/images/bento_net_1785994371883.png",
    },
    sm1: {
      cat: "CAT 04",
      title: "Pneumatics & Fluid",
      link: "/categories/power-electrical",
      image: "/images/cat_tools_1785994233090.png",
    },
    sm2: {
      cat: "CAT 06",
      title: "Test & Measurement",
      link: "/categories/testing-measurement",
      image: "/images/cat_test_1785994197761.png",
    },
    sm3: {
      cat: "CAT 05",
      title: "Power & Electrical",
      link: "/categories/power-electrical",
      image: "/images/cat_cables_1785994179162.png",
    },
  }

  return (
    <div>
      {/* 1. Scrolling Marquee Marquee Bar */}
      <div className="scrolling-ticker-bar">
        <div className="animate-ticker">
          {Array.from({ length: 4 }).map((_, loopIdx) => (
            <div key={loopIdx} className="ticker-content">
              {tickerItems.map((item, itemIdx) => (
                <span key={itemIdx} className="inline-flex items-center gap-6">
                  <span>{item}</span>
                  <span className="ticker-dot">&bull;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Bento Feature Grid */}
      <section className="site-container py-16">
        <div className="text-center max-w-[750px] mx-auto mb-12">
          <h2 className="font-heading text-3xl font-extrabold text-[#222222] tracking-tight">
            Factory & Production Range
          </h2>
          <p className="text-[#777777] text-[15px] mt-2">
            Organised by category and sub-category, stocked deep for immediate dispatch.
          </p>
        </div>

        {/* Custom Bento layout css grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 min-h-[500px]">
          {/* Large Left Card */}
          <div className="md:col-span-3 rounded-[16px] overflow-hidden relative min-h-[300px] group">
            <img
              src={bentoItems.large.image}
              alt={bentoItems.large.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "https://placehold.co/600x400"
              }}
            />
            <div className="absolute inset-0 bg-black/60 p-8 flex flex-col justify-end text-left">
              <span className="text-[11px] font-bold text-[#c8102e] bg-[#FFF1F2] px-2.5 py-1 rounded-[4px] self-start mb-3 uppercase tracking-wider">
                {bentoItems.large.cat}
              </span>
              <h3 className="font-heading text-[22px] font-bold text-white leading-tight">
                {bentoItems.large.title}
              </h3>
              <p className="text-gray-300 text-[13px] mt-2 leading-relaxed max-w-[90%]">
                {bentoItems.large.desc}
              </p>
              <Link
                to={bentoItems.large.link}
                className="text-[#c8102e] hover:text-white font-bold text-[13px] mt-4 flex items-center gap-1 transition-colors"
              >
                Browse SMT Lines &rarr;
              </Link>
            </div>
          </div>

          {/* Right Medium Card */}
          <div className="md:col-span-3 rounded-[16px] overflow-hidden relative min-h-[300px] group">
            <img
              src={bentoItems.medium.image}
              alt={bentoItems.medium.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "https://placehold.co/600x400"
              }}
            />
            <div className="absolute inset-0 bg-black/60 p-8 flex flex-col justify-end text-left">
              <span className="text-[11px] font-bold text-[#c8102e] bg-[#FFF1F2] px-2.5 py-1 rounded-[4px] self-start mb-3 uppercase tracking-wider">
                {bentoItems.medium.cat}
              </span>
              <h3 className="font-heading text-[22px] font-bold text-white leading-tight">
                {bentoItems.medium.title}
              </h3>
              <p className="text-gray-300 text-[13px] mt-2 leading-relaxed max-w-[90%]">
                {bentoItems.medium.desc}
              </p>
              <Link
                to={bentoItems.medium.link}
                className="text-[#c8102e] hover:text-white font-bold text-[13px] mt-4 flex items-center gap-1 transition-colors"
              >
                Browse Networking &rarr;
              </Link>
            </div>
          </div>

          {/* Bottom Card 1 */}
          <div className="md:col-span-2 rounded-[16px] overflow-hidden relative min-h-[220px] group">
            <img
              src={bentoItems.sm1.image}
              alt={bentoItems.sm1.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "https://placehold.co/400x250"
              }}
            />
            <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold text-[#c8102e] bg-[#FFF1F2] px-2 py-0.5 rounded-[4px] self-start mb-2">
                {bentoItems.sm1.cat}
              </span>
              <h3 className="font-heading text-[16px] font-bold text-white leading-tight">
                {bentoItems.sm1.title}
              </h3>
              <Link
                to={bentoItems.sm1.link}
                className="text-[#c8102e] hover:text-white font-bold text-[12px] mt-2 flex items-center gap-1 transition-colors"
              >
                Explore &rarr;
              </Link>
            </div>
          </div>

          {/* Bottom Card 2 */}
          <div className="md:col-span-2 rounded-[16px] overflow-hidden relative min-h-[220px] group">
            <img
              src={bentoItems.sm2.image}
              alt={bentoItems.sm2.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "https://placehold.co/400x250"
              }}
            />
            <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold text-[#c8102e] bg-[#FFF1F2] px-2 py-0.5 rounded-[4px] self-start mb-2">
                {bentoItems.sm2.cat}
              </span>
              <h3 className="font-heading text-[16px] font-bold text-white leading-tight">
                {bentoItems.sm2.title}
              </h3>
              <Link
                to={bentoItems.sm2.link}
                className="text-[#c8102e] hover:text-white font-bold text-[12px] mt-2 flex items-center gap-1 transition-colors"
              >
                Explore &rarr;
              </Link>
            </div>
          </div>

          {/* Bottom Card 3 */}
          <div className="md:col-span-2 rounded-[16px] overflow-hidden relative min-h-[220px] group">
            <img
              src={bentoItems.sm3.image}
              alt={bentoItems.sm3.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "https://placehold.co/400x250"
              }}
            />
            <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end text-left">
              <span className="text-[10px] font-bold text-[#c8102e] bg-[#FFF1F2] px-2 py-0.5 rounded-[4px] self-start mb-2">
                {bentoItems.sm3.cat}
              </span>
              <h3 className="font-heading text-[16px] font-bold text-white leading-tight">
                {bentoItems.sm3.title}
              </h3>
              <Link
                to={bentoItems.sm3.link}
                className="text-[#c8102e] hover:text-white font-bold text-[12px] mt-2 flex items-center gap-1 transition-colors"
              >
                Explore &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
