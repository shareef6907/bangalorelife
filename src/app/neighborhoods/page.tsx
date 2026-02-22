import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Neighborhoods — Explore Every Area",
  description: "Discover the best neighborhoods in Bangalore for nightlife, food, and experiences. From Koramangala to Indiranagar, find your perfect spot.",
  keywords: "bangalore neighborhoods, koramangala nightlife, indiranagar bars, mg road bangalore, whitefield pubs, hsr layout cafes",
};

const neighborhoods = [
  {
    name: "Koramangala",
    slug: "koramangala",
    tagline: "Bangalore's Nightlife & Startup Hub",
    description: "The beating heart of Bangalore's party scene. Home to Toit, The Bier Library, and dozens of rooftop bars. If you're looking for craft beer, late-night eats, and startup energy, Koramangala is your place.",
    venues: 85,
    highlights: ["Toit Brewpub", "The Bier Library", "Koramangala Social"],
    tags: ["Craft Beer", "Late Night", "Startup Crowd"],
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
  },
  {
    name: "Indiranagar",
    slug: "indiranagar",
    tagline: "Upscale Bars, Boutiques & Brunch",
    description: "12th Main and 100 Feet Road are legendary. From wine bars to live music venues, Indiranagar has it all. More polished than Koramangala, with a slightly older, more affluent crowd.",
    venues: 70,
    highlights: ["Toit (original)", "Loft 38", "Toast & Tonic"],
    tags: ["Cocktails", "Brunch", "Live Music"],
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
  },
  {
    name: "MG Road & Brigade Road",
    slug: "mg-road-brigade-road",
    tagline: "The Iconic Party Strip",
    description: "Where Bangalore's nightlife began. These parallel roads remain home to legendary spots like Pecos, Hard Rock Cafe, and countless pubs. A walking district with history and energy.",
    venues: 45,
    highlights: ["Pecos", "Hard Rock Cafe", "13th Floor"],
    tags: ["Classic Bars", "Live Bands", "Walking District"],
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
  },
  {
    name: "Whitefield",
    slug: "whitefield",
    tagline: "Tech Hub After Dark",
    description: "Bangalore's IT corridor isn't just about office parks. Whitefield has a thriving brewery scene with massive spaces, family-friendly dining, and premium craft beer experiences.",
    venues: 40,
    highlights: ["Windmills Craftworks", "Byg Brewski", "Hoppipola"],
    tags: ["Breweries", "IT Crowd", "Large Groups"],
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
  },
  {
    name: "HSR Layout",
    slug: "hsr-layout",
    tagline: "The New Cool",
    description: "HSR has quietly become one of Bangalore's most interesting neighborhoods. Great cafes, chill bars, and a young crowd. Less pretentious than Indiranagar, less chaotic than Koramangala.",
    venues: 35,
    highlights: ["Third Wave Coffee", "Brahma Brews", "Druid Garden"],
    tags: ["Cafes", "Chill Vibes", "Young Crowd"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
  {
    name: "JP Nagar & Jayanagar",
    slug: "jp-nagar",
    tagline: "Old Bangalore Charm",
    description: "South Bangalore's residential heartland has its own character — family restaurants, old-school bars, and authentic Bangalore vibes away from the startup scene.",
    venues: 30,
    highlights: ["MTR", "Vidyarthi Bhavan", "Local pubs"],
    tags: ["Authentic Food", "Local Vibes", "Family Dining"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    name: "Hennur & Kalyan Nagar",
    slug: "hennur-kalyan-nagar",
    tagline: "Brewery Belt",
    description: "North Bangalore's brewery corridor. Home to Byg Brewski's flagship location and several other large brewery spaces. Worth the drive if you want open-air brewing experiences.",
    venues: 28,
    highlights: ["Byg Brewski", "Red Rhino", "Uru Brewpark"],
    tags: ["Mega Breweries", "Day Drinking", "Groups"],
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
  },
  {
    name: "Church Street",
    slug: "church-street",
    tagline: "Culture, Coffee & Cocktails",
    description: "A pedestrian-friendly stretch in the heart of the city. Bookstores, cafes, boutiques, and some classic Bangalore institutions. Perfect for an afternoon that turns into an evening.",
    venues: 25,
    highlights: ["Koshy's", "Church Street Social", "Bookworm"],
    tags: ["Coffee", "Books", "Walking", "Culture"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
  },
  {
    name: "Sarjapur Road",
    slug: "sarjapur",
    tagline: "The Growing Nightlife Corridor",
    description: "Still developing, but Sarjapur Road is quickly becoming a destination. New bars, restaurants, and a young crowd moving to the area. One to watch.",
    venues: 20,
    highlights: ["Glen's Bakehouse", "Local pubs", "New openings"],
    tags: ["New Spots", "Suburban Vibes", "Growing Scene"],
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
  },
  {
    name: "Yelahanka & Hebbal",
    slug: "yelahanka-hebbal",
    tagline: "North Bangalore Vibes",
    description: "The northern reaches of Bangalore offer a different experience — resort-style breweries, lake views, and a more relaxed pace. Good for day trips from the city center.",
    venues: 18,
    highlights: ["Byg Brewski Hennur", "The Reservoir", "Lake views"],
    tags: ["Day Trips", "Lake Views", "Relaxed Vibes"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
];

export default function NeighborhoodsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="relative py-20 px-4 border-b border-zinc-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bangalore Neighborhoods
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Every area has its own vibe. Explore the best of each neighborhood.
            </p>
          </div>
        </section>

        {/* Neighborhoods Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {neighborhoods.map((hood) => (
                <Link
                  key={hood.slug}
                  href={`/neighborhoods/${hood.slug}`}
                  className="group flex bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/50 transition-all"
                >
                  {/* Image */}
                  <div className="w-1/3 min-h-[200px] overflow-hidden">
                    <img
                      src={hood.image}
                      alt={hood.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-violet-400 font-medium">{hood.venues}+ venues</span>
                    </div>
                    <h2 className="text-xl font-bold mb-1 group-hover:text-violet-400 transition-colors">
                      {hood.name}
                    </h2>
                    <p className="text-sm text-zinc-500 mb-3">{hood.tagline}</p>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{hood.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {hood.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section Placeholder */}
        <section className="py-16 px-4 bg-zinc-900/30 border-t border-zinc-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Explore the Map</h2>
            <p className="text-zinc-400 mb-6">
              Coming soon: Interactive map of all Bangalore neighborhoods and venues.
            </p>
            <div className="aspect-video bg-zinc-800 rounded-2xl flex items-center justify-center">
              <span className="text-zinc-500">🗺️ Interactive Map Coming Soon</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
