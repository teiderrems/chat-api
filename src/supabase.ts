import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_PROJET_URL!,
  process.env.SUPABASE_PROJET_SECRET_KEY!,
);
export default supabase;
