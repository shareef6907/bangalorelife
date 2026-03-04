import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

async function verify() {
  // Get all malls
  const { data: malls, count: mallCount } = await supabase
    .from('malls')
    .select('name, slug, neighborhood, google_rating, google_reviews_count', { count: 'exact' })
    .order('google_reviews_count', { ascending: false });
  
  console.log(`\n🏬 MALLS (${mallCount} total):\n`);
  malls?.forEach(m => {
    console.log(`  - ${m.name} (${m.neighborhood}) - ★${m.google_rating || 'N/A'} | ${m.google_reviews_count?.toLocaleString() || 0} reviews`);
  });
  
  // Get store counts by category
  const { data: stores } = await supabase
    .from('mall_stores')
    .select('category');
  
  const categoryCounts: Record<string, number> = {};
  stores?.forEach(s => {
    categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1;
  });
  
  console.log(`\n🏪 STORES BY CATEGORY:\n`);
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  - ${cat}: ${count}`);
    });
  
  console.log(`\n📊 Total stores: ${stores?.length || 0}`);
}

verify();
