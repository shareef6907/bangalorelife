import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Koramangala Guide 2025 — Food, Nightlife & Startups | BangaloreLife",
  description: "Startup hub meets foodie paradise. Complete guide to Koramangala with best restaurants, cafes, bars, and things to do.",
  keywords: "koramangala bangalore, koramangala restaurants, koramangala cafes, koramangala bars, forum mall, truffles koramangala",
};

const faqs = [
  { question: "Why is Koramangala popular?", answer: "Koramangala is Bangalore's startup hub and foodie paradise. It has the highest concentration of restaurants, cafes, and coworking spaces in the city." },
  { question: "What is Koramangala famous for?", answer: "Famous for being the birthplace of Indian unicorns (Flipkart, Swiggy started here), amazing food scene, and Forum Mall." },
  { question: "Is Koramangala safe at night?", answer: "Yes, Koramangala is generally safe. The main areas (5th, 6th, 7th blocks) are well-lit with plenty of restaurants and foot traffic until late." },
];

export default function KoramangalaGuidePage() {
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
          <span className="text-white">Koramangala Guide</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Neighborhoods</span>
            <span className="text-zinc-500 text-sm">12 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Koramangala Complete Neighborhood Guide</h1>
          <p className="text-xl text-zinc-400">Startup hub meets foodie paradise. Everything worth doing in Koramangala.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80" alt="Koramangala Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>The Startup Capital</h2>
          <p>Koramangala is where Indian startups were born. Flipkart started in a 2BHK here. Today, it&apos;s a buzzing neighborhood that perfectly blends work, food, and play.</p>
          
          <h2>The Blocks Explained</h2>
          <ul>
            <li><strong>1st Block:</strong> Residential, quieter</li>
            <li><strong>4th Block:</strong> Truffles territory, great for students</li>
            <li><strong>5th Block:</strong> The heart — Forum Mall, best restaurants</li>
            <li><strong>6th Block:</strong> Cafes, coworking, startup offices</li>
            <li><strong>7th Block:</strong> Pubs and nightlife</li>
            <li><strong>8th Block:</strong> Mix of residential and commercial</li>
          </ul>
          
          <h2>Must-Visit Restaurants</h2>
          <h3>Truffles</h3>
          <p>Bangalore&apos;s burger institution. The queue is always worth it. Get the Truffles Special or American Beef Burger.</p>
          
          <h3>Meghana Foods</h3>
          <p>Andhra meals and biryani that&apos;s almost religious. Multiple outlets — the 5th Block one is most popular.</p>
          
          <h3>Bier Library</h3>
          <p>Craft beer heaven. Rotating taps with rare styles. <Link href="/venues/the-bier-library" className="text-violet-400">View Details →</Link></p>
          
          <h2>Shopping</h2>
          <h3>Forum Mall / Nexus Koramangala</h3>
          <p>The neighborhood mall. Great for quick shopping trips, movies, and food court meals. <Link href="/malls/nexus-mall-koramangala" className="text-violet-400">View Details →</Link></p>
          
          <h2>Coworking Spaces</h2>
          <ul>
            <li><strong>WeWork Embassy:</strong> Premium, great for funded startups</li>
            <li><strong>91Springboard:</strong> Community-focused, good events</li>
            <li><strong>Dialogues Cafe:</strong> Cafe + coworking hybrid</li>
          </ul>
          
          <h2>Getting Around</h2>
          <p>Koramangala doesn&apos;t have a Metro station yet (coming soon). Rely on autos and cabs. Traffic can be heavy during peak hours. The internal roads are generally walkable between blocks.</p>
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
            <Link href="/guides/whitefield-area-guide" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Whitefield</Link>
            <Link href="/neighborhoods" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">All Neighborhoods</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
