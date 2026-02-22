/**
 * Gemini AI Integration for BangaloreLife.com
 * Conversational search powered by Google Gemini 2.0 Flash
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface ClassifiedIntent {
  intent: 'food' | 'nightlife' | 'movies' | 'shopping' | 'health' | 'events' | 'travel' | 'services' | 'general';
  subcategory: string | null;
  cuisines: string[]; // NEW: specific cuisine types
  features: string[]; // NEW: specific features (wifi, rooftop, live-music, etc.)
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
  zomato_rating: number | null;
  cuisine_types: string[];
  features: string[];
  price_for_two: number | null;
  price_range: string | null;
  popular_dishes: string[];
  opening_hours: any;
}

export interface ChatResponse {
  message: string;
  venues: Venue[];
  intent: ClassifiedIntent;
  responseTimeMs: number;
  matchQuality: 'strong' | 'partial' | 'weak' | 'none';
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
 * Step 1: Classify user intent with cuisine and feature extraction
 */
export async function classifyIntent(query: string): Promise<ClassifiedIntent> {
  const systemPrompt = `You are a query classifier for BangaloreLife.com, a Bangalore city guide.
Classify user queries into structured JSON. Return ONLY valid JSON, no markdown.

IMPORTANT FIELDS:
- intent: food, nightlife, movies, shopping, health, events, travel, services, general
- subcategory: specific type (biryani place, rooftop bar, comedy show, gym, etc.) or null
- cuisines: ARRAY of specific cuisine types mentioned or implied. Examples:
  "biryani" → ["Hyderabadi", "Biryani"]
  "south indian food" → ["South Indian"]
  "chinese restaurant" → ["Chinese"]
  "good pizza" → ["Italian", "Pizza"]
  "north indian" → ["North Indian"]
  "cafe for coffee" → ["Cafe", "Coffee"]
  Use common Zomato cuisine categories: South Indian, North Indian, Chinese, Italian, Continental, Mexican, Thai, Japanese, Korean, Mediterranean, American, Fast Food, Street Food, Bakery, Desserts, Cafe, Bar Food, Biryani, Hyderabadi, Andhra, Kerala, Mughlai, Punjabi, Rajasthani, Bengali, etc.
- features: ARRAY of venue features. Examples:
  "with wifi" → ["wifi"]
  "rooftop bar" → ["rooftop"]
  "live music" → ["live-music"]
  "outdoor seating" → ["outdoor-seating"]
  "pet friendly" → ["pet-friendly"]
  "good for groups" → ["groups"]
  "romantic" → ["romantic", "date-night"]
  "craft beer" → ["craft-beer"]
  Common features: wifi, rooftop, live-music, dj, outdoor-seating, pet-friendly, romantic, craft-beer, sports-bar, karaoke, pool-table, hookah, late-night, breakfast, brunch, buffet, fine-dining, casual, family-friendly
- area: Bangalore neighborhood if mentioned (koramangala, indiranagar, whitefield, hsr-layout, jp-nagar, jayanagar, mg-road, brigade-road, church-street, electronic-city, marathahalli, btm-layout, malleshwaram, rajajinagar, yelahanka, hebbal, sarjapur-road, bellandur, hennur, kalyan-nagar, frazer-town) or null
- budget: budget (<₹500), mid (₹500-1000), premium (₹1000-2000), luxury (₹2000+), or null
- mood: romantic, fun, chill, family, adventure, or null
- time_context: now, tonight, this_weekend, general
- keywords: array of search terms (important words from query)

Examples:
"best hyderabadi biryani in koramangala" → {"intent":"food","subcategory":"biryani","cuisines":["Hyderabadi","Biryani"],"features":[],"area":"koramangala","budget":null,"mood":null,"time_context":"general","keywords":["biryani","hyderabadi","best"]}
"cafes with wifi for working" → {"intent":"food","subcategory":"cafe","cuisines":["Cafe"],"features":["wifi"],"area":null,"budget":null,"mood":"chill","time_context":"general","keywords":["cafe","wifi","working"]}
"rooftop bars for a date tonight" → {"intent":"nightlife","subcategory":"rooftop bar","cuisines":[],"features":["rooftop","romantic"],"area":null,"budget":null,"mood":"romantic","time_context":"tonight","keywords":["rooftop","bar","date"]}
"cheap south indian breakfast" → {"intent":"food","subcategory":"breakfast","cuisines":["South Indian"],"features":["breakfast"],"area":null,"budget":"budget","mood":null,"time_context":"general","keywords":["south indian","breakfast","cheap"]}`;

  const result = await callGemini(query, systemPrompt);
  
  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      // Ensure arrays exist
      return {
        ...parsed,
        cuisines: parsed.cuisines || [],
        features: parsed.features || [],
        keywords: parsed.keywords || []
      };
    }
    throw new Error('No JSON found in response');
  } catch (e) {
    // Fallback to general intent
    return {
      intent: 'general',
      subcategory: null,
      cuisines: [],
      features: [],
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
  cuisineFilters: string[];
  featureFilters: string[];
} {
  const filters: Record<string, any> = {
    is_active: true
  };
  const searchTerms: string[] = [...intent.keywords];
  const cuisineFilters: string[] = intent.cuisines || [];
  const featureFilters: string[] = intent.features || [];

  // Map intent to venue types
  const intentTypeMap: Record<string, string[]> = {
    food: ['restaurant', 'cafe', 'bakery', 'bar'], // bars also serve food
    nightlife: ['bar', 'pub', 'club', 'lounge', 'brewery'],
    movies: ['cinema'],
    shopping: ['mall', 'supermarket'],
    health: ['hospital', 'pharmacy', 'gym', 'spa', 'dentist'],
    services: ['bank', 'atm'],
    travel: ['hotel'],
    events: ['cinema', 'club'],
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

  // Add budget filter
  if (intent.budget) {
    filters.budget = intent.budget;
  }

  return { filters, searchTerms, cuisineFilters, featureFilters };
}

/**
 * Step 3: Query venues with proper filtering
 */
// Column selection - include new columns when available
const VENUE_COLUMNS = 'id, name, slug, type, neighborhood, address, phone, website, rating, google_rating, cuisine_types, features, price_range, opening_hours';
// Extended columns (after migration): add zomato_rating, price_for_two, popular_dishes, zomato_url

async function queryVenues(
  supabase: any,
  intent: ClassifiedIntent
): Promise<{ venues: Venue[]; matchQuality: 'strong' | 'partial' | 'weak' | 'none' }> {
  const { filters, searchTerms, cuisineFilters, featureFilters } = buildVenueQuery(intent);
  
  // First try: strict filtering with cuisine and features
  if (cuisineFilters.length > 0 || featureFilters.length > 0) {
    let strictQuery = supabase
      .from('venues')
      .select(VENUE_COLUMNS)
      .eq('is_active', true)
      .limit(20);

    // Apply type filter
    if (filters.types && filters.types.length > 0) {
      strictQuery = strictQuery.in('type', filters.types);
    }

    // Apply area filter
    if (filters.neighborhood) {
      strictQuery = strictQuery.eq('neighborhood', filters.neighborhood);
    }

    // Apply cuisine filter using overlap (&&) operator
    // This checks if ANY of the search cuisines match ANY of the venue's cuisines
    if (cuisineFilters.length > 0) {
      strictQuery = strictQuery.overlaps('cuisine_types', cuisineFilters);
    }

    // Apply features filter
    if (featureFilters.length > 0) {
      strictQuery = strictQuery.overlaps('features', featureFilters);
    }

    // Order by rating (prefer Zomato, fallback to Google)
    strictQuery = strictQuery.order('google_rating', { ascending: false, nullsFirst: false });

    const { data: strictVenues, error: strictError } = await strictQuery;

    if (!strictError && strictVenues && strictVenues.length >= 3) {
      return { venues: strictVenues, matchQuality: 'strong' };
    }

    // If we got some results but less than 3, keep them for partial match
    if (!strictError && strictVenues && strictVenues.length > 0) {
      // Try to get more with relaxed filtering
      const relaxedVenues = await queryRelaxed(supabase, filters, cuisineFilters);
      const combined = [...strictVenues, ...relaxedVenues.filter(rv => 
        !strictVenues.some((sv: Venue) => sv.id === rv.id)
      )].slice(0, 20);
      return { venues: combined, matchQuality: 'partial' };
    }
  }

  // Second try: just type and area, text search in name
  let relaxedQuery = supabase
    .from('venues')
    .select(VENUE_COLUMNS)
    .eq('is_active', true)
    .limit(20);

  if (filters.types && filters.types.length > 0) {
    relaxedQuery = relaxedQuery.in('type', filters.types);
  }

  if (filters.neighborhood) {
    relaxedQuery = relaxedQuery.eq('neighborhood', filters.neighborhood);
  }

  // Text search in venue name
  if (searchTerms.length > 0) {
    const searchPattern = searchTerms.slice(0, 3).join(' | ');
    relaxedQuery = relaxedQuery.textSearch('name', searchPattern, { type: 'websearch', config: 'english' });
  }

  relaxedQuery = relaxedQuery.order('google_rating', { ascending: false, nullsFirst: false });

  const { data: relaxedVenues, error: relaxedError } = await relaxedQuery;

  if (!relaxedError && relaxedVenues && relaxedVenues.length > 0) {
    return { venues: relaxedVenues, matchQuality: 'weak' };
  }

  // Final fallback: just get top venues for the type
  let fallbackQuery = supabase
    .from('venues')
    .select(VENUE_COLUMNS)
    .eq('is_active', true)
    .not('cuisine_types', 'is', null) // At least has some cuisine data
    .limit(20);

  if (filters.types && filters.types.length > 0) {
    fallbackQuery = fallbackQuery.in('type', filters.types);
  }

  fallbackQuery = fallbackQuery.order('google_rating', { ascending: false, nullsFirst: false });

  const { data: fallbackVenues, error: fallbackError } = await fallbackQuery;

  if (!fallbackError && fallbackVenues && fallbackVenues.length > 0) {
    return { venues: fallbackVenues, matchQuality: 'none' };
  }

  return { venues: [], matchQuality: 'none' };
}

async function queryRelaxed(
  supabase: any,
  filters: Record<string, any>,
  cuisineFilters: string[]
): Promise<Venue[]> {
  let query = supabase
    .from('venues')
    .select(VENUE_COLUMNS)
    .eq('is_active', true)
    .not('cuisine_types', 'is', null)
    .limit(20);

  if (filters.types && filters.types.length > 0) {
    query = query.in('type', filters.types);
  }

  // Remove area restriction for relaxed query
  // But if we have cuisine filters, use them loosely
  if (cuisineFilters.length > 0) {
    // Try broader category matches
    const broadCategories = cuisineFilters.map(c => {
      if (['Hyderabadi', 'Mughlai', 'Biryani', 'Punjabi', 'Rajasthani'].includes(c)) return 'North Indian';
      if (['Andhra', 'Kerala', 'Tamil', 'Karnataka'].includes(c)) return 'South Indian';
      return c;
    });
    query = query.overlaps('cuisine_types', [...cuisineFilters, ...broadCategories]);
  }

  query = query.order('google_rating', { ascending: false, nullsFirst: false });

  const { data, error } = await query;
  return error ? [] : data || [];
}

/**
 * Step 4: Generate conversational response with match quality awareness
 */
export async function generateResponse(
  query: string,
  venues: Venue[],
  intent: ClassifiedIntent,
  matchQuality: 'strong' | 'partial' | 'weak' | 'none'
): Promise<string> {
  const systemPrompt = `You are BangaloreLife AI, a cool, knowledgeable local friend who knows every spot in Bangalore.

RULES:
- Be warm, casual, and conversational - NOT robotic or listy
- Be opinionated - highlight favorites and say why
- If suggesting multiple places, weave them naturally into the response
- Include specific details: neighborhood, what they're known for, cuisine specialties
- NEVER use emojis
- Sound like a friend giving advice, not a search engine
- Keep responses concise but helpful (2-4 paragraphs max)

MATCH QUALITY HANDLING - THIS IS CRITICAL:
${matchQuality === 'strong' ? '- You have STRONG matches. Be confident and specific about these recommendations.' : ''}
${matchQuality === 'partial' ? '- You have PARTIAL matches. Some venues match well, others are related alternatives. Be clear about which are exact matches vs alternatives.' : ''}
${matchQuality === 'weak' ? '- You have WEAK matches. Be HONEST that you don\'t have specific data for exactly what they asked. Say something like "I don\'t have detailed data on [specific thing] yet, but here are some popular [category] places that might have what you\'re looking for..."' : ''}
${matchQuality === 'none' ? '- You have NO good matches. Be TRANSPARENT. Say "I don\'t have great recommendations for [specific query] in my database yet. Here are some top-rated [general category] places in Bangalore that you could check out, but you might want to call ahead to confirm they have [specific thing]..."' : ''}

When venues have cuisine_types, features, or popular_dishes - USE THEM in your response to be specific.`;

  const venueContext = venues.slice(0, 10).map(v => ({
    name: v.name,
    type: v.type,
    neighborhood: v.neighborhood,
    rating: v.google_rating || v.rating,
    cuisines: v.cuisine_types?.join(', ') || 'unknown',
    features: v.features?.join(', ') || null,
    popularDishes: v.popular_dishes?.join(', ') || null,
    priceForTwo: v.price_for_two ? `₹${v.price_for_two}` : null
  }));

  const prompt = `User asked: "${query}"

Intent: ${intent.intent} | Cuisines: ${intent.cuisines.join(', ') || 'any'} | Features: ${intent.features.join(', ') || 'any'} | Area: ${intent.area || 'any'} | Mood: ${intent.mood || 'any'}

Match Quality: ${matchQuality.toUpperCase()}

Matching venues from our database:
${JSON.stringify(venueContext, null, 2)}

Generate a helpful, conversational response. Remember to be honest about match quality - if it's weak or none, acknowledge that you don't have perfect data for their specific request.`;

  return callGemini(prompt, systemPrompt);
}

/**
 * Full chat pipeline
 */
export async function chat(
  query: string,
  supabase: any
): Promise<ChatResponse> {
  const startTime = Date.now();

  // Step 1: Classify intent
  const intent = await classifyIntent(query);
  console.log('Intent:', JSON.stringify(intent, null, 2));

  // Step 2: Query database with proper filtering
  const { venues, matchQuality } = await queryVenues(supabase, intent);
  console.log(`Found ${venues.length} venues with ${matchQuality} match quality`);

  // Step 3: Generate response with match quality awareness
  const message = await generateResponse(query, venues, intent, matchQuality);

  return {
    message,
    venues: venues || [],
    intent,
    responseTimeMs: Date.now() - startTime,
    matchQuality
  };
}
