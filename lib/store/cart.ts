import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getSubtotal: () => number
  getTax: () => number
  getTotal: () => number
  getItemCount: () => number
  toggleCart: () => void
}

const TAX_RATE = 0.08 // 8% tax rate

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id)

          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, 99) }
                  : item
              )
            }
          }

          // Add new item
          return {
            items: [...state.items, { ...product, quantity }]
          }
        })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity: Math.min(quantity, 99) }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getTax: () => {
        return get().getSubtotal() * TAX_RATE
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const tax = get().getTax()
        return subtotal + tax
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      }
    }),
    {
      name: 'labubus-cart-storage',
      partialize: (state) => ({ items: state.items }) // Only persist items, not UI state
    }
  )
)