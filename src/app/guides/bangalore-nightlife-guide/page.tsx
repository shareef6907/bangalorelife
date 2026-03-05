import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Nightlife Guide 2025 — Clubs, Bars & Live Music | BangaloreLife",
  description: "Clubs, bars, live music venues and late-night eats. The complete guide to partying in Bangalore.",
  keywords: "bangalore nightlife, clubs bangalore, bars bangalore, live music bangalore, nightclubs bangalore, party bangalore",
};

const faqs = [
  { question: "What time do clubs close in Bangalore?", answer: "Most clubs close at 11:30 PM on weekdays and 1 AM on weekends. Some premium clubs with special permits operate until 3 AM." },
  { question: "Which is the best area for nightlife in Bangalore?", answer: "Indiranagar and Koramangala have the best concentration of bars and pubs. MG Road/Brigade Road has clubs. UB City area for upscale lounges." },
  { question: "What is the drinking age in Bangalore?", answer: "The legal drinking age in Karnataka is 21. Carry ID — most places check." },
];

export default function NightlifeGuidePage() {
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
          <span className="text-white">Nightlife Guide</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Nightlife</span>
            <span className="text-zinc-500 text-sm">13 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Bangalore Nightlife Guide</h1>
          <p className="text-xl text-zinc-400">Clubs, bars, live music venues and late-night eats. How to party in Bangalore.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80" alt="Bangalore Nightlife" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Partying in India&apos;s Pub Capital</h2>
          <p>Bangalore has the best nightlife in India. From legendary brewpubs to high-energy clubs, here&apos;s how to make the most of it.</p>
          
          <h2>Best Clubs</h2>
          <h3>Loft 38</h3>
          <p>The city&apos;s best club right now. Great DJs, good crowd, premium experience. Dress well — there&apos;s a strict door policy.</p>
          
          <h3>Skyye Lounge — UB City</h3>
          <p>Rooftop club with stunning views. More lounge than club but gets lively on weekends. <Link href="/venues/skyye-lounge" className="text-violet-400">View Details →</Link></p>
          
          <h2>Best Pubs & Bars</h2>
          <h3>Toit Brewpub</h3>
          <p>The most iconic pub in Bangalore. Always buzzing, great craft beer. <Link href="/venues/toit-brewpub" className="text-violet-400">View Details →</Link></p>
          
          <h3>The Bier Library</h3>
          <p>For serious craft beer lovers. Rotating taps with rare styles. <Link href="/venues/the-bier-library" className="text-violet-400">View Details →</Link></p>
          
          <h3>Pecos</h3>
          <p>Old-school rock pub since 1979. Dark, loud, legendary. <Link href="/venues/pecos" className="text-violet-400">View Details →</Link></p>
          
          <h2>Live Music Venues</h2>
          <h3>The Humming Tree</h3>
          <p>Bangalore&apos;s best live music venue. Indie bands, stand-up comedy, eclectic programming.</p>
          
          <h3>Hard Rock Cafe</h3>
          <p>Consistent live music every weekend. Rock covers and tribute bands.</p>
          
          <h3>BFlat</h3>
          <p>Jazz and blues in an intimate setting.</p>
          
          <h2>Late Night Eats</h2>
          <h3>Empire Restaurant</h3>
          <p>Open until 3 AM. The biryani hits different at 2 AM.</p>
          
          <h3>CTR — Malleshwaram</h3>
          <p>Late-night dosas. The benne dosa is worth staying up for.</p>
          
          <h2>Pro Tips</h2>
          <ul>
            <li>Start early — most places fill up by 10 PM</li>
            <li>Couples and mixed groups get preference at clubs</li>
            <li>Keep cash for autos — Uber/Ola surge late night</li>
            <li>Indiranagar is walkable — pub hop on 100 Feet Road</li>
            <li>Weekday nights are less crowded and often better value</li>
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
            <Link href="/guides/best-pubs-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Pubs</Link>
            <Link href="/guides/best-breweries-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Breweries</Link>
            <Link href="/nightlife" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm transition-colors">Nightlife Section</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
