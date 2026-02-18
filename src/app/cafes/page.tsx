import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Cafes in Bangalore - Coffee, Work Spots & Cozy Corners",
  description: "Discover Bangalore's best cafes. From specialty coffee roasters to coworking-friendly spots. The complete guide to Bangalore's cafe culture.",
  openGraph: {
    title: "Best Cafes in Bangalore | BangaloreLife",
    description: "Explore Bangalore's thriving cafe scene - coffee, ambiance, and great vibes.",
  },
};

const categories = [
  { name: "All Cafes", href: "/cafes", active: true },
  { name: "Work-Friendly", href: "/cafes/work", active: false },
  { name: "Specialty Coffee", href: "/cafes/specialty", active: false },
  { name: "Aesthetic", href: "/cafes/aesthetic", active: false },
  { name: "Pet-Friendly", href: "/cafes/pet-friendly", active: false },
];

const featured = [
  {
    name: "Third Wave Coffee Roasters",
    type: "Specialty Coffee",
    area: "Multiple Locations",
    rating: "4.5",
    highlight: "Bangalore's biggest specialty coffee chain. Great cold brew and work-friendly.",
    workFriendly: true,
    wifi: "Excellent",
    mustTry: "Cold Brew, Pour Over",
  },
  {
    name: "Dyu Art Cafe",
    type: "Art Cafe",
    area: "Koramangala 5th Block",
    rating: "4.7",
    highlight: "Iconic Kerala-style cafe with rotating art exhibitions. The vibe is unmatched.",
    workFriendly: false,
    wifi: "Limited",
    mustTry: "Filter Coffee, Banana Fritters",
  },
  {
    name: "Blue Tokai Coffee",
    type: "Specialty Coffee",
    area: "Multiple Locations",
    rating: "4.6",
    highlight: "Farm-to-cup specialty roasters. Some of the best beans in India.",
    workFriendly: true,
    wifi: "Good",
    mustTry: "Single Origin Pour Over, Espresso",
  },
  {
    name: "Lavonne Cafe",
    type: "Patisserie",
    area: "St. Mark's Road",
    rating: "4.7",
    highlight: "French-trained pastry chefs. Best croissants and pastries in the city.",
    workFriendly: false,
    wifi: "None",
    mustTry: "Croissants, Macarons, Coffee",
  },
  {
    name: "Matteo Coffea",
    type: "Cozy Cafe",
    area: "Indiranagar, Church Street",
    rating: "4.4",
    highlight: "Intimate, cozy vibes. Great for conversations and light work.",
    workFriendly: true,
    wifi: "Good",
    mustTry: "Flat White, Cheesecake",
  },
  {
    name: "Brahmin's Coffee Bar",
    type: "Traditional",
    area: "Basavanagudi",
    rating: "4.5",
    highlight: "No-frills traditional spot since 1965. Standing-only, cash-only authenticity.",
    workFriendly: false,
    wifi: "None",
    mustTry: "Filter Coffee, Idli-Vada",
  },
  {
    name: "Araku Coffee",
    type: "Specialty Coffee",
    area: "Multiple Locations",
    rating: "4.5",
    highlight: "Award-winning beans from the Araku Valley. Unique Indian specialty coffee.",
    workFriendly: true,
    wifi: "Good",
    mustTry: "Grand Reserve, Cold Brew",
  },
  {
    name: "The Hole in the Wall Cafe",
    type: "Brunch Spot",
    area: "Koramangala",
    rating: "4.4",
    highlight: "All-day breakfast and brunch. Good for groups.",
    workFriendly: false,
    wifi: "Limited",
    mustTry: "Eggs Benedict, Pancakes",
  },
];

const workSpots = [
  { name: "Third Wave Coffee", locations: "15+", outlets: "Indiranagar, Koramangala, HSR, Whitefield" },
  { name: "Blue Tokai", locations: "8+", outlets: "Indiranagar, JP Nagar, Church Street" },
  { name: "Starbucks", locations: "20+", outlets: "All major malls and areas" },
  { name: "Araku Coffee", locations: "5+", outlets: "Indiranagar, Koramangala, MG Road" },
];

export default function CafesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-teal-900/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-emerald-400 text-sm">Cafes</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Best <span className="text-gradient">Cafes</span> in Bangalore
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              From traditional filter coffee to specialty roasters. 
              Bangalore&apos;s cafe culture is thriving.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    cat.active
                      ? 'bg-emerald-500 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Cafes */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl font-extralight text-white">Top Cafes</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((cafe) => (
                <div
                  key={cafe.name}
                  className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 overflow-hidden transition-all"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded">
                          {cafe.type}
                        </span>
                        {cafe.workFriendly && (
                          <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 rounded">
                            💻 Work-Friendly
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-amber-400">★ {cafe.rating}</span>
                    </div>
                    
                    <h3 className="text-xl font-light text-white group-hover:text-emerald-300 transition-colors mb-1">
                      {cafe.name}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-3">{cafe.area}</p>
                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                      {cafe.highlight}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-zinc-500">Must Try:</span>
                        <span className="text-white ml-2">{cafe.mustTry}</span>
                      </div>
                      {cafe.wifi !== "None" && (
                        <div>
                          <span className="text-zinc-500">WiFi:</span>
                          <span className="text-emerald-300 ml-2">{cafe.wifi}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work-Friendly Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-extralight text-white mb-4">💻 Best Cafes for Working</h2>
              <p className="text-zinc-500">Good WiFi, power outlets, and laptop-friendly vibes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {workSpots.map((spot) => (
                <div
                  key={spot.name}
                  className="p-6 rounded-xl bg-black border border-zinc-800"
                >
                  <h3 className="text-lg font-light text-white mb-2">{spot.name}</h3>
                  <p className="text-sm text-emerald-400 mb-1">{spot.locations} locations</p>
                  <p className="text-xs text-zinc-500">{spot.outlets}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Coffee Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-900/20 to-zinc-900 border border-amber-500/20">
              <span className="text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full mb-4 inline-block">
                ☕ Local Tradition
              </span>
              <h3 className="text-2xl font-light text-white mb-4">The Filter Coffee Experience</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                No visit to Bangalore is complete without experiencing traditional South Indian 
                filter coffee. Served in a steel tumbler with a dabarah (saucer), it&apos;s 
                brewed strong with chicory and served with fresh milk. The ritual of pouring 
                between tumbler and dabarah to cool it is part of the experience.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="p-3 bg-zinc-900/50 rounded-lg">
                  <span className="text-amber-300 block font-light">Brahmin&apos;s Coffee Bar</span>
                  <span className="text-xs text-zinc-500">Basavanagudi - Since 1965</span>
                </div>
                <div className="p-3 bg-zinc-900/50 rounded-lg">
                  <span className="text-amber-300 block font-light">CTR (Central Tiffin Room)</span>
                  <span className="text-xs text-zinc-500">Malleswaram - Since 1920</span>
                </div>
                <div className="p-3 bg-zinc-900/50 rounded-lg">
                  <span className="text-amber-300 block font-light">Any Darshini</span>
                  <span className="text-xs text-zinc-500">₹15-20 for authentic filter coffee</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              Bangalore Cafe Guide
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Bangalore&apos;s cafe culture has exploded in recent years. From traditional 
                filter coffee joints to third-wave specialty roasters, the city caters to 
                every coffee preference.
              </p>
              
              <h3 className="text-xl text-white mt-8 mb-4">Specialty Coffee Movement</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Third Wave Coffee Roasters started the specialty coffee revolution in 
                Bangalore. Now you&apos;ll find Blue Tokai, Araku, and many indie roasters 
                offering single-origin beans and careful brewing methods.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Best Areas for Cafe Hopping</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li><strong className="text-white">Indiranagar:</strong> Third Wave, Matteo, and more</li>
                <li><strong className="text-white">Koramangala:</strong> Dyu Art Cafe, Blue Tokai, Third Wave</li>
                <li><strong className="text-white">Church Street:</strong> Matteo, indie cafes</li>
                <li><strong className="text-white">Basavanagudi:</strong> Traditional filter coffee spots</li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Cafe Etiquette for Remote Workers</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li>Order something every 1-2 hours if staying long</li>
                <li>Avoid peak lunch hours (12-2 PM) for laptop work</li>
                <li>Ask before taking video calls</li>
                <li>Third Wave and Blue Tokai are most work-friendly</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
