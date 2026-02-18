import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HSR Layout Guide - Cafes, Restaurants & Growing Nightlife",
  description: "Explore HSR Layout, Bangalore's upcoming neighborhood. Great cafes, restaurants, and a growing nightlife scene near Electronic City.",
  openGraph: {
    title: "HSR Layout Guide | BangaloreLife",
    description: "HSR Layout - young professionals, great cafes, and growing nightlife.",
  },
};

const venues = [
  { name: "Third Wave Coffee", type: "Cafe", rating: "4.5", highlight: "Multiple outlets, work-friendly" },
  { name: "Blue Tokai", type: "Coffee", rating: "4.6", highlight: "Specialty roasters" },
  { name: "Glen's Bakehouse", type: "Bakery", rating: "4.5", highlight: "Amazing desserts" },
  { name: "Social", type: "Pub", rating: "4.3", highlight: "Casual pub vibes" },
  { name: "Truffles", type: "Burgers", rating: "4.7", highlight: "Best burgers" },
  { name: "Meghana Foods", type: "Andhra", rating: "4.6", highlight: "Biryani heaven" },
];

export default function HSRLayoutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-black to-rose-900/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <Link href="/areas" className="text-zinc-500 hover:text-violet-400 text-sm">Areas</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-pink-400 text-sm">HSR Layout</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              <span className="text-gradient">HSR Layout</span> Guide
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
              A growing neighborhood popular with young professionals. 
              Great cafes, solid food options, and close to Electronic City.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-pink-500/10 border border-pink-500/30 text-pink-300 rounded-full text-sm">
                🏠 Residential
              </span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                ☕ Great Cafes
              </span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                📈 Upcoming
              </span>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">Popular Spots</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venues.map((venue) => (
                <div
                  key={venue.name}
                  className="group p-6 rounded-xl bg-black border border-zinc-800 hover:border-pink-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2 py-1 bg-pink-500/10 text-pink-300 rounded">
                      {venue.type}
                    </span>
                    <span className="text-sm text-amber-400">★ {venue.rating}</span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-pink-300 transition-colors mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-zinc-400">{venue.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extralight text-white mb-8">About HSR Layout</h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 leading-relaxed mb-6">
                HSR Layout is one of Bangalore&apos;s newer residential areas that&apos;s 
                quickly becoming popular with young professionals working in the 
                Electronic City tech corridor. The neighborhood has excellent cafes 
                and a growing food scene.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                While it doesn&apos;t have the nightlife of Indiranagar or Koramangala, 
                HSR offers a more relaxed vibe with quality food options and 
                work-friendly cafes. It&apos;s a great place to live for those who 
                want to avoid the central Bangalore crowds.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
