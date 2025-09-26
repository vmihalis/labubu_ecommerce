import { NextRequest, NextResponse } from 'next/server'
import { orders } from '@/lib/orders'

interface UpdateOrderPayload {
  status?: 'pending' | 'processing' | 'completed' | 'failed'
  paymentIntentId?: string
}

export async function PATCH(request: NextRequest, { params }: { params: { orderId: string } }) {
  const { orderId } = params

  if (!orders.has(orderId)) {
    return NextResponse.json(
      { error: `Order ${orderId} not found` },
      { status: 404 }
    )
  }

  try {
    const payload = (await request.json()) as UpdateOrderPayload
    const existingOrder = orders.get(orderId)!

    const updatedOrder = {
      ...existingOrder,
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.paymentIntentId ? { paymentIntentId: payload.paymentIntentId } : {}),
    }

    orders.set(orderId, updatedOrder)

    return NextResponse.json({ order: updatedOrder })
  } catch (error) {
    console.error(`Failed to update order ${orderId}:`, error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
