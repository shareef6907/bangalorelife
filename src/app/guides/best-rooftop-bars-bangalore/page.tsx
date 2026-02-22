import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "10 Best Rooftop Bars in Bangalore (2026) — Views & Cocktails",
  description: "Discover Bangalore's best rooftop bars with stunning views and craft cocktails. From Skyye at UB City to Loft 38 in Indiranagar — the ultimate guide to drinking with a view.",
  keywords: "best rooftop bars bangalore, rooftop bars bangalore, skyye bangalore, 13th floor bangalore, loft 38, bangalore rooftop, rooftop lounges bangalore, bangalore views",
  openGraph: {
    title: "10 Best Rooftop Bars in Bangalore (2026)",
    description: "Stunning views, craft cocktails, and Bangalore's perfect weather. The ultimate rooftop bar guide.",
  },
};

const rooftopBars = [
  {
    rank: 1,
    name: "Skyye Lounge",
    neighborhood: "UB City",
    floor: "16th Floor",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    description: `The crown jewel of Bangalore's rooftop scene. Skyye sits atop UB City, the city's most exclusive mall, offering 360-degree views that are simply unmatched.

This is where Bangalore comes to celebrate — promotions, anniversaries, birthdays. The crowd is well-heeled, the cocktails are expertly crafted, and the views on a clear night are worth every rupee of the premium pricing.

Yes, it's expensive. Yes, there's often a wait for the best tables. But if you're going to do one rooftop in Bangalore, this is the one. Book ahead for sunset tables.`,
    mustTry: ["Signature cocktails", "Bottle service", "Champagne"],
    priceRange: "₹4,000+ for two",
    timings: "7pm – 1:30am",
    bestFor: "Special occasions, impressing dates, best views in the city",
    dressCode: "Smart casual to formal (no shorts, no slippers)",
    views: "360° city skyline, sunsets over Cubbon Park",
    slug: "skyye-lounge",
  },
  {
    rank: 2,
    name: "13th Floor",
    neighborhood: "MG Road",
    floor: "13th Floor, Barton Centre",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    description: `One of Bangalore's original rooftop bars, and still one of the best. 13th Floor has been offering sundowners with a view since before rooftop bars were trendy.

The location is perfect — on MG Road, accessible by metro, and with views that span from Cubbon Park to the city center. The vibe is more relaxed than Skyye, with a mix of after-work crowds and weekend revelers.

Come for sunset. Stay for the cocktails. The mojitos are reliable, the wine list is solid, and the finger food hits the spot.`,
    mustTry: ["Mojitos", "Wine selection", "Finger food"],
    priceRange: "₹2,500-3,500 for two",
    timings: "6pm – 11:30pm",
    bestFor: "Sundowners, MG Road crawls, reliable quality",
    dressCode: "Smart casual",
    views: "Cubbon Park, MG Road, city center",
    slug: "13th-floor",
  },
  {
    rank: 3,
    name: "Loft 38",
    neighborhood: "Indiranagar",
    floor: "Rooftop",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    description: `Indiranagar's sleekest rooftop. Loft 38 combines expertly crafted cocktails with minimalist design and a sophisticated crowd.

This is where you bring a date you want to impress. The cocktail menu is creative and well-executed, the music is curated, and the rooftop seating fills up fast. The vibe is upscale without being pretentious.

It's also a great option before or after hitting the Indiranagar bar scene — start with sunset cocktails at Loft 38, then descend into 12th Main for the rest of the night.`,
    mustTry: ["Signature cocktails", "Gin menu", "Small plates"],
    priceRange: "₹2,000-3,000 for two",
    timings: "5pm – 1am",
    bestFor: "Date nights, pre-bar crawl drinks, cocktail lovers",
    dressCode: "Smart casual",
    views: "Indiranagar skyline, sunset views",
    slug: "loft-38",
  },
  {
    rank: 4,
    name: "High Ultra Lounge",
    neighborhood: "Malleshwaram",
    floor: "32nd Floor, World Trade Center",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80",
    description: `The highest bar in Bangalore, literally. At 32 floors up in the World Trade Center, High Ultra Lounge offers perspectives you can't get anywhere else.

The space is massive, with both indoor and outdoor seating. The cocktail program is ambitious, the music leans electronic, and the crowd skews young and fashionable.

On a clear day, you can see beyond the city limits. On a clear night, the city lights stretch to the horizon. Worth the trip to Malleshwaram.`,
    mustTry: ["Molecular cocktails", "Premium spirits", "DJ nights"],
    priceRange: "₹3,000-4,000 for two",
    timings: "7pm – 1am",
    bestFor: "Highest views, electronic music, statement evenings",
    dressCode: "Smart casual to dressy",
    views: "Highest panoramic views in Bangalore",
    slug: "high-ultra-lounge",
  },
  {
    rank: 5,
    name: "Pebble",
    neighborhood: "UB City",
    floor: "Rooftop",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    description: `Skyye's more approachable neighbor. Pebble offers similar UB City rooftop views at slightly friendlier prices, with a more relaxed atmosphere.

The design is contemporary, the cocktails are well-made, and the food menu is more substantial than typical bar fare. It's also easier to get a table than Skyye on busy nights.

Perfect for when you want the UB City rooftop experience without the full Skyye commitment.`,
    mustTry: ["Craft cocktails", "Rooftop dining", "Wine selection"],
    priceRange: "₹2,500-3,500 for two",
    timings: "12pm – 1am",
    bestFor: "UB City views without Skyye prices, lunch-to-dinner",
    dressCode: "Smart casual",
    views: "UB City courtyard, city skyline",
    slug: "pebble",
  },
  {
    rank: 6,
    name: "Vapour Pub & Brewery",
    neighborhood: "Indiranagar / Whitefield",
    floor: "Rooftop",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `Brewery meets rooftop. Vapour combines craft beer brewing with open-air rooftop vibes, giving you the best of both worlds.

The beers are brewed on-site and are solid across the board. The rooftop space is expansive, with plenty of seating and a party atmosphere on weekends.

Multiple locations across the city, but the rooftop experience is similar: good beer, open sky, good times.`,
    mustTry: ["House-brewed beers", "Beer tasting flights", "Bar snacks"],
    priceRange: "₹1,500-2,000 for two",
    timings: "12pm – 11:30pm",
    bestFor: "Craft beer with a view, casual rooftop vibes",
    dressCode: "Casual to smart casual",
    views: "Open sky, neighborhood views",
    slug: "vapour-pub-brewery",
  },
  {
    rank: 7,
    name: "The Terrace at Gilly's",
    neighborhood: "Koramangala",
    floor: "Rooftop",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    description: `Koramangala's go-to rooftop. The Terrace at Gilly's offers open-air drinking without the UB City prices or pretense.

The vibe is fun and social — live music nights, DJ sets, and a crowd that's there to have a good time. The drinks are straightforward and affordable, the food is reliable, and the rooftop fills up fast on weekends.

Perfect for groups who want to party under the stars without breaking the bank.`,
    mustTry: ["Pitchers", "Cocktail towers", "Pub grub"],
    priceRange: "₹1,200-1,800 for two",
    timings: "12pm – 11:30pm",
    bestFor: "Groups, live music, affordable rooftop fun",
    dressCode: "Casual",
    views: "Koramangala skyline",
    slug: "the-terrace-gillys",
  },
  {
    rank: 8,
    name: "Level 12",
    neighborhood: "Koramangala",
    floor: "12th Floor",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    description: `Koramangala's elevated lounge experience. Level 12 offers sophisticated rooftop drinking with views across the neighborhood.

The cocktail menu is creative, the interiors are stylish, and the crowd tends to be slightly older and more refined than typical Koramangala spots.

A good option when you want Koramangala convenience with a touch of elevation (literally).`,
    mustTry: ["Craft cocktails", "Whiskey selection", "Tapas"],
    priceRange: "₹2,000-2,500 for two",
    timings: "6pm – 12am",
    bestFor: "Elevated Koramangala experience, cocktail lovers",
    dressCode: "Smart casual",
    views: "South Bangalore panorama",
    slug: "level-12",
  },
  {
    rank: 9,
    name: "Sky Garden",
    neighborhood: "Whitefield",
    floor: "Rooftop",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    description: `Whitefield's answer to the rooftop scene. Sky Garden brings garden vibes to elevation, with greenery, open seating, and a relaxed atmosphere.

The setting is more laid-back than city-center rooftops — think Sunday afternoon drinks rather than Saturday night scene. The drinks are solid, the food is good, and the outdoor space is genuinely pleasant.

Ideal for the Whitefield tech crowd who want rooftop drinks without the commute downtown.`,
    mustTry: ["Garden cocktails", "Brunch menu", "Fresh juices"],
    priceRange: "₹1,500-2,000 for two",
    timings: "12pm – 11pm",
    bestFor: "Whitefield locals, daytime rooftop, relaxed vibes",
    dressCode: "Casual",
    views: "Whitefield greenery, open sky",
    slug: "sky-garden-whitefield",
  },
  {
    rank: 10,
    name: "Ebony",
    neighborhood: "MG Road",
    floor: "13th Floor",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80",
    description: `A classic that's been around for decades. Ebony combines fine dining with rooftop views, offering a more formal experience than typical bars.

The restaurant focuses on Continental cuisine, but the real draw is the wraparound terrace with city views. It's a throwback to a more elegant era of Bangalore dining.

Best for special occasions where you want proper dinner with a view, not just drinks.`,
    mustTry: ["Continental cuisine", "Wine pairing", "Sunset terrace"],
    priceRange: "₹3,000-4,000 for two",
    timings: "12pm – 11pm",
    bestFor: "Fine dining with views, special occasions",
    dressCode: "Smart casual to formal",
    views: "City center, heritage buildings",
    slug: "ebony",
  },
];

export default function BestRooftopBarsPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "rooftop-bars-guide"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80" 
              alt="Best rooftop bars in Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-purple-400 font-medium mb-2">Nightlife Guide</p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                10 Best Rooftop Bars in Bangalore
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Stunning views, craft cocktails, and perfect weather (2026)
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
            <span className="text-stone-900">Best Rooftop Bars in Bangalore</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              Bangalore's weather is perfect for rooftop drinking. Mild temperatures year-round, 
              low humidity, and skies that turn spectacular at sunset — it's like the city was 
              designed for elevated bars.
            </p>
            <p>
              From ultra-premium lounges atop luxury malls to brewery rooftops where you can 
              drink craft beer under the stars, Bangalore's rooftop scene has options for every 
              occasion and budget.
            </p>
            <p>
              Whether you're celebrating a special occasion, planning a date night, or just want 
              sundowners with a view, these are the <strong>10 best rooftop bars in Bangalore</strong>.
            </p>
          </section>

          {/* Pro Tips Box */}
          <section className="mb-12 bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h2 className="text-lg font-semibold text-purple-900 mb-4">🌆 Rooftop Bar Pro Tips</h2>
            <ul className="space-y-2 text-purple-800 text-sm">
              <li>• <strong>Sunset timing:</strong> Bangalore sunsets are around 6-6:30pm year-round. Arrive 30-45 mins early for good seats.</li>
              <li>• <strong>Reservations:</strong> Weekend evenings at Skyye and 13th Floor need bookings. Call ahead or use Dineout.</li>
              <li>• <strong>Dress code:</strong> Premium rooftops enforce smart casual. Skip the shorts and flip-flops.</li>
              <li>• <strong>Rain check:</strong> Monsoon season (June-September) can be unpredictable. Have a backup plan.</li>
            </ul>
          </section>

          {/* Rooftop Bar Listings */}
          <section className="space-y-10">
            {rooftopBars.map((bar) => (
              <article key={bar.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={bar.image} 
                      alt={bar.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded mb-2">
                          #{bar.rank}
                        </span>
                        <h2 className="text-2xl font-semibold text-stone-900">
                          <Link href={`/venues/${bar.slug}`} className="hover:text-emerald-700">
                            {bar.name}
                          </Link>
                        </h2>
                        <p className="text-stone-500">{bar.neighborhood} • {bar.floor}</p>
                      </div>
                    </div>
                    
                    <div className="my-4">
                      {bar.description.split('\n\n').map((para, i) => (
                        <p key={i} className="text-stone-700 text-sm leading-relaxed mb-3">{para}</p>
                      ))}
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-purple-700">
                        <strong>Views:</strong> {bar.views}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-stone-500">Price:</span>
                        <span className="text-stone-700 ml-1">{bar.priceRange}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Timings:</span>
                        <span className="text-stone-700 ml-1">{bar.timings}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Dress Code:</span>
                        <span className="text-stone-700 ml-1">{bar.dressCode}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Best For:</span>
                        <span className="text-stone-700 ml-1">{bar.bestFor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Events CTA */}
          <section className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-2">🎉 Rooftop Events & DJ Nights</h3>
            <p className="text-purple-100 mb-4">
              Special parties, DJ nights, and rooftop events happen regularly. 
              Check what's on this weekend.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-white text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition-colors"
            >
              Browse Events →
            </a>
          </section>

          {/* Related Guides */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">
              Related Guides
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/guides/date-night-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Date Night Ideas →
              </Link>
              <Link 
                href="/guides/best-cocktail-bars-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Best Cocktail Bars →
              </Link>
              <Link 
                href="/neighborhoods/mg-road-brigade-road" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                MG Road Guide →
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
