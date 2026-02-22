/**
 * OSM Scraper v2 - With error logging, batching, and all categories
 */

const SUPABASE_URL = 'https://imvanyylhitwmuegepkr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFueXlsaGl0d211ZWdlcGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY2MzIxMSwiZXhwIjoyMDg3MjM5MjExfQ.FPW0JSgwlDkwquy5z6gEqof_1RAdoL-0mH8DMl-hVnU';

const BBOX = '12.75,77.35,13.15,77.85'; // Bangalore

// ALL categories to scrape
const CATEGORIES: Record<string, { amenities?: string[]; shops?: string[]; leisures?: string[]; tourisms?: string[]; type: string }> = {
  // Food & Dining
  restaurants: { amenities: ['restaurant'], type: 'restaurant' },
  cafes: { amenities: ['cafe'], type: 'cafe' },
  fastfood: { amenities: ['fast_food'], type: 'restaurant' },
  bars: { amenities: ['bar'], type: 'bar' },
  pubs: { amenities: ['pub'], type: 'pub' },
  
  // Nightlife
  nightclubs: { amenities: ['nightclub'], type: 'club' },
  
  // Health
  hospitals: { amenities: ['hospital', 'clinic'], type: 'hospital' },
  pharmacies: { amenities: ['pharmacy'], type: 'pharmacy' },
  dentists: { amenities: ['dentist'], type: 'dentist' },
  
  // Fitness
  gyms: { amenities: ['gym'], leisures: ['fitness_centre', 'sports_centre'], type: 'gym' },
  
  // Shopping
  malls: { shops: ['mall', 'department_store'], type: 'mall' },
  supermarkets: { shops: ['supermarket'], type: 'supermarket' },
  
  // Entertainment
  cinemas: { amenities: ['cinema'], type: 'cinema' },
  
  // Services
  banks: { amenities: ['bank'], type: 'bank' },
  atms: { amenities: ['atm'], type: 'atm' },
  
  // Accommodation
  hotels: { tourisms: ['hotel', 'guest_house'], type: 'hotel' },
  
  // Education
  schools: { amenities: ['school', 'college', 'university'], type: 'school' },
  libraries: { amenities: ['library'], type: 'library' },
  
  // Wellness
  spas: { amenities: ['spa'], shops: ['massage'], type: 'spa' },
  
  // Bakeries
  bakeries: { shops: ['bakery'], type: 'bakery' },
};

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
  'hennur': { lat: 13.035, lng: 77.640, r: 2 },
  'kalyan-nagar': { lat: 13.025, lng: 77.635, r: 1.5 },
  'banashankari': { lat: 12.925, lng: 77.546, r: 2.5 },
  'basavanagudi': { lat: 12.941, lng: 77.575, r: 1.5 },
  'rajajinagar': { lat: 12.991, lng: 77.552, r: 2 },
  'vijayanagar': { lat: 12.970, lng: 77.535, r: 2 },
  'bannerghatta-road': { lat: 12.888, lng: 77.597, r: 3 },
  'brookefield': { lat: 12.965, lng: 77.720, r: 2 },
  'mahadevapura': { lat: 12.990, lng: 77.700, r: 2.5 },
  'yelahanka': { lat: 13.100, lng: 77.596, r: 3 },
  'kr-puram': { lat: 13.010, lng: 77.690, r: 2 },
  'rt-nagar': { lat: 13.021, lng: 77.592, r: 1.5 },
};

// Error tracking
const errors: { name: string; reason: string; osmId: number }[] = [];

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

function makeSlug(name: string, area: string, id: number): string {
  return `${name}-${area}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 280) + `-${id}`;
}

async function fetchOSM(category: string): Promise<any[]> {
  const cat = CATEGORIES[category];
  if (!cat) return [];

  const queries: string[] = [];
  
  if (cat.amenities) {
    for (const a of cat.amenities) {
      queries.push(`node["amenity"="${a}"](${BBOX});`);
      queries.push(`way["amenity"="${a}"](${BBOX});`);
    }
  }
  if (cat.shops) {
    for (const s of cat.shops) {
      queries.push(`node["shop"="${s}"](${BBOX});`);
      queries.push(`way["shop"="${s}"](${BBOX});`);
    }
  }
  if (cat.leisures) {
    for (const l of cat.leisures) {
      queries.push(`node["leisure"="${l}"](${BBOX});`);
      queries.push(`way["leisure"="${l}"](${BBOX});`);
    }
  }
  if (cat.tourisms) {
    for (const t of cat.tourisms) {
      queries.push(`node["tourism"="${t}"](${BBOX});`);
      queries.push(`way["tourism"="${t}"](${BBOX});`);
    }
  }

  const q = `[out:json][timeout:90];(${queries.join('')});out center;`;
  
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: `data=${encodeURIComponent(q)}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  
  if (!res.ok) throw new Error(`OSM API error: ${res.status}`);
  
  const data = await res.json();
  return data.elements || [];
}

async function insertVenue(venue: any): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/venues`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(venue),
  });

  if (res.ok) return { ok: true };
  return { ok: false, error: await res.text() };
}

async function checkExists(sourceId: string): Promise<boolean> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/venues?source_id=eq.${encodeURIComponent(sourceId)}&select=id`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  const data = await res.json();
  return data.length > 0;
}

async function getCount(): Promise<number> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/venues?select=id`,
    { headers: { 'apikey': SUPABASE_KEY, 'Prefer': 'count=exact', 'Range': '0-0' } }
  );
  const range = res.headers.get('content-range');
  return range ? parseInt(range.split('/')[1] || '0') : 0;
}

async function processElement(el: any, type: string): Promise<boolean> {
  // Get coordinates
  const lat = el.lat || el.center?.lat;
  const lon = el.lon || el.center?.lon;
  
  if (!lat || !lon) {
    errors.push({ name: el.tags?.name || 'unknown', reason: 'No coordinates', osmId: el.id });
    return false;
  }
  
  const name = el.tags?.name || el.tags?.['name:en'];
  if (!name) {
    // Skip unnamed venues silently - not an error
    return false;
  }

  const sourceId = `osm-${el.type}-${el.id}`;
  
  // Check if already exists
  if (await checkExists(sourceId)) return true;

  const area = findArea(lat, lon);
  const slug = makeSlug(name, area, el.id);

  const venue = {
    name: name.trim().substring(0, 300),
    slug,
    type,
    neighborhood: area,
    address: [el.tags?.['addr:street'], el.tags?.['addr:city'] || 'Bangalore'].filter(Boolean).join(', ') || null,
    latitude: lat,
    longitude: lon,
    phone: (el.tags?.phone || el.tags?.['contact:phone'] || '').substring(0, 50) || null,
    website: (el.tags?.website || el.tags?.['contact:website'] || '').substring(0, 500) || null,
    source: 'osm',
    source_id: sourceId,
    is_active: true,
    cuisine_types: el.tags?.cuisine ? el.tags.cuisine.split(/[;,]/).map((c: string) => c.trim()).filter(Boolean) : [],
    opening_hours: el.tags?.opening_hours ? { raw: el.tags.opening_hours } : null,
  };

  const result = await insertVenue(venue);
  
  if (!result.ok) {
    if (result.error?.includes('duplicate') || result.error?.includes('23505')) {
      // Duplicate slug - retry with timestamp
      venue.slug = `${slug.substring(0, 270)}-${Date.now()}`;
      const retry = await insertVenue(venue);
      if (!retry.ok) {
        errors.push({ name, reason: retry.error?.substring(0, 100) || 'Unknown', osmId: el.id });
        return false;
      }
    } else {
      errors.push({ name, reason: result.error?.substring(0, 100) || 'Unknown', osmId: el.id });
      return false;
    }
  }
  
  return true;
}

async function scrapeCategory(category: string): Promise<{ saved: number; skipped: number; errors: number }> {
  const cat = CATEGORIES[category];
  if (!cat) {
    console.log(`❌ Unknown category: ${category}`);
    return { saved: 0, skipped: 0, errors: 0 };
  }

  console.log(`\n📍 ${category.toUpperCase()}...`);
  
  let elements: any[];
  try {
    elements = await fetchOSM(category);
  } catch (e: any) {
    console.log(`   ❌ OSM fetch error: ${e.message}`);
    return { saved: 0, skipped: 0, errors: 1 };
  }
  
  console.log(`   Found ${elements.length} from OSM`);

  let saved = 0, skipped = 0, errCount = 0;
  const batchSize = 100;
  
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const result = await processElement(el, cat.type);
    
    if (result) saved++;
    else if (!el.tags?.name) skipped++; // Unnamed
    else errCount++;
    
    // Progress every 100
    if ((i + 1) % batchSize === 0) {
      console.log(`   [${i + 1}/${elements.length}] ${saved} saved, ${skipped} unnamed, ${errCount} errors`);
      // Small delay every batch
      await new Promise(r => setTimeout(r, 200));
    }
  }
  
  console.log(`   ✅ ${category}: ${saved} saved, ${skipped} unnamed (skipped), ${errCount} errors`);
  return { saved, skipped, errors: errCount };
}

async function main() {
  const args = process.argv.slice(2);
  const selectedCategory = args.find(a => !a.startsWith('--'));
  const skipDone = args.includes('--skip-done');
  
  console.log('🚀 OSM Scraper v2 - All Categories');
  console.log(`   Initial venue count: ${await getCount()}\n`);
  
  const doneCategories = ['restaurants']; // Already done
  const categoriesToRun = selectedCategory 
    ? [selectedCategory]
    : Object.keys(CATEGORIES).filter(c => !skipDone || !doneCategories.includes(c));
  
  console.log(`   Categories to scrape: ${categoriesToRun.join(', ')}\n`);
  
  let totalSaved = 0;
  
  for (const category of categoriesToRun) {
    const result = await scrapeCategory(category);
    totalSaved += result.saved;
    
    // Delay between categories to be nice to OSM
    await new Promise(r => setTimeout(r, 5000));
  }
  
  console.log(`\n========================================`);
  console.log(`✅ COMPLETE`);
  console.log(`   Total saved this run: ${totalSaved}`);
  console.log(`   Final venue count: ${await getCount()}`);
  
  if (errors.length > 0) {
    console.log(`\n📋 ERROR LOG (${errors.length} errors):`);
    // Group errors by reason
    const byReason: Record<string, number> = {};
    for (const e of errors) {
      const r = e.reason.substring(0, 50);
      byReason[r] = (byReason[r] || 0) + 1;
    }
    for (const [reason, count] of Object.entries(byReason).sort((a, b) => b[1] - a[1])) {
      console.log(`   ${count}x: ${reason}`);
    }
    
    // Show first 5 specific errors
    console.log(`\n   Sample errors:`);
    for (const e of errors.slice(0, 5)) {
      console.log(`   - "${e.name}" (OSM ${e.osmId}): ${e.reason}`);
    }
  }
}

main().catch(console.error);
