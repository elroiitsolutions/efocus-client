import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface QuoteItem {
  id: string
  name: string
  category: string
  qty: number
  code: string // SKU or Catalog Number
  specs?: {
    assemblyType?: string
    insulationOption?: string
  }
}

interface QuoteState {
  items: QuoteItem[]
  isDrawerOpen: boolean
  addItem: (item: Omit<QuoteItem, "qty"> & { qty?: number }) => void
  removeItem: (id: string) => void
  updateQty: (id: string, delta: number) => void
  clearQuote: () => void
  openDrawer: () => void
  closeDrawer: () => void
  getTotalCount: () => number
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.id === newItem.id
          )
          if (existingIndex > -1) {
            const updatedItems = [...state.items]
            updatedItems[existingIndex].qty += newItem.qty || 1
            return { items: updatedItems }
          }
          return {
            items: [
              ...state.items,
              { ...newItem, qty: newItem.qty || 1 } as QuoteItem,
            ],
          }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      updateQty: (id, delta) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === id) {
                return { ...item, qty: item.qty + delta }
              }
              return item
            })
            .filter((item) => item.qty > 0)
          return { items: updatedItems }
        })
      },

      clearQuote: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      getTotalCount: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0)
      },
    }),
    {
      name: "efocus_quote_basket",
    }
  )
)
