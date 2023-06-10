import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json()
    const user = await prisma.user.create({
      data: {
        name: data.username,
        email: data.password
      }
    })
    return new NextResponse(JSON.stringify(user))
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: 'invalid inputs' }))
  }
}
