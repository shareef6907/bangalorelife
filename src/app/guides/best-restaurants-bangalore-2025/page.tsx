import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "25 Best Restaurants in Bangalore 2025 — BangaloreLife",
  description: "From fine dining to hidden gems, discover the best restaurants in Bangalore. Curated list with ratings, prices, and what to order.",
  keywords: "best restaurants bangalore, restaurants in bangalore, fine dining bangalore, best food bangalore, where to eat bangalore",
};

const faqs = [
  { question: "What are the best restaurants in Bangalore for couples?", answer: "For romantic dining, try Olive Beach in JP Nagar, Karavalli at Taj Gateway, or Toast & Tonic in UB City. These offer intimate ambiance with excellent food." },
  { question: "Where can I find the best biryani in Bangalore?", answer: "Meghana Foods is the local favorite for Andhra-style biryani. For Hyderabadi style, try Paradise or Behrouz Biryani." },
  { question: "What is the average cost for a meal at a good restaurant in Bangalore?", answer: "A meal for two at a mid-range restaurant costs ₹1,000-2,000. Fine dining ranges from ₹3,000-8,000+ for two." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
  }))
};

export default function BestRestaurantsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-white">Guides</Link>
          <span>/</span>
          <span className="text-white">Best Restaurants</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Food</span>
            <span className="text-zinc-500 text-sm">12 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Best Restaurants in Bangalore 2025</h1>
          <p className="text-xl text-zinc-400">From fine dining to hidden gems, the definitive guide to eating well in Bangalore.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80" alt="Best Restaurants in Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>The Bangalore Food Scene in 2025</h2>
          <p>Bangalore&apos;s restaurant scene has exploded. From Michelin-worthy fine dining to hole-in-the-wall gems, this city delivers. Here&apos;s our curated list of the absolute best places to eat in 2025.</p>
          
          <h2>Fine Dining</h2>
          <h3>1. Karavalli — Taj Gateway</h3>
          <p>Coastal Karnataka cuisine at its finest. The crab ghee roast is legendary. Book ahead — this place is always packed. <strong>Price:</strong> ₹₹₹₹</p>
          
          <h3>2. Le Cirque — The Leela Palace</h3>
          <p>French-Italian fine dining in an opulent setting. Tasting menus that rival the best in Mumbai and Delhi. <strong>Price:</strong> ₹₹₹₹</p>
          
          <h3>3. Ottimo — West Gate</h3>
          <p>Authentic Italian with handmade pasta and wood-fired pizzas. The truffle risotto is divine. <strong>Price:</strong> ₹₹₹</p>
          
          <h2>Best for Groups</h2>
          <h3>4. Meghana Foods — Multiple Locations</h3>
          <p>The gold standard for Andhra meals in Bangalore. Their biryani has a cult following. Affordable and always fresh. <strong>Price:</strong> ₹₹</p>
          
          <h3>5. Truffles — Koramangala</h3>
          <p>Where Bangalore goes for burgers. The American Beef Burger and Truffles Special are iconic. Always a queue. <strong>Price:</strong> ₹₹</p>
          
          <h2>Hidden Gems</h2>
          <h3>6. Nagarjuna — Residency Road</h3>
          <p>The original Andhra meals spot. Fiery, authentic, unforgettable. Eat with your hands. <strong>Price:</strong> ₹</p>
          
          <h3>7. CTR — Malleshwaram</h3>
          <p>Benne dosa that&apos;s worth the wait. A Bangalore institution since 1920. Cash only. <strong>Price:</strong> ₹</p>
          
          <h2>Best Rooftop Restaurants</h2>
          <h3>8. Skyye Lounge — UB City</h3>
          <p>Best views in the city. Come for sundowners, stay for pan-Asian cuisine. <Link href="/venues/skyye-lounge" className="text-violet-400">View Details →</Link> <strong>Price:</strong> ₹₹₹</p>
          
          <h3>9. High Ultra Lounge — World Trade Center</h3>
          <p>360-degree views from the 26th floor. The cocktails match the altitude. <strong>Price:</strong> ₹₹₹₹</p>
          
          <h2>Best for Vegetarians</h2>
          <p>Bangalore is vegetarian-friendly. MVS Foods, Vidyarthi Bhavan, and Brahmin&apos;s Coffee Bar serve legendary South Indian vegetarian food.</p>
          
          <h2>Final Tips</h2>
          <ul>
            <li>Book ahead for fine dining, especially weekends</li>
            <li>Koramangala and Indiranagar have the highest concentration of quality restaurants</li>
            <li>Most restaurants accept cards, but keep cash for street food</li>
            <li>Zomato Gold and EazyDiner offer good discounts</li>
          </ul>
        </article>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-zinc-900 rounded-xl p-4 group">
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-violet-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">More Bangalore Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-pubs-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Pubs</Link>
            <Link href="/guides/best-cafes-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Cafes</Link>
            <Link href="/guides/best-street-food-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Street Food</Link>
            <Link href="/malls" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Shopping Malls</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
