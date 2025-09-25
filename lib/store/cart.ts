import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  discountCode: string | null
  discountPercent: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyDiscount: (code: string) => boolean
  removeDiscount: () => void
  getSubtotal: () => number
  getDiscount: () => number
  getTax: () => number
  getTotal: () => number
  getItemCount: () => number
  toggleCart: () => void
}

const TAX_RATE = 0.08 // 8% tax rate

// Discount codes
const DISCOUNT_CODES: Record<string, number> = {
  'LABU10': 10,
  'LABU20': 20,
  'WELCOME5': 5,
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      discountCode: null,
      discountPercent: 0,

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
        set({ items: [], discountCode: null, discountPercent: 0 })
      },

      applyDiscount: (code: string) => {
        const upperCode = code.toUpperCase()
        if (DISCOUNT_CODES[upperCode]) {
          set({
            discountCode: upperCode,
            discountPercent: DISCOUNT_CODES[upperCode]
          })
          return true
        }
        return false
      },

      removeDiscount: () => {
        set({ discountCode: null, discountPercent: 0 })
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal()
        const discountPercent = get().discountPercent
        return (subtotal * discountPercent) / 100
      },

      getTax: () => {
        const subtotal = get().getSubtotal()
        const discount = get().getDiscount()
        return (subtotal - discount) * TAX_RATE
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const discount = get().getDiscount()
        const tax = get().getTax()
        return subtotal - discount + tax
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