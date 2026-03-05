import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

async function breakdown() {
  // Get all types by fetching in batches
  let offset = 0;
  const batchSize = 1000;
  const typeCounts: Record<string, number> = {};
  const neighborhoodCounts: Record<string, number> = {};
  let total = 0;
  
  while (true) {
    const { data, error } = await supabase
      .from('venues')
      .select('type, neighborhood')
      .range(offset, offset + batchSize - 1);
    
    if (error || !data || data.length === 0) break;
    
    data.forEach(v => {
      typeCounts[v.type] = (typeCounts[v.type] || 0) + 1;
      neighborhoodCounts[v.neighborhood] = (neighborhoodCounts[v.neighborhood] || 0) + 1;
    });
    
    total += data.length;
    offset += batchSize;
    
    if (data.length < batchSize) break;
  }
  
  console.log(`\n📊 VENUE TYPE BREAKDOWN (${total} total):\n`);
  Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
  
  console.log(`\n📍 TOP NEIGHBORHOODS:\n`);
  Object.entries(neighborhoodCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([n, count]) => {
      console.log(`  ${n}: ${count}`);
    });
}

breakdown();
