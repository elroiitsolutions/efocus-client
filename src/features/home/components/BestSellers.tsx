import { useProducts } from "@/features/products/hooks/useProducts"
import { ProductCard } from "@/features/products/components/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"

export default function BestSellers() {
  const { data, isLoading } = useProducts({
    limit: 4,
  })

  // Fallback core products if loading holds
  return (
    <section className="bg-white py-16">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-[750px] mx-auto mb-12">
          <h2 className="font-heading text-3xl font-extrabold text-[#222222] tracking-tight">
            Best Sellers
          </h2>
          <p className="text-[#777777] text-[15px] mt-2">
            Our most frequently re-ordered component lines across manufacturing teams.
          </p>
        </div>

        {/* Cards */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
                <Skeleton className="h-7 w-full mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {(data?.data || []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <a
            href="/products"
            className="inline-block border border-[#d1d5db] hover:border-gray-400 text-[#222222] px-6 py-3 rounded-[6px] text-[13.6px] font-bold transition-all cursor-pointer"
          >
            View All Best Sellers &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
