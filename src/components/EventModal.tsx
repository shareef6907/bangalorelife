'use client';

import { useEffect } from 'react';
import { type EventDisplay } from '@/lib/events';
import { affiliateLinkProps } from '@/lib/affiliate';

interface EventModalProps {
  event: EventDisplay | null;
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
        <div className="relative h-56 bg-gradient-to-br from-purple-900/50 to-violet-900/50 flex items-center justify-center">
          {event.image_url ? (
            <img 
              src={event.image_url} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-8xl opacity-50">{event.category_emoji}</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />
          <span className="absolute top-4 left-4 text-xs px-3 py-1 bg-purple-500/80 text-white rounded-full backdrop-blur-sm">
            {event.category_emoji} {event.category}
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
              📅 {event.date_display}
            </span>
            {event.venue_name && (
              <span className="flex items-center gap-1">
                📍 {event.venue_name}
              </span>
            )}
          </div>
          
          {event.description && (
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-4">
              {event.description}
            </p>
          )}
          
          <div className="flex items-center justify-between mb-6">
            {event.price ? (
              <span className="text-lg text-purple-400 font-medium">{event.price}</span>
            ) : (
              <span className="text-zinc-500 text-sm">Check BookMyShow for pricing</span>
            )}
          </div>
          
          {/* Booking button - ALWAYS uses affiliate tracking */}
          <div className="flex flex-col gap-3">
            <a
              href={event.affiliate_url}
              {...affiliateLinkProps}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium rounded-lg transition-all hover:scale-[1.02] shadow-lg shadow-red-500/20"
            >
              <span>🎟️</span>
              Book Tickets on BookMyShow
            </a>
          </div>
          
          <p className="text-xs text-zinc-600 text-center mt-3">
            Affiliate link • We may earn commission
          </p>
        </div>
      </div>
    </div>
  );
}
