import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Play } from "lucide-react"
import { useQuoteStore } from "@/features/quote/store/quote.store"

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const openDrawer = useQuoteStore((state) => state.openDrawer)

  const slides = [
    {
      title: "Everything You Need to Build, Test & Maintain Electronics",
      subtitle: "Explore electronics, test & measurement, assembly, connectivity, power, ESD and industrial solutions from trusted brands.",
      image: "/images/hero_industrial_cables_1785994163114.png",
      primaryBtnText: "Explore Products →",
      primaryBtnLink: "/products",
    },
    {
      title: "Precision RF, Microwave & Industrial Networking",
      subtitle: "Low-loss coaxial assemblies, SMA/N-Type jumpers, and high-durability cables stocked deep for immediate site dispatch.",
      image: "/images/cat_rf_1785994214462.png",
      primaryBtnText: "View RF Assemblies →",
      primaryBtnLink: "/products?category=esd-rf",
    },
    {
      title: "Advanced SMT, Rework & Bench Assembly Lines",
      subtitle: "Production-grade soldering stations, hot air nozzles, and rework accessories engineered for zero-defect assembly.",
      image: "/images/bento_smt_1785994353600.png",
      primaryBtnText: "Explore SMT Solutions →",
      primaryBtnLink: "/products?category=smt-rework-assembly",
    }
  ]

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const curSlide = slides[activeSlide]

  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="site-container">
        
        {/* Top Hero Layout: Main Banner + 2 Side Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Main Hero Card (col-span-8) */}
          <div className="lg:col-span-8 bg-[#f5f6f8] rounded-[16px] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[380px] sm:min-h-[420px] border border-[#e8eaed]">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center flex-grow z-10 relative">
              
              {/* Left Text */}
              <div className="sm:col-span-7 text-left flex flex-col justify-center">
                <h1 className="font-heading text-[26px] sm:text-[34px] lg:text-[40px] font-extrabold text-[#1a1a1a] leading-[1.18] tracking-tight">
                  {curSlide.title}
                </h1>
                <p className="text-[#555555] text-[13.5px] sm:text-[14.5px] mt-3 sm:mt-4 leading-relaxed max-w-[460px]">
                  {curSlide.subtitle}
                </p>

                {/* Dual Action Buttons matching home.pdf */}
                <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-8">
                  <Link
                    to={curSlide.primaryBtnLink}
                    className="bg-[#c8102e] hover:bg-[#8F0502] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-[6px] text-[13.5px] font-bold shadow-sm transition-all hover:shadow-md active:scale-[0.99] cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>{curSlide.primaryBtnText}</span>
                  </Link>

                  <button
                    onClick={openDrawer}
                    type="button"
                    className="bg-white hover:bg-gray-50 text-[#222222] border border-[#d1d5db] px-4 py-2.5 sm:px-5 sm:py-3 rounded-[6px] text-[13.5px] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="sm:col-span-5 flex items-center justify-center py-2">
                <img
                  key={curSlide.image}
                  src={curSlide.image}
                  alt={curSlide.title}
                  className="max-h-[220px] sm:max-h-[280px] w-auto object-contain drop-shadow-md animate-in fade-in zoom-in-95 duration-500"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      "https://placehold.co/400x300/f5f6f8/ee2761?text=eFOCUS"
                  }}
                />
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-2 mt-4 z-10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx ? "w-6 bg-[#c8102e]" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: 2 Quick-Access Category Cards (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
            
            {/* Card 1: Embedded Hardware & Components */}
            <Link
              to="/products?category=it-hardware-workstations"
              className="bg-[#f7f8f9] rounded-[16px] p-5 sm:p-6 border border-[#e8eaed] flex items-center justify-between gap-4 group hover:shadow-md hover:border-gray-300 transition-all flex-1 text-left relative overflow-hidden"
            >
              <div className="z-10 flex flex-col justify-between h-full max-w-[62%]">
                <div>
                  <h3 className="font-heading text-[16px] sm:text-[17px] font-bold text-[#222222] leading-snug group-hover:text-[#c8102e] transition-colors">
                    Embedded Hardware &amp; Components
                  </h3>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[12.5px] font-bold text-[#222222] group-hover:text-[#c8102e] transition-colors">
                  <span>Shop now</span>
                  <Play size={10} className="fill-current" />
                </div>
              </div>

              <img
                src="/images/bento_net_1785994371883.png"
                alt="Embedded Hardware"
                className="max-h-[100px] sm:max-h-[110px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
              />
            </Link>

            {/* Card 2: Inspection, Accessories & General Tools */}
            <Link
              to="/products?category=tools-mro"
              className="bg-[#f7f8f9] rounded-[16px] p-5 sm:p-6 border border-[#e8eaed] flex items-center justify-between gap-4 group hover:shadow-md hover:border-gray-300 transition-all flex-1 text-left relative overflow-hidden"
            >
              <div className="z-10 flex flex-col justify-between h-full max-w-[62%]">
                <div>
                  <h3 className="font-heading text-[16px] sm:text-[17px] font-bold text-[#222222] leading-snug group-hover:text-[#c8102e] transition-colors">
                    Inspection, Accessories &amp; General Tools
                  </h3>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[12.5px] font-bold text-[#222222] group-hover:text-[#c8102e] transition-colors">
                  <span>Shop now</span>
                  <Play size={10} className="fill-current" />
                </div>
              </div>

              <img
                src="/images/cat_tools_1785994233090.png"
                alt="General Tools"
                className="max-h-[95px] sm:max-h-[105px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
              />
            </Link>
          </div>
        </div>

        {/* Bottom Row: 3 Quick-Access Category Cards matching home.pdf */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
          
          {/* Card 3: Electrical & Power Components */}
          <Link
            to="/products?category=power-electrical"
            className="bg-[#f7f8f9] rounded-[14px] p-5 border border-[#e8eaed] flex items-center justify-between gap-4 group hover:shadow-md hover:border-gray-300 transition-all text-left"
          >
            <div className="flex flex-col justify-between h-full max-w-[60%]">
              <h3 className="font-heading text-[15px] font-bold text-[#222222] leading-snug group-hover:text-[#c8102e] transition-colors">
                Electrical &amp; Power Components
              </h3>
              <div className="mt-3 flex items-center gap-1.5 text-[12px] font-bold text-[#222222] group-hover:text-[#c8102e] transition-colors">
                <span>Shop now</span>
                <Play size={9} className="fill-current" />
              </div>
            </div>
            <img
              src="/images/cat_test_1785994197761.png"
              alt="Electrical & Power"
              className="max-h-[80px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
          </Link>

          {/* Card 4: Hand & Power Tools */}
          <Link
            to="/products?category=tools-mro"
            className="bg-[#f7f8f9] rounded-[14px] p-5 border border-[#e8eaed] flex items-center justify-between gap-4 group hover:shadow-md hover:border-gray-300 transition-all text-left"
          >
            <div className="flex flex-col justify-between h-full max-w-[60%]">
              <h3 className="font-heading text-[15px] font-bold text-[#222222] leading-snug group-hover:text-[#c8102e] transition-colors">
                Hand &amp; Power Tools
              </h3>
              <div className="mt-3 flex items-center gap-1.5 text-[12px] font-bold text-[#222222] group-hover:text-[#c8102e] transition-colors">
                <span>Shop now</span>
                <Play size={9} className="fill-current" />
              </div>
            </div>
            <img
              src="/images/cat_cables_1785994179162.png"
              alt="Hand & Power Tools"
              className="max-h-[80px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
          </Link>

          {/* Card 5: Soldering Consumables */}
          <Link
            to="/products?category=smt-rework-assembly"
            className="bg-[#f7f8f9] rounded-[14px] p-5 border border-[#e8eaed] flex items-center justify-between gap-4 group hover:shadow-md hover:border-gray-300 transition-all text-left"
          >
            <div className="flex flex-col justify-between h-full max-w-[60%]">
              <h3 className="font-heading text-[15px] font-bold text-[#222222] leading-snug group-hover:text-[#c8102e] transition-colors">
                Soldering Consumables
              </h3>
              <div className="mt-3 flex items-center gap-1.5 text-[12px] font-bold text-[#222222] group-hover:text-[#c8102e] transition-colors">
                <span>Shop now</span>
                <Play size={9} className="fill-current" />
              </div>
            </div>
            <img
              src="/images/bento_smt_1785994353600.png"
              alt="Soldering Consumables"
              className="max-h-[80px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
          </Link>
        </div>

      </div>
    </section>
  )
}
