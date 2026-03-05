import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

async function check() {
  // Total count
  const { count: venueCount } = await supabase.from('venues').select('*', { count: 'exact', head: true });
  console.log('Venues table count:', venueCount);
  
  // Check if there's another table
  const { count: hotelCount } = await supabase.from('hotels').select('*', { count: 'exact', head: true });
  console.log('Hotels table count:', hotelCount);
  
  const { count: eventCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
  console.log('Events table count:', eventCount);
  
  const { count: mallCount } = await supabase.from('malls').select('*', { count: 'exact', head: true });
  console.log('Malls table count:', mallCount);
  
  // Check venue types with full count
  const { data: allTypes } = await supabase.rpc('get_distinct_types');
  console.log('\nAll venue types:', allTypes);
  
  // Sample of types
  const { data: types } = await supabase
    .from('venues')
    .select('type')
    .limit(5000);
  
  const counts: Record<string, number> = {};
  types?.forEach(t => counts[t.type] = (counts[t.type] || 0) + 1);
  console.log('\nType counts (sample):', counts);
}

check();
