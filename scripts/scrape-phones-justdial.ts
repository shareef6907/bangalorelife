/**
 * JustDial Phone Number Scraper
 * Scrapes phone numbers for restaurants/cafes/bars from JustDial
 * 
 * Usage: pnpm tsx scripts/scrape-phones-justdial.ts [--limit=100]
 */

import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// JustDial encodes phone numbers - this decodes them
function decodeJustDialPhone(encoded: string): string {
  // JustDial uses a simple character mapping
  const map: Record<string, string> = {
    'acb': '0', 'dcb': '1', 'fgh': '2', 'ihg': '3', 'lkj': '4',
    'onm': '5', 'rqp': '6', 'utv': '7', 'xwv': '8', 'zyx': '9',
    // Alternative encodings
    'icon-acb': '0', 'icon-dcb': '1', 'icon-fgh': '2', 'icon-ihg': '3',
    'icon-lkj': '4', 'icon-onm': '5', 'icon-rqp': '6', 'icon-utv': '7',
    'icon-xwv': '8', 'icon-zyx': '9'
  };
  
  let decoded = '';
  const parts = encoded.split(' ').filter(p => p.trim());
  
  for (const part of parts) {
    const digit = map[part.toLowerCase()] || map[part.replace('icon-', '').toLowerCase()];
    if (digit !== undefined) {
      decoded += digit;
    }
  }
  
  return decoded;
}

async function searchJustDial(venueName: string, area: string): Promise<string | null> {
  const searchQuery = encodeURIComponent(`${venueName} ${area} Bangalore`);
  const url = `https://www.justdial.com/Bangalore/${searchQuery.replace(/%20/g, '-')}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    
    if (!response.ok) return null;
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Try multiple selectors for phone numbers
    let phone: string | null = null;
    
    // Method 1: Look for tel: links
    const telLink = $('a[href^="tel:"]').first().attr('href');
    if (telLink) {
      phone = telLink.replace('tel:', '').replace(/\s/g, '');
    }
    
    // Method 2: Look for encoded phone spans
    if (!phone) {
      const phoneSpan = $('.mobilesv, .contact-info span, .lng_cont_detail').first();
      if (phoneSpan.length) {
        const classes = phoneSpan.find('span').map((_, el) => $(el).attr('class')).get();
        phone = decodeJustDialPhone(classes.join(' '));
      }
    }
    
    // Method 3: Look for visible phone numbers
    if (!phone) {
      const phoneMatch = html.match(/(\+91[\s-]?\d{10}|\d{10}|\d{3,4}[\s-]\d{6,7})/);
      if (phoneMatch) {
        phone = phoneMatch[1].replace(/[\s-]/g, '');
      }
    }
    
    // Validate phone number
    if (phone && phone.length >= 10) {
      // Format as +91 if not already
      phone = phone.replace(/^0+/, '');
      if (phone.length === 10) {
        phone = '+91' + phone;
      } else if (phone.startsWith('91') && phone.length === 12) {
        phone = '+' + phone;
      }
      return phone;
    }
    
    return null;
  } catch (e: any) {
    console.error(`JustDial error for ${venueName}:`, e.message);
    return null;
  }
}

async function main() {
  console.log('📞 JustDial Phone Scraper Starting...\n');
  
  // Parse args
  const args = process.argv.slice(2);
  let limit = 100;
  for (const arg of args) {
    if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1]);
  }
  
  // Get venues without phone numbers
  const { data: venues, error } = await supabase
    .from('venues')
    .select('id, name, neighborhood, type')
    .eq('is_active', true)
    .in('type', ['restaurant', 'cafe', 'bar', 'pub', 'brewery'])
    .is('phone', null)
    .limit(limit);
  
  if (error || !venues?.length) {
    console.log('No venues to process or error:', error?.message);
    return;
  }
  
  console.log(`Found ${venues.length} venues without phone numbers\n`);
  
  let found = 0;
  let notFound = 0;
  
  for (let i = 0; i < venues.length; i++) {
    const venue = venues[i];
    const area = venue.neighborhood.replace(/-/g, ' ');
    
    console.log(`[${i + 1}/${venues.length}] ${venue.name} (${area})...`);
    
    const phone = await searchJustDial(venue.name, area);
    
    if (phone) {
      const { error: updateError } = await supabase
        .from('venues')
        .update({ phone })
        .eq('id', venue.id);
      
      if (!updateError) {
        console.log(`  ✅ Found: ${phone}`);
        found++;
      } else {
        console.log(`  ❌ Update failed: ${updateError.message}`);
      }
    } else {
      console.log(`  ⚠️ Not found`);
      notFound++;
    }
    
    // Rate limiting - be nice to JustDial
    await delay(2000);
  }
  
  console.log(`\n📊 Complete!`);
  console.log(`   ✅ Found: ${found}`);
  console.log(`   ⚠️ Not found: ${notFound}`);
}

main().catch(console.error);
