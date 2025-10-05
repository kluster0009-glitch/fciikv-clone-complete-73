import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://drgrujwjowotwnhqplmg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_SF9qI9jEzrFM80QSB3DHkQ_KwOXnI8q";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});