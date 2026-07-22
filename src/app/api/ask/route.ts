/**
 * Ask BangaloreLife API Endpoint (RAG-powered)
 * POST /api/ask
 * Body: { query: string, sessionId?: string }
 * 
 * Uses RAG pipeline with Gemini embeddings + pgvector + Gemini 2.0 Flash
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ragQuery, getDirectionsUrl } from '@/lib/rag';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, sessionId } = body;

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

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Run RAG pipeline
    const result = await ragQuery(trimmedQuery, supabase);

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
      venueIds: result.venues.map(v => v.id),
      responseTimeMs: result.responseTimeMs,
      areaDetected: result.areaContext?.area_slug || null,
    }).catch(console.error);

    // Generate follow-up suggestions
    const suggestedFollowUps = generateFollowUps(result.venues, result.areaContext);

    return NextResponse.json({
      message: result.message,
      venues: venuesWithDirections.slice(0, 5), // Return top 5 for UI
      areaContext: result.areaContext,
      responseTimeMs: result.responseTimeMs,
      suggestedFollowUps,
    });

  } catch (error: any) {
    console.error('Ask API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Something went wrong. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

function generateFollowUps(venues: any[], areaContext: any): string[] {
  const suggestions: string[] = [];
  
  if (areaContext) {
    suggestions.push(`More places in ${areaContext.area_name}`);
  }
  
  // Suggest based on venue types found
  const types = [...new Set(venues.map(v => v.type))];
  if (types.includes('restaurant')) {
    suggestions.push('Best bars nearby');
  } else if (types.includes('bar') || types.includes('pub')) {
    suggestions.push('Late night food spots');
  }
  
  // Generic suggestions
  if (suggestions.length < 3) {
    suggestions.push('Rooftop options', 'Budget-friendly picks', 'Best for groups');
  }
  
  return suggestions.slice(0, 3);
}

async function logConversation(
  supabase: any,
  data: {
    sessionId: string;
    query: string;
    response: string;
    venueIds: string[];
    responseTimeMs: number;
    areaDetected: string | null;
  }
) {
  await supabase.from('ai_conversations').insert({
    session_id: data.sessionId,
    user_query: data.query,
    ai_response: data.response,
    venues_returned: data.venueIds,
    response_time_ms: data.responseTimeMs,
    intent_detected: data.areaDetected ? `area:${data.areaDetected}` : 'general',
  });
}

// Health check endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({
      status: 'ok',
      service: 'Ask BangaloreLife (RAG)',
      model: 'Gemini 2.0 Flash + text-embedding-004',
      features: ['Vector search', 'Neighbourhood context', 'Arjun persona'],
      usage: 'POST with { query: "your question" }',
    });
  }

  // Support GET with query param for testing
  const postRequest = new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' },
  });

  return POST(postRequest);
}
