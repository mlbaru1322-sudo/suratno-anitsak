import { NextResponse, type NextRequest } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  checkAdminAccessToken,
} from '@/lib/supabase/admin-auth'

const ADMIN_LOGIN_PATH = '/admin/login'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const { user } = await checkAdminAccessToken(accessToken)

  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = ADMIN_LOGIN_PATH
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
