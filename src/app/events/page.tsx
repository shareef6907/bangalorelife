import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllEvents, getEventCategories, type EventDisplay } from "@/lib/events";
import { affiliateLinkProps } from "@/lib/affiliate";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events in Bangalore - Comedy, Concerts, Workshops | BangaloreLife",
  description: "Discover the best events in Bangalore. Comedy shows, live concerts, workshops, theatre, and more. Book tickets for upcoming events in Bengaluru.",
  keywords: "bangalore events, bengaluru concerts, comedy shows bangalore, workshops bangalore, live music bangalore, theatre bangalore",
  openGraph: {
    title: "Events in Bangalore - Comedy, Concerts, Workshops | BangaloreLife",
    description: "Discover the best events in Bangalore. Comedy shows, live concerts, workshops, theatre, and more.",
    url: "https://bangalorelife.com/events",
    siteName: "BangaloreLife",
    type: "website",
  },
};

// Revalidate every hour
export const revalidate = 3600;

export default async function EventsPage() {
  const [events, categories] = await Promise.all([
    getAllEvents(100),
    getEventCategories(),
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Events in Bangalore
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {events.length}+ upcoming events • Comedy, Concerts, Workshops & more
            </p>
          </div>
        </section>

        {/* Category Stats */}
        <section className="py-8 px-4 border-b border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm">
                All Events ({events.length})
              </span>
              {categories.map((cat) => (
                <span 
                  key={cat.category}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:border-purple-500/50 transition-colors cursor-pointer"
                >
                  {cat.emoji} {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)} ({cat.count})
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Events Grid - Client Component for filtering */}
        <EventsClient initialEvents={events} categories={categories} />

        {/* SEO Content */}
        <section className="py-16 px-4 bg-gradient-to-b from-black to-purple-900/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Discover the Best Events in Bangalore
            </h2>
            <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
              <p>
                Bangalore, India&apos;s tech capital, is also a thriving hub for entertainment and culture. 
                From stand-up comedy shows featuring India&apos;s top comedians to electrifying music concerts, 
                the city offers something for everyone.
              </p>
              <p>
                <strong>Comedy Shows:</strong> Catch performances by comedians like Zakir Khan, Biswa Kalyan Rath, 
                Kanan Gill, and many more at venues across Bangalore. The comedy scene here is one of the best in India.
              </p>
              <p>
                <strong>Live Concerts:</strong> From EDM festivals like Sunburn to Bollywood nights and indie music gigs, 
                Bangalore&apos;s music scene caters to every taste. Venues like Phoenix Marketcity, Jayamahal Palace, 
                and various pubs host regular live performances.
              </p>
              <p>
                <strong>Workshops & Experiences:</strong> Learn something new with art workshops, cooking classes, 
                pottery sessions, and unique experiences around the city.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center">
          <a
            href="https://inr.deals/track?id=eve678604838&src=bangalorelife&campaign=cps&url=https%3A%2F%2Fin.bookmyshow.com%2Fexplore%2Fevents-bengaluru"
            {...affiliateLinkProps}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full font-semibold hover:from-purple-500 hover:to-violet-500 transition-all transform hover:scale-105"
          >
            🎟️ Browse All Events on BookMyShow
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
