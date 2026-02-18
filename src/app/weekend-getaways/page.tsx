import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Weekend Getaways from Bangalore - Best Road Trips & Escapes",
  description: "Escape Bangalore for the weekend. Nandi Hills, Coorg, Chikmagalur, Mysore, and more. Complete guide to weekend trips from Bangalore.",
  openGraph: {
    title: "Weekend Getaways from Bangalore | BangaloreLife",
    description: "Best weekend destinations from Bangalore - hill stations, coffee estates, and more.",
  },
};

const destinations = [
  {
    name: "Nandi Hills",
    distance: "60 km",
    driveTime: "1.5 hours",
    bestFor: "Sunrise, cycling, quick escape",
    highlights: ["Stunning sunrise views", "Cycling trails", "Ancient temples", "Tipu's Drop viewpoint"],
    bestTime: "Early morning (5 AM start)",
    description: "The classic Bangalore escape. Wake up early, drive up winding roads, and catch a magical sunrise above the clouds. Perfect for a quick morning trip.",
    idealFor: ["Couples", "Solo travelers", "Cyclists"],
    stayOptions: "Day trip recommended, limited stays available",
    emoji: "🌄",
  },
  {
    name: "Coorg (Kodagu)",
    distance: "265 km",
    driveTime: "5-6 hours",
    bestFor: "Coffee estates, nature, relaxation",
    highlights: ["Coffee plantation stays", "Abbey Falls", "Raja's Seat", "Namdroling Monastery", "Dubare Elephant Camp"],
    bestTime: "Oct-Feb (monsoon is scenic but wet)",
    description: "The Scotland of India. Misty hills, endless coffee plantations, and the warmest hospitality. Perfect for a leisurely 2-3 day escape.",
    idealFor: ["Couples", "Families", "Nature lovers"],
    stayOptions: "Homestays, plantation resorts, luxury options",
    emoji: "☕",
  },
  {
    name: "Chikmagalur",
    distance: "245 km",
    driveTime: "5.5 hours",
    bestFor: "Trekking, coffee, adventure",
    highlights: ["Mullayanagiri Peak", "Baba Budangiri", "Coffee estate trails", "Hebbe Falls"],
    bestTime: "Sep-Feb (post-monsoon is lush)",
    description: "Karnataka's coffee heartland. Trek to the highest peak in the state, explore coffee trails, and enjoy cooler temperatures.",
    idealFor: ["Adventure seekers", "Trekkers", "Photographers"],
    stayOptions: "Homestays, budget resorts",
    emoji: "🏔️",
  },
  {
    name: "Mysore",
    distance: "145 km",
    driveTime: "3 hours",
    bestFor: "Heritage, food, culture",
    highlights: ["Mysore Palace", "Chamundi Hill", "Brindavan Gardens", "Mysore Pak & silk shopping"],
    bestTime: "Oct (Dussehra) or any time",
    description: "The cultural capital of Karnataka. Grand palaces, incredible food (Mylari Dosa!), and a slower pace of life.",
    idealFor: ["Families", "History buffs", "Foodies"],
    stayOptions: "Heritage hotels, budget to luxury",
    emoji: "🏰",
  },
  {
    name: "Kabini",
    distance: "220 km",
    driveTime: "5 hours",
    bestFor: "Wildlife safari, luxury",
    highlights: ["Tiger and elephant safaris", "Kabini River", "Luxury jungle resorts", "Bird watching"],
    bestTime: "Oct-May (dry season for wildlife)",
    description: "One of India's best wildlife destinations. Stay at the riverside and go on safari to spot tigers, elephants, and more.",
    idealFor: ["Wildlife enthusiasts", "Luxury travelers", "Photographers"],
    stayOptions: "Jungle Lodges (govt), Evolve Back (luxury)",
    emoji: "🐘",
  },
  {
    name: "Ooty",
    distance: "270 km",
    driveTime: "6.5 hours",
    bestFor: "Hill station vibes, colonial charm",
    highlights: ["Botanical Gardens", "Nilgiri Toy Train", "Tea estates", "Ooty Lake"],
    bestTime: "Oct-June (avoid monsoon)",
    description: "The Queen of Hill Stations. Colonial-era charm, tea gardens, and the famous toy train through the mountains.",
    idealFor: ["Families", "Honeymooners", "Nostalgia seekers"],
    stayOptions: "Heritage bungalows, resorts",
    emoji: "🚂",
  },
  {
    name: "Sakleshpur",
    distance: "220 km",
    driveTime: "5 hours",
    bestFor: "Trekking, offbeat escape",
    highlights: ["Green Route Trek", "Coffee estates", "Manjarabad Fort", "Waterfalls"],
    bestTime: "Oct-Feb",
    description: "Offbeat alternative to Coorg. Less crowded, great treks, and equally beautiful coffee country.",
    idealFor: ["Trekkers", "Budget travelers", "Groups"],
    stayOptions: "Homestays, camping",
    emoji: "🥾",
  },
  {
    name: "BR Hills",
    distance: "180 km",
    driveTime: "4 hours",
    bestFor: "Wildlife, temples, serenity",
    highlights: ["Biligiri Rangaswamy Temple", "Safari", "Less crowded than Kabini", "Tribal villages"],
    bestTime: "Oct-May",
    description: "Where the Western and Eastern Ghats meet. A quieter wildlife destination with spiritual significance.",
    idealFor: ["Nature lovers", "Spiritual seekers", "Budget travelers"],
    stayOptions: "Jungle Lodge (govt run)",
    emoji: "🌲",
  },
];

const quickTrips = [
  { name: "Nandi Hills", time: "Half day", type: "Sunrise" },
  { name: "Ramanagara", time: "Half day", type: "Rock climbing" },
  { name: "Skandagiri", time: "Night trek", type: "Adventure" },
  { name: "Anthargange", time: "Night trek", type: "Caves" },
];

export default function WeekendGetawaysPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-black to-emerald-900/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-teal-400 text-sm">Weekend Getaways</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Weekend <span className="text-gradient">Getaways</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              Escape the city. From misty hill stations to wildlife safaris, 
              the best destinations are just a few hours from Bangalore.
            </p>
          </div>
        </section>

        {/* Quick Trips */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-light text-white mb-6">⚡ Quick Escapes (Half Day / Night)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickTrips.map((trip) => (
                <div
                  key={trip.name}
                  className="p-4 rounded-xl bg-black border border-zinc-800 text-center"
                >
                  <span className="text-white font-light block">{trip.name}</span>
                  <span className="text-xs text-teal-400">{trip.time}</span>
                  <span className="text-xs text-zinc-500 block">{trip.type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl font-extralight text-white">Popular Destinations</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-teal-500/50 to-transparent" />
            </div>

            <div className="space-y-6">
              {destinations.map((dest) => (
                <div
                  key={dest.name}
                  className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-teal-500/30 overflow-hidden transition-all"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Emoji & Quick Info */}
                      <div className="flex lg:flex-col items-center gap-4 lg:gap-2 lg:w-24">
                        <span className="text-5xl">{dest.emoji}</span>
                        <div className="text-center">
                          <span className="text-xs text-zinc-500 block">{dest.distance}</span>
                          <span className="text-xs text-teal-400">{dest.driveTime}</span>
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-2xl font-light text-white group-hover:text-teal-300 transition-colors">
                            {dest.name}
                          </h3>
                          <span className="px-3 py-1 bg-teal-500/10 text-teal-300 text-xs rounded-full">
                            {dest.bestFor}
                          </span>
                        </div>
                        
                        <p className="text-zinc-400 mb-4 leading-relaxed">
                          {dest.description}
                        </p>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {dest.highlights.map((h) => (
                            <span
                              key={h}
                              className="px-3 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-zinc-500">Best Time:</span>
                            <span className="text-white ml-2">{dest.bestTime}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Ideal For:</span>
                            <span className="text-white ml-2">{dest.idealFor.join(", ")}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Stay:</span>
                            <span className="text-white ml-2">{dest.stayOptions}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Road Trip Tips */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              Road Trip Tips
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <h3 className="text-xl text-white mt-8 mb-4">Before You Go</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li><strong className="text-white">Start early:</strong> Leave by 5-6 AM to avoid Bangalore traffic</li>
                <li><strong className="text-white">Book ahead:</strong> Homestays fill up fast, especially weekends</li>
                <li><strong className="text-white">Check weather:</strong> Monsoon makes some roads tricky</li>
                <li><strong className="text-white">Fill up:</strong> Petrol pumps can be sparse in hill areas</li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Best Routes</h3>
              <ul className="text-zinc-400 leading-relaxed mb-6 list-disc pl-6">
                <li><strong className="text-white">To Mysore:</strong> Take the expressway (2.5 hrs) or scenic SH17 (3+ hrs)</li>
                <li><strong className="text-white">To Coorg:</strong> Via Mysore is longer but better roads</li>
                <li><strong className="text-white">To Chikmagalur:</strong> NH75 via Hassan</li>
                <li><strong className="text-white">To Ooty:</strong> Via Mysore, then scenic Bandipur ghat</li>
              </ul>

              <h3 className="text-xl text-white mt-8 mb-4">Self-Drive vs Taxi</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Self-drive is best for flexibility, especially to coffee estates and offbeat spots. 
                For Nandi Hills and Mysore day trips, hiring a taxi (Ola Outstation / Savaari) 
                is convenient. Expect ₹12-15 per km for sedan, ₹18-22 for SUV.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
