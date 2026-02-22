#!/usr/bin/env node
/**
 * Google Places API - Populate Venues from Google Maps
 * 
 * Prerequisites:
 * 1. Google Cloud Console project with Places API enabled
 * 2. API key with Places API access
 * 3. Set GOOGLE_PLACES_API_KEY in .env.local
 * 
 * Usage: node scripts/populate-venues.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GOOGLE_PLACES_API_KEY) {
  console.error('❌ GOOGLE_PLACES_API_KEY not set in .env.local');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Supabase credentials not set in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Bangalore coordinates (city center)
const BANGALORE_LAT = 12.9716;
const BANGALORE_LNG = 77.5946;

// Neighborhoods with approximate coordinates
const NEIGHBORHOODS = [
  { name: 'Koramangala', lat: 12.9279, lng: 77.6271 },
  { name: 'Indiranagar', lat: 12.9784, lng: 77.6408 },
  { name: 'MG Road', lat: 12.9757, lng: 77.6063 },
  { name: 'Whitefield', lat: 12.9698, lng: 77.7500 },
  { name: 'HSR Layout', lat: 12.9116, lng: 77.6389 },
  { name: 'JP Nagar', lat: 12.9063, lng: 77.5857 },
  { name: 'Jayanagar', lat: 12.9308, lng: 77.5838 },
  { name: 'Hennur', lat: 13.0343, lng: 77.6352 },
  { name: 'Sarjapur Road', lat: 12.9107, lng: 77.6845 },
  { name: 'Yelahanka', lat: 13.1007, lng: 77.5963 },
  { name: 'Hebbal', lat: 13.0358, lng: 77.5970 },
  { name: 'Church Street', lat: 12.9756, lng: 77.6068 },
  { name: 'Brigade Road', lat: 12.9726, lng: 77.6077 },
  { name: 'Kalyan Nagar', lat: 13.0270, lng: 77.6378 },
  { name: 'Malleshwaram', lat: 13.0035, lng: 77.5712 },
];

// Venue types to search for
const VENUE_TYPES = [
  { query: 'pub', type: 'pub' },
  { query: 'bar', type: 'bar' },
  { query: 'brewery', type: 'brewery' },
  { query: 'night club', type: 'club' },
  { query: 'rooftop bar', type: 'rooftop' },
  { query: 'lounge', type: 'lounge' },
  { query: 'cafe', type: 'cafe' },
  { query: 'restaurant', type: 'restaurant' },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function mapNeighborhood(address) {
  const lowerAddr = address.toLowerCase();
  for (const hood of NEIGHBORHOODS) {
    if (lowerAddr.includes(hood.name.toLowerCase())) {
      return hood.name.toLowerCase().replace(/\s+/g, '-');
    }
  }
  // Default neighborhood mapping based on address keywords
  if (lowerAddr.includes('koramangala')) return 'koramangala';
  if (lowerAddr.includes('indiranagar')) return 'indiranagar';
  if (lowerAddr.includes('mg road') || lowerAddr.includes('m.g. road')) return 'mg-road';
  if (lowerAddr.includes('whitefield')) return 'whitefield';
  if (lowerAddr.includes('hsr')) return 'hsr-layout';
  if (lowerAddr.includes('jp nagar')) return 'jp-nagar';
  if (lowerAddr.includes('jayanagar')) return 'jayanagar';
  if (lowerAddr.includes('hennur')) return 'hennur';
  if (lowerAddr.includes('sarjapur')) return 'sarjapur';
  if (lowerAddr.includes('yelahanka')) return 'yelahanka';
  if (lowerAddr.includes('hebbal')) return 'hebbal';
  if (lowerAddr.includes('church street')) return 'church-street';
  if (lowerAddr.includes('brigade')) return 'brigade-road';
  if (lowerAddr.includes('kalyan nagar')) return 'kalyan-nagar';
  if (lowerAddr.includes('malleshwaram')) return 'malleshwaram';
  return 'bangalore'; // fallback
}

async function searchPlaces(query, lat, lng, radius = 5000) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
  url.searchParams.set('location', `${lat},${lng}`);
  url.searchParams.set('radius', radius);
  url.searchParams.set('keyword', query);
  url.searchParams.set('key', GOOGLE_PLACES_API_KEY);
  
  const res = await fetch(url);
  const data = await res.json();
  
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error(`Error searching places: ${data.status}`, data.error_message);
    return [];
  }
  
  return data.results || [];
}

async function getPlaceDetails(placeId) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'name,formatted_address,formatted_phone_number,website,opening_hours,photos,rating,user_ratings_total,price_level,geometry');
  url.searchParams.set('key', GOOGLE_PLACES_API_KEY);
  
  const res = await fetch(url);
  const data = await res.json();
  
  if (data.status !== 'OK') {
    console.error(`Error getting place details: ${data.status}`, data.error_message);
    return null;
  }
  
  return data.result;
}

function getPhotoUrl(photoReference, maxWidth = 800) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
}

async function upsertVenue(venue) {
  const { data, error } = await supabase
    .from('venues')
    .upsert(venue, { onConflict: 'google_place_id' })
    .select()
    .single();
  
  if (error) {
    console.error(`Error upserting venue ${venue.name}:`, error.message);
    return null;
  }
  
  return data;
}

async function populateVenues() {
  console.log('🚀 Starting venue population from Google Places API\n');
  
  let totalVenues = 0;
  const seenPlaceIds = new Set();
  
  for (const hood of NEIGHBORHOODS) {
    console.log(`\n📍 Searching ${hood.name}...`);
    
    for (const venueType of VENUE_TYPES) {
      const query = `${venueType.query} in ${hood.name} Bangalore`;
      const places = await searchPlaces(query, hood.lat, hood.lng);
      
      console.log(`  Found ${places.length} ${venueType.query}s`);
      
      for (const place of places) {
        if (seenPlaceIds.has(place.place_id)) continue;
        seenPlaceIds.add(place.place_id);
        
        // Get detailed info
        const details = await getPlaceDetails(place.place_id);
        if (!details) continue;
        
        // Build venue object
        const venue = {
          name: details.name,
          slug: slugify(details.name),
          google_place_id: place.place_id,
          google_rating: details.rating || null,
          google_reviews_count: details.user_ratings_total || 0,
          google_price_level: details.price_level || null,
          type: venueType.type,
          neighborhood: mapNeighborhood(details.formatted_address),
          address: details.formatted_address,
          latitude: details.geometry?.location?.lat,
          longitude: details.geometry?.location?.lng,
          phone: details.formatted_phone_number || null,
          website: details.website || null,
          google_maps_url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
          opening_hours: details.opening_hours?.weekday_text || [],
          photos: details.photos?.slice(0, 5).map(p => ({
            reference: p.photo_reference,
            width: p.width,
            height: p.height,
          })) || [],
          cover_photo_url: details.photos?.[0]?.photo_reference 
            ? getPhotoUrl(details.photos[0].photo_reference)
            : null,
          last_google_sync: new Date().toISOString(),
          is_active: true,
        };
        
        const result = await upsertVenue(venue);
        if (result) {
          totalVenues++;
          console.log(`    ✅ ${venue.name} (${venue.google_rating}⭐)`);
        }
        
        // Rate limit: 10 requests per second max
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }
  
  console.log(`\n\n🎉 Done! Populated ${totalVenues} venues`);
}

// Run
populateVenues().catch(console.error);
