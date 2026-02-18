/**
 * Fetch now showing movies in Bangalore from TMDB
 */

const TMDB_API_KEY = process.env.TMDB_API_KEY || 'ef2a3d2c077dfe6463ca37fc819c475a';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  popularity: number;
}

interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface OutputMovie {
  id: string;
  title: string;
  originalTitle: string;
  overview: string;
  poster: string;
  backdrop: string;
  releaseDate: string;
  rating: number;
  genres: string[];
  language: string;
  trailer?: string;
}

const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

async function fetchNowPlaying(): Promise<TMDBMovie[]> {
  const url = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&region=IN&language=en-IN&page=1`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  
  const data: TMDBResponse = await response.json();
  return data.results;
}

async function fetchUpcoming(): Promise<TMDBMovie[]> {
  const url = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&region=IN&language=en-IN&page=1`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  
  const data: TMDBResponse = await response.json();
  return data.results;
}

async function fetchTrailer(movieId: number): Promise<string | undefined> {
  const url = `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) return undefined;
    
    const data = await response.json();
    const videos: MovieVideo[] = data.results || [];
    
    // Find YouTube trailer
    const trailer = videos.find(
      v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
    );
    
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : undefined;
  } catch {
    return undefined;
  }
}

function transformMovie(movie: TMDBMovie, trailer?: string): OutputMovie {
  return {
    id: `tmdb-${movie.id}`,
    title: movie.title,
    originalTitle: movie.original_title,
    overview: movie.overview,
    poster: movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '',
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : '',
    releaseDate: movie.release_date,
    rating: Math.round(movie.vote_average * 10) / 10,
    genres: movie.genre_ids.map(id => GENRE_MAP[id] || 'Other').filter(Boolean),
    language: movie.original_language.toUpperCase(),
    trailer,
  };
}

async function main() {
  console.log('🎬 TMDB Movie Fetcher for Bangalore');
  console.log('═'.repeat(50));
  console.log(`📅 ${new Date().toISOString()}\n`);

  try {
    // Fetch movies
    console.log('📽️ Fetching now playing...');
    const nowPlaying = await fetchNowPlaying();
    console.log(`   Found ${nowPlaying.length} now playing\n`);

    console.log('🎞️ Fetching upcoming...');
    const upcoming = await fetchUpcoming();
    console.log(`   Found ${upcoming.length} upcoming\n`);

    // Combine and dedupe
    const allMovies = [...nowPlaying, ...upcoming];
    const uniqueMovies = allMovies.filter(
      (movie, index, self) => index === self.findIndex(m => m.id === movie.id)
    );

    // Sort by popularity
    uniqueMovies.sort((a, b) => b.popularity - a.popularity);

    // Take top 30
    const topMovies = uniqueMovies.slice(0, 30);

    console.log('🎥 Fetching trailers...');
    const moviesWithTrailers: OutputMovie[] = [];
    
    for (const movie of topMovies) {
      const trailer = await fetchTrailer(movie.id);
      moviesWithTrailers.push(transformMovie(movie, trailer));
      process.stdout.write('.');
    }
    console.log('\n');

    // Save
    const output = {
      lastUpdated: new Date().toISOString(),
      totalMovies: moviesWithTrailers.length,
      movies: moviesWithTrailers,
    };

    const fs = await import('fs');
    const path = await import('path');
    
    const outputDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'movies.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log('═'.repeat(50));
    console.log(`✅ Saved ${moviesWithTrailers.length} movies`);
    console.log(`📁 Output: ${outputPath}`);
    
    console.log('\n📋 Sample movies:');
    moviesWithTrailers.slice(0, 5).forEach(m => {
      console.log(`   • ${m.title} (${m.language}) - ★ ${m.rating}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
