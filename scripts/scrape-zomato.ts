/**
 * Zomato Scraper for BangaloreLife.com
 * Enriches venue data with cuisine types, ratings, price_for_two, and popular dishes
 * 
 * Usage: pnpm tsx scripts/scrape-zomato.ts [--neighborhood=koramangala] [--limit=100]
 */

import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Zomato search by area
const ZOMATO_AREAS: Record<string, string> = {
  'koramangala': 'koramangala-bangalore',
  'indiranagar': 'indiranagar-bangalore',
  'whitefield': 'whitefield-bangalore',
  'hsr-layout': 'hsr-layout-bangalore',
  'jp-nagar': 'jp-nagar-bangalore',
  'jayanagar': 'jayanagar-bangalore',
  'mg-road': 'mg-road-bangalore',
  'brigade-road': 'brigade-road-bangalore',
  'church-street': 'church-street-bangalore',
  'electronic-city': 'electronic-city-bangalore',
  'marathahalli': 'marathahalli-bangalore',
  'btm-layout': 'btm-layout-bangalore',
  'bannerghatta-road': 'bannerghatta-road-bangalore',
  'malleshwaram': 'malleshwaram-bangalore',
  'rajajinagar': 'rajajinagar-bangalore',
  'yelahanka': 'yelahanka-bangalore',
  'hebbal': 'hebbal-bangalore',
  'sarjapur-road': 'sarjapur-road-bangalore',
  'bellandur': 'bellandur-bangalore',
  'hennur': 'hennur-bangalore',
  'kalyan-nagar': 'kalyan-nagar-bangalore',
  'frazer-town': 'frazer-town-bangalore',
  'bangalore-central': 'bangalore'
};

interface ZomatoRestaurant {
  name: string;
  cuisines: string[];
  rating: number | null;
  votes: number | null;
  priceForTwo: number | null;
  address: string | null;
  popularDishes: string[];
  zomatoUrl: string;
}

// Rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retry
async function fetchWithRetry(url: string, retries = 3): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Cache-Control': 'no-cache',
        }
      });
      
      if (response.ok) {
        return await response.text();
      }
      
      if (response.status === 429) {
        console.log(`Rate limited, waiting ${(i + 1) * 5} seconds...`);
        await delay((i + 1) * 5000);
        continue;
      }
      
      console.error(`HTTP ${response.status} for ${url}`);
      return null;
    } catch (error: any) {
      console.error(`Fetch error (attempt ${i + 1}):`, error.message);
      await delay(2000);
    }
  }
  return null;
}

// Parse Zomato restaurant listing page
function parseZomatoListPage(html: string): ZomatoRestaurant[] {
  const $ = cheerio.load(html);
  const restaurants: ZomatoRestaurant[] = [];

  // Zomato's structure varies, try multiple selectors
  $('[data-testid="resturant-card"], .search-result, .sc-eLgOdN').each((_, el) => {
    try {
      const $el = $(el);
      
      // Try different name selectors
      let name = $el.find('h4').first().text().trim() ||
                 $el.find('[data-testid="res-name"]').text().trim() ||
                 $el.find('.result-title').text().trim() ||
                 $el.find('a').first().text().trim();
      
      if (!name) return;

      // Cuisines
      let cuisineText = $el.find('[data-testid="cuisine-info"]').text() ||
                        $el.find('.cuisine').text() ||
                        $el.find('.sc-iJuUWI').text();
      const cuisines = cuisineText.split(',').map(c => c.trim()).filter(c => c);

      // Rating
      let ratingText = $el.find('[data-testid="rating"]').text() ||
                       $el.find('.rating-value').text() ||
                       $el.find('.sc-fmciRz').text();
      const rating = parseFloat(ratingText) || null;

      // Price for two
      let priceText = $el.find('[data-testid="cost-for-two"]').text() ||
                      $el.find('.cost').text();
      const priceMatch = priceText.match(/₹\s*([\d,]+)/);
      const priceForTwo = priceMatch ? parseInt(priceMatch[1].replace(',', '')) : null;

      // URL
      const href = $el.find('a').first().attr('href') || '';
      const zomatoUrl = href.startsWith('http') ? href : `https://www.zomato.com${href}`;

      restaurants.push({
        name,
        cuisines,
        rating,
        votes: null,
        priceForTwo,
        address: null,
        popularDishes: [],
        zomatoUrl
      });
    } catch (e) {
      // Skip invalid entries
    }
  });

  return restaurants;
}

// Search Zomato for a specific restaurant
async function searchZomato(restaurantName: string, area: string): Promise<ZomatoRestaurant | null> {
  const searchQuery = encodeURIComponent(`${restaurantName} ${area}`);
  const url = `https://www.zomato.com/bangalore/search?q=${searchQuery}`;
  
  const html = await fetchWithRetry(url);
  if (!html) return null;

  const results = parseZomatoListPage(html);
  
  // Find best match by name similarity
  const nameNormalized = restaurantName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const result of results) {
    const resultNormalized = result.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if names are similar (contains check)
    if (resultNormalized.includes(nameNormalized) || nameNormalized.includes(resultNormalized)) {
      return result;
    }
    
    // Fuzzy match - at least 70% of characters match
    const longer = Math.max(nameNormalized.length, resultNormalized.length);
    const commonChars = nameNormalized.split('').filter(c => resultNormalized.includes(c)).length;
    if (commonChars / longer > 0.7) {
      return result;
    }
  }

  return null;
}

// Scrape Zomato area listing for bulk data
async function scrapeZomatoArea(zomatoArea: string, page = 1): Promise<ZomatoRestaurant[]> {
  const url = `https://www.zomato.com/bangalore/${zomatoArea}/restaurants?page=${page}`;
  console.log(`Fetching: ${url}`);
  
  const html = await fetchWithRetry(url);
  if (!html) return [];

  return parseZomatoListPage(html);
}

// Match Zomato data to existing venues
function matchVenue(venue: any, zomatoRestaurants: ZomatoRestaurant[]): ZomatoRestaurant | null {
  const venueName = venue.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const zr of zomatoRestaurants) {
    const zrName = zr.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Exact match
    if (venueName === zrName) return zr;
    
    // Contains match
    if (venueName.includes(zrName) || zrName.includes(venueName)) return zr;
    
    // Fuzzy match (70% similarity)
    const longer = Math.max(venueName.length, zrName.length);
    let matches = 0;
    for (let i = 0; i < Math.min(venueName.length, zrName.length); i++) {
      if (venueName[i] === zrName[i]) matches++;
    }
    if (matches / longer > 0.7) return zr;
  }
  
  return null;
}

// Update venue with Zomato data
async function updateVenueWithZomatoData(venueId: string, zomatoData: ZomatoRestaurant): Promise<boolean> {
  try {
    const updateData: any = {};
    
    if (zomatoData.cuisines.length > 0) {
      updateData.cuisine_types = zomatoData.cuisines;
    }
    
    if (zomatoData.rating) {
      updateData.zomato_rating = zomatoData.rating;
    }
    
    if (zomatoData.priceForTwo) {
      updateData.price_for_two = zomatoData.priceForTwo;
      // Derive price_range
      if (zomatoData.priceForTwo < 500) updateData.price_range = '₹';
      else if (zomatoData.priceForTwo < 1000) updateData.price_range = '₹₹';
      else if (zomatoData.priceForTwo < 2000) updateData.price_range = '₹₹₹';
      else updateData.price_range = '₹₹₹₹';
    }
    
    if (zomatoData.popularDishes.length > 0) {
      updateData.popular_dishes = zomatoData.popularDishes;
    }
    
    if (zomatoData.zomatoUrl) {
      updateData.zomato_url = zomatoData.zomatoUrl;
    }

    if (Object.keys(updateData).length === 0) return false;

    const { error } = await supabase
      .from('venues')
      .update(updateData)
      .eq('id', venueId);

    if (error) {
      console.error(`Failed to update ${venueId}:`, error.message);
      return false;
    }

    return true;
  } catch (e: any) {
    console.error(`Error updating venue:`, e.message);
    return false;
  }
}

// Main enrichment function
async function enrichVenues(options: { neighborhood?: string; limit?: number }) {
  console.log('🍕 Zomato Venue Enrichment Starting...\n');

  // Get venues that need enrichment
  let query = supabase
    .from('venues')
    .select('id, name, neighborhood, type, cuisine_types')
    .in('type', ['restaurant', 'cafe', 'bar', 'pub', 'brewery', 'bakery'])
    .eq('is_active', true);

  if (options.neighborhood) {
    query = query.eq('neighborhood', options.neighborhood);
  }

  // Prioritize venues without cuisine data
  query = query.or('cuisine_types.is.null,cuisine_types.eq.{}');

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data: venues, error } = await query;

  if (error) {
    console.error('Database error:', error.message);
    return;
  }

  console.log(`Found ${venues?.length || 0} venues to enrich\n`);

  if (!venues || venues.length === 0) return;

  // Group venues by neighborhood
  const venuesByNeighborhood: Record<string, any[]> = {};
  for (const venue of venues) {
    const hood = venue.neighborhood || 'bangalore-central';
    if (!venuesByNeighborhood[hood]) venuesByNeighborhood[hood] = [];
    venuesByNeighborhood[hood].push(venue);
  }

  let enriched = 0;
  let failed = 0;

  // Process each neighborhood
  for (const [neighborhood, neighborhoodVenues] of Object.entries(venuesByNeighborhood)) {
    const zomatoArea = ZOMATO_AREAS[neighborhood] || 'bangalore';
    console.log(`\n📍 Processing ${neighborhood} (${neighborhoodVenues.length} venues)`);
    
    // Fetch Zomato data for this area (multiple pages)
    const allZomatoRestaurants: ZomatoRestaurant[] = [];
    for (let page = 1; page <= 3; page++) {
      const pageResults = await scrapeZomatoArea(zomatoArea, page);
      allZomatoRestaurants.push(...pageResults);
      if (pageResults.length < 10) break; // No more pages
      await delay(1500); // Rate limiting
    }

    console.log(`  Found ${allZomatoRestaurants.length} Zomato restaurants`);

    // Match and update venues
    for (const venue of neighborhoodVenues) {
      // Try to match from area scrape first
      let match = matchVenue(venue, allZomatoRestaurants);
      
      // If no match, try direct search
      if (!match) {
        console.log(`  🔍 Searching: ${venue.name}`);
        match = await searchZomato(venue.name, neighborhood);
        await delay(1000);
      }

      if (match) {
        const updated = await updateVenueWithZomatoData(venue.id, match);
        if (updated) {
          console.log(`  ✅ ${venue.name} → ${match.cuisines.join(', ')}`);
          enriched++;
        } else {
          failed++;
        }
      } else {
        console.log(`  ❌ No match: ${venue.name}`);
        failed++;
      }
    }

    // Rate limiting between neighborhoods
    await delay(2000);
  }

  console.log(`\n📊 Enrichment Complete!`);
  console.log(`   ✅ Enriched: ${enriched}`);
  console.log(`   ❌ Failed: ${failed}`);
}

// Parse CLI args
const args = process.argv.slice(2);
const options: { neighborhood?: string; limit?: number } = {};

for (const arg of args) {
  if (arg.startsWith('--neighborhood=')) {
    options.neighborhood = arg.split('=')[1];
  }
  if (arg.startsWith('--limit=')) {
    options.limit = parseInt(arg.split('=')[1]);
  }
}

enrichVenues(options);
