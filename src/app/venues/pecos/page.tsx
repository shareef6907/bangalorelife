import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pecos Bangalore — The Legendary Rock Pub Since 1979",
  description: "Pecos on Brigade Road - Bangalore's oldest and most legendary pub. Rock music, cheap beer, and pure pub culture since 1979.",
  keywords: "pecos bangalore, pecos brigade road, bangalore rock pub, oldest pub bangalore, brigade road bars",
};

export default function PecosPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[2/1] md:aspect-[3/1]">
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80" 
              alt="Pecos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <span className="text-red-400 text-2xl">🎸</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                Pecos
              </h1>
              <p className="text-lg text-white/90">Brigade Road • Rock Pub • Est. 1979</p>
            </div>
          </div>
        </section>

        <div className="bg-red-50 border-b border-red-200 px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-sm">
            <span className="text-red-900">⏰ 11am – 11pm</span>
            <span className="text-red-900">💰 ₹500-800 for two</span>
            <span className="text-red-900">🎵 Rock Music Always</span>
            <span className="text-red-900">📍 Rest House Road, Brigade</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              The grandfather of Bangalore pubs. <strong>Pecos</strong> has been serving pitchers 
              and playing rock music since <strong>1979</strong> — before most of us were born.
            </p>
            <p>
              There's nothing fancy here: dark interiors, loud rock music, sticky tables, and cheap 
              beer. That's the point. Pecos is a pure, unadulterated pub experience. No craft 
              cocktails, no fusion food, no Instagram-worthy interiors. Just beer, rock, and vibes.
            </p>
            <p>
              <strong>Skip this one at your own risk.</strong> You can't claim to know Bangalore 
              nightlife without a Pecos visit. This is where the city's pub culture was born.
            </p>
          </section>

          <section className="mb-12 bg-red-50 rounded-xl p-6 border border-red-200">
            <h2 className="text-lg font-semibold text-red-900 mb-4">The Pecos Experience</h2>
            <ul className="space-y-2 text-red-800 text-sm">
              <li>• <strong>Music:</strong> Rock, rock, and more rock. Classic and modern.</li>
              <li>• <strong>Drinks:</strong> Pitchers are the move. Cheap and cheerful.</li>
              <li>• <strong>Food:</strong> Chicken Lollipops, fries. Keep it simple.</li>
              <li>• <strong>Crowd:</strong> Mixed. Students, professionals, tourists, veterans.</li>
              <li>• <strong>Vibe:</strong> No pretense. Just a good time.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-stone-900 mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["Rock Lovers", "Budget Drinking", "Bangalore History", "Pub Crawl Essential", "No-Frills Fun"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm border border-red-200">{tag}</span>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Part of the Brigade Road Crawl</h2>
            <p className="text-stone-600 mb-4">Pecos is essential to any Brigade Road pub crawl. Here's our suggested route:</p>
            <div className="bg-stone-100 rounded-xl p-4">
              <ol className="text-sm text-stone-700 space-y-2">
                <li>1. Start at 13th Floor (sundowners)</li>
                <li>2. Arbor Brewing Company (craft beer)</li>
                <li>3. <strong>Pecos (you are here)</strong> — pitchers and rock</li>
                <li>4. Hard Rock Cafe (live music finale)</li>
              </ol>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Related</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/neighborhoods/mg-road-brigade-road" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                MG Road Guide →
              </Link>
              <Link href="/guides/best-pubs-bangalore" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Best Pubs →
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
