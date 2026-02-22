import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Windmills Craftworks Bangalore — Whitefield Brewery (2026)",
  description: "Windmills Craftworks in Whitefield - premium craft beer, Belgian styles, and refined brewery experience. Menu, timings, and what to expect.",
  keywords: "windmills craftworks bangalore, windmills whitefield, whitefield brewery, belgian beer bangalore",
};

const beers = [
  { name: "Belgian Wit", style: "Witbier", abv: "4.8%", description: "Crisp and refreshing with citrus and coriander notes." },
  { name: "Hefeweizen", style: "Wheat Beer", abv: "5.2%", description: "Classic Bavarian wheat with banana and clove." },
  { name: "Belgian Tripel", style: "Tripel", abv: "8.5%", description: "Complex, strong, and deceptively smooth." },
  { name: "Pilsner", style: "Pilsner", abv: "4.5%", description: "Clean and crisp. Perfect session beer." },
];

export default function WindmillsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[2/1] md:aspect-[3/1]">
            <img 
              src="https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=1920&q=80" 
              alt="Windmills Craftworks"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <span className="text-amber-400 text-2xl">🍺</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                Windmills Craftworks
              </h1>
              <p className="text-lg text-white/90">Whitefield • Brewpub</p>
            </div>
          </div>
        </section>

        <div className="bg-amber-50 border-b border-amber-200 px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-sm">
            <span className="text-amber-900">⏰ 12pm – 11:30pm</span>
            <span className="text-amber-900">💰 ₹1,400-1,800 for two</span>
            <span className="text-amber-900">🍺 Belgian Specialists</span>
            <span className="text-amber-900">📍 Whitefield Main Road</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              <strong>Windmills Craftworks</strong> brought craft beer culture to Whitefield, 
              giving the tech corridor a brewery to call its own. The space is beautiful — 
              exposed brick, copper tanks, warm lighting — and the beer matches the setting.
            </p>
            <p>
              Their <strong>Belgian-style beers</strong> are the standout. The Wit and Tripel 
              show real craftsmanship, and the overall experience is more refined than the 
              typical rowdy brewery scene.
            </p>
            <p>
              It's also more family-friendly than most, with good outdoor seating and a 
              less chaotic weekend vibe.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-stone-900 mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["Belgian Beer", "Whitefield IT Crowd", "Couples", "Refined Vibes", "After-Work"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200">{tag}</span>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">🍺 Signature Beers</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {beers.map((beer) => (
                <div key={beer.name} className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-900">{beer.name}</h3>
                  <p className="text-amber-600 text-sm">{beer.style} • {beer.abv}</p>
                  <p className="text-stone-600 text-sm mt-2">{beer.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Related</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/neighborhoods/whitefield" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Whitefield Guide →
              </Link>
              <Link href="/guides/best-breweries-bangalore" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                All Breweries →
              </Link>
            </div>
          </section>

          <div className="text-center text-sm text-stone-500">Last updated: February 2026</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
