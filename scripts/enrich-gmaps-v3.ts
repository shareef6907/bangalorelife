/**
 * Google Maps Enrichment v3 - Anti-detection optimized
 * - Random delays 3-8 seconds
 * - Rotating user agents
 * - Batches of 50 with 10-minute pauses
 * - Stealth mode settings
 * 
 * Run: npx tsx scripts/enrich-gmaps-v3.ts [venues|hotels] [batch_size]
 */

import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const PROGRESS_FILE = './scripts/.gmaps-v3-progress.json';
const BATCH_SIZE = 50;
const BATCH_PAUSE_MS = 10 * 60 * 1000; // 10 minutes

const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
];

interface ScrapeResult {
  rating: number | null;
  reviewCount: number | null;
  phone: string | null;
  photo: string | null;
  hours: string[] | null;
}

interface Progress {
  lastId: string | null;
  batchCount: number;
  totalProcessed: number;
  totalUpdated: number;
  lastUpdated: string;
}

function loadProgress(target: string): Progress {
  const file = PROGRESS_FILE.replace('.json', `-${target}.json`);
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    }
  } catch (e) {}
  return { 
    lastId: null,
    batchCount: 0,
    totalProcessed: 0,
    totalUpdated: 0,
    lastUpdated: new Date().toISOString()
  };
}

function saveProgress(target: string, progress: Progress) {
  const file = PROGRESS_FILE.replace('.json', `-${target}.json`);
  progress.lastUpdated = new Date().toISOString();
  fs.writeFileSync(file, JSON.stringify(progress, null, 2));
}

function randomDelay(): number {
  return Math.floor(Math.random() * 5000) + 3000; // 3-8 seconds
}

async function scrapeGoogleMaps(page: Page, name: string, area: string): Promise<ScrapeResult> {
  const result: ScrapeResult = {
    rating: null,
    reviewCount: null,
    phone: null,
    photo: null,
    hours: null
  };

  try {
    const searchQuery = `${name} ${area} Bangalore`;
    const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(randomDelay());
    
    // Wait for results
    await page.waitForSelector('div[role="feed"], button[data-value="Share"]', { 
      timeout: 15000 
    }).catch(() => {});
    
    // Click first result if on search page
    const isPlacePage = await page.$('button[data-value="Share"]');
    if (!isPlacePage) {
      const firstResult = await page.$('div[role="feed"] a[href*="/maps/place/"]');
      if (firstResult) {
        await firstResult.click();
        await page.waitForTimeout(randomDelay());
      } else {
        return result; // No results
      }
    }
    
    // Extract rating
    for (const selector of ['span.ceNzKf', 'span.MW4etd', 'div.F7nice span']) {
      const el = await page.$(selector);
      if (el) {
        const text = await el.textContent();
        if (text) {
          const rating = parseFloat(text.replace(',', '.'));
          if (!isNaN(rating) && rating >= 1 && rating <= 5) {
            result.rating = rating;
            break;
          }
        }
      }
    }
    
    // Extract review count
    const reviewEl = await page.$('span[aria-label*="review"], button[aria-label*="review"]');
    if (reviewEl) {
      const label = await reviewEl.getAttribute('aria-label') || await reviewEl.textContent();
      if (label) {
        const match = label.match(/([\d,]+)\s*review/i);
        if (match) {
          result.reviewCount = parseInt(match[1].replace(/,/g, ''));
        }
      }
    }
    
    // Extract phone
    const phoneEl = await page.$('button[data-item-id="phone:tel"], a[href^="tel:"]');
    if (phoneEl) {
      const text = await phoneEl.textContent() || await phoneEl.getAttribute('href');
      if (text) {
        const phone = text.replace('tel:', '').trim();
        if (phone.match(/[\d\s\-+()]{10,}/)) {
          result.phone = phone;
        }
      }
    }
    
    // Extract photo
    const photoEl = await page.$('img.FgCUCc, button[aria-label="Photo"] img, img[src*="googleusercontent"]');
    if (photoEl) {
      const src = await photoEl.getAttribute('src');
      if (src && src.startsWith('http')) {
        result.photo = src;
      }
    }
    
  } catch (error: any) {
    console.log(`    ⚠️ ${error.message.slice(0, 40)}`);
  }

  return result;
}

async function enrichBatch(
  context: BrowserContext, 
  target: 'venues' | 'hotels',
  batchSize: number,
  startAfterId?: string
): Promise<{ processed: number; updated: number; lastId: string | null }> {
  
  const table = target === 'venues' ? 'venues' : 'hotels';
  const columns = target === 'venues' 
    ? 'id, name, neighborhood, google_rating, phone'
    : 'id, name, neighborhood, google_rating, phone';
  
  let query = supabase
    .from(table)
    .select(columns)
    .is('google_rating', null)
    .eq('is_active', true)
    .order('id', { ascending: true })
    .limit(batchSize);
  
  if (target === 'venues') {
    query = query.in('type', ['restaurant', 'cafe', 'bar', 'pub', 'brewery']);
  }
  
  if (startAfterId) {
    query = query.gt('id', startAfterId);
  }
  
  const { data: items, error } = await query;
  
  if (error || !items || items.length === 0) {
    return { processed: 0, updated: 0, lastId: null };
  }
  
  const page = await context.newPage();
  let updated = 0;
  let lastId = null;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    lastId = item.id;
    
    const pct = ((i + 1) / items.length * 100).toFixed(0);
    console.log(`[${i + 1}/${items.length}] (${pct}%) ${item.name}...`);
    
    const area = item.neighborhood?.replace(/-/g, ' ') || '';
    const searchName = target === 'hotels' ? `${item.name} hotel` : item.name;
    
    const result = await scrapeGoogleMaps(page, searchName, area);
    
    const updates: any = {};
    if (result.rating) updates.google_rating = result.rating;
    if (result.reviewCount) updates[target === 'venues' ? 'google_reviews_count' : 'google_review_count'] = result.reviewCount;
    if (result.phone && !item.phone) updates.phone = result.phone;
    if (result.photo) updates[target === 'venues' ? 'cover_photo_url' : 'featured_photo'] = result.photo;
    
    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from(table)
        .update(updates)
        .eq('id', item.id);
      
      if (!updateError) {
        console.log(`    ✅ rating=${result.rating}, phone=${result.phone ? 'yes' : 'no'}`);
        updated++;
      }
    } else {
      console.log(`    ⏭️ No data`);
    }
    
    // Random delay between requests
    await page.waitForTimeout(randomDelay());
  }
  
  await page.close();
  return { processed: items.length, updated, lastId };
}

async function main() {
  console.log('🗺️ Google Maps Enrichment v3 (Anti-Detection)');
  console.log('=============================================\n');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const target = (args[0] as 'venues' | 'hotels') || 'venues';
  const totalLimit = parseInt(args[1]) || 500;
  
  const progress = loadProgress(target);
  console.log(`📋 Progress: ${progress.totalProcessed} processed, ${progress.totalUpdated} updated`);
  console.log(`🎯 Target: ${target}, Limit: ${totalLimit}\n`);

  const browser = await chromium.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });

  let batchNum = 0;
  let totalProcessed = 0;
  
  while (totalProcessed < totalLimit) {
    batchNum++;
    const batchSize = Math.min(BATCH_SIZE, totalLimit - totalProcessed);
    
    console.log(`\n📦 Batch ${batchNum} (${batchSize} items)...`);
    
    // Rotate user agent each batch
    const userAgent = USER_AGENTS[batchNum % USER_AGENTS.length];
    const context = await browser.newContext({
      userAgent,
      viewport: { width: 1280 + Math.floor(Math.random() * 200), height: 800 + Math.floor(Math.random() * 100) },
      locale: 'en-IN',
      timezoneId: 'Asia/Kolkata',
    });
    
    const result = await enrichBatch(context, target, batchSize, progress.lastId);
    await context.close();
    
    totalProcessed += result.processed;
    progress.totalProcessed += result.processed;
    progress.totalUpdated += result.updated;
    progress.lastId = result.lastId;
    progress.batchCount = batchNum;
    saveProgress(target, progress);
    
    console.log(`📊 Batch ${batchNum}: ${result.processed} processed, ${result.updated} updated`);
    
    if (result.processed === 0 || totalProcessed >= totalLimit) {
      break;
    }
    
    // Pause between batches
    console.log(`\n⏸️ Pausing 10 minutes before next batch...`);
    await new Promise(r => setTimeout(r, BATCH_PAUSE_MS));
  }

  await browser.close();
  console.log(`\n✅ Done! Total: ${progress.totalProcessed} processed, ${progress.totalUpdated} updated`);
}

main();
