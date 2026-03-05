import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Hotels in Bangalore 2025 — Luxury to Budget | BangaloreLife",
  description: "From The Leela Palace to budget stays, find the perfect hotel in Bangalore. Sorted by area, price, and traveler type.",
  keywords: "hotels bangalore, best hotels bangalore, luxury hotels bangalore, budget hotels bangalore, where to stay bangalore",
};

const faqs = [
  { question: "What is the best area to stay in Bangalore?", answer: "For business: Whitefield or Outer Ring Road. For nightlife: Koramangala or Indiranagar. For luxury: MG Road area (near UB City). For budget: Hosur Road or Majestic area." },
  { question: "How much do hotels cost in Bangalore?", answer: "Budget hotels: ₹1,500-3,000/night. Mid-range: ₹4,000-8,000/night. Luxury 5-star: ₹12,000-35,000/night." },
  { question: "Which is the best 5-star hotel in Bangalore?", answer: "The Leela Palace and Taj West End are consistently rated as the best luxury hotels in Bangalore." },
];

export default function HotelsGuidePage() {
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
          <span className="text-white">Best Hotels</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Stay</span>
            <span className="text-zinc-500 text-sm">11 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Best Hotels in Bangalore for Every Budget</h1>
          <p className="text-xl text-zinc-400">From luxury 5-stars to budget-friendly stays. Where to stay in Bangalore.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80" alt="Hotels in Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Where to Stay in Bangalore</h2>
          <p>Bangalore&apos;s hotel scene caters to everyone from backpackers to business travelers. Here&apos;s our curated guide to the best stays across all budgets.</p>
          
          <h2>Luxury (₹15,000+/night)</h2>
          <h3>The Leela Palace</h3>
          <p>The gold standard of luxury in Bangalore. Stunning architecture, impeccable service, world-class restaurants. Where royalty stays.</p>
          
          <h3>Taj West End</h3>
          <p>Colonial heritage hotel with 20 acres of gardens. Perfect escape in the heart of the city. The Sunday brunch is legendary.</p>
          
          <h3>ITC Gardenia</h3>
          <p>LEED Platinum certified luxury. Great for business travelers. The Cubbon Pavilion restaurant is excellent.</p>
          
          <h2>Mid-Range (₹5,000-12,000/night)</h2>
          <h3>Taj MG Road</h3>
          <p>Business-friendly, great location, consistent quality. Walking distance to UB City and Commercial Street.</p>
          
          <h3>JW Marriott</h3>
          <p>Modern luxury at reasonable prices. Vittal Mallya Road location is prime.</p>
          
          <h3>Conrad Bengaluru</h3>
          <p>Contemporary design, excellent restaurants. Popular with tech executives.</p>
          
          <h2>Budget-Friendly (₹2,000-5,000/night)</h2>
          <h3>Lemon Tree Hotels</h3>
          <p>Multiple locations. Reliable, clean, good value. Electronics City and Whitefield properties are well-rated.</p>
          
          <h3>Treebo & FabHotels</h3>
          <p>Standardized budget hotels across the city. Book via their apps for best rates.</p>
          
          <h2>By Area</h2>
          <ul>
            <li><strong>MG Road/UB City:</strong> Best for luxury and central location</li>
            <li><strong>Whitefield:</strong> Best for IT professionals</li>
            <li><strong>Koramangala:</strong> Best for nightlife and food</li>
            <li><strong>Airport Road:</strong> Best for transit stays</li>
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
            <Link href="/hotels" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm transition-colors">Browse All Hotels</Link>
            <Link href="/guides/best-restaurants-bangalore-2025" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Restaurants</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
