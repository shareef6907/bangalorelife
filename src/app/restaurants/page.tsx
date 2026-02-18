import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Restaurants in Bangalore - Fine Dining to Street Food",
  description: "Discover Bangalore's best restaurants. From South Indian classics to global cuisine, fine dining to street food. Complete restaurant guide.",
  openGraph: {
    title: "Best Restaurants in Bangalore | BangaloreLife",
    description: "Explore Bangalore's incredible food scene - every cuisine, every budget.",
  },
};

const cuisines = [
  { name: "South Indian", href: "/restaurants/south-indian", icon: "🍛", count: "200+" },
  { name: "North Indian", href: "/restaurants/north-indian", icon: "🍗", count: "150+" },
  { name: "Chinese/Asian", href: "/restaurants/asian", icon: "🥢", count: "100+" },
  { name: "Italian", href: "/restaurants/italian", icon: "🍝", count: "80+" },
  { name: "Continental", href: "/restaurants/continental", icon: "🍽️", count: "70+" },
  { name: "Street Food", href: "/restaurants/street-food", icon: "🍜", count: "300+" },
];

const featured = [
  {
    name: "Karavalli",
    cuisine: "Coastal Karnataka",
    area: "The Taj, MG Road",
    rating: "4.8",
    priceRange: "₹₹₹₹",
    description: "Legendary coastal cuisine. One of Bangalore's finest restaurants for authentic Mangalorean and Kerala flavors.",
    mustTry: "Appam with stew, Neer dosa, Malabar fish curry",
  },
  {
    name: "Vidyarthi Bhavan",
    cuisine: "South Indian",
    area: "Basavanagudi",
    rating: "4.7",
    priceRange: "₹",
    description: "Iconic since 1943. The crispy Benne Dosa here is legendary. Be prepared to wait.",
    mustTry: "Benne Masala Dosa, Filter Coffee",
  },
  {
    name: "MTR (Mavalli Tiffin Rooms)",
    cuisine: "South Indian",
    area: "Lalbagh Road",
    rating: "4.6",
    priceRange: "₹₹",
    description: "Heritage restaurant since 1924. Traditional Udupi cuisine at its finest.",
    mustTry: "Rava Idli (invented here), Masala Dosa",
  },
  {
    name: "Nagarjuna",
    cuisine: "Andhra",
    area: "Multiple Locations",
    rating: "4.5",
    priceRange: "₹₹",
    description: "Fiery Andhra meals served on banana leaves. Unlimited refills of everything.",
    mustTry: "Andhra Meals, Chicken Biryani",
  },
  {
    name: "Olive Beach",
    cuisine: "Mediterranean",
    area: "Ashok Nagar",
    rating: "4.6",
    priceRange: "₹₹₹₹",
    description: "Beautiful white-washed interiors, Mediterranean vibes. Great for special occasions.",
    mustTry: "Mezze platter, Grilled seafood",
  },
  {
    name: "Truffles",
    cuisine: "American",
    area: "Multiple Locations",
    rating: "4.7",
    priceRange: "₹₹",
    description: "Best burgers in Bangalore, hands down. The steaks are excellent too.",
    mustTry: "All American Burger, Sizzling Brownie",
  },
];

const byArea = [
  { name: "Indiranagar", count: "80+", description: "Upscale, diverse options" },
  { name: "Koramangala", count: "100+", description: "Budget-friendly variety" },
  { name: "MG Road", count: "60+", description: "Mix of heritage and modern" },
  { name: "Whitefield", count: "50+", description: "IT crowd favorites" },
  { name: "Jayanagar", count: "70+", description: "Family-friendly classics" },
  { name: "Basavanagudi", count: "40+", description: "Traditional South Indian" },
];

export default function RestaurantsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-black to-orange-900/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-rose-400 text-sm">Restaurants</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Best <span className="text-gradient">Restaurants</span> in Bangalore
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              From heritage South Indian joints to global fine dining. 
              Bangalore&apos;s food scene is as diverse as its people.
            </p>
          </div>
        </section>

        {/* Cuisine Filter */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-light text-white mb-6">Browse by Cuisine</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {cuisines.map((cuisine) => (
                <Link
                  key={cuisine.name}
                  href={cuisine.href}
                  className="group p-4 rounded-xl bg-black border border-zinc-800 hover:border-rose-500/50 transition-all text-center"
                >
                  <span className="text-2xl mb-2 block">{cuisine.icon}</span>
                  <span className="text-white font-light group-hover:text-rose-300 transition-colors block text-sm">
                    {cuisine.name}
                  </span>
                  <span className="text-xs text-zinc-500">{cuisine.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl font-extralight text-white">Featured Restaurants</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-transparent" />
            </div>

            <div className="space-y-6">
              {featured.map((restaurant, index) => (
                <div
                  key={restaurant.name}
                  className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-rose-500/30 overflow-hidden transition-all"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Number & Rating */}
                      <div className="flex lg:flex-col items-center gap-3 lg:gap-2">
                        <span className="text-4xl font-extralight text-zinc-700">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <span>★</span>
                          <span className="text-sm">{restaurant.rating}</span>
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-2xl font-light text-white group-hover:text-rose-300 transition-colors">
                            {restaurant.name}
                          </h3>
                          <span className="px-3 py-1 bg-rose-500/10 text-rose-300 text-xs rounded-full">
                            {restaurant.cuisine}
                          </span>
                          <span className="text-zinc-500 text-sm">{restaurant.area}</span>
                        </div>
                        
                        <p className="text-zinc-400 mb-4 leading-relaxed">
                          {restaurant.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div>
                            <span className="text-zinc-500">Must Try:</span>
                            <span className="text-white ml-2">{restaurant.mustTry}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Price:</span>
                            <span className="text-rose-300 ml-2">{restaurant.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* By Area */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-extralight text-white mb-4">Explore by Area</h2>
              <p className="text-zinc-500">Each neighborhood has its own food identity</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {byArea.map((area) => (
                <Link
                  key={area.name}
                  href={`/areas/${area.name.toLowerCase().replace(' ', '-')}`}
                  className="group p-6 rounded-xl bg-black border border-zinc-800 hover:border-rose-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-light text-white group-hover:text-rose-300 transition-colors">
                      {area.name}
                    </h3>
                    <span className="text-xs text-zinc-500">{area.count} restaurants</span>
                  </div>
                  <p className="text-sm text-zinc-500">{area.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              Bangalore Food Guide
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Bangalore&apos;s food scene reflects its cosmopolitan character. You&apos;ll find 
                everything from 100-year-old South Indian institutions to modern fusion 
                restaurants pushing boundaries.
              </p>
              
              <h3 className="text-xl text-white mt-8 mb-4">South Indian Essentials</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Don&apos;t leave Bangalore without trying the classics: Vidyarthi Bhavan for 
                Benne Dosa, MTR for Rava Idli (they invented it), and any Darshini for 
                quick, cheap, delicious meals.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Where to Eat by Occasion</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li><strong className="text-white">Date night:</strong> Olive Beach, Karavalli, Caperberry</li>
                <li><strong className="text-white">Family lunch:</strong> MTR, Nagarjuna, Empire</li>
                <li><strong className="text-white">Friends hangout:</strong> Truffles, Meghana, Onesta</li>
                <li><strong className="text-white">Quick bites:</strong> Any Darshini, VV Puram Food Street</li>
                <li><strong className="text-white">Late night:</strong> Empire (24/7), VV Puram stalls</li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Food Delivery</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Swiggy and Zomato dominate food delivery in Bangalore. Most restaurants 
                are available on both platforms. Late-night options are limited after 11 PM 
                in most areas.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
