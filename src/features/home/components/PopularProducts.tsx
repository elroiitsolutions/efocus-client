import { useState } from "react"
import { useProducts } from "@/features/products/hooks/useProducts"
import { ProductCard } from "@/features/products/components/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"

export default function PopularProducts() {
  const [activeTab, setActiveTab] = useState("all")

  // Map tabs to category filters matching backend schema
  const getCategoryFromTab = (tab: string) => {
    switch (tab) {
      case "test":
        return "Testing & Measurement"
      case "cables":
        return "Cables & Connectivity"
      case "rf":
        return "ESD & RF"
      case "smt":
        return "SMT, Rework & Assembly"
      default:
        return undefined
    }
  }

  const { data, isLoading, error } = useProducts({
    category: getCategoryFromTab(activeTab),
    limit: 8,
  })

  const tabs = [
    { id: "all", label: "All Lines" },
    { id: "test", label: "Test & Bench" },
    { id: "cables", label: "Industrial Cabling" },
    { id: "rf", label: "RF Assemblies" },
    { id: "smt", label: "SMT & Rework" },
  ]

  return (
    <section className="bg-[#f9f9fb] py-16" id="popular-now">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-[750px] mx-auto mb-12">
          <h2 className="font-heading text-3xl font-extrabold text-[#222222] tracking-tight">
            Popular Now
          </h2>
          <p className="text-[#777777] text-[15px] mt-2">
            Key line items sourced, assembled, and dispatched from one accountable vendor.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors cursor-pointer border ${
                  activeTab === tab.id
                    ? "bg-[#c8102e] border-[#c8102e] text-white"
                    : "bg-white border-[#eaeaea] text-[#555555] hover:text-[#c8102e]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#eaeaea] rounded-[8px] sm:rounded-[10px] p-2.5 sm:p-3 h-[270px] flex flex-col justify-between"
              >
                <Skeleton className="w-full aspect-[4/3] rounded-[6px]" />
                <div className="flex flex-col gap-1.5 mt-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-8 w-full mt-2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 font-semibold">Failed to load popular products.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#c8102e] text-white px-4 py-2 rounded-[6px] text-[13px] font-bold"
            >
              Retry
            </button>
          </div>
        ) : data?.data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#777777] text-[15px]">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {data?.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <a
            href="/products"
            className="inline-block border-2 border-[#c8102e] text-[#c8102e] hover:bg-[#c8102e] hover:text-white px-6 py-3 rounded-[6px] text-[13.6px] font-bold transition-all cursor-pointer"
          >
            Load More Products
          </a>
        </div>
      </div>
    </section>
  )
}
