import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CompareItem {
  id: string
  sku: string
  name: string
  category: string
  code: string
  brand?: string
  image?: string
  key_spec_1?: string | null
  key_spec_2?: string | null
  key_spec_3?: string | null
  stock_status?: string | null
  short_description?: string | null
}

interface CompareState {
  items: CompareItem[]
  toggleItem: (item: CompareItem) => void
  removeItem: (id: string) => void
  hasItem: (id: string) => boolean
  clearCompare: () => void
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (item) => {
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id || i.sku === item.sku)
          if (exists) {
            return { items: state.items.filter((i) => i.id !== item.id && i.sku !== item.sku) }
          }
          // Limit to max 4 items for comparison matrix clarity
          if (state.items.length >= 4) {
            return { items: [...state.items.slice(1), item] }
          }
          return { items: [...state.items, item] }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id && item.sku !== id),
        }))
      },

      hasItem: (id) => {
        return get().items.some((item) => item.id === id || item.sku === id)
      },

      clearCompare: () => {
        set({ items: [] })
      },
    }),
    {
      name: "efocus_compare",
    }
  )
)
