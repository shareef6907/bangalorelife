import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Whitefield Guide 2025 — Malls, Restaurants & IT Parks | BangaloreLife",
  description: "Tech hub with great malls, breweries and restaurants. Complete guide to living and visiting Whitefield, Bangalore.",
  keywords: "whitefield bangalore, whitefield malls, phoenix marketcity whitefield, whitefield restaurants, itpl whitefield",
};

const faqs = [
  { question: "Is Whitefield a good place to live in Bangalore?", answer: "Yes, especially for IT professionals. It has excellent infrastructure, malls, restaurants, and good schools. Traffic during peak hours is the main downside." },
  { question: "What is Whitefield famous for?", answer: "Whitefield is Bangalore's IT hub with tech parks (ITPL), international schools (Whitefield Global School, TISB), and Phoenix Marketcity mall." },
  { question: "How far is Whitefield from Bangalore city center?", answer: "Whitefield is about 16 km from MG Road. It takes 30-90 minutes depending on traffic." },
];

export default function WhitefieldGuidePage() {
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
          <span className="text-white">Whitefield Guide</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Neighborhoods</span>
            <span className="text-zinc-500 text-sm">10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Whitefield Area Guide</h1>
          <p className="text-xl text-zinc-400">Tech hub with great malls, breweries and restaurants. The complete Whitefield guide.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80" alt="Whitefield Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Bangalore&apos;s Tech Suburb</h2>
          <p>Whitefield transformed from a small settlement into Bangalore&apos;s biggest IT hub. Today, it&apos;s practically a self-contained city with everything you need.</p>
          
          <h2>Shopping & Entertainment</h2>
          <h3>Phoenix Marketcity</h3>
          <p>The biggest mall in Bangalore. You could spend an entire day here. <Link href="/malls/phoenix-marketcity" className="text-violet-400">Full guide →</Link></p>
          
          <h3>VR Bengaluru</h3>
          <p>Premium mall with good restaurants and IMAX cinema. Less crowded than Phoenix. <Link href="/malls/vr-bengaluru" className="text-violet-400">View Details →</Link></p>
          
          <h3>Forum Shantiniketan / Nexus Shantiniketan</h3>
          <p>Neighborhood mall with essentials. Good for quick shopping trips. <Link href="/malls/nexus-shantiniketan" className="text-violet-400">View Details →</Link></p>
          
          <h2>Best Restaurants & Bars</h2>
          <h3>Windmills Craftworks</h3>
          <p>Whitefield&apos;s best brewery. Belgian-style beers and great food. <Link href="/venues/windmills-craftworks" className="text-violet-400">View Details →</Link></p>
          
          <h3>The Black Pearl</h3>
          <p>Excellent North Indian and Chinese. Popular for family dinners.</p>
          
          <h3>Café Azzure</h3>
          <p>All-day dining with great pastas and steaks.</p>
          
          <h2>IT Parks</h2>
          <ul>
            <li><strong>ITPL (International Tech Park):</strong> The original tech park, home to major companies</li>
            <li><strong>Embassy Tech Village:</strong> Modern campus with great amenities</li>
            <li><strong>RMZ Ecoworld:</strong> Premium tech park</li>
            <li><strong>Prestige Tech Park:</strong> Large campus with multiple buildings</li>
          </ul>
          
          <h2>Getting Around</h2>
          <p>Metro connectivity is coming soon (Purple Line extension). For now, rely on cabs and autos. Traffic can be brutal during peak hours — leave early.</p>
          
          <h2>Living in Whitefield</h2>
          <ul>
            <li><strong>Pros:</strong> Close to IT parks, great malls, good schools</li>
            <li><strong>Cons:</strong> Traffic, distance from central Bangalore</li>
            <li><strong>Rent:</strong> 2BHK averages ₹25,000-40,000/month</li>
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
            <Link href="/guides/indiranagar-complete-guide" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Indiranagar</Link>
            <Link href="/guides/koramangala-guide" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Koramangala</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
