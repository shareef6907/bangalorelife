import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllEvents, type EventDisplay } from "@/lib/events";
import { affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "This Weekend in Bangalore - Events & Things to Do | BangaloreLife",
  description: "What's happening this weekend in Bangalore? Find the best events, concerts, comedy shows, and activities for Saturday and Sunday in Bengaluru.",
  keywords: "this weekend bangalore, weekend events bangalore, saturday bangalore, sunday bangalore, what to do this weekend bengaluru",
  openGraph: {
    title: "This Weekend in Bangalore - Events & Things to Do",
    description: "What's happening this weekend in Bangalore? Find the best events, concerts, comedy shows, and activities.",
    url: "https://bangalorelife.com/this-weekend",
    siteName: "BangaloreLife",
    type: "website",
  },
};

// Revalidate every 30 minutes for weekend page
export const revalidate = 1800;

function getWeekendDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Calculate days until Saturday (6) and Sunday (0)
  const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
  const daysUntilSun = (7 - dayOfWeek) % 7 || 7;
  
  // If it's weekend, use today/tomorrow
  const saturday = new Date(today);
  const sunday = new Date(today);
  
  if (dayOfWeek === 0) { // Sunday
    saturday.setDate(today.getDate() + 6);
    sunday.setDate(today.getDate());
  } else if (dayOfWeek === 6) { // Saturday
    saturday.setDate(today.getDate());
    sunday.setDate(today.getDate() + 1);
  } else {
    saturday.setDate(today.getDate() + daysUntilSat);
    sunday.setDate(today.getDate() + daysUntilSun);
  }
  
  return {
    saturday: saturday.toISOString().split('T')[0],
    sunday: sunday.toISOString().split('T')[0],
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
  };
}

function filterWeekendEvents(events: EventDisplay[], satDate: string, sunDate: string) {
  return events.filter(event => {
    const eventDate = event.start_date;
    return eventDate === satDate || eventDate === sunDate || 
           (event.end_date && event.start_date <= sunDate && event.end_date >= satDate);
  });
}

export default async function ThisWeekendPage() {
  const allEvents = await getAllEvents(100);
  const { saturday, sunday, isWeekend } = getWeekendDates();
  const weekendEvents = filterWeekendEvents(allEvents, saturday, sunday);

  const satDate = new Date(saturday);
  const sunDate = new Date(sunday);
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-black" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🗓️ This Weekend in Bangalore
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              {satDate.toLocaleDateString('en-IN', dateOptions)} & {sunDate.toLocaleDateString('en-IN', dateOptions)}
            </p>
            <p className="text-2xl font-bold text-indigo-400">
              {weekendEvents.length} events happening
            </p>
          </div>
        </section>

        {/* Weekend Events */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {weekendEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weekendEvents.map((event) => (
                  <a
                    key={event.id}
                    href={event.affiliate_url}
                    {...affiliateLinkProps}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-indigo-900/30 to-violet-900/30 flex items-center justify-center">
                      {event.image_url ? (
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-6xl">{event.category_emoji}</span>
                      )}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs">
                        {event.category_emoji} {event.category}
                      </div>
                      <div className="absolute top-3 right-3 px-3 py-1 bg-indigo-600/80 rounded-full text-xs">
                        {event.date_display}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                        {event.title}
                      </h3>
                      {event.venue_name && (
                        <p className="text-gray-400 text-sm mb-3">📍 {event.venue_name}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {event.price && <span className="text-indigo-400 font-medium">{event.price}</span>}
                        <span className="text-sm text-gray-400 group-hover:text-indigo-400">Get Tickets →</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400 mb-6">
                  No events scheduled for this specific weekend yet.
                </p>
                <p className="text-gray-500 mb-8">
                  Check out all upcoming events or explore things to do in Bangalore!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/events" className="px-6 py-3 bg-indigo-600 rounded-full">
                    All Events →
                  </Link>
                  <Link href="/things-to-do" className="px-6 py-3 bg-white/10 rounded-full">
                    Things To Do →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* More Options */}
        <section className="py-12 px-4 bg-gradient-to-b from-black to-indigo-900/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">More Weekend Ideas</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/breweries" className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:border-indigo-500/50 transition-all">
                <span className="text-3xl mb-2 block">🍺</span>
                <span className="font-medium">Brewery Hopping</span>
              </Link>
              <Link href="/nightlife" className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:border-indigo-500/50 transition-all">
                <span className="text-3xl mb-2 block">🍻</span>
                <span className="font-medium">Pub Crawl</span>
              </Link>
              <Link href="/cafes" className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:border-indigo-500/50 transition-all">
                <span className="text-3xl mb-2 block">☕</span>
                <span className="font-medium">Cafe Hopping</span>
              </Link>
              <Link href="/cinema" className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:border-indigo-500/50 transition-all">
                <span className="text-3xl mb-2 block">🎬</span>
                <span className="font-medium">Watch a Movie</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h2 className="text-2xl font-bold mb-6 text-center">Weekend Guide to Bangalore</h2>
            
            <p className="text-gray-300">
              Bangalore comes alive on weekends. Whether you&apos;re looking for live music, comedy shows, 
              food festivals, or just a chill brewery session — the city has endless options.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Perfect Weekend Itinerary</h3>
            <ul className="text-gray-300 space-y-2">
              <li><strong>Saturday Morning:</strong> Brunch at a cafe in Indiranagar</li>
              <li><strong>Saturday Afternoon:</strong> Explore Cubbon Park or a museum</li>
              <li><strong>Saturday Evening:</strong> Catch a comedy show or live gig</li>
              <li><strong>Saturday Night:</strong> Pub hopping in Koramangala</li>
              <li><strong>Sunday Morning:</strong> Farmer&apos;s market or yoga session</li>
              <li><strong>Sunday Afternoon:</strong> Brewery lunch at Toit or Arbor</li>
              <li><strong>Sunday Evening:</strong> Movie at a premium theater</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center">
          <a
            href="https://inr.deals/track?id=eve678604838&src=bangalorelife&campaign=cps&url=https%3A%2F%2Fin.bookmyshow.com%2Fexplore%2Fevents-bengaluru"
            {...affiliateLinkProps}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all"
          >
            🎉 Browse All Weekend Events
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
