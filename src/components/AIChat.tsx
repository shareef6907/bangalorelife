'use client';

import { useState, useRef, useEffect } from 'react';

interface Venue {
  id: string;
  name: string;
  slug: string;
  type: string;
  neighborhood: string;
  address: string | null;
  phone: string | null;
  google_rating: number | null;
  cuisine_types: string[];
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
  timestamp: Date;
}

const PLACEHOLDER_QUERIES = [
  "Best biryani in Koramangala",
  "Rooftop bars for a date night",
  "Plan my Saturday in Indiranagar",
  "Where can I find good craft beer?",
  "Cafes with good wifi for work",
  "Late night food near MG Road",
];

export default function AIChat() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Rotate placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(i => (i + 1) % PLACEHOLDER_QUERIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll messages container to bottom (not the page)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    setQuery('');
    inputRef.current?.focus({ preventScroll: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!query.trim() || isLoading) return;

    const userQuery = query.trim();
    setQuery('');
    
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userQuery,
      timestamp: new Date()
    }]);

    setIsLoading(true);

    // Keep focus on input without scrolling the page
    inputRef.current?.focus({ preventScroll: true });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery, sessionId })
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
        timestamp: new Date()
      }]);

    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I had trouble with that. ${error.message || 'Please try again.'}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      // Refocus input after response without scrolling
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus({ preventScroll: true });
  };

  const hasMessages = messages.length > 0;

  return (
    <div 
      ref={chatContainerRef} 
      className={`w-full max-w-3xl mx-auto transition-all duration-300 ${
        hasMessages 
          ? 'md:relative fixed inset-0 md:inset-auto z-50 md:z-auto bg-zinc-950 md:bg-transparent p-4 md:p-0 flex flex-col' 
          : ''
      }`}
    >
      {/* Chat Messages */}
      {hasMessages && (
        <div className="mb-4 flex-1 flex flex-col min-h-0">
          {/* Header with Clear button */}
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs text-zinc-500">
              {messages.filter(m => m.role === 'user').length} message{messages.filter(m => m.role === 'user').length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Clear chat
            </button>
          </div>
          
          {/* Messages container with internal scroll - full height on mobile */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 md:max-h-[50vh] md:flex-none overflow-y-auto rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-4 space-y-4 overscroll-contain"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' 
                  ? 'bg-violet-600 text-white rounded-2xl rounded-br-md px-4 py-3' 
                  : 'text-zinc-100'}`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="space-y-4">
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      
                      {/* Venue Cards */}
                      {msg.venues && msg.venues.length > 0 && (
                        <div className="grid gap-3 mt-4">
                          {msg.venues.slice(0, 5).map(venue => (
                            <a 
                              key={venue.id}
                              href={`/venues/${venue.slug}`}
                              className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50"
                            >
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-white truncate">{venue.name}</h4>
                                <p className="text-sm text-zinc-400">
                                  {venue.type} · {venue.neighborhood.replace(/-/g, ' ')}
                                </p>
                                {venue.cuisine_types?.length > 0 && (
                                  <p className="text-xs text-zinc-500 truncate mt-1">
                                    {venue.cuisine_types.slice(0, 3).join(', ')}
                                  </p>
                                )}
                              </div>
                              {venue.google_rating && (
                                <div className="flex items-center gap-1 text-amber-400">
                                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                  </svg>
                                  <span className="text-sm font-medium">{venue.google_rating}</span>
                                </div>
                              )}
                              <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Hotel Cards */}
                      {msg.hotels && msg.hotels.length > 0 && (
                        <div className="grid gap-3 mt-4">
                          {msg.hotels.slice(0, 5).map(hotel => (
                            <a 
                              key={hotel.id}
                              href={`/hotels/${hotel.slug}`}
                              className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50"
                            >
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-white truncate">{hotel.name}</h4>
                                <p className="text-sm text-zinc-400">
                                  {hotel.hotel_type}{hotel.star_rating ? ` · ${hotel.star_rating}★` : ''}
                                  {hotel.neighborhood ? ` · ${hotel.neighborhood.replace(/-/g, ' ')}` : ''}
                                </p>
                                {hotel.price_min_per_night && (
                                  <p className="text-xs text-violet-400 mt-1">
                                    From ₹{hotel.price_min_per_night.toLocaleString()}/night
                                  </p>
                                )}
                                {hotel.amenities?.length > 0 && (
                                  <p className="text-xs text-zinc-500 truncate mt-1">
                                    {hotel.amenities.slice(0, 3).join(', ')}
                                  </p>
                                )}
                              </div>
                              {hotel.google_rating && (
                                <div className="flex items-center gap-1 text-amber-400">
                                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                  </svg>
                                  <span className="text-sm font-medium">{hotel.google_rating}</span>
                                </div>
                              )}
                              <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                              </svg>
                            </a>
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
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={PLACEHOLDER_QUERIES[placeholderIndex]}
            disabled={isLoading}
            className="w-full px-6 py-4 pr-14 text-lg bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </form>

      {/* Quick Suggestions */}
      {messages.length === 0 && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {PLACEHOLDER_QUERIES.slice(0, 4).map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 text-sm bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700/50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
