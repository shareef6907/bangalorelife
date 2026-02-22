import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "25 Best Date Night Ideas in Bangalore (2026) — Romantic Spots",
  description: "Plan the perfect date in Bangalore. From romantic rooftop bars to unique experiences, discover the best date night spots for every budget and style.",
  keywords: "date night bangalore, romantic restaurants bangalore, date ideas bangalore, couples bangalore, romantic bars bangalore, anniversary dinner bangalore",
  openGraph: {
    title: "25 Best Date Night Ideas in Bangalore (2026)",
    description: "Romantic rooftops, hidden speakeasies, stargazing spots, and more for your perfect Bangalore date.",
  },
};

const dateIdeas = [
  {
    category: "Romantic Rooftops",
    icon: "🌆",
    ideas: [
      {
        name: "Sunset at Skyye Lounge",
        location: "UB City",
        description: "The most impressive rooftop in Bangalore. Book a table for sunset, order champagne, and watch the city light up below. This is the power move for special occasions.",
        budget: "₹4,000+",
        bestFor: "Anniversaries, proposals, major celebrations",
        tip: "Book 2 weeks ahead for weekend sunset tables",
      },
      {
        name: "Cocktails at Loft 38",
        location: "Indiranagar",
        description: "Sophisticated without being intimidating. Excellent cocktails, great music, and a rooftop that's intimate rather than overwhelming. Perfect for a third or fourth date.",
        budget: "₹2,500-3,500",
        bestFor: "Impressing someone special, cocktail lovers",
        tip: "Arrive by 6pm for outdoor seating",
      },
      {
        name: "13th Floor Sundowners",
        location: "MG Road",
        description: "Classic Bangalore rooftop experience. Great views, reliable cocktails, and a more relaxed vibe than the ultra-premium spots. Easy metro access means no parking stress.",
        budget: "₹2,500-3,500",
        bestFor: "After-work dates, reliable quality",
        tip: "Take the MG Road metro to avoid traffic",
      },
    ],
  },
  {
    category: "Intimate Dining",
    icon: "🍽️",
    ideas: [
      {
        name: "Dinner at Karavalli",
        location: "Taj Gateway",
        description: "Coastal cuisine in an elegant setting. Karavalli has been a Bangalore fine dining institution for decades. The seafood is exceptional, the service is impeccable.",
        budget: "₹3,500-5,000",
        bestFor: "Serious food lovers, special occasions",
        tip: "Order the Mangalorean fish curry",
      },
      {
        name: "Toast & Tonic",
        location: "Indiranagar",
        description: "Farm-to-table small plates paired with an insane gin selection. Share plates, order G&T flights, and let the conversation flow. Sophisticated without being stuffy.",
        budget: "₹2,500-3,500",
        bestFor: "Foodies, gin lovers, modern dining",
        tip: "The gin flights are a great sharing experience",
      },
      {
        name: "Olive Beach",
        location: "Ashok Nagar",
        description: "Mediterranean cuisine in a romantic setting. The white-washed interiors, outdoor seating, and coastal vibes make you forget you're in Bangalore.",
        budget: "₹3,000-4,000",
        bestFor: "Mediterranean lovers, anniversaries",
        tip: "Request outdoor courtyard seating",
      },
      {
        name: "The Permit Room",
        location: "Indiranagar",
        description: "South Indian-inspired cocktails in a beautifully designed space. Filter coffee martinis, temple-town aesthetics, and uniquely Bangalore creativity.",
        budget: "₹2,000-3,000",
        bestFor: "Unique experience, creative cocktails",
        tip: "Start with the Filter Coffee Martini",
      },
    ],
  },
  {
    category: "Casual & Fun",
    icon: "🎯",
    ideas: [
      {
        name: "Brewery Hopping in Koramangala",
        location: "Koramangala",
        description: "Start at Toit, walk to Bier Library, end at Social. Share tasting flights, try different styles, and see where the conversation takes you. Low pressure, high fun.",
        budget: "₹2,000-3,000",
        bestFor: "Beer lovers, relaxed vibes, getting to know someone",
        tip: "Don't try to hit too many — 2-3 is perfect",
      },
      {
        name: "Live Music at The Humming Tree",
        location: "Indiranagar",
        description: "Catch a gig together at Bangalore's best live music venue. Check their schedule for acoustic nights if you want to actually talk, or rock shows if you want energy.",
        budget: "₹1,500-2,500",
        bestFor: "Music lovers, unique experiences",
        tip: "Book tickets in advance for popular acts",
      },
      {
        name: "Church Street Coffee & Walk",
        location: "Church Street",
        description: "Start with coffee at Koshy's (a Bangalore institution), browse bookshops, walk the pedestrian-friendly stretch, and end with cocktails. Old-school Bangalore charm.",
        budget: "₹1,000-1,500",
        bestFor: "Afternoon dates, intellectual types, Bangalore history",
        tip: "Koshy's is cash only — carry some",
      },
    ],
  },
  {
    category: "Adventure & Outdoors",
    icon: "🌄",
    ideas: [
      {
        name: "Sunrise Trek to Skandagiri",
        location: "60km from Bangalore",
        description: "Night trek up, watch sunrise above the clouds, breakfast on the way back. It's an adventure, it's romantic, and you'll have stories to tell. Best October-February.",
        budget: "₹1,500-2,500 (including transport)",
        bestFor: "Active couples, adventure seekers, early birds",
        tip: "Book through a trekking group; don't go alone at night",
      },
      {
        name: "Hot Air Balloon at Jakkur",
        location: "Jakkur",
        description: "See Bangalore from above as the sun rises. Hot air ballooning is available on weekend mornings and makes for an unforgettable date experience.",
        budget: "₹3,000-5,000 per person",
        bestFor: "Special occasions, bucket list experiences",
        tip: "Book well in advance; weather-dependent",
      },
      {
        name: "Nandi Hills Sunrise",
        location: "60km from Bangalore",
        description: "The classic Bangalore day trip. Leave at 4am, reach for sunrise, enjoy the views and cold air, breakfast on the way back. A rite of passage for Bangalore couples.",
        budget: "₹1,000-1,500",
        bestFor: "Early dates, beautiful views, Bangalore tradition",
        tip: "Go on weekdays to avoid crowds; gates open at 5am",
      },
    ],
  },
  {
    category: "Unique Experiences",
    icon: "✨",
    ideas: [
      {
        name: "Comedy Show",
        location: "Various Venues",
        description: "Catch stand-up at venues like Social, The Humming Tree, or dedicated comedy clubs. Laughing together is underrated as a date activity.",
        budget: "₹500-1,500 + drinks",
        bestFor: "Breaking the ice, shared laughs, low pressure",
        tip: "Check BookMyShow for upcoming shows",
        hasAffiliateLink: true,
      },
      {
        name: "Pottery Class for Two",
        location: "Various Studios",
        description: "Get your hands dirty together at a pottery workshop. It's creative, it's playful, and you make something together. Great for early dates.",
        budget: "₹1,500-2,500 per person",
        bestFor: "Creative types, something different, conversation starter",
        tip: "Claystation and Mad About Clay are popular options",
      },
      {
        name: "Wine Tasting at Grover Zampa",
        location: "Nandi Hills Road",
        description: "Day trip to Karnataka's best winery. Tour the vineyards, taste their wines, enjoy lunch with a view. It's basically a European date, Bangalore edition.",
        budget: "₹2,000-3,500 per person",
        bestFor: "Wine lovers, weekend day trip, countryside escape",
        tip: "Book the tour in advance; pair with Nandi Hills",
      },
      {
        name: "Stargazing at Galibore",
        location: "100km from Bangalore",
        description: "Escape the city lights for a night under the stars. Galibore Nature Camp offers riverside cabins, campfires, and some of the clearest skies near Bangalore.",
        budget: "₹5,000-8,000 (overnight stay)",
        bestFor: "Romantic getaway, nature lovers, photography",
        tip: "Best during new moon for clearest skies",
      },
    ],
  },
  {
    category: "Budget-Friendly",
    icon: "💰",
    ideas: [
      {
        name: "Lalbagh Evening Walk",
        location: "Lalbagh",
        description: "Free entry, beautiful gardens, and sunset light. Bring coffee, find a quiet spot, and enjoy the green lung of Bangalore. Simple, romantic, and free.",
        budget: "₹0-200",
        bestFor: "Early dates, nature lovers, budget conscious",
        tip: "Enter from the South Gate for fewer crowds",
      },
      {
        name: "Street Food Crawl in VV Puram",
        location: "VV Puram Food Street",
        description: "Walk the famous food street together, trying dosas, chaats, and local specialties. Sharing street food is intimate in its own way.",
        budget: "₹300-500",
        bestFor: "Foodies, adventurous eaters, authentic experience",
        tip: "Go around 6-7pm when it's buzzing",
      },
      {
        name: "Cubbon Park Morning Coffee",
        location: "Cubbon Park",
        description: "Grab coffees from Indian Coffee House, walk through Cubbon Park as the city wakes up. Morning dates hit different, and this one costs almost nothing.",
        budget: "₹100-200",
        bestFor: "Morning people, peaceful vibes, budget dates",
        tip: "Go before 9am to avoid crowds and heat",
      },
    ],
  },
];

export default function DateNightPage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/events-bengaluru",
    "date-night-guide"
  );

  const comedyUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/comedy-shows-bengaluru",
    "date-night-comedy"
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1529417305485-480f579e7578?w=1920&q=80" 
              alt="Date night in Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-rose-400 font-medium mb-2">Dating Guide</p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                25 Best Date Night Ideas in Bangalore
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Romantic spots for every budget and style (2026)
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
            <span className="text-stone-900">Date Night Ideas</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              Planning a date in Bangalore? You're in luck. This city has everything from 
              ultra-romantic rooftop bars to quirky experiences you won't find anywhere else.
            </p>
            <p>
              Whether you're planning a first date, celebrating an anniversary, or just want 
              to shake up your usual dinner-and-drinks routine, we've got you covered. Here 
              are <strong>25 date ideas</strong> that range from free walks in the park to 
              hot air balloon rides above the city.
            </p>
          </section>

          {/* Date Ideas by Category */}
          <section className="space-y-12">
            {dateIdeas.map((category) => (
              <div key={category.category}>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2">
                  <span className="text-3xl">{category.icon}</span>
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.ideas.map((idea) => (
                    <div 
                      key={idea.name}
                      className="bg-white rounded-xl p-6 border border-stone-200 hover:border-rose-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-stone-900">{idea.name}</h3>
                        <span className="text-rose-600 font-medium text-sm">{idea.budget}</span>
                      </div>
                      <p className="text-stone-500 text-sm mb-3">{idea.location}</p>
                      <p className="text-stone-700 mb-4">{idea.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="text-stone-600">
                          <strong>Best for:</strong> {idea.bestFor}
                        </span>
                      </div>
                      <p className="text-sm text-rose-600 mt-3">
                        💡 Tip: {idea.tip}
                      </p>
                      {idea.hasAffiliateLink && (
                        <a 
                          href={comedyUrl}
                          {...affiliateLinkProps}
                          className="inline-block mt-3 text-sm text-emerald-600 hover:text-emerald-700"
                        >
                          Browse upcoming shows →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Events CTA */}
          <section className="my-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-2">🎭 Date-Worthy Events This Week</h3>
            <p className="text-rose-100 mb-4">
              Comedy shows, live music, and experiences perfect for couples. 
              See what's happening in Bangalore.
            </p>
            <a 
              href={eventsUrl}
              {...affiliateLinkProps}
              className="inline-block px-6 py-3 bg-white text-rose-700 font-medium rounded-lg hover:bg-rose-50 transition-colors"
            >
              Browse Events →
            </a>
          </section>

          {/* Quick Tips */}
          <section className="mb-12 bg-rose-50 rounded-xl p-6 border border-rose-200">
            <h2 className="text-lg font-semibold text-rose-900 mb-4">💝 Date Night Pro Tips</h2>
            <ul className="space-y-2 text-rose-800 text-sm">
              <li>• <strong>First dates:</strong> Keep it low-key. Coffee, brewery hopping, or a comedy show. No pressure.</li>
              <li>• <strong>Reservations:</strong> Book ahead for rooftops and fine dining, especially on weekends.</li>
              <li>• <strong>Traffic:</strong> Factor in Bangalore traffic. Allow extra time, or pick a spot near where you're meeting.</li>
              <li>• <strong>Weather check:</strong> If you're planning outdoor activities, check the forecast (especially June-September).</li>
              <li>• <strong>Budget honestly:</strong> Know what you're comfortable spending before you go.</li>
            </ul>
          </section>

          {/* Related Guides */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">
              Related Guides
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/guides/best-rooftop-bars-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Best Rooftop Bars →
              </Link>
              <Link 
                href="/guides/best-restaurants-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Best Restaurants →
              </Link>
              <Link 
                href="/guides/day-trips-from-bangalore" 
                className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                Day Trips →
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
