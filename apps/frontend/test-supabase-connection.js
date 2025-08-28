// Test Supabase Connection
// Run with: cd apps/frontend && node test-supabase-connection.js

import { createClient } from '@supabase/supabase-js'

// Use the same environment variables as your app
const supabaseUrl = 'https://cjutjtjnizxdkzcbdnqe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdXRqdGpuaXp4ZGt6Y2JkbnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMjIwODYsImV4cCI6MjA3MTg5ODA4Nn0.0n2MUMNEjIHUX4Y3okzABZX9-KOfUJ4oYFy7Bhjl5EM'

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...')
  console.log('📍 Supabase URL:', supabaseUrl)
  console.log('🔑 API Key:', supabaseAnonKey.substring(0, 20) + '...')
  console.log()

  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing basic connection...')
    const { data: connectionTest, error: connectionError } = await supabase
      .from('events')
      .select('count')
      .limit(1)

    if (connectionError) {
      console.error('❌ Connection failed:', connectionError.message)
      return
    }
    console.log('✅ Connection successful!')

    // Test 2: Fetch events data
    console.log('\n2️⃣ Testing data fetch from events table...')
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .limit(3)

    if (eventsError) {
      console.error('❌ Events fetch failed:', eventsError.message)
      console.log('💡 This might be normal if the events table is empty or doesn\'t exist yet')
    } else {
      console.log('✅ Events fetched successfully!')
      console.log('📊 Events data:', events)
    }

    // Test 3: Check available tables
    console.log('\n3️⃣ Checking available tables...')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .neq('table_name', 'spatial_ref_sys')

    if (tablesError) {
      console.error('❌ Tables check failed:', tablesError.message)
    } else {
      console.log('✅ Available tables:')
      tables?.forEach(table => {
        console.log('  📋', table.table_name)
      })
    }

    console.log('\n🎉 Supabase connection test completed!')

  } catch (error) {
    console.error('💥 Unexpected error:', error.message)
  }
}

// Run the test
testConnection()