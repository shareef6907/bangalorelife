import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

async function verify() {
  const { data, error } = await supabase.from('malls').select('*').limit(1);
  
  if (error) {
    console.log('❌ Malls table does not exist:', error.message);
    console.log('\n📋 Creating table via alternative method...');
    return false;
  }
  
  console.log('✅ Malls table exists!');
  console.log('Current rows:', data?.length || 0);
  return true;
}

verify();
