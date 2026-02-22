import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HSR Layout Guide — Cafes, Bars & The New Cool (2026)",
  description: "HSR Layout guide - Bangalore's quietly cool neighborhood. Best cafes, bars, and why HSR has become one of the most interesting areas in the city.",
  keywords: "hsr layout bangalore, hsr layout cafes, hsr layout bars, hsr layout restaurants, brahma brews, third wave coffee hsr",
};

const highlights = [
  { name: "Brahma Brews", type: "Brewery", description: "Neighborhood craft brewery with solid beers and a chill vibe." },
  { name: "Third Wave Coffee", type: "Cafe", description: "Premium coffee, great Wi-Fi, perfect for remote work." },
  { name: "Druid Garden", type: "Cafe Bar", description: "Garden seating, craft drinks, relaxed atmosphere." },
  { name: "Glen's Bakehouse", type: "Bakery Cafe", description: "Legendary cakes and excellent brunch options." },
];

export default function HSRLayoutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80" 
              alt="HSR Layout Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-emerald-400 font-medium mb-2">Neighborhood Guide</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">HSR Layout</h1>
              <p className="text-xl text-white/90">The New Cool</p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              <strong>HSR Layout</strong> has quietly become one of Bangalore's most interesting 
              neighborhoods. Less pretentious than Indiranagar, less chaotic than Koramangala — 
              HSR has found its own lane.
            </p>
            <p>
              The cafe scene here is excellent, with multiple Third Wave Coffee locations and 
              cozy spots perfect for remote work. The bars are more relaxed, the crowds are 
              younger, and there's a genuine neighborhood feel that's rare in Bangalore.
            </p>
            <p>
              It's also more affordable than the big-name areas. You can have a great night out 
              without the Indiranagar price tag.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">🔥 Top Spots</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {highlights.map((spot) => (
                <div key={spot.name} className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-900">{spot.name}</h3>
                  <p className="text-emerald-600 text-sm">{spot.type}</p>
                  <p className="text-stone-600 text-sm mt-2">{spot.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-stone-900 mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["Cafes", "Remote Work", "Chill Vibes", "Young Crowd", "Affordable", "Less Crowded"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Similar Vibes</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/neighborhoods/koramangala" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Koramangala →
              </Link>
              <Link href="/neighborhoods/jp-nagar-jayanagar" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                JP Nagar →
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
