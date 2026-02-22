import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "15 Best Pubs in Bangalore (2026) — BangaloreLife",
  description: "The definitive guide to the best pubs in Bangalore. From legendary brewpubs like Toit to hidden speakeasies, discover where to drink in India's pub capital.",
  keywords: "best pubs in bangalore, bangalore pubs, best bars bangalore, toit bangalore, koramangala pubs, indiranagar bars, bangalore nightlife, craft beer bangalore",
};

const pubs = [
  {
    rank: 1,
    name: "Toit Brewpub",
    neighborhood: "Indiranagar",
    type: "Brewpub",
    rating: 4.4,
    reviews: 15420,
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: "Bangalore's most iconic brewpub. Since 2010, Toit has been the gold standard for craft beer in India. Try the Toit Weiss or Tintin Toit.",
    mustTry: ["Toit Weiss", "Tintin Toit", "Buffalo Wings"],
    priceRange: "₹₹",
    slug: "toit-brewpub",
  },
  {
    rank: 2,
    name: "The Bier Library",
    neighborhood: "Koramangala",
    type: "Craft Beer Bar",
    rating: 4.3,
    reviews: 8234,
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
    description: "Industrial-chic space with rotating craft taps. Great for beer nerds who want to explore Belgian tripels, smoked porters, and rare styles.",
    mustTry: ["Rotating craft taps", "Smoked Porter"],
    priceRange: "₹₹",
    slug: "the-bier-library",
  },
  {
    rank: 3,
    name: "Arbor Brewing Company",
    neighborhood: "Magrath Road",
    type: "Brewery",
    rating: 4.3,
    reviews: 11567,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    description: "One of India's original craft breweries. The Bangalore Bliss IPA put Indian craft beer on the map. Great for groups.",
    mustTry: ["Bangalore Bliss IPA", "Elephas Maximus Stout"],
    priceRange: "₹₹₹",
    slug: "arbor-brewing-company",
  },
  {
    rank: 4,
    name: "Pecos",
    neighborhood: "Brigade Road",
    type: "Classic Rock Pub",
    rating: 4.0,
    reviews: 9876,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    description: "The grandfather of Bangalore pubs since 1979. Dark interiors, loud rock music, cheap beer. Pure, unadulterated pub experience.",
    mustTry: ["Pitcher of Kingfisher", "Chicken Lollipops"],
    priceRange: "₹",
    slug: "pecos",
  },
  {
    rank: 5,
    name: "Byg Brewski",
    neighborhood: "Hennur",
    type: "Mega Brewery",
    rating: 4.2,
    reviews: 12890,
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: "One of the largest brewery spaces in India. Massive outdoor seating, live music stages, perfect for large groups.",
    mustTry: ["Byg Brewski Lager", "Hefeweizen"],
    priceRange: "₹₹",
    slug: "byg-brewski",
  },
  {
    rank: 6,
    name: "Windmills Craftworks",
    neighborhood: "Whitefield",
    type: "Brewpub",
    rating: 4.3,
    reviews: 7654,
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
    description: "Whitefield's answer to craft beer. Beautiful space with exposed brick and copper tanks. Belgian-style beers are particularly good.",
    mustTry: ["Belgian Wit", "Hefeweizen"],
    priceRange: "₹₹₹",
    slug: "windmills-craftworks",
  },
  {
    rank: 7,
    name: "Koramangala Social",
    neighborhood: "Koramangala",
    type: "Cafe-Bar",
    rating: 4.1,
    reviews: 11234,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    description: "Co-working by day, party by night. The LIIT is legendary. Always buzzing with startup energy.",
    mustTry: ["LIIT", "Social Nachos"],
    priceRange: "₹₹",
    slug: "koramangala-social",
  },
  {
    rank: 8,
    name: "Bob's Bar",
    neighborhood: "Multiple",
    type: "Budget Pub",
    rating: 4.0,
    reviews: 6543,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    description: "No-frills, affordable, always reliable. Cheap pitchers, sports on TV, unpretentious vibes. Multiple locations.",
    mustTry: ["Pitchers", "Chilli Chicken"],
    priceRange: "₹",
    slug: "bobs-bar",
  },
];

export default function BestPubsPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "best-pubs-guide"
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative py-20 px-4 border-b border-zinc-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80')] bg-cover bg-center opacity-10" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-400 text-sm font-medium mb-4">
              Nightlife Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              15 Best Pubs in Bangalore
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              The definitive guide to Bangalore&apos;s best watering holes (2026)
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-zinc-900/50 border-b border-zinc-800/50 px-4 py-3">
          <div className="max-w-4xl mx-auto text-sm text-zinc-500">
            <Link href="/" className="hover:text-violet-400">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/guides" className="hover:text-violet-400">Guides</Link>
            <span className="mx-2">→</span>
            <span className="text-white">Best Pubs</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Intro */}
          <section className="mb-12">
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              Bangalore is India&apos;s undisputed pub capital. With over 300 pubs, bars, and breweries, 
              the city has a drinking establishment for every mood, budget, and occasion.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              From legendary brewpubs that kickstarted India&apos;s craft beer revolution to heritage rock bars 
              that have been pouring since the 1970s — we&apos;ve spent years exploring them all. 
              <strong className="text-white"> These are the best pubs in Bangalore in 2026.</strong>
            </p>
          </section>

          {/* Pub Listings */}
          <section className="space-y-6">
            {pubs.map((pub) => (
              <article 
                key={pub.slug} 
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/30 transition-all"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={pub.image} 
                      alt={pub.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="inline-block px-2.5 py-1 bg-violet-500/20 text-violet-400 text-sm font-bold rounded-lg mb-2">
                          #{pub.rank}
                        </span>
                        <h2 className="text-xl font-bold">
                          <Link href={`/venues/${pub.slug}`} className="hover:text-violet-400 transition-colors">
                            {pub.name}
                          </Link>
                        </h2>
                        <p className="text-zinc-500 text-sm">{pub.neighborhood} · {pub.type}</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/10 rounded-lg">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold text-yellow-500">{pub.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 text-sm mb-4">{pub.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div>
                        <span className="text-zinc-500">Must Try:</span>
                        <span className="text-zinc-300 ml-1">{pub.mustTry.join(", ")}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Price:</span>
                        <span className="text-green-400 ml-1">{pub.priceRange}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link 
                        href={`/venues/${pub.slug}`}
                        className="text-sm text-violet-400 hover:text-violet-300 font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* CTA */}
          <section className="mt-12 p-8 bg-gradient-to-r from-violet-900/30 to-cyan-900/30 rounded-2xl border border-violet-500/20 text-center">
            <h3 className="text-xl font-bold mb-2">🎉 Live Music & Events</h3>
            <p className="text-zinc-400 mb-4">
              Many of these pubs host live music, comedy nights, and special events.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-medium transition-colors"
            >
              See What&apos;s On →
            </a>
          </section>

          {/* Related Guides */}
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Related Guides</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/best-breweries-bangalore" className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm hover:border-violet-500/50 transition-colors">
                Best Breweries →
              </Link>
              <Link href="/guides/best-rooftop-bars-bangalore" className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm hover:border-violet-500/50 transition-colors">
                Best Rooftop Bars →
              </Link>
              <Link href="/guides/date-night-bangalore" className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm hover:border-violet-500/50 transition-colors">
                Date Night Ideas →
              </Link>
            </div>
          </section>

          <div className="mt-8 text-center text-sm text-zinc-600">
            Last updated: February 2026
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
