'use client'

import Link from 'next/link'
import { useCart } from '@/lib/store/cart'

export default function Navbar() {
  const itemCount = useCart(state => state.getItemCount())

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">LABUBUS</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
            Home
          </Link>
          <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
            Shop
          </Link>
          <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
            About
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}