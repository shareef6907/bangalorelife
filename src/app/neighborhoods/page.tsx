import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Neighborhoods Guide — Best Areas for Nightlife, Food & More",
  description: "Explore Bangalore's best neighborhoods. From Koramangala's pub scene to Indiranagar's upscale bars — find the perfect area for your night out.",
};

const neighborhoods = [
  {
    name: "Koramangala",
    slug: "koramangala",
    tagline: "Bangalore's Nightlife & Startup Hub",
    description: "The beating heart of Bangalore's party scene. Home to Toit, The Bier Library, and dozens of rooftop bars. If you're looking for craft beer, late-night eats, and startup energy, Koramangala is your place.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    highlights: ["Toit Brewpub", "The Bier Library", "Koramangala Social", "80 Ft Road scene"],
    bestFor: ["Craft Beer", "Late Night", "Startup Crowd", "Pub Crawls"],
  },
  {
    name: "Indiranagar",
    slug: "indiranagar",
    tagline: "Upscale Bars, Boutiques & Brunch",
    description: "12th Main and 100 Feet Road are legendary. Wine bars, live music venues, boutiques, and some of Bangalore's best brunch spots. Indiranagar is where you go when you want to dress up a bit.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    highlights: ["Loft 38", "Toit (original)", "The Humming Tree", "Toast & Tonic"],
    bestFor: ["Cocktails", "Brunch", "Live Music", "Date Night"],
  },
  {
    name: "MG Road & Brigade Road",
    slug: "mg-road-brigade-road",
    tagline: "The Iconic Party Strip",
    description: "Where Bangalore's nightlife began. These parallel roads remain home to legendary spots like Pecos, Hard Rock Cafe, and countless pubs. A walking district with history and energy.",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80",
    highlights: ["Pecos", "Hard Rock Cafe", "13th Floor", "The Pub"],
    bestFor: ["Classic Bars", "Live Bands", "Walking District", "Groups"],
  },
  {
    name: "Whitefield",
    slug: "whitefield",
    tagline: "Tech Hub After Dark",
    description: "Bangalore's IT corridor isn't just about office parks. Whitefield has a thriving brewery scene with massive spaces, family-friendly dining, and premium craft beer experiences.",
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
    highlights: ["Windmills Craftworks", "Byg Brewski", "Hoppipola", "XOOX Brewmill"],
    bestFor: ["Breweries", "IT Crowd", "Large Groups", "Sunday Sessions"],
  },
  {
    name: "HSR Layout",
    slug: "hsr-layout",
    tagline: "The New Cool",
    description: "HSR has quietly become one of Bangalore's most interesting neighborhoods. Great cafes, chill bars, and a young crowd. Less pretentious than Indiranagar, less chaotic than Koramangala.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    highlights: ["Third Wave Coffee", "Brahma Brews", "Druid Garden", "Local cafes"],
    bestFor: ["Cafes", "Chill Vibes", "Working Remote", "Young Crowd"],
  },
  {
    name: "JP Nagar & Jayanagar",
    slug: "jp-nagar-jayanagar",
    tagline: "Old Bangalore Charm",
    description: "South Bangalore's residential heartland has its own character — family restaurants, old-school bars, and authentic Bangalore vibes away from the startup scene.",
    image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&q=80",
    highlights: ["MTR", "Vidyarthi Bhavan", "Local pubs", "South Indian food"],
    bestFor: ["Authentic Food", "Local Vibes", "Family Dining", "Quiet Evenings"],
  },
  {
    name: "Hennur & Kalyan Nagar",
    slug: "hennur-kalyan-nagar",
    tagline: "Brewery Belt",
    description: "North Bangalore's brewery corridor. Home to Byg Brewski's flagship location and several other large brewery spaces. Worth the drive if you want open-air brewing experiences.",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
    highlights: ["Byg Brewski", "Red Rhino", "Uru Brewpark", "Gilly's"],
    bestFor: ["Mega Breweries", "Day Drinking", "Groups", "Open Air"],
  },
  {
    name: "Church Street",
    slug: "church-street",
    tagline: "Culture, Coffee & Cocktails",
    description: "A pedestrian-friendly stretch in the heart of the city. Bookstores, cafes, boutiques, and some classic Bangalore institutions. Perfect for an afternoon that turns into an evening.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    highlights: ["Koshy's", "Church Street Social", "Bookworm", "Boutiques"],
    bestFor: ["Coffee", "Books", "Walking", "Culture"],
  },
  {
    name: "Sarjapur Road",
    slug: "sarjapur-road",
    tagline: "The Growing Nightlife Corridor",
    description: "Still developing, but Sarjapur Road is quickly becoming a destination. New bars, restaurants, and a young crowd moving to the area. One to watch.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
    highlights: ["Glen's Bakehouse", "Local pubs", "New openings"],
    bestFor: ["New Spots", "Suburban Vibes", "Growing Scene"],
  },
  {
    name: "Yelahanka & Hebbal",
    slug: "yelahanka-hebbal",
    tagline: "North Bangalore: Resort Vibes",
    description: "The northern reaches of Bangalore offer a different experience — resort-style breweries, lake views, and a more relaxed pace. Good for day trips from the city center.",
    image: "https://images.unsplash.com/photo-1529417305485-480f579e7578?w=800&q=80",
    highlights: ["Byg Brewski Hennur", "The Reservoir", "Lake views"],
    bestFor: ["Day Trips", "Lake Views", "Relaxed Vibes"],
  },
];

export default function NeighborhoodsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Bangalore Neighborhoods
            </h1>
            <p className="text-xl text-emerald-100">
              Every area has its own vibe. Explore the best of each neighborhood.
            </p>
          </div>
        </section>

        {/* Neighborhood Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {neighborhoods.map((hood) => (
                <Link
                  key={hood.slug}
                  href={`/neighborhoods/${hood.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-stone-200"
                >
                  <div className="aspect-[2/1] relative overflow-hidden">
                    <img 
                      src={hood.image} 
                      alt={hood.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl font-bold text-white">{hood.name}</h2>
                      <p className="text-white/80">{hood.tagline}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-stone-600 mb-4">{hood.description}</p>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                        Highlights
                      </h3>
                      <p className="text-stone-700 text-sm">
                        {hood.highlights.join(" • ")}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {hood.bestFor.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full"
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
      </main>

      <Footer />
    </div>
  );
}
