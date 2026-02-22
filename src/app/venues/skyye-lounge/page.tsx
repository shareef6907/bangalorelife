import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Skyye Lounge Bangalore — UB City Rooftop Bar (2026)",
  description: "Skyye Lounge at UB City - Bangalore's most premium rooftop bar with 360° views. Dress code, timings, and what to expect.",
  keywords: "skyye lounge bangalore, ub city rooftop, skyye bangalore, bangalore rooftop bar, bangalore views",
};

export default function SkyyePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[2/1] md:aspect-[3/1]">
            <img 
              src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80" 
              alt="Skyye Lounge"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <span className="text-purple-400 text-2xl">🌆</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                Skyye Lounge
              </h1>
              <p className="text-lg text-white/90">UB City, 16th Floor • Rooftop Lounge</p>
            </div>
          </div>
        </section>

        <div className="bg-purple-50 border-b border-purple-200 px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-sm">
            <span className="text-purple-900">⏰ 7pm – 1:30am</span>
            <span className="text-purple-900">💰 ₹4,000+ for two</span>
            <span className="text-purple-900">👔 Smart Casual Required</span>
            <span className="text-purple-900">📍 UB City Mall, 16th Floor</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-zinc-300 leading-relaxed">
              The crown jewel of Bangalore's rooftop scene. <strong>Skyye</strong> sits atop UB City, 
              the city's most exclusive mall, offering 360-degree views that are simply unmatched.
            </p>
            <p>
              This is where Bangalore comes to celebrate — promotions, anniversaries, birthdays. 
              The crowd is well-heeled, the cocktails are expertly crafted, and the views on a 
              clear night are worth every rupee of the premium pricing.
            </p>
            <p>
              Yes, it's expensive. Yes, there's often a wait for the best tables. But if you're 
              going to do one rooftop in Bangalore, this is the one. <strong>Book ahead for sunset tables.</strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["Special Occasions", "Proposals", "Anniversary", "Best Views", "VIP Experience"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm border border-purple-200">{tag}</span>
              ))}
            </div>
          </section>

          <section className="mb-12 bg-purple-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-purple-900 mb-4">Important Notes</h2>
            <ul className="space-y-2 text-purple-800 text-sm">
              <li>• <strong>Dress code enforced:</strong> Smart casual to formal. No shorts, no slippers.</li>
              <li>• <strong>Reservations recommended:</strong> Especially for weekend sunset tables.</li>
              <li>• <strong>Premium pricing:</strong> Cocktails start at ₹600+. Budget accordingly.</li>
              <li>• <strong>Arrive early:</strong> 6:30-7pm for the best sunset views.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-white mb-4">Related</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/best-rooftop-bars-bangalore" className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors">
                All Rooftop Bars →
              </Link>
              <Link href="/guides/date-night-bangalore" className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors">
                Date Night Ideas →
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
