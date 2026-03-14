/**
 * Claude AI Integration for BangaloreLife.com
 * Conversational venue search powered by Claude claude-sonnet-4-20250514
 * 
 * Designed to be reusable across all NightsOut GCC sites
 */

import { SupabaseClient } from '@supabase/supabase-js';

// Configuration per city - extend this for NightsOut sites
export interface CityConfig {
  cityName: string;
  citySlug: string;
  brandName: string;
  tagline: string;
  venueCount: string;
  neighborhoods: string[];
  defaultNeighborhood?: string;
}

export const CITY_CONFIGS: Record<string, CityConfig> = {
  bangalore: {
    cityName: 'Bangalore',
    citySlug: 'bangalore',
    brandName: 'BangaloreLife',
    tagline: 'India\'s Tech Capital',
    venueCount: '12,000+',
    neighborhoods: [
      'koramangala', 'indiranagar', 'mg-road', 'whitefield', 'hsr-layout',
      'jayanagar', 'jp-nagar', 'malleshwaram', 'rajajinagar', 'yelahanka',
      'hebbal', 'marathahalli', 'electronic-city', 'btm-layout', 'bangalore-central'
    ],
  },
  dubai: {
    cityName: 'Dubai',
    citySlug: 'dubai',
    brandName: 'NightsOut Dubai',
    tagline: 'The City of Gold',
    venueCount: '8,000+',
    neighborhoods: [
      'downtown', 'marina', 'jbr', 'deira', 'bur-dubai', 'jumeirah',
      'business-bay', 'difc', 'al-barsha', 'palm-jumeirah'
    ],
  },
  abudhabi: {
    cityName: 'Abu Dhabi',
    citySlug: 'abudhabi',
    brandName: 'NightsOut Abu Dhabi',
    tagline: 'The Capital',
    venueCount: '4,000+',
    neighborhoods: [
      'corniche', 'yas-island', 'saadiyat', 'al-maryah', 'khalidiyah',
      'al-reem', 'al-ain'
    ],
  },
  riyadh: {
    cityName: 'Riyadh',
    citySlug: 'riyadh',
    brandName: 'NightsOut Riyadh',
    tagline: 'The Kingdom\'s Heart',
    venueCount: '5,000+',
    neighborhoods: [
      'olaya', 'tahlia', 'malaz', 'diplomatic-quarter', 'al-nakheel',
      'king-abdullah', 'al-rawdah'
    ],
  },
  jeddah: {
    cityName: 'Jeddah',
    citySlug: 'jeddah',
    brandName: 'NightsOut Jeddah',
    tagline: 'The Red Sea Gateway',
    venueCount: '3,500+',
    neighborhoods: [
      'corniche', 'tahlia', 'al-balad', 'al-rawdah', 'al-salamah',
      'obhur', 'prince-sultan'
    ],
  },
  doha: {
    cityName: 'Doha',
    citySlug: 'doha',
    brandName: 'NightsOut Doha',
    tagline: 'The Pearl of the Gulf',
    venueCount: '2,500+',
    neighborhoods: [
      'west-bay', 'the-pearl', 'souq-waqif', 'katara', 'lusail',
      'al-sadd', 'msheireb'
    ],
  },
  muscat: {
    cityName: 'Muscat',
    citySlug: 'muscat',
    brandName: 'NightsOut Muscat',
    tagline: 'The Hidden Gem',
    venueCount: '1,500+',
    neighborhoods: [
      'muttrah', 'qurum', 'shatti-al-qurum', 'al-mouj', 'ruwi',
      'al-khuwair', 'ghubrah'
    ],
  },
};

// Intent classification types
export interface ClassifiedIntent {
  intent: 'food' | 'nightlife' | 'shopping' | 'hotels' | 'events' | 'wellness' | 'activities' | 'general' | 'out_of_scope';
  venueTypes: string[];
  cuisines: string[];
  features: string[];
  neighborhood: string | null;
  budget: 'budget' | 'mid' | 'premium' | 'luxury' | null;
  vibe: 'romantic' | 'fun' | 'chill' | 'family' | 'business' | 'adventure' | null;
  timeContext: 'now' | 'tonight' | 'weekend' | 'general';
  keywords: string[];
  isVenueQuery: boolean;
  confidence: number;
}

// Venue types from database
export interface Venue {
  id: string;
  name: string;
  slug: string;
  type: string;
  neighborhood: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  google_rating: number | null;
  cuisine_types: string[];
  features: string[];
  price_range: string | null;
  opening_hours: any;
  latitude?: number;
  longitude?: number;
  google_place_id?: string;
}

export interface Hotel {
  id: string;
  name: string;
  slug: string;
  hotel_type: string;
  neighborhood: string | null;
  address: string | null;
  star_rating: number | null;
  google_rating: number | null;
  price_min_per_night: number | null;
  amenities: string[];
}

export interface AskResponse {
  message: string;
  venues: Venue[];
  hotels?: Hotel[];
  intent: ClassifiedIntent;
  responseTimeMs: number;
  matchQuality: 'excellent' | 'good' | 'partial' | 'none';
  suggestedFollowUps?: string[];
}

// Claude API configuration
const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || '';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Call Claude API
 */
async function callClaude(
  systemPrompt: string,
  userMessage: string,
  maxTokens: number = 1500
): Promise<string> {
  if (!CLAUDE_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userMessage }
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Claude API error:', error);
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || '';
}

/**
 * Step 1: Classify user intent
 */
export async function classifyIntent(
  query: string,
  cityConfig: CityConfig
): Promise<ClassifiedIntent> {
  const systemPrompt = `You are an intent classifier for ${cityConfig.brandName}, a comprehensive city guide for ${cityConfig.cityName}.

Classify user queries into structured JSON. Return ONLY valid JSON, no markdown or explanation.

OUTPUT FORMAT:
{
  "intent": "food|nightlife|shopping|hotels|events|wellness|activities|general|out_of_scope",
  "venueTypes": ["restaurant", "bar", "cafe", etc],
  "cuisines": ["indian", "italian", etc] or [],
  "features": ["rooftop", "live-music", "outdoor-seating", etc] or [],
  "neighborhood": "area-slug" or null,
  "budget": "budget|mid|premium|luxury" or null,
  "vibe": "romantic|fun|chill|family|business|adventure" or null,
  "timeContext": "now|tonight|weekend|general",
  "keywords": ["key", "search", "terms"],
  "isVenueQuery": true/false,
  "confidence": 0.0-1.0
}

INTENT MAPPING:
- food: restaurants, cafes, bakeries, street food, dining
- nightlife: bars, pubs, clubs, lounges, breweries
- shopping: malls, stores, markets
- hotels: accommodation, stays
- events: concerts, shows, exhibitions
- wellness: spas, gyms, salons
- activities: entertainment, attractions
- general: ambiguous queries that could be multiple types
- out_of_scope: not about ${cityConfig.cityName} venues/places

NEIGHBORHOODS: ${cityConfig.neighborhoods.join(', ')}

Be precise with intent classification. Extract all relevant filters.`;

  const result = await callClaude(systemPrompt, query, 500);
  
  try {
    const parsed = JSON.parse(result);
    return {
      intent: parsed.intent || 'general',
      venueTypes: parsed.venueTypes || [],
      cuisines: parsed.cuisines || [],
      features: parsed.features || [],
      neighborhood: parsed.neighborhood || null,
      budget: parsed.budget || null,
      vibe: parsed.vibe || null,
      timeContext: parsed.timeContext || 'general',
      keywords: parsed.keywords || [],
      isVenueQuery: parsed.isVenueQuery !== false,
      confidence: parsed.confidence || 0.7,
    };
  } catch (e) {
    // Fallback with basic keyword detection
    const queryLower = query.toLowerCase();
    const isFood = /restaurant|food|eat|dine|cuisine|biryani|cafe|coffee/i.test(query);
    const isNightlife = /bar|pub|club|drink|beer|cocktail|nightlife|party/i.test(query);
    
    return {
      intent: isFood ? 'food' : isNightlife ? 'nightlife' : 'general',
      venueTypes: [],
      cuisines: [],
      features: [],
      neighborhood: null,
      budget: null,
      vibe: null,
      timeContext: 'general',
      keywords: queryLower.split(/\s+/).filter(w => w.length > 2),
      isVenueQuery: true,
      confidence: 0.5,
    };
  }
}

/**
 * Step 2: Query venues from database
 */
async function queryVenues(
  supabase: SupabaseClient,
  intent: ClassifiedIntent,
  citySlug: string,
  limit: number = 20
): Promise<{ venues: Venue[]; matchQuality: 'excellent' | 'good' | 'partial' | 'none' }> {
  
  // Map intent to venue types
  const typeMapping: Record<string, string[]> = {
    food: ['restaurant', 'cafe', 'bakery', 'fast-food'],
    nightlife: ['bar', 'pub', 'club', 'lounge', 'brewery'],
    shopping: ['mall', 'store'],
    wellness: ['spa', 'gym', 'salon'],
    activities: ['cinema', 'entertainment', 'attraction'],
  };

  const targetTypes = intent.venueTypes.length > 0 
    ? intent.venueTypes 
    : typeMapping[intent.intent] || [];

  let query = supabase
    .from('venues')
    .select('id, name, slug, type, neighborhood, address, phone, website, google_rating, cuisine_types, features, price_range, opening_hours, latitude, longitude, google_place_id')
    .eq('is_active', true);

  // Filter by city if not Bangalore (for multi-city support)
  if (citySlug !== 'bangalore') {
    query = query.eq('city', citySlug);
  }

  // Apply type filter
  if (targetTypes.length > 0) {
    query = query.in('type', targetTypes);
  }

  // Apply neighborhood filter
  if (intent.neighborhood) {
    query = query.eq('neighborhood', intent.neighborhood);
  }

  // Apply cuisine filter
  if (intent.cuisines.length > 0) {
    query = query.overlaps('cuisine_types', intent.cuisines);
  }

  // Apply features filter
  if (intent.features.length > 0) {
    query = query.overlaps('features', intent.features);
  }

  // Order by rating
  query = query
    .order('google_rating', { ascending: false, nullsFirst: false })
    .limit(limit);

  const { data: venues, error } = await query;

  if (error) {
    console.error('Venue query error:', error);
    return { venues: [], matchQuality: 'none' };
  }

  if (!venues || venues.length === 0) {
    // Fallback: broaden search
    const fallbackQuery = supabase
      .from('venues')
      .select('id, name, slug, type, neighborhood, address, phone, website, google_rating, cuisine_types, features, price_range, opening_hours, latitude, longitude, google_place_id')
      .eq('is_active', true)
      .order('google_rating', { ascending: false, nullsFirst: false })
      .limit(limit);

    if (targetTypes.length > 0) {
      fallbackQuery.in('type', targetTypes);
    }

    const { data: fallbackVenues } = await fallbackQuery;
    return { 
      venues: fallbackVenues || [], 
      matchQuality: fallbackVenues?.length ? 'partial' : 'none' 
    };
  }

  const matchQuality = venues.length >= 5 ? 'excellent' : venues.length >= 2 ? 'good' : 'partial';
  return { venues, matchQuality };
}

/**
 * Step 3: Query hotels from database
 */
async function queryHotels(
  supabase: SupabaseClient,
  intent: ClassifiedIntent,
  citySlug: string,
  limit: number = 10
): Promise<Hotel[]> {
  
  let query = supabase
    .from('hotels')
    .select('id, name, slug, hotel_type, neighborhood, address, star_rating, google_rating, price_min_per_night, amenities')
    .eq('is_active', true);

  if (citySlug !== 'bangalore') {
    query = query.eq('city', citySlug);
  }

  if (intent.neighborhood) {
    query = query.eq('neighborhood', intent.neighborhood);
  }

  if (intent.features.length > 0) {
    query = query.overlaps('amenities', intent.features);
  }

  query = query
    .order('google_rating', { ascending: false, nullsFirst: false })
    .limit(limit);

  const { data: hotels } = await query;
  return hotels || [];
}

/**
 * Step 4: Generate conversational response
 */
async function generateResponse(
  query: string,
  venues: Venue[],
  hotels: Hotel[],
  intent: ClassifiedIntent,
  matchQuality: string,
  cityConfig: CityConfig
): Promise<{ message: string; selectedVenues: Venue[]; suggestedFollowUps: string[] }> {
  
  // Handle out-of-scope
  if (!intent.isVenueQuery || intent.intent === 'out_of_scope') {
    return {
      message: `I'm your guide to ${cityConfig.cityName}! Ask me about restaurants, bars, cafes, hotels, or things to do in the city. What are you looking for?`,
      selectedVenues: [],
      suggestedFollowUps: [
        `Best restaurants in ${cityConfig.neighborhoods[0]?.replace(/-/g, ' ')}`,
        `Rooftop bars with a view`,
        `Cafes with good wifi`,
      ],
    };
  }

  // Handle no results
  if (venues.length === 0 && hotels.length === 0) {
    return {
      message: `I couldn't find exactly what you're looking for, but I can help you discover ${cityConfig.cityName}. Try asking about a specific neighborhood or type of venue!`,
      selectedVenues: [],
      suggestedFollowUps: [
        `Best places in ${cityConfig.neighborhoods[0]?.replace(/-/g, ' ')}`,
        `Popular restaurants tonight`,
        `Top-rated bars`,
      ],
    };
  }

  // Build venue context for Claude
  const venueContext = venues.slice(0, 12).map((v, i) => ({
    idx: i,
    name: v.name,
    type: v.type,
    area: v.neighborhood?.replace(/-/g, ' '),
    rating: v.google_rating,
    cuisines: v.cuisine_types?.slice(0, 3).join(', '),
    features: v.features?.slice(0, 3).join(', '),
  }));

  const hotelContext = intent.intent === 'hotels' ? hotels.slice(0, 8).map((h, i) => ({
    idx: i,
    name: h.name,
    type: h.hotel_type,
    stars: h.star_rating,
    rating: h.google_rating,
    price: h.price_min_per_night ? `₹${h.price_min_per_night}` : null,
    area: h.neighborhood?.replace(/-/g, ' '),
  })) : [];

  const systemPrompt = `You are ${cityConfig.brandName} AI, a knowledgeable local friend who knows every spot in ${cityConfig.cityName}.

PERSONALITY:
- Warm and conversational, like a friend who lives in the city
- Confident in recommendations, no hedging
- Brief but informative — no walls of text
- Mention specific reasons why each place fits the query

RESPONSE FORMAT:
1. A brief conversational intro (1-2 sentences)
2. Your recommendations with reasons
3. End with JSON on its own line: {"selected": [venue indices], "followUps": ["suggestion 1", "suggestion 2", "suggestion 3"]}

RULES:
- Only recommend venues from the provided list
- Select 3-5 best matches, not all of them
- Give a specific reason for each recommendation
- Follow-ups should be related but different queries
- No emojis, no markdown headers`;

  const userPrompt = `User asked: "${query}"

Intent: ${intent.intent} | Area: ${intent.neighborhood || 'any'} | Vibe: ${intent.vibe || 'any'} | Match: ${matchQuality}

${intent.intent === 'hotels' ? `Hotels:\n${JSON.stringify(hotelContext, null, 2)}` : `Venues:\n${JSON.stringify(venueContext, null, 2)}`}

Respond naturally, then end with the JSON.`;

  const response = await callClaude(systemPrompt, userPrompt, 800);
  
  // Parse response
  let message = response;
  let selectedIndices: number[] = [];
  let suggestedFollowUps: string[] = [];

  const jsonMatch = response.match(/\{[^{}]*"selected"[^{}]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      selectedIndices = parsed.selected || [];
      suggestedFollowUps = parsed.followUps || [];
      message = response.replace(jsonMatch[0], '').trim();
    } catch (e) {
      // Extract mentioned venues by name
      selectedIndices = venues
        .map((v, i) => message.toLowerCase().includes(v.name.toLowerCase()) ? i : -1)
        .filter(i => i >= 0)
        .slice(0, 5);
    }
  }

  // Select venues
  const selectedVenues = selectedIndices
    .filter(i => i >= 0 && i < venues.length)
    .map(i => venues[i]);

  // Fallback if no selection
  const finalVenues = selectedVenues.length > 0 
    ? selectedVenues 
    : venues.slice(0, 5);

  // Default follow-ups
  if (suggestedFollowUps.length === 0) {
    suggestedFollowUps = [
      intent.neighborhood 
        ? `More options in ${intent.neighborhood.replace(/-/g, ' ')}`
        : `Best spots in ${cityConfig.neighborhoods[0]?.replace(/-/g, ' ')}`,
      `Something more upscale`,
      intent.intent === 'food' ? `Bars nearby` : `Restaurants nearby`,
    ];
  }

  return { message, selectedVenues: finalVenues, suggestedFollowUps };
}

/**
 * Generate Google Maps directions URL
 */
export function getDirectionsUrl(venue: Venue): string {
  if (venue.google_place_id) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.name)}&destination_place_id=${venue.google_place_id}`;
  }
  if (venue.latitude && venue.longitude) {
    return `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`;
  }
  if (venue.address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.address)}`;
  }
  return `https://www.google.com/maps/search/${encodeURIComponent(venue.name)}`;
}

/**
 * Main chat function — the public API
 */
export async function ask(
  query: string,
  supabase: SupabaseClient,
  citySlug: string = 'bangalore'
): Promise<AskResponse> {
  const startTime = Date.now();
  
  const cityConfig = CITY_CONFIGS[citySlug] || CITY_CONFIGS.bangalore;

  // Step 1: Classify intent
  const intent = await classifyIntent(query, cityConfig);
  console.log('[Ask] Intent:', JSON.stringify(intent));

  // Step 2: Query database
  const { venues, matchQuality } = await queryVenues(supabase, intent, citySlug);
  
  let hotels: Hotel[] = [];
  if (intent.intent === 'hotels') {
    hotels = await queryHotels(supabase, intent, citySlug);
  }

  // Step 3: Generate response
  const { message, selectedVenues, suggestedFollowUps } = await generateResponse(
    query, venues, hotels, intent, matchQuality, cityConfig
  );

  return {
    message,
    venues: selectedVenues,
    hotels: intent.intent === 'hotels' ? hotels.slice(0, 5) : undefined,
    intent,
    responseTimeMs: Date.now() - startTime,
    matchQuality,
    suggestedFollowUps,
  };
}
