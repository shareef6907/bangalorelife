import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Events in Bangalore - Concerts, Comedy, Shows & More",
  description: "Discover events happening in Bangalore. Concerts, comedy shows, music festivals, live performances, and more. Book tickets and never miss out.",
  openGraph: {
    title: "Events in Bangalore | BangaloreLife",
    description: "Find concerts, comedy shows, festivals, and events happening in Bangalore.",
  },
};

const categories = [
  { name: "All", href: "/events", active: true },
  { name: "Concerts", href: "/events/concerts", active: false },
  { name: "Comedy", href: "/events/comedy", active: false },
  { name: "Festivals", href: "/events/festivals", active: false },
  { name: "Theatre", href: "/events/theatre", active: false },
  { name: "Sports", href: "/events/sports", active: false },
];

// Sample events - will be replaced with scraped data
const events = [
  {
    id: 1,
    title: "Bangalore Comedy Festival 2026",
    date: "Feb 28 - Mar 2",
    venue: "Phoenix Marketcity",
    category: "Comedy",
    price: "From ₹799",
    image: "😂",
  },
  {
    id: 2,
    title: "Sunburn Arena ft. Martin Garrix",
    date: "March 15",
    venue: "Nice Grounds",
    category: "Concert",
    price: "From ₹1,999",
    image: "🎵",
  },
  {
    id: 3,
    title: "Zakir Khan Live",
    date: "March 8",
    venue: "JG Auditorium",
    category: "Comedy",
    price: "From ₹999",
    image: "😂",
  },
  {
    id: 4,
    title: "Nucleya Live",
    date: "March 22",
    venue: "Jayamahal Palace",
    category: "Concert",
    price: "From ₹1,499",
    image: "🎵",
  },
  {
    id: 5,
    title: "Bangalore Literature Festival",
    date: "March 1-3",
    venue: "Lalit Ashok",
    category: "Festival",
    price: "Free Entry",
    image: "📚",
  },
  {
    id: 6,
    title: "IPL - RCB vs CSK",
    date: "April 5",
    venue: "M. Chinnaswamy Stadium",
    category: "Sports",
    price: "From ₹2,500",
    image: "🏏",
  },
];

const upcomingArtists = [
  "Arijit Singh (April)",
  "Prateek Kuhad (March)",
  "The Local Train (March)",
  "Anuv Jain (April)",
  "When Chai Met Toast (March)",
];

export default function EventsPage() {
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
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    cat.active
                      ? 'bg-pink-500 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl font-extralight text-white">Upcoming Events</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-pink-500/30 overflow-hidden transition-all card-hover cursor-pointer"
                >
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-pink-900/20 to-zinc-900 flex items-center justify-center">
                    <span className="text-6xl opacity-50">{event.image}</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 bg-pink-500/10 text-pink-300 rounded">
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
                BookMyShow
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
    </>
  );
}
