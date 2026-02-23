/**
 * Gemini AI Integration for BangaloreLife.com
 * Conversational search powered by Google Gemini 2.0 Flash
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface ClassifiedIntent {
  intent: 'food' | 'nightlife' | 'movies' | 'shopping' | 'health' | 'events' | 'hotels' | 'travel' | 'services' | 'general' | 'out_of_scope';
  subcategory: string | null;
  cuisines: string[];
  features: string[];
  area: string | null;
  budget: 'budget' | 'mid' | 'premium' | 'luxury' | null;
  mood: 'romantic' | 'fun' | 'chill' | 'family' | 'adventure' | 'business' | null;
  time_context: 'now' | 'tonight' | 'this_weekend' | 'general';
  keywords: string[];
  is_venue_query: boolean;
  star_rating?: number | null; // For hotel queries: 1-5 stars
  price_max?: number | null; // Maximum price mentioned
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
  price_range: string | null;
  opening_hours: any;
}

export interface Hotel {
  id: string;
  name: string;
  slug: string;
  hotel_type: string;
  neighborhood: string | null;
  address: string | null;
  star_rating: number | null;
  review_score: number | null;
  google_rating: number | null;
  price_min_per_night: number | null;
  price_max_per_night: number | null;
  amenities: string[];
  phone: string | null;
}

export interface ChatResponse {
  message: string;
  venues: Venue[];
  hotels?: Hotel[];
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
 * Step 1: Classify user intent
 */
export async function classifyIntent(query: string): Promise<ClassifiedIntent> {
  const systemPrompt = `You are a query classifier for BangaloreLife.com, a Bangalore city guide for restaurants, cafes, bars, pubs, nightlife, hotels, and local services.

Classify user queries into structured JSON. Return ONLY valid JSON, no markdown.

CRITICAL FIELD - is_venue_query:
- true: User is looking for places we can help with (restaurants, cafes, bars, pubs, breweries, nightlife, events, hotels, resorts, movies, gyms, spas, salons)
- false: User is asking about something we CAN'T help with (grocery products, government services, online shopping, specific brands/products, non-Bangalore locations, general knowledge questions)

Examples of is_venue_query = false:
- "where to buy ghee" → false (product shopping, not venue)
- "RTO office timings" → false (government service)
- "best laptop under 50k" → false (product)
- "weather today" → false (general knowledge)
- "flights to Mumbai" → false (not Bangalore venue)

Examples of is_venue_query = true:
- "restaurants with ghee-based dishes" → true (food venue)
- "cafes near me" → true (venue)
- "best biryani" → true (food venue)
- "rooftop bars" → true (nightlife venue)
- "hotels near MG Road under 5000" → true (hotels intent)
- "best resorts near Bangalore for weekend" → true (hotels intent, resort type)
- "budget hotels in Koramangala" → true (hotels intent, budget)
- "5 star hotels with pool" → true (hotels intent, star_rating=5, amenities=pool)

FIELDS:
- intent: food, nightlife, movies, shopping, health, events, hotels, travel, services, general, out_of_scope
- subcategory: specific type or null (for hotels: hotel, resort, boutique, hostel, guesthouse, apartment, villa)
- cuisines: ARRAY of cuisine types (South Indian, North Indian, Biryani, Chinese, etc.)
- features: ARRAY of features (wifi, rooftop, live-music, veg-only, pool, gym, spa, parking, restaurant, bar, etc.)
- area: neighborhood if mentioned or null
- budget: budget (<₹3000/night), mid (₹3000-6000), premium (₹6000-12000), luxury (₹12000+), or null
- mood: romantic, fun, chill, family, adventure, business, or null
- time_context: now, tonight, this_weekend, general
- keywords: array of search terms
- is_venue_query: true or false
- star_rating: 1-5 if specified for hotels, or null
- price_max: maximum price mentioned (e.g., "under 5000" → 5000), or null`;

  const result = await callGemini(query, systemPrompt);
  
  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        ...parsed,
        cuisines: parsed.cuisines || [],
        features: parsed.features || [],
        keywords: parsed.keywords || [],
        is_venue_query: parsed.is_venue_query !== false // default true
      };
    }
    throw new Error('No JSON found');
  } catch (e) {
    return {
      intent: 'general',
      subcategory: null,
      cuisines: [],
      features: [],
      area: null,
      budget: null,
      mood: null,
      time_context: 'general',
      keywords: query.toLowerCase().split(/\s+/).filter(w => w.length > 2),
      is_venue_query: true
    };
  }
}

/**
 * Step 2: Build database query
 */
export function buildVenueQuery(intent: ClassifiedIntent): {
  filters: Record<string, any>;
  searchTerms: string[];
  cuisineFilters: string[];
  featureFilters: string[];
} {
  const filters: Record<string, any> = { is_active: true };
  const searchTerms: string[] = [...intent.keywords];
  const cuisineFilters: string[] = intent.cuisines || [];
  const featureFilters: string[] = intent.features || [];

  const intentTypeMap: Record<string, string[]> = {
    food: ['restaurant', 'cafe', 'bakery', 'bar'],
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
  if (types.length > 0) filters.types = types;
  if (intent.area) filters.neighborhood = intent.area.toLowerCase().replace(/\s+/g, '-');
  if (intent.subcategory) searchTerms.push(intent.subcategory);
  if (intent.budget) filters.budget = intent.budget;

  return { filters, searchTerms, cuisineFilters, featureFilters };
}

// Column selection
const VENUE_COLUMNS = 'id, name, slug, type, neighborhood, address, phone, website, rating, google_rating, cuisine_types, features, price_range, opening_hours';
const HOTEL_COLUMNS = 'id, name, slug, hotel_type, neighborhood, address, star_rating, review_score, google_rating, price_min_per_night, price_max_per_night, amenities, phone';

/**
 * Query hotels from database
 */
async function queryHotels(
  supabase: any,
  intent: ClassifiedIntent
): Promise<{ hotels: Hotel[]; matchQuality: 'strong' | 'partial' | 'weak' | 'none' }> {
  let query = supabase
    .from('hotels')
    .select(HOTEL_COLUMNS)
    .eq('is_active', true)
    .limit(20);

  // Filter by hotel type if specified
  if (intent.subcategory) {
    query = query.eq('hotel_type', intent.subcategory);
  }

  // Filter by star rating if specified
  if (intent.star_rating) {
    query = query.gte('star_rating', intent.star_rating);
  }

  // Filter by max price if specified
  if (intent.price_max) {
    query = query.lte('price_min_per_night', intent.price_max);
  }

  // Filter by amenities/features if specified
  if (intent.features && intent.features.length > 0) {
    query = query.overlaps('amenities', intent.features);
  }

  // Order by rating
  query = query.order('google_rating', { ascending: false, nullsFirst: false });

  const { data: hotels, error } = await query;

  if (error || !hotels || hotels.length === 0) {
    // Fallback: get any hotels
    const { data: fallback } = await supabase
      .from('hotels')
      .select(HOTEL_COLUMNS)
      .eq('is_active', true)
      .order('google_rating', { ascending: false, nullsFirst: false })
      .limit(20);
    
    return { hotels: fallback || [], matchQuality: fallback?.length ? 'weak' : 'none' };
  }

  const matchQuality = hotels.length >= 5 ? 'strong' : hotels.length >= 2 ? 'partial' : 'weak';
  return { hotels, matchQuality };
}

/**
 * Step 3: Query venues
 */
async function queryVenues(
  supabase: any,
  intent: ClassifiedIntent
): Promise<{ venues: Venue[]; matchQuality: 'strong' | 'partial' | 'weak' | 'none' }> {
  const { filters, searchTerms, cuisineFilters, featureFilters } = buildVenueQuery(intent);
  
  // First: strict filtering with cuisine and features
  if (cuisineFilters.length > 0 || featureFilters.length > 0) {
    let strictQuery = supabase
      .from('venues')
      .select(VENUE_COLUMNS)
      .eq('is_active', true)
      .limit(20);

    if (filters.types?.length > 0) strictQuery = strictQuery.in('type', filters.types);
    if (filters.neighborhood) strictQuery = strictQuery.eq('neighborhood', filters.neighborhood);
    if (cuisineFilters.length > 0) strictQuery = strictQuery.overlaps('cuisine_types', cuisineFilters);
    if (featureFilters.length > 0) strictQuery = strictQuery.overlaps('features', featureFilters);
    strictQuery = strictQuery.order('google_rating', { ascending: false, nullsFirst: false });

    const { data: strictVenues, error: strictError } = await strictQuery;

    if (!strictError && strictVenues && strictVenues.length >= 3) {
      return { venues: strictVenues, matchQuality: 'strong' };
    }

    if (!strictError && strictVenues && strictVenues.length > 0) {
      const relaxedVenues = await queryRelaxed(supabase, filters, cuisineFilters);
      const combined = [...strictVenues, ...relaxedVenues.filter(rv => 
        !strictVenues.some((sv: Venue) => sv.id === rv.id)
      )].slice(0, 20);
      return { venues: combined, matchQuality: 'partial' };
    }
  }

  // Second: type and area only
  let relaxedQuery = supabase
    .from('venues')
    .select(VENUE_COLUMNS)
    .eq('is_active', true)
    .limit(20);

  if (filters.types?.length > 0) relaxedQuery = relaxedQuery.in('type', filters.types);
  if (filters.neighborhood) relaxedQuery = relaxedQuery.eq('neighborhood', filters.neighborhood);
  relaxedQuery = relaxedQuery.order('google_rating', { ascending: false, nullsFirst: false });

  const { data: relaxedVenues, error: relaxedError } = await relaxedQuery;

  if (!relaxedError && relaxedVenues && relaxedVenues.length > 0) {
    return { venues: relaxedVenues, matchQuality: 'weak' };
  }

  // Fallback: top venues of any type
  let fallbackQuery = supabase
    .from('venues')
    .select(VENUE_COLUMNS)
    .eq('is_active', true)
    .not('cuisine_types', 'is', null)
    .limit(20);

  if (filters.types?.length > 0) fallbackQuery = fallbackQuery.in('type', filters.types);
  fallbackQuery = fallbackQuery.order('google_rating', { ascending: false, nullsFirst: false });

  const { data: fallbackVenues } = await fallbackQuery;
  return { venues: fallbackVenues || [], matchQuality: 'none' };
}

async function queryRelaxed(supabase: any, filters: Record<string, any>, cuisineFilters: string[]): Promise<Venue[]> {
  let query = supabase
    .from('venues')
    .select(VENUE_COLUMNS)
    .eq('is_active', true)
    .not('cuisine_types', 'is', null)
    .limit(20);

  if (filters.types?.length > 0) query = query.in('type', filters.types);
  if (cuisineFilters.length > 0) {
    const broadCategories = cuisineFilters.map(c => {
      if (['Hyderabadi', 'Mughlai', 'Biryani', 'Punjabi', 'Rajasthani'].includes(c)) return 'North Indian';
      if (['Andhra', 'Kerala', 'Tamil', 'Karnataka'].includes(c)) return 'South Indian';
      return c;
    });
    query = query.overlaps('cuisine_types', [...cuisineFilters, ...broadCategories]);
  }
  query = query.order('google_rating', { ascending: false, nullsFirst: false });

  const { data } = await query;
  return data || [];
}

/**
 * Step 4: Generate response AND select which venues to show
 */
async function generateResponseWithVenueSelection(
  query: string,
  venues: Venue[],
  intent: ClassifiedIntent,
  matchQuality: 'strong' | 'partial' | 'weak' | 'none'
): Promise<{ message: string; selectedVenueIndices: number[] }> {
  
  // Handle out-of-scope queries
  if (!intent.is_venue_query || intent.intent === 'out_of_scope') {
    return {
      message: `That's not really my strong suit — I'm best at helping you find restaurants, cafes, bars, nightlife spots, hotels, and local services in Bangalore. If you're looking for a place to eat, drink, stay, or hang out, I can definitely help with that! What are you looking for?`,
      selectedVenueIndices: []
    };
  }
  
  const systemPrompt = `You are BangaloreLife AI, a cool, knowledgeable local friend who knows every spot in Bangalore.

CRITICAL RULES:
1. ONLY recommend venues from the provided list. Do NOT make up venue names.
2. When you mention a venue by name, it MUST be from the list below.
3. At the end of your response, include a JSON line with the indices of venues you recommended: {"recommended": [0, 2, 5]}
4. If the venues don't match well, recommend FEWER or NONE rather than forcing bad recommendations.

TONE:
- Be warm, casual, conversational - NOT robotic
- Be opinionated - highlight favorites and say why
- Include specific details: neighborhood, what they're known for
- NEVER use emojis
- Keep responses concise (2-3 paragraphs max)

MATCH QUALITY HANDLING:
${matchQuality === 'strong' ? '- STRONG matches. Be confident and specific.' : ''}
${matchQuality === 'partial' ? '- PARTIAL matches. Mention which are exact matches vs alternatives.' : ''}
${matchQuality === 'weak' ? '- WEAK matches. Be HONEST: "I don\'t have specific data on [X] yet, but here are some popular options that might work..."' : ''}
${matchQuality === 'none' ? '- NO good matches. Say honestly: "I don\'t have great recommendations for that specific request. Here are some top-rated places you could try, but call ahead to confirm they have what you need." Or if truly irrelevant, recommend 0 venues.' : ''}

OUT OF SCOPE HANDLING:
If the user's query doesn't match our venue data well (grocery shopping, specific products, government services, etc.), be honest. Say something like "That's not really my strong suit — I'm best at helping you find restaurants, cafes, nightlife, and local services. But if you're looking for [related suggestion], I can help with that!" Don't force irrelevant recommendations.`;

  const venueContext = venues.slice(0, 15).map((v, i) => ({
    index: i,
    name: v.name,
    type: v.type,
    neighborhood: v.neighborhood.replace(/-/g, ' '),
    rating: v.google_rating || v.rating,
    cuisines: v.cuisine_types?.join(', ') || 'unknown',
    features: v.features?.join(', ') || null,
    priceRange: v.price_range || null
  }));

  const prompt = `User asked: "${query}"

Intent: ${intent.intent} | Cuisines: ${intent.cuisines.join(', ') || 'any'} | Features: ${intent.features.join(', ') || 'any'} | Area: ${intent.area || 'any'}

Match Quality: ${matchQuality.toUpperCase()}

Available venues (use index numbers):
${JSON.stringify(venueContext, null, 2)}

Generate a helpful response. ONLY mention venues from this list by their exact name. At the very end, add a new line with JSON: {"recommended": [index1, index2, ...]} for venues you mentioned. If you recommend no venues, use {"recommended": []}.`;

  const response = await callGemini(prompt, systemPrompt);
  
  // Extract the recommended indices from the response
  let selectedVenueIndices: number[] = [];
  let message = response;
  
  const jsonMatch = response.match(/\{"recommended":\s*\[[\d,\s]*\]\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      selectedVenueIndices = parsed.recommended || [];
      // Remove the JSON from the visible message
      message = response.replace(jsonMatch[0], '').trim();
    } catch (e) {
      // If parsing fails, try to extract venue names mentioned and match them
      selectedVenueIndices = venues
        .map((v, i) => message.toLowerCase().includes(v.name.toLowerCase()) ? i : -1)
        .filter(i => i >= 0)
        .slice(0, 5);
    }
  } else {
    // Fallback: find mentioned venue names
    selectedVenueIndices = venues
      .map((v, i) => message.toLowerCase().includes(v.name.toLowerCase()) ? i : -1)
      .filter(i => i >= 0)
      .slice(0, 5);
  }

  return { message, selectedVenueIndices };
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

  // Step 2: Handle out-of-scope queries early
  if (!intent.is_venue_query) {
    const { message } = await generateResponseWithVenueSelection(query, [], intent, 'none');
    return {
      message,
      venues: [],
      intent,
      responseTimeMs: Date.now() - startTime,
      matchQuality: 'none'
    };
  }

  // Step 3: Handle hotel queries separately
  if (intent.intent === 'hotels') {
    const { hotels, matchQuality } = await queryHotels(supabase, intent);
    console.log(`Found ${hotels.length} hotels with ${matchQuality} match quality`);

    // Generate hotel-specific response
    const hotelContext = hotels.slice(0, 10).map((h, i) => ({
      index: i,
      name: h.name,
      type: h.hotel_type,
      stars: h.star_rating,
      rating: h.google_rating || h.review_score,
      price: h.price_min_per_night ? `₹${h.price_min_per_night}/night` : null,
      amenities: h.amenities?.slice(0, 5).join(', ') || null
    }));

    const hotelPrompt = `User asked: "${query}"

Available hotels (use index numbers):
${JSON.stringify(hotelContext, null, 2)}

You are BangaloreLife AI. Recommend hotels from this list only. Be helpful and concise. Mention star ratings, prices, and amenities where available. At the end, add JSON: {"recommended": [index1, index2, ...]}`;

    const response = await callGemini(hotelPrompt, `You are a helpful Bangalore city guide. Be warm and conversational. NEVER use emojis. Only recommend hotels from the provided list.`);
    
    let selectedIndices: number[] = [];
    let message = response;
    
    const jsonMatch = response.match(/\{"recommended":\s*\[[\d,\s]*\]\}/);
    if (jsonMatch) {
      try {
        selectedIndices = JSON.parse(jsonMatch[0]).recommended || [];
        message = response.replace(jsonMatch[0], '').trim();
      } catch (e) {}
    }

    const selectedHotels = selectedIndices
      .filter(i => i >= 0 && i < hotels.length)
      .map(i => hotels[i]);

    return {
      message,
      venues: [], // Convert hotels to venue-like format for UI
      hotels: selectedHotels.length > 0 ? selectedHotels : hotels.slice(0, 5),
      intent,
      responseTimeMs: Date.now() - startTime,
      matchQuality
    };
  }

  // Step 4: Query venues for non-hotel queries
  const { venues, matchQuality } = await queryVenues(supabase, intent);
  console.log(`Found ${venues.length} venues with ${matchQuality} match quality`);

  // Step 5: Generate response with venue selection
  const { message, selectedVenueIndices } = await generateResponseWithVenueSelection(
    query, venues, intent, matchQuality
  );

  // Step 6: Filter venues to only those the AI recommended
  const selectedVenues = selectedVenueIndices
    .filter(i => i >= 0 && i < venues.length)
    .map(i => venues[i]);

  // If AI selected specific venues, use those. Otherwise use top matches for strong quality only.
  const finalVenues = selectedVenues.length > 0 
    ? selectedVenues 
    : (matchQuality === 'strong' ? venues.slice(0, 5) : []);

  return {
    message,
    venues: finalVenues,
    intent,
    responseTimeMs: Date.now() - startTime,
    matchQuality
  };
}
