import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Guides — Best Pubs, Breweries & Things to Do",
  description: "Curated guides to the best of Bangalore. Best pubs, breweries, rooftop bars, date night ideas, and things to do in India's tech capital.",
  keywords: "bangalore guides, best pubs bangalore, best breweries bangalore, things to do bangalore, date night bangalore",
};

const guides = [
  {
    title: "15 Best Pubs in Bangalore",
    slug: "best-pubs-bangalore",
    description: "The definitive guide to Bangalore's best pubs. From legendary brewpubs like Toit to hidden speakeasies, discover where to drink in India's pub capital.",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
    readTime: "12 min read",
  },
  {
    title: "12 Best Breweries in Bangalore",
    slug: "best-breweries-bangalore",
    description: "Bangalore is India's craft beer capital. Here's where to find the best brews in the city — from Toit to Windmills to hidden gems.",
    category: "Craft Beer",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&q=80",
    readTime: "10 min read",
  },
  {
    title: "Best Rooftop Bars in Bangalore",
    slug: "best-rooftop-bars-bangalore",
    description: "Stunning views, craft cocktails, and perfect weather year-round. These rooftops are worth the elevator ride.",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
    readTime: "8 min read",
  },
  {
    title: "25 Best Date Night Ideas",
    slug: "date-night-bangalore",
    description: "Romantic rooftops, hidden speakeasies, stargazing spots, and more. The ultimate guide to date night in Bangalore.",
    category: "Romance",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=600&q=80",
    readTime: "15 min read",
  },
  {
    title: "50+ Things to Do in Bangalore",
    slug: "things-to-do-bangalore",
    description: "The mega guide to Bangalore. Whether you're visiting for a weekend or living here, this is everything worth doing.",
    category: "Exploration",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    readTime: "20 min read",
  },
  {
    title: "Best Day Trips from Bangalore",
    slug: "day-trips-from-bangalore",
    description: "Escape the city for a day. From Nandi Hills sunrises to Coorg coffee estates, here's where to go for a quick getaway.",
    category: "Day Trips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    readTime: "10 min read",
  },
  {
    title: "Best Street Food in Bangalore",
    slug: "best-street-food-bangalore",
    description: "From VV Puram food street to hidden local spots, discover Bangalore's best street food and where to find it.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    readTime: "8 min read",
  },
  {
    title: "Best Cafes in Bangalore",
    slug: "best-cafes-bangalore",
    description: "Third Wave coffee, aesthetic interiors, and great work vibes. The best cafes for coffee lovers and remote workers.",
    category: "Cafes",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
    readTime: "9 min read",
  },
];

const categories = ["All", "Nightlife", "Craft Beer", "Romance", "Food", "Day Trips", "Cafes", "Exploration"];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative py-20 px-4 border-b border-zinc-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bangalore Guides
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Curated guides with insider tips and local favorites.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-16 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50 py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    cat === "All"
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/50 transition-all"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 rounded-lg text-xs text-violet-400 font-medium">
                        {guide.category}
                      </span>
                      <span className="text-xs text-zinc-500">{guide.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-sm text-zinc-400 line-clamp-2">
                      {guide.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-zinc-900/30 border-t border-zinc-800/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Want us to cover something?</h2>
            <p className="text-zinc-400 mb-6">
              We&apos;re always looking for new guide ideas. Let us know what you want to see.
            </p>
            <Link
              href="/suggest"
              className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-medium transition-colors"
            >
              Suggest a Guide
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
