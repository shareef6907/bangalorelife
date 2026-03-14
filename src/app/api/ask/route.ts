/**
 * Ask BangaloreLife API Endpoint
 * POST /api/ask
 * Body: { query: string, sessionId?: string, city?: string }
 * 
 * Powered by Claude claude-sonnet-4-20250514 for natural language venue search
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ask, getDirectionsUrl, CITY_CONFIGS } from '@/lib/claude';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, sessionId, city = 'bangalore' } = body;

    // Validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const trimmedQuery = query.trim();
    
    if (trimmedQuery.length > 500) {
      return NextResponse.json(
        { error: 'Query too long (max 500 characters)' },
        { status: 400 }
      );
    }

    // Validate city
    const citySlug = city.toLowerCase();
    if (!CITY_CONFIGS[citySlug]) {
      return NextResponse.json(
        { error: `City "${city}" not supported. Available: ${Object.keys(CITY_CONFIGS).join(', ')}` },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Run the Ask pipeline
    const result = await ask(trimmedQuery, supabase, citySlug);

    // Add directions URLs to venues
    const venuesWithDirections = result.venues.map(venue => ({
      ...venue,
      directionsUrl: getDirectionsUrl(venue),
    }));

    // Log conversation for analytics (async)
    logConversation(supabase, {
      sessionId: sessionId || 'anonymous',
      query: trimmedQuery,
      response: result.message,
      intent: result.intent.intent,
      venueIds: result.venues.map(v => v.id),
      responseTimeMs: result.responseTimeMs,
      city: citySlug,
    }).catch(console.error);

    return NextResponse.json({
      message: result.message,
      venues: venuesWithDirections,
      hotels: result.hotels,
      intent: result.intent,
      matchQuality: result.matchQuality,
      responseTimeMs: result.responseTimeMs,
      suggestedFollowUps: result.suggestedFollowUps,
      city: citySlug,
      brandName: CITY_CONFIGS[citySlug].brandName,
    });

  } catch (error: any) {
    console.error('Ask API error:', error);
    
    // Check for API key issues
    if (error.message?.includes('ANTHROPIC_API_KEY')) {
      return NextResponse.json(
        { error: 'AI service not configured. Please contact support.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Something went wrong. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

async function logConversation(
  supabase: any,
  data: {
    sessionId: string;
    query: string;
    response: string;
    intent: string;
    venueIds: string[];
    responseTimeMs: number;
    city: string;
  }
) {
  try {
    await supabase.from('ai_conversations').insert({
      session_id: data.sessionId,
      user_query: data.query,
      ai_response: data.response,
      intent_detected: data.intent,
      venues_returned: data.venueIds,
      response_time_ms: data.responseTimeMs,
      city: data.city,
      model: 'claude-sonnet-4-20250514',
    });
  } catch (e) {
    // Table might not have city/model columns yet
    await supabase.from('ai_conversations').insert({
      session_id: data.sessionId,
      user_query: data.query,
      ai_response: data.response,
      intent_detected: data.intent,
      venues_returned: data.venueIds,
      response_time_ms: data.responseTimeMs,
    });
  }
}

// Health check endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({
      status: 'ok',
      service: 'Ask BangaloreLife',
      model: 'claude-sonnet-4-20250514',
      cities: Object.keys(CITY_CONFIGS),
      usage: 'POST with { query: "your question", city?: "bangalore" }',
    });
  }

  // Support GET with query param for easy testing
  const city = searchParams.get('city') || 'bangalore';
  
  const postRequest = new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ query, city }),
    headers: { 'Content-Type': 'application/json' },
  });

  return POST(postRequest);
}
