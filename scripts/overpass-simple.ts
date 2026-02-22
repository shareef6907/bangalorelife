/**
 * Simplified Overpass Scraper - Uses ONLY original venue columns
 * No schema cache issues - just the basics that definitely exist
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://imvanyylhitwmuegepkr.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFueXlsaGl0d211ZWdlcGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY2MzIxMSwiZXhwIjoyMDg3MjM5MjExfQ.FPW0JSgwlDkwquy5z6gEqof_1RAdoL-0mH8DMl-hVnU';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Bangalore bounding box
const BBOX = '12.75,77.35,13.15,77.85';

// Venue types that match the original CHECK constraint
const VALID_TYPES = ['pub', 'bar', 'brewery', 'club', 'lounge', 'rooftop', 'cafe', 'restaurant'];

// OSM queries - only food/nightlife to match valid types
const QUERIES: Record<string, { query: string; type: string }> = {
  restaurants: { query: 'node["amenity"="restaurant"]', type: 'restaurant' },
  cafes: { query: 'node["amenity"="cafe"]', type: 'cafe' },
  bars: { query: 'node["amenity"="bar"]', type: 'bar' },
  pubs: { query: 'node["amenity"="pub"]', type: 'pub' },
  nightclubs: { query: 'node["amenity"="nightclub"]', type: 'club' },
  fastfood: { query: 'node["amenity"="fast_food"]', type: 'restaurant' },
};

// Neighborhoods for detection
const AREAS: Record<string, { lat: number; lng: number; r: number }> = {
  'koramangala': { lat: 12.935, lng: 77.624, r: 2 },
  'indiranagar': { lat: 12.978, lng: 77.640, r: 2 },
  'hsr-layout': { lat: 12.911, lng: 77.638, r: 2 },
  'whitefield': { lat: 12.969, lng: 77.750, r: 3 },
  'mg-road': { lat: 12.975, lng: 77.606, r: 1.5 },
  'brigade-road': { lat: 12.973, lng: 77.607, r: 1 },
  'church-street': { lat: 12.975, lng: 77.604, r: 0.8 },
  'jp-nagar': { lat: 12.906, lng: 77.585, r: 3 },
  'jayanagar': { lat: 12.929, lng: 77.582, r: 2.5 },
  'btm-layout': { lat: 12.916, lng: 77.610, r: 2 },
  'electronic-city': { lat: 12.845, lng: 77.660, r: 3 },
  'marathahalli': { lat: 12.959, lng: 77.701, r: 2.5 },
  'bellandur': { lat: 12.926, lng: 77.676, r: 2 },
  'sarjapur-road': { lat: 12.910, lng: 77.685, r: 3 },
  'hebbal': { lat: 13.035, lng: 77.597, r: 2.5 },
  'malleshwaram': { lat: 13.003, lng: 77.564, r: 2 },
  'frazer-town': { lat: 13.002, lng: 77.613, r: 1.5 },
  'ub-city': { lat: 12.971, lng: 77.596, r: 0.8 },
  'lavelle-road': { lat: 12.968, lng: 77.598, r: 0.8 },
  'hennur': { lat: 13.035, lng: 77.640, r: 2 },
  'kalyan-nagar': { lat: 13.025, lng: 77.635, r: 1.5 },
  'banashankari': { lat: 12.925, lng: 77.546, r: 2.5 },
  'basavanagudi': { lat: 12.941, lng: 77.575, r: 1.5 },
  'rajajinagar': { lat: 12.991, lng: 77.552, r: 2 },
  'vijayanagar': { lat: 12.970, lng: 77.535, r: 2 },
  'bannerghatta-road': { lat: 12.888, lng: 77.597, r: 3 },
  'brookefield': { lat: 12.965, lng: 77.720, r: 2 },
  'mahadevapura': { lat: 12.990, lng: 77.700, r: 2.5 },
};

function dist(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function findArea(lat: number, lng: number): string {
  for (const [name, a] of Object.entries(AREAS)) {
    if (dist(lat, lng, a.lat, a.lng) <= a.r) return name;
  }
  return 'bangalore-central';
}

function slug(name: string, area: string, id: number): string {
  return `${name}-${area}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + `-${id}`;
}

async function fetchOSM(category: string): Promise<any[]> {
  const { query } = QUERIES[category];
  const q = `[out:json][timeout:60];(${query}(${BBOX}););out;`;
  
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: `data=${encodeURIComponent(q)}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  
  const data = await res.json();
  return data.elements || [];
}

async function saveVenue(el: any, type: string, dryRun: boolean): Promise<boolean> {
  if (!el.tags?.name || !el.lat || !el.lon) return false;
  
  const area = findArea(el.lat, el.lon);
  const s = slug(el.tags.name, area, el.id);
  
  // ONLY use columns from original schema
  const venue = {
    name: el.tags.name.trim(),
    slug: s,
    type: type,
    neighborhood: area,
    address: [el.tags['addr:street'], el.tags['addr:city'] || 'Bangalore'].filter(Boolean).join(', ') || null,
    latitude: el.lat,
    longitude: el.lon,
    phone: el.tags.phone || el.tags['contact:phone'] || null,
    website: el.tags.website || null,
    is_active: true,
  };

  if (dryRun) return true;

  // Check if exists by slug
  const { data: existing } = await supabase.from('venues').select('id').eq('slug', s).single();
  
  if (existing) {
    await supabase.from('venues').update(venue).eq('id', existing.id);
  } else {
    const { error } = await supabase.from('venues').insert(venue);
    if (error?.code === '23505') {
      // Duplicate slug - add timestamp
      venue.slug = `${s}-${Date.now()}`;
      const { error: e2 } = await supabase.from('venues').insert(venue);
      if (e2) { console.error(`❌ ${venue.name}: ${e2.message}`); return false; }
    } else if (error) {
      console.error(`❌ ${venue.name}: ${error.message}`);
      return false;
    }
  }
  
  return true;
}

async function scrape(category: string, dryRun: boolean) {
  console.log(`\n📍 ${category}...`);
  
  const elements = await fetchOSM(category);
  console.log(`   Found ${elements.length} from OSM`);
  
  let saved = 0;
  for (const el of elements) {
    if (await saveVenue(el, QUERIES[category].type, dryRun)) saved++;
    if (saved % 100 === 0 && saved > 0) console.log(`   ${saved} saved...`);
  }
  
  console.log(`   ✅ ${saved} saved`);
  return saved;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const all = args.includes('--all');
  
  console.log('🚀 Overpass Simple Scraper (Food & Nightlife only)');
  console.log(`   Dry run: ${dryRun}\n`);
  
  let total = 0;
  
  if (all) {
    for (const cat of Object.keys(QUERIES)) {
      total += await scrape(cat, dryRun);
      await new Promise(r => setTimeout(r, 3000)); // Be nice to OSM
    }
  } else {
    total = await scrape('restaurants', dryRun);
  }
  
  console.log(`\n✅ Total: ${total} venues`);
  
  const { count } = await supabase.from('venues').select('*', { count: 'exact', head: true });
  console.log(`📊 Database now has: ${count} venues`);
}

main().catch(console.error);
