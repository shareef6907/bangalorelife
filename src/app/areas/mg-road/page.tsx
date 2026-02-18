import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MG Road Nightlife & Restaurants - Bangalore's Classic Party District",
  description: "Explore MG Road, Bangalore's iconic party district. Rooftop bars, upscale lounges, Brigade Road, Church Street, and the best nightlife in central Bangalore.",
  openGraph: {
    title: "MG Road Guide - Classic Bangalore Nightlife | BangaloreLife",
    description: "Everything about MG Road - rooftop bars, shopping, and central Bangalore's best spots.",
  },
};

const venues = {
  rooftops: [
    { name: "Skyye", type: "Rooftop Bar", rating: "4.7", highlight: "16th floor UB City views. THE rooftop.", address: "UB City" },
    { name: "13th Floor", type: "Rooftop Bar", rating: "4.5", highlight: "Classic rooftop experience.", address: "Barton Centre" },
    { name: "High Ultra Lounge", type: "Rooftop", rating: "4.4", highlight: "World Trade Center views.", address: "WTC" },
    { name: "Ebony", type: "Restaurant & Bar", rating: "4.5", highlight: "Fine dining with views.", address: "Barton Centre" },
  ],
  bars: [
    { name: "Pecos", type: "Rock Pub", rating: "4.5", highlight: "Legendary since 1989. Rock music.", address: "Brigade Road" },
    { name: "Guzzlers", type: "Pub", rating: "4.2", highlight: "Budget friendly, student crowd.", address: "MG Road" },
    { name: "7 Rivers Brewing Co", type: "Brewery", rating: "4.5", highlight: "Premium craft beer at Taj.", address: "Taj MG Road" },
    { name: "The Biere Club", type: "Brewery", rating: "4.4", highlight: "Central location, good beers.", address: "Lavelle Road" },
  ],
  restaurants: [
    { name: "Karavalli", type: "Coastal", rating: "4.8", highlight: "Legendary coastal cuisine at Taj.", address: "Taj Gateway" },
    { name: "Only Place", type: "Steakhouse", rating: "4.4", highlight: "Old-school steaks.", address: "Museum Road" },
    { name: "Koshy's", type: "Heritage", rating: "4.3", highlight: "Historic cafe since 1940.", address: "St. Mark's Road" },
    { name: "Lavonne", type: "Patisserie", rating: "4.7", highlight: "Best croissants in town.", address: "St. Mark's Road" },
  ],
};

const areas = [
  { name: "MG Road", description: "Main strip with UB City and metro access" },
  { name: "Brigade Road", description: "Shopping + Pecos + street food" },
  { name: "Church Street", description: "Boutiques, cafes, restaurants" },
  { name: "Lavelle Road", description: "Upscale dining and lounges" },
  { name: "St. Mark's Road", description: "Koshy's, Lavonne, heritage vibes" },
];

export default function MGRoadPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-indigo-900/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <Link href="/areas" className="text-zinc-500 hover:text-violet-400 text-sm">Areas</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-blue-400 text-sm">MG Road</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              <span className="text-gradient">MG Road</span> & Central
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
              Bangalore&apos;s original party district. Iconic rooftop bars, 
              heritage restaurants, and the connected strips of Brigade Road 
              and Church Street.
            </p>

            {/* Sub-areas */}
            <div className="flex flex-wrap gap-3">
              {areas.map((area) => (
                <div
                  key={area.name}
                  className="px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-sm"
                >
                  <span className="text-white">{area.name}</span>
                  <span className="text-zinc-500 ml-2 hidden sm:inline">· {area.description}</span>
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
                <span className="text-white ml-2">MG Road Station (Purple Line)</span>
              </div>
              <div>
                <span className="text-zinc-500">Vibe:</span>
                <span className="text-white ml-2">Classic, upscale, mixed crowd</span>
              </div>
              <div>
                <span className="text-zinc-500">Best For:</span>
                <span className="text-white ml-2">Rooftop bars, special occasions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Rooftop Bars */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🌃 Rooftop Bars</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {venues.rooftops.map((venue) => (
                <div
                  key={venue.name}
                  className="group p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 rounded">
                      {venue.type}
                    </span>
                    <span className="text-sm text-amber-400">★ {venue.rating}</span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-blue-300 transition-colors mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-2">{venue.address}</p>
                  <p className="text-sm text-zinc-400">{venue.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pubs & Bars */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🍺 Pubs & Breweries</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {venues.bars.map((venue) => (
                <div
                  key={venue.name}
                  className="group p-6 rounded-xl bg-black border border-zinc-800 hover:border-amber-500/30 transition-all"
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

        {/* SEO Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              MG Road Area Guide
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                MG Road (Mahatma Gandhi Road) is Bangalore&apos;s most iconic address. 
                Once the city&apos;s main commercial hub, it&apos;s now the center of 
                upscale nightlife, shopping, and dining.
              </p>
              
              <h3 className="text-xl text-white mt-8 mb-4">The Connected Streets</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                MG Road connects to several important streets: <strong className="text-white">Brigade Road</strong> 
                for shopping and the legendary Pecos pub, <strong className="text-white">Church Street</strong> 
                for boutiques and cafes, <strong className="text-white">Lavelle Road</strong> for upscale 
                dining, and <strong className="text-white">St. Mark&apos;s Road</strong> for heritage spots like Koshy&apos;s.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Best of MG Road</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li><strong className="text-white">Rooftop experience:</strong> Skyye at UB City for 16th floor views</li>
                <li><strong className="text-white">Rock music:</strong> Pecos on Brigade Road since 1989</li>
                <li><strong className="text-white">Fine dining:</strong> Karavalli at Taj for coastal cuisine</li>
                <li><strong className="text-white">Heritage cafe:</strong> Koshy&apos;s on St. Mark&apos;s Road</li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Getting There</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                MG Road Metro Station (Purple Line) is perfectly located. Once here, 
                everything is walkable. Parking is challenging - metro or Uber is recommended.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
