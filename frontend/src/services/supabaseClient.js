import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Check if environment variables are missing or set to placeholder text
const isInvalidUrl = !envUrl || envUrl.includes('your-production-project-id') || envUrl.includes('your-project-id');
const isInvalidKey = !envKey || envKey.includes('your-production-supabase-anon-key') || envKey.includes('your-supabase-anon-key');

if (isInvalidUrl || isInvalidKey) {
  console.warn(
    '[Supabase Configuration] Missing or invalid Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined in your frontend/.env file or production host environment variables.'
  );
}

const supabaseUrl = isInvalidUrl ? 'https://placeholder-project.supabase.co' : envUrl;
const supabaseKey = isInvalidKey ? 'placeholder-supabase-anon-key' : envKey;

export const supabase = createClient(supabaseUrl, supabaseKey);