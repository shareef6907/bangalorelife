import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Breweries in Bangalore - Microbreweries & Craft Beer",
  description: "Discover Bangalore's best microbreweries and craft beer spots. Toit, Arbor, Windmills, and 50+ more breweries. India's pub capital awaits.",
  openGraph: {
    title: "Best Breweries in Bangalore | BangaloreLife",
    description: "Complete guide to Bangalore's legendary craft beer scene. 50+ microbreweries reviewed.",
  },
};

const breweries = [
  {
    name: "Toit Brewpub",
    area: "Indiranagar",
    established: "2010",
    description: "The OG Bangalore brewery that started it all. Known for their Toit Weiss and packed weekend atmosphere.",
    rating: "4.8",
    priceRange: "₹₹₹",
    specialties: ["Toit Weiss", "Colonial Toit", "Tintin Toit"],
    mustTry: "Toit Weiss - their signature wheat beer",
    ambiance: "Casual, always crowded",
    address: "298, 100 Feet Road, Indiranagar",
    timings: "12PM - 11:30PM",
  },
  {
    name: "Arbor Brewing Company",
    area: "Magrath Road",
    established: "2012",
    description: "American craft beer pioneers in India. Excellent IPAs and a solid food menu.",
    rating: "4.6",
    priceRange: "₹₹₹",
    specialties: ["Bangalore Bliss IPA", "Raging Elephant IPA"],
    mustTry: "Raging Elephant IPA - bold and hoppy",
    ambiance: "Relaxed, pub-style",
    address: "8, Magrath Road, Ashok Nagar",
    timings: "12PM - 11:30PM",
  },
  {
    name: "Windmills Craftworks",
    area: "Whitefield",
    established: "2013",
    description: "Beautiful space with jazz performances, library corner, and excellent food. The most refined brewery experience.",
    rating: "4.7",
    priceRange: "₹₹₹₹",
    specialties: ["Hefeweizen", "Vienna Lager", "Witbier"],
    mustTry: "Hefeweizen - smooth and balanced",
    ambiance: "Upscale, great for dates",
    address: "Whitefield, near ITPL",
    timings: "12PM - 11PM",
  },
  {
    name: "Big Brewsky",
    area: "Sarjapur Road",
    established: "2014",
    description: "Massive outdoor space with lake views. Great for groups and special occasions.",
    rating: "4.5",
    priceRange: "₹₹₹",
    specialties: ["Belgian Blonde", "Wheat Beer", "Lager"],
    mustTry: "Belgian Blonde - light and crisp",
    ambiance: "Sprawling outdoors, family-friendly until 6PM",
    address: "B4 Estate, Sarjapur Road",
    timings: "12PM - 11PM",
  },
  {
    name: "The Bier Library",
    area: "Koramangala",
    established: "2015",
    description: "Cozy Koramangala favorite with a great selection of in-house brews.",
    rating: "4.5",
    priceRange: "₹₹₹",
    specialties: ["Belgian Wit", "Pale Ale", "Stout"],
    mustTry: "Belgian Wit - refreshing with citrus notes",
    ambiance: "Cozy, good for conversations",
    address: "1st Cross, Koramangala 5th Block",
    timings: "12PM - 11:30PM",
  },
  {
    name: "Pump House",
    area: "JP Nagar",
    established: "2016",
    description: "Underrated gem with fantastic pizza and consistent beers. Worth the trip to JP Nagar.",
    rating: "4.6",
    priceRange: "₹₹₹",
    specialties: ["Vienna Lager", "Wheat Beer", "IPA"],
    mustTry: "Vienna Lager + their wood-fired pizza",
    ambiance: "Laid-back, local crowd",
    address: "19th Main, JP Nagar 6th Phase",
    timings: "12PM - 11PM",
  },
  {
    name: "The Biere Club",
    area: "Lavelle Road",
    established: "2011",
    description: "Central location with great beers. Popular after-work spot.",
    rating: "4.4",
    priceRange: "₹₹₹",
    specialties: ["Wheat Beer", "Lager", "Dark Lager"],
    mustTry: "Dark Lager - malty and smooth",
    ambiance: "After-work crowd, gets busy",
    address: "Lavelle Road, near UB City",
    timings: "12PM - 11:30PM",
  },
  {
    name: "Red Rhino",
    area: "Whitefield",
    established: "2018",
    description: "Modern Whitefield brewery with creative brews and good vibes.",
    rating: "4.3",
    priceRange: "₹₹₹",
    specialties: ["Belgian Blonde", "Irish Red", "Porter"],
    mustTry: "Irish Red - balanced and easy drinking",
    ambiance: "Modern, IT crowd",
    address: "Whitefield Main Road",
    timings: "12PM - 11PM",
  },
];

const beerStyles = [
  { name: "Wheat Beer", description: "Light, refreshing, slightly sweet. Perfect for Bangalore weather.", count: "Most popular" },
  { name: "IPA", description: "Hoppy, bitter, bold. For those who love big flavors.", count: "Trending" },
  { name: "Lager", description: "Clean, crisp, easy drinking. Great for newcomers.", count: "Classic" },
  { name: "Stout", description: "Dark, roasty, coffee notes. Best for cooler evenings.", count: "Winter favorite" },
  { name: "Belgian", description: "Fruity, complex, high ABV. Connoisseur's choice.", count: "Premium" },
];

export default function BreweriesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-orange-900/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-amber-400 text-sm">Breweries</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Bangalore <span className="text-gradient">Breweries</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
              India&apos;s craft beer capital. With 50+ microbreweries, Bangalore has more 
              brewpubs than any other Indian city. Here are the best ones.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full text-sm">
                🍺 50+ Microbreweries
              </span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                📍 All Areas Covered
              </span>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                ⭐ Top Rated Only
              </span>
            </div>
          </div>
        </section>

        {/* Beer Styles */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-extralight text-white mb-6">Popular Beer Styles</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {beerStyles.map((style) => (
                <div
                  key={style.name}
                  className="p-4 rounded-xl bg-black border border-zinc-800"
                >
                  <h3 className="text-white font-light mb-1">{style.name}</h3>
                  <p className="text-xs text-zinc-500 mb-2">{style.description}</p>
                  <span className="text-xs text-amber-400">{style.count}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Breweries List */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl font-extralight text-white">Top Breweries</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
            </div>

            <div className="space-y-6">
              {breweries.map((brewery, index) => (
                <div
                  key={brewery.name}
                  className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 overflow-hidden transition-all"
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
                          <span className="text-sm">{brewery.rating}</span>
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-2xl font-light text-white group-hover:text-amber-300 transition-colors">
                            {brewery.name}
                          </h3>
                          <span className="px-3 py-1 bg-amber-500/10 text-amber-300 text-xs rounded-full">
                            {brewery.area}
                          </span>
                          <span className="text-zinc-500 text-sm">Est. {brewery.established}</span>
                        </div>
                        
                        <p className="text-zinc-400 mb-4 leading-relaxed">
                          {brewery.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-zinc-500">Must Try:</span>
                            <span className="text-white ml-2">{brewery.mustTry}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Ambiance:</span>
                            <span className="text-white ml-2">{brewery.ambiance}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Timings:</span>
                            <span className="text-white ml-2">{brewery.timings}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Price Range:</span>
                            <span className="text-amber-300 ml-2">{brewery.priceRange}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {brewery.specialties.map((beer) => (
                            <span
                              key={beer}
                              className="px-3 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full"
                            >
                              {beer}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              Bangalore Brewery Guide
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Bangalore&apos;s microbrewery revolution started in 2010 when Toit opened its 
                doors in Indiranagar. Since then, the city has become home to over 50 
                craft breweries, earning its title as India&apos;s Pub Capital.
              </p>
              
              <h3 className="text-xl text-white mt-8 mb-4">Why Bangalore for Craft Beer?</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                The city&apos;s moderate climate is perfect for beer drinking year-round. 
                A young, cosmopolitan population with disposable income created the 
                perfect market. And liberal licensing laws made it possible for breweries 
                to flourish.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Best Areas for Brewery Hopping</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li><strong className="text-white">Indiranagar:</strong> Toit, 612 East, and more within walking distance</li>
                <li><strong className="text-white">Koramangala:</strong> The Bier Library and several others</li>
                <li><strong className="text-white">Whitefield:</strong> Windmills, Red Rhino - premium experiences</li>
                <li><strong className="text-white">JP Nagar:</strong> Pump House - the local favorite</li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Pro Tips</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li>Weekends are packed - arrive before 7 PM for a table</li>
                <li>Order a tasting flight to try multiple beers</li>
                <li>Most breweries have great food - don&apos;t skip the pub grub</li>
                <li>Prices are similar across breweries - ₹350-450 per pint</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
