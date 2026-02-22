/**
 * Generate sitemap.xml for BangaloreLife.com
 * Includes all venue pages for Google indexing
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SITE_URL = 'https://bangalorelife.com';

async function generateSitemap() {
  console.log('🗺️ Generating sitemap...\n');

  // Get all active venues (paginate to get all 12K)
  const allVenues: any[] = [];
  let offset = 0;
  const PAGE_SIZE = 1000;
  
  while (true) {
    const { data: batch, error: batchError } = await supabase
      .from('venues')
      .select('slug, updated_at')
      .eq('is_active', true)
      .range(offset, offset + PAGE_SIZE - 1)
      .order('updated_at', { ascending: false });
    
    if (batchError || !batch?.length) break;
    allVenues.push(...batch);
    offset += PAGE_SIZE;
    if (batch.length < PAGE_SIZE) break;
  }
  
  const venues = allVenues;
  const error = null;

  if (error) {
    console.error('Database error:', error.message);
    return;
  }

  console.log(`Found ${venues?.length || 0} venues`);

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/venues', priority: '0.9', changefreq: 'daily' },
    { url: '/neighborhoods', priority: '0.8', changefreq: 'weekly' },
    { url: '/guides', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.5', changefreq: 'monthly' },
    // Neighborhoods
    { url: '/neighborhoods/koramangala', priority: '0.8', changefreq: 'weekly' },
    { url: '/neighborhoods/indiranagar', priority: '0.8', changefreq: 'weekly' },
    { url: '/neighborhoods/hsr-layout', priority: '0.8', changefreq: 'weekly' },
    { url: '/neighborhoods/whitefield', priority: '0.8', changefreq: 'weekly' },
    { url: '/neighborhoods/mg-road-brigade-road', priority: '0.8', changefreq: 'weekly' },
    { url: '/neighborhoods/church-street', priority: '0.7', changefreq: 'weekly' },
    { url: '/neighborhoods/hennur-kalyan-nagar', priority: '0.7', changefreq: 'weekly' },
    // Guides
    { url: '/guides/best-pubs-bangalore', priority: '0.8', changefreq: 'weekly' },
    { url: '/guides/best-breweries-bangalore', priority: '0.8', changefreq: 'weekly' },
    { url: '/guides/best-rooftop-bars-bangalore', priority: '0.8', changefreq: 'weekly' },
    { url: '/guides/best-cafes-bangalore', priority: '0.8', changefreq: 'weekly' },
    { url: '/guides/best-street-food-bangalore', priority: '0.7', changefreq: 'weekly' },
    { url: '/guides/date-night-bangalore', priority: '0.7', changefreq: 'weekly' },
    { url: '/guides/things-to-do-bangalore', priority: '0.7', changefreq: 'weekly' },
    { url: '/guides/day-trips-from-bangalore', priority: '0.7', changefreq: 'monthly' },
    // Categories
    { url: '/nightlife', priority: '0.7', changefreq: 'weekly' },
    { url: '/restaurants', priority: '0.7', changefreq: 'weekly' },
    { url: '/cafes', priority: '0.7', changefreq: 'weekly' },
    { url: '/breweries', priority: '0.7', changefreq: 'weekly' },
    { url: '/things-to-do', priority: '0.7', changefreq: 'weekly' },
    { url: '/weekend-getaways', priority: '0.6', changefreq: 'monthly' },
  ];

  const today = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add static pages
  for (const page of staticPages) {
    sitemap += `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Add venue pages
  for (const venue of venues || []) {
    const lastmod = venue.updated_at 
      ? new Date(venue.updated_at).toISOString().split('T')[0]
      : today;
    
    sitemap += `  <url>
    <loc>${SITE_URL}/venues/${venue.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  }

  sitemap += `</urlset>`;

  // Write sitemap
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log(`✅ Sitemap generated: public/sitemap.xml`);
  console.log(`   Total URLs: ${staticPages.length + (venues?.length || 0)}`);

  // Also create robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync('public/robots.txt', robots);
  console.log(`✅ robots.txt generated: public/robots.txt`);
}

generateSitemap().catch(console.error);
