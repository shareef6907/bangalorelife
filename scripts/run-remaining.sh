#!/bin/bash
cd "$(dirname "$0")/.."

# Remaining categories after cinemas
CATEGORIES=("banks" "atms" "hotels" "schools" "libraries" "spas" "bakeries")

echo "🚀 Running remaining categories..."
echo "   Starting with $(curl -s 'https://imvanyylhitwmuegepkr.supabase.co/rest/v1/venues?select=id' -H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFueXlsaGl0d211ZWdlcGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY2MzIxMSwiZXhwIjoyMDg3MjM5MjExfQ.FPW0JSgwlDkwquy5z6gEqof_1RAdoL-0mH8DMl-hVnU' -H 'Prefer: count=exact' -H 'Range: 0-0' -I 2>&1 | grep -i content-range | cut -d'/' -f2) venues"

for cat in "${CATEGORIES[@]}"; do
  echo ""
  echo "📍 Running $cat..."
  pnpm tsx scripts/osm-scraper-v2.ts "$cat" 2>&1 | tail -10
  sleep 5
done

FINAL=$(curl -s 'https://imvanyylhitwmuegepkr.supabase.co/rest/v1/venues?select=id' -H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFueXlsaGl0d211ZWdlcGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY2MzIxMSwiZXhwIjoyMDg3MjM5MjExfQ.FPW0JSgwlDkwquy5z6gEqof_1RAdoL-0mH8DMl-hVnU' -H 'Prefer: count=exact' -H 'Range: 0-0' -I 2>&1 | grep -i content-range | cut -d'/' -f2)

echo ""
echo "========================================="
echo "✅ ALL COMPLETE"
echo "   Final venue count: $FINAL"
echo "========================================="
