import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "15 Best Coworking Spaces in Bangalore 2025 | BangaloreLife",
  description: "WeWork, 91springboard, Awfis and indie spaces. Complete guide to coworking in Bangalore with prices, amenities, and locations.",
  keywords: "coworking bangalore, coworking spaces bangalore, wework bangalore, 91springboard, shared office bangalore, freelancer workspace",
};

const faqs = [
  { question: "What is the cheapest coworking space in Bangalore?", answer: "Innov8 and BHIVE offer some of the most affordable options starting at ₹5,000-7,000/month for hot desks." },
  { question: "Which coworking is best for startups in Bangalore?", answer: "WeWork Embassy (Koramangala) and 91Springboard (JP Nagar, HSR) are popular with funded startups for their networking opportunities." },
  { question: "Do coworking spaces in Bangalore offer day passes?", answer: "Yes, most spaces offer day passes ranging from ₹500-1,500 depending on the location and amenities." },
];

export default function CoworkingGuidePage() {
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
          <span className="text-white">Coworking Spaces</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Work</span>
            <span className="text-zinc-500 text-sm">10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Top Coworking Spaces in Bangalore</h1>
          <p className="text-xl text-zinc-400">WeWork, 91springboard, Awfis and indie spaces. Where to work remotely in Bangalore.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" alt="Coworking Spaces Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>The Rise of Coworking in Bangalore</h2>
          <p>Bangalore is India&apos;s startup capital, and its coworking scene reflects that. From global giants to indie spaces, there&apos;s something for every budget and work style.</p>
          
          <h2>Premium Coworking</h2>
          <h3>WeWork</h3>
          <p>Multiple locations across Bangalore. Embassy Golf Links and Prestige Atlanta are most popular. Beautiful spaces, great events, premium pricing.</p>
          <p><strong>Price:</strong> ₹15,000-25,000/month for hot desk</p>
          
          <h3>Cowrks</h3>
          <p>Indian alternative to WeWork. Good locations in Whitefield and Koramangala.</p>
          <p><strong>Price:</strong> ₹12,000-18,000/month</p>
          
          <h2>Mid-Range Options</h2>
          <h3>91Springboard</h3>
          <p>Great community, regular events, decent pricing. JP Nagar and HSR locations are excellent.</p>
          <p><strong>Price:</strong> ₹8,000-12,000/month</p>
          
          <h3>BHIVE</h3>
          <p>Homegrown Bangalore brand. Multiple locations. The HSR Layout space is particularly good.</p>
          <p><strong>Price:</strong> ₹6,000-10,000/month</p>
          
          <h2>Budget-Friendly</h2>
          <h3>Innov8</h3>
          <p>Affordable without compromising on basics. Good for freelancers and small teams.</p>
          <p><strong>Price:</strong> ₹5,000-8,000/month</p>
          
          <h3>Cafe + Coworking</h3>
          <p>Dialogues Cafe and Third Wave Coffee are popular alternatives — buy coffee, get a workspace.</p>
          
          <h2>By Area</h2>
          <ul>
            <li><strong>Koramangala:</strong> WeWork Embassy, 91Springboard, BHIVE</li>
            <li><strong>Indiranagar:</strong> Cowrks, Regus</li>
            <li><strong>Whitefield:</strong> WeWork, BHIVE, Awfis</li>
            <li><strong>HSR Layout:</strong> 91Springboard, BHIVE, Innov8</li>
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
            <Link href="/guides/best-coffee-shops-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Cafes</Link>
            <Link href="/guides/koramangala-guide" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Koramangala</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
