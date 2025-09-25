'use client'

import { useState } from 'react'
import { useInventory } from '@/lib/store/inventory'
import Image from 'next/image'

export default function AdminInventoryPage() {
  const { products, updateStock } = useInventory()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tempStock, setTempStock] = useState<number>(0)

  const handleEdit = (productId: string, currentStock: number) => {
    setEditingId(productId)
    setTempStock(currentStock)
  }

  const handleSave = (productId: string) => {
    updateStock(productId, tempStock)
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setTempStock(0)
  }

  const lowStockProducts = products.filter(p => p.stock !== undefined && p.stock < 5 && p.stock > 0)
  const outOfStockProducts = products.filter(p => p.stock === 0)

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Inventory Management</h1>

      {/* Alerts */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="mb-6 space-y-2">
          {outOfStockProducts.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-red-700">
                <span className="font-semibold">{outOfStockProducts.length} products</span> are out of stock
              </p>
            </div>
          )}
          {lowStockProducts.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">
                <span className="font-semibold">{lowStockProducts.length} products</span> have low stock
              </p>
            </div>
          )}
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className={product.stock === 0 ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        SKU: LAB-{product.id.padStart(4, '0')}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={tempStock}
                      onChange={(e) => setTempStock(parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                      min="0"
                    />
                  ) : (
                    <span className={`px-2 py-1 text-sm font-semibold rounded ${
                      product.stock === 0 ? 'bg-red-100 text-red-800' :
                      (product.stock || 0) < 5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {product.stock || 0}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingId === product.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(product.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(product.id, product.stock || 0)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Update Stock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}