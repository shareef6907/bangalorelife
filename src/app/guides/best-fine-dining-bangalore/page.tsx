import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Fine Dining Restaurants in Bangalore 2025 | BangaloreLife",
  description: "Michelin-worthy experiences, tasting menus, and special occasion restaurants in Bangalore.",
  keywords: "fine dining bangalore, best restaurants bangalore, luxury restaurants bangalore, karavalli, le cirque bangalore",
};

const faqs = [
  { question: "What is the most expensive restaurant in Bangalore?", answer: "Le Cirque at The Leela Palace and Karavalli at Taj Gateway are among the most expensive, with meals for two running ₹8,000-15,000+." },
  { question: "Do I need reservations for fine dining in Bangalore?", answer: "Yes, especially for weekend dinners. Book at least 2-3 days ahead for popular restaurants like Karavalli, Le Cirque, and Caperberry." },
  { question: "What is the dress code for fine dining in Bangalore?", answer: "Smart casual to business casual. Avoid shorts, flip-flops, and sleeveless shirts. Some places require closed shoes for men." },
];

export default function FineDiningGuidePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer }}))
      })}} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/guides" className="hover:text-white">Guides</Link><span>/</span>
          <span className="text-white">Fine Dining</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Food</span>
            <span className="text-zinc-500 text-sm">9 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Best Fine Dining Restaurants in Bangalore</h1>
          <p className="text-xl text-zinc-400">Michelin-worthy experiences, tasting menus, and special occasion restaurants.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80" alt="Fine Dining Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Fine Dining in Bangalore</h2>
          <p>When you want to celebrate, impress, or simply eat exceptionally well, these restaurants deliver world-class experiences.</p>
          
          <h2>The Icons</h2>
          <h3>Karavalli — Taj Gateway</h3>
          <p>Coastal Karnataka cuisine elevated to art. The crab ghee roast and appam with stew are legendary. ₹4,000-6,000 for two. Book days ahead. Residency Road.</p>
          
          <h3>Le Cirque Signature — The Leela Palace</h3>
          <p>French-Italian fine dining in one of India&apos;s most beautiful hotel restaurants. Tasting menus that rival international standards. ₹8,000+ for two. Old Airport Road.</p>
          
          <h3>Caperberry — The Leela Palace</h3>
          <p>Modern European with molecular gastronomy touches. Chef&apos;s tasting menu is the way to go. ₹6,000+ for two.</p>
          
          <h2>Modern Indian</h2>
          <h3>Grasshopper</h3>
          <p>Farm-to-table Indian cuisine in a beautiful bungalow setting. Seasonal menus, beautiful ambiance. Koramangala.</p>
          
          <h3>The Fatty Bao</h3>
          <p>Modern Asian with creative presentations. Great for groups who want something special. Multiple locations.</p>
          
          <h2>International</h2>
          <h3>Olive Beach</h3>
          <p>Mediterranean fine dining in a stunning white villa. Perfect for anniversaries and proposals. JP Nagar. ₹4,000-6,000 for two.</p>
          
          <h3>Ottimo — ITC Gardenia</h3>
          <p>Authentic Italian with handmade pasta and wood-fired pizzas. Business lunch favorite. ₹3,000-4,000 for two.</p>
          
          <h2>Asian Fine Dining</h2>
          <h3>Shiro — UB City</h3>
          <p>Pan-Asian in a dramatic Buddha-themed setting. Great for groups and celebrations. ₹4,000-6,000 for two.</p>
          
          <h3>The Tao Terraces — MG Road</h3>
          <p>Rooftop Asian with city views. Good for special occasions. ₹3,000-4,000 for two.</p>
          
          <h2>Tips for Fine Dining</h2>
          <ul>
            <li>Book at least 3 days ahead for weekends</li>
            <li>Mention special occasions when booking — most restaurants will add special touches</li>
            <li>Budget ₹5,000-10,000 for two with drinks at top restaurants</li>
            <li>Most accept major credit cards</li>
            <li>Valet parking is usually available at hotel restaurants</li>
          </ul>
        </article>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-zinc-900 rounded-xl p-4 group">
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center">{faq.question}<span className="text-violet-400 group-open:rotate-180 transition-transform">▼</span></summary>
                <p className="mt-3 text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">More Food Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-restaurants-bangalore-2025" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">All Restaurants</Link>
            <Link href="/guides/best-brunches-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Brunches</Link>
            <Link href="/restaurants" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm transition-colors">Restaurant Section</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
