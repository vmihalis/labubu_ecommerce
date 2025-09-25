import { Order } from './types'

// In-memory order storage for MVP (in production, use a database)
export const orders = new Map<string, Order>()

// Re-export Order type for convenience
export type { Order }