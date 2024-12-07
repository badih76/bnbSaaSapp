import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.SUPABASE_URL!;
const supabaseAnonPublicKey = process.env.SUPABASE_ANON_PUBLIC_KEY!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    supabaseURL, 
    supabaseAnonPublicKey
)
