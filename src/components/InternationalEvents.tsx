'use client';

import { useState } from 'react';

interface InternationalEvent {
  id: number;
  title: string;
  date: string;
  city: string;
  country: string;
  venue: string;
  category: string;
  price: string;
  image: string;
  ticketUrl: string;
}

const internationalEvents: InternationalEvent[] = [
  {
    id: 1,
    title: "Dubai Comedy Festival 2026",
    date: "Mar 5-15",
    city: "Dubai",
    country: "UAE",
    venue: "Coca-Cola Arena",
    category: "Comedy",
    price: "From AED 150",
    image: "😂",
    ticketUrl: "https://dubai.platinumlist.net/",
  },
  {
    id: 2,
    title: "Wireless Festival Middle East",
    date: "Mar 8-9",
    city: "Abu Dhabi",
    country: "UAE",
    venue: "Etihad Park",
    category: "Music Festival",
    price: "From AED 295",
    image: "🎵",
    ticketUrl: "https://abudhabi.platinumlist.net/",
  },
  {
    id: 3,
    title: "Riyadh Season Concerts",
    date: "Ongoing",
    city: "Riyadh",
    country: "Saudi Arabia",
    venue: "Boulevard City",
    category: "Concerts",
    price: "From SAR 200",
    image: "🎤",
    ticketUrl: "https://riyadhseason.sa/",
  },
  {
    id: 4,
    title: "Qatar International Jazz Festival",
    date: "Mar 20-22",
    city: "Doha",
    country: "Qatar",
    venue: "Katara Amphitheatre",
    category: "Jazz",
    price: "From QAR 150",
    image: "🎷",
    ticketUrl: "https://www.qtickets.com/",
  },
  {
    id: 5,
    title: "Muscat Nights Festival",
    date: "Mar 14-16",
    city: "Muscat",
    country: "Oman",
    venue: "Royal Opera House",
    category: "Cultural",
    price: "From OMR 15",
    image: "🎭",
    ticketUrl: "https://www.rohmuscat.org.om/",
  },
  {
    id: 6,
    title: "Jeddah Art Week",
    date: "Mar 25-30",
    city: "Jeddah",
    country: "Saudi Arabia",
    venue: "Hayy Jameel",
    category: "Art",
    price: "Free Entry",
    image: "🎨",
    ticketUrl: "https://www.hayyarts.org/",
  },
];

export default function InternationalEvents() {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  
  const cities = ['all', ...Array.from(new Set(internationalEvents.map(e => e.city)))];
  
  const filteredEvents = selectedCity === 'all' 
    ? internationalEvents 
    : internationalEvents.filter(e => e.city === selectedCity);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-violet-400 text-sm tracking-widest uppercase mb-2 block">NightsOut Network</span>
          <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
            International Events
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Planning a trip? Check out events happening across the NightsOut network cities
          </p>
        </div>

        {/* City Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCity === city
                  ? 'bg-violet-500 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {city === 'all' ? '🌍 All Cities' : city}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <a
              key={event.id}
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 overflow-hidden transition-all card-hover"
            >
              {/* Image */}
              <div className="h-36 bg-gradient-to-br from-violet-900/30 to-indigo-900/30 flex items-center justify-center relative">
                <span className="text-5xl opacity-50">{event.image}</span>
                <span className="absolute top-3 left-3 text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded">
                  {event.category}
                </span>
                <span className="absolute top-3 right-3 text-xs px-2 py-1 bg-black/50 text-white rounded flex items-center gap-1">
                  📍 {event.city}
                </span>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-light text-white group-hover:text-violet-300 transition-colors mb-2">
                  {event.title}
                </h3>
                
                <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.venue}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-violet-400">{event.price}</span>
                  <span className="text-violet-400 text-sm group-hover:text-violet-300">
                    View Event →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Network Links */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm mb-4">Explore more on our network sites</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://nightsoutdubai.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
              🇦🇪 Dubai
            </a>
            <a href="https://nightsoutabudhabi.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
              🇦🇪 Abu Dhabi
            </a>
            <a href="https://nightsoutriyadh.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
              🇸🇦 Riyadh
            </a>
            <a href="https://nightsoutjeddah.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
              🇸🇦 Jeddah
            </a>
            <a href="https://nightsoutdoha.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
              🇶🇦 Doha
            </a>
            <a href="https://nightsoutmuscat.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
              🇴🇲 Muscat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
