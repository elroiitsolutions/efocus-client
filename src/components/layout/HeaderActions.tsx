import { useQuoteStore } from "@/features/quote/store/quote.store"
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store"
import { Mail, Heart, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"

export default function HeaderActions() {
  const openDrawer = useQuoteStore((state) => state.openDrawer)
  const totalQuoteItems = useQuoteStore((state) => state.getTotalCount())
  const wishlistItemsCount = useWishlistStore((state) => state.items.length)

  return (
    <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
      {/* Email Direct */}
      <a
        href="mailto:chandruravichandran1536@gmail.com"
        className="hidden sm:inline-flex text-[#222222] hover:text-[#B20602] transition-colors relative"
        title="Email Direct Sales"
      >
        <Mail size={22} />
      </a>

      {/* Wishlist Link */}
      <Link
        to="/wishlist"
        className="hidden sm:inline-flex text-[#222222] hover:text-[#B20602] transition-colors relative"
        title="Wishlist"
      >
        <div className="relative">
          <Heart size={22} />
          {wishlistItemsCount > 0 && (
            <span className="absolute -top-[6px] -right-[8px] bg-[#B20602] text-white text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {wishlistItemsCount}
            </span>
          )}
        </div>
      </Link>

      {/* Quote Basket Drawer Toggle */}
      <button
        onClick={openDrawer}
        className="text-[#222222] hover:text-[#B20602] transition-colors relative cursor-pointer bg-none border-none p-0"
        title="View Quote Basket"
      >
        <div className="relative">
          <ShoppingBag size={22} />
          {totalQuoteItems > 0 && (
            <span className="absolute -top-[6px] -right-[8px] bg-[#B20602] text-white text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
              {totalQuoteItems}
            </span>
          )}
        </div>
      </button>
    </div>
  )
}
