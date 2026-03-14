# Deployment Guide: Ask AI Search

Deploy the "Ask" AI natural language search across BangaloreLife and NightsOut GCC sites.

---

## Prerequisites

1. **Claude API Key** - Get from [console.anthropic.com](https://console.anthropic.com)
2. **Supabase** - Existing setup with venues table
3. **Vercel** - Existing deployment

---

## Environment Variables

Add to `.env.local` (local) and Vercel dashboard (production):

```bash
# Required for AI search
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Existing (should already be set)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
```

---

## Per-City Configuration

The `AskSearch` component and `/api/ask` endpoint support multiple cities via a `city` prop/param.

### BangaloreLife.com

```tsx
<AskSearch 
  city="bangalore"
  brandName="BangaloreLife"
  venueCount="12,000+"
/>
```

### NightsOut Dubai

```tsx
<AskSearch 
  city="dubai"
  brandName="NightsOut Dubai"
  venueCount="8,000+"
  accentColor="amber"
/>
```

### NightsOut Abu Dhabi

```tsx
<AskSearch 
  city="abudhabi"
  brandName="NightsOut Abu Dhabi"
  venueCount="4,000+"
/>
```

### NightsOut Riyadh

```tsx
<AskSearch 
  city="riyadh"
  brandName="NightsOut Riyadh"
  venueCount="5,000+"
/>
```

### NightsOut Jeddah

```tsx
<AskSearch 
  city="jeddah"
  brandName="NightsOut Jeddah"
  venueCount="3,500+"
/>
```

### NightsOut Doha

```tsx
<AskSearch 
  city="doha"
  brandName="NightsOut Doha"
  venueCount="2,500+"
/>
```

### NightsOut Muscat

```tsx
<AskSearch 
  city="muscat"
  brandName="NightsOut Muscat"
  venueCount="1,500+"
/>
```

---

## Database Requirements

Each city's venues table must have:
- `city` column (for multi-city DBs) OR separate Supabase project
- `is_active` boolean
- `neighborhood` text
- Standard venue fields (name, slug, type, google_rating, etc.)

If using a single Supabase project for all cities, ensure venues have a `city` field matching the city slugs above.

---

## Rollout Checklist

### Per Site:

- [ ] Add `ANTHROPIC_API_KEY` to Vercel environment
- [ ] Copy `src/components/AskSearch.tsx` to project
- [ ] Copy `src/lib/claude.ts` to project
- [ ] Copy `src/app/api/ask/route.ts` to project
- [ ] Update homepage to use `<AskSearch city="xxx" ... />`
- [ ] Test locally with `pnpm dev`
- [ ] Deploy to Vercel
- [ ] Verify AI responses work

### Shared Claude API Key

All sites can share one Anthropic API key. Monitor usage in Anthropic Console.

Estimated cost: ~$0.003 per query (Claude claude-sonnet-4-20250514)

---

## API Usage

### Endpoint

```
POST /api/ask
Content-Type: application/json

{
  "query": "best biryani in koramangala",
  "city": "bangalore",
  "sessionId": "optional-session-id"
}
```

### Response

```json
{
  "message": "Here are the best biryani spots in Koramangala...",
  "venues": [...],
  "intent": { "intent": "food", "cuisines": ["biryani"], ... },
  "matchQuality": "excellent",
  "suggestedFollowUps": ["More options nearby", "Best restaurants tonight"],
  "responseTimeMs": 1234
}
```

---

## Troubleshooting

### "AI service not configured"
- Check `ANTHROPIC_API_KEY` is set in Vercel environment
- Redeploy after adding env vars

### No venues returned
- Check Supabase connection
- Verify `is_active = true` on venues
- Check city filter matches database

### Slow responses
- Claude API typically responds in 1-3 seconds
- Check Vercel function logs for timeouts
- Consider edge functions for lower latency

---

## Files

```
src/
├── components/
│   └── AskSearch.tsx      # Main UI component
├── lib/
│   └── claude.ts          # Claude API + city configs
└── app/
    └── api/
        └── ask/
            └── route.ts   # API endpoint
```
