import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Byg Brewski Bangalore — Massive Brewery with Lake Views",
  description: "Byg Brewski Brewing Company - Bangalore's biggest brewery space. Hennur and Sarjapur locations with outdoor seating, lake views, and craft beer.",
  keywords: "byg brewski bangalore, byg brewski hennur, byg brewski sarjapur, bangalore brewery, outdoor brewery bangalore",
};

export default function BygBrewskiPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[2/1] md:aspect-[3/1]">
            <img 
              src="https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=1920&q=80" 
              alt="Byg Brewski"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <span className="text-amber-400 text-2xl">🍺</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                Byg Brewski Brewing Company
              </h1>
              <p className="text-lg text-white/90">Hennur • Sarjapur • Mega Brewery</p>
            </div>
          </div>
        </section>

        <div className="bg-amber-50 border-b border-amber-200 px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-sm">
            <span className="text-amber-900">⏰ 12pm – 1am</span>
            <span className="text-amber-900">💰 ₹1,200-1,600 for two</span>
            <span className="text-amber-900">🌳 Massive Outdoor Space</span>
            <span className="text-amber-900">📍 Hennur Road (flagship)</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              <strong>Go big or go home</strong> — that's the Byg Brewski philosophy. Their Hennur 
              location is one of the largest brewery spaces in India, sprawling across multiple 
              acres with outdoor seating, multiple bars, and a capacity that rivals small music festivals.
            </p>
            <p>
              The beer is solid — perhaps not as cutting-edge as Toit or Arbor, but consistently 
              good and perfect for session drinking. Their Hefeweizen and Belgian Wit are crowd-pleasers.
            </p>
            <p>
              But Byg Brewski is really about the <strong>experience</strong>. This is where you bring 
              a large group for a Sunday afternoon, where you celebrate birthdays and promotions, 
              where you spend entire days moving between the different seating areas.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-stone-900 mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["Large Groups", "Sunday Sessions", "Outdoor Drinking", "Birthdays", "Day Drinking", "Lake Views (Hennur)"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200">{tag}</span>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Locations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-stone-200">
                <h3 className="font-semibold text-stone-900">Hennur (Flagship)</h3>
                <p className="text-stone-600 text-sm mt-1">The original and biggest. Lake views, multiple levels, massive capacity.</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-stone-200">
                <h3 className="font-semibold text-stone-900">Sarjapur Road</h3>
                <p className="text-stone-600 text-sm mt-1">South Bangalore outpost. Equally large, equally fun.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Related</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/best-breweries-bangalore" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                All Breweries →
              </Link>
              <Link href="/venues/uru-brewpark" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Uru Brewpark →
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
