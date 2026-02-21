import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";
import { getFeaturedEvents } from "@/lib/events";
import moviesData from "@/data/movies.json";

export const metadata: Metadata = {
  title: "BangaloreLife - Nightlife, Events & Things to Do in Bangalore",
  description: "Discover the best nightlife, events, restaurants, breweries, and things to do in Bangalore. Your ultimate guide to Bengaluru's entertainment scene.",
  keywords: "bangalore nightlife, bengaluru events, bangalore pubs, bangalore restaurants, things to do in bangalore, bangalore breweries, bangalore cafes",
  openGraph: {
    title: "BangaloreLife - Nightlife, Events & Things to Do",
    description: "Your ultimate guide to Bangalore's entertainment scene. Discover events, nightlife, restaurants, and more.",
    url: "https://bangalorelife.com",
    siteName: "BangaloreLife",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BangaloreLife - Discover Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BangaloreLife - Nightlife, Events & Things to Do",
    description: "Your ultimate guide to Bangalore's entertainment scene.",
  },
};

// Revalidate every hour
export const revalidate = 3600;

const categories = [
  { name: "Pubs & Bars", href: "/nightlife", emoji: "🍻" },
  { name: "Events", href: "/events", emoji: "🎉" },
  { name: "Restaurants", href: "/restaurants", emoji: "🍽️" },
  { name: "Cinema", href: "/cinema", emoji: "🎬" },
  { name: "Breweries", href: "/breweries", emoji: "🍺" },
  { name: "Cafes", href: "/cafes", emoji: "☕" },
];

const categoryCards = [
  { 
    name: "Nightlife", 
    href: "/nightlife", 
    emoji: "🍻",
    description: "Pubs, clubs, rooftop bars",
  },
  { 
    name: "Breweries", 
    href: "/breweries", 
    emoji: "🍺",
    description: "Craft beer paradise",
  },
  { 
    name: "Restaurants", 
    href: "/restaurants", 
    emoji: "🍽️",
    description: "Fine dining to street food",
  },
  { 
    name: "Cafes", 
    href: "/cafes", 
    emoji: "☕",
    description: "Coffee culture hub",
  },
  { 
    name: "Events", 
    href: "/events", 
    emoji: "🎉",
    description: "Concerts, comedy, shows",
  },
  { 
    name: "Cinema", 
    href: "/cinema", 
    emoji: "🎬",
    description: "Movies now showing",
  },
];

const areas = [
  { name: "Indiranagar", href: "/areas/indiranagar", vibe: "Trendy • 12th Main nightlife hub" },
  { name: "Koramangala", href: "/areas/koramangala", vibe: "Young • Startup culture" },
  { name: "MG Road", href: "/areas/mg-road", vibe: "Classic • Iconic party district" },
  { name: "Whitefield", href: "/areas/whitefield", vibe: "IT Hub • Premium breweries" },
  { name: "HSR Layout", href: "/areas/hsr-layout", vibe: "Chill • Cafe culture" },
];

const breweries = [
  { name: "Toit Brewpub", area: "Indiranagar", rating: 4.8, specialty: "Toit Weiss" },
  { name: "Arbor Brewing Company", area: "Magrath Road", rating: 4.6, specialty: "Bangalore Bliss" },
  { name: "Windmills Craftworks", area: "Whitefield", rating: 4.5, specialty: "Belgian Wit" },
  { name: "The Bier Library", area: "Koramangala", rating: 4.4, specialty: "Smoked Lager" },
];

export default async function Home() {
  // Fetch real events from Supabase
  const featuredEvents = await getFeaturedEvents(8);
  
  // Get movies from static data
  const movies = moviesData.movies.slice(0, 6);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HomeClient 
        categories={categories}
        categoryCards={categoryCards}
        areas={areas}
        breweries={breweries}
        featuredEvents={featuredEvents}
        movies={movies}
      />
      <Footer />
    </div>
  );
}
