import { useQuoteStore } from "@/features/quote/store/quote.store"
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"

export interface Product {
  id: number
  sku: string
  catalog_number?: string | null
  product_name: string
  brand?: string
  short_description?: string | null
  key_spec_1?: string | null
  key_spec_2?: string | null
  key_spec_3?: string | null
  image_status?: string | null
  rfq_eligible?: boolean | number
  category_name?: string
  subcategory_name?: string
  family_name?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useQuoteStore((state) => state.addItem)
  const openDrawer = useQuoteStore((state) => state.openDrawer)
  const toggleWishlist = useWishlistStore((state) => state.toggleItem)
  const isWishlisted = useWishlistStore((state) => state.hasItem(product.sku))

  // Suffix checks or number checks
  const isRfqEligible =
    product.rfq_eligible === true ||
    product.rfq_eligible === 1 ||
    product.rfq_eligible === undefined

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.sku,
      name: product.product_name,
      category: product.category_name || "Industrial Solutions",
      qty: 1,
      code: product.catalog_number || product.sku,
    })
    openDrawer()
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist({
      id: product.sku,
      name: product.product_name,
      category: product.category_name || "Industrial Solutions",
      code: product.catalog_number || product.sku,
    })
  }

  // Fallback image selectors
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

  const getCategoryHoverPlaceholderImage = (cat: string) => {
    const cleanCat = cat.toLowerCase()
    if (cleanCat.includes("cable") || cleanCat.includes("connect")) {
      return "/images/bento_net_1785994371883.png"
    }
    if (cleanCat.includes("test") || cleanCat.includes("measur")) {
      return "/images/custom_harness_main_1785994250993.png"
    }
    if (cleanCat.includes("rf") || cleanCat.includes("wave")) {
      return "/images/hero_industrial_cables_1785994163114.png"
    }
    if (cleanCat.includes("tool") || cleanCat.includes("mro")) {
      return "/images/bento_smt_1785994353600.png"
    }
    if (cleanCat.includes("smt") || cleanCat.includes("rework")) {
      return "/images/cat_tools_1785994233090.png"
    }
    return "/images/bento_net_1785994371883.png"
  }

  const imageSrc = getCategoryPlaceholderImage(product.category_name || "")
  const hoverImageSrc = getCategoryHoverPlaceholderImage(product.category_name || "")

  const badgeText = product.catalog_number || product.sku

  return (
    <div className="bg-white border border-[#eaeaea] rounded-[10px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[280px] sm:min-h-[380px] relative group shimmer-card">
      {/* Category/SKU badge tag */}
      <span className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 bg-gray-900 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-[4px]">
        {badgeText.substring(0, 14)}
      </span>

      {/* Wishlist toggle button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#FFF0F0] text-gray-400 hover:text-[#B20602] transition-colors"
        title="Add to Wishlist"
      >
        <Heart
          size={14}
          fill={isWishlisted ? "#B20602" : "none"}
          className={`sm:w-4 sm:h-4 ${isWishlisted ? "text-[#B20602]" : ""}`}
        />
      </button>

      {/* Card Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-2 sm:p-4">
        <Link to={`/products/${product.sku}`} className="block w-full h-full relative flex items-center justify-center">
          {/* Primary Image */}
          <img
            src={imageSrc}
            alt={product.product_name}
            className="max-h-[100px] sm:max-h-[160px] max-w-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                "https://placehold.co/200x200/ffffff/ee2761?text=Product"
            }}
          />
          {/* Hover Image */}
          <img
            src={hoverImageSrc}
            alt={`${product.product_name} Alternative`}
            className="max-h-[100px] sm:max-h-[160px] max-w-full object-contain absolute inset-0 m-auto opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                "https://placehold.co/200x200/ffffff/ee2761?text=Product+Details"
            }}
          />
        </Link>
      </div>

      {/* Card Details body */}
      <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <span className="text-[9px] sm:text-[11.2px] font-bold text-[#B20602] uppercase tracking-wide">
            {product.category_name || "Industrial solutions"}
          </span>
          <h4 className="font-heading text-[12px] sm:text-[15.2px] font-bold text-[#222222] line-clamp-2 mt-0.5 sm:mt-1 leading-snug hover:text-[#B20602] transition-colors">
            <Link to={`/products/${product.sku}`}>{product.product_name}</Link>
          </h4>
          {product.short_description && (
            <p className="text-[10px] sm:text-[12px] text-[#777777] line-clamp-2 mt-1 sm:mt-2 leading-relaxed hidden sm:block">
              {product.short_description}
            </p>
          )}
        </div>

        {/* Action button */}
        <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-[#eaeaea] flex items-center justify-between gap-1 sm:gap-2">
          <span className="text-[10px] sm:text-[12px] font-bold text-[#555555] truncate shrink-0">
            {product.sku}
          </span>
          {isRfqEligible ? (
            <button
              onClick={handleAddToQuote}
              className="bg-[#B20602] hover:bg-[#900502] text-white px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-[4px] text-[10px] sm:text-[12px] font-bold transition-colors cursor-pointer shrink-0"
            >
              Request Quote
            </button>
          ) : (
            <span className="text-[9px] sm:text-[11px] font-bold text-gray-400">Enquire Direct</span>
          )}
        </div>
      </div>
    </div>
  )
}
