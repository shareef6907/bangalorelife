/**
 * Google Places API (New) Enrichment Script
 * 
 * Uses the official Google Places API to enrich venues with:
 * - Rating and review count
 * - Phone number (formatted for India)
 * - Opening hours (full weekly schedule)
 * - Photos (cover photo URL)
 * - Google Place ID
 * - Editorial summary/description
 * - Price level
 * 
 * Cost-optimized: Uses field masks to minimize API costs
 * 
 * Run: npx tsx scripts/enrich-google-places.ts [limit] [--resume]
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const PROGRESS_FILE = './scripts/.places-api-progress.json';
const BATCH_SIZE = 100;
const DELAY_MS = 1000; // 1 second between requests
const MAX_BUDGET = 85; // USD

// Google Places API (New) pricing per request
// Text Search with different field tiers:
// - Basic (id, displayName, types): $0.032 base
// - Contact (+phone, address): adds to base
// - Atmosphere (+rating, reviews, priceLevel): adds to base
// - Advanced (+hours, photos): $0.065 total
const COST_PER_SEARCH = 0.065; // Using advanced tier for full data

interface Progress {
  lastVenueId: string | null;
  lastHotelId: string | null;
  venuesProcessed: number;
  hotelsProcessed: number;
  venuesUpdated: number;
  hotelsUpdated: number;
  totalCost: number;
  lastUpdated: string;
}

interface PlaceResult {
  id: string;
  displayName?: { text: string };
  rating?: number;
  userRatingCount?: number;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  regularOpeningHours?: {
    weekdayDescriptions?: string[];
    openNow?: boolean;
  };
  photos?: Array<{ name: string }>;
  editorialSummary?: { text: string };
  priceLevel?: string;
  formattedAddress?: string;
}

function loadProgress(): Progress {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
    }
  } catch (e) {}
  return { 
    lastVenueId: null,
    lastHotelId: null,
    venuesProcessed: 0,
    hotelsProcessed: 0,
    venuesUpdated: 0,
    hotelsUpdated: 0,
    totalCost: 0,
    lastUpdated: new Date().toISOString()
  };
}

function saveProgress(progress: Progress) {
  progress.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

/**
 * Search for a place using Google Places API (New) Text Search
 * Returns place details in one efficient call
 */
async function searchPlace(name: string, area: string): Promise<PlaceResult | null> {
  const query = `${name} ${area} Bangalore India`;
  
  // Field mask - only request what we need (cost optimization)
  const fieldMask = [
    'places.id',
    'places.displayName',
    'places.rating',
    'places.userRatingCount',
    'places.nationalPhoneNumber',
    'places.internationalPhoneNumber',
    'places.regularOpeningHours',
    'places.photos',
    'places.editorialSummary',
    'places.priceLevel',
    'places.formattedAddress'
  ].join(',');
  
  try {
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': fieldMask
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'en',
        regionCode: 'IN',
        maxResultCount: 1
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.log(`    API error: ${response.status} - ${error.slice(0, 100)}`);
      return null;
    }

    const data = await response.json();
    
    if (data.places && data.places.length > 0) {
      return data.places[0] as PlaceResult;
    }
    
    return null;
  } catch (error: any) {
    console.log(`    Request error: ${error.message.slice(0, 50)}`);
    return null;
  }
}

/**
 * Get photo URL from photo reference
 * Photos API: https://places.googleapis.com/v1/{photo_name}/media
 */
function getPhotoUrl(photoName: string, maxWidth: number = 800): string {
  return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${GOOGLE_PLACES_API_KEY}`;
}

/**
 * Convert price level enum to symbol
 */
function formatPriceLevel(priceLevel?: string): string | null {
  const mapping: Record<string, string> = {
    'PRICE_LEVEL_FREE': 'Free',
    'PRICE_LEVEL_INEXPENSIVE': '₹',
    'PRICE_LEVEL_MODERATE': '₹₹',
    'PRICE_LEVEL_EXPENSIVE': '₹₹₹',
    'PRICE_LEVEL_VERY_EXPENSIVE': '₹₹₹₹'
  };
  return priceLevel ? mapping[priceLevel] || null : null;
}

/**
 * Enrich venues from database
 */
async function enrichVenues(limit: number, startAfterId?: string, progress: Progress): Promise<void> {
  console.log('\n📍 Enriching venues with Google Places API...\n');
  
  // Priority types first
  const priorityTypes = ['restaurant', 'cafe', 'bar', 'pub', 'brewery', 'bakery', 'lounge'];
  
  let query = supabase
    .from('venues')
    .select('id, name, neighborhood, type, google_place_id')
    .is('google_place_id', null) // Only venues without place_id (not yet enriched)
    .eq('is_active', true)
    .in('type', priorityTypes)
    .order('id', { ascending: true })
    .limit(limit);
  
  if (startAfterId) {
    query = query.gt('id', startAfterId);
  }
  
  const { data: venues, error } = await query;
  
  if (error) {
    console.error('Database error:', error);
    return;
  }
  
  if (!venues || venues.length === 0) {
    console.log('No venues need enrichment');
    return;
  }
  
  console.log(`Found ${venues.length} venues to enrich`);
  console.log(`Current cost: $${progress.totalCost.toFixed(2)} / $${MAX_BUDGET}\n`);
  
  for (let i = 0; i < venues.length; i++) {
    // Check budget
    if (progress.totalCost >= MAX_BUDGET) {
      console.log(`\n⚠️ Budget limit reached ($${progress.totalCost.toFixed(2)}). Stopping.`);
      break;
    }
    
    const venue = venues[i];
    const pct = ((i + 1) / venues.length * 100).toFixed(1);
    const area = venue.neighborhood?.replace(/-/g, ' ') || '';
    
    console.log(`[${i + 1}/${venues.length}] (${pct}%) ${venue.name}...`);
    
    const place = await searchPlace(venue.name, area);
    progress.totalCost += COST_PER_SEARCH;
    progress.venuesProcessed++;
    
    if (place) {
      const updates: any = {
        google_place_id: place.id,
        last_scraped_at: new Date().toISOString()
      };
      
      if (place.rating) {
        updates.google_rating = place.rating;
      }
      if (place.userRatingCount) {
        updates.google_reviews_count = place.userRatingCount;
      }
      if (place.nationalPhoneNumber || place.internationalPhoneNumber) {
        updates.phone = place.nationalPhoneNumber || place.internationalPhoneNumber;
      }
      if (place.regularOpeningHours?.weekdayDescriptions) {
        updates.opening_hours = place.regularOpeningHours.weekdayDescriptions;
      }
      if (place.photos && place.photos.length > 0) {
        updates.cover_photo_url = getPhotoUrl(place.photos[0].name);
      }
      if (place.editorialSummary?.text) {
        updates.description = place.editorialSummary.text;
      }
      if (place.priceLevel) {
        updates.price_range = formatPriceLevel(place.priceLevel);
      }
      if (place.formattedAddress) {
        updates.address = place.formattedAddress;
      }
      
      const { error: updateError } = await supabase
        .from('venues')
        .update(updates)
        .eq('id', venue.id);
      
      if (!updateError) {
        const parts = [];
        if (updates.google_rating) parts.push(`${updates.google_rating}★`);
        if (updates.phone) parts.push('📞');
        if (updates.opening_hours) parts.push('🕐');
        if (updates.cover_photo_url) parts.push('📷');
        console.log(`    ✅ ${parts.join(' ') || 'place_id only'}`);
        progress.venuesUpdated++;
      } else {
        console.log(`    ❌ Update failed: ${updateError.message}`);
      }
    } else {
      console.log(`    ⏭️ Not found`);
    }
    
    progress.lastVenueId = venue.id;
    
    // Save progress every 10 venues
    if (i % 10 === 0) {
      saveProgress(progress);
      console.log(`    💰 Cost so far: $${progress.totalCost.toFixed(2)}`);
    }
    
    // Rate limit
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
  
  saveProgress(progress);
}

/**
 * Enrich hotels from database
 */
async function enrichHotels(limit: number, startAfterId?: string, progress: Progress): Promise<void> {
  console.log('\n🏨 Enriching hotels with Google Places API...\n');
  
  let query = supabase
    .from('hotels')
    .select('id, name, neighborhood, google_place_id')
    .is('google_place_id', null)
    .eq('is_active', true)
    .order('id', { ascending: true })
    .limit(limit);
  
  if (startAfterId) {
    query = query.gt('id', startAfterId);
  }
  
  const { data: hotels, error } = await query;
  
  if (error) {
    console.error('Database error:', error);
    return;
  }
  
  if (!hotels || hotels.length === 0) {
    console.log('No hotels need enrichment');
    return;
  }
  
  console.log(`Found ${hotels.length} hotels to enrich`);
  console.log(`Current cost: $${progress.totalCost.toFixed(2)} / $${MAX_BUDGET}\n`);
  
  for (let i = 0; i < hotels.length; i++) {
    if (progress.totalCost >= MAX_BUDGET) {
      console.log(`\n⚠️ Budget limit reached ($${progress.totalCost.toFixed(2)}). Stopping.`);
      break;
    }
    
    const hotel = hotels[i];
    const pct = ((i + 1) / hotels.length * 100).toFixed(1);
    const area = hotel.neighborhood?.replace(/-/g, ' ') || '';
    
    console.log(`[${i + 1}/${hotels.length}] (${pct}%) ${hotel.name}...`);
    
    // Add "hotel" to search for better accuracy
    const place = await searchPlace(`${hotel.name} hotel`, area);
    progress.totalCost += COST_PER_SEARCH;
    progress.hotelsProcessed++;
    
    if (place) {
      const updates: any = {
        google_place_id: place.id
      };
      
      if (place.rating) {
        updates.google_rating = place.rating;
      }
      if (place.userRatingCount) {
        updates.google_review_count = place.userRatingCount;
      }
      if (place.nationalPhoneNumber || place.internationalPhoneNumber) {
        updates.phone = place.nationalPhoneNumber || place.internationalPhoneNumber;
      }
      if (place.photos && place.photos.length > 0) {
        updates.featured_photo = getPhotoUrl(place.photos[0].name);
      }
      if (place.editorialSummary?.text) {
        updates.description = place.editorialSummary.text;
      }
      if (place.formattedAddress) {
        updates.address = place.formattedAddress;
      }
      
      const { error: updateError } = await supabase
        .from('hotels')
        .update(updates)
        .eq('id', hotel.id);
      
      if (!updateError) {
        const parts = [];
        if (updates.google_rating) parts.push(`${updates.google_rating}★`);
        if (updates.phone) parts.push('📞');
        if (updates.featured_photo) parts.push('📷');
        console.log(`    ✅ ${parts.join(' ') || 'place_id only'}`);
        progress.hotelsUpdated++;
      } else {
        console.log(`    ❌ Update failed: ${updateError.message}`);
      }
    } else {
      console.log(`    ⏭️ Not found`);
    }
    
    progress.lastHotelId = hotel.id;
    
    if (i % 10 === 0) {
      saveProgress(progress);
      console.log(`    💰 Cost so far: $${progress.totalCost.toFixed(2)}`);
    }
    
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
  
  saveProgress(progress);
}

async function main() {
  console.log('🗺️ Google Places API Enrichment for BangaloreLife');
  console.log('==================================================\n');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
  }

  if (!GOOGLE_PLACES_API_KEY) {
    console.error('❌ Missing GOOGLE_PLACES_API_KEY environment variable');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const limit = parseInt(args.find(a => !a.startsWith('--')) || '5000');
  const resume = args.includes('--resume');
  
  const progress = loadProgress();
  
  console.log('📋 Progress Summary:');
  console.log(`   Venues: ${progress.venuesProcessed} processed, ${progress.venuesUpdated} updated`);
  console.log(`   Hotels: ${progress.hotelsProcessed} processed, ${progress.hotelsUpdated} updated`);
  console.log(`   Total cost: $${progress.totalCost.toFixed(2)} / $${MAX_BUDGET}`);
  console.log(`   Last run: ${progress.lastUpdated}`);
  console.log(`\n🎯 Limit: ${limit} venues | Resume: ${resume}\n`);

  // Estimate cost
  const estimatedCost = limit * COST_PER_SEARCH;
  console.log(`💰 Estimated cost for ${limit} venues: $${estimatedCost.toFixed(2)}`);
  
  if (progress.totalCost + estimatedCost > MAX_BUDGET) {
    const remaining = Math.floor((MAX_BUDGET - progress.totalCost) / COST_PER_SEARCH);
    console.log(`⚠️ Budget warning: Can only process ~${remaining} more venues within $${MAX_BUDGET} budget`);
  }
  
  console.log('\nStarting in 3 seconds... (Ctrl+C to cancel)\n');
  await new Promise(r => setTimeout(r, 3000));

  try {
    // Phase 1: Priority venues (restaurants, cafes, bars, pubs)
    const venueLimit = Math.min(limit, Math.floor((MAX_BUDGET - progress.totalCost) / COST_PER_SEARCH));
    if (venueLimit > 0) {
      await enrichVenues(
        venueLimit,
        resume ? progress.lastVenueId : undefined,
        progress
      );
    }
    
    // Phase 2: Hotels (if budget remains)
    const remainingBudget = MAX_BUDGET - progress.totalCost;
    const hotelLimit = Math.min(992, Math.floor(remainingBudget / COST_PER_SEARCH));
    
    if (hotelLimit > 100) {
      console.log(`\n💰 Remaining budget: $${remainingBudget.toFixed(2)} - enriching ${hotelLimit} hotels`);
      await enrichHotels(
        hotelLimit,
        resume ? progress.lastHotelId : undefined,
        progress
      );
    }
    
    // Final summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 FINAL SUMMARY');
    console.log('='.repeat(50));
    console.log(`Venues: ${progress.venuesProcessed} processed, ${progress.venuesUpdated} enriched`);
    console.log(`Hotels: ${progress.hotelsProcessed} processed, ${progress.hotelsUpdated} enriched`);
    console.log(`Total cost: $${progress.totalCost.toFixed(2)}`);
    console.log(`Remaining budget: $${(MAX_BUDGET - progress.totalCost).toFixed(2)}`);
    console.log('='.repeat(50));
    
    saveProgress(progress);
    console.log('\n✅ Done!');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    saveProgress(progress);
  }
}

main();
