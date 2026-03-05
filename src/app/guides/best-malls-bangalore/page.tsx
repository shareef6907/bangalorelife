import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Malls in Bangalore 2025 — Complete Shopping Guide | BangaloreLife",
  description: "Phoenix Marketcity, UB City, Orion Mall and more. Complete guide to shopping malls in Bangalore with stores, restaurants, and entertainment options.",
  keywords: "malls in bangalore, best malls bangalore, phoenix marketcity, ub city mall, orion mall, shopping bangalore",
};

const faqs = [
  { question: "Which is the biggest mall in Bangalore?", answer: "Phoenix Marketcity in Whitefield is the largest with over 1.4 million sq ft of retail space, followed by Orion Mall and Lulu Mall." },
  { question: "Which mall is best for luxury shopping in Bangalore?", answer: "UB City Mall is Bangalore's premier luxury destination with brands like Louis Vuitton, Gucci, Burberry, and Canali." },
  { question: "What time do malls open and close in Bangalore?", answer: "Most malls open at 10 AM and close at 10 PM. Food courts and cinemas may stay open until 11 PM." },
];

export default function BestMallsPage() {
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
          <span className="text-white">Best Malls</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Shopping</span>
            <span className="text-zinc-500 text-sm">10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Best Malls in Bangalore: Complete Shopping Guide</h1>
          <p className="text-xl text-zinc-400">Phoenix Marketcity, UB City, Orion Mall and more. Everything you need to know about shopping in Bangalore.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80" alt="Best Malls in Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Shopping in Bangalore</h2>
          <p>Bangalore has transformed into a shopping paradise with malls ranging from luxury to budget-friendly. Here&apos;s your complete guide to the best shopping destinations in the city.</p>
          
          <h2>Top 10 Malls in Bangalore</h2>
          
          <h3>1. Phoenix Marketcity — Whitefield</h3>
          <p>The king of Bangalore malls. With 300+ stores, a massive food court, PVR, and entertainment zones, this is a full-day destination. <Link href="/malls/phoenix-marketcity" className="text-violet-400">View Details →</Link></p>
          <p><strong>Best for:</strong> Everything — fashion, electronics, dining, entertainment</p>
          
          <h3>2. UB City Mall — Vittal Mallya Road</h3>
          <p>Bangalore&apos;s only luxury mall. Home to Louis Vuitton, Gucci, Rolex, and the city&apos;s finest restaurants. <Link href="/malls/ub-city" className="text-violet-400">View Details →</Link></p>
          <p><strong>Best for:</strong> Luxury shopping, fine dining</p>
          
          <h3>3. Orion Mall — Rajajinagar</h3>
          <p>Massive mall with Metro connectivity. Great mix of brands, excellent food court, and IMAX cinema. <Link href="/malls/orion-mall" className="text-violet-400">View Details →</Link></p>
          <p><strong>Best for:</strong> Families, movies, weekend shopping</p>
          
          <h3>4. Mantri Square Mall — Malleshwaram</h3>
          <p>Connected to Mantri Square Metro station. Lifestyle, Central, and plenty of dining options. <Link href="/malls/mantri-square-mall" className="text-violet-400">View Details →</Link></p>
          
          <h3>5. Nexus Koramangala (Forum Mall)</h3>
          <p>Koramangala&apos;s favorite mall. Great for catching up with friends over food and shopping. <Link href="/malls/nexus-mall-koramangala" className="text-violet-400">View Details →</Link></p>
          
          <h3>6. VR Bengaluru — Whitefield</h3>
          <p>Premium mall with great restaurants and IMAX cinema. Less crowded than Phoenix. <Link href="/malls/vr-bengaluru" className="text-violet-400">View Details →</Link></p>
          
          <h3>7. Lulu Mall — Rajajinagar</h3>
          <p>Newest addition to Bangalore&apos;s mall scene. Massive hypermarket and great brand mix.</p>
          
          <h2>By Category</h2>
          <h3>Best for Electronics</h3>
          <ul>
            <li>Croma and Reliance Digital at most major malls</li>
            <li>SP Road for budget electronics and repairs</li>
            <li>Phoenix Marketcity has the biggest electronics floor</li>
          </ul>
          
          <h3>Best for Fashion</h3>
          <ul>
            <li>Zara, H&M, Uniqlo at Phoenix, Orion, VR Bengaluru</li>
            <li>UB City for luxury (Gucci, LV, Armani)</li>
            <li>Commercial Street for budget fashion</li>
          </ul>
          
          <h2>Pro Tips</h2>
          <ul>
            <li>Weekday evenings are less crowded</li>
            <li>Most malls have paid parking (₹20-50 for 2 hours)</li>
            <li>Download mall apps for loyalty points and offers</li>
            <li>Food courts are cheaper than standalone restaurants</li>
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
          <h2 className="text-xl font-bold mb-4">More Bangalore Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/malls" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm transition-colors">Browse All Malls</Link>
            <Link href="/guides/best-restaurants-bangalore-2025" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Restaurants</Link>
            <Link href="/guides/best-cafes-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Cafes</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
