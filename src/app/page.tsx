import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BangaloreLife — Discover the Best of India's Tech Capital",
  description: "Your guide to the best pubs, breweries, restaurants, and things to do in Bangalore. Discover venues with real Google ratings, reviews, and insider tips.",
  keywords: "bangalore pubs, bangalore nightlife, bangalore breweries, best restaurants bangalore, things to do bangalore, koramangala pubs, indiranagar bars",
  openGraph: {
    title: "BangaloreLife — Discover the Best of Bangalore",
    description: "The ultimate guide to pubs, breweries, restaurants, and experiences in India's tech capital.",
    type: "website",
  },
};

// Featured neighborhoods
const neighborhoods = [
  {
    name: "Koramangala",
    slug: "koramangala",
    tagline: "Bangalore's Nightlife & Startup Hub",
    venues: "85+ venues",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
  },
  {
    name: "Indiranagar",
    slug: "indiranagar",
    tagline: "Upscale Bars & Brunch Spots",
    venues: "70+ venues",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
  },
  {
    name: "MG Road",
    slug: "mg-road-brigade-road",
    tagline: "The Iconic Party Strip",
    venues: "45+ venues",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
  },
  {
    name: "Whitefield",
    slug: "whitefield",
    tagline: "Tech Hub After Dark",
    venues: "40+ venues",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
  },
];

// Featured guides
const guides = [
  {
    title: "15 Best Pubs in Bangalore",
    slug: "best-pubs-bangalore",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
  },
  {
    title: "12 Best Breweries",
    slug: "best-breweries-bangalore",
    category: "Craft Beer",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&q=80",
  },
  {
    title: "Best Rooftop Bars",
    slug: "best-rooftop-bars-bangalore",
    category: "Views",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
  },
  {
    title: "Date Night Ideas",
    slug: "date-night-bangalore",
    category: "Romance",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=600&q=80",
  },
];

// Venue types for quick access
const venueTypes = [
  { name: "Pubs & Bars", icon: "🍺", href: "/venues?type=pub" },
  { name: "Breweries", icon: "🍻", href: "/venues?type=brewery" },
  { name: "Rooftop Bars", icon: "🌃", href: "/venues?type=rooftop" },
  { name: "Restaurants", icon: "🍽️", href: "/venues?type=restaurant" },
  { name: "Cafes", icon: "☕", href: "/venues?type=cafe" },
  { name: "Clubs", icon: "🎵", href: "/venues?type=club" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-zinc-950 to-zinc-950" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80')] bg-cover bg-center opacity-10" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              100+ venues with real Google ratings
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Discover<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400">
                Bangalore
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10">
              The ultimate guide to pubs, breweries, restaurants, and nightlife in India&apos;s tech capital.
            </p>
            
            {/* Quick search/filter buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {venueTypes.map((type) => (
                <Link
                  key={type.name}
                  href={type.href}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-violet-500/50 rounded-xl text-sm font-medium transition-all hover:scale-105"
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.name}
                </Link>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/venues"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-violet-500/25"
              >
                Explore All Venues →
              </Link>
              <Link
                href="/guides"
                className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl font-semibold transition-all"
              >
                Browse Guides
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-zinc-800/50 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "100+", label: "Venues" },
                { value: "10", label: "Neighborhoods" },
                { value: "4.2+", label: "Avg Rating" },
                { value: "50K+", label: "Reviews" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Explore by Neighborhood</h2>
                <p className="text-zinc-500">Every area has its own vibe. Find your scene.</p>
              </div>
              <Link href="/neighborhoods" className="text-violet-400 hover:text-violet-300 font-medium hidden md:block">
                View all →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {neighborhoods.map((hood) => (
                <Link
                  key={hood.slug}
                  href={`/neighborhoods/${hood.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-zinc-900"
                >
                  <img
                    src={hood.image}
                    alt={hood.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-xs text-violet-400 font-medium mb-1">{hood.venues}</div>
                    <h3 className="text-xl font-bold mb-1">{hood.name}</h3>
                    <p className="text-sm text-zinc-400">{hood.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-center md:hidden">
              <Link href="/neighborhoods" className="text-violet-400 hover:text-violet-300 font-medium">
                View all neighborhoods →
              </Link>
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-20 px-4 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Best of Bangalore</h2>
                <p className="text-zinc-500">Curated guides with insider tips and local favorites.</p>
              </div>
              <Link href="/guides" className="text-violet-400 hover:text-violet-300 font-medium hidden md:block">
                View all guides →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/50 transition-all"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-violet-400 font-medium mb-2">{guide.category}</div>
                    <h3 className="font-semibold group-hover:text-violet-400 transition-colors">
                      {guide.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-center md:hidden">
              <Link href="/guides" className="text-violet-400 hover:text-violet-300 font-medium">
                View all guides →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Bangalore Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Bangalore?</h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-12">
              India&apos;s pub capital, tech hub, and most liveable city. Perfect weather year-round, 
              a thriving craft beer scene with 50+ breweries, world-class restaurants, and a nightlife 
              that never stops. From legendary spots like Toit and Pecos to hidden speakeasies — 
              Bangalore has it all.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "🍺", title: "Craft Beer Capital", desc: "50+ breweries and counting" },
                { icon: "💻", title: "Tech Hub", desc: "India's Silicon Valley" },
                { icon: "🌡️", title: "Perfect Weather", desc: "22°C year-round" },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-violet-950/50 to-cyan-950/50 border-y border-zinc-800/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-zinc-400 mb-8">
              Discover 100+ venues with real Google ratings, reviews, and detailed guides.
            </p>
            <Link
              href="/venues"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-zinc-900 rounded-xl font-semibold hover:bg-zinc-100 transition-all hover:scale-105"
            >
              Browse All Venues
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
