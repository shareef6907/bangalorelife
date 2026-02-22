/**
 * Gemini AI Integration for BangaloreLife.com
 * Conversational search powered by Google Gemini 1.5 Flash
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'REDACTED_API_KEY';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface ClassifiedIntent {
  intent: 'food' | 'nightlife' | 'movies' | 'shopping' | 'health' | 'events' | 'travel' | 'services' | 'general';
  subcategory: string | null;
  area: string | null;
  budget: 'budget' | 'mid' | 'premium' | 'luxury' | null;
  mood: 'romantic' | 'fun' | 'chill' | 'family' | 'adventure' | null;
  time_context: 'now' | 'tonight' | 'this_weekend' | 'general';
  keywords: string[];
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  type: string;
  neighborhood: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  rating: number | null;
  google_rating: number | null;
  cuisine_types: string[];
  features: string[];
  opening_hours: any;
}

export interface ChatResponse {
  message: string;
  venues: Venue[];
  intent: ClassifiedIntent;
  responseTimeMs: number;
}

async function callGemini(prompt: string, systemPrompt?: string): Promise<string> {
  const contents = [];
  
  if (systemPrompt) {
    contents.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });
    contents.push({
      role: 'model', 
      parts: [{ text: 'Understood. I will follow these instructions.' }]
    });
  }
  
  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Step 1: Classify user intent
 */
export async function classifyIntent(query: string): Promise<ClassifiedIntent> {
  const systemPrompt = `You are a query classifier for BangaloreLife.com, a Bangalore city guide.
Classify user queries into structured JSON. Return ONLY valid JSON, no markdown.

Fields:
- intent: food, nightlife, movies, shopping, health, events, travel, services, general
- subcategory: specific type (biryani, rooftop bar, comedy show, gym, etc.) or null
- area: Bangalore neighborhood if mentioned (koramangala, indiranagar, etc.) or null  
- budget: budget, mid, premium, luxury, or null
- mood: romantic, fun, chill, family, adventure, or null
- time_context: now, tonight, this_weekend, general
- keywords: array of search terms

Examples:
"best biryani in koramangala" → {"intent":"food","subcategory":"biryani","area":"koramangala","budget":null,"mood":null,"time_context":"general","keywords":["biryani","best"]}
"rooftop bars for a date tonight" → {"intent":"nightlife","subcategory":"rooftop bar","area":null,"budget":null,"mood":"romantic","time_context":"tonight","keywords":["rooftop","bar","date"]}`;

  const result = await callGemini(query, systemPrompt);
  
  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in response');
  } catch (e) {
    // Fallback to general intent
    return {
      intent: 'general',
      subcategory: null,
      area: null,
      budget: null,
      mood: null,
      time_context: 'general',
      keywords: query.toLowerCase().split(/\s+/).filter(w => w.length > 2)
    };
  }
}

/**
 * Step 2: Build database query based on intent
 */
export function buildVenueQuery(intent: ClassifiedIntent): {
  filters: Record<string, any>;
  searchTerms: string[];
} {
  const filters: Record<string, any> = {
    is_active: true
  };
  const searchTerms: string[] = [...intent.keywords];

  // Map intent to venue types
  const intentTypeMap: Record<string, string[]> = {
    food: ['restaurant', 'cafe', 'bakery'],
    nightlife: ['bar', 'pub', 'club', 'lounge'],
    movies: ['cinema'],
    shopping: ['mall', 'supermarket'],
    health: ['hospital', 'pharmacy', 'gym', 'spa', 'dentist'],
    services: ['bank', 'atm'],
    travel: ['hotel'],
    events: ['cinema', 'club'], // venues that host events
    general: []
  };

  const types = intentTypeMap[intent.intent] || [];
  if (types.length > 0) {
    filters.types = types;
  }

  // Add area filter
  if (intent.area) {
    filters.neighborhood = intent.area.toLowerCase().replace(/\s+/g, '-');
  }

  // Add subcategory to search terms
  if (intent.subcategory) {
    searchTerms.push(intent.subcategory);
  }

  return { filters, searchTerms };
}

/**
 * Step 3: Generate conversational response
 */
export async function generateResponse(
  query: string,
  venues: Venue[],
  intent: ClassifiedIntent
): Promise<string> {
  const systemPrompt = `You are BangaloreLife AI, a cool, knowledgeable local friend who knows every spot in Bangalore.

RULES:
- Be warm, casual, and conversational - NOT robotic or listy
- Be opinionated - highlight favorites and say why
- If suggesting multiple places, weave them naturally into the response
- Include specific details: neighborhood, what they're known for
- If creating an itinerary (date night, day plan), give step-by-step with timing
- Include all venue names exactly as provided - don't invent places
- If few results match, say so honestly and suggest alternatives
- NEVER use emojis
- Sound like a friend giving advice, not a search engine
- Keep responses concise but helpful (2-4 paragraphs max)`;

  const venueContext = venues.slice(0, 10).map(v => ({
    name: v.name,
    type: v.type,
    neighborhood: v.neighborhood,
    rating: v.google_rating || v.rating,
    cuisine: v.cuisine_types?.join(', ') || null,
    features: v.features?.join(', ') || null
  }));

  const prompt = `User asked: "${query}"

Intent: ${intent.intent} | Area: ${intent.area || 'any'} | Mood: ${intent.mood || 'any'}

Matching venues from our database:
${JSON.stringify(venueContext, null, 2)}

Generate a helpful, conversational response recommending these places. If it's a "plan my day" or "date night" type query, create a mini itinerary with timing.`;

  return callGemini(prompt, systemPrompt);
}

/**
 * Full chat pipeline
 */
export async function chat(
  query: string,
  supabase: any // Supabase client
): Promise<ChatResponse> {
  const startTime = Date.now();

  // Step 1: Classify intent
  const intent = await classifyIntent(query);

  // Step 2: Query database
  const { filters, searchTerms } = buildVenueQuery(intent);
  
  let dbQuery = supabase
    .from('venues')
    .select('id, name, slug, type, neighborhood, address, phone, website, rating, google_rating, cuisine_types, features, opening_hours')
    .eq('is_active', true)
    .limit(20);

  // Apply type filter
  if (filters.types && filters.types.length > 0) {
    dbQuery = dbQuery.in('type', filters.types);
  }

  // Apply area filter
  if (filters.neighborhood) {
    dbQuery = dbQuery.eq('neighborhood', filters.neighborhood);
  }

  // Order by rating
  dbQuery = dbQuery.order('google_rating', { ascending: false, nullsFirst: false });

  const { data: venues, error } = await dbQuery;

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  // Step 3: Generate response
  const message = await generateResponse(query, venues || [], intent);

  return {
    message,
    venues: venues || [],
    intent,
    responseTimeMs: Date.now() - startTime
  };
}
