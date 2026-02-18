import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Indiranagar Nightlife & Restaurants - Complete Guide",
  description: "Explore Indiranagar, Bangalore's nightlife hub. Best pubs, breweries, restaurants, and cafes on 12th Main and beyond. The definitive Indiranagar guide.",
  openGraph: {
    title: "Indiranagar Guide - Nightlife, Restaurants & More | BangaloreLife",
    description: "Everything you need to know about Indiranagar - Bangalore's trendiest neighborhood.",
  },
};

const venues = {
  breweries: [
    { name: "Toit Brewpub", type: "Brewery", rating: "4.8", highlight: "The OG. Always packed.", address: "100 Feet Road" },
    { name: "612 East", type: "Brewery", rating: "4.5", highlight: "Great rooftop space.", address: "12th Main" },
    { name: "The Permit Room", type: "Bar", rating: "4.4", highlight: "South Indian bar food.", address: "12th Main" },
  ],
  restaurants: [
    { name: "Truffles", type: "Burgers", rating: "4.7", highlight: "Best burgers in Bangalore.", address: "12th Main" },
    { name: "Toscano", type: "Italian", rating: "4.5", highlight: "Upscale Italian dining.", address: "100 Feet Road" },
    { name: "Fatty Bao", type: "Asian", rating: "4.6", highlight: "Pan-Asian excellence.", address: "12th Main" },
    { name: "Caperberry", type: "French", rating: "4.5", highlight: "Fine French cuisine.", address: "12th Main" },
  ],
  cafes: [
    { name: "Third Wave Coffee", type: "Coffee", rating: "4.5", highlight: "Great cold brew.", address: "Multiple" },
    { name: "Glen's Bakehouse", type: "Bakery", rating: "4.6", highlight: "Amazing desserts.", address: "12th Main" },
    { name: "Matteo Coffea", type: "Cafe", rating: "4.4", highlight: "Cozy work spot.", address: "12th Main" },
  ],
  bars: [
    { name: "Loft 38", type: "Lounge", rating: "4.4", highlight: "Sleek cocktail bar.", address: "CMH Road" },
    { name: "Koppen", type: "Cocktail Bar", rating: "4.3", highlight: "Innovative drinks.", address: "12th Main" },
    { name: "Bob's Bar", type: "Casual Pub", rating: "4.2", highlight: "Budget-friendly.", address: "CMH Road" },
  ],
};

const highlights = [
  { icon: "🍺", label: "50+", description: "Pubs & Breweries" },
  { icon: "🍽️", label: "100+", description: "Restaurants" },
  { icon: "☕", label: "30+", description: "Cafes" },
  { icon: "🎸", label: "10+", description: "Live Music Venues" },
];

export default function IndiranagarPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-black to-purple-900/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <Link href="/areas" className="text-zinc-500 hover:text-violet-400 text-sm">Areas</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-violet-400 text-sm">Indiranagar</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              <span className="text-gradient">Indiranagar</span> Guide
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
              Bangalore&apos;s nightlife epicenter. Home to the legendary 12th Main strip, 
              the best breweries, and the city&apos;s trendiest crowd.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {highlights.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center"
                >
                  <span className="text-2xl mb-1 block">{stat.icon}</span>
                  <span className="text-2xl font-light text-white">{stat.label}</span>
                  <span className="text-xs text-zinc-500 block">{stat.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Info */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div>
                <span className="text-zinc-500">Metro:</span>
                <span className="text-white ml-2">Indiranagar Metro Station (Purple Line)</span>
              </div>
              <div>
                <span className="text-zinc-500">Best Time:</span>
                <span className="text-white ml-2">Evenings & weekends</span>
              </div>
              <div>
                <span className="text-zinc-500">Vibe:</span>
                <span className="text-white ml-2">Trendy, hip, always buzzing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breweries */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🍺 Breweries & Pubs</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            
            <div className="mt-6 text-center">
              <Link href="/breweries" className="text-violet-400 hover:text-violet-300 text-sm">
                View all Indiranagar breweries →
              </Link>
            </div>
          </div>
        </section>

        {/* Restaurants */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🍽️ Restaurants</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {venues.restaurants.map((venue) => (
                <div
                  key={venue.name}
                  className="group p-6 rounded-xl bg-black border border-zinc-800 hover:border-rose-500/30 transition-all"
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
                  <p className="text-sm text-zinc-400">{venue.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cafes */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">☕ Cafes</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {venues.cafes.map((venue) => (
                <div
                  key={venue.name}
                  className="group p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded">
                      {venue.type}
                    </span>
                    <span className="text-sm text-amber-400">★ {venue.rating}</span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-emerald-300 transition-colors mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-zinc-400">{venue.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bars & Lounges */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🍸 Bars & Lounges</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {venues.bars.map((venue) => (
                <div
                  key={venue.name}
                  className="group p-6 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2 py-1 bg-violet-500/10 text-violet-300 rounded">
                      {venue.type}
                    </span>
                    <span className="text-sm text-amber-400">★ {venue.rating}</span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-violet-300 transition-colors mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-zinc-400">{venue.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              Indiranagar Neighborhood Guide
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Indiranagar is the undisputed nightlife capital of Bangalore. What started as a 
                residential neighborhood has transformed into the city&apos;s most vibrant 
                entertainment district, centered around the famous 12th Main Road.
              </p>
              
              <h3 className="text-xl text-white mt-8 mb-4">The 12th Main Strip</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Walk down 12th Main on any evening and you&apos;ll find some of Bangalore&apos;s 
                best venues packed side by side. From Toit&apos;s legendary craft beers to 
                Truffles&apos; famous burgers, Glen&apos;s Bakehouse desserts to Fatty Bao&apos;s 
                Asian fusion — it&apos;s all here within walking distance.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Best Times to Visit</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li><strong className="text-white">Weekday evenings (6-9 PM):</strong> Less crowded, easier to get tables</li>
                <li><strong className="text-white">Friday/Saturday nights:</strong> Peak energy but very crowded</li>
                <li><strong className="text-white">Sunday afternoons:</strong> Perfect for brewery hopping</li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Pro Tips</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li>Make reservations for popular places, especially weekends</li>
                <li>Parking is challenging — take an Uber/Ola or the metro</li>
                <li>Start early (7 PM) if you want to bar-hop multiple venues</li>
                <li>100 Feet Road has more upscale options; 12th Main is more casual</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Other Areas */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-extralight text-white mb-8 text-center">
              Explore Other Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/areas/koramangala" className="p-6 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/30 transition-all text-center">
                <span className="text-white font-light">Koramangala</span>
                <span className="text-xs text-zinc-500 block">Young & affordable</span>
              </Link>
              <Link href="/areas/mg-road" className="p-6 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/30 transition-all text-center">
                <span className="text-white font-light">MG Road</span>
                <span className="text-xs text-zinc-500 block">Classic vibes</span>
              </Link>
              <Link href="/areas/whitefield" className="p-6 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/30 transition-all text-center">
                <span className="text-white font-light">Whitefield</span>
                <span className="text-xs text-zinc-500 block">IT hub scene</span>
              </Link>
              <Link href="/areas/church-street" className="p-6 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/30 transition-all text-center">
                <span className="text-white font-light">Church Street</span>
                <span className="text-xs text-zinc-500 block">Central location</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
