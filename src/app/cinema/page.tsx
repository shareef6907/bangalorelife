import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Movies in Bangalore - Now Showing & Upcoming Films",
  description: "Movies showing in Bangalore cinemas. Book tickets for the latest releases at PVR, INOX, Cinepolis and more. Showtimes, reviews, and trailers.",
  openGraph: {
    title: "Now Showing in Bangalore Cinemas | BangaloreLife",
    description: "Latest movies, showtimes, and ticket booking for Bangalore theaters.",
  },
};

// Sample movies - will be replaced with TMDB data
const nowShowing = [
  { id: 1, title: "Mission: Impossible 8", genre: "Action", rating: "8.2", language: "English", poster: "🎬" },
  { id: 2, title: "Kantara 2", genre: "Action/Thriller", rating: "8.9", language: "Kannada", poster: "🎬" },
  { id: 3, title: "Fighter 2", genre: "Action", rating: "7.5", language: "Hindi", poster: "🎬" },
  { id: 4, title: "Mufasa", genre: "Animation", rating: "8.0", language: "English", poster: "🎬" },
  { id: 5, title: "KGF Chapter 3", genre: "Action", rating: "9.1", language: "Kannada", poster: "🎬" },
  { id: 6, title: "Avatar 3", genre: "Sci-Fi", rating: "8.4", language: "English", poster: "🎬" },
];

const theaters = [
  { name: "PVR Forum Mall", area: "Koramangala", screens: 11 },
  { name: "INOX Mantri Square", area: "Malleswaram", screens: 8 },
  { name: "Cinepolis Orion", area: "Rajajinagar", screens: 10 },
  { name: "PVR Vega City", area: "Bannerghatta Road", screens: 7 },
  { name: "INOX Garuda Mall", area: "MG Road", screens: 6 },
  { name: "Cinepolis Royal Meenakshi", area: "Bannerghatta Road", screens: 8 },
];

const languages = [
  { name: "All", active: true },
  { name: "Kannada", active: false },
  { name: "English", active: false },
  { name: "Hindi", active: false },
  { name: "Telugu", active: false },
  { name: "Tamil", active: false },
];

export default function CinemaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-indigo-900/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-blue-400 text-sm">Cinema</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Movies in <span className="text-gradient">Bangalore</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              Now showing in Bangalore cinemas. Find showtimes, book tickets, 
              and discover the latest releases.
            </p>
          </div>
        </section>

        {/* Language Filter */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-zinc-500 text-sm mr-2">Language:</span>
              {languages.map((lang) => (
                <button
                  key={lang.name}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    lang.active
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl font-extralight text-white">Now Showing</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {nowShowing.map((movie) => (
                <div
                  key={movie.id}
                  className="group rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 overflow-hidden transition-all card-hover cursor-pointer"
                >
                  {/* Poster placeholder */}
                  <div className="aspect-[2/3] bg-gradient-to-br from-blue-900/20 to-zinc-900 flex items-center justify-center">
                    <span className="text-6xl opacity-30">{movie.poster}</span>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-light text-white group-hover:text-blue-300 transition-colors line-clamp-2 mb-2">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">{movie.language}</span>
                      <span className="flex items-center gap-1 text-amber-400">
                        ★ {movie.rating}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-600">{movie.genre}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Theaters */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-extralight text-white mb-4">Popular Theaters</h2>
              <p className="text-zinc-500">Book tickets at your favorite cinema</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {theaters.map((theater) => (
                <a
                  key={theater.name}
                  href="https://in.bookmyshow.com/explore/cinemas-bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-xl bg-black border border-zinc-800 hover:border-blue-500/30 transition-all"
                >
                  <h3 className="text-lg font-light text-white group-hover:text-blue-300 transition-colors mb-1">
                    {theater.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-2">{theater.area}</p>
                  <span className="text-xs text-zinc-600">{theater.screens} screens</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extralight text-white mb-6">
              Book Tickets Online
            </h2>
            <p className="text-zinc-400 mb-8">
              Skip the queue. Book your movie tickets online through these platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://in.bookmyshow.com/explore/movies-bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-all hover:scale-105"
              >
                BookMyShow
              </a>
              <a 
                href="https://www.pvrcinemas.com/city/bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-all hover:scale-105"
              >
                PVR Cinemas
              </a>
              <a 
                href="https://www.inoxmovies.com/Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-zinc-700 hover:border-blue-500 text-zinc-300 hover:text-white rounded-lg transition-all"
              >
                INOX
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
