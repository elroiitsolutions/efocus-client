import { useQuoteStore } from "@/features/quote/store/quote.store"
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import {
  getProductPrimaryImage,
  getProductHoverImage,
} from "../utils/productImages"

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
  stock_status?: string | null
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useQuoteStore((state) => state.addItem)
  const openDrawer = useQuoteStore((state) => state.openDrawer)
  const toggleWishlist = useWishlistStore((state) => state.toggleItem)
  const isWishlisted = useWishlistStore((state) => state.hasItem(product.sku))

  const isOutOfStock = product.stock_status === "out_of_stock"

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

  const imageSrc = getProductPrimaryImage(product)
  const hoverImageSrc = getProductHoverImage(product)

  const badgeText = product.catalog_number || product.sku

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-lg overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between relative group">
      {/* Top-Left: OUT OF STOCK with Red Dot OR Regular SKU badge tag */}
      {isOutOfStock ? (
        <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none select-none flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#c8102e] shrink-0 inline-block shadow-2xs" />
          <span className="font-extrabold text-[9.5px] sm:text-[9px] tracking-wide text-[#c8102e] uppercase leading-none font-sans whitespace-nowrap">
            OUT OF STOCK
          </span>
        </div>
      ) : (
        <span className="absolute top-2 left-2 z-10 bg-gray-900/90 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
          {badgeText}
        </span>
      )}

      {/* Wishlist toggle button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#FFF1F2] text-gray-400 hover:text-[#c8102e] transition-colors"
        title="Add to Wishlist"
      >
        <Heart
          size={13}
          fill={isWishlisted ? "#c8102e" : "none"}
          className={isWishlisted ? "text-[#c8102e]" : ""}
        />
      </button>

      {/* Card Image - UP BACKGROUND SET TO GRAY */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f4f5f7] border-b border-[#e5e7eb] flex items-center justify-center pt-6 pb-2 px-2 sm:pt-7 sm:pb-2.5 sm:px-2.5">
        <Link to={`/products/${product.sku}`} className="block w-full h-full relative flex items-center justify-center">
          {/* Primary Image */}
          <img
            src={imageSrc}
            alt={product.product_name}
            className={`max-h-[80px] sm:max-h-[100px] max-w-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:opacity-0 ${
              isOutOfStock ? "grayscale contrast-95 opacity-85" : ""
            }`}
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                "/images/cat_cables_1785994179162.png"
            }}
          />
          {/* Hover Image */}
          <img
            src={hoverImageSrc}
            alt={`${product.product_name} Alternative`}
            className={`max-h-[80px] sm:max-h-[100px] max-w-full object-contain absolute inset-0 m-auto opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 ${
              isOutOfStock ? "grayscale contrast-95 opacity-85" : ""
            }`}
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                "/images/bento_net_1785994371883.png"
            }}
          />
        </Link>
      </div>

      {/* Card Details body - SET TO WHITE */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-grow bg-white">
        <div>
          <div className="flex items-start justify-between gap-1.5 min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#c8102e] uppercase tracking-wider min-w-0 flex-1 leading-tight">
              {product.category_name || "Industrial Solutions"}
            </span>
            {product.brand && (
              <span className="text-[9px] font-bold text-gray-700 shrink-0 leading-tight">
                {product.brand}
              </span>
            )}
          </div>
          <h4 className="font-heading text-[12px] sm:text-[13px] font-bold text-[#222222] mt-0.5 leading-snug hover:text-[#c8102e] transition-colors">
            <Link to={`/products/${product.sku}`}>{product.product_name}</Link>
          </h4>
        </div>

        {/* Action button bar */}
        <div className="mt-2 pt-2 border-t border-[#e5e7eb] flex items-center justify-between gap-1.5 min-w-0">
          <span
            className="text-[10px] sm:text-[11px] font-bold text-[#111111] min-w-0 flex-1 leading-tight break-all"
            title={product.sku}
          >
            {product.sku}
          </span>
          {isRfqEligible ? (
            <button
              onClick={handleAddToQuote}
              className={`${
                isOutOfStock
                  ? "bg-[#808489] hover:bg-[#6c7075] text-white"
                  : "bg-[#c8102e] hover:bg-[#b00d26] text-white"
              } px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap shadow-2xs`}
            >
              Request Quote
            </button>
          ) : (
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 shrink-0 whitespace-nowrap">
              Enquire Direct
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
