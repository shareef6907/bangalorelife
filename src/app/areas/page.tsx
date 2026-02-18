import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Areas Guide - Neighborhoods & Localities",
  description: "Explore Bangalore's neighborhoods. From Indiranagar's nightlife to Koramangala's startups, MG Road's heritage to Whitefield's tech scene.",
  openGraph: {
    title: "Bangalore Areas & Neighborhoods Guide | BangaloreLife",
    description: "Discover Bangalore's diverse neighborhoods - each with its own character and vibe.",
  },
};

const areas = [
  {
    name: "Indiranagar",
    slug: "indiranagar",
    tagline: "Nightlife Capital",
    description: "The 12th Main strip is packed with breweries, pubs, and restaurants. Trendy, always buzzing.",
    highlights: ["Toit Brewpub", "12th Main nightlife", "Boutique shopping"],
    vibe: "Trendy • Hip • Expensive",
    bestFor: "Nightlife, dining, shopping",
    gradient: "from-violet-600/20 to-purple-900/20",
  },
  {
    name: "Koramangala",
    slug: "koramangala",
    tagline: "Startup Central",
    description: "Where founders hang out. Young crowd, affordable options, great food variety.",
    highlights: ["Dyu Art Cafe", "5th Block food", "Startup vibes"],
    vibe: "Young • Affordable • Casual",
    bestFor: "Groups, casual dining, budget nights",
    gradient: "from-emerald-600/20 to-teal-900/20",
  },
  {
    name: "MG Road",
    slug: "mg-road",
    tagline: "Classic Bangalore",
    description: "The original party district. Rooftop bars, heritage restaurants, connected to Brigade & Church Street.",
    highlights: ["Skyye rooftop", "Pecos rock bar", "Heritage cafes"],
    vibe: "Classic • Upscale • Mixed crowd",
    bestFor: "Rooftop bars, special occasions, shopping",
    gradient: "from-blue-600/20 to-indigo-900/20",
  },
  {
    name: "Whitefield",
    slug: "whitefield",
    tagline: "IT Hub",
    description: "Tech parks and premium breweries. Modern, spacious venues for the IT crowd.",
    highlights: ["Windmills Craftworks", "Phoenix Marketcity", "Tech park scene"],
    vibe: "Modern • Professional • Premium",
    bestFor: "After-work drinks, dates, tech crowd",
    gradient: "from-cyan-600/20 to-blue-900/20",
  },
  {
    name: "HSR Layout",
    slug: "hsr-layout",
    tagline: "Young Professionals",
    description: "Growing nightlife scene near Electronic City. Good cafes and restaurants.",
    highlights: ["Third Wave Coffee", "Local gems", "Residential vibes"],
    vibe: "Residential • Upcoming • Young",
    bestFor: "Cafes, casual dining, neighborhood feel",
    gradient: "from-pink-600/20 to-rose-900/20",
  },
  {
    name: "JP Nagar",
    slug: "jp-nagar",
    tagline: "Local Favorite",
    description: "Home to underrated gems like Pump House. Less touristy, more local.",
    highlights: ["Pump House brewery", "South Bangalore vibes", "Local crowd"],
    vibe: "Local • Underrated • Authentic",
    bestFor: "Breweries, local experience, less crowds",
    gradient: "from-amber-600/20 to-orange-900/20",
  },
  {
    name: "Jayanagar",
    slug: "jayanagar",
    tagline: "Family-Friendly",
    description: "Traditional shopping complex, family restaurants, South Indian heritage.",
    highlights: ["4th Block market", "Traditional food", "Shopping"],
    vibe: "Family • Traditional • Local",
    bestFor: "Family outings, traditional food, shopping",
    gradient: "from-green-600/20 to-emerald-900/20",
  },
  {
    name: "Malleshwaram",
    slug: "malleshwaram",
    tagline: "Old Bangalore",
    description: "Heritage area with traditional markets, temples, and authentic South Indian food.",
    highlights: ["CTR dosas", "Traditional markets", "Temple visits"],
    vibe: "Heritage • Cultural • Traditional",
    bestFor: "Traditional food, cultural experience, heritage",
    gradient: "from-yellow-600/20 to-amber-900/20",
  },
];

export default function AreasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-purple-900/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Explore <span className="text-gradient">Bangalore</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Every neighborhood has its own character. From nightlife hubs to 
              heritage corners, discover what makes each area special.
            </p>
          </div>
        </section>

        {/* Areas Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${area.gradient} border border-zinc-800 hover:border-violet-500/30 transition-all card-hover`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-light text-white group-hover:text-violet-300 transition-colors">
                        {area.name}
                      </h2>
                      <span className="text-sm text-violet-400">{area.tagline}</span>
                    </div>
                    <span className="text-violet-400 text-sm group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                  
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                    {area.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {area.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 bg-black/30 text-zinc-300 text-xs rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{area.vibe}</span>
                    <span className="text-zinc-600">Best for: {area.bestFor}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-extralight text-white mb-8">
              Know Your Bangalore
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 leading-relaxed">
                Bangalore is a city of neighborhoods. The vibe changes dramatically 
                as you move from area to area. <strong className="text-white">Indiranagar 
                and Koramangala</strong> dominate the nightlife scene. <strong className="text-white">MG Road</strong> offers 
                the classic Bangalore experience. <strong className="text-white">Whitefield</strong> caters to 
                the IT crowd. And areas like <strong className="text-white">Malleshwaram and Jayanagar</strong> preserve 
                the old Bangalore charm.
              </p>
              <p className="text-zinc-400 leading-relaxed mt-6">
                Getting around? The metro (Namma Metro) connects many key areas on 
                the Purple and Green lines. For everywhere else, Uber and Ola are 
                your best friends. Traffic is notorious, so plan accordingly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
