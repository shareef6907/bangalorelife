import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://imvanyylhitwmuegepkr.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFueXlsaGl0d211ZWdlcGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY2MzIxMSwiZXhwIjoyMDg3MjM5MjExfQ.FPW0JSgwlDkwquy5z6gEqof_1RAdoL-0mH8DMl-hVnU';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkTable() {
  console.log('Checking if hotels table exists...');
  
  const { data, error } = await supabase
    .from('hotels')
    .select('id')
    .limit(1);
  
  if (!error) {
    console.log('✅ Hotels table already exists!');
    const { count } = await supabase.from('hotels').select('*', { count: 'exact', head: true });
    console.log(`   Current row count: ${count}`);
    return true;
  }
  
  console.log('❌ Hotels table does not exist. Error:', error.message);
  return false;
}

checkTable();
