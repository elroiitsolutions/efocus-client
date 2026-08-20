import { Link } from "react-router-dom"
import { useCategories } from "@/hooks/use-categories"
import { Loader2 } from "lucide-react"
import { slugify } from "@/lib/utils"

const categoryImages: Record<string, string> = {
  "01": "/images/bento_smt_1785994353600.png",
  "02": "/images/cat_cables_1785994179162.png",
  "03": "/images/cat_tools_1785994233090.png",
  "04": "/images/cat_cables_1785994179162.png",
  "05": "/images/cat_rf_1785994214462.png",
  "06": "/images/cat_test_1785994197761.png",
  "07": "/images/cat_tools_1785994233090.png",
  "08": "/images/cat_test_1785994197761.png",
}

export default function TrendingCollections() {
  const { data: categories, isLoading, error } = useCategories()

  // Only display the first 6 key categories in the trending collections for visual balance
  const trendingCategories = categories?.slice(0, 6) || []

  return (
    <section className="max-w-[1380px] mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center max-w-[750px] mx-auto mb-12">
        <h2 className="font-heading text-[32px] font-extrabold text-[#222222] tracking-tight">
          Trending Collections
        </h2>
        <p className="text-[#777777] text-[15px] mt-2.5">
          Explore specialized sub-catalogs curated for high performance assembly & testing labs.
        </p>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-[#B20602]" size={36} />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 font-semibold">Failed to load trending collections.</p>
        </div>
      )}

      {/* Circular Grid Wrapper */}
      <div className="flex flex-wrap justify-center gap-10">
        {trendingCategories.map((col) => (
          <Link
            key={col.id}
            to={`/products?category=${slugify(col.name)}`}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#B20602] transition-all bg-gray-50 flex items-center justify-center p-1.5 shadow-sm">
              <img
                src={categoryImages[col.category_no] || "/images/cat_test_1785994197761.png"}
                alt={col.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    "https://placehold.co/120x120/f4f5f8/ee2761?text=" + encodeURIComponent(col.name.slice(0, 3))
                }}
              />
            </div>
            <h4 className="text-[14.4px] font-bold text-[#222222] mt-4 group-hover:text-[#B20602] transition-colors max-w-[150px] line-clamp-2">
              {col.name}
            </h4>
            <span className="text-[12px] text-[#777777] font-semibold mt-1">
              {col.product_count !== undefined ? `${col.product_count} Items` : "Stocked"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
