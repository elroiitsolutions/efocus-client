import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface WishlistItem {
  id: string
  name: string
  category: string
  code: string
  image?: string
}

interface WishlistState {
  items: WishlistItem[]
  toggleItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  hasItem: (id: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (item) => {
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id)
          if (exists) {
            return { items: state.items.filter((i) => i.id !== item.id) }
          }
          return { items: [...state.items, item] }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      hasItem: (id) => {
        return get().items.some((item) => item.id === id)
      },

      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: "efocus_wishlist",
    }
  )
)
