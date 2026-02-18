import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Things to Do in Bangalore - Complete Guide 2026",
  description: "Discover the best things to do in Bangalore. From nightlife and breweries to weekend getaways and hidden gems. Your complete Bangalore bucket list.",
  openGraph: {
    title: "Things to Do in Bangalore - Complete Guide | BangaloreLife",
    description: "The ultimate guide to experiencing Bangalore. Nightlife, restaurants, attractions, and more.",
  },
};

const sections = [
  {
    title: "Nightlife & Drinks",
    description: "India's pub capital awaits",
    items: [
      { name: "Brewery hopping in Indiranagar", href: "/breweries", icon: "🍺" },
      { name: "Rooftop bars with city views", href: "/nightlife/rooftop-bars", icon: "🌃" },
      { name: "Live music venues", href: "/nightlife/live-music", icon: "🎸" },
      { name: "Speakeasies and hidden bars", href: "/nightlife/speakeasies", icon: "🥃" },
      { name: "Pub crawl in Koramangala", href: "/guides/pub-crawl", icon: "🍻" },
    ],
  },
  {
    title: "Food & Dining",
    description: "From street food to fine dining",
    items: [
      { name: "Best South Indian breakfast spots", href: "/restaurants/south-indian", icon: "🍳" },
      { name: "Craft coffee cafes", href: "/cafes", icon: "☕" },
      { name: "Fine dining experiences", href: "/restaurants/fine-dining", icon: "🍽️" },
      { name: "Street food tour", href: "/guides/street-food", icon: "🍜" },
      { name: "Rooftop restaurants", href: "/restaurants/rooftop", icon: "🏙️" },
    ],
  },
  {
    title: "Entertainment",
    description: "Never a dull moment",
    items: [
      { name: "Stand-up comedy shows", href: "/events/comedy", icon: "😂" },
      { name: "Live concerts and gigs", href: "/events/concerts", icon: "🎵" },
      { name: "Theatre and plays", href: "/events/theatre", icon: "🎭" },
      { name: "Latest movies", href: "/cinema", icon: "🎬" },
      { name: "Gaming lounges", href: "/things-to-do/gaming", icon: "🎮" },
    ],
  },
  {
    title: "Explore",
    description: "Discover the city",
    items: [
      { name: "Indiranagar shopping and cafes", href: "/areas/indiranagar", icon: "🛍️" },
      { name: "MG Road heritage walk", href: "/areas/mg-road", icon: "🚶" },
      { name: "Cubbon Park morning walk", href: "/things-to-do/cubbon-park", icon: "🌳" },
      { name: "Lalbagh botanical gardens", href: "/things-to-do/lalbagh", icon: "🌺" },
      { name: "Art galleries and museums", href: "/things-to-do/art", icon: "🖼️" },
    ],
  },
  {
    title: "Weekend Getaways",
    description: "Escape the city",
    items: [
      { name: "Nandi Hills sunrise drive", href: "/weekend-getaways/nandi-hills", icon: "🌄" },
      { name: "Coorg coffee estates", href: "/weekend-getaways/coorg", icon: "☕" },
      { name: "Chikmagalur trek", href: "/weekend-getaways/chikmagalur", icon: "🏔️" },
      { name: "Mysore palace day trip", href: "/weekend-getaways/mysore", icon: "🏰" },
      { name: "Kabini wildlife safari", href: "/weekend-getaways/kabini", icon: "🐘" },
    ],
  },
  {
    title: "Unique Experiences",
    description: "Things only in Bangalore",
    items: [
      { name: "Early morning filter coffee", href: "/guides/filter-coffee", icon: "☕" },
      { name: "Sunday brunch at a brewery", href: "/guides/brunch", icon: "🥂" },
      { name: "Midnight food run to VV Puram", href: "/guides/midnight-food", icon: "🌙" },
      { name: "Watch RCB at Chinnaswamy", href: "/things-to-do/rcb", icon: "🏏" },
      { name: "Bangalore palace visit", href: "/things-to-do/bangalore-palace", icon: "🏛️" },
    ],
  },
];

const highlights = [
  {
    title: "50+ Microbreweries",
    description: "More craft breweries than any Indian city",
    icon: "🍺",
  },
  {
    title: "Year-Round Weather",
    description: "Perfect climate for outdoor dining",
    icon: "🌤️",
  },
  {
    title: "Foodie Paradise",
    description: "Every cuisine from around the world",
    icon: "🍜",
  },
  {
    title: "Live Music Scene",
    description: "India's rock and indie capital",
    icon: "🎸",
  },
];

export default function ThingsToDoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        {/* Hero */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-purple-900/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extralight text-white mb-6">
              Things to Do in <span className="text-gradient">Bangalore</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
              The complete guide to experiencing Namma Bengaluru. 
              From legendary breweries to hidden gems.
            </p>
            
            {/* Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="text-white font-light block text-sm">{item.title}</span>
                  <span className="text-xs text-zinc-500">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {sections.map((section, sectionIndex) => (
          <section
            key={section.title}
            className={`py-20 px-4 sm:px-6 lg:px-8 ${
              sectionIndex % 2 === 0 ? 'bg-black' : 'bg-zinc-950'
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-2xl font-extralight text-white mb-2">
                  {section.title}
                </h2>
                <p className="text-zinc-500">{section.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-all card-hover"
                  >
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <span className="text-white font-light text-sm group-hover:text-violet-300 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* SEO Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extralight text-white mb-8">
              Your Bangalore Bucket List
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Bangalore, officially Bengaluru, is India&apos;s tech capital and arguably 
                its most cosmopolitan city. Beyond the IT parks and startups, 
                the city pulses with an incredible nightlife scene, world-class 
                restaurants, and a unique culture that blends tradition with modernity.
              </p>
              
              <h3 className="text-xl text-white mt-8 mb-4">Why Bangalore?</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                With year-round pleasant weather, a thriving craft beer scene (50+ microbreweries), 
                incredible food from every corner of India and the world, and a young, 
                cosmopolitan population, Bangalore offers experiences you won&apos;t find anywhere else.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Best Time to Visit</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Bangalore is pleasant year-round thanks to its elevation. October to February 
                sees the best weather. Avoid June-August monsoon if you prefer outdoor activities.
                December is particularly festive with multiple events and concerts.
              </p>

              <h3 className="text-xl text-white mt-8 mb-4">Getting Around</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Uber and Ola are the easiest ways to get around. The metro connects key areas 
                like MG Road, Indiranagar, and Whitefield. Traffic can be notorious, so plan 
                accordingly. For nightlife, stick to one area to avoid commuting between places.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extralight text-white mb-6">
              Start Exploring
            </h2>
            <p className="text-zinc-400 mb-8">
              Not sure where to begin? Check out what&apos;s happening tonight 
              or explore our neighborhood guides.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/tonight"
                className="px-8 py-4 bg-violet-500 hover:bg-violet-400 text-white font-medium rounded-lg transition-all hover:scale-105"
              >
                What&apos;s On Tonight
              </Link>
              <Link 
                href="/areas/indiranagar"
                className="px-8 py-4 border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white rounded-lg transition-all"
              >
                Explore Indiranagar
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
