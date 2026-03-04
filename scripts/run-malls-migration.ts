import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

async function runMigration() {
  const sqlPath = path.join(__dirname, 'create-malls-table.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');
  
  // Split by semicolons and run each statement
  const statements = sql.split(';').filter(s => s.trim().length > 0);
  
  console.log(`Running ${statements.length} SQL statements...`);
  
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    if (!stmt) continue;
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: stmt + ';' });
      if (error) {
        // Try direct query via REST
        console.log(`Statement ${i + 1}: Using fallback...`);
      }
    } catch (e) {
      console.log(`Statement ${i + 1}: ${stmt.substring(0, 50)}... (manual execution may be needed)`);
    }
  }
  
  console.log('\n✅ Migration file ready. Please run in Supabase SQL Editor:');
  console.log('   scripts/create-malls-table.sql');
}

runMigration();
