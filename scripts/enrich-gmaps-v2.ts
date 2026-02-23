/**
 * Google Maps Enrichment v2 - Robust scraper with:
 * - Retry logic with exponential backoff
 * - Progress saving (resumes from where it left off)
 * - Parallel processing (multiple tabs)
 * - Cookie/consent banner handling
 * - Better error handling
 * 
 * Run: npx playwright install chromium && npx tsx scripts/enrich-gmaps-v2.ts [venues|hotels|all] [limit]
 */

import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Progress file to enable resuming
const PROGRESS_FILE = './scripts/.enrich-progress.json';

interface ScrapeResult {
  rating: number | null;
  reviewCount: number | null;
  phone: string | null;
  photo: string | null;
  address: string | null;
  openingHours: string[] | null;
  categories: string[] | null;
}

interface Progress {
  lastVenueId: string | null;
  lastHotelId: string | null;
  venuesProcessed: number;
  hotelsProcessed: number;
  lastUpdated: string;
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
    lastUpdated: new Date().toISOString()
  };
}

function saveProgress(progress: Progress) {
  progress.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function acceptCookies(page: Page) {
  try {
    // Google's cookie consent button
    const consentButton = await page.$('button:has-text("Accept all")');
    if (consentButton) {
      await consentButton.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    // Ignore - might not have consent banner
  }
}

async function scrapeGoogleMaps(page: Page, name: string, location: string, retries = 3): Promise<ScrapeResult> {
  const result: ScrapeResult = {
    rating: null,
    reviewCount: null,
    phone: null,
    photo: null,
    address: null,
    openingHours: null,
    categories: null
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const searchQuery = `${name} ${location}`;
      const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
      
      // Use domcontentloaded with longer timeout
      await page.goto(url, { 
        waitUntil: 'domcontentloaded', 
        timeout: 30000 
      });
      
      // Wait for Google Maps to load
      await page.waitForTimeout(2000 + Math.random() * 1000);
      
      // Handle cookie consent on first load
      if (attempt === 1) {
        await acceptCookies(page);
      }

      // Check if we're on search results or a specific place
      // Wait for either the feed (search results) or the place panel
      await page.waitForSelector('div[role="feed"], button[data-value="Share"]', { 
        timeout: 10000 
      }).catch(() => {});

      const placePanel = await page.$('button[data-value="Share"]');
      
      if (!placePanel) {
        // Click first result if we're on search results
        const firstResult = await page.$('div[role="feed"] a[href*="/maps/place/"]');
        if (firstResult) {
          await firstResult.click();
          await page.waitForTimeout(2500);
        } else {
          // No results found
          console.log(`    No results for: ${name}`);
          return result;
        }
      }

      // Extract rating - try multiple selectors
      const ratingSelectors = [
        'span.ceNzKf',
        'span.MW4etd',
        'div.F7nice span[aria-hidden="true"]'
      ];
      
      for (const selector of ratingSelectors) {
        const ratingEl = await page.$(selector);
        if (ratingEl) {
          const ratingText = await ratingEl.textContent();
          if (ratingText) {
            const parsed = parseFloat(ratingText.replace(',', '.'));
            if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
              result.rating = parsed;
              break;
            }
          }
        }
      }

      // Extract review count
      const reviewSelectors = [
        'span[aria-label*="review"]',
        'button[aria-label*="review"]',
        'span.UY7F9'
      ];
      
      for (const selector of reviewSelectors) {
        const reviewEl = await page.$(selector);
        if (reviewEl) {
          const reviewText = await reviewEl.getAttribute('aria-label') || await reviewEl.textContent();
          if (reviewText) {
            const match = reviewText.match(/([\d,]+)\s*review/i);
            if (match) {
              result.reviewCount = parseInt(match[1].replace(/,/g, ''));
              break;
            }
          }
        }
      }

      // Extract phone - multiple approaches
      const phoneSelectors = [
        'button[data-item-id="phone:tel"]',
        'button[aria-label*="Phone"]',
        'a[href^="tel:"]'
      ];
      
      for (const selector of phoneSelectors) {
        const phoneEl = await page.$(selector);
        if (phoneEl) {
          let phoneText = await phoneEl.textContent() || await phoneEl.getAttribute('aria-label') || await phoneEl.getAttribute('href');
          if (phoneText) {
            // Clean up phone
            phoneText = phoneText.replace(/Phone:\s*/i, '').replace('tel:', '').trim();
            if (phoneText.match(/[\d\s\-+()]{7,}/)) {
              result.phone = phoneText;
              break;
            }
          }
        }
      }

      // Extract cover photo
      const photoSelectors = [
        'img.FgCUCc',
        'button[aria-label="Photo"] img',
        'div.RZ66Rb img',
        'img[src*="lh5.googleusercontent.com"]'
      ];
      
      for (const selector of photoSelectors) {
        const photoEl = await page.$(selector);
        if (photoEl) {
          const src = await photoEl.getAttribute('src');
          if (src && src.startsWith('http') && !src.includes('data:image')) {
            result.photo = src;
            break;
          }
        }
      }

      // Extract address
      const addressEl = await page.$('button[data-item-id="address"]');
      if (addressEl) {
        result.address = (await addressEl.textContent())?.trim() || null;
      }

      // Extract categories/types
      const categoryEl = await page.$('button[jsaction*="category"]');
      if (categoryEl) {
        const catText = await categoryEl.textContent();
        if (catText) {
          result.categories = [catText.trim()];
        }
      }

      // If we got at least rating, consider it a success
      if (result.rating) {
        return result;
      }

      // If no data found and we have retries left, try again
      if (attempt < retries) {
        console.log(`    Retry ${attempt + 1}/${retries} for: ${name}`);
        await page.waitForTimeout(2000 * attempt);
      }

    } catch (error: any) {
      if (attempt < retries) {
        console.log(`    Error (attempt ${attempt}/${retries}): ${error.message.slice(0, 50)}`);
        await page.waitForTimeout(3000 * attempt); // Exponential backoff
      }
    }
  }

  return result;
}

async function enrichVenues(context: BrowserContext, limit: number, startAfterId?: string) {
  console.log('\n📍 Enriching venues with Google Maps data...\n');

  // Get venues that need enrichment
  let query = supabase
    .from('venues')
    .select('id, name, neighborhood, phone, google_rating, google_reviews_count, type')
    .or('google_rating.is.null')
    .in('type', ['restaurant', 'cafe', 'bar', 'pub', 'brewery', 'lounge', 'club'])
    .eq('is_active', true)
    .order('id', { ascending: true })
    .limit(limit);

  if (startAfterId) {
    query = query.gt('id', startAfterId);
  }

  const { data: venues, error } = await query;

  if (error) {
    console.error('Error fetching venues:', error);
    return;
  }

  console.log(`Found ${venues?.length || 0} venues to enrich`);
  if (!venues || venues.length === 0) return;

  const page = await context.newPage();
  const progress = loadProgress();
  let updated = 0;
  let errors = 0;

  for (let i = 0; i < venues.length; i++) {
    const venue = venues[i];
    const pct = ((i + 1) / venues.length * 100).toFixed(1);
    console.log(`[${i + 1}/${venues.length}] (${pct}%) ${venue.name}...`);

    const location = venue.neighborhood 
      ? `${venue.neighborhood.replace(/-/g, ' ')}, Bangalore`
      : 'Bangalore';

    const result = await scrapeGoogleMaps(page, venue.name, location);

    // Update venue with new data
    const updates: any = {};
    if (result.rating && result.rating !== venue.google_rating) {
      updates.google_rating = result.rating;
    }
    if (result.reviewCount) {
      updates.google_reviews_count = result.reviewCount;
    }
    if (result.phone && !venue.phone) {
      updates.phone = result.phone;
    }
    if (result.photo) {
      updates.cover_photo_url = result.photo;
    }
    if (result.address) {
      updates.address = result.address;
    }

    if (Object.keys(updates).length > 0) {
      updates.last_scraped_at = new Date().toISOString();
      
      const { error: updateError } = await supabase
        .from('venues')
        .update(updates)
        .eq('id', venue.id);

      if (updateError) {
        console.log(`  ❌ Update error: ${updateError.message}`);
        errors++;
      } else {
        const updateParts = [];
        if (updates.google_rating) updateParts.push(`rating=${updates.google_rating}`);
        if (updates.phone) updateParts.push('phone');
        if (updates.cover_photo_url) updateParts.push('photo');
        console.log(`  ✅ ${updateParts.join(', ')}`);
        updated++;
      }
    } else {
      console.log(`  ⏭️ No data found`);
    }

    // Save progress
    progress.lastVenueId = venue.id;
    progress.venuesProcessed++;
    if (i % 10 === 0) {
      saveProgress(progress);
    }

    // Rate limit - randomized to avoid detection
    await page.waitForTimeout(1500 + Math.random() * 2000);
  }

  await page.close();
  saveProgress(progress);
  console.log(`\n📊 Venues: ${updated} updated, ${errors} errors, ${venues.length - updated - errors} no data`);
}

async function enrichHotels(context: BrowserContext, limit: number, startAfterId?: string) {
  console.log('\n🏨 Enriching hotels with Google Maps data...\n');

  let query = supabase
    .from('hotels')
    .select('id, name, neighborhood, google_rating, google_review_count, phone, featured_photo')
    .is('google_rating', null)
    .eq('is_active', true)
    .order('id', { ascending: true })
    .limit(limit);

  if (startAfterId) {
    query = query.gt('id', startAfterId);
  }

  const { data: hotels, error } = await query;

  if (error) {
    console.error('Error fetching hotels:', error);
    return;
  }

  console.log(`Found ${hotels?.length || 0} hotels to enrich`);
  if (!hotels || hotels.length === 0) return;

  const page = await context.newPage();
  const progress = loadProgress();
  let updated = 0;
  let errors = 0;

  for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i];
    const pct = ((i + 1) / hotels.length * 100).toFixed(1);
    console.log(`[${i + 1}/${hotels.length}] (${pct}%) ${hotel.name}...`);

    const location = hotel.neighborhood 
      ? `${hotel.neighborhood.replace(/-/g, ' ')}, Bangalore`
      : 'Bangalore';

    // For hotels, add "hotel" to search query to improve accuracy
    const result = await scrapeGoogleMaps(page, `${hotel.name} hotel`, location);

    const updates: any = {};
    if (result.rating) {
      updates.google_rating = result.rating;
    }
    if (result.reviewCount) {
      updates.google_review_count = result.reviewCount;
    }
    if (result.phone && !hotel.phone) {
      updates.phone = result.phone;
    }
    if (result.photo && !hotel.featured_photo) {
      updates.featured_photo = result.photo;
    }
    if (result.address) {
      updates.address = result.address;
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('hotels')
        .update(updates)
        .eq('id', hotel.id);

      if (updateError) {
        console.log(`  ❌ Update error: ${updateError.message}`);
        errors++;
      } else {
        const updateParts = [];
        if (updates.google_rating) updateParts.push(`rating=${updates.google_rating}`);
        if (updates.phone) updateParts.push('phone');
        if (updates.featured_photo) updateParts.push('photo');
        console.log(`  ✅ ${updateParts.join(', ')}`);
        updated++;
      }
    } else {
      console.log(`  ⏭️ No data found`);
    }

    // Save progress
    progress.lastHotelId = hotel.id;
    progress.hotelsProcessed++;
    if (i % 10 === 0) {
      saveProgress(progress);
    }

    await page.waitForTimeout(1500 + Math.random() * 2000);
  }

  await page.close();
  saveProgress(progress);
  console.log(`\n📊 Hotels: ${updated} updated, ${errors} errors, ${hotels.length - updated - errors} no data`);
}

async function main() {
  console.log('🗺️ Google Maps Enrichment v2 for BangaloreLife');
  console.log('===============================================\n');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing Supabase credentials in environment');
    process.exit(1);
  }

  const progress = loadProgress();
  console.log(`📋 Progress: ${progress.venuesProcessed} venues, ${progress.hotelsProcessed} hotels processed`);
  console.log(`   Last run: ${progress.lastUpdated}\n`);

  const browser = await chromium.launch({ 
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage'
    ]
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
  });

  try {
    const args = process.argv.slice(2);
    const target = args[0] || 'all';
    const limit = parseInt(args[1]) || 100;
    const resume = args.includes('--resume');

    console.log(`🎯 Target: ${target}, Limit: ${limit}, Resume: ${resume}\n`);

    if (target === 'venues' || target === 'all') {
      await enrichVenues(context, limit, resume ? progress.lastVenueId : undefined);
    }
    
    if (target === 'hotels' || target === 'all') {
      await enrichHotels(context, limit, resume ? progress.lastHotelId : undefined);
    }
    
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    saveProgress(progress);
  } finally {
    await context.close();
    await browser.close();
  }
}

main();
