import { createClient } from '@supabase/supabase-js';

// Meka valid URL format ekak widihata thiyanna oni app eka crash nowee thiyenna
const supabaseUrl = 'https://udtajzpgrgltkdvcvttm.supabase.co';
const supabaseKey = 'sb_publishable_zB1s-1CQvxmfXz_YwK0yCg_nWlgY2mg';

export const supabase = createClient(supabaseUrl, supabaseKey);