'use client'

import { useState } from 'react'
import { useCart } from '@/lib/store/cart'

export default function DiscountCode() {
  const { discountCode, applyDiscount, removeDiscount } = useCart()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleApply = () => {
    setError('')
    setSuccess(false)

    if (!code.trim()) {
      setError('Please enter a discount code')
      return
    }

    const applied = applyDiscount(code)
    if (applied) {
      setSuccess(true)
      setCode('')
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError('Invalid discount code')
    }
  }

  const handleRemove = () => {
    removeDiscount()
    setCode('')
    setError('')
    setSuccess(false)
  }

  return (
    <div className="border-t pt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Discount Code
      </label>

      {discountCode ? (
        <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-md">
          <span className="text-green-700">
            Code <strong>{discountCode}</strong> applied!
          </span>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Apply
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
      {success && !discountCode && (
        <p className="text-green-600 text-sm mt-2">Discount applied!</p>
      )}

      <p className="text-xs text-gray-500 mt-2">
        Try: LABU10, LABU20, or WELCOME5
      </p>
    </div>
  )
}