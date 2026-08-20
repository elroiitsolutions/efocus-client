import Hero from "../components/Hero"
import SubHeroBanners from "../components/SubHeroBanners"
import TrendingCollections from "../components/TrendingCollections"
import PopularProducts from "../components/PopularProducts"
import ProductHighlight from "../components/ProductHighlight"
import FactoryRange from "../components/FactoryRange"
import BestSellers from "../components/BestSellers"
import BlogSection from "../components/BlogSection"
import GallerySection from "../components/GallerySection"
import ValueProposition from "../components/ValueProposition"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Slider Banner */}
      <Hero />

      {/* 2. Sub-Hero Promotion Cards Grid */}
      <SubHeroBanners />

      {/* 3. Trending Collections Circle Grid */}
      <TrendingCollections />

      {/* 4. Popular Now Tabs Grid */}
      <PopularProducts />

      {/* 5. Custom Specs Build Highlight Configurator */}
      <ProductHighlight />

      {/* 6. Looping Marquee Marquee & Bento ranges */}
      <FactoryRange />

      {/* 7. Best Sellers Grid */}
      <BestSellers />

      {/* 8. Technical Guides Lists */}
      <BlogSection />

      {/* 9. Dispatched custom harness items gallery */}
      <GallerySection />

      {/* 10. Core Value Props */}
      <ValueProposition />
    </div>
  )
}
