import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "12 Best Breweries in Bangalore (2026) — Craft Beer Guide",
  description: "The definitive guide to Bangalore's best breweries and microbreweries. From Toit to Byg Brewski, discover where to find the best craft beer in India's beer capital.",
  keywords: "best breweries bangalore, craft beer bangalore, microbreweries bangalore, toit bangalore, arbor brewing, byg brewski, windmills craftworks, bangalore beer",
  openGraph: {
    title: "12 Best Breweries in Bangalore (2026)",
    description: "India's craft beer capital. Here's where to find the best brews in Bangalore.",
  },
};

const breweries = [
  {
    rank: 1,
    name: "Toit Brewpub",
    neighborhood: "Indiranagar",
    established: "2010",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `The one that started it all. Toit didn't just open a brewery in Bangalore — it sparked a craft beer revolution across India. Since 2010, this Indiranagar institution has been the gold standard.

What makes Toit special isn't just the beer (though that's exceptional). It's the consistency, the innovation, and the atmosphere. They were doing craft beer when most Indians had never heard the term.

The classics — Toit Weiss, Tintin Toit, Basmati Blonde — are brewed to perfection every time. But the seasonal specials and experimental batches are where the brewmasters really shine. Visit often enough and you'll catch limited releases you won't find anywhere else.`,
    signatureBeers: ["Toit Weiss (Hefeweizen)", "Tintin Toit (Belgian Strong)", "Basmati Blonde", "Colonial Toit (IPA)"],
    mustTry: "Toit Weiss — the perfect introduction to craft beer",
    priceRange: "₹1,200-1,600 for two",
    timings: "12pm – 1am",
    bestFor: "The quintessential Bangalore brewery experience",
    vibe: "Buzzing, crowded, legendary",
    address: "100 Feet Road, Indiranagar",
    slug: "toit-brewpub",
  },
  {
    rank: 2,
    name: "Arbor Brewing Company",
    neighborhood: "Magrath Road",
    established: "2012",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
    description: `American craft brewing expertise meets Indian innovation. Arbor was founded by a Michigan-based brewing company and brought international standards to Bangalore's nascent craft scene.

Their Bangalore Bliss IPA is iconic — a beer that proved Indians could appreciate (and love) hoppy, bitter ales. The Elephas Maximus Stout is equally legendary, rich and roasty with notes of coffee and chocolate.

The brewery itself is impressive: a converted warehouse with visible brewing tanks, industrial aesthetics, and a menu that goes well beyond bar snacks. It's also perfectly located near MG Road, making it an ideal start or stop for a pub crawl.`,
    signatureBeers: ["Bangalore Bliss IPA", "Elephas Maximus Stout", "Raging Elephant (DIPA)", "Dirty Blonde"],
    mustTry: "Bangalore Bliss IPA — the beer that put Indian IPAs on the map",
    priceRange: "₹1,400-1,800 for two",
    timings: "12pm – 11:30pm",
    bestFor: "IPA lovers, American-style brewing, the craft beer connoisseur",
    vibe: "Industrial, sophisticated, serious about beer",
    address: "8 Magrath Road, off MG Road",
    slug: "arbor-brewing-company",
  },
  {
    rank: 3,
    name: "Byg Brewski Brewing Company",
    neighborhood: "Hennur / Sarjapur",
    established: "2017",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `Go big or go home — that's the Byg Brewski philosophy. Their flagship Hennur location is one of the largest brewery spaces in India, sprawling across multiple acres with outdoor seating, multiple bars, and a capacity that rivals small music festivals.

The beer is solid — perhaps not as cutting-edge as Toit or Arbor, but consistently good and perfect for session drinking. Their Hefeweizen and Belgian Wit are crowd-pleasers.

But Byg Brewski is really about the experience. This is where you bring a large group for a Sunday afternoon, where you celebrate birthdays and promotions, where you spend entire days moving between the different seating areas. The Hennur location has lake views; the Sarjapur outpost is equally massive.`,
    signatureBeers: ["Byg Brewski Lager", "Hefeweizen", "Belgian Wit", "Stout"],
    mustTry: "Their Hefeweizen with a Sunday brunch",
    priceRange: "₹1,200-1,600 for two",
    timings: "12pm – 1am",
    bestFor: "Large groups, day drinking, outdoor vibes, celebrations",
    vibe: "Massive, party-ready, Instagram-worthy",
    address: "Hennur Road (flagship) / Sarjapur Road",
    slug: "byg-brewski",
  },
  {
    rank: 4,
    name: "Windmills Craftworks",
    neighborhood: "Whitefield",
    established: "2014",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `Whitefield's craft beer anchor. Windmills brought quality brewing to Bangalore's IT corridor, giving the tech crowd a reason to celebrate after work without trekking to Koramangala or Indiranagar.

The space is beautiful — exposed brick, copper brewing tanks, warm lighting, and a refined atmosphere that's a notch above typical brewery chaos. It's also more family-friendly than most, with outdoor seating and a less rowdy vibe.

Their Belgian-style beers are particularly impressive. The Wit and the Tripel show real craftsmanship. The food menu is substantial too, making it a proper dinner destination, not just a drinking spot.`,
    signatureBeers: ["Belgian Wit", "Hefeweizen", "Belgian Tripel", "Pilsner"],
    mustTry: "Belgian Wit — crisp, refreshing, perfect for Bangalore weather",
    priceRange: "₹1,400-1,800 for two",
    timings: "12pm – 11:30pm",
    bestFor: "Whitefield IT crowd, couples, Belgian beer lovers",
    vibe: "Refined, warm, less chaotic",
    address: "Whitefield Main Road",
    slug: "windmills-craftworks",
  },
  {
    rank: 5,
    name: "The Bier Library",
    neighborhood: "Koramangala",
    established: "2016",
    image: "https://images.unsplash.com/photo-1546071379-a3a0e72e7333?w=800&q=80",
    description: `For the beer nerd who wants to explore beyond the usual. The Bier Library takes craft beer seriously — their rotating tap selection includes styles you won't find at most Bangalore breweries.

The industrial-chic space in Koramangala features an impressive number of taps, each pouring something different. Belgian Tripels, smoked porters, barrel-aged experiments, seasonal specials — the menu changes regularly.

The staff actually knows their beer. Unlike most places where you'll get a blank stare asking about IBUs or malt bills, The Bier Library team can guide you through styles and make recommendations. Perfect for when you want to learn, not just drink.`,
    signatureBeers: ["Rotating craft taps", "Smoked Porter", "Belgian styles", "Seasonal specials"],
    mustTry: "Ask the bartender for their current favorite — they always have insider picks",
    priceRange: "₹1,000-1,400 for two",
    timings: "12pm – 12:30am",
    bestFor: "Beer enthusiasts, trying new styles, learning about craft beer",
    vibe: "Industrial, geeky, rotating selection",
    address: "Koramangala 5th Block",
    slug: "the-bier-library",
  },
  {
    rank: 6,
    name: "Uru Brewpark",
    neighborhood: "Hennur",
    established: "2019",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
    description: `A newer entrant that's quickly made a name for itself. Uru combines quality brewing with an expansive outdoor space that rivals Byg Brewski in scale.

The beer program is ambitious, with a range that spans traditional German styles to experimental brews. Their Kölsch and Märzen are particularly well-executed — clean, crisp, and true to style.

What sets Uru apart is the attention to detail in both beer and space. The grounds are beautifully landscaped, there's ample seating, and the overall experience feels premium without being pretentious.`,
    signatureBeers: ["Kölsch", "Märzen", "Wheat Beer", "IPA"],
    mustTry: "Their Kölsch — a style rarely done well in India",
    priceRange: "₹1,400-1,800 for two",
    timings: "12pm – 11:30pm",
    bestFor: "German beer lovers, outdoor day sessions, quality brewing",
    vibe: "Expansive, green, well-designed",
    address: "Hennur Road",
    slug: "uru-brewpark",
  },
  {
    rank: 7,
    name: "Red Rhino",
    neighborhood: "Whitefield",
    established: "2018",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `Another strong Whitefield contender. Red Rhino brings a playful energy to craft brewing, with a colorful brand identity and a space designed for good times.

The brewing is solid across the board, but they particularly excel at lighter styles — their wheat beers and lagers are perfect for the Bangalore climate. The food menu is substantial, with plenty of sharing options for groups.

The space features multiple levels, outdoor seating, and a vibe that's energetic without being overwhelming. A solid choice for the Whitefield crew looking for variety.`,
    signatureBeers: ["Wheat Beer", "Lager", "Pale Ale", "Stout"],
    mustTry: "Their Wheat Beer on a warm afternoon",
    priceRange: "₹1,200-1,600 for two",
    timings: "12pm – 11:30pm",
    bestFor: "Whitefield locals, groups, easy-drinking beers",
    vibe: "Colorful, playful, spacious",
    address: "Whitefield",
    slug: "red-rhino",
  },
  {
    rank: 8,
    name: "Brahma Brews",
    neighborhood: "HSR Layout",
    established: "2020",
    image: "https://images.unsplash.com/photo-1546071379-a3a0e72e7333?w=800&q=80",
    description: `HSR Layout's craft beer answer. Brahma Brews brings quality brewing to a neighborhood that was underserved by the brewery scene.

The space is cozy but well-designed, with visible brewing equipment and a tap list that punches above its weight. They're not afraid to experiment with styles, and the quality is consistently good.

For HSR residents, this is a godsend — no more trekking to Koramangala or Indiranagar for good beer. And the prices are reasonable for what you get.`,
    signatureBeers: ["Wheat Beer", "Belgian Wit", "IPA", "Seasonal specials"],
    mustTry: "Their rotating seasonal — always interesting",
    priceRange: "₹1,000-1,400 for two",
    timings: "12pm – 11:30pm",
    bestFor: "HSR locals, discovering new brews, casual hangouts",
    vibe: "Neighborhood brewery, cozy, approachable",
    address: "HSR Layout",
    slug: "brahma-brews",
  },
  {
    rank: 9,
    name: "Murphy's Brewhouse",
    neighborhood: "Multiple Locations",
    established: "2015",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
    description: `Irish pub meets Indian brewery. Murphy's brings Celtic charm to Bangalore with dark wood interiors, hearty pub food, and beers that lean traditional.

If you're tired of IPAs and want something malty and satisfying, Murphy's delivers. Their stouts and red ales are some of the best in the city — rich, roasty, and perfect for a slow evening.

Multiple locations around the city, each maintaining the Murphy's character while adapting to the neighborhood.`,
    signatureBeers: ["Irish Stout", "Red Ale", "Lager", "Wheat Beer"],
    mustTry: "Their Irish Stout — closest thing to a Guinness in Bangalore",
    priceRange: "₹1,200-1,600 for two",
    timings: "12pm – 11:30pm",
    bestFor: "Stout lovers, Irish pub vibes, comfort food and beer",
    vibe: "Cozy, traditional, pubby",
    address: "Koramangala, Whitefield, and more",
    slug: "murphys-brewhouse",
  },
  {
    rank: 10,
    name: "Gilly's Brewpub",
    neighborhood: "Koramangala",
    established: "2017",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `Gilly's has expanded into a mini-empire, but the brewpub remains the heart. The Koramangala location brews on-site and serves it fresh, alongside solid pub food.

The beer is accessible — nothing too challenging, but everything is well-made. The wheat beer is a good entry point, and the lager is perfect for those who want something light.

What Gilly's does well is the complete experience: good beer, good food, good music, and a crowd that's there to have fun.`,
    signatureBeers: ["Wheat Beer", "Lager", "Premium Lager", "Seasonal brews"],
    mustTry: "Their Wheat Beer — smooth and easy-drinking",
    priceRange: "₹1,000-1,400 for two",
    timings: "12pm – 11:30pm",
    bestFor: "Groups, live music nights, approachable craft beer",
    vibe: "Energetic, social, fun",
    address: "Koramangala",
    slug: "gillys-brewpub",
  },
];

export default function BestBreweriesPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "best-breweries-guide"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=1920&q=80" 
              alt="Best breweries in Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-amber-400 font-medium mb-2">Craft Beer Guide</p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                12 Best Breweries in Bangalore
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                India's craft beer capital. Here's where to find the best brews (2026)
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-stone-200 px-4 py-3">
          <div className="max-w-4xl mx-auto text-sm text-stone-600">
            <Link href="/" className="hover:text-emerald-700">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/guides" className="hover:text-emerald-700">Guides</Link>
            <span className="mx-2">→</span>
            <span className="text-stone-900">Best Breweries in Bangalore</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              Bangalore is India's undisputed craft beer capital. While the rest of the country was still 
              drinking mass-produced lagers, Bangalore was brewing IPAs, stouts, and wheat beers that 
              could compete with the best in the world.
            </p>
            <p>
              The craft beer revolution started here in 2010 when Toit opened its doors in Indiranagar. 
              Since then, the city has exploded with breweries — from intimate neighborhood spots to 
              massive brewery parks that feel like beer-themed amusement parks.
            </p>
            <p>
              Whether you're a hop-head looking for the perfect IPA, a traditionalist who wants a 
              well-crafted wheat beer, or just someone who wants to drink good beer in a great space, 
              Bangalore has a brewery for you. <strong>Here are the 12 best.</strong>
            </p>
          </section>

          {/* Quick Stats */}
          <section className="mb-12 bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h2 className="text-lg font-semibold text-amber-900 mb-4">Bangalore Brewery Scene: Quick Facts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-700">50+</div>
                <div className="text-sm text-amber-600">Breweries & Brewpubs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-700">2010</div>
                <div className="text-sm text-amber-600">Craft Beer Revolution</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-700">100+</div>
                <div className="text-sm text-amber-600">Beer Styles Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-700">#1</div>
                <div className="text-sm text-amber-600">In India for Craft Beer</div>
              </div>
            </div>
          </section>

          {/* Brewery Listings */}
          <section className="space-y-10">
            {breweries.map((brewery) => (
              <article key={brewery.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={brewery.image} 
                      alt={brewery.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded mb-2">
                          #{brewery.rank}
                        </span>
                        <h2 className="text-2xl font-semibold text-stone-900">
                          <Link href={`/venues/${brewery.slug}`} className="hover:text-emerald-700">
                            {brewery.name}
                          </Link>
                        </h2>
                        <p className="text-stone-500">{brewery.neighborhood} • Est. {brewery.established}</p>
                      </div>
                    </div>
                    
                    <div className="my-4">
                      {brewery.description.split('\n\n').map((para, i) => (
                        <p key={i} className="text-stone-700 text-sm leading-relaxed mb-3">{para}</p>
                      ))}
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4 mb-4">
                      <h3 className="text-sm font-semibold text-amber-900 mb-2">🍺 Signature Beers</h3>
                      <div className="flex flex-wrap gap-2">
                        {brewery.signatureBeers.map((beer) => (
                          <span key={beer} className="text-xs px-2 py-1 bg-white text-amber-700 rounded-full border border-amber-200">
                            {beer}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-stone-500">Must Try:</span>
                        <span className="text-stone-700 ml-1">{brewery.mustTry}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Price:</span>
                        <span className="text-stone-700 ml-1">{brewery.priceRange}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Timings:</span>
                        <span className="text-stone-700 ml-1">{brewery.timings}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Vibe:</span>
                        <span className="text-stone-700 ml-1">{brewery.vibe}</span>
                      </div>
                    </div>

                    <p className="text-sm text-emerald-700 italic mb-4">Best for: {brewery.bestFor}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Events CTA */}
          <section className="my-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-2">🎉 Brewery Events & Tap Takeovers</h3>
            <p className="text-amber-100 mb-4">
              Special releases, brewery anniversaries, and tap takeovers happen regularly. 
              Don't miss the limited edition brews.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-white text-amber-700 font-medium rounded-lg hover:bg-amber-50 transition-colors"
            >
              Browse Events →
            </a>
          </section>

          {/* Brewery Crawl */}
          <section className="mb-12 bg-stone-100 rounded-2xl p-8">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">
              🍺 The Ultimate Bangalore Brewery Crawl
            </h2>
            <p className="text-stone-600 mb-4">If you want to hit multiple breweries in a day, here's our suggested route:</p>
            <ol className="space-y-3 text-stone-700">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-sm flex items-center justify-center flex-shrink-0">1</span>
                <span><strong>12pm – Start at Toit Indiranagar</strong> (get there early to avoid crowds)</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-sm flex items-center justify-center flex-shrink-0">2</span>
                <span><strong>2pm – Head to The Bier Library</strong> in Koramangala</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-sm flex items-center justify-center flex-shrink-0">3</span>
                <span><strong>4pm – Arbor Brewing Company</strong> near MG Road</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-sm flex items-center justify-center flex-shrink-0">4</span>
                <span><strong>7pm – End at any MG Road pub</strong> for dinner and last rounds</span>
              </li>
            </ol>
            <p className="text-sm text-stone-500 mt-4">Pro tip: Take Uber/Ola. Don't even think about driving.</p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Which is the best brewery in Bangalore for a first-timer?",
                  a: "Toit is the classic choice — great beer, great atmosphere, and a perfect introduction to Bangalore's craft beer scene. Their Toit Weiss is an excellent starting point for craft beer newcomers.",
                },
                {
                  q: "Are Bangalore breweries expensive?",
                  a: "Expect to spend ₹1,000-1,800 for two people including beer and food. That's more than drinking at home, but reasonable for freshly brewed craft beer. Happy hours and weekday visits can save money.",
                },
                {
                  q: "Which brewery has the best outdoor seating?",
                  a: "Byg Brewski (Hennur) has the most expansive outdoor space, with gardens and lake views. Uru Brewpark is another excellent option for outdoor drinking.",
                },
                {
                  q: "Can I visit breweries with kids?",
                  a: "Some breweries like Windmills and Byg Brewski are more family-friendly with outdoor spaces. However, most breweries get rowdy by evening, so afternoon visits are best if bringing kids.",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-900 mb-2">{faq.q}</h3>
                  <p className="text-stone-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Guides */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">
              Related Guides
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/guides/best-pubs-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Best Pubs →
              </Link>
              <Link 
                href="/guides/best-rooftop-bars-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Best Rooftop Bars →
              </Link>
              <Link 
                href="/neighborhoods/koramangala" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Koramangala Guide →
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
