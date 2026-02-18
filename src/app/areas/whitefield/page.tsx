import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Whitefield Nightlife & Restaurants - Bangalore's IT Hub Scene",
  description: "Explore Whitefield, Bangalore's IT hub. Premium breweries, modern restaurants, and nightlife for the tech crowd. Near ITPL and tech parks.",
  openGraph: {
    title: "Whitefield Guide - IT Hub Nightlife | BangaloreLife",
    description: "Everything about Whitefield - breweries, restaurants, and nightlife for Bangalore's tech crowd.",
  },
};

const venues = {
  breweries: [
    { name: "Windmills Craftworks", type: "Brewery", rating: "4.7", highlight: "Jazz nights, library corner, refined vibes.", address: "Near ITPL" },
    { name: "Red Rhino", type: "Brewery", rating: "4.3", highlight: "Modern space, creative brews.", address: "Whitefield Main Road" },
    { name: "Ironhill", type: "Brewery", rating: "4.4", highlight: "Large venue, good for groups.", address: "Marathahalli" },
    { name: "Byg Brewski", type: "Brewery", rating: "4.3", highlight: "Rooftop with outdoor seating.", address: "ITPL Main Road" },
  ],
  restaurants: [
    { name: "Smoke House Deli", type: "Continental", rating: "4.4", highlight: "Brunch favorite, artisan food.", address: "Phoenix Marketcity" },
    { name: "Barbeque Nation", type: "BBQ", rating: "4.3", highlight: "Unlimited BBQ buffet.", address: "Multiple" },
    { name: "Mainland China", type: "Chinese", rating: "4.4", highlight: "Premium Chinese dining.", address: "Phoenix Marketcity" },
    { name: "AB's - Absolute Barbecues", type: "BBQ", rating: "4.5", highlight: "Live grills at your table.", address: "Whitefield" },
  ],
  cafes: [
    { name: "Third Wave Coffee", type: "Cafe", rating: "4.5", highlight: "Work-friendly, great cold brew.", address: "Multiple in Whitefield" },
    { name: "Starbucks", type: "Cafe", rating: "4.3", highlight: "Reliable, familiar vibes.", address: "Phoenix Marketcity" },
    { name: "Cafe Coffee Day", type: "Cafe", rating: "4.0", highlight: "Quick coffee fix.", address: "Tech parks" },
  ],
};

const techParks = [
  "ITPL (International Tech Park)",
  "Prestige Tech Park",
  "RMZ Ecospace",
  "Embassy Tech Village",
  "Manyata Tech Park (nearby)",
];

export default function WhitefieldPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-black to-blue-900/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <Link href="/areas" className="text-zinc-500 hover:text-violet-400 text-sm">Areas</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-cyan-400 text-sm">Whitefield</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              <span className="text-gradient">Whitefield</span> Guide
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
              Bangalore&apos;s IT hub. Premium breweries, modern restaurants, 
              and after-work hangouts for the tech crowd.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full text-sm">
                🏢 IT Hub
              </span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                🍺 Premium Breweries
              </span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                🛒 Phoenix Marketcity
              </span>
            </div>
          </div>
        </section>

        {/* Quick Info */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div>
                <span className="text-zinc-500">Metro:</span>
                <span className="text-white ml-2">Whitefield Metro (Purple Line - extended)</span>
              </div>
              <div>
                <span className="text-zinc-500">Crowd:</span>
                <span className="text-white ml-2">IT professionals, expats, young professionals</span>
              </div>
              <div>
                <span className="text-zinc-500">Peak Time:</span>
                <span className="text-white ml-2">Post-work (6 PM onwards)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breweries */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🍺 Breweries</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {venues.breweries.map((venue) => (
                <div
                  key={venue.name}
                  className="group p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-300 rounded">
                      {venue.type}
                    </span>
                    <span className="text-sm text-amber-400">★ {venue.rating}</span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-amber-300 transition-colors mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-2">{venue.address}</p>
                  <p className="text-sm text-zinc-400">{venue.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured: Windmills */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-zinc-900 border border-cyan-500/20">
              <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full mb-4 inline-block">
                ⭐ Must Visit
              </span>
              <h3 className="text-2xl font-light text-white mb-4">Windmills Craftworks</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                The most refined brewery experience in Bangalore. Beautiful interiors with 
                a library corner, regular jazz performances, and consistently excellent beers. 
                Perfect for dates, after-work drinks, or a relaxed Sunday afternoon.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-zinc-500">📍 Near ITPL, Whitefield</span>
                <span className="text-zinc-500">🎵 Live jazz on weekends</span>
                <span className="text-cyan-400">★ 4.7 rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Restaurants */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🍽️ Restaurants</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {venues.restaurants.map((venue) => (
                <div
                  key={venue.name}
                  className="group p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-rose-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2 py-1 bg-rose-500/10 text-rose-300 rounded">
                      {venue.type}
                    </span>
                    <span className="text-sm text-amber-400">★ {venue.rating}</span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-rose-300 transition-colors mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-2">{venue.address}</p>
                  <p className="text-sm text-zinc-400">{venue.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Parks */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-extralight text-white mb-6">🏢 Nearby Tech Parks</h2>
            <div className="flex flex-wrap gap-3">
              {techParks.map((park) => (
                <span
                  key={park}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-full text-sm"
                >
                  {park}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              Whitefield Area Guide
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Whitefield has transformed from a quiet suburb to Bangalore&apos;s second 
                major tech hub. With ITPL and numerous tech parks, it&apos;s home to 
                thousands of IT professionals who&apos;ve created demand for quality 
                dining and nightlife options.
              </p>
              
              <h3 className="text-xl text-white mt-8 mb-4">Why Whitefield?</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                For those working or living in East Bangalore, Whitefield offers 
                excellent options without the commute to Indiranagar or Koramangala. 
                The breweries here tend to be more spacious and less crowded than 
                their central Bangalore counterparts.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Getting There</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                The Purple Line metro extension now reaches Whitefield. By road, 
                expect heavy traffic during peak hours. The area is best explored 
                on weekday evenings or weekends. Phoenix Marketcity is a good 
                central point for parking and walking.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
