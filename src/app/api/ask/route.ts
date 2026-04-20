/**
 * Ask BangaloreLife API Endpoint
 * POST /api/ask
 * Body: { query: string, sessionId?: string }
 * 
 * Powered by Gemini 2.0 Flash for natural language venue search
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { chat, getDirectionsUrl } from '@/lib/gemini';

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

    // Run the chat pipeline (uses Gemini)
    const result = await chat(trimmedQuery, supabase);

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
    }).catch(console.error);

    return NextResponse.json({
      message: result.message,
      venues: venuesWithDirections,
      hotels: result.hotels,
      intent: result.intent,
      matchQuality: result.matchQuality,
      responseTimeMs: result.responseTimeMs,
      suggestedFollowUps: generateFollowUps(result.intent),
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

function generateFollowUps(intent: any): string[] {
  const suggestions: string[] = [];
  
  if (intent.area) {
    suggestions.push(`More options in ${intent.area.replace(/-/g, ' ')}`);
  }
  
  switch (intent.intent) {
    case 'food':
      suggestions.push('Bars nearby', 'Cafes with wifi');
      break;
    case 'nightlife':
      suggestions.push('Late night food', 'Rooftop options');
      break;
    case 'hotels':
      suggestions.push('Restaurants nearby', 'Things to do');
      break;
    default:
      suggestions.push('Best restaurants', 'Popular bars');
  }
  
  return suggestions.slice(0, 3);
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
  }
) {
  await supabase.from('ai_conversations').insert({
    session_id: data.sessionId,
    user_query: data.query,
    ai_response: data.response,
    intent_detected: data.intent,
    venues_returned: data.venueIds,
    response_time_ms: data.responseTimeMs,
  });
}

// Health check endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({
      status: 'ok',
      service: 'Ask BangaloreLife',
      model: 'Gemini 2.0 Flash',
      usage: 'POST with { query: "your question" }',
    });
  }

  // Support GET with query param for easy testing
  const postRequest = new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' },
  });

  return POST(postRequest);
}
