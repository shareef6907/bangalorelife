/**
 * JustDial Scraper for BangaloreLife
 * Scrapes comprehensive business data: phone, rating, reviews, photos, hours, address
 * 
 * URL Pattern: https://www.justdial.com/Bangalore/[category]/nct-[area]
 * 
 * Run: npx tsx scripts/scrape-justdial.ts [restaurants|cafes|bars|hotels|all] [limit]
 */

import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const PROGRESS_FILE = './scripts/.justdial-progress.json';

// JustDial category mappings
const CATEGORY_MAP: Record<string, string[]> = {
  restaurants: ['Restaurants', 'Restaurant', 'Fine-Dining-Restaurants', 'Family-Restaurants'],
  cafes: ['Cafes', 'Coffee-Shops', 'Cafe-Coffee-Day'],
  bars: ['Bars', 'Pubs', 'Microbreweries', 'Lounges', 'Night-Clubs'],
  hotels: ['Hotels', 'Budget-Hotels', 'Luxury-Hotels', '3-Star-Hotels', '4-Star-Hotels', '5-Star-Hotels'],
};

// Area slugs for JustDial
const AREAS = [
  'Koramangala', 'Indiranagar', 'MG-Road', 'Brigade-Road', 'Whitefield',
  'HSR-Layout', 'BTM-Layout', 'Jayanagar', 'JP-Nagar', 'Banashankari',
  'Malleshwaram', 'Rajajinagar', 'Basavanagudi', 'Electronic-City',
  'Marathahalli', 'Bellandur', 'Sarjapur-Road', 'Hennur', 'Hebbal',
  'Yelahanka', 'RT-Nagar', 'Frazer-Town', 'Commercial-Street',
  'Cunningham-Road', 'Lavelle-Road', 'Richmond-Town', 'Ulsoor',
  'Sadashivanagar', 'Sankey-Road'
];

interface JustDialBusiness {
  name: string;
  phone: string | null;
  rating: number | null;
  reviewCount: number | null;
  address: string | null;
  photos: string[];
  hours: string | null;
  categories: string[];
}

interface Progress {
  lastCategory: string | null;
  lastArea: string | null;
  totalScraped: number;
  totalMatched: number;
  lastUpdated: string;
}

function loadProgress(): Progress {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
    }
  } catch (e) {}
  return { 
    lastCategory: null,
    lastArea: null,
    totalScraped: 0,
    totalMatched: 0,
    lastUpdated: new Date().toISOString()
  };
}

function saveProgress(progress: Progress) {
  progress.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function randomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rotate user agents
const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
];

async function scrapeJustDialListing(page: Page, url: string): Promise<JustDialBusiness[]> {
  const businesses: JustDialBusiness[] = [];
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(randomDelay(2000, 4000));
    
    // Wait for listings to load
    await page.waitForSelector('.cntanr, .store-details, .resultbox_info', { timeout: 10000 }).catch(() => {});
    
    // Scroll to load more content
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(1500);
    
    // Try multiple selector patterns (JustDial changes their DOM frequently)
    const listingSelectors = [
      '.cntanr',           // Current pattern
      '.store-details',    // Alternative
      '.resultbox_info',   // Old pattern
      'li[data-dn]',       // Another pattern
      '.jsx-card'          // React pattern
    ];
    
    let listings: any[] = [];
    for (const selector of listingSelectors) {
      listings = await page.$$(selector);
      if (listings.length > 0) break;
    }
    
    console.log(`    Found ${listings.length} listings on page`);
    
    for (const listing of listings.slice(0, 20)) { // Max 20 per page
      try {
        const business: JustDialBusiness = {
          name: '',
          phone: null,
          rating: null,
          reviewCount: null,
          address: null,
          photos: [],
          hours: null,
          categories: []
        };
        
        // Extract name - multiple patterns
        const nameEl = await listing.$('.lng_cont_name, .store-name, .resultbox_title_anchor, .fn, [class*="title"]');
        if (nameEl) {
          business.name = (await nameEl.textContent())?.trim() || '';
        }
        
        if (!business.name) continue; // Skip if no name
        
        // Extract phone - JustDial obfuscates phones, need to decode
        const phoneEl = await listing.$('.mobilesv, .contact-info span, [class*="phone"]');
        if (phoneEl) {
          // JustDial uses span elements with class names that map to digits
          const phoneSpans = await listing.$$('.mobilesv span, .telcntct span');
          if (phoneSpans.length > 0) {
            let phone = '';
            for (const span of phoneSpans) {
              const className = await span.getAttribute('class');
              if (className) {
                // JustDial encodes digits in class names like 'dc_' followed by character
                const match = className.match(/dc-(\w)/i) || className.match(/acb-(\w)/i);
                if (match) {
                  // Decode the digit mapping
                  const charMap: Record<string, string> = {
                    'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5',
                    'f': '6', 'g': '7', 'h': '8', 'i': '9', 'j': '0',
                    'icon-dc-star': '', 'dc-star': ''
                  };
                  phone += charMap[match[1].toLowerCase()] || '';
                }
              }
            }
            if (phone.length >= 10) {
              business.phone = '+91 ' + phone;
            }
          }
        }
        
        // Alternative: look for tel: links
        if (!business.phone) {
          const telLink = await listing.$('a[href^="tel:"]');
          if (telLink) {
            const href = await telLink.getAttribute('href');
            if (href) {
              business.phone = href.replace('tel:', '').trim();
            }
          }
        }
        
        // Extract rating
        const ratingEl = await listing.$('.green-box, .star_m, .rating span, [class*="rating"]');
        if (ratingEl) {
          const ratingText = await ratingEl.textContent();
          if (ratingText) {
            const parsed = parseFloat(ratingText);
            if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
              business.rating = parsed;
            }
          }
        }
        
        // Extract review count
        const reviewEl = await listing.$('.rt_count, .review-count, [class*="votes"]');
        if (reviewEl) {
          const reviewText = await reviewEl.textContent();
          if (reviewText) {
            const match = reviewText.match(/([\d,]+)/);
            if (match) {
              business.reviewCount = parseInt(match[1].replace(/,/g, ''));
            }
          }
        }
        
        // Extract address
        const addressEl = await listing.$('.cont_fl_addr, .address-info, .mprofile span, [class*="address"]');
        if (addressEl) {
          business.address = (await addressEl.textContent())?.trim() || null;
        }
        
        // Extract photos
        const photoEls = await listing.$$('img[data-src], img[src*="akam"], img[src*="justdial"]');
        for (const photoEl of photoEls.slice(0, 3)) {
          const src = await photoEl.getAttribute('data-src') || await photoEl.getAttribute('src');
          if (src && src.startsWith('http') && !src.includes('icon') && !src.includes('logo')) {
            business.photos.push(src);
          }
        }
        
        // Extract categories
        const catEl = await listing.$('.category, .cat-name, [class*="category"]');
        if (catEl) {
          const catText = await catEl.textContent();
          if (catText) {
            business.categories = catText.split(',').map(c => c.trim()).filter(c => c);
          }
        }
        
        if (business.name) {
          businesses.push(business);
        }
        
      } catch (e) {
        // Skip individual listing errors
      }
    }
    
  } catch (error: any) {
    console.log(`    ⚠️ Error scraping page: ${error.message.slice(0, 50)}`);
  }
  
  return businesses;
}

async function matchAndUpdateVenue(business: JustDialBusiness, venueType: string): Promise<boolean> {
  // Fuzzy match by name in our database
  const searchName = business.name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
  
  if (searchName.length < 3) return false;
  
  // Search in venues table
  const { data: venues, error } = await supabase
    .from('venues')
    .select('id, name, phone, google_rating, address')
    .ilike('name', `%${searchName.slice(0, 20)}%`)
    .eq('is_active', true)
    .limit(5);
  
  if (error || !venues || venues.length === 0) {
    return false;
  }
  
  // Find best match
  const venue = venues[0]; // Take closest match
  
  // Update venue with JustDial data
  const updates: any = {};
  
  if (business.phone && !venue.phone) {
    updates.phone = business.phone;
  }
  if (business.rating && !venue.google_rating) {
    updates.google_rating = business.rating;
  }
  if (business.address && !venue.address) {
    updates.address = business.address;
  }
  if (business.reviewCount) {
    updates.google_reviews_count = business.reviewCount;
  }
  if (business.photos.length > 0) {
    updates.cover_photo_url = business.photos[0];
  }
  
  if (Object.keys(updates).length > 0) {
    updates.last_scraped_at = new Date().toISOString();
    
    const { error: updateError } = await supabase
      .from('venues')
      .update(updates)
      .eq('id', venue.id);
    
    if (!updateError) {
      return true;
    }
  }
  
  return false;
}

async function matchAndUpdateHotel(business: JustDialBusiness): Promise<boolean> {
  const searchName = business.name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/hotel|lodge|inn|residency|pg/gi, '')
    .trim();
  
  if (searchName.length < 3) return false;
  
  const { data: hotels, error } = await supabase
    .from('hotels')
    .select('id, name, phone, google_rating, address')
    .ilike('name', `%${searchName.slice(0, 15)}%`)
    .eq('is_active', true)
    .limit(5);
  
  if (error || !hotels || hotels.length === 0) {
    return false;
  }
  
  const hotel = hotels[0];
  const updates: any = {};
  
  if (business.phone && !hotel.phone) {
    updates.phone = business.phone;
  }
  if (business.rating && !hotel.google_rating) {
    updates.google_rating = business.rating;
  }
  if (business.address && !hotel.address) {
    updates.address = business.address;
  }
  if (business.reviewCount) {
    updates.google_review_count = business.reviewCount;
  }
  if (business.photos.length > 0) {
    updates.featured_photo = business.photos[0];
  }
  
  if (Object.keys(updates).length > 0) {
    const { error: updateError } = await supabase
      .from('hotels')
      .update(updates)
      .eq('id', hotel.id);
    
    if (!updateError) {
      return true;
    }
  }
  
  return false;
}

async function scrapeCategory(context: BrowserContext, category: string, limit: number) {
  const categories = CATEGORY_MAP[category] || [category];
  const progress = loadProgress();
  
  console.log(`\n📂 Scraping ${category} from JustDial...\n`);
  
  const page = await context.newPage();
  let totalScraped = 0;
  let totalMatched = 0;
  
  for (const cat of categories) {
    if (totalScraped >= limit) break;
    
    for (const area of AREAS) {
      if (totalScraped >= limit) break;
      
      const url = `https://www.justdial.com/Bangalore/${cat}/nct-${area.replace(/-/g, '')}`;
      console.log(`🔍 ${cat} in ${area}...`);
      
      const businesses = await scrapeJustDialListing(page, url);
      
      for (const business of businesses) {
        if (totalScraped >= limit) break;
        
        let matched = false;
        if (category === 'hotels') {
          matched = await matchAndUpdateHotel(business);
        } else {
          matched = await matchAndUpdateVenue(business, category);
        }
        
        if (matched) {
          console.log(`    ✅ Matched: ${business.name}`);
          totalMatched++;
        }
        totalScraped++;
      }
      
      // Save progress
      progress.lastCategory = category;
      progress.lastArea = area;
      progress.totalScraped += businesses.length;
      progress.totalMatched += totalMatched;
      saveProgress(progress);
      
      // Rate limit between areas
      await page.waitForTimeout(randomDelay(3000, 6000));
    }
  }
  
  await page.close();
  console.log(`\n📊 ${category}: Scraped ${totalScraped}, Matched ${totalMatched}`);
}

async function main() {
  console.log('📞 JustDial Scraper for BangaloreLife');
  console.log('=====================================\n');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const target = args[0] || 'restaurants';
  const limit = parseInt(args[1]) || 500;

  console.log(`🎯 Target: ${target}, Limit: ${limit}\n`);

  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  const context = await browser.newContext({
    userAgent,
    viewport: { width: 1280, height: 800 },
    locale: 'en-IN',
  });

  try {
    const targets = target === 'all' 
      ? ['restaurants', 'cafes', 'bars', 'hotels']
      : [target];
    
    for (const t of targets) {
      await scrapeCategory(context, t, limit);
      
      // Pause between categories
      if (targets.length > 1) {
        console.log('\n⏸️ Pausing 2 minutes between categories...\n');
        await new Promise(r => setTimeout(r, 120000));
      }
    }
    
    console.log('\n✅ JustDial scraping complete!');
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await context.close();
    await browser.close();
  }
}

main();
