import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Venues — Pubs, Bars, Breweries & Restaurants",
  description: "Discover 100+ venues in Bangalore with real Google ratings and reviews. Find the best pubs, bars, breweries, rooftop bars, restaurants, and cafes.",
  keywords: "bangalore venues, bangalore pubs, bangalore bars, bangalore breweries, bangalore restaurants, bangalore nightlife, koramangala pubs, indiranagar bars",
};

// Placeholder data - will be replaced with Supabase/Google Places data
const venues = [
  {
    id: "1",
    name: "Toit Brewpub",
    slug: "toit-brewpub",
    type: "brewery",
    neighborhood: "Indiranagar",
    google_rating: 4.4,
    google_reviews_count: 15420,
    google_price_level: 2,
    address: "100 Feet Road, Indiranagar",
    cover_photo_url: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=600&q=80",
    best_for_tags: ["Craft Beer", "Groups", "Live Music"],
  },
  {
    id: "2",
    name: "The Bier Library",
    slug: "the-bier-library",
    type: "bar",
    neighborhood: "Koramangala",
    google_rating: 4.3,
    google_reviews_count: 8234,
    google_price_level: 2,
    address: "5th Block, Koramangala",
    cover_photo_url: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&q=80",
    best_for_tags: ["Craft Beer", "Beer Geeks", "Chill Vibes"],
  },
  {
    id: "3",
    name: "Arbor Brewing Company",
    slug: "arbor-brewing-company",
    type: "brewery",
    neighborhood: "Magrath Road",
    google_rating: 4.3,
    google_reviews_count: 11567,
    google_price_level: 3,
    address: "8 Magrath Road",
    cover_photo_url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
    best_for_tags: ["IPA", "American Style", "Groups"],
  },
  {
    id: "4",
    name: "Skyye Lounge",
    slug: "skyye-lounge",
    type: "rooftop",
    neighborhood: "UB City",
    google_rating: 4.1,
    google_reviews_count: 6789,
    google_price_level: 4,
    address: "UB City, Vittal Mallya Road",
    cover_photo_url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
    best_for_tags: ["Views", "Premium", "Date Night"],
  },
  {
    id: "5",
    name: "Byg Brewski",
    slug: "byg-brewski",
    type: "brewery",
    neighborhood: "Hennur",
    google_rating: 4.2,
    google_reviews_count: 12890,
    google_price_level: 2,
    address: "Hennur Main Road",
    cover_photo_url: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=600&q=80",
    best_for_tags: ["Massive", "Outdoor", "Groups"],
  },
  {
    id: "6",
    name: "Pecos",
    slug: "pecos",
    type: "pub",
    neighborhood: "Brigade Road",
    google_rating: 4.0,
    google_reviews_count: 9876,
    google_price_level: 1,
    address: "Rest House Road, Brigade Road",
    cover_photo_url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
    best_for_tags: ["Legendary", "Rock Music", "Budget"],
  },
  {
    id: "7",
    name: "Windmills Craftworks",
    slug: "windmills-craftworks",
    type: "brewery",
    neighborhood: "Whitefield",
    google_rating: 4.3,
    google_reviews_count: 7654,
    google_price_level: 3,
    address: "Whitefield Main Road",
    cover_photo_url: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&q=80",
    best_for_tags: ["Belgian", "Refined", "Couples"],
  },
  {
    id: "8",
    name: "Koramangala Social",
    slug: "koramangala-social",
    type: "bar",
    neighborhood: "Koramangala",
    google_rating: 4.1,
    google_reviews_count: 11234,
    google_price_level: 2,
    address: "5th Block, Koramangala",
    cover_photo_url: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=600&q=80",
    best_for_tags: ["Co-working", "Energetic", "Groups"],
  },
];

const neighborhoods = [
  "All Neighborhoods",
  "Koramangala",
  "Indiranagar",
  "MG Road",
  "Whitefield",
  "HSR Layout",
  "Hennur",
  "JP Nagar",
];

const venueTypes = [
  { label: "All Types", value: "all" },
  { label: "Pubs & Bars", value: "pub" },
  { label: "Breweries", value: "brewery" },
  { label: "Rooftop Bars", value: "rooftop" },
  { label: "Clubs", value: "club" },
  { label: "Restaurants", value: "restaurant" },
  { label: "Cafes", value: "cafe" },
];

function getPriceLevel(level: number) {
  return "₹".repeat(level);
}

function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    pub: "Pub",
    bar: "Bar",
    brewery: "Brewery",
    club: "Club",
    lounge: "Lounge",
    rooftop: "Rooftop Bar",
    cafe: "Cafe",
    restaurant: "Restaurant",
  };
  return labels[type] || type;
}

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative py-20 px-4 border-b border-zinc-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bangalore Venues
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Discover 100+ venues with real Google ratings, reviews, and detailed guides.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-16 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50 py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-3">
              {/* Type Filter */}
              <select className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500">
                {venueTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              
              {/* Neighborhood Filter */}
              <select className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500">
                {neighborhoods.map((hood) => (
                  <option key={hood} value={hood}>{hood}</option>
                ))}
              </select>
              
              {/* Rating Filter */}
              <select className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500">
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="4.0">4.0+ ⭐</option>
                <option value="3.5">3.5+ ⭐</option>
              </select>
              
              {/* Sort */}
              <select className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 ml-auto">
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="name">A-Z</option>
              </select>
            </div>
          </div>
        </section>

        {/* Venues Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-zinc-500 mb-6">{venues.length} venues found</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {venues.map((venue) => (
                <Link
                  key={venue.id}
                  href={`/venues/${venue.slug}`}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/50 transition-all"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={venue.cover_photo_url}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-zinc-950/80 backdrop-blur-sm rounded-lg text-xs font-medium">
                      {getTypeLabel(venue.type)}
                    </div>
                    {/* Price Level */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-zinc-950/80 backdrop-blur-sm rounded-lg text-xs font-medium text-green-400">
                      {getPriceLevel(venue.google_price_level)}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 rounded-md">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-semibold text-yellow-500">{venue.google_rating}</span>
                      </div>
                      <span className="text-xs text-zinc-500">
                        {venue.google_reviews_count.toLocaleString()} reviews
                      </span>
                    </div>
                    
                    {/* Name */}
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-violet-400 transition-colors">
                      {venue.name}
                    </h3>
                    
                    {/* Location */}
                    <p className="text-sm text-zinc-500 mb-3">
                      📍 {venue.neighborhood}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {venue.best_for_tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Load More */}
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl font-medium transition-all">
                Load More Venues
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-zinc-900/30 border-t border-zinc-800/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Know a venue we&apos;re missing?</h2>
            <p className="text-zinc-400 mb-6">
              Help us make BangaloreLife the most complete guide to the city.
            </p>
            <Link
              href="/suggest"
              className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-medium transition-colors"
            >
              Suggest a Venue
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
