import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/']
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('ACCESS_TOKEN')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
