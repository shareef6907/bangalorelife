'use client';

import { useState } from "react";
import { type EventDisplay } from "@/lib/events";
import { affiliateLinkProps } from "@/lib/affiliate";

interface EventsClientProps {
  initialEvents: EventDisplay[];
  categories: { category: string; count: number; emoji: string }[];
}

export default function EventsClient({ initialEvents, categories }: EventsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = initialEvents.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              All ({initialEvents.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat.emoji} {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-center text-gray-400 mb-8">
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </p>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <a
              key={event.id}
              href={event.affiliate_url}
              {...affiliateLinkProps}
              className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Event Image or Emoji */}
              <div className="relative h-48 bg-gradient-to-br from-purple-900/50 to-violet-900/50 flex items-center justify-center">
                {event.image_url ? (
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-6xl">{event.category_emoji}</span>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">
                  {event.category_emoji} {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>

                {/* Date Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs font-medium">
                  {event.date_display}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h3>
                
                {event.venue_name && (
                  <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
                    📍 {event.venue_name}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  {event.price && (
                    <span className="text-purple-400 font-medium">
                      {event.price}
                    </span>
                  )}
                  <span className="text-sm text-gray-400 group-hover:text-purple-400 transition-colors">
                    Get Tickets →
                  </span>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent" />
              </div>
            </a>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No events found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 bg-purple-600 rounded-full hover:bg-purple-500 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More CTA */}
        {filteredEvents.length >= 20 && (
          <div className="text-center mt-12">
            <a
              href="https://inr.deals/track?id=eve678604838&src=bangalorelife&campaign=cps&url=https%3A%2F%2Fin.bookmyshow.com%2Fexplore%2Fevents-bengaluru"
              {...affiliateLinkProps}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:border-purple-500/50 transition-all"
            >
              View All Events on BookMyShow →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
