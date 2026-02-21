import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getEventsByCategory } from "@/lib/events";
import { affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Workshops in Bangalore 2026 - Art, Cooking, Pottery & More | BangaloreLife",
  description: "Find unique workshops and experiences in Bangalore. Art classes, pottery workshops, cooking sessions, photography courses, and creative activities for adults and kids.",
  keywords: "workshops bangalore, pottery class bangalore, art workshop bengaluru, cooking class bangalore, photography workshop, creative workshops bangalore",
  openGraph: {
    title: "Workshops in Bangalore 2026 - Art, Cooking, Pottery & More",
    description: "Find unique workshops and experiences in Bangalore. Art, pottery, cooking, and more.",
    url: "https://bangalorelife.com/workshops",
    siteName: "BangaloreLife",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function WorkshopsPage() {
  const events = await getEventsByCategory('workshops', 50);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 to-black" />
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🎨 Workshops in Bangalore
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              {events.length}+ creative workshops & learning experiences
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Learn something new! From pottery and painting to cooking and photography, 
              Bangalore offers hundreds of hands-on workshops every week.
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
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-teal-900/30 to-cyan-900/30 flex items-center justify-center">
                      {event.image_url ? (
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-6xl">🎨</span>
                      )}
                      <div className="absolute top-3 right-3 px-3 py-1 bg-teal-600/80 rounded-full text-xs">
                        {event.date_display}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-teal-400 transition-colors">
                        {event.title}
                      </h3>
                      {event.venue_name && (
                        <p className="text-gray-400 text-sm mb-3">📍 {event.venue_name}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {event.price && <span className="text-teal-400 font-medium">{event.price}</span>}
                        <span className="text-sm text-gray-400 group-hover:text-teal-400">Book Now →</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Workshops are being updated. Check back soon!</p>
                <a
                  href="https://inr.deals/track?id=eve678604838&src=bangalorelife&campaign=cps&url=https%3A%2F%2Fin.bookmyshow.com%2Fexplore%2Fworkshops-bengaluru"
                  {...affiliateLinkProps}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 rounded-full"
                >
                  Browse on BookMyShow →
                </a>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 px-4 bg-gradient-to-b from-black to-teal-900/10">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h2 className="text-2xl font-bold mb-6 text-center">Creative Workshops in Bangalore</h2>
            
            <p className="text-gray-300">
              Bangalore&apos;s creative community is thriving. Every weekend, you&apos;ll find dozens of workshops 
              offering hands-on experiences in art, craft, cooking, and more. Perfect for dates, team outings, 
              or solo creative exploration.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Popular Workshop Types</h3>
            <ul className="text-gray-300 space-y-2">
              <li><strong>Pottery & Ceramics</strong> - Clay Studio, Terracotta, Clayfingers</li>
              <li><strong>Art & Painting</strong> - Canvas painting, fluid art, sketching</li>
              <li><strong>Cooking Classes</strong> - Italian, Thai, Japanese, Baking</li>
              <li><strong>Mixology</strong> - Cocktail making workshops at various bars</li>
              <li><strong>Photography</strong> - Mobile photography, portrait sessions</li>
              <li><strong>Candle Making</strong> - DIY scented candles</li>
              <li><strong>Terrarium Building</strong> - Create your own mini garden</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Where to Find Workshops</h3>
            <p className="text-gray-300">
              Art studios in Indiranagar and Koramangala regularly host workshops. 
              Co-working spaces like WeWork and 91springboard also organize creative sessions. 
              Cafes like Third Wave Coffee and Dyu Art Cafe often double as workshop venues.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center">
          <a
            href="https://inr.deals/track?id=eve678604838&src=bangalorelife&campaign=cps&url=https%3A%2F%2Fin.bookmyshow.com%2Fexplore%2Fworkshops-bengaluru"
            {...affiliateLinkProps}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full font-semibold hover:from-teal-500 hover:to-cyan-500 transition-all"
          >
            🎨 Browse All Workshops
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
