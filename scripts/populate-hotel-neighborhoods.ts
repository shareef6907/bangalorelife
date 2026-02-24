/**
 * Populate hotel neighborhoods based on lat/lng coordinates
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local from project root
config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'set' : 'missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'set' : 'missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Neighborhood coordinates (same as in gemini.ts)
const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
  'koramangala': { lat: 12.9352, lng: 77.6245 },
  'indiranagar': { lat: 12.9784, lng: 77.6408 },
  'mg-road': { lat: 12.9756, lng: 77.6065 },
  'whitefield': { lat: 12.9698, lng: 77.7500 },
  'hsr-layout': { lat: 12.9116, lng: 77.6389 },
  'jayanagar': { lat: 12.9308, lng: 77.5838 },
  'jp-nagar': { lat: 12.8900, lng: 77.5850 },
  'malleshwaram': { lat: 13.0035, lng: 77.5686 },
  'rajajinagar': { lat: 12.9914, lng: 77.5521 },
  'sadashivanagar': { lat: 13.0067, lng: 77.5756 },
  'yeshwanthpur': { lat: 13.0294, lng: 77.5389 },
  'mathikere': { lat: 13.0258, lng: 77.5686 },
  'yelahanka': { lat: 13.1005, lng: 77.5940 },
  'hebbal': { lat: 13.0358, lng: 77.5970 },
  'hennur': { lat: 13.0450, lng: 77.6380 },
  'marathahalli': { lat: 12.9591, lng: 77.7011 },
  'sarjapur': { lat: 12.8600, lng: 77.7870 },
  'electronic-city': { lat: 12.8399, lng: 77.6770 },
  'btm-layout': { lat: 12.9166, lng: 77.6101 },
  'banashankari': { lat: 12.9255, lng: 77.5468 },
  'basavanagudi': { lat: 12.9416, lng: 77.5740 },
  'bangalore-central': { lat: 12.9716, lng: 77.5946 },
  'ulsoor': { lat: 12.9825, lng: 77.6216 },
  'richmond-town': { lat: 12.9656, lng: 77.5997 },
  'frazer-town': { lat: 12.9982, lng: 77.6166 },
  'cunningham-road': { lat: 12.9863, lng: 77.5868 },
  'church-street': { lat: 12.9746, lng: 77.6070 },
  'lavelle-road': { lat: 12.9680, lng: 77.5960 },
  'bellandur': { lat: 12.9256, lng: 77.6780 },
  'kempegowda-airport': { lat: 13.1989, lng: 77.7069 },
  'devanahalli': { lat: 13.2473, lng: 77.7120 },
  'jp-nagar': { lat: 12.9063, lng: 77.5857 },
  'bannerghatta': { lat: 12.8002, lng: 77.5773 },
  'majestic': { lat: 12.9773, lng: 77.5713 },
  'shivajinagar': { lat: 12.9857, lng: 77.6041 },
  'kr-puram': { lat: 13.0128, lng: 77.6932 },
  'old-airport-road': { lat: 12.9584, lng: 77.6474 },
  'domlur': { lat: 12.9592, lng: 77.6387 },
  'ejipura': { lat: 12.9383, lng: 77.6195 },
  'wilson-garden': { lat: 12.9400, lng: 77.6000 },
};

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function findNearestNeighborhood(lat: number, lng: number): { name: string; distance: number } {
  let nearest = { name: 'bangalore-central', distance: Infinity };
  
  for (const [name, coords] of Object.entries(NEIGHBORHOOD_COORDS)) {
    const dist = haversineDistance(lat, lng, coords.lat, coords.lng);
    if (dist < nearest.distance) {
      nearest = { name, distance: dist };
    }
  }
  
  return nearest;
}

async function populateNeighborhoods() {
  console.log('Fetching hotels without neighborhood...');
  
  // Get all hotels with coordinates but no neighborhood
  const { data: hotels, error } = await supabase
    .from('hotels')
    .select('id, name, latitude, longitude')
    .eq('is_active', true)
    .not('latitude', 'is', null)
    .is('neighborhood', null);
  
  if (error) {
    console.error('Error fetching hotels:', error);
    return;
  }
  
  console.log(`Found ${hotels?.length || 0} hotels to update`);
  
  if (!hotels || hotels.length === 0) {
    console.log('No hotels need updating');
    return;
  }
  
  // Group updates by neighborhood for batch processing
  const updates: { id: string; neighborhood: string }[] = [];
  const stats: Record<string, number> = {};
  
  for (const hotel of hotels) {
    const nearest = findNearestNeighborhood(hotel.latitude!, hotel.longitude!);
    updates.push({ id: hotel.id, neighborhood: nearest.name });
    stats[nearest.name] = (stats[nearest.name] || 0) + 1;
  }
  
  console.log('\nNeighborhood distribution:');
  const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  sorted.slice(0, 15).forEach(([name, count]) => {
    console.log(`  ${name}: ${count}`);
  });
  
  // Update in batches of 50
  console.log('\nUpdating hotels...');
  const batchSize = 50;
  let updated = 0;
  
  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    
    for (const { id, neighborhood } of batch) {
      const { error: updateError } = await supabase
        .from('hotels')
        .update({ neighborhood })
        .eq('id', id);
      
      if (updateError) {
        console.error(`Error updating ${id}:`, updateError.message);
      } else {
        updated++;
      }
    }
    
    console.log(`  Updated ${Math.min(i + batchSize, updates.length)}/${updates.length}`);
  }
  
  console.log(`\nDone! Updated ${updated} hotels.`);
}

populateNeighborhoods();
