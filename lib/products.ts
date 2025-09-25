import { useInventory } from './store/inventory'
import productsData from './products.json'
import { Product } from './types'

// Get the current products from the inventory store
// This function now returns products from the store if available, otherwise falls back to JSON
export const getAllProducts = (): Product[] => {
  // This is a workaround since we can't use hooks directly here
  // In a real app, you'd use the store directly in components
  if (typeof window !== 'undefined') {
    const state = useInventory.getState()
    return state.products
  }
  return productsData.products
}

export const getProductById = (id: string): Product | undefined => {
  if (typeof window !== 'undefined') {
    const state = useInventory.getState()
    return state.getProductById(id)
  }
  return productsData.products.find(product => product.id === id)
}

export const getFeaturedProducts = (): Product[] => {
  if (typeof window !== 'undefined') {
    const state = useInventory.getState()
    return state.products.filter(product => product.featured)
  }
  return productsData.products.filter(product => product.featured)
}