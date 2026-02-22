import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "15 Best Day Trips from Bangalore (2026) — Weekend Getaways",
  description: "Escape Bangalore for a day or weekend. The best day trips within 3 hours - Nandi Hills, Mysore, Coorg, wineries, and adventure spots.",
  keywords: "day trips from bangalore, bangalore weekend getaways, nandi hills, mysore day trip, coorg from bangalore, bangalore road trips",
};

const dayTrips = [
  {
    name: "Nandi Hills",
    distance: "60 km",
    time: "1.5 hours",
    type: "Sunrise & Nature",
    description: "The classic Bangalore day trip. Leave at 4am, watch the sunrise above the clouds, freeze in the cold morning air, breakfast on the way back. A rite of passage.",
    bestTime: "October – February (clearest skies)",
    highlights: ["Sunrise views", "Tipu's Drop", "Cycling routes"],
    tip: "Gates open at 5am. Go on weekdays to avoid crowds.",
  },
  {
    name: "Mysore",
    distance: "150 km",
    time: "3 hours",
    type: "Heritage & Culture",
    description: "The royal city makes for a perfect day trip. Mysore Palace, Chamundi Hills, and some of India's best dosas. Leave early, return late.",
    bestTime: "Year-round (October for Dasara)",
    highlights: ["Mysore Palace", "Chamundi Hills", "Devaraja Market"],
    tip: "Palace is closed on Sundays. Plan accordingly.",
  },
  {
    name: "Coorg (Madikeri)",
    distance: "250 km",
    time: "5 hours",
    type: "Hill Station & Coffee",
    description: "Best as a weekend trip, but doable in a long day. Coffee estates, misty hills, and some of Karnataka's most beautiful scenery.",
    bestTime: "September – March",
    highlights: ["Coffee plantations", "Abbey Falls", "Raja's Seat"],
    tip: "Stay overnight if possible. One day isn't enough.",
  },
  {
    name: "Skandagiri",
    distance: "70 km",
    time: "2 hours",
    type: "Trekking",
    description: "The best night trek near Bangalore. Start at midnight, reach the summit for sunrise above the clouds. Unforgettable.",
    bestTime: "October – February",
    highlights: ["Night trek", "Sunrise views", "Ancient ruins"],
    tip: "Book through a trekking group. Don't go alone at night.",
  },
  {
    name: "Grover Zampa Vineyards",
    distance: "40 km",
    time: "1 hour",
    type: "Wine Tasting",
    description: "Karnataka's best winery. Tour the vineyards, taste the wines, enjoy lunch with a view. A European afternoon, Bangalore edition.",
    bestTime: "Year-round",
    highlights: ["Wine tours", "Tastings", "Lunch"],
    tip: "Book the tour in advance. Combine with Nandi Hills.",
  },
  {
    name: "Shivanasamudra Falls",
    distance: "130 km",
    time: "3 hours",
    type: "Waterfalls",
    description: "Dramatic waterfalls at their best during and after monsoon. The Cauvery splits into twin falls — Gaganachukki and Bharachukki.",
    bestTime: "July – October (post-monsoon)",
    highlights: ["Twin falls", "Coracle rides", "River views"],
    tip: "Best after monsoon rains. Can be underwhelming in summer.",
  },
  {
    name: "Savandurga",
    distance: "50 km",
    time: "1.5 hours",
    type: "Trekking",
    description: "One of Asia's largest monolith hills. A challenging day trek with rewarding views at the top.",
    bestTime: "October – February",
    highlights: ["Monolith trek", "Manchinbele Dam", "Views"],
    tip: "Carry plenty of water. The climb is steep.",
  },
  {
    name: "Lepakshi",
    distance: "120 km",
    time: "2.5 hours",
    type: "Heritage",
    description: "16th-century Vijayanagara temple with incredible murals and the famous hanging pillar. Cross into Andhra for a history fix.",
    bestTime: "Year-round",
    highlights: ["Hanging pillar", "Nandi statue", "Temple murals"],
    tip: "Combine with Penukonda ruins for a full day.",
  },
  {
    name: "Anthargange",
    distance: "70 km",
    time: "2 hours",
    type: "Caves & Trekking",
    description: "Volcanic rock formations with caves to explore. Popular for night treks and camping.",
    bestTime: "October – February",
    highlights: ["Cave exploration", "Night trek", "Camping"],
    tip: "Bring flashlights for the caves.",
  },
  {
    name: "Manchinbele Dam",
    distance: "40 km",
    time: "1 hour",
    type: "Water Sports",
    description: "Kayaking, coracle rides, and riverside camping. The closest water sports destination to Bangalore.",
    bestTime: "Year-round",
    highlights: ["Kayaking", "Coracle rides", "Camping"],
    tip: "Several operators run day trips. Book in advance.",
  },
];

export default function DayTripsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" 
              alt="Day trips from Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-green-400 font-medium mb-2">Outdoor Guide</p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                15 Best Day Trips from Bangalore
              </h1>
              <p className="text-lg text-white/90">Weekend getaways within 3 hours (2026)</p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              Bangalore's perfect weather and central location make it ideal for <strong>day trips 
              and weekend getaways</strong>. Within a few hours, you can be watching sunrise above 
              clouds, trekking volcanic rocks, tasting wine, or exploring ancient temples.
            </p>
            <p>
              Whether you want adventure, heritage, nature, or just an escape from the city, 
              these are the <strong>best day trips from Bangalore</strong>.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            {dayTrips.map((trip, i) => (
              <div key={trip.name} className="bg-white rounded-xl p-6 border border-stone-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-green-600 font-semibold text-sm">#{i + 1}</span>
                    <h2 className="text-xl font-semibold text-stone-900">{trip.name}</h2>
                    <p className="text-stone-500 text-sm">{trip.distance} • {trip.time}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                    {trip.type}
                  </span>
                </div>
                <p className="text-stone-700 mb-4">{trip.description}</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-stone-500">Best Time:</span>
                    <span className="text-stone-700 ml-1">{trip.bestTime}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Highlights:</span>
                    <span className="text-stone-700 ml-1">{trip.highlights.join(", ")}</span>
                  </div>
                </div>
                <p className="text-sm text-green-700">💡 Tip: {trip.tip}</p>
              </div>
            ))}
          </section>

          <section className="mb-12 bg-green-50 rounded-xl p-6 border border-green-200">
            <h2 className="text-lg font-semibold text-green-900 mb-4">🚗 Road Trip Essentials</h2>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• <strong>Leave early:</strong> Beat Bangalore traffic by leaving before 6am.</li>
              <li>• <strong>Toll money:</strong> Keep cash for tollways on all routes.</li>
              <li>• <strong>Fuel up:</strong> Fill your tank in the city; options thin out.</li>
              <li>• <strong>Breakfast stops:</strong> Kamat, A2B, and MTR have highway locations.</li>
              <li>• <strong>Return timing:</strong> Avoid entering Bangalore after 6pm on Sundays.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Related</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/adventure-activities-near-bangalore" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Adventure Activities →
              </Link>
              <Link href="/guides/things-to-do-bangalore" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Things to Do →
              </Link>
            </div>
          </section>

          <div className="text-center text-sm text-stone-500">Last updated: February 2026</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
