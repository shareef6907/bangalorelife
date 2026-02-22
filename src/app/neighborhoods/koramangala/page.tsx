import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Koramangala Guide — Best Bars, Pubs & Restaurants (2026)",
  description: "The ultimate guide to Koramangala, Bangalore. Discover the best pubs, breweries, restaurants, and nightlife spots in Bangalore's most popular party neighborhood.",
  keywords: "koramangala pubs, koramangala nightlife, koramangala bars, koramangala restaurants, best pubs in koramangala, toit koramangala, koramangala party",
  openGraph: {
    title: "Koramangala Guide — Bangalore's Nightlife & Startup Hub",
    description: "Everything you need to know about Koramangala. Best pubs, restaurants, nightlife, and local tips.",
  },
};

const bestBars = [
  {
    name: "Toit Brewpub",
    type: "Brewpub",
    description: "The OG of Bangalore craft beer. Toit has been setting the standard since 2010. Their Toit Weiss and Tintin Toit are legendary. Always packed, always buzzing.",
    mustTry: "Toit Weiss, Tintin Toit, Basmati Blonde",
    priceRange: "₹1,200 for two",
    timings: "12pm – 1am",
    bestFor: "Craft beer lovers, groups",
    slug: "toit-brewpub",
  },
  {
    name: "The Bier Library",
    type: "Craft Beer Bar",
    description: "Industrial-chic space with an insane selection of craft beers on tap. Great for beer nerds who want to explore styles beyond the usual.",
    mustTry: "Rotating craft taps, smoked porter",
    priceRange: "₹1,000 for two",
    timings: "12pm – 12:30am",
    bestFor: "Beer enthusiasts, casual hangouts",
    slug: "the-bier-library",
  },
  {
    name: "Koramangala Social",
    type: "Cafe Bar",
    description: "Work-by-day, party-by-night. Social's co-working space transforms into one of the most energetic bars in Koramangala after sunset.",
    mustTry: "LIIT, Butter Chicken Biryani",
    priceRange: "₹1,000 for two",
    timings: "9am – 1am",
    bestFor: "Working, large groups, casual drinks",
    slug: "koramangala-social",
  },
  {
    name: "Hammered",
    type: "Pub",
    description: "No-frills pub with good music and affordable drinks. Popular with the late-night crowd who want to keep the party going.",
    mustTry: "Beer towers, cocktail pitchers",
    priceRange: "₹800 for two",
    timings: "5pm – 1am",
    bestFor: "Late night, budget drinks",
    slug: "hammered",
  },
  {
    name: "Big Brewsky",
    type: "Brewery",
    description: "Massive space with outdoor seating, multiple floors, and their own brewed beers. Great for large groups and Sunday sessions.",
    mustTry: "Big Brewsky Lager, White Wine Sangria",
    priceRange: "₹1,200 for two",
    timings: "12pm – 1am",
    bestFor: "Groups, outdoor seating, casual vibes",
    slug: "big-brewsky",
  },
];

const bestRestaurants = [
  {
    name: "Meghana Foods",
    type: "Andhra",
    description: "The legend. Meghana's biryani draws lines around the block. Their thalis are equally impressive. No reservations, come early or prepare to wait.",
    mustTry: "Andhra Chicken Biryani, Boneless Chicken Fry",
    priceRange: "₹400 for two",
  },
  {
    name: "Truffles",
    type: "American",
    description: "Bangalore's favorite burger joint. The burgers are massive, the fries are addictive, and there's always a line. Worth the wait.",
    mustTry: "Sin-A-Mon burger, Loaded fries",
    priceRange: "₹600 for two",
  },
  {
    name: "Third Wave Coffee",
    type: "Cafe",
    description: "Premium coffee, good Wi-Fi, and a perfect work-from-cafe spot. Multiple locations in Koramangala.",
    mustTry: "Cold brew, Flat white",
    priceRange: "₹400 for two",
  },
  {
    name: "Empire Restaurant",
    type: "North Indian",
    description: "Another Bangalore institution. Open late, serving kebabs and biryanis to the post-party crowd.",
    mustTry: "Mutton Seekh Kebab, Ghee Rice",
    priceRange: "₹500 for two",
  },
];

const localTips = [
  {
    icon: "🚗",
    title: "Getting There",
    tip: "Koramangala has terrible parking. Uber/Ola is your best bet. If you're driving, go early — parking fills up by 8pm on weekends.",
  },
  {
    icon: "⏰",
    title: "Best Time",
    tip: "Weekday evenings (Tue-Thu) are less crowded but still buzzing. Friday/Saturday after 10pm is peak madness.",
  },
  {
    icon: "👔",
    title: "Dress Code",
    tip: "Casual. Koramangala is startup central — nobody cares if you're in a t-shirt and jeans. Just no shorts in some places.",
  },
  {
    icon: "💰",
    title: "Budget",
    tip: "Plan for ₹1,000-1,500 per person for drinks and food. Koramangala isn't the cheapest, but it's not Indiranagar prices either.",
  },
  {
    icon: "🔥",
    title: "Pro Tip",
    tip: "Start at Toit for early drinks (less crowded before 8pm), then walk to Bier Library or Social. End at Hammered if you're going late.",
  },
];

export default function KoramangalaPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "koramangala-guide"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80" 
              alt="Koramangala nightlife"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-emerald-400 font-medium mb-2">Neighborhood Guide</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                Koramangala
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Bangalore's Nightlife & Startup Hub
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-stone-200 px-4 py-3">
          <div className="max-w-4xl mx-auto text-sm text-stone-600">
            <Link href="/" className="hover:text-emerald-700">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/neighborhoods" className="hover:text-emerald-700">Neighborhoods</Link>
            <span className="mx-2">→</span>
            <span className="text-stone-900">Koramangala</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-16">
            <p className="text-xl text-stone-700 leading-relaxed">
              If there's one neighborhood that defines modern Bangalore nightlife, it's <strong>Koramangala</strong>. 
              This densely packed area in South Bangalore is home to more pubs, bars, and restaurants per square 
              kilometer than almost anywhere else in India.
            </p>
            <p>
              Koramangala is split into eight "blocks" (numbered 1-8), but the action is concentrated around 
              <strong> 80 Feet Road</strong> and the <strong>5th Block</strong> area. This is where you'll find Toit 
              (Bangalore's most famous brewery), The Bier Library, Koramangala Social, and dozens of other spots 
              packed into a few square blocks.
            </p>
            <p>
              The vibe here is young, casual, and startup-friendly. You'll see founders pitching investors over 
              craft beer, tech workers unwinding after deadline crunches, and groups of friends celebrating 
              everything from birthdays to job offers. Koramangala doesn't pretend to be fancy — it just promises 
              a good time.
            </p>
          </section>

          {/* Best Bars & Pubs */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              🍻 Best Bars & Pubs in Koramangala
            </h2>
            <div className="space-y-6">
              {bestBars.map((bar, index) => (
                <div key={bar.slug} className="bg-white rounded-xl p-6 border border-stone-200 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-emerald-600 font-semibold text-sm">#{index + 1}</span>
                      <h3 className="text-xl font-semibold text-stone-900">
                        <Link href={`/venues/${bar.slug}`} className="hover:text-emerald-700">
                          {bar.name}
                        </Link>
                      </h3>
                      <p className="text-stone-500 text-sm">{bar.type}</p>
                    </div>
                    <span className="text-sm text-stone-500">{bar.priceRange}</span>
                  </div>
                  <p className="text-stone-700 mb-4">{bar.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-stone-500">Must Try:</span>
                      <span className="text-stone-700 ml-1">{bar.mustTry}</span>
                    </div>
                    <div>
                      <span className="text-stone-500">Best For:</span>
                      <span className="text-stone-700 ml-1">{bar.bestFor}</span>
                    </div>
                    <div>
                      <span className="text-stone-500">Timings:</span>
                      <span className="text-stone-700 ml-1">{bar.timings}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Events CTA */}
          <section className="mb-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-2">What's Happening in Koramangala This Week?</h3>
            <p className="text-emerald-100 mb-4">
              Comedy nights at Social, live music at The Humming Tree, and more. Check out upcoming events.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Browse Events →
            </a>
          </section>

          {/* Best Restaurants */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              🍽️ Best Restaurants in Koramangala
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {bestRestaurants.map((restaurant) => (
                <div key={restaurant.name} className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-900">{restaurant.name}</h3>
                  <p className="text-sm text-emerald-600">{restaurant.type} • {restaurant.priceRange}</p>
                  <p className="text-stone-600 text-sm mt-2">{restaurant.description}</p>
                  <p className="text-sm mt-2">
                    <span className="text-stone-500">Must Try:</span>
                    <span className="text-stone-700 ml-1">{restaurant.mustTry}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Local Tips */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              💡 Local Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {localTips.map((tip) => (
                <div key={tip.title} className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{tip.icon}</span>
                    <h3 className="font-semibold text-amber-900">{tip.title}</h3>
                  </div>
                  <p className="text-amber-800 text-sm">{tip.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Neighborhoods */}
          <section className="mb-16">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">
              If You Like Koramangala, Also Check Out:
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/neighborhoods/hsr-layout" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                HSR Layout →
              </Link>
              <Link 
                href="/neighborhoods/indiranagar" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Indiranagar →
              </Link>
              <Link 
                href="/neighborhoods/jp-nagar-jayanagar" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                JP Nagar →
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
