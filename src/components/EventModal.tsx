'use client';

import { useEffect } from 'react';

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

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
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

  if (!isOpen || !event) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-lg bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="h-48 bg-gradient-to-br from-pink-900/40 to-violet-900/40 flex items-center justify-center relative">
          <span className="text-8xl opacity-50">{event.image}</span>
          <span className="absolute top-4 left-4 text-xs px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full">
            {event.category}
          </span>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-light text-white mb-2">{event.title}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-4">
            <span className="flex items-center gap-1">
              📅 {event.date}{event.time && ` • ${event.time}`}
            </span>
            <span className="flex items-center gap-1">
              📍 {event.venue}
            </span>
          </div>
          
          {event.description && (
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              {event.description}
            </p>
          )}
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg text-pink-400 font-medium">{event.price}</span>
          </div>
          
          {/* Booking buttons */}
          <div className="flex flex-col gap-3">
            {event.bookMyShowUrl && (
              <a
                href={event.bookMyShowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-all hover:scale-[1.02]"
              >
                <span>🎟️</span>
                Book on BookMyShow
              </a>
            )}
            {event.platinumlistUrl && (
              <a
                href={event.platinumlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-500 hover:bg-violet-400 text-white font-medium rounded-lg transition-all hover:scale-[1.02]"
              >
                <span>🎫</span>
                Book on Platinumlist
              </a>
            )}
            {!event.bookMyShowUrl && !event.platinumlistUrl && (
              <a
                href="https://in.bookmyshow.com/explore/events-bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-all hover:scale-[1.02]"
              >
                <span>🎟️</span>
                Find Tickets on BookMyShow
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
