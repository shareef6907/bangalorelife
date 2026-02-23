import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events in Bangalore | Concerts, Comedy, Workshops | BangaloreLife',
  description: 'Discover events happening in Bangalore. From comedy shows and concerts to workshops and theatre, find your next experience.',
  openGraph: {
    title: 'Events in Bangalore | Concerts, Comedy, Workshops',
    description: 'Discover events happening in Bangalore. Find concerts, comedy, workshops, and more.',
  },
};

const EVENT_CATEGORIES = [
  { 
    name: 'All Events', 
    slug: 'events-bengaluru', 
    icon: '🎉', 
    description: 'Everything happening in the city',
    color: 'from-violet-600 to-fuchsia-600'
  },
  { 
    name: 'Comedy Shows', 
    slug: 'events-bengaluru/comedy-shows', 
    icon: '😂', 
    description: 'Stand-up, improv & open mics',
    color: 'from-yellow-600 to-orange-600'
  },
  { 
    name: 'Music & Concerts', 
    slug: 'events-bengaluru/music-shows', 
    icon: '🎵', 
    description: 'Live performances & gigs',
    color: 'from-pink-600 to-rose-600'
  },
  { 
    name: 'Workshops', 
    slug: 'events-bengaluru/workshops', 
    icon: '🎨', 
    description: 'Learn something new',
    color: 'from-emerald-600 to-teal-600'
  },
  { 
    name: 'Theatre & Plays', 
    slug: 'events-bengaluru/plays', 
    icon: '🎭', 
    description: 'Drama, musicals & more',
    color: 'from-blue-600 to-indigo-600'
  },
  { 
    name: 'Sports', 
    slug: 'events-bengaluru/sports', 
    icon: '⚽', 
    description: 'Matches & tournaments',
    color: 'from-green-600 to-lime-600'
  },
  { 
    name: 'Exhibitions', 
    slug: 'events-bengaluru/art-and-exhibitions', 
    icon: '🖼️', 
    description: 'Art shows & galleries',
    color: 'from-purple-600 to-violet-600'
  },
  { 
    name: 'Meetups', 
    slug: 'events-bengaluru/meetups-and-more', 
    icon: '👥', 
    description: 'Networking & social events',
    color: 'from-cyan-600 to-blue-600'
  },
];

const POPULAR_VENUES = [
  { name: 'The Comedy Store', type: 'Comedy Club', url: 'https://in.bookmyshow.com/explore/comedy-shows-bengaluru' },
  { name: 'Phoenix Marketcity', type: 'Events Venue', url: 'https://in.bookmyshow.com/explore/events-bengaluru' },
  { name: 'Ranga Shankara', type: 'Theatre', url: 'https://in.bookmyshow.com/explore/plays-bengaluru' },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 via-zinc-950 to-zinc-950" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Events in Bangalore
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            From comedy nights and live concerts to workshops and theatre — 
            discover what's happening in Bangalore this week.
          </p>
          <a 
            href="https://in.bookmyshow.com/explore/events-bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl transition-all"
          >
            <span>Discover Events</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EVENT_CATEGORIES.map((category) => (
              <a
                key={category.slug}
                href={`https://in.bookmyshow.com/explore/${category.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800 hover:border-violet-500/50 rounded-2xl transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">{category.description}</p>
                </div>
                <svg className="absolute top-4 right-4 w-4 h-4 text-zinc-700 group-hover:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* This Week's Highlights */}
      <section className="py-16 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Popular This Week</h2>
            <a 
              href="https://in.bookmyshow.com/explore/events-bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          
          {/* Featured cards linking to BMS categories */}
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://in.bookmyshow.com/explore/comedy-shows-bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border border-zinc-800 hover:border-yellow-500/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-yellow-400 text-sm font-medium">Comedy</span>
                <h3 className="text-xl font-bold text-white mt-1">Stand-up Shows</h3>
                <p className="text-zinc-400 text-sm mt-2">Laugh out loud this weekend</p>
              </div>
            </a>
            
            <a
              href="https://in.bookmyshow.com/explore/music-shows-bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-900/50 to-rose-900/50 border border-zinc-800 hover:border-pink-500/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-pink-400 text-sm font-medium">Music</span>
                <h3 className="text-xl font-bold text-white mt-1">Live Concerts</h3>
                <p className="text-zinc-400 text-sm mt-2">Catch your favourite artists live</p>
              </div>
            </a>
            
            <a
              href="https://in.bookmyshow.com/explore/workshops-bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-zinc-800 hover:border-emerald-500/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-emerald-400 text-sm font-medium">Learn</span>
                <h3 className="text-xl font-bold text-white mt-1">Workshops</h3>
                <p className="text-zinc-400 text-sm mt-2">Art, cooking, dance & more</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Never Miss an Event
          </h2>
          <p className="text-zinc-400 mb-8">
            BookMyShow has the most comprehensive event listings for Bangalore. 
            Discover and book tickets for events happening near you.
          </p>
          <a 
            href="https://in.bookmyshow.com/explore/events-bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl transition-all"
          >
            <span>Explore Events on BookMyShow</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
