import Hero from "../components/Hero"
import ValueProposition from "../components/ValueProposition"
import BrandSupplyBar from "../components/BrandSupplyBar"
import TrendingCollections from "../components/TrendingCollections"
import PopularProducts from "../components/PopularProducts"
import ProductHighlight from "../components/ProductHighlight"
import FactoryRange from "../components/FactoryRange"
import BestSellers from "../components/BestSellers"
import BlogSection from "../components/BlogSection"
import GallerySection from "../components/GallerySection"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero with 5 Category Cards */}
      <Hero />

      {/* 2. 3 Trust Badges (Fast Turnaround, Compliance Ready, Production Stock) */}
      <ValueProposition />

      {/* 3. Authorized & Multi-Brand Industrial Supply */}
      <BrandSupplyBar />

      {/* 4. Trending Collections Circle Grid */}
      <TrendingCollections />

      {/* 5. Popular Now Tabs Grid */}
      <PopularProducts />

      {/* 6. Custom Specs Build Highlight Configurator */}
      <ProductHighlight />

      {/* 7. Looping Marquee Marquee & Bento ranges */}
      <FactoryRange />

      {/* 8. Best Sellers Grid */}
      <BestSellers />

      {/* 9. Technical Guides Lists */}
      <BlogSection />

      {/* 10. Dispatched custom harness items gallery */}
      <GallerySection />
    </div>
  )
}
