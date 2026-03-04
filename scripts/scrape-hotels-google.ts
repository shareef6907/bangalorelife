#!/usr/bin/env npx ts-node
/**
 * Scrape hotels from Google Places API to fill gaps in BangaloreLife
 * Uses Nearby Search with grid-based coverage of Bangalore
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyCtjSJgCurVfeCpvN0EGRD1pfIWSmpe9XE';

// Bangalore coverage grid (center points for nearby search)
const SEARCH_GRID = [
  // Core city
  { name: 'MG Road', lat: 12.9758, lng: 77.6065 },
  { name: 'Majestic', lat: 12.9767, lng: 77.5713 },
  { name: 'Koramangala', lat: 12.9352, lng: 77.6245 },
  { name: 'Indiranagar', lat: 12.9784, lng: 77.6408 },
  { name: 'Jayanagar', lat: 12.9308, lng: 77.5838 },
  { name: 'Basavanagudi', lat: 12.9425, lng: 77.5750 },
  { name: 'Malleshwaram', lat: 13.0035, lng: 77.5646 },
  { name: 'Rajajinagar', lat: 12.9914, lng: 77.5521 },
  
  // East Bangalore
  { name: 'Whitefield', lat: 12.9698, lng: 77.7500 },
  { name: 'Marathahalli', lat: 12.9591, lng: 77.7019 },
  { name: 'Bellandur', lat: 12.9260, lng: 77.6762 },
  { name: 'HSR Layout', lat: 12.9116, lng: 77.6389 },
  { name: 'BTM Layout', lat: 12.9166, lng: 77.6101 },
  { name: 'Electronic City', lat: 12.8456, lng: 77.6603 },
  { name: 'Sarjapur Road', lat: 12.9100, lng: 77.6850 },
  
  // North Bangalore
  { name: 'Hebbal', lat: 13.0358, lng: 77.5970 },
  { name: 'Yelahanka', lat: 13.1007, lng: 77.5963 },
  { name: 'Hennur', lat: 13.0350, lng: 77.6400 },
  { name: 'Nagawara', lat: 13.0450, lng: 77.6200 },
  { name: 'Devanahalli', lat: 13.2473, lng: 77.7139 }, // Airport area
  
  // South Bangalore
  { name: 'JP Nagar', lat: 12.9063, lng: 77.5857 },
  { name: 'Banashankari', lat: 12.9255, lng: 77.5468 },
  { name: 'Bannerghatta Road', lat: 12.8900, lng: 77.5950 },
  
  // West Bangalore
  { name: 'Yeshwanthpur', lat: 13.0280, lng: 77.5400 },
  { name: 'Peenya', lat: 13.0300, lng: 77.5150 },
];

// Hotel types to search
const HOTEL_TYPES = ['lodging', 'hotel'];

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
  priceLevel?: string;
}

async function searchNearby(lat: number, lng: number, radius: number = 5000): Promise<GooglePlace[]> {
  const allPlaces: GooglePlace[] = [];
  
  for (const type of HOTEL_TYPES) {
    const body = {
      includedTypes: [type],
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: radius
        }
      },
      maxResultCount: 20,
      languageCode: 'en'
    };
    
    try {
      const res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.nationalPhoneNumber,places.websiteUri,places.photos,places.priceLevel'
        },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      if (data.places) {
        allPlaces.push(...data.places);
      }
    } catch (err) {
      console.error(`Error searching ${type} near ${lat},${lng}:`, err);
    }
    
    await new Promise(r => setTimeout(r, 100)); // Rate limit
  }
  
  return allPlaces;
}

function generateSlug(name: string, placeId: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
  
  // Use last 10 chars of place ID as unique suffix
  const suffix = placeId.replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  return `${base}-${suffix}`;
}

function determineHotelType(types: string[]): string {
  if (types.includes('hostel')) return 'hostel';
  if (types.includes('guest_house')) return 'guesthouse';
  if (types.includes('apartment_building') || types.includes('apartment')) return 'apartment';
  if (types.includes('resort')) return 'resort';
  return 'hotel';
}

function determineNeighborhood(address: string, lat: number, lng: number): string {
  // Simple neighborhood detection from address
  const neighborhoods: Record<string, string> = {
    'koramangala': 'koramangala',
    'indiranagar': 'indiranagar',
    'whitefield': 'whitefield',
    'marathahalli': 'marathahalli',
    'hsr': 'hsr-layout',
    'btm': 'btm-layout',
    'electronic city': 'electronic-city',
    'jayanagar': 'jayanagar',
    'jp nagar': 'jp-nagar',
    'malleshwaram': 'malleshwaram',
    'rajajinagar': 'rajajinagar',
    'hebbal': 'hebbal',
    'yelahanka': 'yelahanka',
    'majestic': 'majestic',
    'mg road': 'mg-road',
    'brigade road': 'mg-road',
    'church street': 'church-street',
    'richmond': 'richmond-town',
    'lavelle': 'lavelle-road',
    'basavanagudi': 'basavanagudi',
    'banashankari': 'banashankari',
    'bellandur': 'bellandur',
    'sarjapur': 'sarjapur-road',
    'cunningham': 'cunningham-road',
    'domlur': 'domlur',
    'hennur': 'hennur',
    'yeshwanthpur': 'yeshwanthpur',
    'peenya': 'peenya',
    'devanahalli': 'devanahalli',
    'ulsoor': 'ulsoor',
    'shivajinagar': 'shivajinagar',
  };
  
  const lowerAddress = address.toLowerCase();
  for (const [key, value] of Object.entries(neighborhoods)) {
    if (lowerAddress.includes(key)) return value;
  }
  
  return 'other';
}

async function main() {
  console.log('🏨 BangaloreLife Hotel Scraper (Google Places API)\n');
  
  // Get existing google_place_ids to avoid duplicates
  const { data: existing } = await supabase
    .from('hotels')
    .select('google_place_id');
  
  const existingIds = new Set(existing?.map(h => h.google_place_id) || []);
  console.log(`📊 Existing hotels: ${existingIds.size}`);
  
  let totalFound = 0;
  let totalNew = 0;
  let totalInserted = 0;
  
  for (const area of SEARCH_GRID) {
    console.log(`\n📍 Searching: ${area.name}...`);
    
    const places = await searchNearby(area.lat, area.lng);
    const uniquePlaces = places.filter((p, i, arr) => 
      arr.findIndex(x => x.id === p.id) === i
    );
    
    totalFound += uniquePlaces.length;
    
    const newPlaces = uniquePlaces.filter(p => !existingIds.has(p.id));
    totalNew += newPlaces.length;
    
    console.log(`   Found: ${uniquePlaces.length} | New: ${newPlaces.length}`);
    
    // Insert new hotels
    for (const place of newPlaces) {
      const hotel = {
        name: place.displayName.text,
        slug: generateSlug(place.displayName.text, place.id),
        address: place.formattedAddress || '',
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
        google_place_id: place.id,
        google_rating: place.rating,
        google_review_count: place.userRatingCount,
        hotel_type: determineHotelType(place.types || []),
        neighborhood: determineNeighborhood(place.formattedAddress || '', place.location?.latitude || 0, place.location?.longitude || 0),
        phone: place.nationalPhoneNumber,
        website: place.websiteUri,
        featured_photo: place.photos?.[0]?.name 
          ? `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxWidthPx=800&key=${API_KEY}`
          : null,
        source: 'google_places',
        source_id: place.id,
        is_active: true,
        is_verified: false,
      };
      
      try {
        const { error } = await supabase.from('hotels').insert(hotel);
        if (error) {
          if (error.code === '23505') { // Duplicate
            console.log(`   ⏭️  Skip duplicate: ${hotel.name}`);
          } else {
            console.error(`   ❌ Error inserting ${hotel.name}:`, error.message);
          }
        } else {
          totalInserted++;
          existingIds.add(place.id);
          console.log(`   ✅ Added: ${hotel.name}`);
        }
      } catch (err) {
        console.error(`   ❌ Error:`, err);
      }
    }
    
    await new Promise(r => setTimeout(r, 500)); // Rate limit between areas
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total found from Google: ${totalFound}`);
  console.log(`New (not in DB): ${totalNew}`);
  console.log(`Successfully inserted: ${totalInserted}`);
  console.log(`Final hotel count: ${existingIds.size}`);
}

main().catch(console.error);
