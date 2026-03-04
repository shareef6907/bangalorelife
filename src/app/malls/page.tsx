import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const metadata: Metadata = {
  title: "Shopping Malls in Bangalore 2025 | Complete Mall Guide | BangaloreLife",
  description: "Explore the best shopping malls in Bangalore. From luxury malls like UB City to family favorites like Phoenix Marketcity. Find stores, restaurants, entertainment & more.",
  keywords: "malls in bangalore, shopping malls bangalore, best malls bangalore, phoenix marketcity, ub city, orion mall, mantri square, forum mall, bangalore shopping guide",
  openGraph: {
    title: "Shopping Malls in Bangalore 2025 | Complete Mall Guide",
    description: "Explore the best shopping malls in Bangalore with stores, restaurants, entertainment options and more.",
    type: "website",
  }
};

interface Mall {
  id: string;
  name: string;
  slug: string;
  neighborhood: string;
  address: string | null;
  google_rating: number | null;
  google_reviews_count: number | null;
  cover_photo_url: string | null;
  opening_hours: string[];
  total_stores: number | null;
  anchor_stores: string[] | null;
  description: string | null;
}

async function getMalls(): Promise<Mall[]> {
  const { data } = await supabase
    .from("malls")
    .select("*")
    .eq("is_active", true)
    .order("google_reviews_count", { ascending: false, nullsFirst: false });

  return data || [];
}

async function getMallStoreCounts(): Promise<Record<string, number>> {
  const { data } = await supabase
    .from("mall_stores")
    .select("mall_id")
    .eq("is_active", true);

  if (!data) return {};

  const counts: Record<string, number> = {};
  data.forEach((s: any) => {
    counts[s.mall_id] = (counts[s.mall_id] || 0) + 1;
  });
  return counts;
}

async function getNeighborhoods(): Promise<{ name: string; count: number }[]> {
  const { data } = await supabase
    .from("malls")
    .select("neighborhood")
    .eq("is_active", true);

  if (!data) return [];

  const counts: Record<string, number> = {};
  data.forEach((m: any) => {
    counts[m.neighborhood] = (counts[m.neighborhood] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function formatNeighborhood(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const revalidate = 3600;

export default async function MallsPage() {
  const [malls, storeCounts, neighborhoods] = await Promise.all([
    getMalls(),
    getMallStoreCounts(),
    getNeighborhoods()
  ]);

  const featuredMalls = malls.slice(0, 6);
  const allMalls = malls;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shopping Malls in Bangalore
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            Discover Bangalore's best shopping destinations. From luxury boutiques at UB City to 
            family entertainment at Phoenix Marketcity — find the perfect mall for shopping, dining, and fun.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-violet-400">{malls.length}</div>
            <div className="text-zinc-400 text-sm mt-1">Malls Listed</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-violet-400">
              {Object.values(storeCounts).reduce((a, b) => a + b, 0)}+
            </div>
            <div className="text-zinc-400 text-sm mt-1">Stores & Restaurants</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-violet-400">{neighborhoods.length}</div>
            <div className="text-zinc-400 text-sm mt-1">Areas Covered</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-violet-400">
              {(malls.reduce((sum, m) => sum + (m.google_rating || 0), 0) / malls.length).toFixed(1)}★
            </div>
            <div className="text-zinc-400 text-sm mt-1">Avg. Rating</div>
          </div>
        </div>

        {/* Filter by Area */}
        {neighborhoods.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-zinc-300">Browse by Area</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-violet-600 rounded-full text-sm font-medium cursor-pointer">
                All Areas ({malls.length})
              </span>
              {neighborhoods.map(({ name, count }) => (
                <span 
                  key={name}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-medium capitalize cursor-pointer transition-colors"
                >
                  {formatNeighborhood(name)} ({count})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Featured Malls */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Malls in Bangalore</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMalls.map((mall) => (
              <Link 
                key={mall.id} 
                href={`/malls/${mall.slug}`}
                className="group bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800/80 transition-all duration-300"
              >
                {/* Mall Image */}
                <div className="relative h-48 bg-zinc-800">
                  {mall.cover_photo_url ? (
                    <img 
                      src={mall.cover_photo_url} 
                      alt={mall.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600/20 to-pink-600/20">
                      <span className="text-4xl">🏬</span>
                    </div>
                  )}
                  {/* Rating Badge */}
                  {mall.google_rating && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">{mall.google_rating}</span>
                    </div>
                  )}
                </div>

                {/* Mall Info */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors">
                    {mall.name}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-3 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {formatNeighborhood(mall.neighborhood)}
                  </p>
                  
                  {/* Stats Row */}
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    {mall.google_reviews_count && (
                      <span>{(mall.google_reviews_count / 1000).toFixed(0)}k reviews</span>
                    )}
                    {storeCounts[mall.id] && (
                      <span>{storeCounts[mall.id]} stores</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Malls List */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Malls ({allMalls.length})</h2>
          <div className="grid gap-4">
            {allMalls.map((mall) => (
              <Link 
                key={mall.id} 
                href={`/malls/${mall.slug}`}
                className="group bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800/80 transition-all duration-300 flex items-center gap-4"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg bg-zinc-800 flex-shrink-0 overflow-hidden">
                  {mall.cover_photo_url ? (
                    <img 
                      src={mall.cover_photo_url} 
                      alt={mall.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600/20 to-pink-600/20">
                      <span className="text-2xl">🏬</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-semibold group-hover:text-violet-400 transition-colors truncate">
                    {mall.name}
                  </h3>
                  <p className="text-zinc-400 text-sm truncate">
                    {formatNeighborhood(mall.neighborhood)}
                    {mall.address && ` • ${mall.address.split(',').slice(0, 2).join(',')}`}
                  </p>
                </div>

                {/* Rating & Reviews */}
                <div className="text-right flex-shrink-0">
                  {mall.google_rating && (
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">{mall.google_rating}</span>
                    </div>
                  )}
                  {mall.google_reviews_count && (
                    <div className="text-zinc-500 text-sm">
                      {(mall.google_reviews_count / 1000).toFixed(0)}k reviews
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-violet-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="mt-16 prose prose-invert max-w-none">
          <h2>Shopping in Bangalore: The Complete Mall Guide</h2>
          <p>
            Bangalore, India's Silicon Valley, offers world-class shopping experiences across dozens of 
            malls spread throughout the city. Whether you're looking for luxury brands, budget-friendly 
            fashion, entertainment, or simply want to spend a weekend with family, there's a mall for everyone.
          </p>
          
          <h3>Best Areas for Mall Shopping</h3>
          <ul>
            <li><strong>Whitefield:</strong> Home to Phoenix Marketcity and VR Bengaluru — perfect for tech professionals in the area</li>
            <li><strong>Rajajinagar/Malleshwaram:</strong> Orion Mall and Mantri Square offer excellent shopping with Metro connectivity</li>
            <li><strong>MG Road/Central:</strong> UB City for luxury shopping and high-end dining</li>
            <li><strong>Koramangala:</strong> Forum Mall for a mix of brands and local favorites</li>
          </ul>

          <h3>What to Expect</h3>
          <p>
            Most Bangalore malls are open from 10 AM to 10 PM daily. You'll find international brands 
            like Zara, H&M, Uniqlo alongside Indian favorites like Westside and Pantaloons. Food courts 
            offer everything from South Indian thalis to international cuisines, and multiplex cinemas 
            (PVR, INOX, Cinépolis) are standard in major malls.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
