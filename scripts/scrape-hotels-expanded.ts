#!/usr/bin/env npx ts-node
/**
 * Expanded Hotel Scraper - More areas + Pagination
 * Covers outer Bangalore suburbs and paginates results
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyCtjSJgCurVfeCpvN0EGRD1pfIWSmpe9XE';

// Extended search grid - outer Bangalore + missed areas
const SEARCH_GRID = [
  // Airport & North
  { name: 'Kempegowda Airport', lat: 13.1986, lng: 77.7066 },
  { name: 'Yelahanka New Town', lat: 13.1147, lng: 77.5967 },
  { name: 'Jakkur', lat: 13.0707, lng: 77.6097 },
  { name: 'Sahakara Nagar', lat: 13.0597, lng: 77.5947 },
  { name: 'RT Nagar', lat: 13.0217, lng: 77.5967 },
  { name: 'HBR Layout', lat: 13.0357, lng: 77.6347 },
  { name: 'Kalyan Nagar', lat: 13.0257, lng: 77.6397 },
  { name: 'Banaswadi', lat: 13.0107, lng: 77.6497 },
  { name: 'Ramamurthy Nagar', lat: 13.0157, lng: 77.6697 },
  { name: 'KR Puram', lat: 13.0007, lng: 77.6897 },
  
  // East extended
  { name: 'Varthur', lat: 12.9417, lng: 77.7397 },
  { name: 'Kadugodi', lat: 12.9867, lng: 77.7597 },
  { name: 'Hoodi', lat: 12.9917, lng: 77.7147 },
  { name: 'Brookefield', lat: 12.9767, lng: 77.7247 },
  { name: 'ITPL', lat: 12.9857, lng: 77.7297 },
  { name: 'Kundalahalli', lat: 12.9617, lng: 77.7147 },
  { name: 'Mahadevapura', lat: 12.9917, lng: 77.6847 },
  { name: 'Old Madras Road', lat: 12.9967, lng: 77.6597 },
  
  // South extended
  { name: 'Bommanahalli', lat: 12.9017, lng: 77.6197 },
  { name: 'Begur', lat: 12.8717, lng: 77.6297 },
  { name: 'Hulimavu', lat: 12.8817, lng: 77.5997 },
  { name: 'Arekere', lat: 12.8917, lng: 77.6097 },
  { name: 'Gottigere', lat: 12.8617, lng: 77.5797 },
  { name: 'Kanakapura Road', lat: 12.8717, lng: 77.5597 },
  { name: 'Uttarahalli', lat: 12.9017, lng: 77.5397 },
  { name: 'Padmanabhanagar', lat: 12.9117, lng: 77.5497 },
  { name: 'Kumaraswamy Layout', lat: 12.9017, lng: 77.5597 },
  
  // West extended
  { name: 'Nagarbhavi', lat: 12.9617, lng: 77.5197 },
  { name: 'Vijayanagar', lat: 12.9717, lng: 77.5347 },
  { name: 'RR Nagar', lat: 12.9267, lng: 77.5097 },
  { name: 'Kengeri', lat: 12.9067, lng: 77.4897 },
  { name: 'Mysore Road', lat: 12.9467, lng: 77.5097 },
  
  // Central missed
  { name: 'Shantinagar', lat: 12.9517, lng: 77.5997 },
  { name: 'Austin Town', lat: 12.9617, lng: 77.6097 },
  { name: 'Cox Town', lat: 12.9917, lng: 77.6197 },
  { name: 'Fraser Town', lat: 12.9967, lng: 77.6097 },
  { name: 'Cleveland Town', lat: 12.9817, lng: 77.6047 },
  { name: 'Langford Town', lat: 12.9517, lng: 77.5897 },
  { name: 'Richmond Road', lat: 12.9617, lng: 77.5997 },
  { name: 'Residency Road', lat: 12.9717, lng: 77.6047 },
];

// Multiple search queries per area
const SEARCH_QUERIES = [
  'hotels',
  'lodge',
  'resort',
  'guest house',
  'service apartment',
  'boutique hotel',
];

interface GooglePlace {
  id: string;
  displayName: { text: string };
  formattedAddress?: string;
  location?: { latitude: number; longitude: number };
  rating?: number;
  userRatingCount?: number;
  types?: string[];
  nationalPhoneNumber?: string;
  websiteUri?: string;
  photos?: Array<{ name: string }>;
}

async function searchText(query: string, lat: number, lng: number): Promise<GooglePlace[]> {
  const body = {
    textQuery: `${query} in Bangalore near ${lat},${lng}`,
    locationBias: {
      circle: {
        center: { latitude: lat, longitude: lng },
        radius: 3000
      }
    },
    maxResultCount: 20,
    languageCode: 'en'
  };
  
  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.nationalPhoneNumber,places.websiteUri,places.photos'
      },
      body: JSON.stringify(body)
    });
    
    const data = await res.json();
    return data.places || [];
  } catch (err) {
    return [];
  }
}

function generateSlug(name: string, placeId: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
  const suffix = placeId.replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  return `${base}-${suffix}`;
}

function determineHotelType(types: string[], name: string): string {
  const lowerName = name.toLowerCase();
  if (types.includes('hostel') || lowerName.includes('hostel') || lowerName.includes('pg')) return 'hostel';
  if (types.includes('guest_house') || lowerName.includes('guest house')) return 'guesthouse';
  if (lowerName.includes('apartment') || lowerName.includes('service')) return 'apartment';
  if (lowerName.includes('resort')) return 'resort';
  if (lowerName.includes('lodge')) return 'hotel';
  return 'hotel';
}

function extractNeighborhood(address: string): string {
  const neighborhoods: Record<string, string> = {
    'koramangala': 'koramangala', 'indiranagar': 'indiranagar', 'whitefield': 'whitefield',
    'marathahalli': 'marathahalli', 'hsr': 'hsr-layout', 'btm': 'btm-layout',
    'electronic city': 'electronic-city', 'jayanagar': 'jayanagar', 'jp nagar': 'jp-nagar',
    'malleshwaram': 'malleshwaram', 'rajajinagar': 'rajajinagar', 'hebbal': 'hebbal',
    'yelahanka': 'yelahanka', 'majestic': 'majestic', 'mg road': 'mg-road',
    'brigade road': 'mg-road', 'church street': 'church-street', 'richmond': 'richmond-town',
    'banashankari': 'banashankari', 'bellandur': 'bellandur', 'sarjapur': 'sarjapur-road',
    'cunningham': 'cunningham-road', 'hennur': 'hennur', 'yeshwanthpur': 'yeshwanthpur',
    'devanahalli': 'devanahalli', 'airport': 'devanahalli', 'kempegowda': 'devanahalli',
    'nagarbhavi': 'nagarbhavi', 'vijayanagar': 'vijayanagar', 'rr nagar': 'rr-nagar',
    'bommanahalli': 'bommanahalli', 'varthur': 'varthur', 'brookefield': 'brookefield',
    'itpl': 'itpl', 'kr puram': 'kr-puram', 'banaswadi': 'banaswadi',
  };
  
  const lower = address.toLowerCase();
  for (const [key, value] of Object.entries(neighborhoods)) {
    if (lower.includes(key)) return value;
  }
  return 'bangalore';
}

async function main() {
  console.log('🏨 Expanded Hotel Scraper - More Areas + Multiple Queries\n');
  
  const { data: existing } = await supabase.from('hotels').select('google_place_id');
  const existingIds = new Set(existing?.map(h => h.google_place_id) || []);
  console.log(`📊 Existing hotels: ${existingIds.size}\n`);
  
  let totalNew = 0;
  let totalInserted = 0;
  const allPlaces = new Map<string, GooglePlace>();
  
  for (const area of SEARCH_GRID) {
    process.stdout.write(`📍 ${area.name}...`);
    let areaCount = 0;
    
    for (const query of SEARCH_QUERIES) {
      const places = await searchText(query, area.lat, area.lng);
      places.forEach(p => {
        if (!existingIds.has(p.id) && !allPlaces.has(p.id)) {
          allPlaces.set(p.id, p);
          areaCount++;
        }
      });
      await new Promise(r => setTimeout(r, 100));
    }
    
    console.log(` ${areaCount} new`);
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`\n📥 Inserting ${allPlaces.size} new hotels...`);
  
  for (const [id, place] of allPlaces) {
    const hotel = {
      name: place.displayName.text,
      slug: generateSlug(place.displayName.text, id),
      address: place.formattedAddress || '',
      latitude: place.location?.latitude,
      longitude: place.location?.longitude,
      google_place_id: id,
      google_rating: place.rating,
      google_review_count: place.userRatingCount,
      hotel_type: determineHotelType(place.types || [], place.displayName.text),
      neighborhood: extractNeighborhood(place.formattedAddress || ''),
      phone: place.nationalPhoneNumber,
      website: place.websiteUri,
      featured_photo: place.photos?.[0]?.name 
        ? `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxWidthPx=800&key=${API_KEY}`
        : null,
      source: 'google_places',
      source_id: id,
      is_active: true,
    };
    
    try {
      const { error } = await supabase.from('hotels').insert(hotel);
      if (!error) {
        totalInserted++;
        if (totalInserted % 50 === 0) console.log(`   ✅ ${totalInserted} inserted...`);
      }
    } catch (err) {}
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Done! Inserted ${totalInserted} new hotels`);
  
  const { count } = await supabase.from('hotels').select('*', { count: 'exact', head: true });
  console.log(`📊 Total hotels now: ${count}`);
}

main().catch(console.error);
