import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

async function checkTypes() {
  const { data } = await supabase
    .from('venues')
    .select('type, neighborhood');
  
  // Count by type
  const typeCounts: Record<string, number> = {};
  const neighborhoodCounts: Record<string, number> = {};
  
  data?.forEach(v => {
    typeCounts[v.type] = (typeCounts[v.type] || 0) + 1;
    neighborhoodCounts[v.neighborhood] = (neighborhoodCounts[v.neighborhood] || 0) + 1;
  });
  
  console.log('\n📊 VENUE TYPES:\n');
  Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
  
  console.log('\n📍 NEIGHBORHOODS:\n');
  Object.entries(neighborhoodCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([n, count]) => {
      console.log(`  ${n}: ${count}`);
    });
  
  console.log(`\n📈 Total venues: ${data?.length || 0}`);
}

checkTypes();
