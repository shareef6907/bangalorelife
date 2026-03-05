import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "15 Best Brunch Spots in Bangalore 2025 | BangaloreLife",
  description: "Lazy weekend brunches, unlimited buffets, and Instagram-worthy spreads. The best brunch spots in Bangalore.",
  keywords: "brunch bangalore, best brunch bangalore, sunday brunch bangalore, bottomless brunch, breakfast bangalore",
};

const faqs = [
  { question: "Which hotel has the best brunch in Bangalore?", answer: "Taj West End's Blue Ginger and ITC Gardenia's Cubbon Pavilion are consistently rated as the best hotel brunches." },
  { question: "How much does brunch cost in Bangalore?", answer: "Cafe brunches: ₹500-1,000. Hotel buffet brunches: ₹2,000-4,000 per person. Luxury brunches with alcohol: ₹3,500-5,000+." },
  { question: "What time is brunch in Bangalore?", answer: "Most brunch spots operate from 11 AM to 3 PM on weekends. Hotel brunches typically run 12:30 PM to 4 PM." },
];

export default function BrunchesGuidePage() {
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
          <span className="text-white">Best Brunches</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Food</span>
            <span className="text-zinc-500 text-sm">9 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Best Brunches in Bangalore</h1>
          <p className="text-xl text-zinc-400">Lazy weekend brunches, unlimited buffets, and Instagram-worthy spreads.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80" alt="Brunch in Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Weekend Brunch Culture</h2>
          <p>Bangalore&apos;s brunch scene has evolved from basic buffets to elaborate culinary experiences. Here&apos;s where to spend your lazy Sunday.</p>
          
          <h2>Hotel Brunches (Premium)</h2>
          <h3>Taj West End — Blue Ginger</h3>
          <p>The Sunday brunch to end all brunches. Vietnamese cuisine with unlimited bubbles. ₹4,500 with alcohol. Book a week ahead.</p>
          
          <h3>ITC Gardenia — Cubbon Pavilion</h3>
          <p>Massive spread covering cuisines from around the world. Live counters everywhere. ₹3,500+.</p>
          
          <h3>The Leela Palace</h3>
          <p>Opulent setting, champagne brunch. Perfect for special occasions. ₹5,000+.</p>
          
          <h3>JW Marriott — JW Kitchen</h3>
          <p>Family-friendly with excellent variety. Great dessert section. ₹3,000+.</p>
          
          <h2>Cafe Brunches (Casual)</h2>
          <h3>Smoke House Deli</h3>
          <p>European-style brunch with excellent eggs benedict and pancakes. Multiple locations.</p>
          
          <h3>Glen&apos;s Bakehouse</h3>
          <p>Best pastries, great coffee. Come early for fresh croissants.</p>
          
          <h3>Cafe Azzure — Koramangala</h3>
          <p>All-day breakfast menu. The Full English is solid.</p>
          
          <h3>The Fatty Bao</h3>
          <p>Asian brunch with dim sum and baos. Fun, casual vibe.</p>
          
          <h2>Bottomless Brunches</h2>
          <ul>
            <li><strong>Toast & Tonic:</strong> Unlimited prosecco brunch</li>
            <li><strong>Arbor Brewing:</strong> Beer brunch with craft pours</li>
            <li><strong>Olive Beach:</strong> Mediterranean brunch with drinks</li>
            <li><strong>Sanchez:</strong> Mexican brunch with margaritas</li>
          </ul>
          
          <h2>Budget-Friendly Breakfast</h2>
          <ul>
            <li><strong>CTR Malleshwaram:</strong> Benne dosa for ₹50</li>
            <li><strong>Brahmin&apos;s Coffee Bar:</strong> Idli-vada-coffee for ₹100</li>
            <li><strong>Vidyarthi Bhavan:</strong> Crispy dosa for ₹80</li>
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
            <Link href="/guides/best-restaurants-bangalore-2025" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Restaurants</Link>
            <Link href="/guides/best-cafes-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Cafes</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
