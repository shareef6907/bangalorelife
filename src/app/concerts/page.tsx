import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getEventsByCategory } from "@/lib/events";
import { affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Live Concerts in Bangalore 2026 - Music Events & Gigs | BangaloreLife",
  description: "Discover live concerts, music festivals, and gigs in Bangalore. From EDM nights to Bollywood concerts, indie gigs to international artists - find and book tickets.",
  keywords: "concerts bangalore, live music bangalore, music events bengaluru, EDM bangalore, sunburn bangalore, bollywood concert bangalore, indie music bangalore",
  openGraph: {
    title: "Live Concerts in Bangalore 2026 - Music Events & Gigs",
    description: "Discover live concerts, music festivals, and gigs in Bangalore. Book tickets for the best shows.",
    url: "https://bangalorelife.com/concerts",
    siteName: "BangaloreLife",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function ConcertsPage() {
  const events = await getEventsByCategory('concerts', 50);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-900/20 to-black" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🎵 Live Concerts in Bangalore
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              {events.length}+ upcoming concerts, gigs & music events
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From massive EDM festivals to intimate indie gigs, Bangalore&apos;s music scene has something for every taste. 
              Catch international artists, Bollywood stars, and local talent live.
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <a
                  key={event.id}
                  href={event.affiliate_url}
                  {...affiliateLinkProps}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all"
                >
                  <div className="relative h-48 bg-gradient-to-br from-pink-900/30 to-purple-900/30 flex items-center justify-center">
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="text-6xl">🎵</span>
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-pink-600/80 rounded-full text-xs">
                      {event.date_display}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-pink-400 transition-colors">
                      {event.title}
                    </h3>
                    {event.venue_name && (
                      <p className="text-gray-400 text-sm mb-3">📍 {event.venue_name}</p>
                    )}
                    <div className="flex items-center justify-between">
                      {event.price && <span className="text-pink-400 font-medium">{event.price}</span>}
                      <span className="text-sm text-gray-400 group-hover:text-pink-400">Get Tickets →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 px-4 bg-gradient-to-b from-black to-pink-900/10">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h2 className="text-2xl font-bold mb-6 text-center">Live Music Scene in Bangalore</h2>
            
            <p className="text-gray-300">
              Bangalore&apos;s live music scene is legendary. The city that gave birth to India&apos;s rock revolution 
              continues to be the beating heart of the country&apos;s music culture, from metal and indie to EDM and hip-hop.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Top Concert Venues in Bangalore</h3>
            <ul className="text-gray-300 space-y-2">
              <li><strong>Phoenix Marketcity</strong> - Arena shows and major concerts</li>
              <li><strong>Jayamahal Palace</strong> - Outdoor festivals and EDM nights</li>
              <li><strong>Nice Grounds</strong> - Large-scale music festivals</li>
              <li><strong>The Humming Tree</strong> - Indie and alternative music hub</li>
              <li><strong>Fandom at Gilly&apos;s</strong> - Rock, metal, and live band performances</li>
              <li><strong>BlueFrog (legacy)</strong> - Legendary venue that shaped Bangalore&apos;s music scene</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Music Festivals in Bangalore</h3>
            <p className="text-gray-300">
              Bangalore hosts some of India&apos;s biggest music festivals. <strong>Sunburn</strong> brings world-class 
              EDM artists, <strong>NH7 Weekender</strong> celebrates indie music, and <strong>Echoes of Earth</strong> 
              combines sustainability with great music. The city also hosts <strong>Bangalore Open Air</strong> for 
              metal enthusiasts.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Live Music Every Night</h3>
            <p className="text-gray-300">
              Unlike other Indian cities, Bangalore has live music happening every single night. Pubs in Indiranagar 
              and Koramangala regularly feature live bands. Check out Toit, The Humming Tree, Hard Rock Cafe, 
              and various breweries for regular gig schedules.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center">
          <a
            href="https://inr.deals/track?id=eve678604838&src=bangalorelife&campaign=cps&url=https%3A%2F%2Fin.bookmyshow.com%2Fexplore%2Fmusic-shows-bengaluru"
            {...affiliateLinkProps}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-semibold hover:from-pink-500 hover:to-purple-500 transition-all"
          >
            🎵 Browse All Concerts
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
