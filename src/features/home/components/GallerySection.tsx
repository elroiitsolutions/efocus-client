export default function GallerySection() {
  const galleryItems = [
    {
      title: "IDC Ribbon Build",
      image: "/images/custom_harness_main_1785994250993.png",
    },
    {
      title: "M12 Sensor Jumpers",
      image: "/images/cat_cables_1785994179162.png",
    },
    {
      title: "SMA RF Coaxial Leads",
      image: "/images/cat_rf_1785994214462.png",
    },
    {
      title: "SMT Bench Rework",
      image: "/images/bento_smt_1785994353600.png",
    },
    {
      title: "Automotive Harness",
      image: "/images/cat_tools_1785994233090.png",
    },
  ]

  return (
    <section className="py-16 bg-[#f9f9fb]">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-[750px] mx-auto mb-12">
          <h2 className="font-heading text-3xl font-extrabold text-[#222222] tracking-tight">
            Instagram shop
          </h2>
          <p className="text-[#777777] text-[15px] mt-2">
            Recent custom harness builds, cable assemblies & bench test kits dispatched to EMS lines.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden rounded-[10px] border border-[#eaeaea] group bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    "https://placehold.co/300x300/ffffff/ee2761?text=Gallery"
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <span className="text-white text-[13.6px] font-bold text-center">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
