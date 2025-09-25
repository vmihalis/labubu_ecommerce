export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  inStock: boolean
  featured: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface ShippingDetails {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

export interface Order {
  id: string
  items: CartItem[]
  shipping: ShippingDetails
  subtotal: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: Date
  paymentIntentId?: string
}