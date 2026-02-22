/**
 * AI-Powered Venue Enrichment for BangaloreLife.com
 * Uses Gemini to intelligently classify venues with cuisine types and features
 * 
 * Usage: pnpm tsx scripts/enrich-venues-ai.ts [--limit=100] [--type=restaurant]
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

interface VenueEnrichment {
  cuisine_types: string[];
  features: string[];
  price_range: string | null;
  description: string | null;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 1024 }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function enrichVenue(venue: {
  name: string;
  type: string;
  neighborhood: string;
}): Promise<VenueEnrichment | null> {
  const prompt = `You are a Bangalore restaurant/venue classification expert.

Given this venue in Bangalore, classify it with cuisine types and features.
Return ONLY valid JSON, no markdown.

Venue: "${venue.name}"
Type: ${venue.type}
Neighborhood: ${venue.neighborhood}

Return JSON with:
{
  "cuisine_types": [...],  // Array of cuisine types. Use: South Indian, North Indian, Chinese, Italian, Continental, Mexican, Thai, Japanese, Korean, Mediterranean, American, Fast Food, Street Food, Bakery, Desserts, Cafe, Bar Food, Biryani, Hyderabadi, Andhra, Kerala, Mughlai, Punjabi, Seafood, Multi-Cuisine, etc.
  "features": [...],  // Array from: wifi, rooftop, live-music, dj, outdoor-seating, pet-friendly, romantic, craft-beer, sports-bar, karaoke, hookah, late-night, breakfast, brunch, buffet, fine-dining, casual, family-friendly, veg-only, non-veg, bar, delivery, takeaway, dine-in, etc.
  "price_range": "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹" | null,  // Budget to Luxury
  "description": "Brief 1-sentence description or null if unknown"
}

IMPORTANT:
- If it's a well-known chain (like Toit, Sukh Sagar, Nandhini, Shanti Sagar, A2B, MTR), you know what they serve
- Use context clues from the name (e.g., "Biryani House" → Biryani, Hyderabadi)
- For unknown venues, make educated guesses based on type and neighborhood
- Koramangala/Indiranagar tend to have upscale places
- If truly unknown, return minimal data with just the venue type

Examples:
- "Toit Brewpub" → craft-beer, brewery, Continental, live-music, rooftop
- "Sukh Sagar" → South Indian, veg-only, casual, budget
- "Nandhini" → Andhra, Non-veg, biryani, casual, budget
- "Starbucks" → Cafe, Coffee, wifi, casual`;

  try {
    const result = await callGemini(prompt);
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e: any) {
    console.error(`Failed to enrich ${venue.name}:`, e.message);
  }
  return null;
}

async function batchEnrichVenues(venues: any[]): Promise<Map<string, VenueEnrichment>> {
  // Batch up to 10 venues per request to save API calls
  const results = new Map<string, VenueEnrichment>();
  
  const BATCH_SIZE = 5;
  for (let i = 0; i < venues.length; i += BATCH_SIZE) {
    const batch = venues.slice(i, i + BATCH_SIZE);
    
    const prompt = `You are a Bangalore restaurant/venue classification expert.

Classify these ${batch.length} venues with cuisine types and features.
Return ONLY a JSON array, no markdown.

Venues:
${batch.map((v, idx) => `${idx + 1}. "${v.name}" (${v.type}, ${v.neighborhood})`).join('\n')}

Return JSON array with one object per venue:
[
  {
    "name": "exact venue name",
    "cuisine_types": [...],
    "features": [...],
    "price_range": "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹" | null
  },
  ...
]

Cuisine types: South Indian, North Indian, Chinese, Italian, Continental, Mexican, Thai, Japanese, Korean, Mediterranean, American, Fast Food, Street Food, Bakery, Desserts, Cafe, Bar Food, Biryani, Hyderabadi, Andhra, Kerala, Mughlai, Punjabi, Seafood, Multi-Cuisine, Bengali, Gujarati, etc.

Features: wifi, rooftop, live-music, dj, outdoor-seating, pet-friendly, romantic, craft-beer, sports-bar, karaoke, hookah, late-night, breakfast, brunch, buffet, fine-dining, casual, family-friendly, veg-only, non-veg, bar, delivery, takeaway, dine-in, etc.

IMPORTANT: Known Bangalore chains:
- Sukh Sagar, Shanti Sagar, Sagar → South Indian, veg-only, casual, ₹
- Nandhini, Nandhana → Andhra, biryani, non-veg, ₹₹
- A2B (Adyar Ananda Bhavan), MTR → South Indian, veg-only, ₹₹
- Toit, Arbor, Windmills → Brewery, craft-beer, Continental, ₹₹₹
- Empire → North Indian, biryani, non-veg, ₹₹`;

    try {
      const result = await callGemini(prompt);
      // Handle markdown code blocks and extract JSON array
      let jsonStr = result;
      // Remove markdown code blocks
      jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        for (const item of parsed) {
          const matchedVenue = batch.find(v => 
            v.name.toLowerCase() === item.name?.toLowerCase() ||
            v.name.toLowerCase().includes(item.name?.toLowerCase()) ||
            item.name?.toLowerCase().includes(v.name.toLowerCase())
          );
          if (matchedVenue) {
            results.set(matchedVenue.id, item);
          }
        }
      }
    } catch (e: any) {
      console.error(`Batch error:`, e.message);
      // Fall back to individual enrichment
      for (const venue of batch) {
        const enrichment = await enrichVenue(venue);
        if (enrichment) {
          results.set(venue.id, enrichment);
        }
        await delay(200);
      }
    }
    
    // Rate limiting
    await delay(500);
    process.stdout.write(`\rProcessed ${Math.min(i + BATCH_SIZE, venues.length)}/${venues.length}`);
  }
  
  console.log('');
  return results;
}

async function updateVenues(enrichments: Map<string, VenueEnrichment>) {
  let updated = 0;
  let failed = 0;

  for (const [id, data] of enrichments) {
    const updatePayload: any = {};
    
    if (data.cuisine_types && data.cuisine_types.length > 0) {
      updatePayload.cuisine_types = data.cuisine_types;
    }
    
    if (data.features && data.features.length > 0) {
      updatePayload.features = data.features;
    }
    
    if (data.price_range) {
      updatePayload.price_range = data.price_range;
    }

    if (Object.keys(updatePayload).length === 0) {
      failed++;
      continue;
    }

    const { error } = await supabase
      .from('venues')
      .update(updatePayload)
      .eq('id', id);

    if (error) {
      console.error(`Failed to update ${id}:`, error.message);
      failed++;
    } else {
      updated++;
    }
  }

  return { updated, failed };
}

async function main() {
  console.log('🧠 AI-Powered Venue Enrichment Starting...\n');

  // Parse CLI args
  const args = process.argv.slice(2);
  let limit = 100;
  let venueType: string | null = null;

  for (const arg of args) {
    if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1]);
    if (arg.startsWith('--type=')) venueType = arg.split('=')[1];
  }

  // Get venues needing enrichment
  let query = supabase
    .from('venues')
    .select('id, name, type, neighborhood')
    .eq('is_active', true)
    .or('cuisine_types.is.null,cuisine_types.eq.{}')
    .in('type', ['restaurant', 'cafe', 'bar', 'pub', 'brewery', 'bakery']);

  if (venueType) {
    query = query.eq('type', venueType);
  }

  query = query.limit(limit);

  const { data: venues, error } = await query;

  if (error) {
    console.error('Database error:', error.message);
    return;
  }

  console.log(`Found ${venues?.length || 0} venues to enrich`);
  
  if (!venues || venues.length === 0) {
    console.log('No venues need enrichment!');
    return;
  }

  // Enrich venues
  const enrichments = await batchEnrichVenues(venues);
  console.log(`Got enrichment data for ${enrichments.size} venues`);

  // Update database
  console.log('\nUpdating database...');
  const { updated, failed } = await updateVenues(enrichments);

  console.log(`\n📊 Enrichment Complete!`);
  console.log(`   ✅ Updated: ${updated}`);
  console.log(`   ❌ Failed: ${failed}`);

  // Show sample results
  console.log('\n📝 Sample enriched venues:');
  const { data: samples } = await supabase
    .from('venues')
    .select('name, cuisine_types, features, price_range')
    .not('cuisine_types', 'is', null)
    .in('type', ['restaurant', 'cafe', 'bar'])
    .limit(5);
  
  if (samples) {
    for (const s of samples) {
      console.log(`   - ${s.name}: ${s.cuisine_types?.join(', ')} | ${s.features?.join(', ') || 'no features'}`);
    }
  }
}

main().catch(console.error);
