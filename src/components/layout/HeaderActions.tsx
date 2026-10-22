import { useQuoteStore } from "@/features/quote/store/quote.store"
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store"
import { useCompareStore } from "@/features/compare/store/compare.store"
import { Heart, ShoppingCart, ArrowLeftRight } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function HeaderActions() {
  const location = useLocation()
  const isProductPage = location.pathname.startsWith("/products") || location.pathname.startsWith("/compare")
  const openDrawer = useQuoteStore((state) => state.openDrawer)
  const totalQuoteItems = useQuoteStore((state) => state.getTotalCount())
  const wishlistItemsCount = useWishlistStore((state) => state.items.length)
  const compareItemsCount = useCompareStore((state) => state.items.length)

  return (
    <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
      {/* Shopping Cart Icon with red badge */}
      <button
        onClick={openDrawer}
        className="text-[#1a1a1a] hover:text-[#c8102e] transition-colors relative flex items-center justify-center p-1 cursor-pointer"
        title="View RFQ Cart Basket"
        aria-label="View RFQ Basket"
      >
        <ShoppingCart size={23} strokeWidth={1.8} />
        {/* Red circle badge */}
        <span className="absolute -top-1.5 -right-2 bg-[#c8102e] text-white text-[9px] font-extrabold min-w-[15px] h-[15px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
          {totalQuoteItems > 0 ? totalQuoteItems : ""}
        </span>
      </button>

      {/* Wishlist Heart Icon with red badge */}
      <Link
        to="/wishlist"
        className="text-[#1a1a1a] hover:text-[#c8102e] transition-colors relative flex items-center justify-center p-1"
        title="View Wishlist"
        aria-label="View Wishlist"
      >
        <Heart size={23} strokeWidth={1.8} />
        {/* Red circle badge */}
        <span className="absolute -top-1.5 -right-2 bg-[#c8102e] text-white text-[9px] font-extrabold min-w-[15px] h-[15px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
          {wishlistItemsCount > 0 ? wishlistItemsCount : ""}
        </span>
      </Link>

      {/* Compare Icon with red badge (Only on product & compare pages) */}
      {isProductPage && (
        <Link
          to="/compare"
          className="text-[#1a1a1a] hover:text-[#c8102e] transition-colors relative flex items-center justify-center p-1"
          title="View Compare"
          aria-label="View Compare"
        >
          <ArrowLeftRight size={22} strokeWidth={1.8} />
          {/* Red circle badge */}
          <span className="absolute -top-1.5 -right-2 bg-[#c8102e] text-white text-[9px] font-extrabold min-w-[15px] h-[15px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
            {compareItemsCount > 0 ? compareItemsCount : ""}
          </span>
        </Link>
      )}
    </div>
  )
}
