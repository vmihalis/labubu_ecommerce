import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CartItem, ShippingDetails } from '@/lib/types'
import { orders } from '@/lib/orders'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20',
})

export async function POST(request: NextRequest) {
  try {
    const { items, shipping, amount, discountCode } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Create order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Calculate subtotal from items
    const subtotal = items.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0)

    // Calculate discount
    let discount = 0
    if (discountCode) {
      const discountPercent = discountCode === 'LABU20' ? 20 : discountCode === 'LABU10' ? 10 : discountCode === 'WELCOME5' ? 5 : 0
      discount = (subtotal * discountPercent) / 100
    }

    // Calculate tax after discount
    const taxableAmount = subtotal - discount
    const tax = taxableAmount * 0.08

    // Store order details
    const order = {
      id: orderId,
      items: items as CartItem[],
      shipping: shipping as ShippingDetails,
      subtotal,
      discount,
      discountCode,
      tax,
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

    // More specific error handling for Stripe errors
    if (error instanceof Error) {
      // Check if it's a Stripe-specific error
      if ('type' in error) {
        return NextResponse.json(
          { error: error.message || 'Payment processing failed' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}