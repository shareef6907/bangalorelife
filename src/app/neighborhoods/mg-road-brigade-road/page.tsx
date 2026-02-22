import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "MG Road & Brigade Road Guide — Bangalore's Iconic Party Strip (2026)",
  description: "The ultimate guide to MG Road and Brigade Road, Bangalore. Discover iconic bars, clubs, live music venues, and the history of Bangalore's original party district.",
  keywords: "mg road bangalore, brigade road bars, mg road nightlife, pecos bangalore, hard rock cafe bangalore, mg road clubs, bangalore party district",
  openGraph: {
    title: "MG Road & Brigade Road — Bangalore's Iconic Party Strip",
    description: "Where Bangalore's nightlife began. Discover the legendary bars, clubs, and venues of MG Road.",
  },
};

const iconicVenues = [
  {
    name: "Pecos",
    type: "Classic Pub",
    description: "The grandfather of Bangalore pubs. Pecos has been serving pitchers and playing rock music since 1979. Dark, loud, and absolutely legendary. No frills, no pretense — just pure pub culture.",
    mustTry: "Pitcher of beer, Chicken Lollipops",
    priceRange: "₹600 for two",
    timings: "11am – 11pm",
    bestFor: "Rock music, nostalgia, cheap beer",
    vibe: "Veteran rock bar that refuses to change",
    slug: "pecos",
  },
  {
    name: "Hard Rock Cafe",
    type: "International Bar & Grill",
    description: "The global chain's Bangalore outpost is a St. Mark's Road institution. Live music, memorabilia on the walls, and that distinctive Hard Rock energy. Great for groups and celebrations.",
    mustTry: "Legendary Burger, cocktails",
    priceRange: "₹2,000 for two",
    timings: "12pm – 1am",
    bestFor: "Live music, international crowd, birthdays",
    vibe: "High-energy rock bar with global vibes",
    slug: "hard-rock-cafe",
  },
  {
    name: "13th Floor",
    type: "Rooftop Lounge",
    description: "One of Bangalore's original rooftop bars with panoramic views of MG Road. Perfect for sundowners. The views from the 13th floor of Barton Centre are still unmatched.",
    mustTry: "Cocktails, wine selection",
    priceRange: "₹2,500 for two",
    timings: "6pm – 1am",
    bestFor: "Sunset drinks, date night, views",
    vibe: "Sophisticated rooftop with city views",
    slug: "13th-floor",
  },
  {
    name: "The Pub",
    type: "Classic Pub",
    description: "Hidden in the basement of The Paul hotel, The Pub has been a Brigade Road staple for decades. Pool tables, dart boards, and a crowd that knows what it wants.",
    mustTry: "Draft beer, Chilli Chicken",
    priceRange: "₹900 for two",
    timings: "5pm – 11:30pm",
    bestFor: "Pool, darts, old-school vibes",
    vibe: "Basement bar with games and good beer",
    slug: "the-pub",
  },
  {
    name: "Arbor Brewing Company",
    type: "Brewery",
    description: "American craft beer meets Bangalore on Magrath Road. Arbor was one of the first craft breweries in India and continues to produce excellent beers. Their Bangalore Bliss IPA is iconic.",
    mustTry: "Bangalore Bliss, Elephas Maximus Stout",
    priceRange: "₹1,400 for two",
    timings: "12pm – 11:30pm",
    bestFor: "Craft beer, groups, brewery experience",
    vibe: "American-style brewpub with local soul",
    slug: "arbor-brewing-company",
  },
  {
    name: "Skyye",
    type: "Rooftop Club",
    description: "UB City's crown jewel. Skyye sits atop the luxury mall with 360-degree views of Bangalore's skyline. It's expensive, exclusive, and absolutely stunning on a clear night.",
    mustTry: "Premium cocktails, bottle service",
    priceRange: "₹4,000+ for two",
    timings: "7pm – 1am",
    bestFor: "Celebrations, VIP experience, views",
    vibe: "Ultra-premium rooftop with celebrity sightings",
    slug: "skyye-lounge",
  },
];

const moreSpots = [
  { name: "Monkey Bar", type: "Gastropub", area: "Ashok Nagar" },
  { name: "Sankey's", type: "Club", area: "Lavelle Road" },
  { name: "Biere Club", type: "Beer Garden", area: "Lavelle Road" },
  { name: "Daddy's", type: "Sports Bar", area: "Brigade Road" },
  { name: "ILeBar", type: "Cocktail Lounge", area: "UB City" },
];

const history = [
  {
    era: "1970s-80s",
    title: "The Birth of Bangalore Nightlife",
    description: "Pecos opens in 1979, becoming India's first rock pub. MG Road and Brigade Road establish themselves as the city's entertainment district.",
  },
  {
    era: "1990s",
    title: "The Pub Culture Boom",
    description: "As Bangalore's IT sector grows, so does its pub scene. Cascade, Guzzlers, and other classics open. Brigade Road becomes 'The Party Strip.'",
  },
  {
    era: "2000s",
    title: "International Influences",
    description: "Hard Rock Cafe, TGI Friday's, and other international chains arrive. Rooftop bars like 13th Floor redefine the experience.",
  },
  {
    era: "2010s-Now",
    title: "The Craft Revolution",
    description: "Arbor, Toit, and others bring craft beer to MG Road. The area evolves from pure party zone to curated experiences. UB City adds luxury.",
  },
];

const localTips = [
  {
    icon: "🚶",
    title: "Walk It",
    tip: "The best way to experience this area is on foot. Park once and walk between venues. Brigade Road, MG Road, and Church Street are all connected.",
  },
  {
    icon: "🕐",
    title: "Timing",
    tip: "Start early (6-7pm) for sundowners at a rooftop, then move to street-level bars. The area peaks around 10pm on weekends.",
  },
  {
    icon: "🚇",
    title: "Metro",
    tip: "MG Road Metro Station drops you right in the action. No parking stress, no surge pricing. The purple line is your friend.",
  },
  {
    icon: "💰",
    title: "Budget Range",
    tip: "Budget varies wildly — from ₹500 at Pecos to ₹5,000+ at Skyye. Know your vibe before you go.",
  },
];

export default function MGRoadPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "mg-road-guide"
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1920&q=80" 
              alt="MG Road Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-violet-400 font-medium mb-2">Neighborhood Guide</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                MG Road & Brigade Road
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                The Iconic Party Strip
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
            <span className="text-white">MG Road & Brigade Road</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-16">
            <p className="text-xl text-zinc-300 leading-relaxed">
              <strong>MG Road and Brigade Road</strong> are where Bangalore's nightlife was born. Before 
              Koramangala had craft beer, before Indiranagar had rooftop bars — there was this strip.
            </p>
            <p>
              Mahatma Gandhi Road (MG Road) and its perpendicular partner Brigade Road form a walkable 
              entertainment district in the heart of the city. This is old-school Bangalore: tree-lined 
              streets, heritage buildings, and pubs that have been pouring pitchers since your parents 
              were in college.
            </p>
            <p>
              <strong>Pecos</strong> has been playing rock music since 1979. <strong>The Pub</strong> still 
              has pool tables in the basement. <strong>Hard Rock Cafe</strong> brings international energy. 
              And at the top of it all, literally, rooftop bars like <strong>13th Floor</strong> and 
              <strong>Skyye</strong> offer views of a city that's changed dramatically — while the spirit 
              of this district remains the same.
            </p>
            <p>
              This isn't the newest or trendiest neighborhood anymore, but it might be the most essential. 
              You can't claim to know Bangalore nightlife until you've done a Brigade Road pub crawl.
            </p>
          </section>

          {/* History Timeline */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">
              📜 A Brief History
            </h2>
            <div className="space-y-4">
              {history.map((era) => (
                <div key={era.era} className="flex gap-4 items-start">
                  <div className="w-24 flex-shrink-0">
                    <span className="text-sm font-bold text-violet-400">{era.era}</span>
                  </div>
                  <div className="flex-1 pb-4 border-b border-zinc-800 last:border-0">
                    <h3 className="font-semibold text-white">{era.title}</h3>
                    <p className="text-zinc-400 text-sm">{era.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Iconic Venues */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">
              🍻 Iconic Venues
            </h2>
            <div className="space-y-6">
              {iconicVenues.map((venue, index) => (
                <div key={venue.slug} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-violet-400 font-semibold text-sm">#{index + 1}</span>
                      <h3 className="text-xl font-semibold text-white">
                        <Link href={`/venues/${venue.slug}`} className="hover:text-violet-400">
                          {venue.name}
                        </Link>
                      </h3>
                      <p className="text-zinc-500 text-sm">{venue.type}</p>
                    </div>
                    <span className="text-sm text-zinc-500">{venue.priceRange}</span>
                  </div>
                  <p className="text-zinc-300 mb-3">{venue.description}</p>
                  <p className="text-violet-400 text-sm italic mb-3">"{venue.vibe}"</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-zinc-500">Must Try:</span>
                      <span className="text-zinc-300 ml-1">{venue.mustTry}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">Best For:</span>
                      <span className="text-zinc-300 ml-1">{venue.bestFor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* More Spots */}
          <section className="mb-16">
            <h2 className="text-xl font-serif font-bold text-white mb-4">
              Also Worth Checking Out
            </h2>
            <div className="flex flex-wrap gap-2">
              {moreSpots.map((spot) => (
                <span 
                  key={spot.name}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300"
                >
                  {spot.name} <span className="text-stone-400">• {spot.type}</span>
                </span>
              ))}
            </div>
          </section>

          {/* Events CTA */}
          <section className="mb-16 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-2">🎸 Live Music & Events</h3>
            <p className="text-rose-100 mb-4">
              Hard Rock Cafe hosts weekly live bands. Comedy shows, DJ nights, and special events 
              across the district. See what's on this week.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-zinc-900 text-rose-700 font-medium rounded-lg hover:bg-rose-50 transition-colors"
            >
              Browse Events →
            </a>
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

          {/* Pub Crawl Suggestion */}
          <section className="mb-16 bg-zinc-900 rounded-2xl p-8">
            <h2 className="text-xl font-serif font-bold text-white mb-4">
              🍺 The Classic Brigade Road Pub Crawl
            </h2>
            <ol className="space-y-3 text-zinc-300">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-sm flex items-center justify-center flex-shrink-0">1</span>
                <span><strong>6pm – Start at 13th Floor</strong> for sundowner cocktails with a view</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-sm flex items-center justify-center flex-shrink-0">2</span>
                <span><strong>7:30pm – Arbor Brewing Company</strong> for craft beer and food</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-sm flex items-center justify-center flex-shrink-0">3</span>
                <span><strong>9pm – Pecos</strong> for pitchers and rock music (the essential stop)</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-sm flex items-center justify-center flex-shrink-0">4</span>
                <span><strong>10:30pm – Hard Rock Cafe</strong> for live music and late-night energy</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-sm flex items-center justify-center flex-shrink-0">5</span>
                <span><strong>12am – Wrap up</strong> with street food from the nearby stalls</span>
              </li>
            </ol>
          </section>

          {/* Related */}
          <section className="mb-16">
            <h2 className="text-xl font-serif font-bold text-white mb-4">
              If You Like This Area, Also Check Out:
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/neighborhoods/church-street" 
                className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors"
              >
                Church Street →
              </Link>
              <Link 
                href="/neighborhoods/indiranagar" 
                className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors"
              >
                Indiranagar →
              </Link>
              <Link 
                href="/neighborhoods/koramangala" 
                className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors"
              >
                Koramangala →
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
