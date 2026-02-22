/**
 * AI Chat API Endpoint
 * POST /api/chat
 * Body: { query: string, sessionId?: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { chat, classifyIntent, generateResponse, buildVenueQuery } from '@/lib/gemini';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, sessionId } = body;

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
    const startTime = Date.now();

    // Run the chat pipeline
    const result = await chat(trimmedQuery, supabase);

    // Log conversation for analytics (async, don't await)
    logConversation(supabase, {
      sessionId: sessionId || 'anonymous',
      query: trimmedQuery,
      response: result.message,
      intent: result.intent.intent,
      venueIds: result.venues.map(v => v.id),
      responseTimeMs: result.responseTimeMs
    }).catch(console.error);

    return NextResponse.json({
      message: result.message,
      venues: result.venues.slice(0, 10), // Return top 10
      intent: result.intent,
      responseTimeMs: result.responseTimeMs
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    
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
  }
) {
  await supabase.from('ai_conversations').insert({
    session_id: data.sessionId,
    user_query: data.query,
    ai_response: data.response,
    intent_detected: data.intent,
    venues_returned: data.venueIds,
    response_time_ms: data.responseTimeMs
  });
}

// Also support GET for simple testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({
      status: 'ok',
      message: 'BangaloreLife AI Chat API. POST with { query: "your question" }'
    });
  }

  // Redirect to POST handler
  const postRequest = new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' }
  });

  return POST(postRequest);
}
