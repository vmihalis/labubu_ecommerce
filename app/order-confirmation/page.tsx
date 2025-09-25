'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ShippingDetails } from '@/lib/types'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string | null
    shipping: ShippingDetails | null
  }>({
    orderId: null,
    shipping: null
  })

  useEffect(() => {
    const orderId = searchParams.get('orderId') || sessionStorage.getItem('orderId')
    const shippingData = sessionStorage.getItem('shippingDetails')

    if (orderId) {
      setOrderDetails({
        orderId,
        shipping: shippingData ? JSON.parse(shippingData) : null
      })
    }

    // Clear session storage after retrieving
    sessionStorage.removeItem('orderId')
    sessionStorage.removeItem('shippingDetails')
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              Thank you for your purchase! Your LABUBUS are on their way.
            </p>

            {orderDetails.orderId && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">Order Number</p>
                <p className="text-xl font-semibold text-gray-900">{orderDetails.orderId}</p>
              </div>
            )}

            {orderDetails.shipping && (
              <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Shipping To:</h3>
                <div className="text-gray-600 space-y-1">
                  <p>{orderDetails.shipping.name}</p>
                  <p>{orderDetails.shipping.address}</p>
                  <p>{orderDetails.shipping.city}, {orderDetails.shipping.state} {orderDetails.shipping.zip}</p>
                  <p>{orderDetails.shipping.country}</p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Confirmation email sent to: <span className="font-medium">{orderDetails.shipping.email}</span>
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-gray-600">
                You will receive an email confirmation with tracking information once your order ships.
              </p>
              <p className="text-gray-600">
                Estimated delivery: 5-7 business days
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href="/products"
                className="block w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="block w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Questions about your order?</p>
            <Link href="/contact" className="text-primary-600 hover:text-primary-700">
              Contact our support team
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}