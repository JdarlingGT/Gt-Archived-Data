import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper functions for common operations
export const supabaseHelpers = {
  // Authentication helpers
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Database helpers
  select: async (table, columns = '*', filters = {}) => {
    let query = supabase.from(table).select(columns)

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query = query.eq(key, value)
      }
    })

    const { data, error } = await query
    return { data, error }
  },

  insert: async (table, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
    return { data: result, error }
  },

  update: async (table, data, filters = {}) => {
    let query = supabase.from(table).update(data)

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query = query.eq(key, value)
      }
    })

    const { data: result, error } = await query.select()
    return { data: result, error }
  },

  delete: async (table, filters = {}) => {
    let query = supabase.from(table).delete()

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query = query.eq(key, value)
      }
    })

    const { error } = await query
    return { error }
  }
}

export default supabase