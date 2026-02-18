import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nightlife in Bangalore - Best Pubs, Clubs & Bars",
  description: "Discover Bangalore's best nightlife spots. Pubs in Indiranagar, rooftop bars, nightclubs, breweries, and live music venues. Your complete guide to partying in Bangalore.",
  openGraph: {
    title: "Bangalore Nightlife Guide - Pubs, Clubs & Bars | BangaloreLife",
    description: "Find the best pubs, clubs, and bars in Bangalore. From Indiranagar's 12th Main to MG Road's iconic venues.",
  },
};

const nightlifeTypes = [
  { name: "Pubs & Bars", href: "/nightlife/pubs", icon: "🍺", count: "150+" },
  { name: "Rooftop Bars", href: "/nightlife/rooftop-bars", icon: "🌃", count: "25+" },
  { name: "Nightclubs", href: "/nightlife/clubs", icon: "💃", count: "30+" },
  { name: "Live Music", href: "/nightlife/live-music", icon: "🎸", count: "40+" },
  { name: "Breweries", href: "/breweries", icon: "🍻", count: "50+" },
  { name: "Speakeasies", href: "/nightlife/speakeasies", icon: "🥃", count: "15+" },
];

const topVenues = [
  {
    name: "Toit Brewpub",
    type: "Brewery",
    area: "Indiranagar",
    description: "Bangalore's most iconic brewery. Always packed, always good vibes.",
    rating: "4.8",
    priceRange: "₹₹₹",
    image: "/venues/toit.jpg",
  },
  {
    name: "Skyye",
    type: "Rooftop Bar",
    area: "UB City, MG Road",
    description: "16th floor views of the city skyline. Premium cocktails and crowd.",
    rating: "4.7",
    priceRange: "₹₹₹₹",
    image: "/venues/skyye.jpg",
  },
  {
    name: "Arbor Brewing Company",
    type: "Brewery",
    area: "Magrath Road",
    description: "American craft beer pioneer. Great IPAs and pub food.",
    rating: "4.6",
    priceRange: "₹₹₹",
    image: "/venues/arbor.jpg",
  },
  {
    name: "13th Floor",
    type: "Rooftop Bar",
    area: "Barton Centre, MG Road",
    description: "Classic rooftop experience with panoramic views.",
    rating: "4.5",
    priceRange: "₹₹₹",
    image: "/venues/13th-floor.jpg",
  },
  {
    name: "Loft 38",
    type: "Club/Lounge",
    area: "Indiranagar",
    description: "Sleek lounge with great music and cocktails.",
    rating: "4.4",
    priceRange: "₹₹₹",
    image: "/venues/loft38.jpg",
  },
  {
    name: "Pecos",
    type: "Pub",
    area: "Brigade Road",
    description: "Legendary rock bar. A Bangalore institution since 1989.",
    rating: "4.5",
    priceRange: "₹₹",
    image: "/venues/pecos.jpg",
  },
];

const areaGuides = [
  {
    name: "Indiranagar",
    slug: "indiranagar",
    tagline: "The 12th Main strip",
    description: "Bangalore's nightlife epicenter. Packed with breweries, pubs, and clubs.",
    venueCount: "50+",
  },
  {
    name: "Koramangala",
    slug: "koramangala",
    tagline: "Young & affordable",
    description: "Startup crowd hangout. Great for groups and casual nights out.",
    venueCount: "40+",
  },
  {
    name: "MG Road",
    slug: "mg-road",
    tagline: "Classic Bangalore",
    description: "The original party district. Upscale bars and rooftop lounges.",
    venueCount: "35+",
  },
  {
    name: "Church Street",
    slug: "church-street",
    tagline: "Central & accessible",
    description: "Connected to MG Road. Mix of budget and premium options.",
    venueCount: "25+",
  },
];

export default function NightlifePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-purple-900/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-violet-400 text-sm">Nightlife</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Bangalore <span className="text-gradient">Nightlife</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              India&apos;s pub capital. From craft breweries to rooftop bars, 
              discover why Bangalore has the best nightlife scene in the country.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {nightlifeTypes.map((type) => (
                <Link
                  key={type.href}
                  href={type.href}
                  className="group p-4 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/50 transition-all text-center"
                >
                  <span className="text-2xl mb-2 block">{type.icon}</span>
                  <span className="text-white font-light group-hover:text-violet-300 transition-colors block text-sm">
                    {type.name}
                  </span>
                  <span className="text-xs text-zinc-500">{type.count} venues</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Top Venues */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl font-extralight text-white">Top Rated Venues</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topVenues.map((venue) => (
                <div
                  key={venue.name}
                  className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 overflow-hidden transition-all card-hover"
                >
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-violet-900/20 to-zinc-900 flex items-center justify-center">
                    <span className="text-5xl opacity-30">🍸</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs px-2 py-1 bg-violet-500/10 text-violet-300 rounded">
                        {venue.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-sm">★</span>
                        <span className="text-zinc-400 text-sm">{venue.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-light text-white group-hover:text-violet-300 transition-colors mb-1">
                      {venue.name}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-3">{venue.area}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      {venue.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">{venue.priceRange}</span>
                      <span className="text-violet-400 text-sm group-hover:text-violet-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Area Guides */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-extralight text-white mb-4">Explore by Area</h2>
              <p className="text-zinc-500">Each neighborhood has its own vibe</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {areaGuides.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="group p-8 rounded-2xl bg-black border border-zinc-800 hover:border-violet-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-light text-white group-hover:text-violet-300 transition-colors">
                        {area.name}
                      </h3>
                      <span className="text-sm text-violet-400">{area.tagline}</span>
                    </div>
                    <span className="text-xs text-zinc-500">{area.venueCount} venues</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {area.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              Bangalore Nightlife Guide
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Bangalore, often called the &quot;Pub Capital of India,&quot; boasts the country&apos;s 
                most vibrant nightlife scene. With over 50 microbreweries and hundreds of 
                pubs, bars, and clubs, the city offers something for everyone.
              </p>
              
              <h3 className="text-xl text-white mt-8 mb-4">Best Areas for Nightlife</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                <strong className="text-white">Indiranagar&apos;s 12th Main</strong> is the heart of 
                Bangalore&apos;s nightlife, home to legendary spots like Toit and 612 East. 
                <strong className="text-white"> MG Road and Brigade Road</strong> offer a more 
                classic experience with rooftop bars and iconic pubs like Pecos. 
                <strong className="text-white"> Koramangala</strong> is where the startup crowd 
                hangs out, with affordable options and a young vibe.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Bangalore&apos;s Craft Beer Scene</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Bangalore has more microbreweries than any other Indian city. Toit was one 
                of the pioneers, and since then, dozens of breweries have opened across the 
                city. Popular spots include Windmills Craftworks in Whitefield, Arbor Brewing 
                Company, and The Bier Library.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Timings & Tips</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li>Most bars close by 11:30 PM on weekdays, 1 AM on weekends</li>
                <li>Legal drinking age is 21 in Karnataka</li>
                <li>Weekends are packed — arrive early or make reservations</li>
                <li>Indiranagar gets very crowded on Fridays and Saturdays</li>
                <li>Uber and Ola are the best ways to get around at night</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
