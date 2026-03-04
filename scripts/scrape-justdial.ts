#!/usr/bin/env npx ts-node
/**
 * JustDial Hotel Scraper
 * Scrapes hotel listings from JustDial Bangalore
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// JustDial search URLs for different hotel categories
const JUSTDIAL_URLS = [
  'https://www.justdial.com/Bangalore/Hotels/nct-10255012',
  'https://www.justdial.com/Bangalore/Budget-Hotels/nct-10964314',
  'https://www.justdial.com/Bangalore/Luxury-Hotels/nct-10964313',
  'https://www.justdial.com/Bangalore/3-Star-Hotels/nct-10269456',
  'https://www.justdial.com/Bangalore/4-Star-Hotels/nct-10269457',
  'https://www.justdial.com/Bangalore/5-Star-Hotels/nct-10269458',
  'https://www.justdial.com/Bangalore/Service-Apartments/nct-10255082',
  'https://www.justdial.com/Bangalore/Guest-Houses/nct-10255030',
  'https://www.justdial.com/Bangalore/Hostels/nct-10255044',
  'https://www.justdial.com/Bangalore/Lodges/nct-10255056',
];

// Area-specific searches
const AREAS = [
  'Koramangala', 'Indiranagar', 'Whitefield', 'Marathahalli', 'Electronic-City',
  'MG-Road', 'Brigade-Road', 'Jayanagar', 'JP-Nagar', 'Banashankari',
  'HSR-Layout', 'BTM-Layout', 'Hebbal', 'Yelahanka', 'Malleshwaram',
  'Rajajinagar', 'Yeshwanthpur', 'Bellandur', 'Sarjapur-Road', 'Hennur',
];

interface JustDialListing {
  name: string;
  address: string;
  phone?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
}

async function fetchJustDialPage(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.justdial.com/',
      }
    });
    return await res.text();
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    return '';
  }
}

function parseJustDialHtml(html: string): JustDialListing[] {
  const listings: JustDialListing[] = [];
  
  // Extract business listings using regex patterns
  // JustDial uses specific class names for listings
  
  // Look for store names
  const nameMatches = html.matchAll(/class="[^"]*store-name[^"]*"[^>]*>([^<]+)</gi);
  const names = [...nameMatches].map(m => m[1].trim());
  
  // Look for addresses  
  const addressMatches = html.matchAll(/class="[^"]*cont[^"]*"[^>]*>([^<]+)</gi);
  const addresses = [...addressMatches].map(m => m[1].trim());
  
  // Look for ratings
  const ratingMatches = html.matchAll(/class="[^"]*rating[^"]*"[^>]*>(\d+\.?\d*)</gi);
  const ratings = [...ratingMatches].map(m => parseFloat(m[1]));
  
  // Combine into listings
  for (let i = 0; i < names.length && i < 50; i++) {
    if (names[i] && names[i].length > 2) {
      listings.push({
        name: names[i],
        address: addresses[i] || 'Bangalore',
        rating: ratings[i] || undefined,
      });
    }
  }
  
  return listings;
}

function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
  const suffix = Math.random().toString(36).substring(2, 12);
  return `${base}-${suffix}`;
}

function extractNeighborhood(address: string): string {
  const neighborhoods: Record<string, string> = {
    'koramangala': 'koramangala', 'indiranagar': 'indiranagar', 'whitefield': 'whitefield',
    'marathahalli': 'marathahalli', 'hsr': 'hsr-layout', 'btm': 'btm-layout',
    'electronic city': 'electronic-city', 'jayanagar': 'jayanagar', 'jp nagar': 'jp-nagar',
    'malleshwaram': 'malleshwaram', 'rajajinagar': 'rajajinagar', 'hebbal': 'hebbal',
    'yelahanka': 'yelahanka', 'majestic': 'majestic', 'mg road': 'mg-road',
    'banashankari': 'banashankari', 'bellandur': 'bellandur', 'sarjapur': 'sarjapur-road',
    'hennur': 'hennur', 'yeshwanthpur': 'yeshwanthpur',
  };
  
  const lower = address.toLowerCase();
  for (const [key, value] of Object.entries(neighborhoods)) {
    if (lower.includes(key)) return value;
  }
  return 'bangalore';
}

async function main() {
  console.log('🔍 JustDial Hotel Scraper\n');
  
  // Get existing hotel names to avoid duplicates
  const { data: existing } = await supabase.from('hotels').select('name');
  const existingNames = new Set(existing?.map(h => h.name.toLowerCase().trim()) || []);
  console.log(`📊 Existing hotels: ${existingNames.size}\n`);
  
  const allListings: JustDialListing[] = [];
  
  // Scrape main category pages
  for (const url of JUSTDIAL_URLS) {
    const category = url.split('/').slice(-1)[0].split('-')[0];
    process.stdout.write(`📍 Fetching ${category}...`);
    
    const html = await fetchJustDialPage(url);
    const listings = parseJustDialHtml(html);
    
    listings.forEach(l => {
      l.category = category;
      allListings.push(l);
    });
    
    console.log(` ${listings.length} found`);
    await new Promise(r => setTimeout(r, 1000)); // Rate limit
  }
  
  // Scrape area-specific pages
  for (const area of AREAS) {
    const url = `https://www.justdial.com/Bangalore/${area}/Hotels/nct-10255012`;
    process.stdout.write(`📍 ${area}...`);
    
    const html = await fetchJustDialPage(url);
    const listings = parseJustDialHtml(html);
    
    listings.forEach(l => allListings.push(l));
    
    console.log(` ${listings.length} found`);
    await new Promise(r => setTimeout(r, 1000));
  }
  
  // Deduplicate
  const uniqueListings = new Map<string, JustDialListing>();
  for (const listing of allListings) {
    const key = listing.name.toLowerCase().trim();
    if (!existingNames.has(key) && !uniqueListings.has(key)) {
      uniqueListings.set(key, listing);
    }
  }
  
  console.log(`\n📥 Inserting ${uniqueListings.size} new hotels from JustDial...`);
  
  let inserted = 0;
  for (const [, listing] of uniqueListings) {
    const hotel = {
      name: listing.name,
      slug: generateSlug(listing.name),
      address: listing.address,
      google_rating: listing.rating,
      hotel_type: listing.category === 'Hostels' ? 'hostel' : 
                  listing.category === 'Service' ? 'apartment' :
                  listing.category === 'Guest' ? 'guesthouse' : 'hotel',
      neighborhood: extractNeighborhood(listing.address),
      source: 'justdial',
      is_active: true,
    };
    
    try {
      const { error } = await supabase.from('hotels').insert(hotel);
      if (!error) {
        inserted++;
        if (inserted % 50 === 0) console.log(`   ✅ ${inserted} inserted...`);
      }
    } catch (err) {}
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Done! Inserted ${inserted} new hotels from JustDial`);
  
  const { count } = await supabase.from('hotels').select('*', { count: 'exact', head: true });
  console.log(`📊 Total hotels now: ${count}`);
}

main().catch(console.error);
