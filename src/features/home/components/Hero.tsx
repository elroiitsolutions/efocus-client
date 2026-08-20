import { Link } from "react-router-dom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
} from "@/components/ui/carousel"

const slides = [
  {
    title: "The full product range, one accountable vendor.",
    tagline: "7 CATEGORIES • 47 STOCKED LINES",
    description: "Test leads, RF assemblies, automation & networking cabling, power and custom builds — engineered and assembled to spec, stocked deep and dispatched first.",
    image: "/images/hero_industrial_cables_1785994163114.png",
    buttonText: "Explore 47 Stocked Lines &rarr;",
    link: "/products"
  },
  {
    title: "Precision RF & Microwave Assemblies.",
    tagline: "HIGH FREQUENCY • LOW LOSS",
    description: "Precision coaxial assemblies, SMA/N-Type jumpers, and low-loss RF cords. Built for reliability in extreme industrial and testing environments.",
    image: "/images/cat_rf_1785994214462.png",
    buttonText: "View RF & Microwave &rarr;",
    link: "/products?category=rf-microwave"
  },
  {
    title: "Advanced SMT, Rework & Assembly.",
    tagline: "PRODUCTION GRADE • PRECISION TOOLS",
    description: "High-accuracy soldering stations, spring-loaded pogo pins, and production line tooling. Designed to optimize yield and durability.",
    image: "/images/bento_smt_1785994353600.png",
    buttonText: "Explore SMT Solutions &rarr;",
    link: "/products?category=smt-rework-assembly"
  }
]

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#e2f9f8] to-[#d5f5f4] py-16 relative overflow-hidden min-h-[500px] flex flex-col justify-between">
      <Carousel className="flex-grow flex flex-col justify-between">
        <CarouselContent className="items-center">
          {slides.map((slide, idx) => (
            <CarouselItem key={idx}>
              <div className="max-w-[1380px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                
                {/* Left text column */}
                <div className="text-left py-4 animate-in fade-in slide-in-from-left-6 duration-700">
                  <p className="text-[14.4px] font-bold tracking-[0.1em] text-[#777777] uppercase mb-3">
                    {slide.tagline}
                  </p>
                  <h1 className="font-heading text-[35px] sm:text-[45px] lg:text-[56px] font-extrabold text-[#222222] tracking-tight leading-none mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-[#555555] text-[16px] leading-relaxed mb-8 max-w-[580px]">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-[#B20602] hover:bg-[#900502] text-white px-6 py-3 rounded-[6px] text-[14.4px] font-bold transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    dangerouslySetInnerHTML={{ __html: slide.buttonText }}
                  />
                </div>

                {/* Right image column */}
                <div className="flex justify-center items-center py-4 animate-in fade-in zoom-in-95 duration-1000">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-[380px] w-auto object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src =
                        "https://placehold.co/600x400/e2f9f8/ee2761?text=eFOCUS+Industrial+Cables"
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel controls */}
        <CarouselPrevious className="left-6 bg-white/50 border-none hover:bg-white text-gray-800 transition-all hidden md:flex" />
        <CarouselNext className="right-6 bg-white/50 border-none hover:bg-white text-gray-800 transition-all hidden md:flex" />
        
        {/* Carousel indicators */}
        <CarouselIndicators />
      </Carousel>
    </section>
  )
}
