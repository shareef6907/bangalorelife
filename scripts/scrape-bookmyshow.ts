/**
 * BookMyShow Event Scraper for BangaloreLife.com
 * 
 * Scrapes events from BookMyShow Bangalore and stores in Supabase
 * All booking links wrapped with INRDeals affiliate tracking
 * 
 * Run: npx tsx scripts/scrape-bookmyshow.ts
 */

import puppeteer, { Page } from 'puppeteer-core';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

// Load env
import { config } from 'dotenv';
config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// INRDeals affiliate config
const INRDEALS_PUBLISHER_ID = 'eve678604838';
const TRAFFIC_SOURCE = 'bangalorelife';
const CAMPAIGN_TYPE = 'cps';

function generateAffiliateLink(bookMyShowUrl: string, subid?: string): string {
  const encodedUrl = encodeURIComponent(bookMyShowUrl);
  let link = `https://inr.deals/track?id=${INRDEALS_PUBLISHER_ID}&src=${TRAFFIC_SOURCE}&campaign=${CAMPAIGN_TYPE}&url=${encodedUrl}`;
  if (subid) {
    link += `&subid=${encodeURIComponent(subid)}`;
  }
  return link;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

interface ScrapedEvent {
  title: string;
  slug: string;
  description?: string;
  category: string;
  venue_name?: string;
  city: string;
  price?: string;
  price_min?: number;
  image_url?: string;
  booking_url: string;
  affiliate_url: string;
  start_date: string;
  end_date?: string;
  source_name: string;
  source_event_id: string;
  is_active: boolean;
}

// BookMyShow event categories to scrape
const CATEGORIES = [
  { url: 'https://in.bookmyshow.com/explore/comedy-shows-bengaluru', category: 'comedy' },
  { url: 'https://in.bookmyshow.com/explore/music-shows-bengaluru', category: 'concerts' },
  { url: 'https://in.bookmyshow.com/explore/plays-bengaluru', category: 'theatre' },
  { url: 'https://in.bookmyshow.com/explore/workshops-bengaluru', category: 'workshops' },
  { url: 'https://in.bookmyshow.com/explore/sports-bengaluru', category: 'sports' },
  { url: 'https://in.bookmyshow.com/explore/kids-bengaluru', category: 'kids' },
  { url: 'https://in.bookmyshow.com/explore/experiences-bangalore', category: 'experiences' },
];

async function getBrowser() {
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || (
    process.platform === 'darwin' 
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : '/usr/bin/chromium-browser'
  );

  return puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920x1080',
    ],
  });
}

async function scrapeCategory(page: Page, categoryUrl: string, category: string): Promise<ScrapedEvent[]> {
  const events: ScrapedEvent[] = [];
  
  console.log(`  Scraping ${category}...`);
  
  try {
    await page.goto(categoryUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for content to load
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Scroll multiple times to load lazy content
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 800));
      await new Promise(r => setTimeout(r, 800));
    }
    
    // Wait for images to load
    await new Promise(r => setTimeout(r, 2000));
    
    const html = await page.content();
    const $ = cheerio.load(html);
    
    // Find event cards - each card should have its own image
    // BMS uses cards with links containing /events/ and images within the same container
    const processedIds = new Set<string>();
    
    // Find all anchor tags with event links
    $('a[href*="/events/"]').each((_, anchor) => {
      const $anchor = $(anchor);
      const href = $anchor.attr('href') || '';
      
      // Skip explore pages
      if (href.includes('/explore/')) return;
      
      // Extract event ID
      const eventIdMatch = href.match(/ET\d{8}/);
      if (!eventIdMatch) return;
      
      const eventId = eventIdMatch[0];
      
      // Skip duplicates
      if (processedIds.has(eventId)) return;
      processedIds.add(eventId);
      
      // Build full URL
      const fullUrl = href.startsWith('http') ? href : `https://in.bookmyshow.com${href}`;
      
      // Find the card container - go up to find the card
      const $card = $anchor.closest('[class*="card"], [class*="Card"], div').first();
      
      // Get title - try multiple approaches
      let title = '';
      const titleSelectors = [
        '[class*="title"]',
        '[class*="Title"]',
        'h3', 'h4',
        '[class*="name"]',
        '[class*="Name"]',
      ];
      
      for (const sel of titleSelectors) {
        const text = $card.find(sel).first().text().trim() || $anchor.find(sel).first().text().trim();
        if (text && text.length > 3 && text.length < 200) {
          title = text;
          break;
        }
      }
      
      // Fallback to anchor text
      if (!title) {
        title = $anchor.text().trim().split('\n')[0].trim();
      }
      
      if (!title || title.length < 3 || title.length > 200) return;
      
      // Find the image associated with THIS event
      // Look for img within the card that contains bmscdn and the event ID
      let imageUrl: string | undefined;
      
      // First try: find image in the card container
      $card.find('img').each((_, img) => {
        const src = $(img).attr('src') || $(img).attr('data-src') || '';
        const eventIdLower = eventId.toLowerCase();
        
        // Check if this image is for this specific event
        if (src.includes('bmscdn.com') && src.includes('events') && 
            (src.toLowerCase().includes(eventIdLower) || src.includes(eventIdLower.replace('et', '')))) {
          imageUrl = src;
          return false; // break
        }
      });
      
      // Second try: find any event image in the card
      if (!imageUrl) {
        $card.find('img[src*="discovery-catalog/events"]').each((_, img) => {
          const src = $(img).attr('src') || '';
          if (src && !imageUrl) {
            imageUrl = src;
            return false;
          }
        });
      }
      
      // Third try: look in anchor
      if (!imageUrl) {
        $anchor.find('img').each((_, img) => {
          const src = $(img).attr('src') || $(img).attr('data-src') || '';
          if (src.includes('bmscdn.com') && src.includes('events')) {
            imageUrl = src;
            return false;
          }
        });
      }
      
      // Get venue
      let venue = '';
      $card.find('[class*="venue"], [class*="Venue"], [class*="location"], [class*="Location"]').each((_, el) => {
        const text = $(el).text().trim();
        if (text && text.length < 100 && !venue) {
          venue = text.split('\n')[0].trim();
          return false;
        }
      });
      
      // Get price
      let priceMin: number | undefined;
      let price = '';
      const priceText = $card.find('[class*="price"], [class*="Price"]').first().text();
      const priceMatch = priceText.match(/₹\s*([\d,]+)/);
      if (priceMatch) {
        priceMin = parseInt(priceMatch[1].replace(/,/g, ''));
        price = `From ₹${priceMin}`;
      }
      
      // Get date
      let startDate = new Date();
      startDate.setDate(startDate.getDate() + 7);
      
      const dateText = $card.find('[class*="date"], [class*="Date"], time').first().text();
      if (dateText) {
        const dateMatch = dateText.match(/(\d{1,2})\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);
        if (dateMatch) {
          const months: Record<string, number> = {
            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
          };
          const day = parseInt(dateMatch[1]);
          const month = months[dateMatch[2].toLowerCase()];
          if (!isNaN(day) && month !== undefined) {
            const year = new Date().getFullYear();
            const parsed = new Date(year, month, day);
            if (parsed > new Date()) {
              startDate = parsed;
            } else {
              startDate = new Date(year + 1, month, day);
            }
          }
        }
      }
      
      events.push({
        title: title.slice(0, 200),
        slug: slugify(title) + '-' + eventId.toLowerCase(),
        category,
        venue_name: venue || undefined,
        city: 'bangalore',
        price: price || undefined,
        price_min: priceMin,
        image_url: imageUrl,
        booking_url: fullUrl,
        affiliate_url: generateAffiliateLink(fullUrl, `${category}-scrape`),
        start_date: startDate.toISOString().split('T')[0],
        source_name: 'bookmyshow',
        source_event_id: eventId,
        is_active: true,
      });
    });
    
    const withImages = events.filter(e => e.image_url).length;
    console.log(`    Found ${events.length} events (${withImages} with images)`);
    
  } catch (error) {
    console.error(`    Error scraping ${category}:`, error);
  }
  
  return events;
}

async function scrapeBookMyShow(): Promise<ScrapedEvent[]> {
  console.log('🎫 Starting BookMyShow scraper...\n');
  
  const allEvents: ScrapedEvent[] = [];
  const browser = await getBrowser();
  
  try {
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Don't block images this time
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (['font', 'media'].includes(resourceType)) {
        req.abort();
      } else {
        req.continue();
      }
    });
    
    for (const { url, category } of CATEGORIES) {
      const events = await scrapeCategory(page, url, category);
      allEvents.push(...events);
      await new Promise(r => setTimeout(r, 2000));
    }
    
  } finally {
    await browser.close();
  }
  
  // Deduplicate by source_event_id
  const uniqueEvents = allEvents.reduce((acc, event) => {
    if (!acc.find(e => e.source_event_id === event.source_event_id)) {
      acc.push(event);
    }
    return acc;
  }, [] as ScrapedEvent[]);
  
  const withImages = uniqueEvents.filter(e => e.image_url).length;
  console.log(`\n📊 Total unique events: ${uniqueEvents.length}`);
  console.log(`📷 With images: ${withImages}`);
  
  return uniqueEvents;
}

async function saveToSupabase(events: ScrapedEvent[]) {
  console.log('\n💾 Saving to Supabase...');
  
  if (events.length === 0) {
    console.log('No events to save.');
    return;
  }
  
  // Use slug as conflict column (it has unique constraint)
  const { data, error } = await supabase
    .from('events')
    .upsert(
      events.map(e => ({
        ...e,
        price_currency: 'INR',
        updated_at: new Date().toISOString(),
      })),
      { 
        onConflict: 'slug',
        ignoreDuplicates: false 
      }
    );
  
  if (error) {
    console.error('Supabase bulk upsert error:', error);
    
    console.log('Trying individual upserts...');
    let success = 0;
    let failed = 0;
    for (const event of events) {
      const { error: insertError } = await supabase
        .from('events')
        .upsert({
          ...event,
          price_currency: 'INR',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'slug' });
      
      if (!insertError) {
        success++;
      } else {
        failed++;
        if (failed <= 3) {
          console.log(`  Error on ${event.title.slice(0, 30)}:`, insertError.message);
        }
      }
    }
    console.log(`Upserted ${success}/${events.length} events (${failed} failed).`);
  } else {
    console.log(`✅ Saved ${events.length} events to Supabase`);
  }
}

async function cleanOldEvents() {
  console.log('\n🧹 Cleaning old events...');
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { error, count } = await supabase
    .from('events')
    .delete()
    .lt('start_date', thirtyDaysAgo.toISOString().split('T')[0])
    .eq('source_name', 'bookmyshow');
  
  if (error) {
    console.error('Error cleaning old events:', error);
  } else {
    console.log(`Cleaned ${count || 0} old events.`);
  }
}

async function main() {
  console.log('='.repeat(50));
  console.log('BangaloreLife.com - BookMyShow Event Scraper');
  console.log('='.repeat(50));
  console.log(`Started: ${new Date().toISOString()}\n`);
  
  try {
    const events = await scrapeBookMyShow();
    await saveToSupabase(events);
    await cleanOldEvents();
    
    console.log('\n✅ BookMyShow scraper completed!');
    console.log(`Finished: ${new Date().toISOString()}`);
  } catch (error) {
    console.error('\n❌ Scraper failed:', error);
    process.exit(1);
  }
}

main();
