import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Koramangala — Bangalore's Nightlife & Startup Hub",
  description: "Discover the best pubs, breweries, restaurants, and things to do in Koramangala. Home to Toit, The Bier Library, and Bangalore's most vibrant nightlife scene.",
  keywords: "koramangala nightlife, koramangala pubs, koramangala bars, toit koramangala, bier library, koramangala restaurants, koramangala bangalore",
};

const venues = [
  { name: "Toit Brewpub", type: "Brewery", rating: 4.4, slug: "toit-brewpub" },
  { name: "The Bier Library", type: "Craft Beer Bar", rating: 4.3, slug: "the-bier-library" },
  { name: "Koramangala Social", type: "Cafe-Bar", rating: 4.1, slug: "koramangala-social" },
  { name: "Hammered", type: "Late Night Pub", rating: 4.0, slug: "hammered" },
  { name: "Fandom at Gilly's", type: "Live Music", rating: 4.2, slug: "fandom-gillys" },
  { name: "Brahma Brews", type: "Brewery", rating: 4.1, slug: "brahma-brews" },
];

const highlights = [
  "Home to Toit — Bangalore's most iconic brewpub",
  "50+ pubs and bars within walking distance",
  "24/7 food delivery and late-night eats",
  "Startup energy and young crowd",
  "Best craft beer concentration in the city",
];

export default function KoramangalaPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[21/9] md:aspect-[3/1]">
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80"
              alt="Koramangala nightlife"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-400 text-sm font-medium mb-4">
                Neighborhood Guide
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Koramangala
              </h1>
              <p className="text-xl text-zinc-300">
                Bangalore&apos;s Nightlife & Startup Hub
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-zinc-900/50 border-b border-zinc-800/50 px-4 py-3">
          <div className="max-w-4xl mx-auto text-sm text-zinc-500">
            <Link href="/" className="hover:text-violet-400">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/neighborhoods" className="hover:text-violet-400">Neighborhoods</Link>
            <span className="mx-2">→</span>
            <span className="text-white">Koramangala</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { value: "85+", label: "Venues" },
              { value: "4.2", label: "Avg Rating" },
              { value: "₹₹", label: "Price Level" },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900 rounded-xl p-4 text-center border border-zinc-800">
                <div className="text-2xl font-bold text-violet-400">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About Koramangala</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 leading-relaxed mb-4">
                If there&apos;s one neighborhood that defines Bangalore&apos;s nightlife, it&apos;s Koramangala. 
                This former residential area has transformed into the city&apos;s most vibrant party destination, 
                packed with brewpubs, rooftop bars, and late-night eateries.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Home to Toit (arguably India&apos;s most famous brewpub), The Bier Library, and dozens of other 
                craft beer spots, Koramangala is ground zero for Bangalore&apos;s craft beer revolution. 
                The neighborhood is divided into &quot;blocks&quot; — 5th Block and 6th Block being the epicenter of nightlife.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Beyond the bars, Koramangala is also Bangalore&apos;s startup hub. During the day, you&apos;ll find 
                cafes filled with entrepreneurs and remote workers. By night, the same crowd hits the pubs. 
                It&apos;s young, energetic, and always buzzing.
              </p>
            </div>
          </section>

          {/* Highlights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Highlights</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                  <span className="text-violet-400">✓</span>
                  <span className="text-zinc-300">{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Top Venues */}
          <section className="mb-12">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Venues</h2>
              <Link href="/venues?neighborhood=koramangala" className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {venues.map((venue) => (
                <Link
                  key={venue.slug}
                  href={`/venues/${venue.slug}`}
                  className="flex items-center gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-violet-500/50 transition-all"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{venue.name}</h3>
                    <p className="text-sm text-zinc-500">{venue.type}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 rounded-lg">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="font-semibold text-yellow-500 text-sm">{venue.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Getting There */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Getting There</h2>
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">By Metro</h3>
                  <p className="text-zinc-400 text-sm">
                    Nearest station: HSR Layout (Yellow Line). Take an auto from there — about 10 minutes to 5th Block.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">By Cab</h3>
                  <p className="text-zinc-400 text-sm">
                    Uber/Ola readily available. From MG Road: ~25 mins. From Airport: ~60-90 mins depending on traffic.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Neighborhoods */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Nearby Neighborhoods</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/neighborhoods/hsr-layout" className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm hover:border-violet-500/50 transition-colors">
                HSR Layout →
              </Link>
              <Link href="/neighborhoods/indiranagar" className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm hover:border-violet-500/50 transition-colors">
                Indiranagar →
              </Link>
              <Link href="/neighborhoods/jp-nagar" className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm hover:border-violet-500/50 transition-colors">
                JP Nagar →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
