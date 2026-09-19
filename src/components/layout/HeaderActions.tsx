import { useQuoteStore } from "@/features/quote/store/quote.store"
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store"
import { Heart, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

export default function HeaderActions() {
  const openDrawer = useQuoteStore((state) => state.openDrawer)
  const totalQuoteItems = useQuoteStore((state) => state.getTotalCount())
  const wishlistItemsCount = useWishlistStore((state) => state.items.length)

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
    </div>
  )
}
