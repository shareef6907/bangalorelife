/**
 * Google Maps Scraper for BangaloreLife.com
 * Fetches venues from Google Places API across all Bangalore neighborhoods
 * 
 * Usage:
 *   pnpm tsx scripts/google-maps-scraper.ts --area koramangala --category restaurants
 *   pnpm tsx scripts/google-maps-scraper.ts --all --dry-run
 *   pnpm tsx scripts/google-maps-scraper.ts --all
 */

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// ============================================
// CONFIGURATION
// ============================================

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!GOOGLE_MAPS_API_KEY) {
  console.error('❌ GOOGLE_MAPS_API_KEY not set in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Bangalore neighborhoods with coordinates
const AREAS: Record<string, { lat: number; lng: number; radius: number }> = {
  'koramangala': { lat: 12.9352, lng: 77.6245, radius: 2000 },
  'indiranagar': { lat: 12.9784, lng: 77.6408, radius: 2000 },
  'hsr-layout': { lat: 12.9116, lng: 77.6389, radius: 2000 },
  'whitefield': { lat: 12.9698, lng: 77.7500, radius: 3000 },
  'mg-road': { lat: 12.9758, lng: 77.6065, radius: 1500 },
  'brigade-road': { lat: 12.9737, lng: 77.6078, radius: 1000 },
  'church-street': { lat: 12.9753, lng: 77.6044, radius: 800 },
  'jp-nagar': { lat: 12.9066, lng: 77.5850, radius: 3000 },
  'jayanagar': { lat: 12.9299, lng: 77.5826, radius: 2500 },
  'btm-layout': { lat: 12.9166, lng: 77.6101, radius: 2000 },
  'electronic-city': { lat: 12.8456, lng: 77.6603, radius: 3000 },
  'marathahalli': { lat: 12.9591, lng: 77.7019, radius: 2500 },
  'bellandur': { lat: 12.9260, lng: 77.6762, radius: 2000 },
  'sarjapur-road': { lat: 12.9103, lng: 77.6855, radius: 3000 },
  'hebbal': { lat: 13.0358, lng: 77.5970, radius: 2500 },
  'yelahanka': { lat: 13.1007, lng: 77.5963, radius: 3000 },
  'malleshwaram': { lat: 13.0035, lng: 77.5647, radius: 2000 },
  'rajajinagar': { lat: 12.9914, lng: 77.5521, radius: 2000 },
  'basavanagudi': { lat: 12.9419, lng: 77.5752, radius: 1500 },
  'sadashivanagar': { lat: 13.0080, lng: 77.5755, radius: 1500 },
  'ub-city': { lat: 12.9716, lng: 77.5963, radius: 800 },
  'lavelle-road': { lat: 12.9687, lng: 77.5982, radius: 800 },
  'residency-road': { lat: 12.9699, lng: 77.6012, radius: 1000 },
  'commercial-street': { lat: 12.9830, lng: 77.6075, radius: 1000 },
  'cunningham-road': { lat: 12.9875, lng: 77.5895, radius: 1000 },
  'frazer-town': { lat: 13.0020, lng: 77.6135, radius: 1500 },
  'cox-town': { lat: 13.0000, lng: 77.6200, radius: 1000 },
  'richmond-town': { lat: 12.9623, lng: 77.6005, radius: 1000 },
  'banashankari': { lat: 12.9255, lng: 77.5468, radius: 2500 },
  'bannerghatta-road': { lat: 12.8889, lng: 77.5973, radius: 3000 },
  'hennur': { lat: 13.0350, lng: 77.6400, radius: 2000 },
  'kalyan-nagar': { lat: 13.0250, lng: 77.6350, radius: 1500 },
  'kammanahalli': { lat: 13.0150, lng: 77.6400, radius: 1500 },
  'banaswadi': { lat: 13.0100, lng: 77.6500, radius: 1500 },
  'brookefield': { lat: 12.9650, lng: 77.7200, radius: 2000 },
  'itpl': { lat: 12.9850, lng: 77.7300, radius: 2000 },
  'mahadevapura': { lat: 12.9900, lng: 77.7000, radius: 2500 },
  'rt-nagar': { lat: 13.0214, lng: 77.5920, radius: 1500 },
  'sanjaynagar': { lat: 13.0300, lng: 77.5750, radius: 1500 },
  'vijayanagar': { lat: 12.9700, lng: 77.5350, radius: 2000 },
  'rr-nagar': { lat: 12.9200, lng: 77.5200, radius: 2500 },
};

// Search categories mapped to Google Places types
const CATEGORIES: Record<string, { query: string; types: string[] }> = {
  'restaurants': { 
    query: 'restaurants', 
    types: ['restaurant', 'meal_delivery', 'meal_takeaway'] 
  },
  'bars-pubs': { 
    query: 'bars pubs', 
    types: ['bar', 'night_club'] 
  },
  'breweries': { 
    query: 'breweries craft beer', 
    types: ['bar', 'restaurant'] 
  },
  'cafes': { 
    query: 'cafes coffee shops', 
    types: ['cafe', 'coffee_shop'] 
  },
  'clubs': { 
    query: 'nightclubs dance clubs', 
    types: ['night_club'] 
  },
  'gyms': { 
    query: 'gyms fitness centers', 
    types: ['gym', 'health'] 
  },
  'spas': { 
    query: 'spas massage wellness', 
    types: ['spa', 'beauty_salon'] 
  },
  'hospitals': { 
    query: 'hospitals medical centers', 
    types: ['hospital', 'doctor'] 
  },
  'malls': { 
    query: 'shopping malls', 
    types: ['shopping_mall'] 
  },
  'cinemas': { 
    query: 'movie theaters cinemas', 
    types: ['movie_theater'] 
  },
  'coworking': { 
    query: 'coworking spaces', 
    types: ['establishment'] 
  },
};

// ============================================
// GOOGLE PLACES API FUNCTIONS
// ============================================

interface PlaceResult {
  place_id: string;
  name: string;
  vicinity?: string;
  formatted_address?: string;
  geometry: {
    location: { lat: number; lng: number };
  };
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  types?: string[];
  opening_hours?: { open_now?: boolean };
  photos?: Array<{ photo_reference: string }>;
}

interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address?: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  url?: string; // Google Maps URL
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  opening_hours?: {
    weekday_text?: string[];
    open_now?: boolean;
  };
  photos?: Array<{ photo_reference: string; width: number; height: number }>;
  types?: string[];
  geometry: {
    location: { lat: number; lng: number };
  };
}

async function searchNearby(
  lat: number, 
  lng: number, 
  radius: number, 
  query: string,
  pageToken?: string
): Promise<{ results: PlaceResult[]; nextPageToken?: string }> {
  const params = new URLSearchParams({
    location: `${lat},${lng}`,
    radius: radius.toString(),
    keyword: query,
    key: GOOGLE_MAPS_API_KEY!,
  });

  if (pageToken) {
    params.set('pagetoken', pageToken);
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'REQUEST_DENIED') {
    throw new Error(`Google API error: ${data.error_message}`);
  }

  return {
    results: data.results || [],
    nextPageToken: data.next_page_token,
  };
}

async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  const fields = [
    'place_id', 'name', 'formatted_address', 'formatted_phone_number',
    'international_phone_number', 'website', 'url', 'rating', 
    'user_ratings_total', 'price_level', 'opening_hours', 'photos',
    'types', 'geometry'
  ].join(',');

  const params = new URLSearchParams({
    place_id: placeId,
    fields,
    key: GOOGLE_MAPS_API_KEY!,
  });

  const url = `https://maps.googleapis.com/maps/api/place/details/json?${params}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK') {
    console.warn(`   ⚠️ Place details failed for ${placeId}: ${data.status}`);
    return null;
  }

  return data.result;
}

function getPhotoUrl(photoReference: string, maxWidth: number = 800): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`;
}

// ============================================
// DATABASE FUNCTIONS
// ============================================

function generateSlug(name: string, neighborhood: string): string {
  const base = `${name}-${neighborhood}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return base;
}

function mapPriceLevel(level?: number): number | null {
  if (level === undefined || level === null) return null;
  // Google: 0-4, Our scale: 1-4
  return Math.max(1, Math.min(4, level + 1));
}

function mapToVenueType(types: string[]): string {
  const typeMap: Record<string, string> = {
    'bar': 'bar',
    'night_club': 'club',
    'restaurant': 'restaurant',
    'cafe': 'cafe',
    'coffee_shop': 'cafe',
    'spa': 'spa',
    'gym': 'gym',
    'movie_theater': 'cinema',
    'shopping_mall': 'mall',
  };

  for (const type of types) {
    if (typeMap[type]) return typeMap[type];
  }

  // Check for brewery keywords in types
  if (types.some(t => t.includes('brewery') || t.includes('microbrewery'))) {
    return 'brewery';
  }

  return 'restaurant'; // default
}

async function upsertVenue(
  details: PlaceDetails, 
  neighborhood: string,
  category: string,
  dryRun: boolean
): Promise<boolean> {
  const slug = generateSlug(details.name, neighborhood);
  
  const venueData = {
    name: details.name,
    slug,
    google_place_id: details.place_id,
    google_rating: details.rating || null,
    google_reviews_count: details.user_ratings_total || 0,
    google_price_level: details.price_level || null,
    type: mapToVenueType(details.types || []),
    neighborhood,
    address: details.formatted_address || null,
    latitude: details.geometry.location.lat,
    longitude: details.geometry.location.lng,
    phone: details.formatted_phone_number || details.international_phone_number || null,
    website: details.website || null,
    google_maps_url: details.url || null,
    opening_hours: details.opening_hours?.weekday_text 
      ? JSON.stringify(details.opening_hours.weekday_text)
      : null,
    cover_photo_url: details.photos?.[0]?.photo_reference 
      ? getPhotoUrl(details.photos[0].photo_reference)
      : null,
    photos: details.photos?.slice(0, 5).map(p => ({
      reference: p.photo_reference,
      url: getPhotoUrl(p.photo_reference),
    })) || [],
    source: 'google',
    source_id: details.place_id,
    last_google_sync: new Date().toISOString(),
    is_active: true,
  };

  if (dryRun) {
    console.log(`   [DRY RUN] Would upsert: ${details.name}`);
    return true;
  }

  const { error } = await supabase
    .from('venues')
    .upsert(venueData, { 
      onConflict: 'google_place_id',
      ignoreDuplicates: false 
    });

  if (error) {
    // Try with slug conflict
    if (error.code === '23505') { // unique violation
      const { error: error2 } = await supabase
        .from('venues')
        .upsert({ ...venueData, slug: `${slug}-${Date.now()}` }, {
          onConflict: 'google_place_id',
          ignoreDuplicates: false
        });
      
      if (error2) {
        console.error(`   ❌ Failed to upsert ${details.name}: ${error2.message}`);
        return false;
      }
    } else {
      console.error(`   ❌ Failed to upsert ${details.name}: ${error.message}`);
      return false;
    }
  }

  return true;
}

// ============================================
// MAIN SCRAPER LOGIC
// ============================================

async function scrapeArea(
  areaSlug: string, 
  categorySlug: string, 
  dryRun: boolean
): Promise<number> {
  const area = AREAS[areaSlug];
  const category = CATEGORIES[categorySlug];

  if (!area || !category) {
    console.error(`Unknown area (${areaSlug}) or category (${categorySlug})`);
    return 0;
  }

  console.log(`\n📍 Scraping ${categorySlug} in ${areaSlug}...`);
  console.log(`   Location: ${area.lat}, ${area.lng} | Radius: ${area.radius}m`);

  let totalPlaces = 0;
  let savedPlaces = 0;
  let pageToken: string | undefined;
  let pageNum = 1;

  do {
    if (pageNum > 1) {
      // Google requires 2-second delay between pagination requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`   Page ${pageNum}...`);
    
    const { results, nextPageToken } = await searchNearby(
      area.lat, 
      area.lng, 
      area.radius, 
      `${category.query} in ${areaSlug.replace(/-/g, ' ')} Bangalore`,
      pageToken
    );

    console.log(`   Found ${results.length} places`);
    totalPlaces += results.length;

    for (const place of results) {
      // Rate limiting: 100ms between detail requests
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const details = await getPlaceDetails(place.place_id);
      
      if (details) {
        const success = await upsertVenue(details, areaSlug, categorySlug, dryRun);
        if (success) {
          savedPlaces++;
          if (savedPlaces % 10 === 0) {
            console.log(`   Progress: ${savedPlaces} venues saved...`);
          }
        }
      }
    }

    pageToken = nextPageToken;
    pageNum++;

    // Safety limit: max 3 pages (60 results) per area-category combo
    if (pageNum > 3) {
      console.log(`   Reached page limit, moving on...`);
      break;
    }

  } while (pageToken);

  console.log(`   ✅ Saved ${savedPlaces}/${totalPlaces} venues from ${areaSlug}`);
  return savedPlaces;
}

async function scrapeAll(dryRun: boolean, limitAreas?: number, limitCategories?: number) {
  console.log('🚀 Starting full Google Maps scrape for Bangalore\n');
  
  const startTime = Date.now();
  let totalSaved = 0;
  let areaCount = 0;

  const areasList = Object.keys(AREAS).slice(0, limitAreas || Object.keys(AREAS).length);
  const categoriesList = Object.keys(CATEGORIES).slice(0, limitCategories || Object.keys(CATEGORIES).length);

  console.log(`Areas to scrape: ${areasList.length}`);
  console.log(`Categories to scrape: ${categoriesList.length}`);
  console.log(`Estimated API calls: ~${areasList.length * categoriesList.length * 25}`);
  console.log(`Dry run: ${dryRun ? 'YES' : 'NO'}\n`);

  for (const area of areasList) {
    areaCount++;
    console.log(`\n========================================`);
    console.log(`Area ${areaCount}/${areasList.length}: ${area.toUpperCase()}`);
    console.log(`========================================`);

    for (const category of categoriesList) {
      try {
        const saved = await scrapeArea(area, category, dryRun);
        totalSaved += saved;

        // Respectful delay between category searches
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error: any) {
        console.error(`   ❌ Error scraping ${category} in ${area}: ${error.message}`);
        
        // If rate limited, wait longer
        if (error.message?.includes('OVER_QUERY_LIMIT')) {
          console.log('   ⏳ Rate limited. Waiting 60 seconds...');
          await new Promise(resolve => setTimeout(resolve, 60000));
        }
      }
    }

    // Delay between areas
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  
  console.log(`\n========================================`);
  console.log(`✅ SCRAPE COMPLETE`);
  console.log(`========================================`);
  console.log(`Total venues saved: ${totalSaved}`);
  console.log(`Time elapsed: ${elapsed} minutes`);
  console.log(`Areas scraped: ${areaCount}`);
}

// ============================================
// CLI
// ============================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const all = args.includes('--all');
  const test = args.includes('--test');

  if (test) {
    // Test with just one area and one category
    console.log('🧪 Running test scrape (Koramangala restaurants only)...\n');
    await scrapeArea('koramangala', 'restaurants', dryRun);
    return;
  }

  if (all) {
    // Parse optional limits
    const limitAreasIdx = args.indexOf('--limit-areas');
    const limitCategoriesIdx = args.indexOf('--limit-categories');
    
    const limitAreas = limitAreasIdx !== -1 ? parseInt(args[limitAreasIdx + 1]) : undefined;
    const limitCategories = limitCategoriesIdx !== -1 ? parseInt(args[limitCategoriesIdx + 1]) : undefined;

    await scrapeAll(dryRun, limitAreas, limitCategories);
    return;
  }

  const areaIdx = args.indexOf('--area');
  const categoryIdx = args.indexOf('--category');

  if (areaIdx !== -1 && categoryIdx !== -1) {
    const area = args[areaIdx + 1];
    const category = args[categoryIdx + 1];
    await scrapeArea(area, category, dryRun);
    return;
  }

  console.log(`
Google Maps Scraper for BangaloreLife.com

Usage:
  pnpm tsx scripts/google-maps-scraper.ts --test                      # Test with Koramangala restaurants
  pnpm tsx scripts/google-maps-scraper.ts --test --dry-run            # Test without saving
  pnpm tsx scripts/google-maps-scraper.ts --area koramangala --category restaurants
  pnpm tsx scripts/google-maps-scraper.ts --all                       # Scrape everything
  pnpm tsx scripts/google-maps-scraper.ts --all --dry-run             # Preview without saving
  pnpm tsx scripts/google-maps-scraper.ts --all --limit-areas 5       # Limit to first 5 areas

Options:
  --dry-run          Don't save to database, just preview
  --test             Quick test with one area/category
  --all              Scrape all areas and categories
  --area <slug>      Specific area to scrape
  --category <slug>  Specific category to scrape
  --limit-areas N    Limit number of areas (with --all)
  --limit-categories N  Limit number of categories (with --all)

Available areas: ${Object.keys(AREAS).join(', ')}

Available categories: ${Object.keys(CATEGORIES).join(', ')}
  `);
}

main().catch(console.error);
