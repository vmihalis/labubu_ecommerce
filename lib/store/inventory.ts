import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import productsData from '../products.json'
import { Product } from '../types'

interface InventoryState {
  products: Product[]
  updateStock: (productId: string, stock: number) => void
  getProducts: () => Product[]
}

// Initialize with data from products.json
const initialProducts = productsData.products.map(p => ({
  ...p,
  stock: p.stock || 0
}))

export const useInventory = create<InventoryState>()(
  persist(
    (set, get) => ({
      products: initialProducts,

      updateStock: (productId: string, stock: number) => {
        set((state) => ({
          products: state.products.map(product =>
            product.id === productId
              ? { ...product, stock, inStock: stock > 0 }
              : product
          )
        }))
      },

      getProducts: () => get().products,
    }),
    {
      name: 'inventory-storage',
    }
  )
)