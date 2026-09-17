import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://udtajzpgrgltkdvcvttm.supabase.co';
const defaultKey = 'sb_publishable_zB1s-1CQvxmfXz_YwK0yCg_nWlgY2mg';

const envUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Check if environment variables are missing or set to placeholder text
const isInvalidUrl = !envUrl || envUrl.includes('your-production-project-id') || envUrl.includes('your-project-id');
const isInvalidKey = !envKey || envKey.includes('your-production-supabase-anon-key') || envKey.includes('your-supabase-anon-key');

if (isInvalidUrl || isInvalidKey) {
  console.warn(
    '[Supabase Configuration] Environment variables contain placeholder or empty values. Falling back to default working Supabase project configuration.'
  );
}

const supabaseUrl = isInvalidUrl ? defaultUrl : envUrl;
const supabaseKey = isInvalidKey ? defaultKey : envKey;

export const supabase = createClient(supabaseUrl, supabaseKey);