import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env.local' });

// Supabase direct connection - extract from URL
// Format: https://PROJECT_REF.supabase.co
const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim().replace('https://', '').replace('.supabase.co', '');

const pool = new Pool({
  host: `db.${projectRef}.supabase.co`,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.SUPABASE_DB_PASSWORD || process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  console.log('Connecting to Postgres...');
  console.log('Project ref:', projectRef);
  
  const client = await pool.connect();
  
  try {
    // Create malls table
    console.log('Creating malls table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS malls (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        google_place_id TEXT UNIQUE,
        google_rating DECIMAL(2,1),
        google_reviews_count INTEGER DEFAULT 0,
        mall_type TEXT DEFAULT 'shopping-mall',
        neighborhood TEXT NOT NULL,
        address TEXT,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        phone TEXT,
        website TEXT,
        google_maps_url TEXT,
        opening_hours JSONB DEFAULT '[]'::jsonb,
        photos JSONB DEFAULT '[]'::jsonb,
        cover_photo_url TEXT,
        floors INTEGER,
        total_stores INTEGER,
        anchor_stores TEXT[] DEFAULT '{}',
        parking_info TEXT,
        description TEXT,
        highlights TEXT[] DEFAULT '{}',
        meta_title TEXT,
        meta_description TEXT,
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        last_google_sync TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ Malls table created');
    
    // Create mall_stores table
    console.log('Creating mall_stores table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS mall_stores (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        mall_id UUID REFERENCES malls(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        slug TEXT NOT NULL,
        google_place_id TEXT,
        google_rating DECIMAL(2,1),
        category TEXT NOT NULL,
        floor TEXT,
        unit_number TEXT,
        phone TEXT,
        website TEXT,
        is_anchor_store BOOLEAN DEFAULT false,
        brand_logo_url TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(mall_id, slug)
      );
    `);
    console.log('✅ Mall stores table created');
    
    // Create indexes
    console.log('Creating indexes...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_malls_neighborhood ON malls(neighborhood);
      CREATE INDEX IF NOT EXISTS idx_malls_slug ON malls(slug);
      CREATE INDEX IF NOT EXISTS idx_mall_stores_mall ON mall_stores(mall_id);
      CREATE INDEX IF NOT EXISTS idx_mall_stores_category ON mall_stores(category);
    `);
    console.log('✅ Indexes created');
    
    // Enable RLS
    console.log('Enabling RLS...');
    await client.query(`ALTER TABLE malls ENABLE ROW LEVEL SECURITY;`);
    await client.query(`ALTER TABLE mall_stores ENABLE ROW LEVEL SECURITY;`);
    
    // Create policies
    await client.query(`
      DROP POLICY IF EXISTS "Public malls viewable" ON malls;
      CREATE POLICY "Public malls viewable" ON malls FOR SELECT USING (is_active = true);
    `);
    await client.query(`
      DROP POLICY IF EXISTS "Service role malls" ON malls;
      CREATE POLICY "Service role malls" ON malls FOR ALL USING (true) WITH CHECK (true);
    `);
    await client.query(`
      DROP POLICY IF EXISTS "Public stores viewable" ON mall_stores;
      CREATE POLICY "Public stores viewable" ON mall_stores FOR SELECT USING (is_active = true);
    `);
    await client.query(`
      DROP POLICY IF EXISTS "Service role stores" ON mall_stores;
      CREATE POLICY "Service role stores" ON mall_stores FOR ALL USING (true) WITH CHECK (true);
    `);
    console.log('✅ RLS policies created');
    
    // Grant permissions
    await client.query(`
      GRANT SELECT ON malls TO anon, authenticated;
      GRANT SELECT ON mall_stores TO anon, authenticated;
      GRANT ALL ON malls TO service_role;
      GRANT ALL ON mall_stores TO service_role;
    `);
    console.log('✅ Permissions granted');
    
    console.log('\n🎉 All tables created successfully!');
    
  } catch (err: any) {
    console.error('Error:', err.message);
    if (err.message.includes('password')) {
      console.log('\n💡 Need database password. Check Supabase dashboard > Settings > Database');
    }
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
