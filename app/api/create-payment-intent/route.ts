import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CartItem, ShippingDetails } from '@/lib/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
})

// In-memory order storage for MVP (in production, use a database)
const orders = new Map()

export async function POST(request: NextRequest) {
  try {
    const { items, shipping, amount } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Create order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store order details
    const order = {
      id: orderId,
      items: items as CartItem[],
      shipping: shipping as ShippingDetails,
      subtotal: amount / 100,
      tax: (amount / 100) * 0.08,
      total: amount / 100,
      status: 'pending' as const,
      createdAt: new Date(),
    }

    orders.set(orderId, order)

    // Check if we have valid Stripe keys
    const hasValidStripeKey = process.env.STRIPE_SECRET_KEY &&
                              !process.env.STRIPE_SECRET_KEY.includes('test_51234567890')

    if (hasValidStripeKey) {
      // Create real Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // amount in cents
        currency: 'usd',
        metadata: {
          orderId,
          customerEmail: shipping.email,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      })

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        orderId,
      })
    } else {
      // Test mode - return mock response
      console.log('Running in test mode - no real Stripe charges')
      return NextResponse.json({
        clientSecret: 'test_mode',
        orderId,
      })
    }
  } catch (error) {
    console.error('Payment intent error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}

// Export orders for other routes
export { orders }