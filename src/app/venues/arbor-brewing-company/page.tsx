import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Arbor Brewing Company Bangalore — IPA, Menu, Reviews (2026)",
  description: "Complete guide to Arbor Brewing Company, home of the legendary Bangalore Bliss IPA. Menu, timings, location, and what makes this American-style brewery special.",
  keywords: "arbor brewing bangalore, arbor brewing company, bangalore bliss ipa, craft beer bangalore, mg road brewery",
  openGraph: {
    title: "Arbor Brewing Company — American Craft Brewing in Bangalore",
    description: "Home of the Bangalore Bliss IPA. One of India's first craft breweries.",
  },
};

const beers = [
  { name: "Bangalore Bliss", style: "IPA", abv: "6.5%", description: "The iconic IPA that put Indian craft beer on the map. Hoppy, citrusy, perfectly balanced.", price: "₹365" },
  { name: "Elephas Maximus", style: "Stout", abv: "6.8%", description: "Rich, roasty stout with coffee and chocolate notes. A winter favorite.", price: "₹375" },
  { name: "Raging Elephant", style: "Double IPA", abv: "8.5%", description: "For hop heads. Big, bold, and unapologetically bitter.", price: "₹395" },
  { name: "Dirty Blonde", style: "Blonde Ale", abv: "5.0%", description: "Light, crisp, and approachable. The session beer of choice.", price: "₹325" },
  { name: "Sacred Cow", style: "Milk Stout", abv: "5.5%", description: "Smooth and creamy with a touch of sweetness.", price: "₹355" },
  { name: "Hornstorm", style: "Wheat Beer", abv: "5.2%", description: "Refreshing wheat beer with citrus notes.", price: "₹335" },
];

export default function ArborPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "arbor-venue"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[2/1] md:aspect-[3/1]">
            <img 
              src="https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=1920&q=80" 
              alt="Arbor Brewing Company"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-400 text-2xl">🍺</span>
                <span className="text-amber-400 font-medium">Brewery</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                Arbor Brewing Company
              </h1>
              <p className="text-lg text-white/90">
                Magrath Road, MG Road
              </p>
            </div>
          </div>
        </section>

        {/* Quick Info Bar */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-amber-600">⏰</span>
              <span className="text-amber-900 ml-1">12pm – 11:30pm daily</span>
            </div>
            <div>
              <span className="text-amber-600">💰</span>
              <span className="text-amber-900 ml-1">₹1,400-1,800 for two</span>
            </div>
            <div>
              <span className="text-amber-600">🍺</span>
              <span className="text-amber-900 ml-1">American-style craft</span>
            </div>
            <div>
              <span className="text-amber-600">📍</span>
              <span className="text-amber-900 ml-1">8 Magrath Road</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* About */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              <strong>Arbor Brewing Company</strong> brought American craft brewing expertise to India 
              when the country was just waking up to the craft beer revolution. Founded by the 
              Michigan-based Arbor Brewing Company, the Bangalore outpost opened in 2012 and 
              quickly became a landmark.
            </p>
            <p>
              The <strong>Bangalore Bliss IPA</strong> became legendary — a beer that proved 
              Indians could appreciate (and love) hoppy, bitter ales. The Elephas Maximus Stout 
              is equally impressive, rich and complex in ways that mass-produced beers could never be.
            </p>
            <p>
              The brewery itself is impressive: a converted warehouse with visible brewing tanks, 
              industrial aesthetics, and a menu that goes well beyond typical bar snacks. Located 
              near MG Road, it's perfectly positioned for a pub crawl starting or ending point.
            </p>
          </section>

          {/* Best For Tags */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-stone-900 mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["IPA Lovers", "American-Style Brewing", "Groups", "Brewery Tours", "MG Road Crawls"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Beer Menu */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              🍺 Signature Beers
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
                  <p className="text-stone-600 text-sm">8 Magrath Road, off MG Road</p>
                  <p className="text-stone-600 text-sm">Near MG Road Metro Station</p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">Timings</h3>
                  <p className="text-stone-600 text-sm">12:00 PM – 11:30 PM (Daily)</p>
                </div>
              </div>
              <div className="pt-4 border-t border-stone-200">
                <h3 className="font-semibold text-stone-900 mb-2">Pro Tips</h3>
                <ul className="text-stone-600 text-sm space-y-1">
                  <li>• Try the Bangalore Bliss first — it's their signature for a reason</li>
                  <li>• Food is substantial — come hungry</li>
                  <li>• Great starting point for a Brigade Road pub crawl</li>
                  <li>• MG Road metro is a 10-minute walk</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Venues */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">
              Related Venues
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/venues/toit-brewpub" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Toit Brewpub →
              </Link>
              <Link 
                href="/venues/pecos" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Pecos (nearby) →
              </Link>
              <Link 
                href="/neighborhoods/mg-road-brigade-road" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                MG Road Guide →
              </Link>
            </div>
          </section>

          <div className="text-center text-sm text-stone-500">
            Last updated: February 2026
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
