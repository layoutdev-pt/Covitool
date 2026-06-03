// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cmhyvqaqpiuycjhohjto.supabase.co';
const supabaseKey = 'sb_publishable_0mkA2w67oCR2wdvgHuFvGw_b9nZ4xB2';

export const supabase = createClient(supabaseUrl, supabaseKey);