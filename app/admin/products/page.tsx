'use client'

import { useState } from 'react'
import { useInventory } from '@/lib/store/inventory'
import Image from 'next/image'
import { Product } from '@/lib/types'

export default function AdminProductsPage() {
  const { products, updateProduct, addProduct, deleteProduct } = useInventory()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editForm, setEditForm] = useState<Partial<Product>>({})
  const [createForm, setCreateForm] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    image: '/images/placeholder.svg',
    category: '',
    inStock: true,
    featured: false,
    stock: 0
  })

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setEditForm(product)
  }

  const handleSaveEdit = () => {
    if (editingId && editForm) {
      updateProduct(editingId, editForm)
      setEditingId(null)
      setEditForm({})
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleCreate = () => {
    if (createForm.name && createForm.price > 0) {
      addProduct(createForm)
      setShowCreateModal(false)
      setCreateForm({
        name: '',
        price: 0,
        description: '',
        image: '/images/placeholder.svg',
        category: '',
        inStock: true,
        featured: false,
        stock: 0
      })
    }
  }

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId)
    }
  }

  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="px-4 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Add New Product
        </button>
      </div>

      {/* Create Product Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowCreateModal(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4">
                <h2 className="text-2xl font-bold">Create New Product</h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={createForm.name}
                      onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={createForm.price}
                      onChange={(e) => setCreateForm({ ...createForm, price: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={createForm.stock || 0}
                      onChange={(e) => setCreateForm({ ...createForm, stock: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="space-y-2">
                      <select
                        value={createForm.category}
                        onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select existing category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Or create new category"
                        value={createForm.category}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={createForm.description}
                      onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      rows={4}
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={createForm.image}
                      onChange={(e) => setCreateForm({ ...createForm, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="createFeatured"
                        checked={createForm.featured}
                        onChange={(e) => setCreateForm({ ...createForm, featured: e.target.checked })}
                        className="h-4 w-4 text-primary-600 rounded mr-3"
                      />
                      <span className="text-sm text-gray-700">Featured Product</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4">
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Create Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white shadow overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[300px]">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className={editingId === product.id ? 'bg-blue-50' : ''}>
                {editingId === product.id ? (
                  <>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="relative h-10 w-10 flex-shrink-0">
                            <Image
                              src={editForm.image || '/images/placeholder.svg'}
                              alt={editForm.name || ''}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="text-sm font-medium text-gray-900 border rounded px-2 py-1 w-full max-w-[200px]"
                            placeholder="Product name"
                          />
                        </div>
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="text-sm text-gray-500 border rounded px-2 py-1 w-full min-w-[250px]"
                          rows={3}
                          placeholder="Product description"
                        />
                        <input
                          type="text"
                          value={editForm.image}
                          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                          className="text-sm text-gray-500 border rounded px-2 py-1 w-full"
                          placeholder="Image URL"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                        className="text-sm text-gray-900 border rounded px-2 py-1 w-24"
                        placeholder="Price"
                      />
                    </td>
                    <td className="px-6 py-4 align-top">
                      <input
                        type="text"
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="text-sm text-gray-900 border rounded px-2 py-1 w-full min-w-[120px]"
                        placeholder="Category"
                      />
                    </td>
                    <td className="px-6 py-4 align-top">
                      <input
                        type="number"
                        value={editForm.stock || 0}
                        onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) })}
                        className="text-sm text-gray-900 border rounded px-2 py-1 w-20"
                        placeholder="Stock"
                      />
                    </td>
                    <td className="px-6 py-4 align-top">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editForm.featured}
                          onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                          className="h-4 w-4 text-primary-600 rounded mr-2"
                        />
                        <span className="text-sm text-gray-900">Featured</span>
                      </label>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="relative h-10 w-10 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${
                        product.stock === 0 ? 'text-red-600' :
                        product.stock && product.stock < 5 ? 'text-yellow-600' : 'text-gray-900'
                      }`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                      {product.featured && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
          <div className="text-sm text-gray-500">Total Products</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {products.filter(p => p.inStock).length}
          </div>
          <div className="text-sm text-gray-500">In Stock</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-red-600">
            {products.filter(p => !p.inStock).length}
          </div>
          <div className="text-sm text-gray-500">Out of Stock</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {products.filter(p => p.featured).length}
          </div>
          <div className="text-sm text-gray-500">Featured</div>
        </div>
      </div>
    </div>
  )
}