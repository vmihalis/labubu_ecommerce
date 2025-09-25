import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    // Check for admin auth cookie/session
    // For MVP, we're using localStorage which can't be accessed in middleware
    // In production, use proper session cookies

    // For now, we'll handle auth check on client side
    // This is a placeholder for future enhancement
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}