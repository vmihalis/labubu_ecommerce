'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/lib/store/cart'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

function CheckoutForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stripe = useStripe()
  const elements = useElements()
  const { clearCart } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  const clientSecret = searchParams.get('session')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setProcessing(true)
    setError(null)

    // For MVP, simulate payment success (in production, use real Stripe)
    // This is a simplified version - in production, you'd handle the actual payment
    setTimeout(() => {
      setSucceeded(true)
      clearCart()

      // Get order details from sessionStorage
      const orderId = sessionStorage.getItem('orderId')

      // Redirect to confirmation
      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${orderId}`)
      }, 2000)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>

        <div className="p-4 border rounded-md">
          <p className="text-sm text-gray-600 mb-4">
            Test Mode: Use card number 4242 4242 4242 4242
          </p>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        {succeeded && (
          <div className="mt-4 text-green-600 text-sm">
            Payment successful! Redirecting to confirmation...
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={!stripe || processing || succeeded}
          className={`px-8 py-3 font-semibold rounded-lg transition-colors ${
            processing || succeeded
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {processing ? 'Processing...' : succeeded ? 'Success!' : 'Pay Now'}
        </button>
      </div>
    </form>
  )
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Check if we have a session
  useEffect(() => {
    if (!searchParams.get('session')) {
      router.push('/checkout')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Payment</h1>

          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>🔒 Your payment information is secure and encrypted</p>
            <p className="mt-2">Test mode: No real charges will be made</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}