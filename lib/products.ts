import productsData from './products.json'
import { Product } from './types'

export const getAllProducts = (): Product[] => {
  return productsData.products
}

export const getProductById = (id: string): Product | undefined => {
  return productsData.products.find(product => product.id === id)
}

export const getFeaturedProducts = (): Product[] => {
  return productsData.products.filter(product => product.featured)
}