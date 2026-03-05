import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Guides 2025 — Best Restaurants, Bars, Cafes & Things to Do",
  description: "20+ curated guides to the best of Bangalore. Best pubs, breweries, restaurants, cafes, nightlife, neighborhoods and things to do in India's tech capital.",
  keywords: "bangalore guides, best pubs bangalore, best restaurants bangalore, things to do bangalore, bangalore nightlife, bangalore food guide",
};

const guides = [
  // Food & Dining
  {
    title: "25 Best Restaurants in Bangalore 2025",
    slug: "best-restaurants-bangalore-2025",
    description: "From fine dining to hidden gems. The definitive guide to eating well in Bangalore.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    readTime: "12 min read",
    featured: true,
  },
  {
    title: "Best Fine Dining Restaurants",
    slug: "best-fine-dining-bangalore",
    description: "Michelin-worthy experiences, tasting menus, and special occasion restaurants.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    readTime: "9 min read",
  },
  {
    title: "Best Brunches in Bangalore",
    slug: "best-brunches-bangalore",
    description: "Lazy weekend brunches, unlimited buffets, and Instagram-worthy spreads.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    readTime: "9 min read",
  },
  {
    title: "Best Street Food in Bangalore",
    slug: "best-street-food-bangalore",
    description: "From VV Puram food street to hidden local spots, discover Bangalore's best street food.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    readTime: "8 min read",
  },
  // Nightlife & Drinks
  {
    title: "15 Best Pubs in Bangalore",
    slug: "best-pubs-bangalore",
    description: "The definitive guide to Bangalore's best pubs. From Toit to hidden speakeasies.",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
    readTime: "12 min read",
    featured: true,
  },
  {
    title: "12 Best Breweries in Bangalore",
    slug: "best-breweries-bangalore",
    description: "Bangalore is India's craft beer capital. Here's where to find the best brews.",
    category: "Craft Beer",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&q=80",
    readTime: "10 min read",
  },
  {
    title: "Best Rooftop Bars in Bangalore",
    slug: "best-rooftop-bars-bangalore",
    description: "Stunning views, craft cocktails, and perfect weather year-round.",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
    readTime: "8 min read",
  },
  {
    title: "Bangalore Nightlife Guide",
    slug: "bangalore-nightlife-guide",
    description: "Clubs, bars, live music venues and late-night eats. How to party in Bangalore.",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    readTime: "13 min read",
    featured: true,
  },
  // Cafes & Coffee
  {
    title: "Best Cafes in Bangalore",
    slug: "best-cafes-bangalore",
    description: "Third Wave coffee, aesthetic interiors, and great work vibes.",
    category: "Cafes",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
    readTime: "9 min read",
  },
  {
    title: "Best Coffee Shops in Bangalore",
    slug: "best-coffee-shops-bangalore",
    description: "Third wave coffee, specialty roasters, and the best cappuccinos in town.",
    category: "Cafes",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    readTime: "8 min read",
  },
  // Shopping
  {
    title: "Best Malls in Bangalore",
    slug: "best-malls-bangalore",
    description: "Phoenix Marketcity, UB City, Orion Mall and more. Complete shopping guide.",
    category: "Shopping",
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&q=80",
    readTime: "10 min read",
    featured: true,
  },
  // Neighborhoods
  {
    title: "Indiranagar Food & Nightlife Guide",
    slug: "indiranagar-complete-guide",
    description: "Best cafes, bars, restaurants and things to do in Bangalore's coolest neighborhood.",
    category: "Neighborhoods",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
    readTime: "14 min read",
  },
  {
    title: "Koramangala Complete Guide",
    slug: "koramangala-guide",
    description: "Startup hub meets foodie paradise. Everything worth doing in Koramangala.",
    category: "Neighborhoods",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    readTime: "12 min read",
  },
  {
    title: "Whitefield Area Guide",
    slug: "whitefield-area-guide",
    description: "Tech hub with great malls, breweries and restaurants.",
    category: "Neighborhoods",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    readTime: "10 min read",
  },
  // Stay & Work
  {
    title: "Best Hotels in Bangalore",
    slug: "best-hotels-bangalore",
    description: "From luxury 5-stars to budget-friendly stays. Where to stay in Bangalore.",
    category: "Stay",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    readTime: "11 min read",
  },
  {
    title: "Top Coworking Spaces in Bangalore",
    slug: "best-coworking-spaces-bangalore",
    description: "WeWork, 91springboard, Awfis and indie spaces for remote work.",
    category: "Work",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    readTime: "10 min read",
  },
  // Activities & Exploration
  {
    title: "50+ Things to Do in Bangalore",
    slug: "things-to-do-bangalore",
    description: "The mega guide to Bangalore. Everything worth doing in the city.",
    category: "Exploration",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    readTime: "20 min read",
  },
  {
    title: "Kid-Friendly Activities in Bangalore",
    slug: "kid-friendly-bangalore",
    description: "Theme parks, museums, play areas and family restaurants.",
    category: "Family",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
    readTime: "10 min read",
  },
  {
    title: "Best Day Trips from Bangalore",
    slug: "day-trips-from-bangalore",
    description: "From Nandi Hills sunrises to Coorg coffee estates. Weekend getaways.",
    category: "Day Trips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    readTime: "10 min read",
  },
  {
    title: "25 Best Date Night Ideas",
    slug: "date-night-bangalore",
    description: "Romantic rooftops, hidden speakeasies, stargazing spots, and more.",
    category: "Romance",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=600&q=80",
    readTime: "15 min read",
  },
];

const categories = ["All", "Food", "Nightlife", "Craft Beer", "Cafes", "Shopping", "Neighborhoods", "Stay", "Family", "Day Trips"];

export default function GuidesPage() {
  const featuredGuides = guides.filter(g => g.featured);
  
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
              {guides.length} curated guides with insider tips and local favorites.
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

        {/* Featured Guides */}
        <section className="py-12 px-4 border-b border-zinc-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Featured Guides</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/50 transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <span className="px-2 py-1 bg-violet-500/10 border border-violet-500/20 rounded text-xs text-violet-400 font-medium">{guide.category}</span>
                    <h3 className="text-lg font-bold mt-2 group-hover:text-violet-400 transition-colors line-clamp-2">{guide.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Guides Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">All Guides ({guides.length})</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/50 transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 rounded-lg text-xs text-violet-400 font-medium">{guide.category}</span>
                      <span className="text-xs text-zinc-500">{guide.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{guide.title}</h2>
                    <p className="text-sm text-zinc-400 line-clamp-2">{guide.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Section */}
        <section className="py-16 px-4 bg-zinc-900/30 border-t border-zinc-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Browse by Section</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/malls" className="bg-zinc-900 hover:bg-zinc-800 rounded-xl p-6 text-center transition-colors">
                <span className="text-3xl mb-2 block">🏬</span>
                <span className="font-medium">Shopping Malls</span>
              </Link>
              <Link href="/restaurants" className="bg-zinc-900 hover:bg-zinc-800 rounded-xl p-6 text-center transition-colors">
                <span className="text-3xl mb-2 block">🍽️</span>
                <span className="font-medium">Restaurants</span>
              </Link>
              <Link href="/nightlife" className="bg-zinc-900 hover:bg-zinc-800 rounded-xl p-6 text-center transition-colors">
                <span className="text-3xl mb-2 block">🍺</span>
                <span className="font-medium">Nightlife</span>
              </Link>
              <Link href="/hotels" className="bg-zinc-900 hover:bg-zinc-800 rounded-xl p-6 text-center transition-colors">
                <span className="text-3xl mb-2 block">🏨</span>
                <span className="font-medium">Hotels</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
