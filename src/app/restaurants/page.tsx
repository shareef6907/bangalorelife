import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Restaurants in Bangalore 2025 — All Cuisines | BangaloreLife",
  description: "Discover Bangalore's best restaurants. From South Indian classics to global cuisine, fine dining to street food. Complete restaurant guide by cuisine.",
  keywords: "restaurants bangalore, best restaurants bangalore, food bangalore, dining bangalore, cuisine bangalore",
};

const cuisines = [
  { name: "South Indian", slug: "south-indian", icon: "🍛", description: "Dosas, idlis, thalis & filter coffee" },
  { name: "North Indian", slug: "north-indian", icon: "🍗", description: "Butter chicken, biryani & tandoori" },
  { name: "Chinese", slug: "chinese", icon: "🥢", description: "Dim sum, noodles & Indo-Chinese" },
  { name: "Italian", slug: "italian", icon: "🍝", description: "Pizza, pasta & risotto" },
  { name: "Street Food", slug: "street-food", icon: "🍜", description: "Chaat, pani puri & local bites" },
  { name: "Fine Dining", slug: "fine-dining", icon: "✨", description: "Special occasions & luxury" },
  { name: "Rooftop", slug: "rooftop", icon: "🌆", description: "Views, cocktails & dining" },
  { name: "Buffet", slug: "buffet", icon: "🍽️", description: "All-you-can-eat spreads" },
  { name: "Vegan", slug: "vegan", icon: "🌱", description: "Plant-based & healthy" },
];

const featured = [
  {
    name: "Karavalli",
    cuisine: "Coastal Karnataka",
    area: "Taj Gateway",
    rating: "4.8",
    price: "₹₹₹₹",
    description: "Legendary coastal cuisine. One of Bangalore's finest for Mangalorean and Kerala flavors.",
  },
  {
    name: "CTR (Central Tiffin Room)",
    cuisine: "South Indian",
    area: "Malleshwaram",
    rating: "4.7",
    price: "₹",
    description: "The most famous benne dosa in Bangalore since 1920. Worth every minute in the queue.",
  },
  {
    name: "Toit Brewpub",
    cuisine: "Global / Pub Food",
    area: "Indiranagar",
    rating: "4.4",
    price: "₹₹",
    description: "Bangalore's iconic brewpub. Craft beer, great food, always buzzing.",
  },
  {
    name: "Meghana Foods",
    cuisine: "Andhra / Biryani",
    area: "Multiple",
    rating: "4.5",
    price: "₹₹",
    description: "The biryani that's become a Bangalore obsession. Consistently great.",
  },
];

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative py-20 px-4 border-b border-zinc-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Restaurants in Bangalore</h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Every cuisine, every budget. From legendary dosa joints to world-class fine dining.
            </p>
          </div>
        </section>

        {/* Cuisine Categories */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Browse by Cuisine</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {cuisines.map((cuisine) => (
                <Link
                  key={cuisine.slug}
                  href={`/restaurants/${cuisine.slug}`}
                  className="bg-zinc-900 hover:bg-zinc-800 rounded-xl p-5 text-center transition-all border border-zinc-800 hover:border-violet-500/50"
                >
                  <span className="text-3xl block mb-2">{cuisine.icon}</span>
                  <span className="font-semibold block">{cuisine.name}</span>
                  <span className="text-xs text-zinc-500 mt-1 block">{cuisine.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="py-12 px-4 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Iconic Restaurants</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((restaurant) => (
                <div key={restaurant.name} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{restaurant.name}</h3>
                      <p className="text-sm text-zinc-500">{restaurant.cuisine} • {restaurant.area}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-yellow-400">★ {restaurant.rating}</span>
                      <span className="block text-sm text-zinc-500">{restaurant.price}</span>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm">{restaurant.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Restaurant Guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/best-restaurants-bangalore-2025" className="bg-violet-600 hover:bg-violet-500 rounded-xl p-6 transition-colors">
                <h3 className="font-bold text-lg mb-2">Best Restaurants 2025</h3>
                <p className="text-sm opacity-80">Our curated top picks across all cuisines</p>
              </Link>
              <Link href="/guides/best-fine-dining-bangalore" className="bg-zinc-900 hover:bg-zinc-800 rounded-xl p-6 transition-colors border border-zinc-800">
                <h3 className="font-bold text-lg mb-2">Fine Dining Guide</h3>
                <p className="text-sm text-zinc-400">Special occasions & luxury experiences</p>
              </Link>
              <Link href="/guides/best-street-food-bangalore" className="bg-zinc-900 hover:bg-zinc-800 rounded-xl p-6 transition-colors border border-zinc-800">
                <h3 className="font-bold text-lg mb-2">Street Food Guide</h3>
                <p className="text-sm text-zinc-400">VV Puram, chaat spots & local bites</p>
              </Link>
            </div>
          </div>
        </section>

        {/* By Neighborhood */}
        <section className="py-12 px-4 border-t border-zinc-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Explore by Area</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/neighborhoods/koramangala" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Koramangala</Link>
              <Link href="/neighborhoods/indiranagar" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Indiranagar</Link>
              <Link href="/neighborhoods/malleshwaram" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Malleshwaram</Link>
              <Link href="/neighborhoods/jayanagar" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Jayanagar</Link>
              <Link href="/neighborhoods/whitefield" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Whitefield</Link>
              <Link href="/neighborhoods/frazer-town" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Frazer Town</Link>
              <Link href="/neighborhoods" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm">All Areas →</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
