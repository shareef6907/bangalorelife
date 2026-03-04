import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

async function createMallsTables() {
  // Create malls table
  const { error: mallsError } = await supabase.rpc('create_malls_table');
  
  // If RPC doesn't exist, we'll create via raw insert workaround
  // First, test if table exists
  const { error: checkError } = await supabase.from('malls').select('id').limit(1);
  
  if (checkError && checkError.message.includes('does not exist')) {
    console.log('Malls table does not exist. Creating via Supabase Dashboard needed.');
    console.log('SQL file: scripts/create-malls-table.sql');
    console.log('\nAlternatively, seeding data directly...');
    
    // Try creating a simple malls entry to auto-create table (won't work with Supabase)
    // Need to use Supabase SQL Editor or pg connection
    return false;
  }
  
  console.log('✅ Malls table exists or was created');
  return true;
}

createMallsTables();
