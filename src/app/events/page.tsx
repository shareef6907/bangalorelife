'use client';

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventModal from "@/components/EventModal";

const categories = [
  { name: "All", id: "all" },
  { name: "Concerts", id: "concert" },
  { name: "Comedy", id: "comedy" },
  { name: "Festivals", id: "festival" },
  { name: "Theatre", id: "theatre" },
  { name: "Sports", id: "sports" },
];

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

const events: Event[] = [
  {
    id: 1,
    title: "Bangalore Comedy Festival 2026",
    date: "Feb 28 - Mar 2",
    venue: "Phoenix Marketcity",
    category: "comedy",
    price: "From ₹799",
    image: "😂",
    time: "7:00 PM onwards",
    description: "The biggest comedy festival in South India featuring top comedians from across the country. Multiple shows, open mics, and special performances.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/comedy-shows-bengaluru",
  },
  {
    id: 2,
    title: "Sunburn Arena ft. Martin Garrix",
    date: "March 15",
    venue: "Nice Grounds",
    category: "concert",
    price: "From ₹1,999",
    image: "🎵",
    time: "5:00 PM",
    description: "Experience the electrifying performance of Martin Garrix at Sunburn Arena. India's biggest EDM festival brings the world's #1 DJ to Bangalore.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/music-shows-bengaluru",
  },
  {
    id: 3,
    title: "Zakir Khan Live - Tathastu",
    date: "March 8",
    venue: "JG Auditorium",
    category: "comedy",
    price: "From ₹999",
    image: "😂",
    time: "8:00 PM",
    description: "Zakir Khan brings his new show 'Tathastu' to Bangalore. An evening of heartfelt comedy and storytelling from India's favorite comedian.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/comedy-shows-bengaluru",
  },
  {
    id: 4,
    title: "Nucleya Live",
    date: "March 22",
    venue: "Jayamahal Palace",
    category: "concert",
    price: "From ₹1,499",
    image: "🎵",
    time: "6:00 PM",
    description: "Bass heavy beats with India's pioneer of bass music. Nucleya brings his legendary live set to Bangalore for an unforgettable night.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/music-shows-bengaluru",
  },
  {
    id: 5,
    title: "Bangalore Literature Festival",
    date: "March 1-3",
    venue: "Lalit Ashok",
    category: "festival",
    price: "Free Entry",
    image: "📚",
    time: "10:00 AM - 8:00 PM",
    description: "Three days of literary discussions, book launches, author interactions, and cultural performances. One of India's premier literary events.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/events-bengaluru",
  },
  {
    id: 6,
    title: "IPL 2026 - RCB vs CSK",
    date: "April 5",
    venue: "M. Chinnaswamy Stadium",
    category: "sports",
    price: "From ₹2,500",
    image: "🏏",
    time: "7:30 PM",
    description: "The ultimate IPL clash! Royal Challengers Bangalore take on Chennai Super Kings at the iconic Chinnaswamy Stadium.",
    bookMyShowUrl: "https://in.bookmyshow.com/sports/cricket",
  },
  {
    id: 7,
    title: "Prateek Kuhad - Silhouettes Tour",
    date: "March 29",
    venue: "Phoenix Arena",
    category: "concert",
    price: "From ₹1,299",
    image: "🎸",
    time: "7:30 PM",
    description: "India's indie darling Prateek Kuhad brings his soulful melodies to Bangalore with his new tour. An intimate evening of music.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/music-shows-bengaluru",
  },
  {
    id: 8,
    title: "Biswa Kalyan Rath Standup",
    date: "March 16",
    venue: "Good Shepherd Auditorium",
    category: "comedy",
    price: "From ₹699",
    image: "😂",
    time: "8:00 PM",
    description: "Biswa's trademark observational humor and sharp wit come alive in this all-new standup special.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/comedy-shows-bengaluru",
  },
  {
    id: 9,
    title: "When Chai Met Toast Live",
    date: "April 12",
    venue: "Jayamahal Palace",
    category: "concert",
    price: "From ₹999",
    image: "🎵",
    time: "6:00 PM",
    description: "Feel-good indie folk music from Kerala's beloved band. Sing along to your favorite songs under the open sky.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/music-shows-bengaluru",
  },
  {
    id: 10,
    title: "IPL 2026 - RCB vs MI",
    date: "April 15",
    venue: "M. Chinnaswamy Stadium",
    category: "sports",
    price: "From ₹2,000",
    image: "🏏",
    time: "7:30 PM",
    description: "Another blockbuster IPL match as RCB hosts Mumbai Indians. The stadium will be electric!",
    bookMyShowUrl: "https://in.bookmyshow.com/sports/cricket",
  },
  {
    id: 11,
    title: "Bangalore Theatre Festival",
    date: "April 20-27",
    venue: "Ranga Shankara",
    category: "theatre",
    price: "From ₹300",
    image: "🎭",
    time: "Various",
    description: "Week-long celebration of theatre featuring plays in Kannada, English, and Hindi from renowned troupes.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/plays-bengaluru",
  },
  {
    id: 12,
    title: "Arijit Singh Live",
    date: "April 28",
    venue: "Nice Grounds",
    category: "concert",
    price: "From ₹2,499",
    image: "🎤",
    time: "6:00 PM",
    description: "Bollywood's most loved voice performs his greatest hits live. An evening of romance, nostalgia, and musical magic.",
    bookMyShowUrl: "https://in.bookmyshow.com/explore/music-shows-bengaluru",
  },
];

const upcomingArtists = [
  "Arijit Singh (April)",
  "Prateek Kuhad (March)",
  "The Local Train (March)",
  "Anuv Jain (April)",
  "When Chai Met Toast (April)",
  "Ritviz (May)",
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-fuchsia-900/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-pink-400 text-sm">Events</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white mb-6">
              Events in <span className="text-gradient">Bangalore</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              Concerts, comedy shows, festivals, and more. Discover what&apos;s 
              happening in Bangalore and never miss out.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl font-extralight text-white">
                {selectedCategory === 'all' ? 'All Events' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent" />
              <span className="text-zinc-500 text-sm">{filteredEvents.length} events</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-pink-500/30 overflow-hidden transition-all card-hover cursor-pointer"
                >
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-pink-900/20 to-zinc-900 flex items-center justify-center">
                    <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform">{event.image}</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 bg-pink-500/10 text-pink-300 rounded capitalize">
                        {event.category}
                      </span>
                      <span className="text-xs text-zinc-500">{event.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-light text-white group-hover:text-pink-300 transition-colors mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-4">{event.venue}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-pink-400">{event.price}</span>
                      <span className="text-violet-400 text-sm group-hover:text-violet-300">
                        Get Tickets →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-extralight text-white mb-4">Coming Soon to Bangalore</h2>
              <p className="text-zinc-500">Artists and events expected in the coming months</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {upcomingArtists.map((artist) => (
                <span
                  key={artist}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-full text-sm"
                >
                  {artist}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Ticketing Platforms */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extralight text-white mb-6">
              Book Event Tickets
            </h2>
            <p className="text-zinc-400 mb-8">
              Get tickets from official platforms
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://in.bookmyshow.com/explore/events-bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-all hover:scale-105"
              >
                🎟️ BookMyShow
              </a>
              <a 
                href="https://insider.in/bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium rounded-lg transition-all hover:scale-105"
              >
                Paytm Insider
              </a>
              <a 
                href="https://district.in/bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-zinc-700 hover:border-pink-500 text-zinc-300 hover:text-white rounded-lg transition-all"
              >
                District
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Event Modal */}
      <EventModal 
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
