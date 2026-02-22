import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Whitefield Guide — Breweries, Restaurants & Tech Hub Nightlife (2026)",
  description: "The ultimate guide to Whitefield, Bangalore. Best breweries, restaurants, and nightlife in the tech corridor. Windmills, Red Rhino, and more.",
  keywords: "whitefield bangalore, whitefield breweries, whitefield restaurants, whitefield nightlife, windmills craftworks, whitefield pubs",
};

const topSpots = [
  { name: "Windmills Craftworks", type: "Brewery", description: "Premium craft beer in a beautiful space. The Belgian styles are excellent.", price: "₹1,600", slug: "windmills-craftworks" },
  { name: "Red Rhino", type: "Brewery", description: "Colorful, playful brewery with solid beers and good food.", price: "₹1,400", slug: "red-rhino" },
  { name: "XOOX Brewmill", type: "Brewery", description: "Massive industrial space with house-brewed beers.", price: "₹1,400", slug: "xoox-brewmill" },
  { name: "Hoppipola", type: "Pub", description: "All-day cafe-bar with quirky interiors and solid drinks.", price: "₹1,200", slug: "hoppipola" },
];

const restaurants = [
  { name: "Punjab Grill", type: "North Indian", description: "Upscale Punjabi cuisine. Great for business dinners." },
  { name: "Toscano", type: "Italian", description: "Authentic Italian in a refined setting." },
  { name: "Asia Kitchen", type: "Pan-Asian", description: "Solid Asian fusion for the tech crowd." },
  { name: "Truffles", type: "American", description: "Bangalore's favorite burgers, Whitefield edition." },
];

export default function WhitefieldPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "whitefield-guide"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=1920&q=80" 
              alt="Whitefield Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-emerald-400 font-medium mb-2">Neighborhood Guide</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Whitefield</h1>
              <p className="text-xl text-white/90">Tech Hub After Dark</p>
            </div>
          </div>
        </section>

        <div className="bg-white border-b border-stone-200 px-4 py-3">
          <div className="max-w-4xl mx-auto text-sm text-stone-600">
            <Link href="/" className="hover:text-emerald-700">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/neighborhoods" className="hover:text-emerald-700">Neighborhoods</Link>
            <span className="mx-2">→</span>
            <span className="text-stone-900">Whitefield</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              <strong>Whitefield</strong> isn't just about office parks and tech campuses. Bangalore's 
              IT corridor has developed a thriving brewery scene with massive spaces, premium craft 
              beer, and a crowd that knows how to unwind after deadline crunches.
            </p>
            <p>
              The vibe here is different from Koramangala or Indiranagar — more spacious, more 
              relaxed, and surprisingly good for families. The breweries are larger, parking is 
              easier, and you're not fighting for a table quite as hard.
            </p>
            <p>
              For the tech crowd, this is home turf. After-work drinks don't require an hour-long 
              commute, and weekend brewery sessions are practically a cultural institution.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">🍺 Best Breweries & Bars</h2>
            <div className="space-y-4">
              {topSpots.map((spot, i) => (
                <div key={spot.slug} className="bg-white rounded-xl p-5 border border-stone-200 hover:border-emerald-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-emerald-600 font-semibold text-sm">#{i + 1}</span>
                      <h3 className="text-lg font-semibold text-stone-900">
                        <Link href={`/venues/${spot.slug}`} className="hover:text-emerald-700">{spot.name}</Link>
                      </h3>
                      <p className="text-stone-500 text-sm">{spot.type}</p>
                    </div>
                    <span className="text-stone-600 text-sm">{spot.price} for two</span>
                  </div>
                  <p className="text-stone-600 mt-2">{spot.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">🍽️ Best Restaurants</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {restaurants.map((r) => (
                <div key={r.name} className="bg-white rounded-xl p-4 border border-stone-200">
                  <h3 className="font-semibold text-stone-900">{r.name}</h3>
                  <p className="text-emerald-600 text-sm">{r.type}</p>
                  <p className="text-stone-600 text-sm mt-1">{r.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h2 className="text-lg font-semibold text-amber-900 mb-4">💡 Local Tips</h2>
            <ul className="space-y-2 text-amber-800 text-sm">
              <li>• <strong>Traffic:</strong> Whitefield traffic is notorious. Plan extra time, especially on weekdays.</li>
              <li>• <strong>Parking:</strong> Most breweries have decent parking — a luxury in Bangalore.</li>
              <li>• <strong>Best time:</strong> Sunday afternoons are perfect for brewery sessions.</li>
              <li>• <strong>Metro:</strong> Purple Line now connects Whitefield — use it when possible.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Related</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/best-breweries-bangalore" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Best Breweries →
              </Link>
              <Link href="/neighborhoods/sarjapur-road" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Sarjapur Road →
              </Link>
            </div>
          </section>

          <div className="text-center text-sm text-stone-500">Last updated: February 2026</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
