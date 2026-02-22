import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Bier Library Bangalore — Craft Beer, Menu, Reviews (2026)",
  description: "The Bier Library in Koramangala - Bangalore's destination for craft beer enthusiasts. Rotating taps, rare styles, and a beer-forward experience.",
  keywords: "bier library bangalore, bier library koramangala, craft beer koramangala, bangalore craft beer bar",
};

const features = [
  { title: "Rotating Taps", description: "The selection changes regularly — always something new to try" },
  { title: "Rare Styles", description: "Belgian tripels, smoked porters, barrel-aged experiments" },
  { title: "Knowledgeable Staff", description: "They actually know beer and can guide your choices" },
  { title: "Industrial Vibes", description: "Brick, steel, and serious about beer" },
];

export default function BierLibraryPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[2/1] md:aspect-[3/1]">
            <img 
              src="https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=1920&q=80" 
              alt="The Bier Library"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <span className="text-amber-400 text-2xl">🍺</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                The Bier Library
              </h1>
              <p className="text-lg text-white/90">Koramangala • Craft Beer Bar</p>
            </div>
          </div>
        </section>

        <div className="bg-amber-50 border-b border-amber-200 px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-sm">
            <span className="text-amber-900">⏰ 12pm – 12:30am</span>
            <span className="text-amber-900">💰 ₹1,000-1,400 for two</span>
            <span className="text-amber-900">📍 Koramangala 5th Block</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-zinc-300 leading-relaxed">
              For beer nerds who want to explore beyond the usual, <strong>The Bier Library</strong> is essential. 
              This industrial-chic space in Koramangala features an impressive selection of craft beers on tap — 
              including styles you won't find anywhere else in the city.
            </p>
            <p>
              The rotating menu keeps things interesting, with everything from Belgian tripels to American IPAs 
              to smoked porters. The staff actually knows their beer and can guide you through the options.
            </p>
            <p>
              The vibe is more relaxed than Toit — less rowdy, more conversational. Great for catching up with 
              friends or a casual date where you actually want to hear each other talk.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["Beer Enthusiasts", "Trying New Styles", "Casual Dates", "Conversation", "Learning About Beer"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-violet-400 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">What Makes It Special</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
                  <h3 className="font-semibold text-white">{f.title}</h3>
                  <p className="text-zinc-400 text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-white mb-4">Related Venues</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/venues/toit-brewpub" className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors">
                Toit Brewpub →
              </Link>
              <Link href="/neighborhoods/koramangala" className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors">
                Koramangala Guide →
              </Link>
            </div>
          </section>

          <div className="text-center text-sm text-zinc-500">Last updated: February 2026</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
