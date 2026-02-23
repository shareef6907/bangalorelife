/**
 * Google Maps Scraper using Playwright
 * Enriches venues and hotels with:
 * - Google ratings & review counts
 * - Phone numbers
 * - Cover photos
 * 
 * Run: npx playwright install chromium && npx tsx scripts/scrape-google-maps.ts
 */

import { chromium, Browser, Page } from 'playwright';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface ScrapeResult {
  rating: number | null;
  reviewCount: number | null;
  phone: string | null;
  photo: string | null;
  address: string | null;
}

async function scrapeGoogleMaps(page: Page, name: string, location: string = 'Bangalore'): Promise<ScrapeResult> {
  const result: ScrapeResult = {
    rating: null,
    reviewCount: null,
    phone: null,
    photo: null,
    address: null
  };

  try {
    const searchQuery = `${name} ${location}`;
    const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Check if we landed on a place page or search results
    const placePanel = await page.$('[data-value="Share"]');
    
    if (!placePanel) {
      // Click first result if we're on search results
      const firstResult = await page.$('div[role="feed"] > div:first-child');
      if (firstResult) {
        await firstResult.click();
        await page.waitForTimeout(2000);
      }
    }

    // Extract rating
    const ratingEl = await page.$('span.ceNzKf');
    if (ratingEl) {
      const ratingText = await ratingEl.textContent();
      if (ratingText) {
        result.rating = parseFloat(ratingText.replace(',', '.'));
      }
    }

    // Extract review count
    const reviewEl = await page.$('span[aria-label*="review"]');
    if (reviewEl) {
      const reviewText = await reviewEl.getAttribute('aria-label');
      if (reviewText) {
        const match = reviewText.match(/(\d[\d,]*)/);
        if (match) {
          result.reviewCount = parseInt(match[1].replace(/,/g, ''));
        }
      }
    }

    // Extract phone
    const phoneButton = await page.$('button[data-item-id="phone:tel"]');
    if (phoneButton) {
      const phoneText = await phoneButton.textContent();
      if (phoneText) {
        result.phone = phoneText.trim();
      }
    }

    // Alternative phone extraction
    if (!result.phone) {
      const phoneEl = await page.$('button[aria-label*="Phone"]');
      if (phoneEl) {
        const phoneLabel = await phoneEl.getAttribute('aria-label');
        if (phoneLabel) {
          const match = phoneLabel.match(/Phone:\s*(.+)/);
          if (match) result.phone = match[1].trim();
        }
      }
    }

    // Extract cover photo
    const photoEl = await page.$('img.FgCUCc');
    if (photoEl) {
      result.photo = await photoEl.getAttribute('src');
    }

    // Alternative photo extraction
    if (!result.photo) {
      const photoEl2 = await page.$('div[role="img"]');
      if (photoEl2) {
        const style = await photoEl2.getAttribute('style');
        if (style) {
          const match = style.match(/url\("([^"]+)"\)/);
          if (match) result.photo = match[1];
        }
      }
    }

    // Extract address
    const addressEl = await page.$('button[data-item-id="address"]');
    if (addressEl) {
      result.address = await addressEl.textContent();
    }

  } catch (error: any) {
    console.log(`  ⚠️ Error scraping ${name}: ${error.message}`);
  }

  return result;
}

async function enrichVenues(browser: Browser, limit: number = 100) {
  console.log('\n📍 Enriching venues with Google Maps data...\n');

  // Get venues that need enrichment (no phone or no google_rating)
  const { data: venues, error } = await supabase
    .from('venues')
    .select('id, name, neighborhood, phone, google_rating, google_review_count')
    .or('phone.is.null,google_rating.is.null')
    .in('type', ['restaurant', 'cafe', 'bar', 'pub', 'brewery'])
    .eq('is_active', true)
    .order('google_rating', { ascending: false, nullsFirst: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching venues:', error);
    return;
  }

  console.log(`Found ${venues?.length || 0} venues to enrich`);

  const page = await browser.newPage();
  let updated = 0;
  let errors = 0;

  for (let i = 0; i < (venues?.length || 0); i++) {
    const venue = venues![i];
    console.log(`[${i + 1}/${venues!.length}] ${venue.name}...`);

    const location = venue.neighborhood 
      ? `${venue.neighborhood.replace(/-/g, ' ')}, Bangalore`
      : 'Bangalore';

    const result = await scrapeGoogleMaps(page, venue.name, location);

    // Update venue with new data
    const updates: any = {};
    if (result.rating && (!venue.google_rating || result.rating !== venue.google_rating)) {
      updates.google_rating = result.rating;
    }
    if (result.reviewCount) {
      updates.google_review_count = result.reviewCount;
    }
    if (result.phone && !venue.phone) {
      updates.phone = result.phone;
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('venues')
        .update(updates)
        .eq('id', venue.id);

      if (updateError) {
        console.log(`  ❌ Update error: ${updateError.message}`);
        errors++;
      } else {
        console.log(`  ✅ Updated: rating=${result.rating}, phone=${result.phone ? 'yes' : 'no'}`);
        updated++;
      }
    } else {
      console.log(`  ⏭️ No new data`);
    }

    // Rate limit
    await page.waitForTimeout(1500 + Math.random() * 1000);
  }

  await page.close();
  console.log(`\n📊 Venues: ${updated} updated, ${errors} errors`);
}

async function enrichHotels(browser: Browser, limit: number = 100) {
  console.log('\n🏨 Enriching hotels with Google Maps data...\n');

  const { data: hotels, error } = await supabase
    .from('hotels')
    .select('id, name, neighborhood, google_rating, google_review_count')
    .is('google_rating', null)
    .eq('is_active', true)
    .limit(limit);

  if (error) {
    console.error('Error fetching hotels:', error);
    return;
  }

  console.log(`Found ${hotels?.length || 0} hotels to enrich`);

  const page = await browser.newPage();
  let updated = 0;
  let errors = 0;

  for (let i = 0; i < (hotels?.length || 0); i++) {
    const hotel = hotels![i];
    console.log(`[${i + 1}/${hotels!.length}] ${hotel.name}...`);

    const location = hotel.neighborhood 
      ? `${hotel.neighborhood.replace(/-/g, ' ')}, Bangalore`
      : 'Bangalore';

    const result = await scrapeGoogleMaps(page, hotel.name, location);

    const updates: any = {};
    if (result.rating) {
      updates.google_rating = result.rating;
    }
    if (result.reviewCount) {
      updates.google_review_count = result.reviewCount;
    }
    if (result.phone) {
      updates.phone = result.phone;
    }
    if (result.photo) {
      updates.featured_photo = result.photo;
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
        console.log(`  ✅ Updated: rating=${result.rating}, photo=${result.photo ? 'yes' : 'no'}`);
        updated++;
      }
    } else {
      console.log(`  ⏭️ No data found`);
    }

    await page.waitForTimeout(1500 + Math.random() * 1000);
  }

  await page.close();
  console.log(`\n📊 Hotels: ${updated} updated, ${errors} errors`);
}

async function main() {
  console.log('🗺️ Google Maps Scraper for BangaloreLife');
  console.log('=========================================\n');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
  }

  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Process command line args
    const args = process.argv.slice(2);
    const target = args[0] || 'all';
    const limit = parseInt(args[1]) || 50;

    if (target === 'venues' || target === 'all') {
      await enrichVenues(browser, limit);
    }
    
    if (target === 'hotels' || target === 'all') {
      await enrichHotels(browser, limit);
    }

    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await browser.close();
  }
}

main();
