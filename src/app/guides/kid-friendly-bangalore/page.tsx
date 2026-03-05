import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kid-Friendly Activities in Bangalore 2025 — Family Fun Guide | BangaloreLife",
  description: "Theme parks, museums, play areas and family restaurants. The best things to do with kids in Bangalore.",
  keywords: "kids activities bangalore, family fun bangalore, wonderla bangalore, things to do with kids bangalore, children bangalore",
};

const faqs = [
  { question: "What are the best places to take kids in Bangalore?", answer: "Wonderla Amusement Park, Lumbini Gardens, HAL Aerospace Museum, and Phoenix Marketcity's entertainment zone are family favorites." },
  { question: "Are there indoor play areas in Bangalore?", answer: "Yes! Fun City (in malls), Play Factory, Timezone, and Smaaash offer indoor entertainment for kids." },
  { question: "Which malls are best for families in Bangalore?", answer: "Phoenix Marketcity and Orion Mall have the best family entertainment options with gaming zones, cinemas, and kid-friendly dining." },
];

export default function KidFriendlyGuidePage() {
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
          <span className="text-white">Kid-Friendly Activities</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">Family</span>
            <span className="text-zinc-500 text-sm">10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Kid-Friendly Activities in Bangalore</h1>
          <p className="text-xl text-zinc-400">Theme parks, museums, play areas and family restaurants. Bangalore with kids.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80" alt="Kids Activities Bangalore" className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Bangalore with Kids</h2>
          <p>Bangalore has plenty to keep little ones entertained. From amusement parks to science museums, here&apos;s how to plan family-friendly outings.</p>
          
          <h2>Theme Parks & Adventure</h2>
          <h3>Wonderla Amusement Park</h3>
          <p>Bangalore&apos;s best amusement and water park. Full day activity. Go on weekdays to avoid crowds. ₹1,500 per person. About 30 km from city center.</p>
          
          <h3>Innovative Film City</h3>
          <p>Theme park with rides, shows, and movie sets. Good for half-day visits. ₹700-1,000 per person.</p>
          
          <h3>Fun World</h3>
          <p>Classic amusement park in the city. More accessible than Wonderla. Good for younger kids.</p>
          
          <h2>Museums & Learning</h2>
          <h3>Visvesvaraya Industrial & Technological Museum</h3>
          <p>Hands-on science exhibits that kids love. The Engine Hall and Space Gallery are highlights. ₹80 entry. Cubbon Park area.</p>
          
          <h3>HAL Aerospace Museum</h3>
          <p>Real aircraft, flight simulators, and aviation history. Perfect for future pilots. ₹100 entry. Near Old Airport Road.</p>
          
          <h3>Jawaharlal Nehru Planetarium</h3>
          <p>Sky shows and astronomy exhibits. ₹60 entry. Great for curious minds.</p>
          
          <h2>Parks & Outdoors</h2>
          <h3>Cubbon Park</h3>
          <p>Central park with playgrounds, walking paths, and toy train. Free entry. Perfect for morning outings.</p>
          
          <h3>Lalbagh Botanical Garden</h3>
          <p>Beautiful gardens, glass house, and lake. Great for picnics. ₹30 entry.</p>
          
          <h3>Lumbini Gardens</h3>
          <p>Boating, wave pool, and gardens. Fun weekend activity. ₹300 entry. Nagawara.</p>
          
          <h3>Bannerghatta Biological Park</h3>
          <p>Zoo, safari, and butterfly park. Full day outing. About 25 km from city.</p>
          
          <h2>Indoor Play Areas</h2>
          <ul>
            <li><strong>Fun City:</strong> Available in Phoenix, Orion malls — arcade games, soft play</li>
            <li><strong>Timezone:</strong> Gaming arcades in major malls</li>
            <li><strong>Play Factory:</strong> Indoor play zones for toddlers</li>
            <li><strong>Smaaash:</strong> VR games, cricket simulators, go-karting</li>
          </ul>
          
          <h2>Family-Friendly Restaurants</h2>
          <ul>
            <li><strong>Truffles:</strong> Burgers kids love, casual atmosphere</li>
            <li><strong>Hard Rock Cafe:</strong> Fun decor, familiar food</li>
            <li><strong>Phoenix mall food court:</strong> Something for everyone</li>
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
            <Link href="/guides/things-to-do-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Things To Do</Link>
            <Link href="/malls" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Malls</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
