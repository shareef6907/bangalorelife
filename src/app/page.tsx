import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  { 
    name: "Nightlife", 
    href: "/nightlife", 
    emoji: "🍻",
    description: "Pubs, clubs, rooftop bars",
    gradient: "from-violet-600/20 to-purple-900/20",
  },
  { 
    name: "Breweries", 
    href: "/breweries", 
    emoji: "🍺",
    description: "Craft beer paradise",
    gradient: "from-amber-600/20 to-orange-900/20",
  },
  { 
    name: "Restaurants", 
    href: "/restaurants", 
    emoji: "🍽️",
    description: "Fine dining to street food",
    gradient: "from-rose-600/20 to-red-900/20",
  },
  { 
    name: "Cafes", 
    href: "/cafes", 
    emoji: "☕",
    description: "Coffee culture hub",
    gradient: "from-emerald-600/20 to-teal-900/20",
  },
  { 
    name: "Events", 
    href: "/events", 
    emoji: "🎉",
    description: "Concerts, comedy, shows",
    gradient: "from-pink-600/20 to-fuchsia-900/20",
  },
  { 
    name: "Cinema", 
    href: "/cinema", 
    emoji: "🎬",
    description: "Movies now showing",
    gradient: "from-blue-600/20 to-indigo-900/20",
  },
];

const areas = [
  { name: "Indiranagar", href: "/areas/indiranagar", vibe: "Trendy • 12th Main nightlife hub" },
  { name: "Koramangala", href: "/areas/koramangala", vibe: "Young • Startup culture" },
  { name: "MG Road", href: "/areas/mg-road", vibe: "Classic • Iconic party district" },
  { name: "Whitefield", href: "/areas/whitefield", vibe: "IT Hub • Premium breweries" },
  { name: "Church Street", href: "/areas/church-street", vibe: "Central • Mixed crowd" },
  { name: "Brigade Road", href: "/areas/brigade-road", vibe: "Shopping • Street culture" },
];

const featured = [
  { name: "Toit Brewpub", type: "Brewery", area: "Indiranagar", rating: "4.8" },
  { name: "Skyye", type: "Rooftop Bar", area: "UB City", rating: "4.7" },
  { name: "Arbor Brewing Co", type: "Brewery", area: "Magrath Road", rating: "4.6" },
  { name: "Dyu Art Cafe", type: "Cafe", area: "Koramangala", rating: "4.7" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-purple-900/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/5 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-violet-300 text-sm tracking-wide">NAMMA BENGALURU</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tight mb-6 animate-slide-up">
              <span className="block text-white">Discover</span>
              <span className="block text-gradient font-light">BangaloreLife</span>
            </h1>

            <p className="text-xl sm:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              India&apos;s pub capital. Craft beer paradise. 
              Tech hub by day, party scene by night.
            </p>

            {/* Quick actions */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link 
                href="/tonight"
                className="px-8 py-4 bg-violet-500 hover:bg-violet-400 text-white font-medium rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
              >
                What&apos;s On Tonight
              </Link>
              <Link 
                href="/things-to-do"
                className="px-8 py-4 border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white font-light rounded-lg transition-all"
              >
                Things To Do
              </Link>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {categories.map((cat) => (
                <Link 
                  key={cat.href}
                  href={cat.href}
                  className="px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-sm hover:border-violet-500/50 hover:text-violet-300 transition-all"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 animate-bounce">
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
                Explore Bangalore
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                From legendary breweries to hidden speakeasies, discover what makes Bangalore 
                India&apos;s most exciting nightlife destination.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${cat.gradient} border border-zinc-800 hover:border-violet-500/50 transition-all card-hover`}
                >
                  <span className="text-4xl mb-4 block">{cat.emoji}</span>
                  <h3 className="text-xl font-light text-white group-hover:text-violet-300 transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{cat.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-violet-400 text-sm tracking-widest uppercase mb-2 block">Neighborhoods</span>
                <h2 className="text-3xl sm:text-4xl font-extralight text-white">Popular Areas</h2>
              </div>
              <Link href="/areas" className="text-violet-400 hover:text-violet-300 text-sm transition-colors">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {areas.map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="group p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-all"
                >
                  <h3 className="text-lg font-light text-white group-hover:text-violet-300 transition-colors mb-1">
                    {area.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{area.vibe}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Venues */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-4">
                Top Rated
              </h2>
              <p className="text-zinc-500">The best spots according to locals</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((venue, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-xl bg-black border border-zinc-800 hover:border-violet-500/30 transition-all card-hover"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs px-2 py-1 bg-violet-500/10 text-violet-300 rounded">
                      {venue.type}
                    </span>
                    <span className="text-xs text-amber-400 flex items-center gap-1">
                      ★ {venue.rating}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-white group-hover:text-violet-300 transition-colors mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{venue.area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extralight text-white mb-6">
              Ready to Explore?
            </h2>
            <p className="text-zinc-400 mb-8">
              Whether you&apos;re a local or visiting, we&apos;ll help you discover 
              the best of Bangalore&apos;s vibrant scene.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/tonight"
                className="px-8 py-4 bg-violet-500 hover:bg-violet-400 text-white font-medium rounded-lg transition-all hover:scale-105"
              >
                What&apos;s On Tonight
              </Link>
              <Link 
                href="/guides/first-time"
                className="px-8 py-4 border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white rounded-lg transition-all"
              >
                First Time in Bangalore?
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
