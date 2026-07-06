import { NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  checkAdminAccessToken,
} from '@/lib/supabase/admin-auth'

const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    accessToken?: unknown
  } | null
  const accessToken =
    typeof body?.accessToken === 'string' ? body.accessToken : ''

  const { user, isAdmin } = await checkAdminAccessToken(accessToken)

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHENTICATED' }, { status: 401 })
  }

  if (!isAdmin) {
    return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })

  return response
}
