import { NextRequest, NextResponse } from 'next/server'

// Store newsletter subscriptions (in production, use a database or email service)
const subscribers = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    if (subscribers.has(email)) {
      return NextResponse.json(
        { message: 'Already subscribed!' },
        { status: 200 }
      )
    }

    // Add to subscribers
    subscribers.add(email)

    // In production, you would:
    // - Save to database
    // - Send to email service (Mailchimp, SendGrid, etc.)
    // - Send welcome email

    console.log(`New newsletter subscriber: ${email}`)
    console.log(`Total subscribers: ${subscribers.size}`)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Admin endpoint to get subscriber count
  return NextResponse.json({
    count: subscribers.size,
    // Don't expose actual emails in production
    subscribers: process.env.NODE_ENV === 'development' ? Array.from(subscribers) : []
  })
}