import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BangaloreLife — Your Guide to the Best of Bangalore",
  description: "Discover the best pubs, restaurants, breweries, and things to do in Bangalore. Neighborhood guides, insider tips, and the ultimate lifestyle guide to India's most exciting city.",
  keywords: "best pubs bangalore, things to do bangalore, bangalore nightlife, best restaurants bangalore, bangalore breweries, koramangala bars, indiranagar nightlife, bangalore weekend guide",
  openGraph: {
    title: "BangaloreLife — Your Guide to the Best of Bangalore",
    description: "The ultimate lifestyle guide to India's most exciting city. Discover neighborhoods, find the best spots, and explore everything Bangalore has to offer.",
    url: "https://bangalorelife.com",
    siteName: "BangaloreLife",
    type: "website",
  },
};

// Featured neighborhoods
const neighborhoods = [
  {
    name: "Koramangala",
    slug: "koramangala",
    tagline: "Bangalore's Nightlife & Startup Hub",
    description: "The beating heart of Bangalore's party scene. Home to Toit, The Bier Library, and dozens of rooftop bars.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    bestFor: ["Craft Beer", "Late Night", "Startup Crowd"],
  },
  {
    name: "Indiranagar",
    slug: "indiranagar",
    tagline: "Upscale Bars, Boutiques & Brunch",
    description: "12th Main and 100 Feet Road are legendary. From wine bars to live music venues, Indiranagar has it all.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    bestFor: ["Cocktails", "Brunch", "Live Music"],
  },
  {
    name: "MG Road",
    slug: "mg-road-brigade-road",
    tagline: "The Iconic Party Strip",
    description: "Where Bangalore's nightlife began. Brigade Road and MG Road remain home to legendary spots like Pecos and Hard Rock Cafe.",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80",
    bestFor: ["Classic Bars", "Live Bands", "Walking District"],
  },
];

// Featured guides
const featuredGuides = [
  {
    title: "15 Best Pubs in Bangalore",
    slug: "best-pubs-bangalore",
    description: "From legendary brewpubs to hidden speakeasies — the definitive guide to Bangalore's best watering holes.",
    image: "https://images.unsplash.com/photo-1546071379-a3a0e72e7333?w=600&q=80",
    category: "Nightlife",
  },
  {
    title: "12 Best Breweries in Bangalore",
    slug: "best-breweries-bangalore",
    description: "Bangalore is India's craft beer capital. Here's where to find the best brews in the city.",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=600&q=80",
    category: "Drinks",
  },
  {
    title: "10 Best Rooftop Bars",
    slug: "best-rooftop-bars-bangalore",
    description: "Stunning views, craft cocktails, and perfect weather year-round. These rooftops are worth the elevator ride.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    category: "Nightlife",
  },
  {
    title: "25 Best Date Night Ideas",
    slug: "date-night-bangalore",
    description: "Romantic rooftops, hidden speakeasies, stargazing spots, and more for your perfect Bangalore date.",
    image: "https://images.unsplash.com/photo-1529417305485-480f579e7578?w=600&q=80",
    category: "Dating",
  },
];

// Quick category links
const categoryLinks = [
  { name: "Best Pubs", href: "/guides/best-pubs-bangalore", emoji: "🍻" },
  { name: "Breweries", href: "/guides/best-breweries-bangalore", emoji: "🍺" },
  { name: "Rooftop Bars", href: "/guides/best-rooftop-bars-bangalore", emoji: "🌃" },
  { name: "Date Night", href: "/guides/date-night-bangalore", emoji: "💕" },
  { name: "Street Food", href: "/guides/best-street-food-bangalore", emoji: "🍜" },
  { name: "Day Trips", href: "/guides/day-trips-from-bangalore", emoji: "🚗" },
  { name: "Things to Do", href: "/guides/things-to-do-bangalore", emoji: "✨" },
  { name: "This Weekend", href: "/this-weekend", emoji: "📅" },
];

// Top venues
const topVenues = [
  { name: "Toit Brewpub", area: "Indiranagar", type: "Brewpub", slug: "toit-brewpub" },
  { name: "Arbor Brewing Co.", area: "Magrath Road", type: "Brewery", slug: "arbor-brewing-company" },
  { name: "The Bier Library", area: "Koramangala", type: "Craft Beer Bar", slug: "the-bier-library" },
  { name: "Byg Brewski", area: "Hennur", type: "Brewery", slug: "byg-brewski" },
  { name: "Windmills Craftworks", area: "Whitefield", type: "Brewery", slug: "windmills-craftworks" },
  { name: "Loft 38", area: "Indiranagar", type: "Rooftop Bar", slug: "loft-38" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80')] bg-cover bg-center opacity-20" />
          <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              BangaloreLife
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-4 max-w-2xl">
              Your guide to the best of Bangalore
            </p>
            <p className="text-lg text-emerald-200/80 mb-10 max-w-xl">
              Discover the best pubs, restaurants, breweries, and things to do in India's most exciting city.
            </p>
            
            {/* Quick Links */}
            <div className="flex flex-wrap gap-3">
              {categoryLinks.slice(0, 6).map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm hover:bg-white/20 transition-colors"
                >
                  <span className="mr-1.5">{cat.emoji}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* This Weekend Teaser */}
        <section className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <Link href="/this-weekend" className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <span className="text-3xl">📅</span>
                <div>
                  <h2 className="text-lg font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">
                    Things to Do This Weekend in Bangalore
                  </h2>
                  <p className="text-amber-700 text-sm">
                    Updated every Thursday — Comedy shows, live music, food festivals & more
                  </p>
                </div>
              </div>
              <span className="text-amber-600 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </section>

        {/* Explore by Neighborhood */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
                  Explore by Neighborhood
                </h2>
                <p className="text-stone-600 mt-1">
                  Every area has its own vibe. Find your scene.
                </p>
              </div>
              <Link 
                href="/neighborhoods" 
                className="text-emerald-700 hover:text-emerald-600 font-medium hidden md:block"
              >
                View all neighborhoods →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {neighborhoods.map((hood) => (
                <Link
                  key={hood.slug}
                  href={`/neighborhoods/${hood.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-stone-200"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img 
                      src={hood.image} 
                      alt={hood.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{hood.name}</h3>
                      <p className="text-white/80 text-sm">{hood.tagline}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-stone-600 text-sm line-clamp-2">{hood.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {hood.bestFor.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center md:hidden">
              <Link 
                href="/neighborhoods" 
                className="text-emerald-700 font-medium"
              >
                View all neighborhoods →
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Guides */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
                  Best of Bangalore Guides
                </h2>
                <p className="text-stone-600 mt-1">
                  Our top picks, insider tips, and local favorites.
                </p>
              </div>
              <Link 
                href="/guides" 
                className="text-emerald-700 hover:text-emerald-600 font-medium hidden md:block"
              >
                View all guides →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
                    <img 
                      src={guide.image} 
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                    {guide.category}
                  </span>
                  <h3 className="font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors mt-1">
                    {guide.title}
                  </h3>
                  <p className="text-stone-500 text-sm mt-1 line-clamp-2">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section className="py-16 px-4 bg-stone-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
                  Popular Venues
                </h2>
                <p className="text-stone-600 mt-1">
                  Bangalore's most-loved spots for drinks, food, and good times.
                </p>
              </div>
              <Link 
                href="/venues" 
                className="text-emerald-700 hover:text-emerald-600 font-medium hidden md:block"
              >
                Browse all venues →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topVenues.map((venue) => (
                <Link
                  key={venue.slug}
                  href={`/venues/${venue.slug}`}
                  className="group bg-white p-4 rounded-xl border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-emerald-200 transition-colors">
                    <span className="text-xl">🍺</span>
                  </div>
                  <h3 className="font-semibold text-stone-900 text-sm group-hover:text-emerald-700 transition-colors">
                    {venue.name}
                  </h3>
                  <p className="text-stone-500 text-xs mt-0.5">{venue.area}</p>
                  <p className="text-emerald-600 text-xs mt-1">{venue.type}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Things to Do Categories */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-8 text-center">
              What Are You Looking For?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Nightlife", emoji: "🍻", href: "/things-to-do/nightlife", desc: "Pubs, clubs, bars" },
                { name: "Food & Drink", emoji: "🍽️", href: "/things-to-do/food-and-drink", desc: "Restaurants, cafes" },
                { name: "Outdoors", emoji: "🌳", href: "/things-to-do/outdoors", desc: "Parks, treks, lakes" },
                { name: "Day Trips", emoji: "🚗", href: "/things-to-do/day-trips", desc: "Weekend getaways" },
                { name: "Culture", emoji: "🎭", href: "/things-to-do/culture", desc: "Museums, theater" },
                { name: "Live Music", emoji: "🎸", href: "/guides/best-live-music-bangalore", desc: "Gigs & concerts" },
                { name: "Kids & Family", emoji: "👨‍👩‍👧", href: "/things-to-do/kids-and-family", desc: "Family-friendly" },
                { name: "Date Ideas", emoji: "💕", href: "/guides/date-night-bangalore", desc: "Romantic spots" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group p-6 bg-stone-50 rounded-xl hover:bg-emerald-50 border border-stone-200 hover:border-emerald-200 transition-all text-center"
                >
                  <span className="text-3xl block mb-2">{cat.emoji}</span>
                  <h3 className="font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-stone-500 text-sm mt-0.5">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Bangalore Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
              Why Bangalore?
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              India's pub capital, tech hub, and most liveable city. Perfect weather year-round, 
              a thriving craft beer scene, world-class restaurants, and a nightlife that never stops.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { stat: "300+", label: "Pubs & Bars" },
                { stat: "50+", label: "Breweries" },
                { stat: "Perfect", label: "Weather" },
                { stat: "24/7", label: "Energy" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-3xl font-bold text-amber-400">{item.stat}</div>
                  <div className="text-emerald-200 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 px-4 bg-stone-100">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-3">
              Get the Best of Bangalore in Your Inbox
            </h2>
            <p className="text-stone-600 mb-6">
              Weekly picks: new openings, weekend plans, and insider tips.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-500"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
