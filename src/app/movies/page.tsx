import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Movies in Bangalore | What\'s Playing Now | BangaloreLife',
  description: 'Discover movies playing in Bangalore cinemas. Find showtimes, book tickets, and explore the latest releases in theatres near you.',
  openGraph: {
    title: 'Movies in Bangalore | What\'s Playing Now',
    description: 'Discover movies playing in Bangalore cinemas. Find showtimes and book tickets.',
  },
};

const MOVIE_GENRES = [
  { name: 'Now Showing', slug: 'movies-bengaluru', icon: '🎬', description: 'Currently in theatres' },
  { name: 'Coming Soon', slug: 'movies-bengaluru/upcoming', icon: '📅', description: 'Upcoming releases' },
  { name: 'Hollywood', slug: 'movies-bengaluru?language=English', icon: '🎥', description: 'English movies' },
  { name: 'Bollywood', slug: 'movies-bengaluru?language=Hindi', icon: '🇮🇳', description: 'Hindi movies' },
  { name: 'Kannada', slug: 'movies-bengaluru?language=Kannada', icon: '🎭', description: 'Sandalwood films' },
  { name: 'Tamil', slug: 'movies-bengaluru?language=Tamil', icon: '🌟', description: 'Kollywood films' },
];

const POPULAR_CINEMAS = [
  { name: 'PVR', area: 'Multiple Locations', url: 'https://www.pvrcinemas.com/cinemas/bengaluru' },
  { name: 'INOX', area: 'Multiple Locations', url: 'https://www.inoxmovies.com/Cinemas/City/Bengaluru' },
  { name: 'Cinepolis', area: 'Multiple Locations', url: 'https://www.cinepolisindia.com/bengaluru' },
];

export default function MoviesPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-zinc-950 to-zinc-950" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Movies in Bangalore
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Discover what's playing in Bangalore cinemas. From the latest blockbusters 
            to regional favourites, find your next movie experience.
          </p>
          <a 
            href="https://in.bookmyshow.com/explore/movies-bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors"
          >
            <span>See What's Playing</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Browse Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {MOVIE_GENRES.map((genre) => (
              <a
                key={genre.slug}
                href={`https://in.bookmyshow.com/explore/${genre.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800 hover:border-violet-500/50 rounded-2xl transition-all"
              >
                <div className="text-4xl mb-3">{genre.icon}</div>
                <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                  {genre.name}
                </h3>
                <p className="text-sm text-zinc-500 mt-1">{genre.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cinemas */}
      <section className="py-16 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Popular Cinema Chains</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {POPULAR_CINEMAS.map((cinema) => (
              <a
                key={cinema.name}
                href={cinema.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800 hover:border-violet-500/50 rounded-2xl transition-all"
              >
                <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                    {cinema.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{cinema.area}</p>
                </div>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-violet-400 ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready for Movie Night?
          </h2>
          <p className="text-zinc-400 mb-8">
            Check showtimes and book tickets on BookMyShow — Bangalore's most popular ticketing platform.
          </p>
          <a 
            href="https://in.bookmyshow.com/explore/movies-bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl transition-all"
          >
            <span>Browse All Movies on BookMyShow</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
