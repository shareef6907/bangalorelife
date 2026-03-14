/**
 * Batch Embedding Script for BangaloreLife Venues
 * 
 * Embeds all 12,000+ venues using Gemini text-embedding-004
 * Run with: npx tsx scripts/embed-all-venues.ts
 * 
 * Features:
 * - Batch processing (100 venues at a time)
 * - Progress tracking and resumption
 * - Rate limiting to respect API quotas
 * - Checkpoint saves every batch
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const EMBEDDING_MODEL = 'text-embedding-004';
const BATCH_SIZE = 100;
const DELAY_BETWEEN_BATCHES_MS = 500; // Rate limiting
const CHECKPOINT_FILE = path.join(__dirname, '.embed-checkpoint.json');

interface Venue {
  id: string;
  name: string;
  type: string;
  neighborhood: string;
  description: string | null;
  cuisine_types: string[] | null;
  features: string[] | null;
  price_range: string | null;
  google_rating: number | null;
  address: string | null;
}

interface Checkpoint {
  lastProcessedId: string | null;
  totalProcessed: number;
  totalFailed: number;
  startedAt: string;
  lastUpdatedAt: string;
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Create embedding text for a venue
 */
function createVenueText(venue: Venue): string {
  const parts: string[] = [];

  parts.push(`${venue.name} is a ${venue.type} in ${formatNeighborhood(venue.neighborhood)}, Bangalore.`);

  if (venue.description) {
    parts.push(venue.description);
  }

  if (venue.cuisine_types?.length) {
    parts.push(`Cuisines: ${venue.cuisine_types.join(', ')}.`);
  }

  if (venue.features?.length) {
    parts.push(`Features: ${venue.features.join(', ')}.`);
  }

  if (venue.price_range) {
    parts.push(`Price range: ${venue.price_range}.`);
  }

  if (venue.google_rating) {
    parts.push(`Google rating: ${venue.google_rating}/5.`);
  }

  if (venue.address) {
    parts.push(`Located at ${venue.address}.`);
  }

  return parts.join(' ');
}

function formatNeighborhood(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Generate embeddings for a batch of texts
 */
async function embedBatch(texts: string[]): Promise<number[][]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:batchEmbedContents?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: texts.map(text => ({
        model: `models/${EMBEDDING_MODEL}`,
        content: { parts: [{ text }] },
        taskType: 'RETRIEVAL_DOCUMENT'
      }))
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Embedding API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.embeddings.map((e: any) => e.values);
}

/**
 * Load checkpoint
 */
function loadCheckpoint(): Checkpoint | null {
  try {
    if (fs.existsSync(CHECKPOINT_FILE)) {
      return JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf-8'));
    }
  } catch (e) {
    console.log('No valid checkpoint found, starting fresh');
  }
  return null;
}

/**
 * Save checkpoint
 */
function saveCheckpoint(checkpoint: Checkpoint): void {
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(checkpoint, null, 2));
}

/**
 * Main embedding process
 */
async function main() {
  console.log('🚀 BangaloreLife Venue Embedding Script');
  console.log('=====================================\n');

  // Check API key
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not set in .env.local');
    process.exit(1);
  }

  // Get stats
  const { data: stats } = await supabase.rpc('embedding_stats');
  if (stats && stats.length > 0) {
    const s = stats[0];
    console.log(`📊 Current status:`);
    console.log(`   Total venues: ${s.total_venues}`);
    console.log(`   Already embedded: ${s.embedded_venues}`);
    console.log(`   Pending: ${s.pending_venues}`);
    console.log(`   Coverage: ${s.embedding_coverage}%\n`);
  }

  // Load or create checkpoint
  let checkpoint = loadCheckpoint();
  if (!checkpoint) {
    checkpoint = {
      lastProcessedId: null,
      totalProcessed: 0,
      totalFailed: 0,
      startedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    };
  } else {
    console.log(`📂 Resuming from checkpoint:`);
    console.log(`   Already processed: ${checkpoint.totalProcessed}`);
    console.log(`   Failed: ${checkpoint.totalFailed}\n`);
  }

  let hasMore = true;
  let batchCount = 0;

  while (hasMore) {
    // Fetch batch of venues needing embedding
    let query = supabase
      .from('venues')
      .select('id, name, type, neighborhood, description, cuisine_types, features, price_range, google_rating, address')
      .eq('is_active', true)
      .is('embedding', null)
      .order('id')
      .limit(BATCH_SIZE);

    if (checkpoint.lastProcessedId) {
      query = query.gt('id', checkpoint.lastProcessedId);
    }

    const { data: venues, error } = await query;

    if (error) {
      console.error('❌ Database error:', error);
      process.exit(1);
    }

    if (!venues || venues.length === 0) {
      hasMore = false;
      console.log('\n✅ No more venues to process!');
      break;
    }

    batchCount++;
    console.log(`\n📦 Batch ${batchCount}: Processing ${venues.length} venues...`);

    try {
      // Create embedding texts
      const texts = venues.map(v => createVenueText(v));

      // Generate embeddings
      const embeddings = await embedBatch(texts);

      // Update venues with embeddings
      let successCount = 0;
      for (let i = 0; i < venues.length; i++) {
        const venue = venues[i];
        const embedding = embeddings[i];

        if (!embedding || embedding.length !== 768) {
          console.log(`   ⚠️ Invalid embedding for ${venue.name}`);
          checkpoint.totalFailed++;
          continue;
        }

        const { error: updateError } = await supabase
          .from('venues')
          .update({
            embedding: `[${embedding.join(',')}]`,
            embedding_updated_at: new Date().toISOString(),
          })
          .eq('id', venue.id);

        if (updateError) {
          console.log(`   ❌ Failed to update ${venue.name}: ${updateError.message}`);
          checkpoint.totalFailed++;
        } else {
          successCount++;
          checkpoint.totalProcessed++;
        }

        checkpoint.lastProcessedId = venue.id;
      }

      console.log(`   ✅ Embedded ${successCount}/${venues.length} venues`);

      // Save checkpoint
      checkpoint.lastUpdatedAt = new Date().toISOString();
      saveCheckpoint(checkpoint);

      // Rate limiting delay
      if (venues.length === BATCH_SIZE) {
        await sleep(DELAY_BETWEEN_BATCHES_MS);
      }

    } catch (error: any) {
      console.error(`   ❌ Batch error: ${error.message}`);
      
      // Save checkpoint and pause on error
      checkpoint.lastUpdatedAt = new Date().toISOString();
      saveCheckpoint(checkpoint);
      
      console.log('\n⏸️ Pausing for 30 seconds before retry...');
      await sleep(30000);
    }
  }

  // Final stats
  const { data: finalStats } = await supabase.rpc('embedding_stats');
  if (finalStats && finalStats.length > 0) {
    const s = finalStats[0];
    console.log(`\n🎉 Embedding complete!`);
    console.log(`   Total embedded: ${s.embedded_venues}`);
    console.log(`   Coverage: ${s.embedding_coverage}%`);
    console.log(`   Session processed: ${checkpoint.totalProcessed}`);
    console.log(`   Session failed: ${checkpoint.totalFailed}`);
  }

  // Cleanup checkpoint on complete
  if (fs.existsSync(CHECKPOINT_FILE)) {
    fs.unlinkSync(CHECKPOINT_FILE);
    console.log('\n🧹 Checkpoint file cleaned up');
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(console.error);
