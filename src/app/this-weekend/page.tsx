import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Things to Do This Weekend in Bangalore — Feb 22-23, 2026",
  description: "Your weekend guide to Bangalore. Comedy shows, live music, food festivals, and the best events happening this Saturday and Sunday.",
  keywords: "bangalore this weekend, bangalore weekend events, what to do bangalore weekend, bangalore saturday, bangalore sunday",
  openGraph: {
    title: "Things to Do This Weekend in Bangalore",
    description: "Comedy, live music, food festivals, and more. Your weekend sorted.",
  },
};

// This would ideally come from a CMS or database
const weekendDate = "February 22-23, 2026";
const lastUpdated = "Thursday, February 20, 2026";

const highlights = [
  {
    title: "Stand-Up Comedy Night",
    venue: "Koramangala Social",
    day: "Saturday",
    time: "8:00 PM",
    description: "Fresh lineup of Bangalore's best comedians. Perfect way to start the weekend.",
    category: "Comedy",
    price: "₹499",
  },
  {
    title: "Live Jazz Evening",
    venue: "The Humming Tree",
    day: "Saturday",
    time: "7:30 PM",
    description: "Smooth jazz from local artists. Great date night option.",
    category: "Music",
    price: "₹600",
  },
  {
    title: "Craft Beer Festival",
    venue: "Byg Brewski Hennur",
    day: "Sunday",
    time: "12:00 PM onwards",
    description: "Day-long celebration of craft beer with guest breweries and food stalls.",
    category: "Festival",
    price: "Free entry",
  },
  {
    title: "Sunset Rooftop Party",
    venue: "Skyye Lounge",
    day: "Saturday",
    time: "6:00 PM",
    description: "DJ sets, cocktails, and the best views in the city.",
    category: "Party",
    price: "₹1,500 cover",
  },
];

const categories = [
  { name: "Comedy Shows", icon: "😂", href: "/comedy-shows" },
  { name: "Live Music", icon: "🎵", href: "/concerts" },
  { name: "Food & Drink", icon: "🍻", href: "/guides/best-pubs-bangalore" },
  { name: "Outdoors", icon: "🌄", href: "/guides/day-trips-from-bangalore" },
];

const quickPicks = [
  {
    title: "Chill Weekend",
    description: "Coffee at Third Wave → Browse books on Church Street → Sundowners at 13th Floor",
    vibe: "Relaxed",
  },
  {
    title: "Party Mode",
    description: "Pre-drinks at Toit → Dinner at Social → Club in Koramangala",
    vibe: "High Energy",
  },
  {
    title: "Date Night",
    description: "Comedy show → Rooftop cocktails at Loft 38 → Late-night dessert",
    vibe: "Romantic",
  },
  {
    title: "Day Trip",
    description: "Early start to Nandi Hills → Breakfast on the way back → Lazy afternoon at a brewery",
    vibe: "Adventure",
  },
];

export default function ThisWeekendPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "this-weekend"
  );

  const comedyUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/comedy-shows-bengaluru",
    "this-weekend-comedy"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-violet-300 font-medium mb-2">Updated Every Thursday</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Things to Do This Weekend
            </h1>
            <p className="text-2xl text-violet-200 mb-2">
              {weekendDate}
            </p>
            <p className="text-violet-300 text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Quick Categories */}
        <section className="bg-white border-b border-stone-200 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full hover:bg-violet-100 hover:text-violet-700 transition-colors"
                >
                  <span>{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Weekend Highlights */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              🌟 Weekend Highlights
            </h2>
            <div className="space-y-4">
              {highlights.map((event) => (
                <div 
                  key={event.title}
                  className="bg-white rounded-xl p-6 border border-stone-200 hover:border-violet-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-medium text-violet-600 uppercase tracking-wide">
                        {event.category}
                      </span>
                      <h3 className="text-xl font-semibold text-stone-900">{event.title}</h3>
                      <p className="text-stone-500 text-sm">{event.venue}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-violet-600 font-medium">{event.day}</p>
                      <p className="text-stone-500 text-sm">{event.time}</p>
                    </div>
                  </div>
                  <p className="text-stone-600 my-3">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-medium">{event.price}</span>
                    <a 
                      href={event.category === "Comedy" ? comedyUrl : eventsUrl}
                      {...affiliateLinkProps}
                      className="text-sm text-violet-600 hover:text-violet-700"
                    >
                      Get Tickets →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Browse All Events CTA */}
          <section className="mb-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-2">🎫 More Events This Weekend</h3>
            <p className="text-violet-100 mb-4">
              Comedy, concerts, workshops, and more. See the full lineup.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-white text-violet-700 font-medium rounded-lg hover:bg-violet-50 transition-colors"
            >
              Browse All Events →
            </a>
          </section>

          {/* Quick Weekend Plans */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
              ⚡ Quick Weekend Plans
            </h2>
            <p className="text-stone-600 mb-6">
              Not sure what to do? Here are some ready-made weekend itineraries:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {quickPicks.map((plan) => (
                <div 
                  key={plan.title}
                  className="bg-white rounded-xl p-5 border border-stone-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-stone-900">{plan.title}</h3>
                    <span className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded-full">
                      {plan.vibe}
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm">{plan.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Weather Note */}
          <section className="mb-16 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">🌤️ Weekend Weather</h3>
            <p className="text-blue-800 text-sm">
              Expected: Partly cloudy, 22-28°C. Perfect weather for outdoor activities. 
              No rain forecast — rooftop plans are safe!
            </p>
          </section>

          {/* Related Guides */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">
              Planning Ahead?
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/guides/things-to-do-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                50 Things to Do →
              </Link>
              <Link 
                href="/guides/date-night-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Date Night Ideas →
              </Link>
              <Link 
                href="/guides/day-trips-from-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Day Trips →
              </Link>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="bg-stone-100 rounded-xl p-8 text-center">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Get This in Your Inbox
            </h2>
            <p className="text-stone-600 mb-4">
              Every Thursday, we'll send you the weekend guide. Never miss a thing.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:border-violet-500"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
