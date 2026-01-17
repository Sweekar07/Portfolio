
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

let supabase;

if (!globalThis._supabase) {
  globalThis._supabase = createClient(supabaseUrl, supabaseKey);
}

supabase = globalThis._supabase;

export default supabase
