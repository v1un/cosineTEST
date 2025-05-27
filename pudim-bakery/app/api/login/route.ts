import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD || 'pudim123'
  if (password === adminPassword) {
    // Set HTTP-only cookie for session (demo purpose)
    const response = NextResponse.json({ ok: true })
    response.cookies.set('admin', '1', { httpOnly: true, path: '/admin' })
    return response
  }
  return NextResponse.json({ ok: false }, { status: 401 })
}