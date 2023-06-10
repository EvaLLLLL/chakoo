import { NextResponse } from 'next/server'

export async function GET() {
  const data = { message: 'hello, Next.js' }
  return new NextResponse(JSON.stringify(data))
}
