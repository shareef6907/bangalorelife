import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

async function checkTables() {
  // Check venues count
  const { count: venueCount } = await supabase.from('venues').select('*', { count: 'exact', head: true });
  console.log('Total venues:', venueCount);
  
  // Check hotels count  
  const { count: hotelCount } = await supabase.from('hotels').select('*', { count: 'exact', head: true });
  console.log('Total hotels:', hotelCount);
  
  // Check events count
  const { count: eventCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
  console.log('Total events:', eventCount);
  
  // Check for malls table
  const { error: mallsError } = await supabase.from('malls').select('count');
  console.log('Malls table exists:', !mallsError);
  if (mallsError) console.log('Malls error:', mallsError.message);
  
  // Get sample venue to understand neighborhood structure
  const { data: sampleVenues } = await supabase
    .from('venues')
    .select('type, neighborhood')
    .limit(20);
  console.log('\nSample venue types and neighborhoods:');
  console.log(sampleVenues);
  
  // Get distinct neighborhoods
  const { data: neighborhoods } = await supabase
    .from('venues')
    .select('neighborhood')
    .limit(100);
  const uniqueNeighborhoods = [...new Set(neighborhoods?.map(v => v.neighborhood))];
  console.log('\nUnique neighborhoods:', uniqueNeighborhoods);
}

checkTables();
