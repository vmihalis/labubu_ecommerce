import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Order } from '../types'

interface OrdersState {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  getOrders: () => Order[]
  getOrderById: (orderId: string) => Order | undefined
}

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order: Order) => {
        set((state) => ({
          orders: [...state.orders, order]
        }))
      },

      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        }))
      },

      getOrders: () => get().orders,

      getOrderById: (orderId: string) => {
        return get().orders.find(order => order.id === orderId)
      }
    }),
    {
      name: 'orders-storage',
    }
  )
)