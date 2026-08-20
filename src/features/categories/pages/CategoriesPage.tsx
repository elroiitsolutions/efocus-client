import { useCategories } from "@/features/categories/hooks/useCategories"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"
import { slugify } from "@/lib/utils"

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories()

  const getCategoryPlaceholderImage = (cat: string) => {
    const cleanCat = cat.toLowerCase()
    if (cleanCat.includes("cable") || cleanCat.includes("connect")) {
      return "/images/cat_cables_1785994179162.png"
    }
    if (cleanCat.includes("test") || cleanCat.includes("measur")) {
      return "/images/cat_test_1785994197761.png"
    }
    if (cleanCat.includes("rf") || cleanCat.includes("wave")) {
      return "/images/cat_rf_1785994214462.png"
    }
    if (cleanCat.includes("tool") || cleanCat.includes("mro")) {
      return "/images/cat_tools_1785994233090.png"
    }
    if (cleanCat.includes("smt") || cleanCat.includes("rework")) {
      return "/images/bento_smt_1785994353600.png"
    }
    return "/images/cat_cables_1785994179162.png"
  }

  return (
    <div className="bg-[#f9f9fb] min-h-screen py-16 text-left">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-[750px] mx-auto mb-12">
          <h1 className="font-heading text-4xl font-extrabold text-[#222222] tracking-tight">
            Product Categories
          </h1>
          <p className="text-[#777777] text-[16px] mt-3">
            Browse our full industrial component catalog, stocked deep for immediate dispatch.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-64 rounded-[10px] w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories?.map((cat) => {
              const imageSrc = getCategoryPlaceholderImage(cat.name)
              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${slugify(cat.name)}`}
                  className="bg-white border border-[#eaeaea] rounded-[10px] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center p-6 border-b border-[#eaeaea]">
                    <img
                      src={imageSrc}
                      alt={cat.name}
                      className="max-h-[160px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-[#B20602] uppercase tracking-wider">
                        CAT {cat.category_no}
                      </span>
                      {cat.product_count !== undefined && (
                        <span className="text-[11px] font-bold text-[#777777]">
                          {cat.product_count} {cat.product_count === 1 ? "Item" : "Items"}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-[16px] font-bold text-[#222222] mt-1 group-hover:text-[#B20602] transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
