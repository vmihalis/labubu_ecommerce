'use client'

import { useState, useEffect, Suspense } from 'react'
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
import { ShippingDetails } from '@/lib/types'

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
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null)

  const clientSecret = searchParams.get('session')

  const getOrderId = () => sessionStorage.getItem('orderId')

  const updateOrderStatus = async (
    nextStatus: 'pending' | 'processing' | 'completed' | 'failed',
    paymentIntentId?: string,
  ) => {
    const orderId = getOrderId()
    if (!orderId) return

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: nextStatus,
          ...(paymentIntentId ? { paymentIntentId } : {}),
        }),
      })
      if (!response.ok) {
        console.warn(`Order update request failed with status ${response.status}`)
      }
    } catch (updateError) {
      console.warn(`Unable to update order ${orderId}`, updateError)
    }
  }

  const normalizeCountryCode = (country?: string) => {
    if (!country) return undefined
    const value = country.trim()
    if (value.length === 2) {
      return value.toUpperCase()
    }

    const match = value.toLowerCase()
    if (match === 'united states' || match === 'united states of america' || match === 'usa') {
      return 'US'
    }
    if (match === 'canada') {
      return 'CA'
    }
    if (match === 'united kingdom' || match === 'uk') {
      return 'GB'
    }

    return undefined
  }

  useEffect(() => {
    // Retrieve shipping details saved during checkout for billing info
    const storedShipping = sessionStorage.getItem('shippingDetails')
    if (storedShipping) {
      try {
        setShippingDetails(JSON.parse(storedShipping) as ShippingDetails)
      } catch (parseError) {
        console.warn('Unable to parse stored shipping details', parseError)
      }
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setProcessing(true)
    setError(null)

    if (clientSecret === 'test_mode') {
      // Simulated success path for environments without real Stripe keys
      setTimeout(async () => {
        setSucceeded(true)
        clearCart()
        await updateOrderStatus('completed', 'test_mode_payment')

        const orderId = getOrderId()
        setTimeout(() => {
          router.push(`/order-confirmation?orderId=${orderId}`)
        }, 1500)
      }, 1500)
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setProcessing(false)
      setError('Payment form is not ready yet. Please try again in a moment.')
      return
    }

    const billingDetails = shippingDetails
      ? {
          name: shippingDetails.name,
          email: shippingDetails.email,
          address: {
            line1: shippingDetails.address,
            city: shippingDetails.city,
            state: shippingDetails.state,
            postal_code: shippingDetails.zip,
            country: normalizeCountryCode(shippingDetails.country),
          },
          phone: shippingDetails.phone,
        }
      : undefined

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: billingDetails,
      },
    })

    if (result.error) {
      setProcessing(false)
      setError(result.error.message ?? 'Payment was not completed. Please try again.')
      await updateOrderStatus('failed')
      return
    }

    if (result.paymentIntent?.status === 'succeeded') {
      setSucceeded(true)
      clearCart()

      await updateOrderStatus('completed', result.paymentIntent.id)
      const orderId = getOrderId()

      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${orderId}`)
      }, 1500)
      return
    }

    setProcessing(false)
    setError('Payment processing did not complete. Please try again.')
    await updateOrderStatus('failed')
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

function PaymentContent() {
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

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
