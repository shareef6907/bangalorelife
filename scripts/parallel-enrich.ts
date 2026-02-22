/**
 * Parallel Venue Enrichment
 * Runs multiple enrichment workers in parallel
 * 
 * Usage: pnpm tsx scripts/parallel-enrich.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Priority order
const PRIORITY_AREAS = [
  'koramangala', 'indiranagar', 'hsr-layout', 'mg-road', 'whitefield',
  'jp-nagar', 'btm-layout', 'marathahalli', 'electronic-city', 'jayanagar',
  'malleshwaram', 'rajajinagar', 'frazer-town', 'bangalore-central'
];

const PRIORITY_TYPES = ['restaurant', 'cafe', 'bar', 'pub', 'brewery', 'bakery'];

async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
    })
  });
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

interface EnrichResult {
  idx: number;
  cuisines: string[];
  features: string[];
  price: string | null;
}

async function enrichBatch(venues: any[]): Promise<EnrichResult[]> {
  const prompt = `Classify these Bangalore venues. Return ONLY a JSON array.

Venues:
${venues.map((v, i) => `${i + 1}. "${v.name}" (${v.type}, ${v.neighborhood})`).join('\n')}

Return JSON array:
[{ "idx": 1, "cuisines": [...], "features": [...], "price": "₹"|"₹₹"|"₹₹₹"|"₹₹₹₹"|null }, ...]

Cuisines: South Indian, North Indian, Biryani, Hyderabadi, Andhra, Chinese, Italian, Continental, Cafe, Coffee, Bakery, Fast Food, Street Food, Multi-Cuisine, Seafood, Mughlai, Punjabi, etc.
Features: veg-only, non-veg, casual, fine-dining, family-friendly, romantic, rooftop, live-music, craft-beer, wifi, breakfast, brunch, late-night, outdoor-seating, bar, delivery, iconic, etc.

Known chains: Sukh Sagar/Shanti Sagar=South Indian veg; Nandhini/Nandhana=Andhra biryani; Empire=North Indian biryani; Toit/Arbor=craft-beer brewery; CCD/Starbucks=Cafe coffee`;

  try {
    const result = await callGemini(prompt);
    const clean = result.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    const match = clean.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
  } catch (e: any) {
    console.error('  Parse error:', e.message);
  }
  return [];
}

async function worker(workerId: number, venues: any[]): Promise<number> {
  let updated = 0;
  const BATCH_SIZE = 10;

  for (let i = 0; i < venues.length; i += BATCH_SIZE) {
    const batch = venues.slice(i, i + BATCH_SIZE);
    const results = await enrichBatch(batch);

    for (const r of results) {
      const v = batch[r.idx - 1];
      if (!v || !r.cuisines?.length) continue;

      const { error } = await supabase.from('venues').update({
        cuisine_types: r.cuisines,
        features: r.features || [],
        price_range: r.price
      }).eq('id', v.id);

      if (!error) updated++;
    }

    console.log(`  [W${workerId}] ${Math.min(i + BATCH_SIZE, venues.length)}/${venues.length} (+${results.length})`);
    
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 100));
  }

  return updated;
}

async function main() {
  console.log('🚀 Parallel Venue Enrichment Starting...\n');

  // Get all unenriched priority venues
  const { data: allVenues, error } = await supabase
    .from('venues')
    .select('id, name, type, neighborhood')
    .eq('is_active', true)
    .in('type', PRIORITY_TYPES)
    .in('neighborhood', PRIORITY_AREAS)
    .or('cuisine_types.is.null,cuisine_types.eq.{}')
    .limit(1000);

  if (error || !allVenues?.length) {
    console.log('No venues to enrich or error:', error?.message);
    return;
  }

  console.log(`Found ${allVenues.length} priority venues to enrich\n`);

  // Split into 4 workers
  const WORKER_COUNT = 4;
  const chunkSize = Math.ceil(allVenues.length / WORKER_COUNT);
  const chunks: any[][] = [];

  for (let i = 0; i < WORKER_COUNT; i++) {
    chunks.push(allVenues.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  console.log(`Starting ${WORKER_COUNT} parallel workers...\n`);

  // Run workers in parallel
  const results = await Promise.all(
    chunks.map((chunk, i) => worker(i + 1, chunk))
  );

  const totalUpdated = results.reduce((a, b) => a + b, 0);
  console.log(`\n✅ Enrichment Complete!`);
  console.log(`   Total updated: ${totalUpdated}`);

  // Show final stats
  const { count: withCuisine } = await supabase
    .from('venues')
    .select('*', { count: 'exact', head: true })
    .not('cuisine_types', 'is', null)
    .neq('cuisine_types', '{}');

  console.log(`   Venues with cuisine data: ${withCuisine}`);
}

main().catch(console.error);
