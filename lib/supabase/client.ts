import { createClient, type SupabaseClient } from '@supabase/supabase-js'

declare global {
  var __weddingSupabaseBrowserClient: SupabaseClient | undefined
}

export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY',
    )
  }

  if (typeof window !== 'undefined') {
    if (!globalThis.__weddingSupabaseBrowserClient) {
      globalThis.__weddingSupabaseBrowserClient = createClient(
        supabaseUrl,
        supabaseAnonKey,
      )
    }

    return globalThis.__weddingSupabaseBrowserClient
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}