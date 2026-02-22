import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Venues — Pubs, Breweries, Bars & Restaurants",
  description: "Explore Bangalore's best venues. Detailed guides to pubs, breweries, bars, and restaurants across the city.",
  keywords: "bangalore pubs, bangalore bars, bangalore restaurants, bangalore venues, bangalore breweries",
};

const venues = [
  // Breweries
  { name: "Toit Brewpub", slug: "toit-brewpub", type: "Brewpub", area: "Indiranagar", tags: ["Craft Beer", "Legendary"] },
  { name: "Arbor Brewing Company", slug: "arbor-brewing-company", type: "Brewery", area: "Magrath Road", tags: ["IPA", "American Style"] },
  { name: "Byg Brewski", slug: "byg-brewski", type: "Brewery", area: "Hennur", tags: ["Massive", "Outdoor"] },
  { name: "The Bier Library", slug: "the-bier-library", type: "Craft Beer Bar", area: "Koramangala", tags: ["Beer Geeks", "Rotating Taps"] },
  { name: "Windmills Craftworks", slug: "windmills-craftworks", type: "Brewpub", area: "Whitefield", tags: ["Belgian", "Refined"] },
  
  // Rooftops
  { name: "Skyye Lounge", slug: "skyye-lounge", type: "Rooftop Lounge", area: "UB City", tags: ["Views", "Premium"] },
  { name: "13th Floor", slug: "13th-floor", type: "Rooftop Bar", area: "MG Road", tags: ["Sundowners", "Classic"] },
  { name: "Loft 38", slug: "loft-38", type: "Rooftop Lounge", area: "Indiranagar", tags: ["Cocktails", "Sleek"] },
  
  // Classic Bars
  { name: "Pecos", slug: "pecos", type: "Rock Pub", area: "Brigade Road", tags: ["Legendary", "Rock Music"] },
  { name: "Hard Rock Cafe", slug: "hard-rock-cafe", type: "Bar & Grill", area: "St. Mark's Road", tags: ["Live Music", "International"] },
  { name: "Koramangala Social", slug: "koramangala-social", type: "Cafe Bar", area: "Koramangala", tags: ["Co-working", "Energetic"] },
  { name: "Bob's Bar", slug: "bobs-bar", type: "Budget Pub", area: "Multiple", tags: ["Affordable", "No-frills"] },
  
  // Cocktail Bars
  { name: "Toast & Tonic", slug: "toast-and-tonic", type: "Gastropub", area: "Indiranagar", tags: ["Gin", "Farm-to-table"] },
  { name: "The Permit Room", slug: "the-permit-room", type: "Cocktail Bar", area: "Indiranagar", tags: ["South Indian Cocktails", "Unique"] },
  
  // Live Music
  { name: "The Humming Tree", slug: "the-humming-tree", type: "Live Music Venue", area: "Indiranagar", tags: ["Indie", "Gigs"] },
  { name: "Fandom at Gilly's", slug: "fandom-gillys", type: "Music Venue", area: "Koramangala", tags: ["EDM", "Concerts"] },
  
  // More Pubs
  { name: "Hammered", slug: "hammered", type: "Late Night Pub", area: "Koramangala", tags: ["Late Night", "Party"] },
  { name: "Murphy's Brewhouse", slug: "murphys-brewhouse", type: "Irish Brewpub", area: "Multiple", tags: ["Stout", "Irish"] },
  { name: "Gilly's Brewpub", slug: "gillys-brewpub", type: "Brewpub", area: "Koramangala", tags: ["Live Music", "Accessible"] },
  { name: "Brahma Brews", slug: "brahma-brews", type: "Brewery", area: "HSR Layout", tags: ["Neighborhood", "Quality"] },
];

const categories = [
  { name: "Breweries", filter: ["Brewpub", "Brewery"], emoji: "🍺" },
  { name: "Rooftop Bars", filter: ["Rooftop Lounge", "Rooftop Bar"], emoji: "🌆" },
  { name: "Pubs & Bars", filter: ["Rock Pub", "Budget Pub", "Late Night Pub", "Bar & Grill", "Cafe Bar"], emoji: "🍻" },
  { name: "Cocktail Bars", filter: ["Gastropub", "Cocktail Bar"], emoji: "🍸" },
  { name: "Live Music", filter: ["Live Music Venue", "Music Venue"], emoji: "🎸" },
];

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Bangalore Venues
            </h1>
            <p className="text-xl text-emerald-100">
              Detailed guides to the city's best pubs, breweries, bars, and restaurants.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="bg-white border-b border-stone-200 px-4 py-4 sticky top-16 z-40">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                className="px-4 py-2 bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-700 rounded-full text-sm transition-colors"
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Venue Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <Link
                  key={venue.slug}
                  href={`/venues/${venue.slug}`}
                  className="group bg-white rounded-xl p-6 border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-lg font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                        {venue.name}
                      </h2>
                      <p className="text-stone-500 text-sm">{venue.type}</p>
                    </div>
                    <span className="text-2xl">
                      {venue.type.includes("Brew") ? "🍺" : 
                       venue.type.includes("Rooftop") ? "🌆" :
                       venue.type.includes("Music") ? "🎸" :
                       venue.type.includes("Cocktail") ? "🍸" : "🍻"}
                    </span>
                  </div>
                  <p className="text-emerald-600 text-sm mb-3">📍 {venue.area}</p>
                  <div className="flex flex-wrap gap-1">
                    {venue.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-stone-100">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-3">
              Know a venue we're missing?
            </h2>
            <p className="text-stone-600 mb-4">
              We're always looking to add more great spots. Let us know your favorites.
            </p>
            <a 
              href="mailto:hello@bangalorelife.com"
              className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Suggest a Venue
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
