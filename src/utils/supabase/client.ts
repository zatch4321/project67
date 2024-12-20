import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

// Validate URL format
const supabaseUrl = config.supabase.url;
try {
  new URL(supabaseUrl);
} catch (e) {
  throw new Error('Invalid Supabase URL format. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, config.supabase.anonKey);