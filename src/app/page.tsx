'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  },
  { 
    name: "Breweries", 
    href: "/breweries", 
    emoji: "🍺",
    description: "Craft beer paradise",
  },
  { 
    name: "Restaurants", 
    href: "/restaurants", 
    emoji: "🍽️",
    description: "Fine dining to street food",
  },
  { 
    name: "Cafes", 
    href: "/cafes", 
    emoji: "☕",
    description: "Coffee culture hub",
  },
  { 
    name: "Events", 
    href: "/events", 
    emoji: "🎉",
    description: "Concerts, comedy, shows",
  },
  { 
    name: "Cinema", 
    href: "/cinema", 
    emoji: "🎬",
    description: "Movies now showing",
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

// Floating Particles Component - Pure CSS Animation
function FloatingParticles() {
  // Generate particle positions
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: ['particle', 'particle particle-sm', 'particle particle-lg'][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className={p.size}
          style={{
            '--x': `${p.x}%`,
            '--delay': `${p.delay}s`,
            '--duration': `${p.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
  
  return ref;
}

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  // Only show movies with posters
  const movies = moviesData.movies.filter((m: Movie) => m.poster).slice(0, 5);
  
  // Initialize scroll reveal
  useScrollReveal();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION - Animated with Particles
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden corner-accents">
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-black to-purple-950/30" />
            
            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-800/10 rounded-full blur-[120px] animate-float" />
          </div>
          
          {/* Floating Particles */}
          <FloatingParticles />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
              backgroundSize: '80px 80px'
            }} />
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/30 bg-violet-500/5 backdrop-blur-sm mb-10 animate-fade-in neon-glow-hover">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-violet-300 text-sm tracking-widest uppercase font-light">Namma Bengaluru</span>
            </div>

            {/* Main Title with Shimmer + Glow */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tight mb-8 animate-slide-up">
              <span className="block text-white mb-2">Discover</span>
              <span className="block text-gradient text-glow font-light text-6xl sm:text-7xl lg:text-9xl">
                BangaloreLife
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-14 leading-relaxed animate-slide-up delay-100">
              India&apos;s pub capital. Craft beer paradise. 
              <br className="hidden sm:block" />
              Tech hub by day, party scene by night.
            </p>

            {/* CTAs with neon effect */}
            <div className="flex flex-wrap justify-center gap-5 mb-14 animate-slide-up delay-200">
              <Link 
                href="/tonight"
                className="btn-neon px-10 py-4 text-white font-medium rounded-xl"
              >
                What&apos;s On Tonight
              </Link>
              <Link 
                href="/events"
                className="px-10 py-4 border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white font-light rounded-xl transition-all duration-300 backdrop-blur-sm neon-glow-hover"
              >
                Browse Events
              </Link>
            </div>

            {/* Category pills with glow */}
            <div className="flex flex-wrap justify-center gap-3 animate-slide-up delay-300">
              {categories.map((cat) => (
                <Link 
                  key={cat.href}
                  href={cat.href}
                  className="filter-btn px-5 py-2.5 rounded-full text-zinc-400 text-sm hover:text-violet-300"
                >
                  <span className="icon-glow">{cat.emoji}</span> {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500">
            <span className="text-xs tracking-widest uppercase animate-fade-in delay-500">Explore</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            EVENTS SECTION - Glass Cards with Glow
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative">
          {/* Section background accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-end justify-between mb-14 reveal">
              <div>
                <span className="text-pink-400 text-sm tracking-widest uppercase mb-3 block">What&apos;s Happening</span>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white">Upcoming Events</h2>
              </div>
              <Link href="/events" className="text-pink-400 hover:text-pink-300 text-sm transition-colors group flex items-center gap-1">
                View all <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event, i) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="reveal glass-card group rounded-2xl overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="h-44 bg-gradient-to-br from-pink-900/30 to-violet-900/30 flex items-center justify-center relative overflow-hidden">
                    <span className="text-6xl opacity-60 group-hover:scale-125 group-hover:opacity-80 transition-all duration-500 icon-glow">{event.image}</span>
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-3 py-1 bg-pink-500/15 text-pink-300 rounded-full border border-pink-500/20">
                        {event.category}
                      </span>
                      <span className="text-xs text-zinc-500">{event.date}</span>
                    </div>
                    
                    <h3 className="text-base font-light text-white group-hover:text-pink-300 transition-colors mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-4">{event.venue}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pink-400 font-medium">{event.price}</span>
                      <span className="text-violet-400 text-sm group-hover:text-violet-300 flex items-center gap-1">
                        Get Tickets <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CINEMA SECTION - Movies with Hover Effects
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-black relative">
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-end justify-between mb-14 reveal">
              <div>
                <span className="text-blue-400 text-sm tracking-widest uppercase mb-3 block">Now Showing</span>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white">Movies in Bangalore</h2>
              </div>
              <Link href="/cinema" className="text-blue-400 hover:text-blue-300 text-sm transition-colors group flex items-center gap-1">
                View all <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {movies.map((movie, i) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className="reveal group rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/40 overflow-hidden transition-all duration-300 cursor-pointer neon-glow-hover"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="aspect-[2/3] relative overflow-hidden">
                    {movie.poster ? (
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-zinc-900 flex items-center justify-center">
                        <span className="text-4xl opacity-30">🎬</span>
                      </div>
                    )}
                    
                    {movie.rating > 0 && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-sm rounded-lg text-xs text-amber-400 border border-amber-500/20">
                        ★ {movie.rating}
                      </div>
                    )}
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
                        ▶
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
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
            <div className="mt-12 flex flex-wrap justify-center gap-4 reveal">
              <a href="https://www.pvrinox.com/bengaluru" target="_blank" rel="noopener noreferrer" className="filter-btn px-6 py-3 rounded-xl text-yellow-300 text-sm">
                🎬 PVR INOX
              </a>
              <a href="https://www.cinepolisindia.com/bengaluru" target="_blank" rel="noopener noreferrer" className="filter-btn px-6 py-3 rounded-xl text-blue-300 text-sm">
                🎬 Cinépolis
              </a>
              <a href="https://www.innovativemultiplex.com/" target="_blank" rel="noopener noreferrer" className="filter-btn px-6 py-3 rounded-xl text-green-300 text-sm">
                🎬 Innovative
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CATEGORIES GRID - Glassmorphism Cards
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-5">
                Explore <span className="text-gradient">Bangalore</span>
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                From legendary breweries to hidden speakeasies, discover what makes Bangalore 
                India&apos;s most exciting nightlife destination.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryCards.map((cat, i) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="reveal glass-card group p-8 rounded-2xl"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className="text-5xl mb-5 block icon-glow group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
                  <h3 className="text-xl font-light text-white group-hover:text-violet-300 transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">{cat.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            MICROBREWERIES - Craft Beer Guide
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-black relative">
          <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-end justify-between mb-14 reveal">
              <div>
                <span className="text-amber-400 text-sm tracking-widest uppercase mb-3 block">Craft Beer Guide</span>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white">Top Microbreweries</h2>
              </div>
              <Link href="/breweries" className="text-amber-400 hover:text-amber-300 text-sm transition-colors group flex items-center gap-1">
                Full guide <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {microbreweryGuides.map((brewery, i) => (
                <div
                  key={i}
                  className="reveal glass-card group p-6 rounded-xl"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-4xl icon-glow">🍺</span>
                    <span className="text-xs text-amber-400 flex items-center gap-1 px-2 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                      ★ {brewery.rating}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-amber-300 transition-colors mb-1">
                    {brewery.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-3">{brewery.area}</p>
                  <p className="text-xs text-amber-400/80">Try: {brewery.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            AREAS SECTION - Neighborhoods
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-14 reveal">
              <div>
                <span className="text-violet-400 text-sm tracking-widest uppercase mb-3 block">Neighborhoods</span>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white">Popular Areas</h2>
              </div>
              <Link href="/areas" className="text-violet-400 hover:text-violet-300 text-sm transition-colors group flex items-center gap-1">
                View all <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {areas.map((area, i) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="reveal group p-6 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/40 transition-all duration-300 neon-glow-hover"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <h3 className="text-lg font-light text-white group-hover:text-violet-300 transition-colors mb-1">
                    {area.name}
                  </h3>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">{area.vibe}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* International Events Section */}
        <InternationalEvents />

        {/* ═══════════════════════════════════════════════════════════════
            CTA SECTION - Final Call to Action
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-950 to-black relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />
          </div>
          
          <div className="max-w-3xl mx-auto text-center relative reveal">
            <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-6">
              Ready to <span className="text-gradient">Explore</span>?
            </h2>
            <p className="text-zinc-400 mb-10 text-lg">
              Whether you&apos;re a local or visiting, we&apos;ll help you discover 
              the best of Bangalore&apos;s vibrant scene.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link 
                href="/tonight"
                className="btn-neon px-10 py-4 text-white font-medium rounded-xl"
              >
                What&apos;s On Tonight
              </Link>
              <Link 
                href="/areas/indiranagar"
                className="px-10 py-4 border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white rounded-xl transition-all duration-300 neon-glow-hover"
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
