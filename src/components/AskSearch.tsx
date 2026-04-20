'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Ask BangaloreLife - AI-Powered Natural Language Search
 * Premium glassmorphism UI with conversational results
 * 
 * Configurable for multi-city deployment (NightsOut GCC sites)
 */

interface Venue {
  id: string;
  name: string;
  slug: string;
  type: string;
  neighborhood: string;
  address: string | null;
  google_rating: number | null;
  cuisine_types: string[];
  features: string[];
  directionsUrl?: string;
}

interface Hotel {
  id: string;
  name: string;
  slug: string;
  hotel_type: string;
  neighborhood: string | null;
  star_rating: number | null;
  google_rating: number | null;
  price_min_per_night: number | null;
  amenities: string[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  venues?: Venue[];
  hotels?: Hotel[];
  suggestedFollowUps?: string[];
  timestamp: Date;
}

interface AskSearchProps {
  brandName?: string;
  venueCount?: string;
  accentColor?: string;
  placeholder?: string;
  basePath?: string;
}

const DEFAULT_SUGGESTIONS = [
  "Best rooftop bars for a date night",
  "Where can I get great biryani?",
  "Cafes with wifi for working",
  "Late night food spots",
  "Breweries with outdoor seating",
  "Plan my Saturday evening",
];

export default function AskSearch({
  brandName = 'BangaloreLife',
  venueCount = '12,000+',
  accentColor = 'violet',
  placeholder,
  basePath = '',
}: AskSearchProps) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [sessionId] = useState(() => `ask-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotate placeholder suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionIndex(i => (i + 1) % DEFAULT_SUGGESTIONS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
    setMessages([]);
    setQuery('');
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!query.trim() || isLoading) return;

    const userQuery = query.trim();
    setQuery('');
    setIsExpanded(true);
    
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userQuery,
      timestamp: new Date(),
    }]);

    setIsLoading(true);

    try {
      const response = await fetch(`${basePath}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery, sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message,
        venues: data.venues,
        hotels: data.hotels,
        suggestedFollowUps: data.suggestedFollowUps,
        timestamp: new Date(),
      }]);

    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I had trouble with that. ${error.message || 'Please try again.'}`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  const handleFollowUpClick = (followUp: string) => {
    setQuery(followUp);
    setTimeout(() => handleSubmit(), 50);
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* Main Search Container */}
      <div 
        ref={containerRef}
        className={`w-full max-w-2xl mx-auto transition-all duration-500 ${
          isExpanded 
            ? 'fixed inset-0 z-50 max-w-none flex flex-col bg-zinc-950/98 backdrop-blur-xl p-4 md:p-6' 
            : ''
        }`}
      >
        {/* Expanded Header */}
        {isExpanded && (
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl bg-${accentColor}-500/20 flex items-center justify-center`}>
                <span className="text-sm">✨</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Ask {brandName}</h2>
                <p className="text-xs text-zinc-500">{venueCount} venues • Powered by AI</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Messages Area */}
        {isExpanded && hasMessages && (
          <div 
            ref={messagesRef}
            className="flex-1 overflow-y-auto mb-4 space-y-4 px-2"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] md:max-w-[80%] ${
                  msg.role === 'user' 
                    ? `bg-${accentColor}-600 text-white rounded-2xl rounded-br-sm px-4 py-3` 
                    : 'text-zinc-100'
                }`}>
                  {msg.role === 'assistant' ? (
                    <div className="space-y-4">
                      {/* AI Response Text */}
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      
                      {/* Venue Cards */}
                      {msg.venues && msg.venues.length > 0 && (
                        <div className="space-y-2 mt-4">
                          {msg.venues.map(venue => (
                            <VenueCard key={venue.id} venue={venue} basePath={basePath} />
                          ))}
                        </div>
                      )}

                      {/* Hotel Cards */}
                      {msg.hotels && msg.hotels.length > 0 && (
                        <div className="space-y-2 mt-4">
                          {msg.hotels.map(hotel => (
                            <HotelCard key={hotel.id} hotel={hotel} basePath={basePath} />
                          ))}
                        </div>
                      )}

                      {/* Follow-up Suggestions */}
                      {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-zinc-800">
                          {msg.suggestedFollowUps.map((followUp, j) => (
                            <button
                              key={j}
                              onClick={() => handleFollowUpClick(followUp)}
                              className="px-3 py-1.5 text-xs bg-zinc-800/60 hover:bg-zinc-700 text-zinc-300 rounded-full border border-zinc-700/50 transition-colors"
                            >
                              {followUp}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex gap-1">
                    <span className={`w-2 h-2 bg-${accentColor}-500 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
                    <span className={`w-2 h-2 bg-${accentColor}-500 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                    <span className={`w-2 h-2 bg-${accentColor}-500 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-zinc-400">Searching {venueCount} venues...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Input */}
        <form onSubmit={handleSubmit} className={isExpanded ? 'mt-auto' : ''}>
          <div className="relative group">
            {/* Glassmorphism Background */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-${accentColor}-500/20 via-cyan-500/20 to-${accentColor}-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-${accentColor}-400`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={placeholder || DEFAULT_SUGGESTIONS[suggestionIndex]}
                disabled={isLoading}
                className={`w-full pl-12 pr-14 py-4 text-base md:text-lg bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-${accentColor}-500/50 focus:ring-2 focus:ring-${accentColor}-500/20 transition-all disabled:opacity-50`}
              />
              
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-${accentColor}-600 hover:bg-${accentColor}-500 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-xl transition-all hover:scale-105 active:scale-95`}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {/* Initial Suggestions */}
        {!isExpanded && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {DEFAULT_SUGGESTIONS.slice(0, 4).map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 text-sm bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700/50 transition-all hover:scale-105 hover:border-zinc-600"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            
            {/* Badge */}
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 rounded-full text-xs text-zinc-500 border border-zinc-800/50">
                <span className="relative flex h-1.5 w-1.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${accentColor}-400 opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 bg-${accentColor}-500`} />
                </span>
                Powered by AI • {venueCount} Venues
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Venue Card Component
 */
function VenueCard({ venue, basePath }: { venue: Venue; basePath: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/60 border border-zinc-700/30 transition-colors group">
      <div className="flex-1 min-w-0">
        <a 
          href={`${basePath}/venues/${venue.slug}`}
          className="font-medium text-white hover:text-violet-400 transition-colors"
        >
          {venue.name}
        </a>
        <p className="text-sm text-zinc-400 mt-0.5">
          {venue.type} • {venue.neighborhood?.replace(/-/g, ' ')}
        </p>
        {venue.cuisine_types?.length > 0 && (
          <p className="text-xs text-zinc-500 mt-1">
            {venue.cuisine_types.slice(0, 3).join(', ')}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {venue.google_rating && (
          <div className="flex items-center gap-1 px-2 py-1 bg-zinc-900/50 rounded-lg">
            <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="text-xs font-medium text-zinc-300">{venue.google_rating}</span>
          </div>
        )}
        
        {venue.directionsUrl && (
          <a
            href={venue.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-zinc-900/50 hover:bg-blue-600 rounded-lg transition-colors group-hover:scale-105"
            title="Get Directions"
          >
            <svg className="w-4 h-4 text-zinc-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Hotel Card Component
 */
function HotelCard({ hotel, basePath }: { hotel: Hotel; basePath: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/60 border border-zinc-700/30 transition-colors">
      <div className="flex-1 min-w-0">
        <a 
          href={`${basePath}/hotels/${hotel.slug}`}
          className="font-medium text-white hover:text-violet-400 transition-colors"
        >
          {hotel.name}
        </a>
        <p className="text-sm text-zinc-400 mt-0.5">
          {hotel.hotel_type}
          {hotel.star_rating && ` • ${hotel.star_rating}★`}
          {hotel.neighborhood && ` • ${hotel.neighborhood.replace(/-/g, ' ')}`}
        </p>
        {hotel.price_min_per_night && (
          <p className="text-xs text-violet-400 mt-1">
            From ₹{hotel.price_min_per_night.toLocaleString()}/night
          </p>
        )}
      </div>
      
      {hotel.google_rating && (
        <div className="flex items-center gap-1 px-2 py-1 bg-zinc-900/50 rounded-lg">
          <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
          <span className="text-xs font-medium text-zinc-300">{hotel.google_rating}</span>
        </div>
      )}
    </div>
  );
}
