import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import productsData from '../products.json'
import { Product } from '../types'

interface InventoryState {
  products: Product[]
  updateStock: (productId: string, stock: number) => void
  updateProduct: (productId: string, updates: Partial<Product>) => void
  addProduct: (product: Omit<Product, 'id'>) => void
  deleteProduct: (productId: string) => void
  getProducts: () => Product[]
  getProductById: (productId: string) => Product | undefined
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

      updateProduct: (productId: string, updates: Partial<Product>) => {
        set((state) => ({
          products: state.products.map(product =>
            product.id === productId
              ? {
                  ...product,
                  ...updates,
                  inStock: updates.stock !== undefined ? updates.stock > 0 : product.inStock
                }
              : product
          )
        }))
      },

      addProduct: (product: Omit<Product, 'id'>) => {
        const newId = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const newProduct: Product = {
          ...product,
          id: newId,
          inStock: product.stock ? product.stock > 0 : false
        }
        set((state) => ({
          products: [...state.products, newProduct]
        }))
      },

      deleteProduct: (productId: string) => {
        set((state) => ({
          products: state.products.filter(product => product.id !== productId)
        }))
      },

      getProducts: () => get().products,

      getProductById: (productId: string) => {
        return get().products.find(p => p.id === productId)
      }
    }),
    {
      name: 'inventory-storage',
    }
  )
)