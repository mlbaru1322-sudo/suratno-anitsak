import { createClient, type User } from '@supabase/supabase-js'

export const ADMIN_SESSION_COOKIE = 'wedding_admin_access_token'
export const ADMIN_UNAUTHORIZED_PATH = '/admin/unauthorized'

type AdminCheckResult = {
  user: User | null
  isAdmin: boolean
}

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY',
    )
  }

  return { supabaseUrl, supabaseAnonKey }
}

export function createSupabaseAccessTokenClient(accessToken: string) {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })
}

export async function checkAdminAccessToken(
  accessToken: string | undefined,
): Promise<AdminCheckResult> {
  if (!accessToken) {
    return { user: null, isAdmin: false }
  }

  try {
    const supabase = createSupabaseAccessTokenClient(accessToken)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken)

    if (userError || !user) {
      return { user: null, isAdmin: false }
    }

    const { data: adminRow, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle()

    if (adminError || !adminRow) {
      return { user, isAdmin: false }
    }

    return { user, isAdmin: true }
  } catch {
    return { user: null, isAdmin: false }
  }
}
