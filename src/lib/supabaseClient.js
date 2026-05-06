import { createClient } from '@supabase/supabase-js'

const fallbackSupabaseUrl = 'https://rfiifzhcmkjvhoktppua.supabase.co'
const fallbackSupabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmaWlmemhjbWtqdmhva3RwcHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMzI4MjUsImV4cCI6MjA5MzYwODgyNX0.E9Dss4_d22EetM2hfAS2-RwaNzGOww_geTHujFFdQr8'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackSupabaseUrl
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function saveRsvpResponse(payload) {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const { error } = await supabase
    .from('rsvp_responses')
    .upsert(payload, { onConflict: 'reservation_name,guest_name' })

  if (error) {
    throw error
  }
}

export async function getRsvpResponses() {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const { data, error } = await supabase
    .from('rsvp_responses')
    .select('*')
    .order('responded_at', { ascending: false })

  if (error) {
    throw error
  }

  return data ?? []
}
