import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminState {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

// Hardcoded admin credentials for MVP
const ADMIN_CREDENTIALS = {
  email: 'admin@labubus.com',
  password: 'labubu2024'
}

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: (email: string, password: string) => {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },

      logout: () => {
        set({ isAuthenticated: false })
      }
    }),
    {
      name: 'admin-auth-storage',
    }
  )
)