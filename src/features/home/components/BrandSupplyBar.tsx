import { Link } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { slugify } from "@/lib/utils"

export default function BrandSupplyBar() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const brands = [
    {
      name: "FLUKE",
      color: "#FFC20E",
      textColor: "#000000",
      customRender: (
        <span className="bg-[#FFC20E] text-black font-black italic px-3 py-1 text-[16px] tracking-wider rounded-[2px]">
          FLUKE
        </span>
      ),
    },
    {
      name: "QUICK",
      color: "#00A3E0",
      textColor: "#00A3E0",
      customRender: (
        <span className="font-extrabold text-[#00A3E0] tracking-tight text-[18px] font-mono">
          QUICK
        </span>
      ),
    },
    {
      name: "Weller",
      color: "#005596",
      textColor: "#005596",
      customRender: (
        <span className="font-black text-[#005596] tracking-tight text-[19px] italic font-serif">
          Weller
        </span>
      ),
    },
    {
      name: "ZEBRA",
      color: "#000000",
      textColor: "#000000",
      customRender: (
        <span className="font-black text-black tracking-[0.18em] text-[16px]">
          ZEBRA
        </span>
      ),
    },
    {
      name: "3M",
      color: "#ED1C24",
      textColor: "#ED1C24",
      customRender: (
        <span className="font-black text-[#ED1C24] text-[22px] tracking-tighter">
          3M
        </span>
      ),
    },
    {
      name: "KNIPEX",
      color: "#D5001C",
      textColor: "#D5001C",
      customRender: (
        <span className="bg-[#D5001C] text-white font-extrabold px-3 py-1 rounded-[4px] text-[14px] tracking-widest">
          KNIPEX
        </span>
      ),
    },
    {
      name: "GOODEN",
      color: "#0284c7",
      textColor: "#0284c7",
      customRender: (
        <span className="font-extrabold text-[#0284c7] text-[16px] tracking-wider">
          GOODEN
        </span>
      ),
    },
    {
      name: "Chroma",
      color: "#1e3a8a",
      textColor: "#1e3a8a",
      customRender: (
        <span className="font-bold text-[#1e3a8a] text-[18px] tracking-normal font-sans">
          Chroma
        </span>
      ),
    },
    {
      name: "TE Connectivity",
      color: "#E26B00",
      textColor: "#E26B00",
      customRender: (
        <span className="font-black text-[#E26B00] text-[17px] tracking-tight">
          TE Connectivity
        </span>
      ),
    },
    {
      name: "Amphenol",
      color: "#004B87",
      textColor: "#004B87",
      customRender: (
        <span className="font-bold text-[#004B87] text-[17px] tracking-tight">
          Amphenol
        </span>
      ),
    },
  ]

  // Duplicated list for seamless infinite looping
  const displayBrands = [...brands, ...brands, ...brands]

  // Auto-running continuous smooth scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let pos = el.scrollLeft

    const step = () => {
      if (!isPaused && el) {
        pos += 0.85
        const oneSetWidth = el.scrollWidth / 3
        if (oneSetWidth > 0 && pos >= oneSetWidth) {
          pos -= oneSetWidth
        }
        el.scrollLeft = pos
      } else if (el) {
        pos = el.scrollLeft
      }
      animationId = requestAnimationFrame(step)
    }

    animationId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationId)
  }, [isPaused])



  return (
    <section className="bg-white py-8 border-b border-[#eaeaea]">
      <div className="site-container">
        {/* Section Heading matching home.pdf */}
        <div className="text-center mb-6">
          <h3 className="font-heading text-[18px] sm:text-[20px] font-bold text-[#1a1a1a] tracking-tight">
            Authorized &amp; Multi-Brand Industrial Supply
          </h3>
        </div>

        {/* Carousel Row with Arrows & Infinite Auto-Running Track */}
        <div className="relative flex items-center">         

          {/* Brands Auto-Running Scroll Track - Zero scrollbar, pure seamless flow */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex items-center gap-8 sm:gap-12 overflow-hidden no-scrollbar py-2 px-2 flex-grow select-none"
          >
            {displayBrands.map((b, idx) => (
              <Link
                key={`${b.name}-${idx}`}
                to={`/products?brand=${slugify(b.name)}`}
                className="shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 py-2 px-3 flex items-center justify-center hover:scale-105"
                title={`Filter products by ${b.name}`}
              >
                {b.customRender}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
