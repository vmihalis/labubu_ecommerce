import { Order } from './types'

type GlobalWithOrders = typeof globalThis & {
  __labubuOrders?: Map<string, Order>
}

const globalForOrders = globalThis as GlobalWithOrders

if (!globalForOrders.__labubuOrders) {
  globalForOrders.__labubuOrders = new Map<string, Order>()
}

// In-memory order storage for MVP (in production, use a database)
export const orders = globalForOrders.__labubuOrders

// Re-export Order type for convenience
export type { Order }
