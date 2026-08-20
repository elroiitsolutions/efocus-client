import { useWishlistStore } from "../store/wishlist.store"
import { useQuoteStore } from "@/features/quote/store/quote.store"
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((state) => state.items)
  const removeItem = useWishlistStore((state) => state.removeItem)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)

  const addItem = useQuoteStore((state) => state.addItem)
  const openDrawer = useQuoteStore((state) => state.openDrawer)

  const handleMoveToQuote = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      category: item.category,
      qty: 1,
      code: item.code,
    })
    removeItem(item.id)
    openDrawer()
  }

  return (
    <div className="bg-[#f9f9fb] min-h-screen py-16 text-left">
      <div className="max-w-[950px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#eaeaea] pb-6 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-[#222222]">
              My Wishlist
            </h1>
            <p className="text-[13.6px] text-[#777777] mt-1">
              Review saved components prior to merging into a consolidated RFQ.
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-[13px] text-[#B20602] hover:underline font-bold cursor-pointer"
            >
              Clear All Items
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-[10px] border border-[#eaeaea] py-24 text-center">
            <p className="text-[15.2px] text-[#777777]">Your wishlist is currently empty.</p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 bg-[#B20602] text-white px-5 py-2.5 rounded-[6px] text-[13.6px] font-bold"
            >
              <ArrowLeft size={16} /> Browse Component Lines
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#eaeaea] rounded-[10px] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#B20602] uppercase tracking-wide">
                    {item.code}
                  </span>
                  <h3 className="font-heading text-[16px] font-bold text-[#222222] mt-0.5">
                    {item.name}
                  </h3>
                  <p className="text-[12px] text-[#777777]">{item.category}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleMoveToQuote(item)}
                    className="flex-1 sm:flex-none bg-[#B20602] hover:bg-[#900502] text-white px-4 py-2 rounded-[6px] text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={14} />
                    <span>Move to Quote</span>
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-10 h-10 rounded-[6px] border border-[#eaeaea] text-gray-400 hover:text-[#B20602] hover:border-gray-300 flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
