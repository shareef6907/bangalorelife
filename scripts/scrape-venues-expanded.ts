import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY!.trim();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

// Target categories with search queries
const VENUE_CATEGORIES = [
  // Restaurants - multiple cuisine types
  { type: 'restaurant', queries: ['best restaurants bangalore', 'north indian restaurants bangalore', 'south indian restaurants bangalore', 'fine dining bangalore', 'rooftop restaurants bangalore'] },
  { type: 'restaurant', queries: ['chinese restaurants bangalore', 'italian restaurants bangalore', 'continental restaurants bangalore', 'buffet restaurants bangalore'] },
  { type: 'restaurant', queries: ['biryani bangalore', 'thali restaurants bangalore', 'vegetarian restaurants bangalore', 'non veg restaurants bangalore'] },
  
  // Cafes
  { type: 'cafe', queries: ['best cafes bangalore', 'coffee shops bangalore', 'specialty coffee bangalore', 'cozy cafes bangalore indiranagar', 'cafes koramangala'] },
  
  // Bars & Nightlife
  { type: 'bar', queries: ['best bars bangalore', 'rooftop bars bangalore', 'cocktail bars bangalore', 'sports bars bangalore'] },
  { type: 'pub', queries: ['pubs in bangalore', 'best pubs koramangala', 'pubs indiranagar', 'irish pubs bangalore'] },
  { type: 'brewery', queries: ['microbreweries bangalore', 'craft beer bangalore', 'brewpubs bangalore'] },
  { type: 'club', queries: ['nightclubs bangalore', 'best clubs bangalore', 'dance clubs bangalore mg road'] },
  { type: 'lounge', queries: ['lounges bangalore', 'shisha lounges bangalore', 'cocktail lounges bangalore'] },
  
  // Gyms & Fitness
  { type: 'gym', queries: ['gyms in bangalore', 'fitness centers bangalore', 'crossfit bangalore', 'best gyms whitefield', 'gyms koramangala'] },
  
  // Spas & Salons
  { type: 'spa', queries: ['spas in bangalore', 'best spas bangalore', 'ayurvedic spa bangalore', 'luxury spa bangalore'] },
  { type: 'salon', queries: ['salons bangalore', 'hair salons bangalore', 'best salons indiranagar', 'unisex salons bangalore'] },
  
  // Parks & Recreation
  { type: 'park', queries: ['parks in bangalore', 'gardens bangalore', 'botanical garden bangalore', 'cubbon park', 'lalbagh bangalore'] },
  
  // Cultural
  { type: 'museum', queries: ['museums bangalore', 'art museums bangalore', 'science museums bangalore'] },
  { type: 'gallery', queries: ['art galleries bangalore', 'photography galleries bangalore'] },
  
  // Coworking
  { type: 'coworking', queries: ['coworking spaces bangalore', 'shared office bangalore', 'wework bangalore', 'coworking indiranagar', 'coworking koramangala'] },
  
  // Wedding Venues
  { type: 'wedding_venue', queries: ['wedding venues bangalore', 'banquet halls bangalore', 'marriage halls bangalore', 'outdoor wedding venues bangalore'] },
  
  // Bookstores
  { type: 'bookstore', queries: ['bookstores bangalore', 'book shops bangalore', 'sapna book house', 'crossword bangalore'] },
  
  // Electronics
  { type: 'electronics', queries: ['electronics stores bangalore', 'SP road electronics', 'croma bangalore', 'reliance digital bangalore'] },
  
  // Movie Theaters
  { type: 'cinema', queries: ['movie theaters bangalore', 'pvr bangalore', 'inox bangalore', 'cinepolis bangalore', 'multiplexes bangalore'] },
  
  // Street Food
  { type: 'street_food', queries: ['street food bangalore', 'food streets bangalore', 'vv puram food street', 'chaat bangalore'] },
  
  // Religious Sites
  { type: 'temple', queries: ['famous temples bangalore', 'iskcon temple bangalore', 'bull temple bangalore'] },
  { type: 'church', queries: ['churches bangalore', 'st marys church bangalore'] },
  
  // Tech Parks
  { type: 'tech_park', queries: ['tech parks bangalore', 'IT parks bangalore', 'business parks whitefield', 'electronic city tech parks'] },
];

// Bangalore neighborhoods for geo-targeted searches
const NEIGHBORHOODS = [
  { name: 'koramangala', lat: 12.9352, lng: 77.6245 },
  { name: 'indiranagar', lat: 12.9784, lng: 77.6408 },
  { name: 'whitefield', lat: 12.9698, lng: 77.7500 },
  { name: 'hsr-layout', lat: 12.9116, lng: 77.6389 },
  { name: 'jp-nagar', lat: 12.9063, lng: 77.5857 },
  { name: 'jayanagar', lat: 12.9308, lng: 77.5838 },
  { name: 'malleshwaram', lat: 13.0067, lng: 77.5713 },
  { name: 'rajajinagar', lat: 12.9914, lng: 77.5521 },
  { name: 'mg-road', lat: 12.9754, lng: 77.6066 },
  { name: 'brigade-road', lat: 12.9716, lng: 77.6064 },
  { name: 'electronic-city', lat: 12.8399, lng: 77.6770 },
  { name: 'marathahalli', lat: 12.9591, lng: 77.7011 },
  { name: 'hebbal', lat: 13.0358, lng: 77.5970 },
  { name: 'btm-layout', lat: 12.9166, lng: 77.6101 },
  { name: 'sarjapur', lat: 12.8655, lng: 77.7873 },
  { name: 'yelahanka', lat: 13.1007, lng: 77.5963 },
  { name: 'bannerghatta-road', lat: 12.8876, lng: 77.5973 },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

function getNeighborhood(lat: number, lng: number): string {
  let nearest = 'bangalore-central';
  let minDist = Infinity;
  
  for (const n of NEIGHBORHOODS) {
    const dist = Math.sqrt(Math.pow(lat - n.lat, 2) + Math.pow(lng - n.lng, 2));
    if (dist < minDist) {
      minDist = dist;
      nearest = n.name;
    }
  }
  
  // If too far from any known neighborhood
  if (minDist > 0.05) {
    if (lat > 13.0) return 'north-bangalore';
    if (lat < 12.85) return 'south-bangalore';
    if (lng > 77.7) return 'east-bangalore';
    if (lng < 77.5) return 'west-bangalore';
    return 'bangalore-central';
  }
  
  return nearest;
}

async function searchPlaces(query: string, pageToken?: string): Promise<{ results: any[], nextPageToken?: string }> {
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;
  if (pageToken) {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${pageToken}&key=${GOOGLE_API_KEY}`;
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  return {
    results: data.results || [],
    nextPageToken: data.next_page_token
  };
}

async function getPlaceDetails(placeId: string): Promise<any> {
  const fields = 'name,formatted_address,formatted_phone_number,website,geometry,rating,user_ratings_total,opening_hours,photos,types,url,price_level';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data.result || null;
}

async function scrapeVenues() {
  console.log('🔍 Starting Venue Database Expansion\n');
  
  let totalAdded = 0;
  let totalSkipped = 0;
  let apiCalls = 0;
  const seenPlaceIds = new Set<string>();
  
  // Get existing place IDs to avoid duplicates
  const { data: existingVenues } = await supabase
    .from('venues')
    .select('google_place_id');
  
  existingVenues?.forEach(v => {
    if (v.google_place_id) seenPlaceIds.add(v.google_place_id);
  });
  
  console.log(`📊 Found ${seenPlaceIds.size} existing venues\n`);
  
  for (const category of VENUE_CATEGORIES) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`📂 Category: ${category.type.toUpperCase()}`);
    console.log(`${'='.repeat(50)}`);
    
    for (const query of category.queries) {
      console.log(`\n🔎 Searching: "${query}"`);
      
      let pageToken: string | undefined;
      let pages = 0;
      const maxPages = 3; // Max 60 results per query
      
      do {
        const { results, nextPageToken } = await searchPlaces(query, pageToken);
        apiCalls++;
        pages++;
        
        console.log(`   Page ${pages}: ${results.length} results`);
        
        for (const place of results) {
          // Skip if already processed
          if (seenPlaceIds.has(place.place_id)) {
            totalSkipped++;
            continue;
          }
          seenPlaceIds.add(place.place_id);
          
          // Get detailed info
          const details = await getPlaceDetails(place.place_id);
          apiCalls++;
          
          if (!details) continue;
          
          const lat = details.geometry?.location?.lat || place.geometry?.location?.lat;
          const lng = details.geometry?.location?.lng || place.geometry?.location?.lng;
          
          if (!lat || !lng) continue;
          
          // Process photos
          const photos = details.photos?.slice(0, 3).map((p: any) => ({
            reference: p.photo_reference,
            url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${GOOGLE_API_KEY}`
          })) || [];
          
          const venueData = {
            name: details.name,
            slug: slugify(details.name) + '-' + place.place_id.substring(0, 10),
            google_place_id: place.place_id,
            google_rating: details.rating || null,
            google_reviews_count: details.user_ratings_total || 0,
            google_price_level: details.price_level || null,
            type: category.type,
            neighborhood: getNeighborhood(lat, lng),
            address: details.formatted_address,
            latitude: lat,
            longitude: lng,
            phone: details.formatted_phone_number || null,
            website: details.website || null,
            google_maps_url: details.url || null,
            opening_hours: details.opening_hours?.weekday_text || [],
            photos: photos,
            cover_photo_url: photos[0]?.url || null,
            is_active: true,
            last_google_sync: new Date().toISOString()
          };
          
          const { error } = await supabase
            .from('venues')
            .upsert(venueData, { onConflict: 'google_place_id' });
          
          if (!error) {
            totalAdded++;
          }
        }
        
        pageToken = nextPageToken;
        
        // Wait before next page (required by Google)
        if (pageToken) {
          await new Promise(r => setTimeout(r, 2000));
        }
        
      } while (pageToken && pages < maxPages);
      
      // Rate limiting
      await new Promise(r => setTimeout(r, 200));
      
      // Check if we're hitting API limits
      if (apiCalls > 2500) {
        console.log('\n⚠️ Approaching API limit. Stopping early.');
        break;
      }
    }
    
    if (apiCalls > 2500) break;
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 VENUE SCRAPING COMPLETE');
  console.log('='.repeat(50));
  console.log(`✅ New venues added: ${totalAdded}`);
  console.log(`⏭️ Duplicates skipped: ${totalSkipped}`);
  console.log(`📡 API calls made: ${apiCalls}`);
  
  // Get final counts
  const { count } = await supabase.from('venues').select('*', { count: 'exact', head: true });
  console.log(`📈 Total venues in database: ${count}`);
}

scrapeVenues().catch(console.error);
