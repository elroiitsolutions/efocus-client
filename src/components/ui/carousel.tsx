import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const CarouselContext = React.createContext<{
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  totalItems: number
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
  next: () => void
  prev: () => void
} | null>(null)

export function Carousel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [totalItems, setTotalItems] = React.useState(0)

  const next = React.useCallback(() => {
    if (totalItems === 0) return
    setActiveIndex((prev) => (prev + 1) % totalItems)
  }, [totalItems])

  const prev = React.useCallback(() => {
    if (totalItems === 0) return
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }, [totalItems])

  // Autoplay support
  React.useEffect(() => {
    if (totalItems === 0) return
    const timer = setInterval(() => {
      next()
    }, 6000) // 6 seconds auto-scroll
    return () => clearInterval(timer)
  }, [totalItems, next, activeIndex])

  return (
    <CarouselContext.Provider value={{ activeIndex, setActiveIndex, totalItems, setTotalItems, next, prev }}>
      <div className={cn("relative overflow-hidden w-full", className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

export function CarouselContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("CarouselContent must be used within Carousel")

  const count = React.Children.count(children)
  React.useEffect(() => {
    context.setTotalItems(count)
  }, [count])

  return (
    <div className="overflow-hidden w-full">
      <div
        className={cn("flex transition-transform duration-700 ease-in-out w-full", className)}
        style={{
          transform: `translateX(-${context.activeIndex * 100}%)`,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export function CarouselItem({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("min-w-full shrink-0 w-full", className)} {...props}>
      {children}
    </div>
  )
}

export function CarouselPrevious({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("CarouselPrevious must be used within Carousel")

  return (
    <button
      type="button"
      onClick={context.prev}
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow border border-gray-200 z-10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B20602]",
        className
      )}
      {...props}
    >
      <ArrowLeft size={18} />
    </button>
  )
}

export function CarouselNext({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("CarouselNext must be used within Carousel")

  return (
    <button
      type="button"
      onClick={context.next}
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow border border-gray-200 z-10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B20602]",
        className
      )}
      {...props}
    >
      <ArrowRight size={18} />
    </button>
  )
}

export function CarouselIndicators({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("CarouselIndicators must be used within Carousel")

  return (
    <div className={cn("flex justify-center gap-2 mt-4 relative z-10", className)} {...props}>
      {Array.from({ length: context.totalItems }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => context.setActiveIndex(idx)}
          className={cn(
            "h-2.5 rounded-full cursor-pointer transition-all border-none p-0 duration-300",
            context.activeIndex === idx
              ? "bg-[#B20602] w-6"
              : "bg-[#d1d5db] w-2.5"
          )}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  )
}
