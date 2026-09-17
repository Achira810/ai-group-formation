import { createClient } from '@supabase/supabase-js';

// Environment variables configured in Vite (.env / .env.production / Vercel Environment Variables)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://udtajzpgrgltkdvcvttm.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zB1s-1CQvxmfXz_YwK0yCg_nWlgY2mg';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    '[Supabase Configuration] Environment variables VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing. Falling back to default configuration. For production, set these in Vercel Dashboard.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);