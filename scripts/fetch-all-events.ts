/**
 * Combined Event Fetcher for BangaloreLife.com
 * 
 * Runs all scrapers and updates Supabase
 * 
 * Run: npx tsx scripts/fetch-all-events.ts
 */

import { execSync } from 'child_process';
import { createClient } from '@supabase/supabase-js';

// Load env
import { config } from 'dotenv';
config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function runScraper(name: string, script: string) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Running ${name}...`);
  console.log('='.repeat(50));
  
  try {
    execSync(`npx tsx ${script}`, { 
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log(`✅ ${name} completed`);
    return true;
  } catch (error) {
    console.error(`❌ ${name} failed:`, error);
    return false;
  }
}

async function getStats() {
  const { count: totalEvents } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('city', 'bangalore')
    .eq('is_active', true);
  
  const { count: bmsEvents } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('source_name', 'bookmyshow');
  
  const { count: insiderEvents } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('source_name', 'insider');
  
  return {
    total: totalEvents || 0,
    bookmyshow: bmsEvents || 0,
    insider: insiderEvents || 0,
  };
}

async function main() {
  console.log('🎫 BangaloreLife.com - Event Fetcher');
  console.log(`Started: ${new Date().toISOString()}\n`);
  
  const results = {
    bookmyshow: false,
    insider: false,
  };
  
  // Run BookMyShow scraper
  results.bookmyshow = await runScraper('BookMyShow Scraper', 'scripts/scrape-bookmyshow.ts');
  
  // Run Insider.in scraper
  results.insider = await runScraper('Insider.in Scraper', 'scripts/scrape-insider.ts');
  
  // Get final stats
  const stats = await getStats();
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 FINAL STATS');
  console.log('='.repeat(50));
  console.log(`Total Events: ${stats.total}`);
  console.log(`  - BookMyShow: ${stats.bookmyshow}`);
  console.log(`  - Insider.in: ${stats.insider}`);
  console.log('\nScrapers:');
  console.log(`  - BookMyShow: ${results.bookmyshow ? '✅' : '❌'}`);
  console.log(`  - Insider.in: ${results.insider ? '✅' : '❌'}`);
  console.log(`\nFinished: ${new Date().toISOString()}`);
  
  // Exit with error if both failed
  if (!results.bookmyshow && !results.insider) {
    process.exit(1);
  }
}

main();
