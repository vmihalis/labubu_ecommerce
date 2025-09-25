import { NextRequest, NextResponse } from 'next/server'
import { orders, Order } from '@/lib/orders'

export async function POST(request: NextRequest) {
  try {
    const order = await request.json()

    // Add the order to our global store
    orders.set(order.id, order)

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error('Error saving order:', error)
    return NextResponse.json(
      { error: 'Failed to save order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const ordersList = Array.from(orders.values())
    return NextResponse.json({ orders: ordersList })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}