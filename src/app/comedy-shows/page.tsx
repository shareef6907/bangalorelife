import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getEventsByCategory } from "@/lib/events";
import { affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Comedy Shows in Bangalore 2026 - Stand-up Comedy Events | BangaloreLife",
  description: "Find the best comedy shows and stand-up events in Bangalore. Book tickets for Zakir Khan, Biswa Kalyan Rath, Kaneez Surka, and more top comedians performing in Bengaluru.",
  keywords: "comedy shows bangalore, stand up comedy bangalore, bengaluru comedy events, zakir khan bangalore, biswa kalyan rath, comedy clubs bangalore, open mic bangalore",
  openGraph: {
    title: "Comedy Shows in Bangalore 2026 - Stand-up Comedy Events",
    description: "Find the best comedy shows and stand-up events in Bangalore. Book tickets for top comedians.",
    url: "https://bangalorelife.com/comedy-shows",
    siteName: "BangaloreLife",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function ComedyShowsPage() {
  const events = await getEventsByCategory('comedy', 50);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 to-black" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              😂 Comedy Shows in Bangalore
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              {events.length}+ upcoming stand-up comedy shows & open mics
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Bangalore has one of India&apos;s best comedy scenes. From big arena shows to intimate open mics, 
              catch your favorite comedians live in the city.
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
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all"
                >
                  <div className="relative h-48 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 flex items-center justify-center">
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="text-6xl">😂</span>
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-600/80 rounded-full text-xs">
                      {event.date_display}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-400 transition-colors">
                      {event.title}
                    </h3>
                    {event.venue_name && (
                      <p className="text-gray-400 text-sm mb-3">📍 {event.venue_name}</p>
                    )}
                    <div className="flex items-center justify-between">
                      {event.price && <span className="text-yellow-400 font-medium">{event.price}</span>}
                      <span className="text-sm text-gray-400 group-hover:text-yellow-400">Get Tickets →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 px-4 bg-gradient-to-b from-black to-yellow-900/10">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h2 className="text-2xl font-bold mb-6 text-center">Stand-up Comedy Scene in Bangalore</h2>
            
            <p className="text-gray-300">
              Bangalore is undeniably the comedy capital of India. The city that gave us some of the biggest names 
              in Indian stand-up comedy continues to host the best shows, from arena tours to intimate club performances.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Popular Comedy Venues in Bangalore</h3>
            <ul className="text-gray-300 space-y-2">
              <li><strong>The Comedy Store</strong> - India&apos;s first dedicated comedy club, located in Indiranagar</li>
              <li><strong>Art House</strong> - Koramangala&apos;s favorite spot for open mics and shows</li>
              <li><strong>Phoenix Marketcity</strong> - For big arena shows and comedy festivals</li>
              <li><strong>Cobalt / Hilton</strong> - Premium comedy nights with dinner</li>
              <li><strong>Counterculture</strong> - JP Nagar&apos;s comedy and music venue</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Top Comedians Who Perform in Bangalore</h3>
            <p className="text-gray-300">
              From Zakir Khan&apos;s heartfelt storytelling to Biswa Kalyan Rath&apos;s observations, from Kaneez Surka&apos;s 
              improv brilliance to Kenny Sebastian&apos;s musical comedy — Bangalore gets them all. The city&apos;s tech-savvy, 
              cosmopolitan audience appreciates both Hindi and English comedy.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Open Mics in Bangalore</h3>
            <p className="text-gray-300">
              Want to try comedy yourself? Bangalore has multiple open mics every week. Check out shows at 
              Art House, The Humming Tree, and various cafes across Koramangala and Indiranagar. 
              It&apos;s how many of India&apos;s top comedians got their start.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center">
          <a
            href="https://inr.deals/track?id=eve678604838&src=bangalorelife&campaign=cps&url=https%3A%2F%2Fin.bookmyshow.com%2Fexplore%2Fcomedy-shows-bengaluru"
            {...affiliateLinkProps}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all"
          >
            😂 Browse All Comedy Shows
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
