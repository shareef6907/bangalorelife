import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Toit Brewpub Bangalore — Menu, Timings, Reviews (2026)",
  description: "Complete guide to Toit Brewpub, Bangalore's most iconic brewery. Menu, timings, location, what to order, and everything you need to know.",
  keywords: "toit bangalore, toit brewpub, toit indiranagar, toit koramangala, toit menu, toit timings, bangalore brewery",
  openGraph: {
    title: "Toit Brewpub — Bangalore's Legendary Brewery",
    description: "Since 2010, Toit has been setting the standard for craft beer in India. Here's everything you need to know.",
  },
};

const beers = [
  { name: "Toit Weiss", style: "Hefeweizen", abv: "5.2%", description: "Light, refreshing wheat beer with banana and clove notes. The crowd favorite.", price: "₹325" },
  { name: "Tintin Toit", style: "Belgian Strong Ale", abv: "8.2%", description: "Rich, complex Belgian-style ale. Deceptively smooth for its strength.", price: "₹365" },
  { name: "Basmati Blonde", style: "Blonde Ale", abv: "5.0%", description: "Brewed with basmati rice for a crisp, clean finish. Light and easy.", price: "₹315" },
  { name: "Colonial Toit", style: "IPA", abv: "6.5%", description: "Hoppy, bitter, and balanced. The IPA for those who know what they want.", price: "₹345" },
  { name: "Toit Red", style: "Irish Red Ale", abv: "5.0%", description: "Malty, smooth, with a touch of caramel. An underrated gem.", price: "₹325" },
  { name: "Dark Knight", style: "Stout", abv: "5.8%", description: "Rich, roasty stout with coffee and chocolate notes.", price: "₹345" },
];

const foodHighlights = [
  { name: "Buffalo Wings", description: "Crispy wings in spicy buffalo sauce. Perfect beer companion." },
  { name: "Toit Pizza", description: "Wood-fired pizzas that hit the spot." },
  { name: "Pork Ribs", description: "Slow-cooked and fall-off-the-bone tender." },
  { name: "Fish & Chips", description: "Beer-battered with excellent fries." },
];

export default function ToitPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "toit-venue"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[2/1] md:aspect-[3/1]">
            <img 
              src="https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=1920&q=80" 
              alt="Toit Brewpub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-400 text-2xl">🍺</span>
                <span className="text-amber-400 font-medium">Brewpub</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                Toit Brewpub
              </h1>
              <p className="text-lg text-white/90">
                Indiranagar • Koramangala
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-stone-200 px-4 py-3">
          <div className="max-w-4xl mx-auto text-sm text-stone-600">
            <Link href="/" className="hover:text-emerald-700">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/venues" className="hover:text-emerald-700">Venues</Link>
            <span className="mx-2">→</span>
            <span className="text-stone-900">Toit Brewpub</span>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-amber-600">⏰</span>
              <span className="text-amber-900 ml-1">12pm – 1am daily</span>
            </div>
            <div>
              <span className="text-amber-600">💰</span>
              <span className="text-amber-900 ml-1">₹1,200-1,600 for two</span>
            </div>
            <div>
              <span className="text-amber-600">🍺</span>
              <span className="text-amber-900 ml-1">10+ house beers</span>
            </div>
            <div>
              <span className="text-amber-600">📍</span>
              <span className="text-amber-900 ml-1">100 Feet Road, Indiranagar</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* About */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              If there's one name synonymous with Bangalore's craft beer revolution, it's <strong>Toit</strong>. 
              Since opening in 2010 on 100 Feet Road in Indiranagar, this brewpub has become not just a 
              bar, but a Bangalore institution.
            </p>
            <p>
              Toit didn't just introduce craft beer to Bangalore — it created a culture around it. The 
              Toit Weiss and Tintin Toit became household names (at least in households that drink). The 
              brewery proved that Indians would embrace craft beer if given the chance.
            </p>
            <p>
              Today, with a second location in Koramangala and a reputation that precedes it, Toit 
              remains the gold standard. The beer is consistently excellent, the food is solid, and 
              the atmosphere is always buzzing. It's crowded for a reason.
            </p>
            <h3>What Makes Toit Special</h3>
            <ul>
              <li><strong>Consistency:</strong> The classics have been brewed to the same standard for over a decade.</li>
              <li><strong>Innovation:</strong> Seasonal specials and experiments keep things interesting.</li>
              <li><strong>Atmosphere:</strong> Always energetic, always packed, always fun.</li>
              <li><strong>Legacy:</strong> This is where it all started for Bangalore craft beer.</li>
            </ul>
          </section>

          {/* Best For Tags */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-stone-900 mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["Craft Beer", "Groups", "Date Night", "After Work", "Weekend Sessions", "First-Time Visitors"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Beer Menu */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              🍺 The Beer Menu
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {beers.map((beer) => (
                <div key={beer.name} className="bg-white rounded-xl p-5 border border-stone-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-stone-900">{beer.name}</h3>
                      <p className="text-sm text-amber-600">{beer.style} • {beer.abv}</p>
                    </div>
                    <span className="text-stone-600 font-medium">{beer.price}</span>
                  </div>
                  <p className="text-stone-600 text-sm">{beer.description}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-stone-500 mt-4">* Prices are approximate and may vary. Seasonal beers available.</p>
          </section>

          {/* Food */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              🍕 Food Highlights
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {foodHighlights.map((item) => (
                <div key={item.name} className="bg-white rounded-xl p-4 border border-stone-200">
                  <h3 className="font-semibold text-stone-900">{item.name}</h3>
                  <p className="text-stone-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Events CTA */}
          <section className="mb-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-2">🎉 Events at Toit</h3>
            <p className="text-amber-100 mb-4">
              Toit hosts live music, comedy nights, and special events regularly. 
              Check what's happening this week.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-white text-amber-700 font-medium rounded-lg hover:bg-amber-50 transition-colors"
            >
              Browse Events →
            </a>
          </section>

          {/* Practical Info */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              📋 Practical Information
            </h2>
            <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">Location</h3>
                  <p className="text-stone-600 text-sm">100 Feet Road, Indiranagar (Main)</p>
                  <p className="text-stone-600 text-sm">5th Block, Koramangala</p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">Timings</h3>
                  <p className="text-stone-600 text-sm">12:00 PM – 1:00 AM (Daily)</p>
                  <p className="text-stone-600 text-sm">Kitchen closes at 12:30 AM</p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">Reservations</h3>
                  <p className="text-stone-600 text-sm">Not usually required, but recommended for groups 6+</p>
                  <p className="text-stone-600 text-sm">Expect waits on weekend evenings</p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">Dress Code</h3>
                  <p className="text-stone-600 text-sm">Casual. Come as you are.</p>
                  <p className="text-stone-600 text-sm">No shorts/slippers rule occasionally enforced</p>
                </div>
              </div>
              <div className="pt-4 border-t border-stone-200">
                <h3 className="font-semibold text-stone-900 mb-2">Pro Tips</h3>
                <ul className="text-stone-600 text-sm space-y-1">
                  <li>• Get there by 7pm on weekends to avoid long waits</li>
                  <li>• The Toit Weiss is the crowd favorite — try it first</li>
                  <li>• Ask about seasonal specials — they don't always advertise them</li>
                  <li>• Parking is limited — Uber/Ola recommended</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Map Embed */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">
              📍 Location
            </h2>
            <div className="bg-stone-200 rounded-xl aspect-video flex items-center justify-center">
              <a 
                href="https://maps.google.com/?q=Toit+Indiranagar+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800"
              >
                Open in Google Maps →
              </a>
            </div>
          </section>

          {/* Related Venues */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">
              If You Like Toit, You'll Also Love
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/venues/arbor-brewing-company" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Arbor Brewing Company →
              </Link>
              <Link 
                href="/venues/the-bier-library" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                The Bier Library →
              </Link>
              <Link 
                href="/venues/windmills-craftworks" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Windmills Craftworks →
              </Link>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-center text-sm text-stone-500">
            Last updated: February 2026
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
