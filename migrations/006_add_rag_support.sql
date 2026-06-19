-- ============================================================
-- BangaloreLife RAG Support Migration
-- Adds vector embeddings for semantic search
-- ============================================================

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Add embedding column to venues table
ALTER TABLE venues 
ADD COLUMN IF NOT EXISTS embedding vector(768);

-- 3. Create index for fast similarity search (IVFFlat)
-- Using 100 lists for ~12,000 venues (sqrt(12000) ≈ 110)
CREATE INDEX IF NOT EXISTS venues_embedding_idx 
ON venues USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 4. Create local_knowledge table for neighbourhood context
CREATE TABLE IF NOT EXISTS local_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  area_slug TEXT UNIQUE NOT NULL,
  area_name TEXT NOT NULL,
  vibe TEXT,
  known_for TEXT[] DEFAULT '{}',
  best_time TEXT,
  who_goes_there TEXT,
  local_tips TEXT,
  landmarks TEXT[] DEFAULT '{}',
  street_context TEXT, -- OSM-derived street descriptions
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for area lookups
CREATE INDEX IF NOT EXISTS local_knowledge_slug_idx ON local_knowledge(area_slug);

-- 5. Vector similarity search function for venues
CREATE OR REPLACE FUNCTION match_venues(
  query_embedding vector(768),
  match_count INT DEFAULT 8,
  filter_neighborhood TEXT DEFAULT NULL,
  filter_types TEXT[] DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  type TEXT,
  neighborhood TEXT,
  address TEXT,
  phone TEXT,
  website TEXT,
  google_rating DECIMAL,
  cuisine_types TEXT[],
  features TEXT[],
  price_range TEXT,
  description TEXT,
  opening_hours JSONB,
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
    v.phone,
    v.website,
    v.google_rating,
    v.cuisine_types,
    v.features,
    v.price_range,
    v.description,
    v.opening_hours,
    1 - (v.embedding <=> query_embedding) AS similarity
  FROM venues v
  WHERE v.is_active = true
    AND v.embedding IS NOT NULL
    AND (filter_neighborhood IS NULL OR v.neighborhood = filter_neighborhood)
    AND (filter_types IS NULL OR v.type = ANY(filter_types))
  ORDER BY v.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 6. Vector similarity search for neighbourhoods
CREATE OR REPLACE FUNCTION match_areas(
  query_embedding vector(768),
  match_count INT DEFAULT 3
)
RETURNS TABLE (
  area_slug TEXT,
  area_name TEXT,
  vibe TEXT,
  known_for TEXT[],
  local_tips TEXT,
  landmarks TEXT[],
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    lk.area_slug,
    lk.area_name,
    lk.vibe,
    lk.known_for,
    lk.local_tips,
    lk.landmarks,
    1 - (lk.embedding <=> query_embedding) AS similarity
  FROM local_knowledge lk
  WHERE lk.embedding IS NOT NULL
  ORDER BY lk.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 7. Helper function to get area context by slug
CREATE OR REPLACE FUNCTION get_area_context(area TEXT)
RETURNS TABLE (
  area_slug TEXT,
  area_name TEXT,
  vibe TEXT,
  known_for TEXT[],
  best_time TEXT,
  who_goes_there TEXT,
  local_tips TEXT,
  landmarks TEXT[],
  street_context TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    lk.area_slug,
    lk.area_name,
    lk.vibe,
    lk.known_for,
    lk.best_time,
    lk.who_goes_there,
    lk.local_tips,
    lk.landmarks,
    lk.street_context
  FROM local_knowledge lk
  WHERE lk.area_slug = area
  LIMIT 1;
END;
$$;

-- 8. Trigger function to mark venues for re-embedding on update
-- (Actual embedding happens via application code)
ALTER TABLE venues 
ADD COLUMN IF NOT EXISTS embedding_updated_at TIMESTAMPTZ;

CREATE OR REPLACE FUNCTION mark_venue_for_reembed()
RETURNS TRIGGER AS $$
BEGIN
  -- Only mark if content fields changed
  IF (
    OLD.name IS DISTINCT FROM NEW.name OR
    OLD.description IS DISTINCT FROM NEW.description OR
    OLD.cuisine_types IS DISTINCT FROM NEW.cuisine_types OR
    OLD.features IS DISTINCT FROM NEW.features OR
    OLD.neighborhood IS DISTINCT FROM NEW.neighborhood
  ) THEN
    NEW.embedding := NULL;
    NEW.embedding_updated_at := NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS venue_reembed_trigger ON venues;
CREATE TRIGGER venue_reembed_trigger
BEFORE UPDATE ON venues
FOR EACH ROW
EXECUTE FUNCTION mark_venue_for_reembed();

-- 9. View for venues needing embedding
CREATE OR REPLACE VIEW venues_needing_embedding AS
SELECT id, name, slug, type, neighborhood, description, cuisine_types, features, price_range, google_rating
FROM venues
WHERE is_active = true
  AND embedding IS NULL
ORDER BY google_rating DESC NULLS LAST;

-- 10. Stats function
CREATE OR REPLACE FUNCTION embedding_stats()
RETURNS TABLE (
  total_venues BIGINT,
  embedded_venues BIGINT,
  pending_venues BIGINT,
  embedding_coverage NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT AS total_venues,
    COUNT(*) FILTER (WHERE embedding IS NOT NULL)::BIGINT AS embedded_venues,
    COUNT(*) FILTER (WHERE embedding IS NULL)::BIGINT AS pending_venues,
    ROUND(
      100.0 * COUNT(*) FILTER (WHERE embedding IS NOT NULL) / NULLIF(COUNT(*), 0),
      2
    ) AS embedding_coverage
  FROM venues
  WHERE is_active = true;
END;
$$;

-- Permissions
GRANT EXECUTE ON FUNCTION match_venues TO anon, authenticated;
GRANT EXECUTE ON FUNCTION match_areas TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_area_context TO anon, authenticated;
GRANT EXECUTE ON FUNCTION embedding_stats TO anon, authenticated;
GRANT SELECT ON venues_needing_embedding TO service_role;
GRANT SELECT ON local_knowledge TO anon, authenticated;

COMMENT ON FUNCTION match_venues IS 'Semantic search for venues using vector similarity';
COMMENT ON FUNCTION match_areas IS 'Semantic search for neighbourhood context';
COMMENT ON TABLE local_knowledge IS 'Neighbourhood context for RAG pipeline';
