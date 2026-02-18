import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "What's On Tonight in Bangalore - Events, Parties & Things to Do",
  description: "Find out what's happening in Bangalore tonight. Events, concerts, comedy shows, parties, and the best places to go out. Updated daily.",
  openGraph: {
    title: "Tonight in Bangalore | BangaloreLife",
    description: "What's happening in Bangalore tonight - events, parties, and things to do.",
  },
};

const today = new Date();
const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

const tonightEvents = [
  { name: "Open Mic Night", venue: "The Humming Tree", time: "8 PM", type: "Live Music", price: "₹300" },
  { name: "Standup Comedy", venue: "Ministry of Comedy", time: "8:30 PM", type: "Comedy", price: "₹499" },
  { name: "Ladies Night", venue: "Loft 38", time: "8 PM onwards", type: "Nightlife", price: "Free" },
  { name: "Live Jazz", venue: "Windmills Craftworks", time: "8 PM", type: "Live Music", price: "No cover" },
  { name: "Trivia Night", venue: "Toit", time: "8 PM", type: "Activity", price: "Free" },
  { name: "DJ Night", venue: "Skyye", time: "9 PM onwards", type: "Nightlife", price: "Varies" },
];

const hotspots = [
  { name: "Toit", area: "Indiranagar", vibe: "Always packed, brewery vibes" },
  { name: "Skyye", area: "UB City", vibe: "Rooftop views, upscale crowd" },
  { name: "Social", area: "Multiple", vibe: "Casual, good for groups" },
  { name: "13th Floor", area: "MG Road", vibe: "Classic rooftop" },
];

export default function TonightPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-black to-pink-900/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-violet-300 text-sm tracking-wide">LIVE NOW</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extralight text-white mb-4">
              <span className="text-gradient">{dayName}</span> Night
            </h1>
            <p className="text-xl text-zinc-400 mb-2">{dateStr}</p>
            <p className="text-zinc-500 max-w-xl mx-auto">
              What&apos;s happening in Bangalore tonight
            </p>
          </div>
        </section>

        {/* Tonight's Events */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🎉 Events Tonight</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tonightEvents.map((event) => (
                <div
                  key={event.name}
                  className="group p-6 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2 py-1 bg-violet-500/10 text-violet-300 rounded">
                      {event.type}
                    </span>
                    <span className="text-xs text-zinc-500">{event.time}</span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-violet-300 transition-colors mb-1">
                    {event.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-3">{event.venue}</p>
                  <span className="text-sm text-violet-400">{event.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hotspots */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">🔥 Hot Tonight</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hotspots.map((spot) => (
                <div
                  key={spot.name}
                  className="group p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/30 transition-all"
                >
                  <h3 className="text-lg font-light text-white group-hover:text-orange-300 transition-colors mb-1">
                    {spot.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-2">{spot.area}</p>
                  <p className="text-xs text-zinc-400">{spot.vibe}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-extralight text-white mb-8">
              Find Your Vibe
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/nightlife"
                className="px-6 py-3 bg-violet-500 hover:bg-violet-400 text-white rounded-lg transition-all"
              >
                🍻 Nightlife
              </Link>
              <Link 
                href="/events"
                className="px-6 py-3 bg-pink-500 hover:bg-pink-400 text-white rounded-lg transition-all"
              >
                🎉 Events
              </Link>
              <Link 
                href="/restaurants"
                className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white rounded-lg transition-all"
              >
                🍽️ Dinner
              </Link>
              <Link 
                href="/cinema"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-all"
              >
                🎬 Movies
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
