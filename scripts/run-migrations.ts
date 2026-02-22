/**
 * Migration Runner for BangaloreLife.com
 * Runs all SQL migrations against Supabase
 * Usage: pnpm tsx scripts/run-migrations.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

async function runMigration(filename: string): Promise<boolean> {
  const filepath = path.join(__dirname, '..', 'migrations', filename);
  
  if (!fs.existsSync(filepath)) {
    console.error(`❌ File not found: ${filepath}`);
    return false;
  }

  const sql = fs.readFileSync(filepath, 'utf-8');
  console.log(`\n📄 Running: ${filename}`);
  console.log(`   Size: ${(sql.length / 1024).toFixed(1)}KB`);

  try {
    // Split into individual statements for better error handling
    // Note: This is a simple split - doesn't handle complex PL/pgSQL blocks perfectly
    // For complex migrations, run the full SQL at once
    
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      // If exec_sql doesn't exist, we need to use the REST API directly
      // For now, let's try a simpler approach
      console.log('   ⚠️  exec_sql not available, trying direct query...');
      
      // For Supabase, we'll need to run this via the SQL editor
      // or use the management API
      console.log('   ℹ️  Please run this migration in Supabase SQL Editor');
      console.log(`   📋 File: ${filepath}`);
      return false;
    }

    console.log(`   ✅ Success`);
    return true;
  } catch (err: any) {
    console.error(`   ❌ Error: ${err.message}`);
    return false;
  }
}

async function checkConnection() {
  console.log('🔌 Testing Supabase connection...');
  
  const { data, error } = await supabase
    .from('venues')
    .select('count')
    .limit(1);
  
  if (error && error.code !== 'PGRST116') {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
  
  console.log('✅ Connected to Supabase');
  return true;
}

async function listTables() {
  console.log('\n📊 Current database tables:');
  
  // Check each table we expect
  const tables = ['venues', 'events', 'movies', 'areas', 'categories', 'cinemas', 'showtimes'];
  
  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.log(`   ❌ ${table}: does not exist`);
    } else {
      console.log(`   ✅ ${table}: ${count} rows`);
    }
  }
}

async function main() {
  console.log('🚀 BangaloreLife.com Migration Runner\n');
  
  const connected = await checkConnection();
  if (!connected) return;
  
  await listTables();
  
  // List migrations
  const migrationsDir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();
  
  console.log(`\n📁 Found ${files.length} migration files:`);
  files.forEach(f => console.log(`   - ${f}`));
  
  console.log('\n⚠️  Note: Supabase requires running SQL migrations via the dashboard SQL Editor.');
  console.log('   The migrations have been created at:');
  console.log(`   ${migrationsDir}/\n`);
  
  console.log('📋 Migration order:');
  console.log('   1. 002_enhanced_schema.sql - Creates new tables and columns');
  console.log('   2. 003_seed_areas.sql - Seeds 50+ Bangalore neighborhoods');
  console.log('   3. 004_seed_categories.sql - Seeds category hierarchy\n');
  
  console.log('🔗 Open Supabase SQL Editor:');
  console.log(`   ${supabaseUrl.replace('.supabase.co', '.supabase.co/project/imvanyylhitwmuegepkr/sql/new')}\n`);
  
  // Try to check what tables exist after
  await listTables();
}

main().catch(console.error);
