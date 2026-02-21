import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getEventsByCategory } from "@/lib/events";
import { affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Kids Events in Bangalore 2026 - Activities for Children | BangaloreLife",
  description: "Find the best kids events and activities in Bangalore. Workshops, shows, theme parks, and fun experiences for children and families in Bengaluru.",
  keywords: "kids events bangalore, children activities bangalore, family events bengaluru, kids workshops bangalore, things to do with kids bangalore",
  openGraph: {
    title: "Kids Events in Bangalore 2026 - Activities for Children",
    description: "Find the best kids events and activities in Bangalore. Fun for the whole family!",
    url: "https://bangalorelife.com/kids-events",
    siteName: "BangaloreLife",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function KidsEventsPage() {
  const events = await getEventsByCategory('kids', 50);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 to-black" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              👶 Kids Events in Bangalore
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              {events.length}+ fun activities for children & families
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From magical shows to creative workshops, find the perfect activities 
              to keep your little ones entertained and learning.
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <a
                    key={event.id}
                    href={event.affiliate_url}
                    {...affiliateLinkProps}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-orange-900/30 to-yellow-900/30 flex items-center justify-center">
                      {event.image_url ? (
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-6xl">👶</span>
                      )}
                      <div className="absolute top-3 right-3 px-3 py-1 bg-orange-600/80 rounded-full text-xs">
                        {event.date_display}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                        {event.title}
                      </h3>
                      {event.venue_name && (
                        <p className="text-gray-400 text-sm mb-3">📍 {event.venue_name}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {event.price && <span className="text-orange-400 font-medium">{event.price}</span>}
                        <span className="text-sm text-gray-400 group-hover:text-orange-400">Book Now →</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Kids events are being updated. Check back soon!</p>
                <a
                  href="https://inr.deals/track?id=eve678604838&src=bangalorelife&campaign=cps&url=https%3A%2F%2Fin.bookmyshow.com%2Fexplore%2Fkids-bengaluru"
                  {...affiliateLinkProps}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 rounded-full"
                >
                  Browse on BookMyShow →
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Family Destinations */}
        <section className="py-12 px-4 bg-gradient-to-b from-black to-orange-900/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Popular Family Destinations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-3xl mb-3 block">🎢</span>
                <h3 className="font-semibold mb-2">Wonderla</h3>
                <p className="text-gray-400 text-sm">India&apos;s largest amusement park with rides for all ages</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-3xl mb-3 block">🦁</span>
                <h3 className="font-semibold mb-2">Bannerghatta Zoo</h3>
                <p className="text-gray-400 text-sm">Safari, zoo, and butterfly park in one destination</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-3xl mb-3 block">🔬</span>
                <h3 className="font-semibold mb-2">Visvesvaraya Museum</h3>
                <p className="text-gray-400 text-sm">Interactive science museum kids absolutely love</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-3xl mb-3 block">🎮</span>
                <h3 className="font-semibold mb-2">Timezone</h3>
                <p className="text-gray-400 text-sm">Arcade games and entertainment at Phoenix Mall</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h2 className="text-2xl font-bold mb-6 text-center">Things to Do with Kids in Bangalore</h2>
            
            <p className="text-gray-300">
              Bangalore is surprisingly kid-friendly! Beyond the tech parks and traffic, 
              you&apos;ll find endless entertainment options for children of all ages.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Indoor Activities</h3>
            <ul className="text-gray-300 space-y-2">
              <li><strong>Play Areas:</strong> Funcity, Timezone, Smaaash at various malls</li>
              <li><strong>Trampoline Parks:</strong> SkyJumper, Bounce</li>
              <li><strong>Art & Craft:</strong> Pottery workshops, painting classes</li>
              <li><strong>Theatre:</strong> Children&apos;s plays at Ranga Shankara, Jagriti</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Outdoor Adventures</h3>
            <ul className="text-gray-300 space-y-2">
              <li><strong>Cubbon Park:</strong> Toy train, open spaces, Bal Bhavan</li>
              <li><strong>Lalbagh:</strong> Botanical garden with lake and glasshouse</li>
              <li><strong>Nandi Hills:</strong> Day trip for sunrise and cycling</li>
              <li><strong>Snow City:</strong> Indoor snow experience at Fun World</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Educational Experiences</h3>
            <p className="text-gray-300">
              Bangalore is perfect for curious minds. The HAL Aerospace Museum, Jawaharlal Nehru Planetarium, 
              and Visvesvaraya Industrial Museum offer interactive learning experiences that kids remember forever.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center">
          <a
            href="https://inr.deals/track?id=eve678604838&src=bangalorelife&campaign=cps&url=https%3A%2F%2Fin.bookmyshow.com%2Fexplore%2Fkids-bengaluru"
            {...affiliateLinkProps}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full font-semibold hover:from-orange-500 hover:to-yellow-500 transition-all"
          >
            👶 Browse All Kids Events
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
