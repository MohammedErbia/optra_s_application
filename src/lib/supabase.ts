import { createClient } from '@supabase/supabase-js';
import { retry } from '../utils/retry';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'x-application-name': 'optra-agency'
    }
  }
});

// Wrapper function with retry mechanism
export async function supabaseQuery<T>(
  query: () => Promise<{ data: T; error: any }>,
  options = { maxAttempts: 3, delay: 1000 }
) {
  return retry(
    async () => {
      const { data, error } = await query();
      if (error) throw error;
      return data;
    },
    options
  );
} 