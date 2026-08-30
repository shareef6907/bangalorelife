/**
 * RAG Pipeline for BangaloreLife AI Chatbot
 * Retrieval Augmented Generation using Gemini + pgvector
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { embedText, toPgVector } from './embeddings';

// Gemini API config
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Arjun persona - the local expert
const ARJUN_SYSTEM_PROMPT = `You are Arjun, a BangaloreLife local expert. You were born and raised in Bangalore, you've lived across Koramangala, Indiranagar, and Jayanagar, and you know this city like the back of your hand.

You speak like a friendly, knowledgeable local — warm, casual, occasionally use light Bangalore slang ("yaar", "da", "total chill spot"), but never over the top. You give real recommendations like a friend would, not like a travel brochure. You know every lane, every shortcut, every hidden gem.

STRICT RULES:
- Only recommend venues from the CONTEXT data provided to you. Never invent venues.
- If you don't have a venue that fits, say "honestly yaar, I don't have a great match for that in my list right now — but try checking [neighbourhood] area, lots of new spots opening there"
- Always mention the neighbourhood, a vibe description, and one specific detail (parking, outdoor seating, best dish, etc.)
- Keep responses conversational — 3 to 5 sentences max per venue, never a dry list
- If someone asks about a street or area you have context for, describe it naturally before giving recommendations
- Never say "As an AI" or "I am a language model" — you are Arjun, period
- If asked about yourself, you're a Bangalore local who loves food and nightlife
- Use "da" or "yaar" occasionally but don't overdo it`;

export interface RetrievedVenue {
  id: string;
  name: string;
  slug: string;
  type: string;
  neighborhood: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  google_rating: number | null;
  cuisine_types: string[] | null;
  features: string[] | null;
  price_range: string | null;
  description: string | null;
  opening_hours: any;
  similarity: number;
}

export interface AreaContext {
  area_slug: string;
  area_name: string;
  vibe: string | null;
  known_for: string[] | null;
  best_time: string | null;
  who_goes_there: string | null;
  local_tips: string | null;
  landmarks: string[] | null;
  street_context: string | null;
}

export interface RAGResponse {
  message: string;
  venues: RetrievedVenue[];
  areaContext: AreaContext | null;
  responseTimeMs: number;
}

/**
 * Main RAG query function
 */
export async function ragQuery(
  query: string,
  supabase: SupabaseClient,
  options: {
    maxVenues?: number;
    filterNeighborhood?: string;
    filterTypes?: string[];
  } = {}
): Promise<RAGResponse> {
  const startTime = Date.now();
  const { maxVenues = 8, filterNeighborhood, filterTypes } = options;

  // Step 1: Embed the user's query
  console.log('[RAG] Embedding query:', query);
  const queryEmbedding = await embedText(query);

  // Step 2: Retrieve relevant venues via vector search
  console.log('[RAG] Searching venues...');
  const { data: venues, error: venueError } = await supabase.rpc('match_venues', {
    query_embedding: toPgVector(queryEmbedding),
    match_count: maxVenues,
    filter_neighborhood: filterNeighborhood || null,
    filter_types: filterTypes || null,
  });

  if (venueError) {
    console.error('[RAG] Venue search error:', venueError);
    throw new Error('Failed to search venues');
  }

  console.log(`[RAG] Found ${venues?.length || 0} relevant venues`);

  // Step 3: Detect and retrieve area context
  const detectedArea = detectArea(query);
  let areaContext: AreaContext | null = null;

  if (detectedArea) {
    console.log('[RAG] Detected area:', detectedArea);
    const { data: areas } = await supabase.rpc('get_area_context', {
      area: detectedArea
    });
    if (areas && areas.length > 0) {
      areaContext = areas[0];
    }
  }

  // Step 4: Build context for Gemini
  const context = buildContext(venues || [], areaContext);

  // Step 5: Generate response with Gemini
  console.log('[RAG] Generating response...');
  const message = await generateResponse(query, context);

  return {
    message,
    venues: venues || [],
    areaContext,
    responseTimeMs: Date.now() - startTime,
  };
}

/**
 * Detect neighbourhood mentioned in query
 */
function detectArea(query: string): string | null {
  const queryLower = query.toLowerCase();
  
  const areaMap: Record<string, string> = {
    'koramangala': 'koramangala',
    'indiranagar': 'indiranagar',
    'indira nagar': 'indiranagar',
    'hsr': 'hsr-layout',
    'hsr layout': 'hsr-layout',
    'whitefield': 'whitefield',
    'white field': 'whitefield',
    'jayanagar': 'jayanagar',
    'jaya nagar': 'jayanagar',
    'jp nagar': 'jp-nagar',
    'jpnagar': 'jp-nagar',
    'malleshwaram': 'malleshwaram',
    'malleswaram': 'malleshwaram',
    'mg road': 'mg-road',
    'brigade road': 'brigade-road',
    'brigade': 'brigade-road',
    'ub city': 'ub-city',
    'electronic city': 'electronic-city',
    'ec': 'electronic-city',
    'btm': 'btm-layout',
    'btm layout': 'btm-layout',
    'marathahalli': 'marathahalli',
    'sarjapur': 'sarjapur',
    'sarjapur road': 'sarjapur',
    'yelahanka': 'yelahanka',
    'hebbal': 'hebbal',
    'rajajinagar': 'rajajinagar',
    'basavanagudi': 'basavanagudi',
    'basavangudi': 'basavanagudi',
    'sadashivanagar': 'sadashivanagar',
    'cunningham road': 'cunningham-road',
    'church street': 'church-street',
    'lavelle road': 'lavelle-road',
    'residency road': 'residency-road',
    'commercial street': 'commercial-street',
    'bannerghatta': 'bannerghatta-road',
    'bannerghatta road': 'bannerghatta-road',
    'old airport road': 'old-airport-road',
    'domlur': 'domlur',
    'ejipura': 'ejipura',
    'austin town': 'austin-town',
  };

  for (const [keyword, slug] of Object.entries(areaMap)) {
    if (queryLower.includes(keyword)) {
      return slug;
    }
  }

  return null;
}

/**
 * Build context string for Gemini
 */
function buildContext(venues: RetrievedVenue[], areaContext: AreaContext | null): string {
  const parts: string[] = [];

  // Area context first
  if (areaContext) {
    parts.push('=== AREA CONTEXT ===');
    parts.push(`${areaContext.area_name}:`);
    if (areaContext.vibe) parts.push(`Vibe: ${areaContext.vibe}`);
    if (areaContext.known_for?.length) parts.push(`Known for: ${areaContext.known_for.join(', ')}`);
    if (areaContext.who_goes_there) parts.push(`Crowd: ${areaContext.who_goes_there}`);
    if (areaContext.local_tips) parts.push(`Local tip: ${areaContext.local_tips}`);
    if (areaContext.landmarks?.length) parts.push(`Landmarks: ${areaContext.landmarks.join(', ')}`);
    parts.push('');
  }

  // Venue list
  if (venues.length > 0) {
    parts.push('=== VENUES (only recommend from this list) ===');
    
    venues.forEach((v, i) => {
      const details: string[] = [];
      details.push(`${i + 1}. ${v.name}`);
      details.push(`   Type: ${v.type} | Area: ${formatNeighborhood(v.neighborhood)}`);
      
      if (v.cuisine_types?.length) {
        details.push(`   Cuisines: ${v.cuisine_types.join(', ')}`);
      }
      if (v.features?.length) {
        details.push(`   Features: ${v.features.join(', ')}`);
      }
      if (v.google_rating) {
        details.push(`   Rating: ${v.google_rating}/5`);
      }
      if (v.price_range) {
        details.push(`   Price: ${v.price_range}`);
      }
      if (v.address) {
        details.push(`   Address: ${v.address}`);
      }
      if (v.description) {
        details.push(`   About: ${v.description.slice(0, 200)}...`);
      }
      
      parts.push(details.join('\n'));
    });
  } else {
    parts.push('=== NO MATCHING VENUES FOUND ===');
    parts.push('No venues in the database match this query well.');
    parts.push('Suggest the user try a different area or be more specific.');
  }

  return parts.join('\n');
}

/**
 * Generate response using Gemini with context
 */
async function generateResponse(query: string, context: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const fullPrompt = `${ARJUN_SYSTEM_PROMPT}

---
CONTEXT (use ONLY this data for recommendations):
${context}
---

User: ${query}

Arjun:`;

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: fullPrompt }] }
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1000,
        topP: 0.95,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[RAG] Gemini error:', error);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 
    "Hmm, I'm having trouble thinking right now. Try asking again?";
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
 * Get directions URL for a venue
 */
export function getDirectionsUrl(venue: RetrievedVenue): string {
  if (venue.address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.address)}`;
  }
  return `https://www.google.com/maps/search/${encodeURIComponent(venue.name + ' Bangalore')}`;
}
