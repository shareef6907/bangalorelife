import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Coffee Shops in Bangalore 2025 — Third Wave & Specialty | BangaloreLife",
  description: "Third wave coffee, specialty roasters, and the best cappuccinos in town. Guide to Bangalore's coffee scene.",
  keywords: "coffee shops bangalore, best cafes bangalore, third wave coffee, blue tokai bangalore, specialty coffee bangalore",
};

const faqs = [
  { question: "What is the best coffee shop in Bangalore?", answer: "Third Wave Coffee Roasters is the most popular specialty coffee chain. For single-origin and pour-overs, try Blue Tokai, Subko, or Maverick & Farmer." },
  { question: "Where can I get filter coffee in Bangalore?", answer: "For authentic South Indian filter coffee, try Brahmin's Coffee Bar (Basavanagudi), Vidyarthi Bhavan, or Indian Coffee House." },
  { question: "Are there good cafes for remote work in Bangalore?", answer: "Yes! Third Wave, Dialogues Cafe, and Starbucks Reserve offer WiFi and work-friendly environments." },
];

export default function CoffeeShopsGuidePage() {
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
          <span className="text-white">Best Coffee Shops</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Cafes</span>
            <span className="text-zinc-500 text-sm">8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Best Coffee Shops in Bangalore</h1>
          <p className="text-xl text-zinc-400">Third wave coffee, specialty roasters, and the best cappuccinos in town.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80" alt="Coffee Shops Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Coffee Culture in Bangalore</h2>
          <p>Bangalore&apos;s coffee scene spans from traditional South Indian filter kaapi to world-class third wave roasters. Here&apos;s your caffeine guide.</p>
          
          <h2>Third Wave / Specialty Coffee</h2>
          <h3>Third Wave Coffee Roasters</h3>
          <p>The chain that started it all. Single-origin beans, skilled baristas, and work-friendly spaces. 20+ locations across the city.</p>
          
          <h3>Blue Tokai</h3>
          <p>Delhi-born roaster now in Bangalore. Great pour-overs and retail beans. Indiranagar and Koramangala locations.</p>
          
          <h3>Subko</h3>
          <p>Mumbai&apos;s beloved roaster. Beautiful space in Indiranagar. Try their signature cold brew.</p>
          
          <h3>Maverick & Farmer</h3>
          <p>Homegrown Coorg coffee. Great single-origins from their own estates.</p>
          
          <h3>Dyu Art Cafe</h3>
          <p>Art gallery meets cafe. Beautiful space with rotating exhibitions and excellent filter coffee.</p>
          
          <h2>Traditional Filter Coffee</h2>
          <h3>Brahmin&apos;s Coffee Bar</h3>
          <p>Since 1960. Authentic filter coffee and idli-vada in a no-frills setting. Cash only. Basavanagudi.</p>
          
          <h3>Vidyarthi Bhavan</h3>
          <p>Legendary crispy dosas and strong filter coffee. Always a queue. Gandhi Bazaar.</p>
          
          <h3>Indian Coffee House</h3>
          <p>Heritage cafe with waiters in signature caps. Cheap filter coffee and classic snacks. MG Road.</p>
          
          <h3>CTR — Malleshwaram</h3>
          <p>Famous for benne dosa, but the filter coffee is equally good.</p>
          
          <h2>Best for Working</h2>
          <ul>
            <li><strong>Third Wave:</strong> Reliable WiFi, good seating, multiple outlets</li>
            <li><strong>Dialogues Cafe:</strong> Coworking + cafe hybrid, dedicated work spaces</li>
            <li><strong>Starbucks Reserve:</strong> Premium, quieter locations</li>
            <li><strong>Matteo Coffea:</strong> Quiet, great for focused work</li>
          </ul>
          
          <h2>Best Pastries with Coffee</h2>
          <ul>
            <li><strong>Glen&apos;s Bakehouse:</strong> Best croissants in the city</li>
            <li><strong>The French Loaf:</strong> Wide variety of pastries</li>
            <li><strong>Lavonne:</strong> Premium patisserie</li>
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
          <h2 className="text-xl font-bold mb-4">More Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-cafes-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Cafes</Link>
            <Link href="/guides/best-coworking-spaces-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Coworking Spaces</Link>
            <Link href="/cafes" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm transition-colors">All Cafes</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
