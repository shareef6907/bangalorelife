'use client';

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventModal from "@/components/EventModal";
import MovieModal from "@/components/MovieModal";
import InternationalEvents from "@/components/InternationalEvents";
import moviesData from "@/data/movies.json";

const categories = [
  { name: "Pubs & Bars", href: "/nightlife", emoji: "🍻" },
  { name: "Events", href: "/events", emoji: "🎉" },
  { name: "Restaurants", href: "/restaurants", emoji: "🍽️" },
  { name: "Cinema", href: "/cinema", emoji: "🎬" },
  { name: "Breweries", href: "/breweries", emoji: "🍺" },
  { name: "Cafes", href: "/cafes", emoji: "☕" },
];

const categoryCards = [
  { 
    name: "Nightlife", 
    href: "/nightlife", 
    emoji: "🍻",
    description: "Pubs, clubs, rooftop bars",
    gradient: "from-violet-600/20 to-purple-900/20",
  },
  { 
    name: "Breweries", 
    href: "/breweries", 
    emoji: "🍺",
    description: "Craft beer paradise",
    gradient: "from-amber-600/20 to-orange-900/20",
  },
  { 
    name: "Restaurants", 
    href: "/restaurants", 
    emoji: "🍽️",
    description: "Fine dining to street food",
    gradient: "from-rose-600/20 to-red-900/20",
  },
  { 
    name: "Cafes", 
    href: "/cafes", 
    emoji: "☕",
    description: "Coffee culture hub",
    gradient: "from-emerald-600/20 to-teal-900/20",
  },
  { 
    name: "Events", 
    href: "/events", 
    emoji: "🎉",
    description: "Concerts, comedy, shows",
    gradient: "from-pink-600/20 to-fuchsia-900/20",
  },
  { 
    name: "Cinema", 
    href: "/cinema", 
    emoji: "🎬",
    description: "Movies now showing",
    gradient: "from-blue-600/20 to-indigo-900/20",
  },
];

const areas = [
  { name: "Indiranagar", href: "/areas/indiranagar", vibe: "Trendy • 12th Main nightlife hub" },
  { name: "Koramangala", href: "/areas/koramangala", vibe: "Young • Startup culture" },
  { name: "MG Road", href: "/areas/mg-road", vibe: "Classic • Iconic party district" },
  { name: "Whitefield", href: "/areas/whitefield", vibe: "IT Hub • Premium breweries" },
  { name: "HSR Layout", href: "/areas/hsr-layout", vibe: "Chill • Cafe culture" },
];

const featuredEvents = [
  {
    id: 1,
    title: "Bangalore Comedy Festival 2026",
    date: "Feb 28 - Mar 2",
    venue: "Phoenix Marketcity",
    category: "Comedy",
    price: "From ₹799",
    image: "😂",
    time: "7:00 PM onwards",
    description: "The biggest comedy festival in South India featuring top comedians from across the country. Multiple shows, open mics, and special performances.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/comedy-shows-bengaluru",
  },
  {
    id: 2,
    title: "Sunburn Arena ft. Martin Garrix",
    date: "March 15",
    venue: "Nice Grounds",
    category: "Concert",
    price: "From ₹1,999",
    image: "🎵",
    time: "5:00 PM",
    description: "Experience the electrifying performance of Martin Garrix at Sunburn Arena. India's biggest EDM festival brings the world's #1 DJ to Bangalore.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/music-shows-bengaluru",
  },
  {
    id: 3,
    title: "Zakir Khan Live - Tathastu",
    date: "March 8",
    venue: "JG Auditorium",
    category: "Comedy",
    price: "From ₹999",
    image: "😂",
    time: "8:00 PM",
    description: "Zakir Khan brings his new show 'Tathastu' to Bangalore. An evening of heartfelt comedy and storytelling from India's favorite comedian.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/comedy-shows-bengaluru",
  },
  {
    id: 4,
    title: "IPL 2026 - RCB vs CSK",
    date: "April 5",
    venue: "M. Chinnaswamy Stadium",
    category: "Sports",
    price: "From ₹2,500",
    image: "🏏",
    time: "7:30 PM",
    description: "The ultimate IPL clash! Royal Challengers Bangalore take on Chennai Super Kings at the iconic Chinnaswamy Stadium. Experience the electric atmosphere live.",
    bookMyShowUrl: "https://in.bookmyshow.com/sports/cricket",
  },
];

const microbreweryGuides = [
  { name: "Toit Brewpub", area: "Indiranagar", specialty: "Toit Weiss", rating: "4.8" },
  { name: "Arbor Brewing Company", area: "Magrath Road", specialty: "Bangalore Bliss", rating: "4.6" },
  { name: "Windmills Craftworks", area: "Whitefield", specialty: "Belgian Wit", rating: "4.5" },
  { name: "The Bier Library", area: "Koramangala", specialty: "Smoked Lager", rating: "4.4" },
];

interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  category: string;
  price: string;
  image: string;
  description?: string;
  bookMyShowUrl?: string;
  platinumlistUrl?: string;
  time?: string;
}

interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  overview: string;
  poster: string;
  backdrop?: string;
  releaseDate: string;
  rating: number;
  genres: string[];
  language: string;
  trailer?: string;
}

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const movies = moviesData.movies.slice(0, 5);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-purple-900/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/5 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-violet-300 text-sm tracking-wide">NAMMA BENGALURU</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tight mb-6 animate-slide-up">
              <span className="block text-white">Discover</span>
              <span className="block text-gradient font-light">BangaloreLife</span>
            </h1>

            <p className="text-xl sm:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              India&apos;s pub capital. Craft beer paradise. 
              Tech hub by day, party scene by night.
            </p>

            {/* 2 CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link 
                href="/tonight"
                className="px-8 py-4 bg-violet-500 hover:bg-violet-400 text-white font-medium rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
              >
                What&apos;s On Tonight
              </Link>
              <Link 
                href="/events"
                className="px-8 py-4 border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white font-light rounded-lg transition-all"
              >
                Browse Events
              </Link>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {categories.map((cat) => (
                <Link 
                  key={cat.href}
                  href={cat.href}
                  className="px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-sm hover:border-violet-500/50 hover:text-violet-300 transition-all"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 animate-bounce">
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Events Section - 4 Cards with Modal Popups */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-pink-400 text-sm tracking-widest uppercase mb-2 block">What&apos;s Happening</span>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white">Upcoming Events</h2>
              </div>
              <Link href="/events" className="text-pink-400 hover:text-pink-300 text-sm transition-colors">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-pink-500/30 overflow-hidden transition-all card-hover cursor-pointer"
                >
                  <div className="h-40 bg-gradient-to-br from-pink-900/20 to-violet-900/20 flex items-center justify-center">
                    <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform">{event.image}</span>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 bg-pink-500/10 text-pink-300 rounded">
                        {event.category}
                      </span>
                      <span className="text-xs text-zinc-500">{event.date}</span>
                    </div>
                    
                    <h3 className="text-base font-light text-white group-hover:text-pink-300 transition-colors mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-3">{event.venue}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pink-400">{event.price}</span>
                      <span className="text-violet-400 text-sm group-hover:text-violet-300">
                        Get Tickets →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cinema Section - 5 Movies with Trailer Modals */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-blue-400 text-sm tracking-widest uppercase mb-2 block">Now Showing</span>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white">Movies in Bangalore</h2>
              </div>
              <Link href="/cinema" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className="group rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 overflow-hidden transition-all card-hover cursor-pointer"
                >
                  <div className="aspect-[2/3] relative overflow-hidden">
                    {movie.poster ? (
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-zinc-900 flex items-center justify-center">
                        <span className="text-4xl opacity-30">🎬</span>
                      </div>
                    )}
                    
                    {movie.rating > 0 && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-amber-400">
                        ★ {movie.rating}
                      </div>
                    )}
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white">
                        ▶
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="text-sm font-light text-white group-hover:text-blue-300 transition-colors line-clamp-2 mb-1">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">{movie.language}</span>
                      <span className="text-zinc-600">{movie.genres?.[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Theater Links */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="https://www.pvrinox.com/bengaluru" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 rounded-lg text-sm transition-colors">
                PVR INOX
              </a>
              <a href="https://www.cinepolisindia.com/bengaluru" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg text-sm transition-colors">
                Cinépolis
              </a>
              <a href="https://www.innovativemultiplex.com/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-300 rounded-lg text-sm transition-colors">
                Innovative Multiplex
              </a>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
                Explore Bangalore
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                From legendary breweries to hidden speakeasies, discover what makes Bangalore 
                India&apos;s most exciting nightlife destination.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryCards.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${cat.gradient} border border-zinc-800 hover:border-violet-500/50 transition-all card-hover`}
                >
                  <span className="text-4xl mb-4 block">{cat.emoji}</span>
                  <h3 className="text-xl font-light text-white group-hover:text-violet-300 transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{cat.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Microbrewery Guides - Focus on Indiranagar/Koramangala */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-amber-400 text-sm tracking-widest uppercase mb-2 block">Craft Beer Guide</span>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white">Top Microbreweries</h2>
              </div>
              <Link href="/breweries" className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
                Full guide →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {microbreweryGuides.map((brewery, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-all card-hover"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl">🍺</span>
                    <span className="text-xs text-amber-400 flex items-center gap-1">
                      ★ {brewery.rating}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-amber-300 transition-colors mb-1">
                    {brewery.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-2">{brewery.area}</p>
                  <p className="text-xs text-amber-400/70">Try: {brewery.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-violet-400 text-sm tracking-widest uppercase mb-2 block">Neighborhoods</span>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white">Popular Areas</h2>
              </div>
              <Link href="/areas" className="text-violet-400 hover:text-violet-300 text-sm transition-colors">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {areas.map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="group p-6 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/30 transition-all"
                >
                  <h3 className="text-lg font-light text-white group-hover:text-violet-300 transition-colors mb-1">
                    {area.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{area.vibe}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* International Events Section */}
        <InternationalEvents />

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-6">
              Ready to Explore?
            </h2>
            <p className="text-zinc-400 mb-8">
              Whether you&apos;re a local or visiting, we&apos;ll help you discover 
              the best of Bangalore&apos;s vibrant scene.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/tonight"
                className="px-8 py-4 bg-violet-500 hover:bg-violet-400 text-white font-medium rounded-lg transition-all hover:scale-105"
              >
                What&apos;s On Tonight
              </Link>
              <Link 
                href="/areas/indiranagar"
                className="px-8 py-4 border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white rounded-lg transition-all"
              >
                Explore Indiranagar
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Event Modal */}
      <EventModal 
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Movie Modal */}
      <MovieModal 
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
