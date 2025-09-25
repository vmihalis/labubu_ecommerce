import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'
import { getAllProducts } from '@/lib/products'

export default function ProductsPage() {
  const products = getAllProducts()

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
                Showing {products.length} products
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  All
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Limited Edition
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Blind Box
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Plush
                </button>
              </div>
            </div>
            <ProductGrid products={products} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}