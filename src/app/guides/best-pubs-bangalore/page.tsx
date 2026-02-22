import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "15 Best Pubs in Bangalore (2026 Guide) — BangaloreLife",
  description: "The definitive guide to the best pubs in Bangalore. From legendary brewpubs like Toit to hidden speakeasies, discover where to drink in India's pub capital.",
  keywords: "best pubs in bangalore, bangalore pubs, best bars bangalore, toit bangalore, koramangala pubs, indiranagar bars, bangalore nightlife, craft beer bangalore",
  openGraph: {
    title: "15 Best Pubs in Bangalore (2026 Guide)",
    description: "The definitive guide to Bangalore's best pubs. Craft beer, cocktails, and legendary watering holes.",
  },
};

const pubs = [
  {
    rank: 1,
    name: "Toit Brewpub",
    neighborhood: "Indiranagar / Koramangala",
    type: "Brewpub",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `If there's one pub that defines Bangalore's craft beer revolution, it's Toit. Since 2010, this Indiranagar institution has been setting the standard for what a brewpub should be.

The beer is brewed on-site, and the rotating taps mean there's always something new to try. The Toit Weiss (a refreshing wheat beer) and Tintin Toit (a Belgian-style strong ale) are legends for good reason. But don't sleep on the Basmati Blonde or their seasonal specials.

Beyond the beer, Toit gets the pub experience right: good food, energetic crowds, and a buzz that never dies down. It's always packed, especially on weekends — get there early or prepare to wait.`,
    mustTry: ["Toit Weiss", "Tintin Toit", "Basmati Blonde", "Buffalo Wings"],
    priceRange: "₹1,200-1,600 for two",
    timings: "12pm – 1am",
    bestFor: ["Craft Beer", "Groups", "The Essential Bangalore Experience"],
    address: "100 Feet Road, Indiranagar (also in Koramangala)",
    googleMaps: "https://maps.google.com/?q=Toit+Indiranagar+Bangalore",
    slug: "toit-brewpub",
  },
  {
    rank: 2,
    name: "The Bier Library",
    neighborhood: "Koramangala",
    type: "Craft Beer Bar",
    image: "https://images.unsplash.com/photo-1546071379-a3a0e72e7333?w=800&q=80",
    description: `For beer nerds who want to explore beyond the usual, The Bier Library is essential. This industrial-chic space in Koramangala features an impressive selection of craft beers on tap — including styles you won't find anywhere else in the city.

The rotating menu keeps things interesting, with everything from Belgian tripels to American IPAs to smoked porters. The staff actually knows their beer and can guide you through the options.

The vibe is more relaxed than Toit — less rowdy, more conversational. Great for catching up with friends or a casual date.`,
    mustTry: ["Rotating craft taps", "Smoked Porter", "Belgian styles"],
    priceRange: "₹1,000-1,400 for two",
    timings: "12pm – 12:30am",
    bestFor: ["Beer Enthusiasts", "Casual Dates", "Trying New Styles"],
    address: "Koramangala 5th Block",
    googleMaps: "https://maps.google.com/?q=The+Bier+Library+Koramangala",
    slug: "the-bier-library",
  },
  {
    rank: 3,
    name: "Arbor Brewing Company",
    neighborhood: "Magrath Road",
    type: "Brewery",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
    description: `One of India's original craft breweries, Arbor brought American brewing expertise to Bangalore and created something special. Their Bangalore Bliss IPA is iconic — a beer that put Indian craft beer on the map.

The space itself is impressive: a former warehouse transformed into a proper brewery with visible tanks and an industrial aesthetic. The food menu is substantial, going well beyond typical bar snacks.

Located near MG Road, it's an excellent anchor for a Brigade Road pub crawl.`,
    mustTry: ["Bangalore Bliss IPA", "Elephas Maximus Stout", "Raging Elephant"],
    priceRange: "₹1,400-1,800 for two",
    timings: "12pm – 11:30pm",
    bestFor: ["IPA Lovers", "Brewery Experience", "Groups"],
    address: "8 Magrath Road, off MG Road",
    googleMaps: "https://maps.google.com/?q=Arbor+Brewing+Company+Bangalore",
    slug: "arbor-brewing-company",
  },
  {
    rank: 4,
    name: "Pecos",
    neighborhood: "Brigade Road",
    type: "Classic Rock Pub",
    image: "https://images.unsplash.com/photo-1574534526548-6f6a36cff1ea?w=800&q=80",
    description: `The grandfather of Bangalore pubs. Pecos has been serving pitchers and playing rock music since 1979 — before most of us were born.

There's nothing fancy here: dark interiors, loud rock music, sticky tables, and cheap beer. That's the point. Pecos is a pure, unadulterated pub experience. No craft cocktails, no fusion food, no Instagram-worthy interiors. Just beer, rock, and vibes.

Skip this one at your own risk. You can't claim to know Bangalore nightlife without a Pecos visit.`,
    mustTry: ["Pitcher of Kingfisher", "Chicken Lollipops", "French Fries"],
    priceRange: "₹500-800 for two",
    timings: "11am – 11pm",
    bestFor: ["Rock Music", "Budget Drinks", "Bangalore History"],
    address: "34, Rest House Road, off Brigade Road",
    googleMaps: "https://maps.google.com/?q=Pecos+Brigade+Road+Bangalore",
    slug: "pecos",
  },
  {
    rank: 5,
    name: "Byg Brewski Brewing Company",
    neighborhood: "Hennur / Sarjapur",
    type: "Mega Brewery",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `Byg Brewski thinks big. Their Hennur location is one of the largest brewery spaces in India — an expansive outdoor setup that can accommodate massive crowds.

The beer is solid (though not as cutting-edge as Toit or Arbor), but the experience is the draw. Multiple bars, outdoor seating, live music stages, and a party atmosphere that's perfect for large groups and celebrations.

It's not central, but if you're in North Bangalore or willing to make the trip, it's worth it for the scale alone.`,
    mustTry: ["Byg Brewski Lager", "Hefeweizen", "Bar snacks"],
    priceRange: "₹1,200-1,600 for two",
    timings: "12pm – 1am",
    bestFor: ["Large Groups", "Outdoor Drinking", "Day Sessions"],
    address: "Hennur Road / Sarjapur Road",
    googleMaps: "https://maps.google.com/?q=Byg+Brewski+Hennur",
    slug: "byg-brewski",
  },
  {
    rank: 6,
    name: "Windmills Craftworks",
    neighborhood: "Whitefield",
    type: "Brewpub",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `Whitefield's answer to the craft beer scene, Windmills combines solid brewing with a refined atmosphere. The space is beautiful — think exposed brick, copper tanks, and warm lighting.

Their Belgian-style beers are particularly good, and the food menu is a notch above typical pub fare. It's also one of the more family-friendly breweries, with outdoor seating and a less chaotic vibe than city-center spots.

Essential for anyone working in or visiting Whitefield.`,
    mustTry: ["Belgian Wit", "Hefeweizen", "Craft pizzas"],
    priceRange: "₹1,400-1,800 for two",
    timings: "12pm – 11:30pm",
    bestFor: ["Whitefield Crowd", "After-Work Drinks", "Couples"],
    address: "Whitefield Main Road",
    googleMaps: "https://maps.google.com/?q=Windmills+Craftworks+Whitefield",
    slug: "windmills-craftworks",
  },
  {
    rank: 7,
    name: "Koramangala Social",
    neighborhood: "Koramangala",
    type: "Cafe-Bar Hybrid",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    description: `Social pioneered the co-working-by-day, party-by-night model in India. During the day, it's full of freelancers and startup types on their laptops. After sunset, it transforms into one of Koramangala's most energetic bars.

The drinks are solid (try the LIIT), the food is reliable, and the atmosphere is always buzzing. They also host events, comedy nights, and live music regularly.

Multiple locations across the city, but Koramangala is the one to beat.`,
    mustTry: ["LIIT", "Social Nachos", "Butter Chicken Biryani"],
    priceRange: "₹1,000-1,400 for two",
    timings: "9am – 1am",
    bestFor: ["Work + Drinks", "Groups", "Events"],
    address: "Koramangala 5th Block",
    googleMaps: "https://maps.google.com/?q=Social+Koramangala",
    slug: "koramangala-social",
  },
  {
    rank: 8,
    name: "Bob's Bar",
    neighborhood: "Multiple Locations",
    type: "Budget Pub",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    description: `No-frills, affordable, and always reliable. Bob's Bar is where you go when you want cold beer without the pretense (or the price tag).

The formula is simple: cheap pitchers, decent bar food, sports on TV, and an unpretentious crowd. It's the kind of place where you can show up in flip-flops and no one cares.

Multiple locations across the city mean there's probably one near you.`,
    mustTry: ["Pitchers", "Chilli Chicken", "French Fries"],
    priceRange: "₹600-900 for two",
    timings: "11am – 11:30pm",
    bestFor: ["Budget Drinking", "Casual Hangs", "Day Drinking"],
    address: "Indiranagar, Koramangala, JP Nagar, and more",
    googleMaps: "https://maps.google.com/?q=Bobs+Bar+Bangalore",
    slug: "bobs-bar",
  },
  {
    rank: 9,
    name: "Hammered",
    neighborhood: "Koramangala",
    type: "Late-Night Pub",
    image: "https://images.unsplash.com/photo-1546071379-a3a0e72e7333?w=800&q=80",
    description: `When everywhere else is winding down, Hammered is just getting started. This Koramangala pub is the go-to for the late-night crowd who want to keep the party going.

It's small, loud, and packed on weekends. The beer towers and cocktail pitchers make it easy to share with friends. Not the place for a quiet conversation, but perfect for when you want to let loose.`,
    mustTry: ["Beer Towers", "Cocktail Pitchers", "Loaded Fries"],
    priceRange: "₹800-1,200 for two",
    timings: "5pm – 1am",
    bestFor: ["Late Night", "Party Vibes", "After-Party"],
    address: "Koramangala 5th Block",
    googleMaps: "https://maps.google.com/?q=Hammered+Koramangala",
    slug: "hammered",
  },
  {
    rank: 10,
    name: "Murphy's Brewhouse",
    neighborhood: "Multiple Locations",
    type: "Irish Brewpub",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    description: `Irish pub meets Bangalore brewery. Murphy's brings Celtic vibes with its dark wood interiors, Guinness-style stouts, and hearty pub food.

The beer selection leans traditional, which is a nice change from the IPA-heavy craft scene. Their stouts and red ales are particularly good.

Multiple locations around the city, each with slightly different character.`,
    mustTry: ["Irish Stout", "Red Ale", "Fish and Chips"],
    priceRange: "₹1,200-1,600 for two",
    timings: "12pm – 11:30pm",
    bestFor: ["Stout Lovers", "Comfort Food", "Casual Evenings"],
    address: "Multiple locations",
    googleMaps: "https://maps.google.com/?q=Murphys+Brewhouse+Bangalore",
    slug: "murphys-brewhouse",
  },
];

// Table of contents
const tableOfContents = [
  { title: "The Best Overall", items: ["Toit Brewpub", "The Bier Library", "Arbor Brewing"] },
  { title: "For the Experience", items: ["Pecos (Heritage)", "Byg Brewski (Scale)", "Windmills (Ambience)"] },
  { title: "Budget Picks", items: ["Bob's Bar", "Pecos", "Hammered"] },
];

export default function BestPubsPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "best-pubs-guide"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1546071379-a3a0e72e7333?w=1920&q=80" 
              alt="Best pubs in Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-emerald-400 font-medium mb-2">Nightlife Guide</p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                15 Best Pubs in Bangalore
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                The definitive guide to Bangalore's best watering holes (2026)
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
            <span className="text-stone-900">Best Pubs in Bangalore</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              Bangalore is India's undisputed pub capital. With over 300 pubs, bars, and breweries, 
              the city has a drinking establishment for every mood, budget, and occasion.
            </p>
            <p>
              From legendary brewpubs that kickstarted India's craft beer revolution to heritage rock bars 
              that have been pouring since the 1970s, Bangalore's pub scene is as diverse as it is vibrant. 
              We've spent years exploring them all — so you know exactly where to go.
            </p>
            <p>
              Whether you're looking for award-winning craft beer, cheap pitchers, or a rooftop with a view, 
              this guide has you covered. <strong>These are the best pubs in Bangalore in 2026.</strong>
            </p>
          </section>

          {/* Table of Contents */}
          <section className="mb-12 bg-stone-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Quick Navigation</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {tableOfContents.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-medium text-stone-500 mb-2">{section.title}</h3>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    {section.items.map((item) => (
                      <li key={item}>→ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Pub Listings */}
          <section className="space-y-12">
            {pubs.slice(0, 10).map((pub) => (
              <article key={pub.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={pub.image} 
                      alt={pub.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded mb-2">
                          #{pub.rank}
                        </span>
                        <h2 className="text-2xl font-semibold text-stone-900">
                          <Link href={`/venues/${pub.slug}`} className="hover:text-emerald-700">
                            {pub.name}
                          </Link>
                        </h2>
                        <p className="text-stone-500">{pub.neighborhood} • {pub.type}</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-stone max-w-none my-4">
                      {pub.description.split('\n\n').map((para, i) => (
                        <p key={i} className="text-stone-700 text-sm leading-relaxed">{para}</p>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-stone-500">Must Try:</span>
                        <span className="text-stone-700 ml-1">{pub.mustTry.slice(0, 3).join(", ")}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Price:</span>
                        <span className="text-stone-700 ml-1">{pub.priceRange}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Timings:</span>
                        <span className="text-stone-700 ml-1">{pub.timings}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Best For:</span>
                        <span className="text-stone-700 ml-1">{pub.bestFor.slice(0, 2).join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a 
                        href={pub.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        📍 View on Map
                      </a>
                      <Link 
                        href={`/venues/${pub.slug}`}
                        className="text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        Read Full Review →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Events CTA */}
          <section className="my-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-2">🎉 Events at These Pubs</h3>
            <p className="text-emerald-100 mb-4">
              Many of these pubs host live music, comedy nights, and special events. 
              See what's happening this week.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Browse Events →
            </a>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "What time do pubs close in Bangalore?",
                  a: "Most pubs in Bangalore close between 11:30pm and 1am. Some clubs and late-night spots stay open until 1:30am on weekends. The exact timing depends on the area and license.",
                },
                {
                  q: "Which is the best area for pubs in Bangalore?",
                  a: "Koramangala and Indiranagar have the highest concentration of pubs. MG Road/Brigade Road is great for pub crawls, and Whitefield has excellent breweries for the IT crowd.",
                },
                {
                  q: "Are there any good budget pubs in Bangalore?",
                  a: "Yes! Bob's Bar, Pecos, and Hammered offer affordable drinks. Expect to spend ₹500-800 for two at these spots. Weekday happy hours at most pubs also offer great deals.",
                },
                {
                  q: "Do I need to dress up for Bangalore pubs?",
                  a: "Most Bangalore pubs are casual — jeans and a t-shirt are fine. Some upscale rooftop bars may have a smart casual dress code. Shorts and flip-flops are generally not allowed.",
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
                href="/guides/best-breweries-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Best Breweries →
              </Link>
              <Link 
                href="/guides/best-rooftop-bars-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Best Rooftop Bars →
              </Link>
              <Link 
                href="/guides/best-cocktail-bars-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Best Cocktail Bars →
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
