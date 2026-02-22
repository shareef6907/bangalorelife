#!/bin/bash
# Run each category in a fresh process to avoid memory issues

cd "$(dirname "$0")/.."

CATEGORIES=(
  "bars"
  "pubs"
  "nightclubs"
  "hospitals"
  "pharmacies"
  "dentists"
  "gyms"
  "malls"
  "supermarkets"
  "cinemas"
  "banks"
  "atms"
  "hotels"
  "schools"
  "libraries"
  "spas"
  "bakeries"
)

echo "🚀 Running all remaining categories..."
echo "   Starting with $(curl -s 'https://imvanyylhitwmuegepkr.supabase.co/rest/v1/venues?select=id' -H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFueXlsaGl0d211ZWdlcGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY2MzIxMSwiZXhwIjoyMDg3MjM5MjExfQ.FPW0JSgwlDkwquy5z6gEqof_1RAdoL-0mH8DMl-hVnU' -H 'Prefer: count=exact' -H 'Range: 0-0' -I 2>&1 | grep -i content-range | cut -d'/' -f2) venues"
echo ""

for cat in "${CATEGORIES[@]}"; do
  echo "📍 Running $cat..."
  pnpm tsx scripts/osm-scraper-v2.ts "$cat" 2>&1 | tail -10
  echo "   Sleeping 10s before next category..."
  sleep 10
done

FINAL=$(curl -s 'https://imvanyylhitwmuegepkr.supabase.co/rest/v1/venues?select=id' -H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFueXlsaGl0d211ZWdlcGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY2MzIxMSwiZXhwIjoyMDg3MjM5MjExfQ.FPW0JSgwlDkwquy5z6gEqof_1RAdoL-0mH8DMl-hVnU' -H 'Prefer: count=exact' -H 'Range: 0-0' -I 2>&1 | grep -i content-range | cut -d'/' -f2)

echo ""
echo "========================================="
echo "✅ COMPLETE"
echo "   Final venue count: $FINAL"
echo "========================================="
