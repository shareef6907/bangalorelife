'use client';

import { useEffect } from 'react';
import { generateAffiliateLink, affiliateLinkProps, BOOKMYSHOW_URLS } from '@/lib/affiliate';

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

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const languageMap: Record<string, string> = {
  EN: 'English',
  HI: 'Hindi',
  KN: 'Kannada',
  TA: 'Tamil',
  TE: 'Telugu',
  ML: 'Malayalam',
};

export default function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  // Generate affiliate tracking link for this movie
  const getMovieAffiliateLink = () => {
    const sluggedTitle = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
    return generateAffiliateLink(BOOKMYSHOW_URLS.moviesNowShowing, `movie-modal-${sluggedTitle}`);
  };

  const youtubeId = movie.trailer ? getYouTubeId(movie.trailer) : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
        >
          ✕
        </button>

        {/* Trailer or Poster */}
        <div className="relative aspect-video bg-black">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={`${movie.title} Trailer`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : movie.backdrop || movie.poster ? (
            <div className="w-full h-full relative">
              <img 
                src={movie.backdrop || movie.poster} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-zinc-400 text-sm">Trailer not available</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900/20 to-zinc-900">
              <span className="text-6xl opacity-30">🎬</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex gap-6">
            {/* Poster thumbnail */}
            {movie.poster && (
              <div className="hidden sm:block w-32 flex-shrink-0">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full rounded-lg"
                />
              </div>
            )}
            
            <div className="flex-1">
              <h2 className="text-2xl font-light text-white mb-2">{movie.title}</h2>
              
              <div className="flex flex-wrap gap-3 mb-4">
                {movie.rating > 0 && (
                  <span className="text-amber-400 text-sm">★ {movie.rating.toFixed(1)}</span>
                )}
                <span className="text-zinc-500 text-sm">{languageMap[movie.language] || movie.language}</span>
                <span className="text-zinc-500 text-sm">{movie.releaseDate}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span key={genre} className="px-2 py-1 bg-violet-500/10 text-violet-300 rounded text-xs">
                    {genre}
                  </span>
                ))}
              </div>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {movie.overview}
              </p>
              
              {/* Booking button - Uses INRDeals affiliate tracking */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={getMovieAffiliateLink()}
                  {...affiliateLinkProps}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-400 text-white text-sm font-medium rounded-lg transition-all"
                >
                  🎟️ Book on BookMyShow
                </a>
              </div>
              
              <p className="text-xs text-zinc-600 mt-3">
                Affiliate link • We may earn commission
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
