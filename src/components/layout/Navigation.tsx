import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ArrowRight, Loader2, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn, slugify } from "@/lib/utils"
import { useNavigationTree } from "@/hooks/use-categories"
import type { NavCategory, NavFeaturedProduct, NavSubcategory } from "@/types/api.types"

// ─── Featured Products Panel (right side) ───────────────────────────
// Extracted so React can reconcile it with a `key` prop when the source changes.

function FeaturedProductsList({
  products,
  title,
}: {
  products: NavFeaturedProduct[]
  title: string
}) {
  return (
    <>
      <div className="mb-4">
        <h4 className="text-[13px] font-bold text-[#777777] uppercase tracking-wider">
          {title}
        </h4>
      </div>
      <ul className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/products/${product.sku}`}
              className="flex items-center justify-between py-2.5 px-3 rounded-[6px] bg-white border border-[#eaeaea] hover:border-[#B20602] hover:shadow-sm transition-all group"
            >
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#222222] group-hover:text-[#B20602] transition-colors line-clamp-1">
                  {product.product_name}
                </span>
                <span className="text-[11px] font-bold text-[#999999] font-mono">
                  {product.sku} · {product.brand}
                </span>
              </div>
              <ArrowRight
                size={14}
                className="text-[#d1d5db] group-hover:text-[#B20602] transition-colors shrink-0"
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

// ─── Mega-menu dropdown content per category ────────────────────────

function CategoryDropdownContent({ category }: { category: NavCategory }) {
  const [activeSubcatId, setActiveSubcatId] = useState<number | null>(null)

  const activeSub: NavSubcategory | undefined = category.subcategories.find(
    (s) => s.id === activeSubcatId
  )

  // Products to show: subcategory-level when hovering a sub, otherwise category-level
  const productsToShow: NavFeaturedProduct[] =
    activeSub && activeSub.featured_products && activeSub.featured_products.length > 0
      ? activeSub.featured_products
      : category.featured_products

  // Title updates dynamically
  const sectionTitle = activeSub
    ? `${activeSub.name} — Featured`
    : `${category.name} — Featured`

  // "View all" link updates to subcategory when one is hovered
  const viewAllLink = activeSub
    ? `/products?subcategory=${slugify(activeSub.name)}`
    : `/products?category=${slugify(category.name)}`

  const viewAllLabel = activeSub
    ? `View all ${activeSub.name}`
    : `View all ${category.name}`

  return (
    <div className="grid grid-cols-12 w-[780px]">
      {/* ── Left Column: Subcategories List ── */}
      <div className="col-span-5 p-6 border-r border-[#eaeaea]">
        <div className="mb-4">
          <h4 className="text-[13px] font-bold text-[#777777] uppercase tracking-wider">
            Subcategories
          </h4>
        </div>

        {category.subcategories.length === 0 ? (
          <p className="text-[13px] text-[#999999] italic">
            No subcategories yet
          </p>
        ) : (
          <ul className="flex flex-col gap-1 max-h-[260px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {category.subcategories.map((sub: NavSubcategory) => {
              const isSubActive = activeSubcatId === sub.id
              return (
                <li
                  key={sub.id}
                  onMouseEnter={() => setActiveSubcatId(sub.id)}
                >
                  <Link
                    to={`/products?subcategory=${slugify(sub.name)}`}
                    className={cn(
                      "flex items-center gap-2 py-2 px-3 rounded-[6px] text-[13.6px] font-medium transition-colors group",
                      isSubActive
                        ? "bg-[#FFF0F0] text-[#B20602]"
                        : "text-[#444444] hover:bg-[#FFF0F0] hover:text-[#B20602]"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors shrink-0",
                        isSubActive
                          ? "bg-[#B20602]"
                          : "bg-[#d1d5db] group-hover:bg-[#B20602]"
                      )}
                    />
                    {sub.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}

        <Separator className="my-4" />

        <Link
          to={viewAllLink}
          className="flex items-center gap-1.5 text-[13px] font-bold text-[#B20602] hover:text-[#900502] transition-colors"
        >
          {viewAllLabel}
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* ── Right Column: Featured Products Info Panel ── */}
      <div className="col-span-7 p-6 bg-[#fafbfd]">
        {/* Featured Product Lines — keyed by source so React fully re-renders */}
        {productsToShow.length > 0 ? (
          <FeaturedProductsList
            key={activeSubcatId ?? "category"}
            products={productsToShow}
            title={sectionTitle}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-12 text-center text-[#999999] italic text-[13px]">
            No featured products in this section.
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Navigation Bar ────────────────────────────────────────────

export default function Navigation() {
  const location = useLocation()
  const { data: categories, isLoading } = useNavigationTree()

  return (
    <nav className="border-t border-[#eaeaea] bg-white hidden lg:block relative z-50">
      <div className="max-w-[1380px] mx-auto px-6 flex items-center justify-between h-[52px] relative">
        {/* Mega Menu Navigation */}
        <div className="flex items-center gap-0">
          {/* Home Link (no dropdown) */}
          <div>
            <Link
              to="/"
              className={cn(
                "inline-flex h-[52px] items-center px-2 xl:px-3 text-[13px] xl:text-[14px] font-medium transition-colors hover:text-[#B20602] relative",
                location.pathname === "/"
                  ? "text-[#B20602]"
                  : "text-[#222222]"
              )}
            >
              Home
              {location.pathname === "/" && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#B20602]" />
              )}
            </Link>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center gap-2 px-3 text-[13px] text-[#999999]">
              <Loader2 size={14} className="animate-spin" />
              Loading...
            </div>
          )}

          {/* Category Dropdown Items — from backend */}
          {categories?.map((category: NavCategory, index: number) => {
            const slug = slugify(category.name)
            const isActive =
              location.pathname.includes(slug) ||
              location.search.includes(slug)

            return (
              <div key={category.id} className="group relative">
                <div
                  className={cn(
                    "inline-flex h-[52px] items-center gap-1 px-2 xl:px-3 text-[13px] xl:text-[14px] font-medium hover:text-[#B20602] transition-colors relative cursor-pointer",
                    isActive ? "text-[#B20602]" : "text-[#222222]"
                  )}
                >
                  <span>{category.name}</span>
                  <ChevronDown size={12} className="opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#B20602]" />
                  )}
                </div>

                {/* CSS Dropdown Panel container aligned under the category */}
                <div className={cn(
                  "absolute top-full z-[100] bg-white border border-[#eaeaea] shadow-xl rounded-[12px] p-0 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1.5 group-hover:translate-y-0",
                  index >= 4 ? "right-0" : "left-0"
                )}>
                  <CategoryDropdownContent category={category} />
                </div>
              </div>
            )
          })}

          {/* Custom & Assembly (no dropdown) */}
          <div>
            <Link
              to="/custom-assembly"
              className={cn(
                "inline-flex h-[52px] items-center px-2 xl:px-3 text-[13px] xl:text-[14px] font-medium transition-colors hover:text-[#B20602] relative",
                location.pathname === "/custom-assembly"
                  ? "text-[#B20602]"
                  : "text-[#222222]"
              )}
            >
              Custom & Assembly
              {location.pathname === "/custom-assembly" && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#B20602]" />
              )}
            </Link>
          </div>
        </div> 

      </div>
    </nav>
  )
}
