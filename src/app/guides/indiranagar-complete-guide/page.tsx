import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Indiranagar Guide 2025 — Best Bars, Cafes & Restaurants | BangaloreLife",
  description: "The complete guide to Indiranagar. Best cafes, bars, restaurants, breweries and things to do in Bangalore's coolest neighborhood.",
  keywords: "indiranagar bangalore, indiranagar cafes, indiranagar bars, toit brewpub, 100 feet road, indiranagar restaurants",
};

const faqs = [
  { question: "Why is Indiranagar famous?", answer: "Indiranagar is Bangalore's coolest neighborhood, known for its cafe culture, craft beer scene (Toit!), boutique shopping on 100 Feet Road, and vibrant nightlife." },
  { question: "What are the best bars in Indiranagar?", answer: "Toit Brewpub is the most famous. Also check out Toast & Tonic, Bob's Bar, Sanchez, and The Permit Room for diverse vibes." },
  { question: "Is Indiranagar expensive?", answer: "It's one of the pricier neighborhoods in Bangalore. Expect to pay premium prices at most establishments, though there are budget-friendly options too." },
];

export default function IndiranagarGuidePage() {
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
          <span className="text-white">Indiranagar Guide</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Neighborhoods</span>
            <span className="text-zinc-500 text-sm">14 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Indiranagar Food & Nightlife Guide</h1>
          <p className="text-xl text-zinc-400">The complete guide to Bangalore&apos;s coolest neighborhood. Best cafes, bars, restaurants and things to do.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80" alt="Indiranagar Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Welcome to Indiranagar</h2>
          <p>Indiranagar is where Bangalore&apos;s creative class comes to play. This tree-lined neighborhood has transformed from a quiet residential area into the city&apos;s most vibrant food and nightlife destination.</p>
          
          <h2>The Iconic Spots</h2>
          <h3>Toit Brewpub</h3>
          <p>The brewery that started Bangalore&apos;s craft beer revolution. Since 2010, Toit has been the gold standard. The Toit Weiss and Tintin Toit are must-tries. Always packed, especially weekends. <Link href="/venues/toit-brewpub" className="text-violet-400">View Details →</Link></p>
          
          <h3>100 Feet Road</h3>
          <p>The main artery of Indiranagar&apos;s cafe and bar scene. Walk from one end to the other and you&apos;ll pass 50+ establishments. Start at Toit, end at The Permit Room.</p>
          
          <h2>Best Cafes</h2>
          <h3>Third Wave Coffee Roasters</h3>
          <p>The cafe that brought specialty coffee to Bangalore. Great for remote work with fast WiFi and good coffee.</p>
          
          <h3>Dyu Art Cafe</h3>
          <p>Art gallery meets cafe. Beautiful space with rotating exhibitions and excellent filter coffee.</p>
          
          <h3>Glen&apos;s Bakehouse</h3>
          <p>Best croissants in Bangalore. Period. Get here early for fresh pastries.</p>
          
          <h2>Best Bars & Nightlife</h2>
          <h3>Toast & Tonic</h3>
          <p>Craft cocktails and modern European food. The interior is stunning. Perfect for dates.</p>
          
          <h3>Sanchez</h3>
          <p>Mexican food and mezcal in a fun, casual setting. Great for groups.</p>
          
          <h3>The Permit Room</h3>
          <p>South Indian bar food with creative cocktails. The filter coffee martini is iconic.</p>
          
          <h2>Getting There</h2>
          <ul>
            <li><strong>Metro:</strong> Indiranagar Metro Station (Purple Line) — walk to 100 Feet Road</li>
            <li><strong>Auto:</strong> ₹100-200 from Koramangala, ₹200-300 from MG Road</li>
            <li><strong>Parking:</strong> Limited street parking. Use valet at restaurants.</li>
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
          <h2 className="text-xl font-bold mb-4">More Neighborhood Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/koramangala-guide" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Koramangala</Link>
            <Link href="/guides/whitefield-area-guide" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Whitefield</Link>
            <Link href="/neighborhoods" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">All Neighborhoods</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
