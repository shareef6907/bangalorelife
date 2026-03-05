import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Malleshwaram Bangalore — Heritage Food, Temples & Culture | BangaloreLife",
  description: "Explore Malleshwaram, Bangalore's heritage neighborhood. Famous for CTR dosas, ancient temples, tree-lined streets, and authentic South Indian culture.",
  keywords: "malleshwaram bangalore, ctr malleshwaram, malleshwaram temple, malleshwaram food, old bangalore",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "malleshwaram").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

async function getMalls() {
  const { data } = await supabase.from("malls").select("name, slug, google_rating").eq("neighborhood", "malleshwaram").limit(5);
  return data || [];
}

export const revalidate = 86400;

export default async function MalleshwaramPage() {
  const [venues, malls] = await Promise.all([getVenues(), getMalls()]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Malleshwaram</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Malleshwaram</h1>
          <p className="text-xl text-violet-400 mb-4">Heritage Food, Temples & Culture</p>
          <p className="text-lg text-zinc-400 max-w-3xl">One of Bangalore&apos;s oldest neighborhoods, Malleshwaram is a treasure trove of heritage temples, legendary eateries like CTR, and old-world charm. Tree-lined avenues, traditional homes, and the bustling 8th Cross market make this a must-visit for authentic Bangalore experiences.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80" alt="Malleshwaram Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🍽️ Known For</h3>
            <p className="text-zinc-400 text-sm">CTR benne dosa, filter coffee, South Indian breakfast, Veena stores</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🛕 Landmarks</h3>
            <p className="text-zinc-400 text-sm">Kadu Malleswara Temple, Sankey Tank, 8th Cross Market</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🚇 Getting There</h3>
            <p className="text-zinc-400 text-sm">Mantri Square Metro (Green Line), ~20 min from MG Road</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Must-Visit Spots</h2>
          <div className="prose prose-invert max-w-none">
            <h3>CTR (Central Tiffin Room)</h3>
            <p>The most famous dosa in Bangalore. Their benne (butter) dosa has been drawing crowds since 1920. Expect a queue, but it moves fast. Cash only.</p>
            <h3>Brahmin&apos;s Coffee Bar</h3>
            <p>Idli-vada-coffee perfection since 1960. Standing room only, no frills, just honest South Indian breakfast.</p>
            <h3>Veena Stores</h3>
            <p>Legendary masala dosa joint. The chutney is what dreams are made of.</p>
            <h3>8th Cross Market</h3>
            <p>Traditional market with flowers, fruits, vegetables, and Bangalore nostalgia.</p>
          </div>
        </section>

        {malls.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Shopping</h2>
            <div className="grid gap-4">
              {malls.map((mall: any) => (
                <Link key={mall.slug} href={`/malls/${mall.slug}`} className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors flex justify-between items-center">
                  <span className="font-medium">{mall.name}</span>
                  {mall.google_rating && <span className="text-yellow-400">★ {mall.google_rating}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {venues.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top Places ({venues.length})</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venues.slice(0, 12).map((venue: any) => (
                <Link key={venue.slug} href={`/venues/${venue.slug}`} className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors">
                  <div className="font-medium truncate">{venue.name}</div>
                  <div className="flex justify-between items-center mt-2 text-sm text-zinc-400">
                    <span className="capitalize">{venue.type}</span>
                    {venue.google_rating && <span className="text-yellow-400">★ {venue.google_rating}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Nearby Neighborhoods</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/neighborhoods/rajajinagar" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Rajajinagar</Link>
            <Link href="/neighborhoods/mg-road-brigade-road" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">MG Road</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
