import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY!.trim();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

// Target malls in Bangalore
const TARGET_MALLS = [
  "Phoenix Marketcity Bangalore",
  "UB City Mall Bangalore",
  "Orion Mall Bangalore",
  "VR Bengaluru Mall",
  "Mantri Square Mall Bangalore",
  "Garuda Mall Bangalore", 
  "Forum Mall Koramangala",
  "Forum Shantiniketan Bangalore",
  "Nexus Shantiniketan Bangalore",
  "Elements Mall Bangalore",
  "Gopalan Arcade Mall Bangalore",
  "Central Mall Bangalore",
  "Inorbit Mall Whitefield",
  "The Collection UB City Bangalore",
  "Lulu Mall Bengaluru",
  "Bengaluru Central Mall",
  "GT World Mall Bangalore",
  "Royal Meenakshi Mall Bangalore",
  "Esteem Mall Bangalore",
  "Vega City Mall Bangalore",
  "Total Mall Bangalore",
  "Soul Space Spirit Mall Bangalore",
  "Ascendas Park Square Mall",
  "ETA Mall Bangalore"
];

// Neighborhood mapping based on location
function getNeighborhood(lat: number, lng: number, address: string): string {
  const addressLower = address.toLowerCase();
  
  if (addressLower.includes('whitefield')) return 'whitefield';
  if (addressLower.includes('koramangala')) return 'koramangala';
  if (addressLower.includes('indiranagar')) return 'indiranagar';
  if (addressLower.includes('malleshwaram') || addressLower.includes('rajajinagar')) return 'malleshwaram';
  if (addressLower.includes('jayanagar')) return 'jayanagar';
  if (addressLower.includes('jp nagar') || addressLower.includes('j.p. nagar')) return 'jp-nagar';
  if (addressLower.includes('bannerghatta')) return 'bannerghatta-road';
  if (addressLower.includes('electronic city')) return 'electronic-city';
  if (addressLower.includes('sarjapur')) return 'sarjapur';
  if (addressLower.includes('hsr')) return 'hsr-layout';
  if (addressLower.includes('btm')) return 'btm-layout';
  if (addressLower.includes('mg road') || addressLower.includes('mahatma gandhi')) return 'mg-road';
  if (addressLower.includes('brigade road')) return 'brigade-road';
  if (addressLower.includes('lavelle')) return 'lavelle-road';
  if (addressLower.includes('yelahanka')) return 'yelahanka';
  if (addressLower.includes('hebbal')) return 'hebbal';
  if (addressLower.includes('marathahalli')) return 'marathahalli';
  if (addressLower.includes('yeshwanthpur')) return 'yeshwanthpur';
  
  // Default based on coordinates
  if (lat > 12.98) return 'north-bangalore';
  if (lat < 12.90) return 'south-bangalore';
  if (lng > 77.65) return 'east-bangalore';
  if (lng < 77.55) return 'west-bangalore';
  
  return 'bangalore-central';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function searchPlace(query: string): Promise<any> {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status !== 'OK' || !data.results?.[0]) {
    console.log(`  ⚠️ No results for: ${query}`);
    return null;
  }
  
  return data.results[0];
}

async function getPlaceDetails(placeId: string): Promise<any> {
  const fields = 'name,formatted_address,formatted_phone_number,website,geometry,rating,user_ratings_total,opening_hours,photos,types,url';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status !== 'OK') {
    return null;
  }
  
  return data.result;
}

async function searchStoresInMall(mallName: string, lat: number, lng: number): Promise<any[]> {
  const stores: any[] = [];
  const storeTypes = [
    `${mallName} stores`,
    `${mallName} restaurants`,
    `${mallName} food court`,
    `${mallName} cinema`,
    `${mallName} entertainment`
  ];
  
  // Also do a nearby search around the mall
  const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=150&key=${GOOGLE_API_KEY}`;
  
  try {
    const nearbyRes = await fetch(nearbyUrl);
    const nearbyData = await nearbyRes.json();
    
    if (nearbyData.results) {
      stores.push(...nearbyData.results.slice(0, 50));
    }
  } catch (e) {
    console.log(`  ⚠️ Nearby search failed for ${mallName}`);
  }
  
  return stores;
}

function categorizeStore(types: string[], name: string): string {
  const nameLower = name.toLowerCase();
  
  // Fashion brands
  if (types.includes('clothing_store') || types.includes('shoe_store') || 
      nameLower.includes('zara') || nameLower.includes('h&m') || nameLower.includes('forever') ||
      nameLower.includes('levis') || nameLower.includes('nike') || nameLower.includes('adidas') ||
      nameLower.includes('puma') || nameLower.includes('pantaloons') || nameLower.includes('westside') ||
      nameLower.includes('max fashion') || nameLower.includes('lifestyle')) {
    return 'fashion';
  }
  
  // Electronics
  if (types.includes('electronics_store') || 
      nameLower.includes('croma') || nameLower.includes('reliance digital') ||
      nameLower.includes('apple') || nameLower.includes('samsung') || nameLower.includes('oneplus') ||
      nameLower.includes('vijay sales')) {
    return 'electronics';
  }
  
  // Food & Dining
  if (types.includes('restaurant') || types.includes('cafe') || types.includes('food') ||
      types.includes('bakery') || types.includes('meal_takeaway')) {
    return 'food-dining';
  }
  
  // Entertainment
  if (types.includes('movie_theater') || types.includes('amusement_center') ||
      nameLower.includes('pvr') || nameLower.includes('inox') || nameLower.includes('cinepolis') ||
      nameLower.includes('gaming') || nameLower.includes('timezone') || nameLower.includes('funcity')) {
    return 'entertainment';
  }
  
  // Beauty
  if (types.includes('beauty_salon') || types.includes('spa') ||
      nameLower.includes('sephora') || nameLower.includes('nykaa') || nameLower.includes('mac') ||
      nameLower.includes('body shop') || nameLower.includes('bath & body')) {
    return 'beauty';
  }
  
  // Sports
  if (types.includes('sporting_goods_store') ||
      nameLower.includes('decathlon') || nameLower.includes('sports')) {
    return 'sports';
  }
  
  // Kids
  if (nameLower.includes('kids') || nameLower.includes('hamleys') || nameLower.includes('mothercare') ||
      nameLower.includes('firstcry')) {
    return 'kids';
  }
  
  // Jewelry
  if (types.includes('jewelry_store') ||
      nameLower.includes('tanishq') || nameLower.includes('malabar') || nameLower.includes('kalyan') ||
      nameLower.includes('caratlane')) {
    return 'jewelry';
  }
  
  // Supermarket
  if (types.includes('supermarket') || types.includes('grocery_or_supermarket') ||
      nameLower.includes('spar') || nameLower.includes('foodhall') || nameLower.includes('hypercity') ||
      nameLower.includes('nature') || nameLower.includes('organic')) {
    return 'supermarket';
  }
  
  // Home & Lifestyle
  if (types.includes('home_goods_store') || types.includes('furniture_store') ||
      nameLower.includes('home centre') || nameLower.includes('ikea') || nameLower.includes('@home') ||
      nameLower.includes('hometown')) {
    return 'home-lifestyle';
  }
  
  return 'other';
}

async function scrapeMalls() {
  console.log('🏬 Starting Bangalore Mall Scraper\n');
  console.log(`Target: ${TARGET_MALLS.length} malls\n`);
  
  let mallsAdded = 0;
  let storesAdded = 0;
  let apiCalls = 0;
  
  for (const mallQuery of TARGET_MALLS) {
    console.log(`\n📍 Searching: ${mallQuery}`);
    
    // Search for the mall
    const searchResult = await searchPlace(mallQuery);
    apiCalls++;
    
    if (!searchResult) {
      continue;
    }
    
    // Get detailed info
    const details = await getPlaceDetails(searchResult.place_id);
    apiCalls++;
    
    if (!details) {
      console.log(`  ⚠️ Could not get details`);
      continue;
    }
    
    const lat = details.geometry?.location?.lat || searchResult.geometry?.location?.lat;
    const lng = details.geometry?.location?.lng || searchResult.geometry?.location?.lng;
    const address = details.formatted_address || '';
    
    // Process photos
    const photos = details.photos?.slice(0, 5).map((p: any) => ({
      reference: p.photo_reference,
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${GOOGLE_API_KEY}`
    })) || [];
    
    const mallData = {
      name: details.name,
      slug: slugify(details.name),
      google_place_id: searchResult.place_id,
      google_rating: details.rating || null,
      google_reviews_count: details.user_ratings_total || 0,
      mall_type: 'shopping-mall',
      neighborhood: getNeighborhood(lat, lng, address),
      address: address,
      latitude: lat,
      longitude: lng,
      phone: details.formatted_phone_number || null,
      website: details.website || null,
      google_maps_url: details.url || null,
      opening_hours: details.opening_hours?.weekday_text || [],
      photos: photos,
      cover_photo_url: photos[0]?.url || null,
      is_featured: true,
      is_active: true,
      last_google_sync: new Date().toISOString()
    };
    
    // Upsert mall
    const { data: mall, error: mallError } = await supabase
      .from('malls')
      .upsert(mallData, { onConflict: 'google_place_id' })
      .select()
      .single();
    
    if (mallError) {
      console.log(`  ❌ Error inserting mall: ${mallError.message}`);
      continue;
    }
    
    mallsAdded++;
    console.log(`  ✅ Added: ${details.name} (${mallData.neighborhood})`);
    console.log(`     Rating: ${details.rating || 'N/A'} | Reviews: ${details.user_ratings_total || 0}`);
    
    // Search for stores inside the mall
    console.log(`  🔍 Searching for stores...`);
    const storeResults = await searchStoresInMall(details.name, lat, lng);
    apiCalls++;
    
    // Filter and insert stores
    for (const store of storeResults) {
      // Skip the mall itself
      if (store.place_id === searchResult.place_id) continue;
      
      // Only include actual stores/restaurants
      const storeTypes = store.types || [];
      const isValidStore = storeTypes.some((t: string) => 
        ['store', 'restaurant', 'cafe', 'food', 'shopping', 'movie_theater', 'spa', 'beauty_salon', 'gym'].some(k => t.includes(k))
      );
      
      if (!isValidStore) continue;
      
      const storeData = {
        mall_id: mall.id,
        name: store.name,
        slug: slugify(store.name),
        google_place_id: store.place_id,
        google_rating: store.rating || null,
        category: categorizeStore(storeTypes, store.name),
        is_anchor_store: store.user_ratings_total > 500,
        is_active: true
      };
      
      const { error: storeError } = await supabase
        .from('mall_stores')
        .upsert(storeData, { onConflict: 'mall_id,slug', ignoreDuplicates: true });
      
      if (!storeError) {
        storesAdded++;
      }
    }
    
    console.log(`     Added ${storeResults.length} nearby places`);
    
    // Rate limiting - be nice to the API
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 SCRAPING COMPLETE');
  console.log('='.repeat(50));
  console.log(`✅ Malls added/updated: ${mallsAdded}`);
  console.log(`✅ Stores added: ${storesAdded}`);
  console.log(`📡 API calls: ${apiCalls}`);
}

scrapeMalls().catch(console.error);
