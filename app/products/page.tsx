'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'
import { useInventory } from '@/lib/store/inventory'

export default function ProductsPage() {
  const { products } = useInventory()
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-primary-100 to-secondary-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
            <p className="text-lg text-gray-600 mt-2">
              Explore our complete collection of LABUBUS toys and collectibles
            </p>
          </div>
        </div>

        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex gap-2">
                {['All', ...categories].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}