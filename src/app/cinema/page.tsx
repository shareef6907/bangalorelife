'use client';

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieModal from "@/components/MovieModal";
import moviesData from "@/data/movies.json";

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

const languages = [
  { name: "All", id: "all" },
  { name: "English", id: "EN" },
  { name: "Hindi", id: "HI" },
  { name: "Kannada", id: "KN" },
  { name: "Tamil", id: "TA" },
  { name: "Telugu", id: "TE" },
  { name: "Malayalam", id: "ML" },
];

const theaters = [
  { name: "PVR Forum Mall", area: "Koramangala", screens: 11, link: "https://www.pvrinox.com/bengaluru" },
  { name: "INOX Mantri Square", area: "Malleswaram", screens: 8, link: "https://www.pvrinox.com/bengaluru" },
  { name: "Cinépolis Orion", area: "Rajajinagar", screens: 10, link: "https://www.cinepolisindia.com/bengaluru" },
  { name: "PVR Vega City", area: "Bannerghatta Road", screens: 7, link: "https://www.pvrinox.com/bengaluru" },
  { name: "INOX Garuda Mall", area: "MG Road", screens: 6, link: "https://www.pvrinox.com/bengaluru" },
  { name: "Innovative Multiplex", area: "Marathahalli", screens: 6, link: "https://www.innovativemultiplex.com/" },
];

const languageMap: Record<string, string> = {
  EN: 'English',
  HI: 'Hindi',
  KN: 'Kannada',
  TA: 'Tamil',
  TE: 'Telugu',
  ML: 'Malayalam',
};

export default function CinemaPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const movies: Movie[] = moviesData.movies || [];
  
  const filteredMovies = selectedLanguage === 'all'
    ? movies
    : movies.filter(m => m.language === selectedLanguage);
  
  const featuredMovie = movies[0];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero with Featured Movie */}
        {featuredMovie && (
          <section 
            className="relative h-[60vh] overflow-hidden cursor-pointer"
            onClick={() => setSelectedMovie(featuredMovie)}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: featuredMovie.backdrop || featuredMovie.poster
                  ? `url(${featuredMovie.backdrop || featuredMovie.poster})`
                  : 'linear-gradient(to br, #1e1b4b, #0a0a0f)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
              <div className="max-w-xl">
                <span className="text-xs px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full mb-4 inline-block">
                  🎬 Featured
                </span>
                <h1 className="text-4xl sm:text-5xl font-extralight text-white mb-4">
                  {featuredMovie.title}
                </h1>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                  {featuredMovie.overview}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  {featuredMovie.rating > 0 && (
                    <span className="text-amber-400">★ {featuredMovie.rating}</span>
                  )}
                  <span className="text-zinc-500">{featuredMovie.genres?.slice(0, 2).join(' • ')}</span>
                  <span className="text-zinc-500">{languageMap[featuredMovie.language] || featuredMovie.language}</span>
                </div>
                <button
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all"
                >
                  ▶ Watch Trailer
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Breadcrumb & Filter */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-b border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-blue-400 text-sm">Cinema</span>
            </div>
            
            {/* Language Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedLanguage === lang.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Now Showing */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extralight text-white">Now Showing</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
              <span className="text-zinc-500 text-sm">{filteredMovies.length} movies</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className="group rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 overflow-hidden transition-all card-hover cursor-pointer"
                >
                  {/* Poster */}
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
                    
                    {/* Rating badge */}
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
                      <span className="text-zinc-500">{languageMap[movie.language] || movie.language}</span>
                      <span className="text-zinc-600">{movie.genres?.[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Theaters */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extralight text-white mb-2">Popular Theaters</h2>
              <p className="text-zinc-500 text-sm">Book tickets at your favorite cinema</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {theaters.map((theater) => (
                <a
                  key={theater.name}
                  href={theater.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-xl bg-black border border-zinc-800 hover:border-blue-500/30 transition-all"
                >
                  <h3 className="text-base font-light text-white group-hover:text-blue-300 transition-colors mb-1">
                    {theater.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{theater.area}</p>
                  <span className="text-xs text-zinc-600">{theater.screens} screens</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-extralight text-white mb-6">
              Book Tickets Online
            </h2>
            <p className="text-zinc-400 mb-8 text-sm">
              Get the best seats at your favorite theaters
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://in.bookmyshow.com/explore/movies-bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-all hover:scale-105"
              >
                🎟️ BookMyShow
              </a>
              <a 
                href="https://www.pvrinox.com/bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-all hover:scale-105"
              >
                PVR INOX
              </a>
              <a 
                href="https://www.cinepolisindia.com/bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-zinc-700 hover:border-blue-500 text-zinc-300 hover:text-white rounded-lg transition-all"
              >
                Cinépolis
              </a>
              <a 
                href="https://www.innovativemultiplex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-zinc-700 hover:border-green-500 text-zinc-300 hover:text-white rounded-lg transition-all"
              >
                Innovative Multiplex
              </a>
            </div>
            
            <p className="mt-8 text-xs text-zinc-600">
              Last updated: {new Date(moviesData.lastUpdated).toLocaleDateString('en-IN', { 
                month: 'long', day: 'numeric', year: 'numeric'
              })}
            </p>
          </div>
        </section>
      </main>
      <Footer />

      {/* Movie Modal with Trailer */}
      <MovieModal 
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
