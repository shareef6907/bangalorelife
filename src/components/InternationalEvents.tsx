'use client';

import { useState, useEffect, useRef } from 'react';

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
    ticketUrl: "https://platinumlist.net/aff/?ref=yjg3yzi&link=https%3A%2F%2Fdubai.platinumlist.net%2F",
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
    ticketUrl: "https://platinumlist.net/aff/?ref=yjg3yzi&link=https%3A%2F%2Fabudhabi.platinumlist.net%2F",
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const cities = ['all', ...Array.from(new Set(internationalEvents.map(e => e.city)))];
  
  const filteredEvents = selectedCity === 'all' 
    ? internationalEvents 
    : internationalEvents.filter(e => e.city === selectedCity);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-violet-400 text-sm tracking-widest uppercase mb-3 block">Beyond Bangalore</span>
          <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-5">
            International <span className="text-gradient">Events</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Explore exciting events across the Middle East and beyond
          </p>
        </div>

        {/* Filter Buttons with Neon Glow */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`filter-btn px-5 py-2.5 rounded-full text-sm capitalize transition-all duration-300 ${
                selectedCity === city 
                  ? 'active text-violet-300' 
                  : 'text-zinc-400 hover:text-violet-300'
              }`}
            >
              {city === 'all' ? '🌍 All Cities' : city}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((event, i) => (
            <a
              key={event.id}
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card group p-6 rounded-2xl block transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl icon-glow group-hover:scale-110 transition-transform duration-300">
                  {event.image}
                </span>
                <div className="text-right">
                  <span className="text-xs px-3 py-1 bg-violet-500/15 text-violet-300 rounded-full border border-violet-500/20">
                    {event.country}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-light text-white group-hover:text-violet-300 transition-colors mb-2">
                {event.title}
              </h3>
              
              <div className="space-y-1 mb-4">
                <p className="text-sm text-zinc-500 flex items-center gap-2">
                  <span className="text-violet-400">📍</span> {event.venue}, {event.city}
                </p>
                <p className="text-sm text-zinc-500 flex items-center gap-2">
                  <span className="text-violet-400">📅</span> {event.date}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                <span className="text-sm text-violet-400">{event.price}</span>
                <span className="text-sm text-zinc-500 group-hover:text-violet-300 flex items-center gap-1 transition-colors">
                  View Event <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Sister Sites CTA */}
        <div className={`mt-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-zinc-500 mb-6">Explore our sister sites</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.nightsoutdubai.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="filter-btn px-6 py-3 rounded-xl text-sm text-zinc-400 hover:text-amber-400"
            >
              🇦🇪 Dubai
            </a>
            <a 
              href="https://www.nightsoutriyadh.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="filter-btn px-6 py-3 rounded-xl text-sm text-zinc-400 hover:text-emerald-400"
            >
              🇸🇦 Riyadh
            </a>
            <a 
              href="https://www.nightsoutdoha.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="filter-btn px-6 py-3 rounded-xl text-sm text-zinc-400 hover:text-rose-400"
            >
              🇶🇦 Doha
            </a>
            <a 
              href="https://www.nightsoutmuscat.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="filter-btn px-6 py-3 rounded-xl text-sm text-zinc-400 hover:text-teal-400"
            >
              🇴🇲 Muscat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
