/**
 * Seed initial venues for BangaloreLife.com
 * Run with: npx tsx scripts/seed-venues.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imvanyylhitwmuegepkr.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdmFueXlsaGl0d211ZWdlcGtyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY2MzIxMSwiZXhwIjoyMDg3MjM5MjExfQ.FPW0JSgwlDkwquy5z6gEqof_1RAdoL-0mH8DMl-hVnU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const venues = [
  // INDIRANAGAR
  {
    name: "Toit Brewpub",
    slug: "toit-indiranagar",
    description: "Bangalore's most iconic microbrewery. Famous for Toit Weiss and Tintin Toit. Industrial-chic interiors with multiple levels. Always buzzing with the after-work crowd.",
    category: "brewery",
    neighborhood: "indiranagar",
    address: "298, 100 Feet Road, Indiranagar",
    city: "bangalore",
    price_range: "₹₹₹",
    features: ["craft-beer", "live-music", "rooftop", "food"],
    timings: "12 PM - 1 AM",
    rating: 4.8,
    is_featured: true,
    is_active: true,
  },
  {
    name: "The Permit Room",
    slug: "permit-room-indiranagar",
    description: "Speakeasy-style cocktail bar serving South Indian-inspired drinks. Innovative cocktails with local ingredients. Intimate setting perfect for conversations.",
    category: "bar",
    neighborhood: "indiranagar",
    address: "12th Main, Indiranagar",
    city: "bangalore",
    price_range: "₹₹₹",
    features: ["cocktails", "speakeasy", "food"],
    timings: "5 PM - 12:30 AM",
    rating: 4.6,
    is_featured: true,
    is_active: true,
  },
  {
    name: "Daddy's",
    slug: "daddys-indiranagar",
    description: "High-energy club with international DJs. Multiple dance floors and VIP sections. The place to be for weekend parties.",
    category: "club",
    neighborhood: "indiranagar",
    address: "100 Feet Road, Indiranagar",
    city: "bangalore",
    price_range: "₹₹₹₹",
    features: ["dj", "dancing", "vip", "late-night"],
    timings: "9 PM - 3 AM",
    rating: 4.2,
    is_featured: false,
    is_active: true,
  },

  // KORAMANGALA
  {
    name: "The Bier Library",
    slug: "bier-library-koramangala",
    description: "Craft beer haven with an extensive rotating tap list. Cozy library-themed interiors. Great for beer enthusiasts and casual drinkers alike.",
    category: "brewery",
    neighborhood: "koramangala",
    address: "6th Block, Koramangala",
    city: "bangalore",
    price_range: "₹₹₹",
    features: ["craft-beer", "food", "sports-bar"],
    timings: "12 PM - 12:30 AM",
    rating: 4.4,
    is_featured: true,
    is_active: true,
  },
  {
    name: "Loft 38",
    slug: "loft-38-koramangala",
    description: "Industrial-chic bar with exposed brick and vintage decor. Great cocktails and pub food. Popular with the startup crowd.",
    category: "bar",
    neighborhood: "koramangala",
    address: "80 Feet Road, Koramangala",
    city: "bangalore",
    price_range: "₹₹₹",
    features: ["cocktails", "rooftop", "food"],
    timings: "4 PM - 1 AM",
    rating: 4.3,
    is_featured: false,
    is_active: true,
  },
  {
    name: "Communiti",
    slug: "communiti-koramangala",
    description: "Massive entertainment complex with bowling, arcade games, and multiple bars. Perfect for group outings and celebrations.",
    category: "pub",
    neighborhood: "koramangala",
    address: "Forum Mall, Koramangala",
    city: "bangalore",
    price_range: "₹₹₹",
    features: ["bowling", "arcade", "food", "sports-bar"],
    timings: "12 PM - 1 AM",
    rating: 4.1,
    is_featured: false,
    is_active: true,
  },

  // MG ROAD / BRIGADE ROAD
  {
    name: "Pecos",
    slug: "pecos-mg-road",
    description: "Legendary rock bar since 1978. The original Bangalore pub experience. Live rock music and cold beer. A piece of Bangalore history.",
    category: "pub",
    neighborhood: "mg-road",
    address: "Rest House Road, MG Road",
    city: "bangalore",
    price_range: "₹₹",
    features: ["live-music", "rock", "classic"],
    timings: "11 AM - 11:30 PM",
    rating: 4.5,
    is_featured: true,
    is_active: true,
  },
  {
    name: "13th Floor",
    slug: "13th-floor-mg-road",
    description: "Iconic rooftop bar with panoramic city views. Multiple sections including an open-air terrace. Great for sunset drinks.",
    category: "lounge",
    neighborhood: "mg-road",
    address: "Barton Centre, MG Road",
    city: "bangalore",
    price_range: "₹₹₹₹",
    features: ["rooftop", "view", "cocktails", "dj"],
    timings: "5 PM - 1 AM",
    rating: 4.3,
    is_featured: true,
    is_active: true,
  },

  // WHITEFIELD
  {
    name: "Windmills Craftworks",
    slug: "windmills-whitefield",
    description: "Award-winning microbrewery with Belgian-inspired beers. Spacious venue with outdoor seating. Popular weekend brunch destination.",
    category: "brewery",
    neighborhood: "whitefield",
    address: "Whitefield Main Road",
    city: "bangalore",
    price_range: "₹₹₹",
    features: ["craft-beer", "brunch", "outdoor", "food"],
    timings: "12 PM - 12:30 AM",
    rating: 4.5,
    is_featured: true,
    is_active: true,
  },
  {
    name: "Byg Brewski Brewing Company",
    slug: "byg-brewski-whitefield",
    description: "Massive 65,000 sq ft brewery with multiple themed zones. India's largest microbrewery. Live music and entertainment every weekend.",
    category: "brewery",
    neighborhood: "whitefield",
    address: "Sarjapur Road",
    city: "bangalore",
    price_range: "₹₹₹",
    features: ["craft-beer", "live-music", "outdoor", "massive"],
    timings: "12 PM - 1 AM",
    rating: 4.6,
    is_featured: true,
    is_active: true,
  },

  // HSR LAYOUT
  {
    name: "Arbor Brewing Company",
    slug: "arbor-brewing-hsr",
    description: "American-style microbrewery with award-winning beers. Relaxed vibe perfect for casual hangouts. Great burgers and American food.",
    category: "brewery",
    neighborhood: "hsr-layout",
    address: "Magrath Road",
    city: "bangalore",
    price_range: "₹₹₹",
    features: ["craft-beer", "american-food", "casual"],
    timings: "12 PM - 12 AM",
    rating: 4.6,
    is_featured: true,
    is_active: true,
  },

  // JP NAGAR
  {
    name: "Hangover",
    slug: "hangover-jp-nagar",
    description: "Casual neighborhood pub with affordable drinks. Sports screenings and pub quizzes. Local favorite for low-key evenings.",
    category: "pub",
    neighborhood: "jp-nagar",
    address: "15th Cross, JP Nagar",
    city: "bangalore",
    price_range: "₹₹",
    features: ["sports-bar", "affordable", "casual"],
    timings: "11 AM - 11:30 PM",
    rating: 4.0,
    is_featured: false,
    is_active: true,
  },
];

async function seedVenues() {
  console.log('Seeding venues...');
  
  for (const venue of venues) {
    const { data, error } = await supabase
      .from('venues')
      .upsert(venue, { onConflict: 'slug' });
    
    if (error) {
      console.error(`Error seeding ${venue.name}:`, error.message);
    } else {
      console.log(`✅ Seeded: ${venue.name}`);
    }
  }
  
  console.log('\nDone! Seeded', venues.length, 'venues');
}

seedVenues();
