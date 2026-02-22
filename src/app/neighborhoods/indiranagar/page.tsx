import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Indiranagar Guide — Best Bars, Brunch & Nightlife (2026)",
  description: "The ultimate guide to Indiranagar, Bangalore. Discover the best bars, brunch spots, live music venues, and cocktail lounges on 12th Main and 100 Feet Road.",
  keywords: "indiranagar bars, indiranagar nightlife, 12th main indiranagar, indiranagar brunch, best bars indiranagar, indiranagar live music, toit indiranagar",
  openGraph: {
    title: "Indiranagar Guide — Bangalore's Upscale Bar & Brunch District",
    description: "Everything you need to know about Indiranagar. Best cocktail bars, brunch spots, live music, and local tips.",
  },
};

const bestBars = [
  {
    name: "Toit Brewpub",
    type: "Brewpub",
    description: "The original Toit, where Bangalore's craft beer revolution began. This 100 Feet Road institution is where it all started in 2010. Still the standard against which all others are measured.",
    mustTry: "Toit Weiss, Colonial Toit, Toit Red",
    priceRange: "₹1,400 for two",
    timings: "12pm – 1am",
    bestFor: "Craft beer, groups, the original experience",
    slug: "toit-brewpub",
  },
  {
    name: "Loft 38",
    type: "Rooftop Lounge",
    description: "Sleek rooftop bar with stunning views and expertly crafted cocktails. This is where Indiranagar dresses up. Perfect for date nights and celebrations.",
    mustTry: "Signature cocktails, wine selection",
    priceRange: "₹2,000 for two",
    timings: "5pm – 1am",
    bestFor: "Date night, cocktails, rooftop views",
    slug: "loft-38",
  },
  {
    name: "The Humming Tree",
    type: "Live Music Venue",
    description: "Bangalore's premier indie music venue. If you want to catch local and international acts in an intimate setting, this is the place. Great acoustics, great crowd.",
    mustTry: "Craft cocktails, local beers",
    priceRange: "₹1,200 for two + cover",
    timings: "6pm – 1am (gig nights)",
    bestFor: "Live music, indie scene, unique experiences",
    slug: "the-humming-tree",
  },
  {
    name: "Toast & Tonic",
    type: "Gastropub",
    description: "Farm-to-table food meets craft cocktails. Toast & Tonic is where you go when you want to impress. The gin selection is ridiculous, and the food matches it.",
    mustTry: "G&T flights, small plates",
    priceRange: "₹1,800 for two",
    timings: "12pm – 12:30am",
    bestFor: "Gin lovers, foodies, upscale casual",
    slug: "toast-and-tonic",
  },
  {
    name: "Bob's Bar",
    type: "Pub",
    description: "Affordable, unpretentious, and always packed. Bob's is where you go when you want cold beer, good vibes, and no bullshit. Multiple locations, but Indiranagar is the OG.",
    mustTry: "Beer pitchers, bar snacks",
    priceRange: "₹700 for two",
    timings: "11am – 11:30pm",
    bestFor: "Budget drinks, casual hangouts, day drinking",
    slug: "bobs-bar",
  },
  {
    name: "The Permit Room",
    type: "Cocktail Bar",
    description: "South Indian-inspired cocktails in a beautifully designed space. Filter coffee martinis, rasam shots, and temple-town inspired interiors. Uniquely Bangalore.",
    mustTry: "Filter Coffee Martini, Gunpowder Gin",
    priceRange: "₹1,600 for two",
    timings: "12pm – 1am",
    bestFor: "Unique cocktails, Instagram, date night",
    slug: "the-permit-room",
  },
];

const bestBrunch = [
  {
    name: "Hole in the Wall",
    type: "European Cafe",
    description: "The brunch institution. Their eggs Benedict and pancakes have been drawing crowds for years. Come early on weekends or prepare to wait.",
    mustTry: "Eggs Royale, Ricotta Pancakes",
    priceRange: "₹1,000 for two",
  },
  {
    name: "Glen's Bakehouse",
    type: "Bakery Cafe",
    description: "Legendary cakes, excellent coffee, and a brunch menu that hits all the right notes. The carrot cake alone is worth the trip.",
    mustTry: "Carrot Cake, Full English Breakfast",
    priceRange: "₹900 for two",
  },
  {
    name: "Smoke House Deli",
    type: "Continental",
    description: "European cafe vibes with a menu that spans breakfast to dinner. Great for work meetings that turn into leisurely brunches.",
    mustTry: "Avocado Toast, Shakshuka",
    priceRange: "₹1,200 for two",
  },
  {
    name: "Lavonne",
    type: "Patisserie",
    description: "When you want pastries done right. Lavonne's croissants, macarons, and cakes are worth the premium. Great for a special morning.",
    mustTry: "Croissants, Coffee, Entremets",
    priceRange: "₹1,000 for two",
  },
];

const localTips = [
  {
    icon: "📍",
    title: "Know Your Streets",
    tip: "12th Main is the bar-hopping street. 100 Feet Road has the big venues (Toit, Social). CMH Road is more residential but has hidden gems.",
  },
  {
    icon: "🚕",
    title: "Getting Around",
    tip: "The Indiranagar Metro Station is on 100 Feet Road — perfect for avoiding parking nightmares. Otherwise, Uber/Ola are your friends.",
  },
  {
    icon: "👗",
    title: "Dress Code",
    tip: "Indiranagar is a step up from Koramangala. Smart casual works everywhere. Some rooftop bars prefer you dress a bit nicer.",
  },
  {
    icon: "💸",
    title: "Budget",
    tip: "Indiranagar is pricier than Koramangala. Budget ₹1,500-2,500 per person for a night out with drinks and food.",
  },
  {
    icon: "🎵",
    title: "Live Music",
    tip: "Check The Humming Tree's schedule before your visit. Their gigs sell out, especially for popular acts. Book in advance.",
  },
];

export default function IndiranagarPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "indiranagar-guide"
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80" 
              alt="Indiranagar nightlife"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-violet-400 font-medium mb-2">Neighborhood Guide</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                Indiranagar
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Upscale Bars, Boutiques & Brunch
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
          <div className="max-w-4xl mx-auto text-sm text-zinc-400">
            <Link href="/" className="hover:text-violet-400">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/neighborhoods" className="hover:text-violet-400">Neighborhoods</Link>
            <span className="mx-2">→</span>
            <span className="text-white">Indiranagar</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-16">
            <p className="text-xl text-zinc-300 leading-relaxed">
              <strong>Indiranagar</strong> is where Bangalore goes when it wants to dress up a little. This 
              upscale neighborhood in East Bangalore has evolved from a quiet residential area into one of 
              the city's most vibrant nightlife and dining destinations.
            </p>
            <p>
              The action centers around two streets: <strong>12th Main</strong> (where the bars stack up 
              one after another) and <strong>100 Feet Road</strong> (home to larger venues like Toit, Social, 
              and The Humming Tree). Between them, you'll find everything from craft cocktail bars to live 
              music venues to Bangalore's best brunch spots.
            </p>
            <p>
              What sets Indiranagar apart is its polish. The bars here tend to be more designed, the cocktails 
              more creative, and the crowd slightly more dressed up than other Bangalore neighborhoods. It's 
              also a shopping destination, with 100 Feet Road lined with boutiques and designer stores.
            </p>
            <p>
              This is where you take a date you want to impress, where you celebrate a promotion, and where 
              you go when you want your night out to feel special.
            </p>
          </section>

          {/* Best Bars */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">
              🍸 Best Bars & Nightlife in Indiranagar
            </h2>
            <div className="space-y-6">
              {bestBars.map((bar, index) => (
                <div key={bar.slug} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-violet-400 font-semibold text-sm">#{index + 1}</span>
                      <h3 className="text-xl font-semibold text-white">
                        <Link href={`/venues/${bar.slug}`} className="hover:text-violet-400">
                          {bar.name}
                        </Link>
                      </h3>
                      <p className="text-zinc-500 text-sm">{bar.type}</p>
                    </div>
                    <span className="text-sm text-zinc-500">{bar.priceRange}</span>
                  </div>
                  <p className="text-zinc-300 mb-4">{bar.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-zinc-500">Must Try:</span>
                      <span className="text-zinc-300 ml-1">{bar.mustTry}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">Best For:</span>
                      <span className="text-zinc-300 ml-1">{bar.bestFor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Live Music CTA */}
          <section className="mb-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-2">🎵 Live Music This Week</h3>
            <p className="text-purple-100 mb-4">
              The Humming Tree, Fandom, and other Indiranagar venues host incredible gigs. 
              From indie bands to international acts — see what's on.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-zinc-900 text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition-colors"
            >
              Browse Live Music →
            </a>
          </section>

          {/* Best Brunch */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">
              🥞 Best Brunch Spots
            </h2>
            <p className="text-zinc-400 mb-6">
              Indiranagar is Bangalore's undisputed brunch capital. Here's where to spend your lazy weekends.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {bestBrunch.map((spot) => (
                <div key={spot.name} className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
                  <h3 className="font-semibold text-white">{spot.name}</h3>
                  <p className="text-sm text-violet-400">{spot.type} • {spot.priceRange}</p>
                  <p className="text-zinc-400 text-sm mt-2">{spot.description}</p>
                  <p className="text-sm mt-2">
                    <span className="text-zinc-500">Must Try:</span>
                    <span className="text-zinc-300 ml-1">{spot.mustTry}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Local Tips */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">
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

          {/* Related */}
          <section className="mb-16">
            <h2 className="text-xl font-serif font-bold text-white mb-4">
              If You Like Indiranagar, Also Check Out:
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/neighborhoods/koramangala" 
                className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors"
              >
                Koramangala →
              </Link>
              <Link 
                href="/neighborhoods/church-street" 
                className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors"
              >
                Church Street →
              </Link>
              <Link 
                href="/neighborhoods/mg-road-brigade-road" 
                className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors"
              >
                MG Road →
              </Link>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-center text-sm text-zinc-500">
            Last updated: February 2026
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
