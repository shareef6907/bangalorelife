import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Neighborhoods — Explore Every Area | BangaloreLife",
  description: "Discover all Bangalore neighborhoods. From Koramangala nightlife to Malleshwaram heritage, find the perfect area for food, drinks, and experiences.",
  keywords: "bangalore neighborhoods, koramangala, indiranagar, whitefield, hsr layout, malleshwaram, jayanagar, mg road bangalore",
};

const neighborhoods = [
  {
    name: "Koramangala",
    slug: "koramangala",
    tagline: "Nightlife & Startup Hub",
    description: "The beating heart of Bangalore's party scene. Home to Toit, The Bier Library, and dozens of rooftop bars.",
    venues: 650,
    tags: ["Craft Beer", "Late Night", "Startups"],
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
  },
  {
    name: "Indiranagar",
    slug: "indiranagar",
    tagline: "Upscale Bars & Boutiques",
    description: "100 Feet Road is legendary. Wine bars, live music, and Bangalore's coolest crowd.",
    venues: 795,
    tags: ["Cocktails", "Brunch", "Shopping"],
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
  },
  {
    name: "MG Road & Brigade Road",
    slug: "mg-road-brigade-road",
    tagline: "The Iconic Party Strip",
    description: "Where Bangalore's nightlife began. Pecos, Hard Rock Cafe, and countless pubs.",
    venues: 585,
    tags: ["Classic Bars", "Live Bands"],
    image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=800&q=80",
  },
  {
    name: "Whitefield",
    slug: "whitefield",
    tagline: "Tech Hub After Dark",
    description: "Phoenix Marketcity, VR Bengaluru, and a thriving brewery scene.",
    venues: 280,
    tags: ["Breweries", "Malls", "IT"],
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
  },
  {
    name: "HSR Layout",
    slug: "hsr-layout",
    tagline: "The New Cool",
    description: "Great cafes, chill bars, and a young crowd. Less pretentious, more relaxed.",
    venues: 358,
    tags: ["Cafes", "Chill Vibes"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
  {
    name: "Malleshwaram",
    slug: "malleshwaram",
    tagline: "Heritage Food & Temples",
    description: "CTR benne dosa, ancient temples, and old Bangalore charm. A must-visit.",
    venues: 738,
    tags: ["Heritage", "South Indian", "Temples"],
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
  },
  {
    name: "Jayanagar",
    slug: "jayanagar",
    tagline: "Shopping & Old Bangalore",
    description: "4th Block shopping complex, MTR, Vidyarthi Bhavan, and traditional charm.",
    venues: 382,
    tags: ["Shopping", "Traditional Food"],
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
  },
  {
    name: "JP Nagar",
    slug: "jp-nagar",
    tagline: "South Bangalore Living",
    description: "Residential heartland with local restaurants and authentic Bangalore vibes.",
    venues: 1121,
    tags: ["Local Vibes", "Family Dining"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    name: "Electronic City",
    slug: "electronic-city",
    tagline: "India's First IT Park",
    description: "Infosys, Wipro, TCS, and a growing food scene for the tech workforce.",
    venues: 191,
    tags: ["IT Hub", "Tech Parks"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    name: "Marathahalli",
    slug: "marathahalli",
    tagline: "ORR Tech Corridor",
    description: "Affordable living, diverse food, and proximity to major tech parks.",
    venues: 642,
    tags: ["Affordable", "ORR"],
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
  },
  {
    name: "Hebbal",
    slug: "hebbal",
    tagline: "North Bangalore Gateway",
    description: "Hebbal Lake, Esteem Mall, and easy airport access.",
    venues: 309,
    tags: ["Lake Views", "Airport Nearby"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    name: "BTM Layout",
    slug: "btm-layout",
    tagline: "Affordable & Emerging",
    description: "Budget-friendly living with growing cafes and restaurants.",
    venues: 100,
    tags: ["Affordable", "Young Crowd"],
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80",
  },
  {
    name: "Sarjapur Road",
    slug: "sarjapur-road",
    tagline: "Fast-Growing IT Corridor",
    description: "New apartments, international schools, and emerging dining scene.",
    venues: 150,
    tags: ["New Development", "Family"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    name: "Bellandur",
    slug: "bellandur",
    tagline: "ORR Tech Junction",
    description: "RMZ Ecospace, tech parks, and growing community.",
    venues: 263,
    tags: ["Tech Parks", "ORR"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    name: "Yelahanka",
    slug: "yelahanka",
    tagline: "North Bangalore Peaceful",
    description: "Air Force base, airport proximity, and quiet residential living.",
    venues: 269,
    tags: ["Airport", "Quiet"],
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
  },
  {
    name: "Rajajinagar",
    slug: "rajajinagar",
    tagline: "Orion Mall & More",
    description: "Orion Mall, industrial heritage, and excellent Metro connectivity.",
    venues: 235,
    tags: ["Shopping", "Metro"],
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80",
  },
  {
    name: "Banashankari",
    slug: "banashankari",
    tagline: "Temple Town",
    description: "Famous temple, ISKCON, and authentic South Bangalore character.",
    venues: 300,
    tags: ["Temples", "Traditional"],
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
  },
  {
    name: "Frazer Town",
    slug: "frazer-town",
    tagline: "Biryani Capital",
    description: "Legendary biryani houses, kebabs, and Anglo-Indian heritage.",
    venues: 225,
    tags: ["Biryani", "Kebabs", "Food"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
  },
  {
    name: "Hennur & Kalyan Nagar",
    slug: "hennur-kalyan-nagar",
    tagline: "Brewery Belt",
    description: "North Bangalore's brewery corridor. Byg Brewski, Red Rhino, and more.",
    venues: 227,
    tags: ["Mega Breweries", "Groups"],
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=800&q=80",
  },
  {
    name: "Church Street",
    slug: "church-street",
    tagline: "Culture & Coffee",
    description: "Pedestrian-friendly stretch with bookstores, cafes, and Bangalore institutions.",
    venues: 100,
    tags: ["Coffee", "Books", "Walking"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f54?w=800&q=80",
  },
];

export default function NeighborhoodsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        <section className="relative py-20 px-4 border-b border-zinc-800/50">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bangalore Neighborhoods</h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {neighborhoods.length} areas to explore. Every neighborhood has its own character.
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoods.map((hood) => (
                <Link
                  key={hood.slug}
                  href={`/neighborhoods/${hood.slug}`}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-violet-500/50 transition-all"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={hood.image} alt={hood.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-violet-400 font-medium">{hood.venues}+ venues</span>
                    </div>
                    <h2 className="text-xl font-bold mb-1 group-hover:text-violet-400 transition-colors">{hood.name}</h2>
                    <p className="text-sm text-zinc-500 mb-2">{hood.tagline}</p>
                    <p className="text-sm text-zinc-400 line-clamp-2">{hood.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {hood.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-zinc-900/30 border-t border-zinc-800/50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Explore More</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/malls" className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-medium transition-colors">Shopping Malls</Link>
              <Link href="/guides" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium transition-colors">City Guides</Link>
              <Link href="/restaurants" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium transition-colors">Restaurants</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
