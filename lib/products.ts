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
    const merged = mergeWithBaseProducts(state.products)
    if (merged !== state.products) {
      useInventory.setState({ products: merged })
    }
    return merged
  }
  return productsData.products
}

export const getProductById = (id: string): Product | undefined => {
  if (typeof window !== 'undefined') {
    const state = useInventory.getState()
    const existingProduct = state.getProductById(id)
    if (existingProduct) {
      return existingProduct
    }

    const fallbackProduct = productsData.products.find(product => product.id === id)
    if (fallbackProduct) {
      useInventory.setState((currentState) => {
        const alreadyPresent = currentState.products.some(product => product.id === fallbackProduct.id)
        if (alreadyPresent) {
          return {}
        }
        return { products: [...currentState.products, fallbackProduct] }
      })
    }
    return fallbackProduct
  }
  return productsData.products.find(product => product.id === id)
}

export const getFeaturedProducts = (): Product[] => {
  if (typeof window !== 'undefined') {
    const state = useInventory.getState()
    const merged = mergeWithBaseProducts(state.products)
    if (merged !== state.products) {
      useInventory.setState({ products: merged })
    }
    return merged.filter(product => product.featured)
  }
  return productsData.products.filter(product => product.featured)
}

function mergeWithBaseProducts(currentProducts: Product[]): Product[] {
  const baseProducts = productsData.products
  const missingProducts = baseProducts.filter(
    baseProduct => !currentProducts.some(product => product.id === baseProduct.id)
  )

  if (missingProducts.length === 0) {
    return currentProducts
  }

  return [...currentProducts, ...missingProducts]
}
