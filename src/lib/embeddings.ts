/**
 * Gemini Embeddings for BangaloreLife RAG
 * Uses text-embedding-004 (768 dimensions)
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const EMBEDDING_MODEL = 'text-embedding-004';
const EMBEDDING_URL = `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent`;
const BATCH_EMBEDDING_URL = `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:batchEmbedContents`;

export interface EmbeddingResult {
  embedding: number[];
  tokenCount?: number;
}

/**
 * Generate embedding for a single text
 */
export async function embedText(text: string): Promise<number[]> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const response = await fetch(`${EMBEDDING_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: `models/${EMBEDDING_MODEL}`,
      content: {
        parts: [{ text }]
      },
      taskType: 'RETRIEVAL_QUERY'
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Embedding API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.embedding?.values || [];
}

/**
 * Generate embeddings for multiple texts in a batch
 * More efficient for bulk operations
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  if (texts.length === 0) return [];
  if (texts.length === 1) return [await embedText(texts[0])];

  // Gemini batch API accepts up to 100 texts
  const batchSize = 100;
  const results: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    
    const response = await fetch(`${BATCH_EMBEDDING_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: `models/${EMBEDDING_MODEL}`,
        requests: batch.map(text => ({
          model: `models/${EMBEDDING_MODEL}`,
          content: {
            parts: [{ text }]
          },
          taskType: 'RETRIEVAL_DOCUMENT'
        }))
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Batch embedding API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const embeddings = data.embeddings?.map((e: any) => e.values) || [];
    results.push(...embeddings);

    // Rate limiting: 1500 requests/minute = 25/second
    // With batches of 100, we can do 15 batches per second
    // Add small delay between batches to be safe
    if (i + batchSize < texts.length) {
      await sleep(100);
    }
  }

  return results;
}

/**
 * Create embedding text for a venue
 * Concatenates key fields into a searchable text block
 */
export function createVenueEmbeddingText(venue: {
  name: string;
  type: string;
  neighborhood: string;
  description?: string | null;
  cuisine_types?: string[] | null;
  features?: string[] | null;
  price_range?: string | null;
  google_rating?: number | null;
  address?: string | null;
}): string {
  const parts: string[] = [];

  // Core identity
  parts.push(`${venue.name} is a ${venue.type} in ${formatNeighborhood(venue.neighborhood)}, Bangalore.`);

  // Description
  if (venue.description) {
    parts.push(venue.description);
  }

  // Cuisines
  if (venue.cuisine_types && venue.cuisine_types.length > 0) {
    parts.push(`Cuisines: ${venue.cuisine_types.join(', ')}.`);
  }

  // Features
  if (venue.features && venue.features.length > 0) {
    parts.push(`Features: ${venue.features.join(', ')}.`);
  }

  // Price range
  if (venue.price_range) {
    parts.push(`Price range: ${venue.price_range}.`);
  }

  // Rating
  if (venue.google_rating) {
    parts.push(`Google rating: ${venue.google_rating}/5.`);
  }

  // Address (for street-level context)
  if (venue.address) {
    parts.push(`Located at ${venue.address}.`);
  }

  return parts.join(' ');
}

/**
 * Create embedding text for a neighbourhood
 */
export function createAreaEmbeddingText(area: {
  area_name: string;
  vibe?: string | null;
  known_for?: string[] | null;
  who_goes_there?: string | null;
  local_tips?: string | null;
  landmarks?: string[] | null;
}): string {
  const parts: string[] = [];

  parts.push(`${area.area_name} is a neighbourhood in Bangalore.`);

  if (area.vibe) {
    parts.push(`Vibe: ${area.vibe}.`);
  }

  if (area.known_for && area.known_for.length > 0) {
    parts.push(`Known for: ${area.known_for.join(', ')}.`);
  }

  if (area.who_goes_there) {
    parts.push(`Who goes there: ${area.who_goes_there}.`);
  }

  if (area.local_tips) {
    parts.push(area.local_tips);
  }

  if (area.landmarks && area.landmarks.length > 0) {
    parts.push(`Landmarks: ${area.landmarks.join(', ')}.`);
  }

  return parts.join(' ');
}

/**
 * Format neighbourhood slug to readable name
 */
function formatNeighborhood(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Sleep helper for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Convert embedding array to pgvector format string
 */
export function toPgVector(embedding: number[]): string {
  return `[${embedding.join(',')}]`;
}

/**
 * Parse pgvector format string to array
 */
export function fromPgVector(pgvector: string): number[] {
  return JSON.parse(pgvector.replace(/^\[/, '[').replace(/\]$/, ']'));
}
