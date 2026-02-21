'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import EventModal from "@/components/EventModal";
import MovieModal from "@/components/MovieModal";
import InternationalEvents from "@/components/InternationalEvents";
import { type EventDisplay } from "@/lib/events";
import { affiliateLinkProps } from "@/lib/affiliate";

interface Category {
  name: string;
  href: string;
  emoji: string;
}

interface CategoryCard {
  name: string;
  href: string;
  emoji: string;
  description: string;
}

interface Area {
  name: string;
  href: string;
  vibe: string;
}

interface Brewery {
  name: string;
  area: string;
  rating: number;
  specialty: string;
}

interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  poster: string;
  backdrop?: string;
  rating?: number;
  releaseDate?: string;
  language: string;
  genres?: string[];
  genre?: string;
  trailer?: string;
  synopsis?: string;
  overview?: string;
}

interface HomeClientProps {
  categories: Category[];
  categoryCards: CategoryCard[];
  areas: Area[];
  breweries: Brewery[];
  featuredEvents: EventDisplay[];
  movies: Movie[];
}

// Hook for scroll reveal animations
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="floating-particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomeClient({ 
  categories, 
  categoryCards, 
  areas, 
  breweries, 
  featuredEvents, 
  movies 
}: HomeClientProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventDisplay | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const eventsSection = useScrollReveal();
  const moviesSection = useScrollReveal();
  const breweriesSection = useScrollReveal();
  const areasSection = useScrollReveal();

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black to-black" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-800/20 rounded-full blur-[120px]" />
        </div>
        
        <FloatingParticles />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Main Title with shimmer effect */}
          <h1 className="text-5xl md:text-8xl font-black mb-6 shimmer-text">
            BangaloreLife
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 text-glow">
            India&apos;s Pub Capital • Tech Hub • Craft Beer Paradise
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Discover the best nightlife, events, restaurants, and experiences in Bengaluru
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
              >
                <span className="mr-2">{cat.emoji}</span>
                <span className="group-hover:text-purple-400 transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full font-semibold hover:from-purple-500 hover:to-violet-500 transition-all transform hover:scale-105 neon-glow"
            >
              🎉 Explore Events
            </Link>
            <Link
              href="/nightlife"
              className="px-8 py-4 bg-white/5 border border-white/20 rounded-full font-semibold hover:bg-white/10 hover:border-purple-500/50 transition-all"
            >
              🍻 Discover Nightlife
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section 
        ref={eventsSection.ref}
        className={`py-20 px-4 transition-all duration-1000 ${eventsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-glow">🎫 Upcoming Events</h2>
              <p className="text-gray-400 mt-2">{featuredEvents.length}+ events this week</p>
            </div>
            <Link 
              href="/events" 
              className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:border-purple-500/50 transition-all hidden md:block"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.slice(0, 8).map((event, index) => (
              <a
                key={event.id}
                href={event.affiliate_url}
                {...affiliateLinkProps}
                className="group glass-card rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-32 bg-gradient-to-br from-purple-900/50 to-violet-900/50 flex items-center justify-center">
                  {event.image_url ? (
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-5xl">{event.category_emoji}</span>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs">
                    {event.date_display}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-purple-400 mb-1">{event.category_emoji} {event.category}</p>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors text-sm">
                    {event.title}
                  </h3>
                  {event.venue_name && (
                    <p className="text-gray-400 text-xs mt-1">📍 {event.venue_name}</p>
                  )}
                  {event.price && (
                    <p className="text-purple-400 text-sm mt-2 font-medium">{event.price}</p>
                  )}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/events" className="px-6 py-3 bg-purple-600 rounded-full inline-block">
              View All Events →
            </Link>
          </div>
        </div>
      </section>

      {/* Now Showing - Movies */}
      <section 
        ref={moviesSection.ref}
        className={`py-20 px-4 bg-gradient-to-b from-black to-purple-900/10 transition-all duration-1000 ${moviesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-glow">🎬 Now Showing</h2>
              <p className="text-gray-400 mt-2">Latest releases in Bangalore theaters</p>
            </div>
            <Link 
              href="/cinema" 
              className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:border-purple-500/50 transition-all hidden md:block"
            >
              All Movies →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                onClick={() => setSelectedMovie(movie)}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 glass-card">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {movie.rating && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs flex items-center gap-1">
                      <span className="text-yellow-400">★</span> {movie.rating}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="text-3xl">▶</span>
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{movie.title}</h3>
                <p className="text-gray-400 text-xs">{movie.language}{movie.genres?.length ? ` • ${movie.genres[0]}` : movie.genre ? ` • ${movie.genre}` : ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Bangalore - Breweries */}
      <section 
        ref={breweriesSection.ref}
        className={`py-20 px-4 transition-all duration-1000 ${breweriesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-glow mb-4">🍺 Explore Bangalore</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From legendary breweries to hidden speakeasies, discover what makes Bangalore India&apos;s most exciting nightlife destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {breweries.map((brewery, index) => (
              <Link
                key={brewery.name}
                href="/breweries"
                className="group glass-card p-6 rounded-2xl hover:border-purple-500/50 transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">🍺</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium">{brewery.rating}</span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-purple-400 transition-colors">
                  {brewery.name}
                </h3>
                <p className="text-gray-400 text-sm">{brewery.area}</p>
                <p className="text-purple-400 text-sm mt-2">Try: {brewery.specialty}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/10 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow">
            What are you looking for?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryCards.map((card, index) => (
              <Link
                key={card.name}
                href={card.href}
                className="group glass-card p-6 rounded-2xl text-center hover:border-purple-500/50 transition-all hover:transform hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform icon-glow">
                  {card.emoji}
                </div>
                <h3 className="font-semibold group-hover:text-purple-400 transition-colors">
                  {card.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section 
        ref={areasSection.ref}
        className={`py-20 px-4 transition-all duration-1000 ${areasSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-glow">
            Explore by Area
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Each neighborhood has its own unique vibe
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {areas.map((area, index) => (
              <Link
                key={area.name}
                href={area.href}
                className="group glass-card p-6 rounded-2xl hover:border-purple-500/50 transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors">
                  {area.name}
                </h3>
                <p className="text-gray-400 text-sm mt-2">{area.vibe}</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/areas"
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:border-purple-500/50 transition-all inline-block"
            >
              View All Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* International Events */}
      <InternationalEvents />

      {/* Final CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-glow">
            Ready to Explore?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Whether you&apos;re a local or visiting, we&apos;ll help you discover the best of Bangalore&apos;s vibrant scene.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full font-semibold hover:from-purple-500 hover:to-violet-500 transition-all transform hover:scale-105"
            >
              🎉 Browse Events
            </Link>
            <Link
              href="/things-to-do"
              className="px-8 py-4 bg-white/5 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              📍 Things To Do
            </Link>
          </div>
        </div>
      </section>

      {/* Modals */}
      <MovieModal 
        movie={selectedMovie} 
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)} 
      />
    </main>
  );
}
