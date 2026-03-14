# BangaloreLife AI Chatbot Architecture

## Overview

The chatbot uses **Retrieval Augmented Generation (RAG)** to answer questions using only verified venue data from our Supabase database. No hallucinations, no invented venues.

**AI Provider:** Gemini only (no Claude/Anthropic)
- **Embeddings:** `text-embedding-004` 
- **Generation:** `gemini-2.0-flash`

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         User Query                                  │
│                  "best biryani in koramangala"                      │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    1. EMBED QUERY                                   │
│           Gemini text-embedding-004 → 768-dim vector                │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    2. RETRIEVE CONTEXT                              │
│  ┌─────────────────────┐    ┌─────────────────────────────────┐     │
│  │  pgvector search    │    │  neighbourhood context lookup   │     │
│  │  Top 8 venues by    │    │  local_knowledge table          │     │
│  │  cosine similarity  │    │                                 │     │
│  └──────────┬──────────┘    └───────────────┬─────────────────┘     │
│             │                               │                       │
│             └───────────────┬───────────────┘                       │
│                             │                                       │
│                             ▼                                       │
│              Combined Context (venues + area knowledge)             │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    3. GENERATE RESPONSE                             │
│                                                                     │
│  System Prompt: "You are Arjun, a Bangalore local expert..."       │
│  Context: [8 relevant venues + neighbourhood info]                  │
│  User Query: "best biryani in koramangala"                          │
│                                                                     │
│  Gemini 2.0 Flash → Natural, grounded response                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### 1. Venues Table (extended)

```sql
-- Add embedding column to existing venues table
ALTER TABLE venues 
ADD COLUMN IF NOT EXISTS embedding vector(768);

-- Create index for fast similarity search
CREATE INDEX IF NOT EXISTS venues_embedding_idx 
ON venues USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

### 2. Local Knowledge Table

```sql
CREATE TABLE local_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  area_slug TEXT UNIQUE NOT NULL,
  area_name TEXT NOT NULL,
  vibe TEXT,
  known_for TEXT[],
  best_time TEXT,
  who_goes_there TEXT,
  local_tips TEXT,
  landmarks TEXT[],
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. Vector Search Function

```sql
CREATE OR REPLACE FUNCTION match_venues(
  query_embedding vector(768),
  match_count INT DEFAULT 8,
  filter_neighborhood TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  type TEXT,
  neighborhood TEXT,
  address TEXT,
  google_rating DECIMAL,
  cuisine_types TEXT[],
  features TEXT[],
  price_range TEXT,
  description TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    v.id,
    v.name,
    v.slug,
    v.type,
    v.neighborhood,
    v.address,
    v.google_rating,
    v.cuisine_types,
    v.features,
    v.price_range,
    v.description,
    1 - (v.embedding <=> query_embedding) AS similarity
  FROM venues v
  WHERE v.is_active = true
    AND v.embedding IS NOT NULL
    AND (filter_neighborhood IS NULL OR v.neighborhood = filter_neighborhood)
  ORDER BY v.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

---

## Embedding Strategy

### Venue Embedding Text

For each venue, we concatenate key fields into a single text block:

```
{name} is a {type} in {neighbourhood}, Bangalore.
{description}
Cuisines: {cuisine_types}
Features: {features}
Price: {price_range}
Rating: {google_rating}/5
```

### Embedding Model

- **Model:** `text-embedding-004`
- **Dimensions:** 768
- **Batch size:** 100 venues per API call
- **Rate limit:** 1500 requests/minute (free tier)

---

## RAG Query Pipeline

### Step 1: Parse & Embed Query

```typescript
const queryEmbedding = await embedText(userQuery);
```

### Step 2: Retrieve Context

```typescript
// Vector search for relevant venues
const venues = await supabase.rpc('match_venues', {
  query_embedding: queryEmbedding,
  match_count: 8
});

// Get neighbourhood context if area mentioned
const areaContext = await getAreaContext(detectedArea);
```

### Step 3: Build Prompt

```typescript
const contextBlock = formatVenuesForPrompt(venues);
const systemPrompt = ARJUN_PERSONA + "\n\nCONTEXT:\n" + contextBlock;
```

### Step 4: Generate Response

```typescript
const response = await gemini.generate({
  system: systemPrompt,
  prompt: userQuery
});
```

---

## Arjun Persona (System Prompt)

```
You are Arjun, a BangaloreLife local expert. You were born and raised in 
Bangalore, you've lived across Koramangala, Indiranagar, and Jayanagar, 
and you know this city like the back of your hand.

You speak like a friendly, knowledgeable local — warm, casual, occasionally 
use light Bangalore slang ("yaar", "da", "total chill spot"), but never 
over the top. You give real recommendations like a friend would, not like 
a travel brochure.

STRICT RULES:
- Only recommend venues from the CONTEXT data provided to you
- Never invent venues, addresses, or details not in the context
- If no good match exists, say "honestly yaar, I don't have a great match 
  for that in my list right now — but try checking [area] area"
- Always mention: neighbourhood, vibe, and one specific detail 
  (parking, outdoor seating, best dish, etc.)
- Keep responses conversational — 3-5 sentences per venue max
- Never say "As an AI" — you are Arjun, period
```

---

## Auto-Embedding Trigger

New venues get embedded automatically on insert:

```sql
CREATE OR REPLACE FUNCTION embed_new_venue()
RETURNS TRIGGER AS $$
BEGIN
  -- Embedding happens via Edge Function called by pg_net
  PERFORM net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/embed-venue',
    body := jsonb_build_object('venue_id', NEW.id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER venue_embed_trigger
AFTER INSERT ON venues
FOR EACH ROW
EXECUTE FUNCTION embed_new_venue();
```

---

## Files Structure

```
src/
├── lib/
│   ├── embeddings.ts      # Gemini embedding functions
│   ├── rag.ts             # RAG pipeline (retrieve + generate)
│   └── gemini.ts          # Gemini API client
├── app/
│   └── api/
│       └── ask/
│           └── route.ts   # Updated to use RAG
scripts/
├── embed-all-venues.ts    # One-time batch embedding script
├── seed-local-knowledge.ts # Seed neighbourhood data
migrations/
└── 006_add_rag_support.sql # pgvector setup
```

---

## Replicating for Other Sites

To deploy this architecture to BahrainNights or NightsOut sites:

1. Run the migration to add pgvector + embedding column
2. Copy `src/lib/embeddings.ts` and `src/lib/rag.ts`
3. Update the persona in the system prompt (e.g., "Khalid" for Bahrain)
4. Run the embedding script for that site's venues
5. Seed local_knowledge with city-specific area data

The RAG pipeline is city-agnostic — only the data and persona change.
