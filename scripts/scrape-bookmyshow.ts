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
  // Use env variable for CI, otherwise detect system Chrome
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
    
    // Scroll to load lazy content
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise(r => setTimeout(r, 2000));
    
    const html = await page.content();
    const $ = cheerio.load(html);
    
    // BookMyShow event cards - multiple selector patterns
    const selectors = [
      'a[href*="/events/"]',
      '.style-module__card___',
      '[data-event-card]',
      '.sc-7o7nez-0', // Common BMS class pattern
    ];
    
    // Find all event links
    $('a').each((_, el) => {
      const href = $(el).attr('href') || '';
      
      // Only process event URLs
      if (!href.includes('/events/') && !href.includes('/activities/')) return;
      if (href.includes('/explore/')) return;
      
      // Build full URL
      const fullUrl = href.startsWith('http') ? href : `https://in.bookmyshow.com${href}`;
      
      // Extract event ID from URL
      const urlParts = fullUrl.split('/');
      const eventId = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
      if (!eventId || eventId.length < 3) return;
      
      // Get title from various possible elements
      const card = $(el).closest('div').parent();
      let title = $(el).find('h3, h4, [class*="title"], [class*="name"]').first().text().trim();
      if (!title) title = $(el).text().trim().split('\n')[0];
      if (!title || title.length < 3 || title.length > 200) return;
      
      // Get image
      let imageUrl = card.find('img').attr('src') || $(el).find('img').attr('src');
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `https://in.bookmyshow.com${imageUrl}`;
      }
      
      // Get venue
      const venue = card.find('[class*="venue"], [class*="location"]').text().trim() ||
                    $(el).parent().find('[class*="venue"]').text().trim();
      
      // Get date text
      const dateText = card.find('[class*="date"], time').text().trim();
      
      // Get price
      const priceText = card.find('[class*="price"]').text().trim();
      const priceMatch = priceText.match(/₹\s*([\d,]+)/);
      const priceMin = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : undefined;
      
      // Parse date (simplified - defaults to upcoming)
      let startDate = new Date();
      startDate.setDate(startDate.getDate() + 7); // Default to 1 week out
      
      // Check for duplicates
      const existingEvent = events.find(e => e.source_event_id === eventId);
      if (existingEvent) return;
      
      events.push({
        title: title.slice(0, 200),
        slug: slugify(title) + '-' + eventId.slice(0, 8),
        category,
        venue_name: venue || undefined,
        city: 'bangalore',
        price: priceText || undefined,
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
    
    console.log(`    Found ${events.length} events in ${category}`);
    
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
    
    // Set realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Block unnecessary resources
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
      
      // Be nice to the server
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
  
  console.log(`\n📊 Total unique events: ${uniqueEvents.length}`);
  return uniqueEvents;
}

async function saveToSupabase(events: ScrapedEvent[]) {
  console.log('\n💾 Saving to Supabase...');
  
  if (events.length === 0) {
    console.log('No events to save.');
    return;
  }
  
  // Upsert events (update if exists, insert if new)
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
    console.error('Supabase error:', error);
    
    // Try individual inserts if bulk fails
    console.log('Trying individual inserts...');
    let success = 0;
    for (const event of events) {
      const { error: insertError } = await supabase
        .from('events')
        .upsert({
          ...event,
          price_currency: 'INR',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'slug' });
      
      if (!insertError) success++;
    }
    console.log(`Inserted ${success}/${events.length} events individually.`);
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
