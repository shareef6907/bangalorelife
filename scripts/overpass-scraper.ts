/**
 * Overpass API Scraper for BangaloreLife.com
 * Fetches ALL venues from OpenStreetMap - completely FREE
 * 
 * Usage:
 *   pnpm tsx scripts/overpass-scraper.ts --test          # Test with one category
 *   pnpm tsx scripts/overpass-scraper.ts --all           # Scrape everything
 *   pnpm tsx scripts/overpass-scraper.ts --all --dry-run # Preview without saving
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://imvanyylhitwmuegepkr.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFueXlsaGl0d211ZWdlcGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY2MzIxMSwiZXhwIjoyMDg3MjM5MjExfQ.FPW0JSgwlDkwquy5z6gEqof_1RAdoL-0mH8DMl-hVnU';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Bangalore bounding box (covers entire city + suburbs)
const BANGALORE_BBOX = {
  south: 12.7500,
  west: 77.3500,
  north: 13.1500,
  east: 77.8500,
};

// OSM amenity/shop types mapped to our categories
const OSM_QUERIES: Record<string, { amenities: string[]; shops?: string[]; tourisms?: string[]; leisures?: string[]; type: string }> = {
  // Food & Dining
  'restaurants': {
    amenities: ['restaurant'],
    type: 'restaurant'
  },
  'cafes': {
    amenities: ['cafe'],
    type: 'cafe'
  },
  'bars': {
    amenities: ['bar', 'pub'],
    type: 'bar'
  },
  'fast-food': {
    amenities: ['fast_food'],
    type: 'restaurant'
  },
  'bakeries': {
    shops: ['bakery'],
    type: 'bakery'
  },
  'ice-cream': {
    amenities: ['ice_cream'],
    shops: ['ice_cream'],
    type: 'cafe'
  },
  
  // Nightlife
  'nightclubs': {
    amenities: ['nightclub'],
    type: 'club'
  },
  
  // Health & Wellness
  'hospitals': {
    amenities: ['hospital', 'clinic'],
    type: 'hospital'
  },
  'pharmacies': {
    amenities: ['pharmacy'],
    type: 'pharmacy'
  },
  'gyms': {
    amenities: ['gym'],
    leisures: ['fitness_centre', 'sports_centre'],
    type: 'gym'
  },
  'spas': {
    shops: ['beauty', 'massage'],
    amenities: ['spa'],
    type: 'spa'
  },
  'dentists': {
    amenities: ['dentist'],
    type: 'dentist'
  },
  
  // Shopping
  'malls': {
    shops: ['mall', 'department_store'],
    type: 'mall'
  },
  'supermarkets': {
    shops: ['supermarket'],
    type: 'supermarket'
  },
  
  // Entertainment
  'cinemas': {
    amenities: ['cinema'],
    type: 'cinema'
  },
  'theaters': {
    amenities: ['theatre'],
    type: 'theater'
  },
  
  // Education
  'libraries': {
    amenities: ['library'],
    type: 'library'
  },
  'schools': {
    amenities: ['school', 'college', 'university'],
    type: 'school'
  },
  
  // Services
  'banks': {
    amenities: ['bank', 'atm'],
    type: 'bank'
  },
  'fuel': {
    amenities: ['fuel'],
    type: 'fuel'
  },
  'parking': {
    amenities: ['parking'],
    type: 'parking'
  },
  
  // Hotels & Accommodation
  'hotels': {
    tourisms: ['hotel', 'motel', 'guest_house', 'hostel'],
    type: 'hotel'
  },
  
  // Coworking (OSM doesn't have great coverage, but try)
  'coworking': {
    amenities: ['coworking_space'],
    type: 'coworking'
  },
};

// Area boundaries for neighborhood detection
const NEIGHBORHOODS: Record<string, { lat: number; lng: number; radius: number }> = {
  'koramangala': { lat: 12.9352, lng: 77.6245, radius: 2.0 },
  'indiranagar': { lat: 12.9784, lng: 77.6408, radius: 2.0 },
  'hsr-layout': { lat: 12.9116, lng: 77.6389, radius: 2.0 },
  'whitefield': { lat: 12.9698, lng: 77.7500, radius: 3.5 },
  'electronic-city': { lat: 12.8456, lng: 77.6603, radius: 3.0 },
  'mg-road': { lat: 12.9758, lng: 77.6065, radius: 1.5 },
  'brigade-road': { lat: 12.9737, lng: 77.6078, radius: 1.0 },
  'church-street': { lat: 12.9753, lng: 77.6044, radius: 0.8 },
  'jp-nagar': { lat: 12.9066, lng: 77.5850, radius: 3.0 },
  'jayanagar': { lat: 12.9299, lng: 77.5826, radius: 2.5 },
  'btm-layout': { lat: 12.9166, lng: 77.6101, radius: 2.0 },
  'marathahalli': { lat: 12.9591, lng: 77.7019, radius: 2.5 },
  'bellandur': { lat: 12.9260, lng: 77.6762, radius: 2.0 },
  'sarjapur-road': { lat: 12.9103, lng: 77.6855, radius: 3.0 },
  'hebbal': { lat: 13.0358, lng: 77.5970, radius: 2.5 },
  'yelahanka': { lat: 13.1007, lng: 77.5963, radius: 3.0 },
  'malleshwaram': { lat: 13.0035, lng: 77.5647, radius: 2.0 },
  'rajajinagar': { lat: 12.9914, lng: 77.5521, radius: 2.0 },
  'basavanagudi': { lat: 12.9419, lng: 77.5752, radius: 1.5 },
  'frazer-town': { lat: 13.0020, lng: 77.6135, radius: 1.5 },
  'ub-city': { lat: 12.9716, lng: 77.5963, radius: 0.8 },
  'lavelle-road': { lat: 12.9687, lng: 77.5982, radius: 0.8 },
  'hennur': { lat: 13.0350, lng: 77.6400, radius: 2.0 },
  'kalyan-nagar': { lat: 13.0250, lng: 77.6350, radius: 1.5 },
  'kammanahalli': { lat: 13.0150, lng: 77.6400, radius: 1.5 },
  'banaswadi': { lat: 13.0100, lng: 77.6500, radius: 1.5 },
  'brookefield': { lat: 12.9650, lng: 77.7200, radius: 2.0 },
  'banashankari': { lat: 12.9255, lng: 77.5468, radius: 2.5 },
  'bannerghatta-road': { lat: 12.8889, lng: 77.5973, radius: 3.0 },
  'rt-nagar': { lat: 13.0214, lng: 77.5920, radius: 1.5 },
  'vijayanagar': { lat: 12.9700, lng: 77.5350, radius: 2.0 },
  'rr-nagar': { lat: 12.9200, lng: 77.5200, radius: 2.5 },
  'mahadevapura': { lat: 12.9900, lng: 77.7000, radius: 2.5 },
  'itpl': { lat: 12.9850, lng: 77.7300, radius: 2.0 },
  'richmond-town': { lat: 12.9623, lng: 77.6005, radius: 1.0 },
  'residency-road': { lat: 12.9699, lng: 77.6012, radius: 1.0 },
  'cunningham-road': { lat: 12.9875, lng: 77.5895, radius: 1.0 },
  'commercial-street': { lat: 12.9830, lng: 77.6075, radius: 1.0 },
  'sadashivanagar': { lat: 13.0080, lng: 77.5755, radius: 1.5 },
};

// ============================================
// OVERPASS API FUNCTIONS
// ============================================

interface OSMElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

async function queryOverpass(query: string): Promise<OSMElement[]> {
  const endpoint = 'https://overpass-api.de/api/interpreter';
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!response.ok) {
    throw new Error(`Overpass API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.elements || [];
}

function buildOverpassQuery(category: string): string {
  const config = OSM_QUERIES[category];
  if (!config) return '';

  const { south, west, north, east } = BANGALORE_BBOX;
  const bbox = `${south},${west},${north},${east}`;

  let filters: string[] = [];

  // Add amenity filters
  if (config.amenities) {
    for (const amenity of config.amenities) {
      filters.push(`node["amenity"="${amenity}"](${bbox});`);
      filters.push(`way["amenity"="${amenity}"](${bbox});`);
    }
  }

  // Add shop filters
  if (config.shops) {
    for (const shop of config.shops) {
      filters.push(`node["shop"="${shop}"](${bbox});`);
      filters.push(`way["shop"="${shop}"](${bbox});`);
    }
  }

  // Add tourism filters
  if (config.tourisms) {
    for (const tourism of config.tourisms) {
      filters.push(`node["tourism"="${tourism}"](${bbox});`);
      filters.push(`way["tourism"="${tourism}"](${bbox});`);
    }
  }

  // Add leisure filters
  if (config.leisures) {
    for (const leisure of config.leisures) {
      filters.push(`node["leisure"="${leisure}"](${bbox});`);
      filters.push(`way["leisure"="${leisure}"](${bbox});`);
    }
  }

  return `
    [out:json][timeout:120];
    (
      ${filters.join('\n      ')}
    );
    out center;
  `;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getCoordinates(element: OSMElement): { lat: number; lng: number } | null {
  if (element.lat && element.lon) {
    return { lat: element.lat, lng: element.lon };
  }
  if (element.center) {
    return { lat: element.center.lat, lng: element.center.lon };
  }
  return null;
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function detectNeighborhood(lat: number, lng: number): string {
  let closest = 'bangalore-other';
  let minDistance = Infinity;

  for (const [name, area] of Object.entries(NEIGHBORHOODS)) {
    const distance = haversineDistance(lat, lng, area.lat, area.lng);
    if (distance <= area.radius && distance < minDistance) {
      minDistance = distance;
      closest = name;
    }
  }

  return closest;
}

function generateSlug(name: string, neighborhood: string, osmId: number): string {
  const base = `${name}-${neighborhood}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Add OSM ID suffix for uniqueness
  return `${base}-${osmId}`;
}

function cleanName(name: string): string {
  return name
    .replace(/\s+/g, ' ')
    .trim();
}

function extractCuisines(tags: Record<string, string>): string[] {
  const cuisines: string[] = [];
  
  if (tags.cuisine) {
    cuisines.push(...tags.cuisine.split(/[;,]/).map(c => c.trim()));
  }
  
  return cuisines.filter(c => c.length > 0);
}

function extractFeatures(tags: Record<string, string>): string[] {
  const features: string[] = [];
  
  if (tags.outdoor_seating === 'yes') features.push('outdoor-seating');
  if (tags.wheelchair === 'yes') features.push('wheelchair-accessible');
  if (tags.internet_access === 'yes' || tags.internet_access === 'wlan') features.push('wifi');
  if (tags.delivery === 'yes') features.push('delivery');
  if (tags.takeaway === 'yes') features.push('takeaway');
  if (tags.reservation === 'yes') features.push('reservations');
  if (tags.smoking === 'no') features.push('non-smoking');
  if (tags.air_conditioning === 'yes') features.push('ac');
  if (tags.parking) features.push('parking');
  if (tags.beer_garden === 'yes') features.push('beer-garden');
  if (tags.live_music === 'yes') features.push('live-music');
  if (tags.breakfast === 'yes') features.push('breakfast');
  
  return features;
}

// ============================================
// DATABASE FUNCTIONS
// ============================================

async function upsertVenue(
  element: OSMElement,
  venueType: string,
  dryRun: boolean
): Promise<boolean> {
  const coords = getCoordinates(element);
  if (!coords) return false;

  const tags = element.tags || {};
  const name = tags.name || tags['name:en'];
  
  if (!name) return false; // Skip unnamed venues

  const neighborhood = detectNeighborhood(coords.lat, coords.lng);
  const slug = generateSlug(name, neighborhood, element.id);

  // Build venue data matching the actual venues table schema
  const venueData: Record<string, any> = {
    name: cleanName(name),
    slug,
    type: venueType,
    neighborhood,
    address: [
      tags['addr:housenumber'],
      tags['addr:street'],
      tags['addr:suburb'],
      tags['addr:city'] || 'Bangalore',
      tags['addr:postcode'],
    ].filter(Boolean).join(', ') || null,
    latitude: coords.lat,
    longitude: coords.lng,
    phone: tags.phone || tags['contact:phone'] || null,
    website: tags.website || tags['contact:website'] || null,
    is_active: true,
  };

  // Add optional columns only if they have values (avoids schema cache issues)
  const cuisines = extractCuisines(tags);
  if (cuisines.length > 0) venueData.cuisine_types = cuisines;
  
  const features = extractFeatures(tags);
  if (features.length > 0) venueData.features = features;
  
  if (tags.opening_hours) {
    venueData.opening_hours = JSON.stringify({ raw: tags.opening_hours });
  }
  
  // Source tracking for deduplication
  venueData.source = 'osm';
  venueData.source_id = `osm-${element.type}-${element.id}`;

  if (dryRun) {
    return true;
  }

  // First, check if venue already exists by source_id
  const { data: existing } = await supabase
    .from('venues')
    .select('id')
    .eq('source_id', venueData.source_id)
    .single();

  if (existing) {
    // Update existing venue
    const { error } = await supabase
      .from('venues')
      .update(venueData)
      .eq('id', existing.id);
    
    if (error) {
      console.error(`   ❌ Update ${name}: ${error.message}`);
      return false;
    }
    return true;
  }

  // Insert new venue
  const { error } = await supabase
    .from('venues')
    .insert(venueData);

  if (error) {
    // Try with modified slug if duplicate
    if (error.code === '23505') {
      venueData.slug = `${slug}-${Date.now()}`;
      const { error: error2 } = await supabase
        .from('venues')
        .insert(venueData);
      
      if (error2) {
        console.error(`   ❌ ${name}: ${error2.message}`);
        return false;
      }
    } else {
      console.error(`   ❌ ${name}: ${error.message}`);
      return false;
    }
  }

  return true;
}

// ============================================
// MAIN SCRAPER
// ============================================

async function scrapeCategory(category: string, dryRun: boolean): Promise<number> {
  const config = OSM_QUERIES[category];
  if (!config) {
    console.error(`Unknown category: ${category}`);
    return 0;
  }

  console.log(`\n📍 Scraping ${category}...`);

  const query = buildOverpassQuery(category);
  
  try {
    const elements = await queryOverpass(query);
    console.log(`   Found ${elements.length} elements from OSM`);

    let saved = 0;
    let skipped = 0;

    for (const element of elements) {
      const success = await upsertVenue(element, config.type, dryRun);
      if (success) {
        saved++;
      } else {
        skipped++;
      }

      if (saved % 100 === 0 && saved > 0) {
        console.log(`   Progress: ${saved} saved, ${skipped} skipped...`);
      }
    }

    console.log(`   ✅ ${category}: ${saved} saved, ${skipped} skipped`);
    return saved;

  } catch (error: any) {
    console.error(`   ❌ Error: ${error.message}`);
    return 0;
  }
}

async function scrapeAll(dryRun: boolean) {
  console.log('🚀 Starting Overpass API (OpenStreetMap) scrape for Bangalore\n');
  console.log(`Bounding box: ${BANGALORE_BBOX.south},${BANGALORE_BBOX.west} to ${BANGALORE_BBOX.north},${BANGALORE_BBOX.east}`);
  console.log(`Categories: ${Object.keys(OSM_QUERIES).length}`);
  console.log(`Dry run: ${dryRun ? 'YES' : 'NO'}\n`);

  const startTime = Date.now();
  let totalSaved = 0;

  for (const category of Object.keys(OSM_QUERIES)) {
    const saved = await scrapeCategory(category, dryRun);
    totalSaved += saved;

    // Be nice to the Overpass API - wait 5 seconds between queries
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  console.log(`\n========================================`);
  console.log(`✅ OVERPASS SCRAPE COMPLETE`);
  console.log(`========================================`);
  console.log(`Total venues saved: ${totalSaved}`);
  console.log(`Time elapsed: ${elapsed} minutes`);
  
  // Get final count from database
  const { count } = await supabase
    .from('venues')
    .select('*', { count: 'exact', head: true });
  
  console.log(`Total venues in database: ${count}`);
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
    console.log('🧪 Test mode: scraping restaurants only\n');
    await scrapeCategory('restaurants', dryRun);
    return;
  }

  if (all) {
    await scrapeAll(dryRun);
    return;
  }

  const categoryIdx = args.indexOf('--category');
  if (categoryIdx !== -1) {
    const category = args[categoryIdx + 1];
    await scrapeCategory(category, dryRun);
    return;
  }

  console.log(`
Overpass API Scraper (OpenStreetMap) for BangaloreLife.com
FREE - No API key required!

Usage:
  pnpm tsx scripts/overpass-scraper.ts --test              # Test with restaurants
  pnpm tsx scripts/overpass-scraper.ts --test --dry-run    # Preview without saving
  pnpm tsx scripts/overpass-scraper.ts --all               # Scrape all categories
  pnpm tsx scripts/overpass-scraper.ts --category cafes    # Scrape specific category

Available categories: ${Object.keys(OSM_QUERIES).join(', ')}
  `);
}

main().catch(console.error);
