/**
 * Insider.in (Paytm Insider) Event Scraper for BangaloreLife.com
 * 
 * Scrapes events from Insider.in Bangalore
 * Alternative/supplementary source to BookMyShow
 * Links still wrapped with INRDeals (via BookMyShow redirect where possible)
 * 
 * Run: npx tsx scripts/scrape-insider.ts
 */

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

function generateAffiliateLink(url: string, subid?: string): string {
  // For Insider.in, we still track through INRDeals if they support it
  // Otherwise, just use direct link
  const encodedUrl = encodeURIComponent(url);
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

// Category pages to scrape from Insider.in
const INSIDER_CATEGORIES = [
  { url: 'https://insider.in/all-events-in-bengaluru-entertainment/comedy', category: 'comedy' },
  { url: 'https://insider.in/all-events-in-bengaluru-entertainment/music', category: 'concerts' },
  { url: 'https://insider.in/all-events-in-bengaluru-entertainment/workshops', category: 'workshops' },
  { url: 'https://insider.in/all-events-in-bengaluru-entertainment/performances', category: 'theatre' },
  { url: 'https://insider.in/all-events-in-bengaluru-entertainment/screening', category: 'screening' },
];

async function fetchInsiderEvents(): Promise<ScrapedEvent[]> {
  console.log('🎭 Fetching Insider.in events...\n');
  
  const events: ScrapedEvent[] = [];
  
  for (const { url, category } of INSIDER_CATEGORIES) {
    console.log(`  Scraping ${category}...`);
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        },
      });
      
      if (!response.ok) {
        console.log(`    Skipping ${category} - status ${response.status}`);
        continue;
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Parse event cards
      $('a[href*="insider.in/"]').each((_, el) => {
        const href = $(el).attr('href') || '';
        
        // Skip navigation links
        if (href.includes('/all-events') || href.includes('/city/') || !href.includes('insider.in/')) return;
        
        // Get title
        const title = $(el).find('h3, h4, [class*="title"], [class*="name"]').first().text().trim() ||
                      $(el).attr('title') || '';
        
        if (!title || title.length < 3 || title.length > 200) return;
        
        // Get image
        let imageUrl = $(el).find('img').attr('src') || $(el).find('img').attr('data-src');
        
        // Get event ID from URL
        const urlParts = href.split('/');
        const eventId = urlParts[urlParts.length - 1] || '';
        if (!eventId || eventId.length < 3) return;
        
        // Build full URL
        const fullUrl = href.startsWith('http') ? href : `https://insider.in${href}`;
        
        // Check for duplicates
        if (events.find(e => e.source_event_id === eventId)) return;
        
        // Default date (1 week from now)
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 7);
        
        events.push({
          title: title.slice(0, 200),
          slug: slugify(title) + '-insider-' + eventId.slice(-8),
          category,
          city: 'bangalore',
          image_url: imageUrl,
          booking_url: fullUrl,
          affiliate_url: generateAffiliateLink(fullUrl, `insider-${category}`),
          start_date: startDate.toISOString().split('T')[0],
          source_name: 'insider',
          source_event_id: eventId,
          is_active: true,
        });
      });
      
      console.log(`    Found ${events.filter(e => e.category === category).length} events`);
      
      // Rate limit
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (error) {
      console.error(`    Error scraping ${category}:`, error);
    }
  }
  
  console.log(`\n📊 Total Insider.in events: ${events.length}`);
  return events;
}

async function scrapeInsiderHTML(): Promise<ScrapedEvent[]> {
  const events: ScrapedEvent[] = [];
  const pageUrl = 'https://insider.in/bengaluru';
  
  try {
    const response = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Find event cards
    $('a[href*="/event-"]').each((_, el) => {
      const href = $(el).attr('href') || '';
      const title = $(el).find('[class*="name"], [class*="title"], h3, h4').first().text().trim();
      const imageUrl = $(el).find('img').attr('src');
      const priceText = $(el).find('[class*="price"]').text().trim();
      
      if (!title || title.length < 3) return;
      
      const fullUrl = href.startsWith('http') ? href : `https://insider.in${href}`;
      const eventId = href.split('/').pop() || '';
      
      events.push({
        title: title.slice(0, 200),
        slug: slugify(title) + '-insider-' + eventId.slice(-8),
        category: 'events',
        city: 'bangalore',
        price: priceText || undefined,
        image_url: imageUrl,
        booking_url: fullUrl,
        affiliate_url: generateAffiliateLink(fullUrl, 'insider-fallback'),
        start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        source_name: 'insider',
        source_event_id: eventId,
        is_active: true,
      });
    });
    
    console.log(`  HTML fallback found ${events.length} events`);
    
  } catch (error) {
    console.error('HTML fallback failed:', error);
  }
  
  return events;
}

async function saveToSupabase(events: ScrapedEvent[]) {
  console.log('\n💾 Saving Insider events to Supabase...');
  
  if (events.length === 0) {
    console.log('No events to save.');
    return;
  }
  
  // Upsert events
  const { error } = await supabase
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
    
    // Try individual inserts
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
    console.log(`✅ Saved ${events.length} Insider events to Supabase`);
  }
}

async function main() {
  console.log('='.repeat(50));
  console.log('BangaloreLife.com - Insider.in Event Scraper');
  console.log('='.repeat(50));
  console.log(`Started: ${new Date().toISOString()}\n`);
  
  try {
    const events = await fetchInsiderEvents();
    await saveToSupabase(events);
    
    console.log('\n✅ Insider.in scraper completed!');
    console.log(`Finished: ${new Date().toISOString()}`);
  } catch (error) {
    console.error('\n❌ Scraper failed:', error);
    process.exit(1);
  }
}

main();
