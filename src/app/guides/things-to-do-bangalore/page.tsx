import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "50 Things to Do in Bangalore (2026) — The Ultimate Guide",
  description: "The definitive guide to things to do in Bangalore. From craft beer breweries to sunrise treks, discover everything worth experiencing in India's most exciting city.",
  keywords: "things to do in bangalore, bangalore activities, bangalore attractions, bangalore sightseeing, what to do bangalore, bangalore weekend, bangalore experiences",
  openGraph: {
    title: "50 Things to Do in Bangalore — The Ultimate Guide (2026)",
    description: "Everything worth doing in India's most exciting city. Pubs, treks, culture, food, and more.",
  },
};

const categories = [
  {
    name: "Drink & Nightlife",
    icon: "🍻",
    color: "amber",
    things: [
      { title: "Drink craft beer at Toit", description: "Bangalore's most iconic brewery. Try the Toit Weiss.", link: "/venues/toit-brewpub" },
      { title: "Pub crawl Brigade Road", description: "Start at Pecos, end at Hard Rock. The classic route.", link: "/neighborhoods/mg-road-brigade-road" },
      { title: "Sunset cocktails at Skyye", description: "The best rooftop views in the city. Dress up.", link: "/guides/best-rooftop-bars-bangalore" },
      { title: "Explore 12th Main Indiranagar", description: "Bar after bar after bar. The legendary strip.", link: "/neighborhoods/indiranagar" },
      { title: "Try a beer flight at Bier Library", description: "Sample styles you've never heard of.", link: "/venues/the-bier-library" },
      { title: "Dance at a Koramangala club", description: "Where the party goes after midnight.", link: "/neighborhoods/koramangala" },
      { title: "Sunday session at Byg Brewski", description: "Massive outdoor brewery with day-drinking vibes.", link: "/venues/byg-brewski" },
      { title: "Catch live music at Humming Tree", description: "Bangalore's best indie music venue.", link: "/venues/the-humming-tree" },
    ],
  },
  {
    name: "Eat & Food",
    icon: "🍽️",
    color: "rose",
    things: [
      { title: "Breakfast at Koshy's", description: "A Bangalore institution since 1940. Go for the history.", link: "/venues/koshys" },
      { title: "Biryani at Meghana Foods", description: "Join the queue for legendary Andhra biryani.", link: null },
      { title: "Street food in VV Puram", description: "Dosas, chaats, and local specialties.", link: "/guides/best-street-food-bangalore" },
      { title: "Burger at Truffles", description: "Bangalore's favorite burgers. The Sin-A-Mon is iconic.", link: null },
      { title: "Filter coffee anywhere", description: "It's not optional. Find it at any Darshini.", link: null },
      { title: "Coastal cuisine at Karavalli", description: "Fine dining seafood at the Taj.", link: null },
      { title: "Craft coffee at Third Wave", description: "Bangalore's specialty coffee scene.", link: null },
      { title: "Idli breakfast at MTR", description: "The original since 1924. Worth the wait.", link: null },
    ],
  },
  {
    name: "Outdoors & Nature",
    icon: "🌄",
    color: "green",
    things: [
      { title: "Sunrise at Nandi Hills", description: "Leave at 4am, watch the sunrise above the clouds.", link: "/guides/day-trips-from-bangalore" },
      { title: "Walk through Lalbagh", description: "The botanical garden. Beautiful any time.", link: null },
      { title: "Cubbon Park morning stroll", description: "The green lung of Bangalore. Go early.", link: null },
      { title: "Trek Skandagiri at night", description: "Night trek up, sunrise at the top. Unforgettable.", link: "/guides/adventure-activities-near-bangalore" },
      { title: "Visit Bannerghatta National Park", description: "Safari and butterfly park, 20km from the city.", link: null },
      { title: "Cycle around Ulsoor Lake", description: "Early morning laps around the lake.", link: null },
      { title: "Hot air balloon at Jakkur", description: "See the city from above. Weekend mornings.", link: null },
      { title: "Camping at Manchinbele", description: "Lake, campsites, stargazing. 40km away.", link: null },
    ],
  },
  {
    name: "Culture & History",
    icon: "🏛️",
    color: "purple",
    things: [
      { title: "Bangalore Palace tour", description: "Tudor-style palace built in 1887.", link: null },
      { title: "ISKCON Temple visit", description: "Stunning architecture, peaceful vibes.", link: null },
      { title: "Browse books on Church Street", description: "Bookshops, cafes, and old Bangalore charm.", link: "/neighborhoods/church-street" },
      { title: "HAL Aerospace Museum", description: "Aviation history. Great for kids too.", link: null },
      { title: "Tipu Sultan's Summer Palace", description: "18th century Indo-Islamic architecture.", link: null },
      { title: "National Gallery of Modern Art", description: "Art collection in a heritage building.", link: null },
      { title: "Visvesvaraya Museum", description: "Science museum, surprisingly fun for adults.", link: null },
      { title: "Walk through Basavanagudi", description: "Old Bangalore neighborhood with character.", link: null },
    ],
  },
  {
    name: "Day Trips",
    icon: "🚗",
    color: "blue",
    things: [
      { title: "Coorg coffee estates", description: "Weekend in the Western Ghats. 250km.", link: "/guides/day-trips-from-bangalore" },
      { title: "Mysore Palace day trip", description: "Royal palace, Chamundi Hills, and more.", link: "/guides/day-trips-from-bangalore" },
      { title: "Wine tasting at Grover Zampa", description: "Karnataka's best winery. Book ahead.", link: null },
      { title: "Hampi heritage site", description: "UNESCO World Heritage. Worth 2 days.", link: null },
      { title: "Chikmagalur hill station", description: "Coffee, treks, and mountain air.", link: null },
      { title: "Kabini wildlife safari", description: "Elephants, tigers, and jungle lodges.", link: null },
      { title: "Shivanasamudra Falls", description: "Dramatic waterfalls, best in monsoon.", link: null },
      { title: "Anthargange night trek", description: "Caves and boulders, 70km from Bangalore.", link: null },
    ],
  },
  {
    name: "Experiences",
    icon: "✨",
    color: "teal",
    things: [
      { title: "Stand-up comedy show", description: "Bangalore has a thriving comedy scene.", link: null, hasEvents: true },
      { title: "Pottery workshop", description: "Get your hands dirty. Great for dates.", link: null },
      { title: "Escape room challenge", description: "Team puzzle-solving. Multiple options.", link: null },
      { title: "Microlight flight", description: "See Bangalore from the air. Jakkur aerodrome.", link: null },
      { title: "Go-karting at Grips", description: "Racing fun for all skill levels.", link: null },
      { title: "Bowling at Amoeba", description: "Classic entertainment. Multiple locations.", link: null },
      { title: "Food walk tour", description: "Guided street food experiences.", link: null },
      { title: "Heritage walk", description: "Discover Bangalore's history with a guide.", link: null },
    ],
  },
  {
    name: "Shopping",
    icon: "🛍️",
    color: "pink",
    things: [
      { title: "Commercial Street bargains", description: "The classic Bangalore shopping experience.", link: null },
      { title: "Brigade Road window shopping", description: "Malls, shops, and street vendors.", link: "/neighborhoods/mg-road-brigade-road" },
      { title: "Chickpet fabric market", description: "Silks and textiles wholesale.", link: null },
      { title: "Indiranagar boutiques", description: "Designer stores and indie brands.", link: "/neighborhoods/indiranagar" },
      { title: "Sunday book bazaar at Blossoms", description: "Used books treasure hunt.", link: null },
      { title: "UB City luxury shopping", description: "High-end brands if that's your thing.", link: null },
    ],
  },
];

export default function ThingsToDoPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "things-to-do-guide"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1920&q=80" 
              alt="Things to do in Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-emerald-400 font-medium mb-2">Ultimate Guide</p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                50 Things to Do in Bangalore
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                The definitive guide to India's most exciting city (2026)
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
            <span className="text-stone-900">Things to Do in Bangalore</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              Bangalore is India's most dynamic city — a place where cutting-edge tech meets 
              colonial heritage, where craft breweries sit next to century-old coffee houses, 
              and where perfect weather makes everything better.
            </p>
            <p>
              Whether you're a local looking for new experiences or a visitor trying to make 
              the most of your time, this list covers <strong>everything worth doing in Bangalore</strong>. 
              From sunrise treks to midnight pub crawls, we've got you covered.
            </p>
          </section>

          {/* Table of Contents */}
          <section className="mb-12 bg-stone-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Jump To</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <a 
                  key={cat.name}
                  href={`#${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="px-3 py-1.5 bg-white rounded-full text-sm text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors border border-stone-200"
                >
                  {cat.icon} {cat.name}
                </a>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="space-y-16">
            {categories.map((category) => (
              <div 
                key={category.name}
                id={category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
              >
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  {category.name}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.things.map((thing) => (
                    <div 
                      key={thing.title}
                      className="bg-white rounded-xl p-5 border border-stone-200 hover:border-emerald-300 transition-colors"
                    >
                      <h3 className="font-semibold text-stone-900 mb-1">
                        {thing.link ? (
                          <Link href={thing.link} className="hover:text-emerald-700">
                            {thing.title}
                          </Link>
                        ) : (
                          thing.title
                        )}
                      </h3>
                      <p className="text-stone-600 text-sm">{thing.description}</p>
                      {'hasEvents' in thing && thing.hasEvents && (
                        <a 
                          href={eventsUrl}
                          {...affiliateLinkProps}
                          className="text-sm text-emerald-600 hover:text-emerald-700 mt-2 inline-block"
                        >
                          See upcoming shows →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Events CTA */}
          <section className="my-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-2">🎉 What's Happening This Week</h3>
            <p className="text-emerald-100 mb-4">
              Comedy shows, concerts, food festivals, and more. See what's on in Bangalore.
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
                  q: "What is Bangalore famous for?",
                  a: "Bangalore is India's tech capital, craft beer hub, and most liveable city. It's known for perfect weather year-round, a thriving pub culture, colonial heritage, and being home to India's biggest tech companies.",
                },
                {
                  q: "What is the best time to visit Bangalore?",
                  a: "Bangalore has pleasant weather year-round (20-30°C), but October to February is ideal — cool evenings, no rain, and perfect for outdoor activities. Avoid June-September if you dislike rain.",
                },
                {
                  q: "Is Bangalore safe for tourists?",
                  a: "Bangalore is one of India's safest cities. Normal urban precautions apply, but it's generally safe to walk around, even at night in popular areas. Women travelers find it more comfortable than most Indian cities.",
                },
                {
                  q: "How many days do you need in Bangalore?",
                  a: "3-4 days is ideal for the city highlights. Add 2-3 more days if you want to do day trips to Mysore, Nandi Hills, or Coorg.",
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
                href="/this-weekend" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                This Weekend →
              </Link>
              <Link 
                href="/guides/day-trips-from-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Day Trips →
              </Link>
              <Link 
                href="/neighborhoods" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Explore Neighborhoods →
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
