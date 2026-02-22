import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Koramangala Nightlife & Restaurants - Complete Guide",
  description: "Explore Koramangala, Bangalore's startup hub. Best pubs, restaurants, cafes in 5th Block and beyond. Young, affordable, and always buzzing.",
  openGraph: {
    title: "Koramangala Guide - Nightlife, Restaurants & More | BangaloreLife",
    description: "Everything about Koramangala - Bangalore's startup neighborhood with great food and nightlife.",
  },
};

const venues = {
  pubs: [
    { name: "The Bier Library", type: "Brewery", rating: "4.5", highlight: "Cozy brewery with great selection.", address: "5th Block" },
    { name: "Tipsy Bull", type: "Pub", rating: "4.3", highlight: "Affordable, always packed.", address: "5th Block" },
    { name: "Toit", type: "Brewery", rating: "4.7", highlight: "The Koramangala outpost.", address: "4th Block" },
    { name: "Plan B", type: "Bar", rating: "4.2", highlight: "Good music, young crowd.", address: "5th Block" },
  ],
  restaurants: [
    { name: "Truffles", type: "Burgers", rating: "4.7", highlight: "Legendary burgers.", address: "5th Block" },
    { name: "Meghana Foods", type: "Andhra", rating: "4.6", highlight: "Best biryani in town.", address: "Multiple" },
    { name: "Chinita", type: "Mexican", rating: "4.5", highlight: "Real Mexican flavors.", address: "5th Block" },
    { name: "Smoke House Deli", type: "Continental", rating: "4.4", highlight: "Brunch favorite.", address: "5th Block" },
    { name: "Onesta", type: "Pizza", rating: "4.5", highlight: "Unlimited pizza.", address: "5th Block" },
    { name: "Third Wave Coffee", type: "Cafe", rating: "4.5", highlight: "Perfect work spot.", address: "Multiple" },
  ],
  cafes: [
    { name: "Dyu Art Cafe", type: "Art Cafe", rating: "4.7", highlight: "Iconic Kerala-style cafe with art.", address: "5th Block" },
    { name: "Dialogues Cafe", type: "Cafe", rating: "4.4", highlight: "Social enterprise cafe.", address: "4th Block" },
    { name: "Blue Tokai", type: "Coffee", rating: "4.5", highlight: "Specialty roasters.", address: "5th Block" },
  ],
};

const highlights = [
  { icon: "🚀", label: "Startup Hub", description: "Where founders hang out" },
  { icon: "💰", label: "Budget-Friendly", description: "Great value options" },
  { icon: "🍕", label: "Food Paradise", description: "Every cuisine available" },
  { icon: "🎉", label: "Young Crowd", description: "20s-30s demographic" },
];

export default function KoramangalaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-black to-teal-900/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <Link href="/areas" className="text-zinc-500 hover:text-violet-400 text-sm">Areas</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-violet-400 text-sm">Koramangala</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              <span className="text-gradient">Koramangala</span> Guide
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
              Bangalore&apos;s startup central. Young, affordable, and packed with 
              great food. The 5th Block is where the action happens.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {highlights.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center"
                >
                  <span className="text-2xl mb-1 block">{stat.icon}</span>
                  <span className="text-lg font-light text-white">{stat.label}</span>
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
                <span className="text-zinc-500">Key Area:</span>
                <span className="text-white ml-2">5th Block (80 Feet Road)</span>
              </div>
              <div>
                <span className="text-zinc-500">Best For:</span>
                <span className="text-white ml-2">Casual dining, groups, budget nights</span>
              </div>
              <div>
                <span className="text-zinc-500">Crowd:</span>
                <span className="text-white ml-2">Students, startup folks, young professionals</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pubs & Breweries */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🍺 Pubs & Breweries</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {venues.pubs.map((venue) => (
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

        {/* Restaurants */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🍽️ Restaurants & Cafes</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Featured: Dyu Art Cafe */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-zinc-900 border border-emerald-500/20">
              <span className="text-xs px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full mb-4 inline-block">
                ⭐ Must Visit
              </span>
              <h3 className="text-2xl font-light text-white mb-4">Dyu Art Cafe</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                An iconic Bangalore institution. This Kerala-style cafe doubles as an art gallery, 
                with changing exhibitions and a bohemian vibe that&apos;s hard to find anywhere else. 
                Perfect for coffee, conversations, and creativity. The filter coffee and banana 
                fritters are legendary.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-zinc-500">📍 5th Block, Koramangala</span>
                <span className="text-zinc-500">⏰ 10 AM - 10 PM</span>
                <span className="text-violet-400">★ 4.7 rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              Koramangala Neighborhood Guide
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Koramangala is where Bangalore&apos;s startup ecosystem comes to life outside 
                of office hours. The neighborhood is divided into numbered &quot;Blocks,&quot; with 
                5th Block being the epicenter of food and nightlife action.
              </p>
              
              <h3 className="text-xl text-white mt-8 mb-4">The 5th Block Experience</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                80 Feet Road in 5th Block is packed with restaurants, cafes, and pubs. 
                Unlike Indiranagar&apos;s more upscale vibe, Koramangala is casual and 
                budget-friendly. Perfect for groups and casual hangouts.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">What Makes Koramangala Special</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li><strong className="text-white">Startup culture:</strong> Many tech founders and employees live here</li>
                <li><strong className="text-white">Food variety:</strong> From Meghana&apos;s biryani to Truffles&apos; burgers</li>
                <li><strong className="text-white">Affordable:</strong> Generally cheaper than Indiranagar</li>
                <li><strong className="text-white">Young energy:</strong> College students and young professionals</li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Getting There</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                No metro access yet (coming soon). Best reached by Uber/Ola. 
                Traffic can be heavy during peak hours. Once there, most of 5th Block 
                is walkable.
              </p>
            </div>
          </div>
        </section>

        {/* Other Areas */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-extralight text-white mb-8 text-center">
              Explore Other Areas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/areas/indiranagar" className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-all text-center">
                <span className="text-white font-light">Indiranagar</span>
                <span className="text-xs text-zinc-500 block">Nightlife hub</span>
              </Link>
              <Link href="/areas/mg-road" className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-all text-center">
                <span className="text-white font-light">MG Road</span>
                <span className="text-xs text-zinc-500 block">Classic vibes</span>
              </Link>
              <Link href="/areas/whitefield" className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-all text-center">
                <span className="text-white font-light">Whitefield</span>
                <span className="text-xs text-zinc-500 block">IT hub scene</span>
              </Link>
              <Link href="/areas/hsr-layout" className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-all text-center">
                <span className="text-white font-light">HSR Layout</span>
                <span className="text-xs text-zinc-500 block">Residential gem</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
