/**
 * Direct PostgreSQL Migration Runner
 * Runs SQL migrations against Supabase via direct connection
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Supabase PostgreSQL connection (session pooler)
const connectionString = 'postgresql://postgres.imvanyylhitwmuegepkr:LflbEPxV86OqhILa@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

async function runMigration(filename) {
  const filepath = path.join(__dirname, '..', 'migrations', filename);
  const sql = fs.readFileSync(filepath, 'utf-8');
  
  console.log(`\n📄 Running: ${filename}`);
  console.log(`   Size: ${(sql.length / 1024).toFixed(1)}KB, ${sql.split('\n').length} lines`);
  
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  
  try {
    await client.connect();
    console.log('   Connected to database...');
    
    const result = await client.query(sql);
    console.log(`   ✅ Migration complete!`);
    
    if (Array.isArray(result)) {
      // Multiple statements
      const lastResult = result[result.length - 1];
      if (lastResult.rows) {
        console.log('   Result:', lastResult.rows);
      }
    } else if (result.rows) {
      console.log('   Result:', result.rows);
    }
    
    return true;
  } catch (err) {
    console.error(`   ❌ Error: ${err.message}`);
    if (err.position) {
      const lines = sql.substring(0, parseInt(err.position)).split('\n');
      console.error(`   Near line ${lines.length}: ${lines[lines.length-1].substring(0, 50)}...`);
    }
    return false;
  } finally {
    await client.end();
  }
}

async function checkTables() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  
  try {
    await client.connect();
    
    const { rows } = await client.query(`
      SELECT table_name, 
             (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) as columns
      FROM information_schema.tables t
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    
    console.log('\n📊 Current tables:');
    for (const row of rows) {
      // Get row count
      try {
        const countResult = await client.query(`SELECT COUNT(*) as cnt FROM "${row.table_name}"`);
        console.log(`   ${row.table_name}: ${countResult.rows[0].cnt} rows, ${row.columns} columns`);
      } catch (e) {
        console.log(`   ${row.table_name}: (error counting)`);
      }
    }
  } finally {
    await client.end();
  }
}

async function main() {
  console.log('🚀 BangaloreLife Database Migration\n');
  
  const arg = process.argv[2];
  
  if (arg === 'status') {
    await checkTables();
    return;
  }
  
  if (arg === 'all') {
    // Run all migrations in order
    const migrations = [
      '002_enhanced_schema.sql',
      '003_seed_areas.sql', 
      '004_seed_categories.sql'
    ];
    
    for (const migration of migrations) {
      const success = await runMigration(migration);
      if (!success) {
        console.log('\n⚠️  Migration failed. Fix the error and re-run.');
        break;
      }
    }
    
    await checkTables();
    return;
  }
  
  if (arg) {
    await runMigration(arg);
    await checkTables();
    return;
  }
  
  console.log('Usage:');
  console.log('  node scripts/run-sql-migration.js status     - Check current tables');
  console.log('  node scripts/run-sql-migration.js all        - Run all migrations');
  console.log('  node scripts/run-sql-migration.js <file.sql> - Run specific migration');
}

main().catch(console.error);
