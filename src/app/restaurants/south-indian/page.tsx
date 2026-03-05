import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Best South Indian Restaurants in Bangalore 2025 | BangaloreLife",
  description: "Find the best South Indian restaurants in Bangalore. From crispy dosas at CTR to thalis at MTR, discover authentic Karnataka, Tamil, Kerala & Andhra cuisine.",
  keywords: "south indian restaurants bangalore, dosa bangalore, idli bangalore, ctr bangalore, mtr bangalore, filter coffee",
};

async function getRestaurants() {
  const { data } = await supabase
    .from("venues")
    .select("name, slug, neighborhood, google_rating, google_reviews_count")
    .eq("type", "restaurant")
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(50);
  return data || [];
}

export const revalidate = 86400;

export default async function SouthIndianPage() {
  const restaurants = await getRestaurants();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/restaurants" className="hover:text-white">Restaurants</Link><span>/</span>
          <span className="text-white">South Indian</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">South Indian Restaurants in Bangalore</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            Bangalore is the home of South Indian cuisine. From legendary dosa joints like CTR to 
            heritage restaurants like MTR, discover the best of Karnataka, Tamil, Kerala, and Andhra food.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🥞 Must-Try Dishes</h3>
            <p className="text-zinc-400 text-sm">Benne Dosa, Masala Dosa, Idli-Vada, Rava Idli, Filter Coffee, Thali</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💰 Price Range</h3>
            <p className="text-zinc-400 text-sm">₹50-150 (darshinis) to ₹500+ (fine dining)</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">📍 Best Areas</h3>
            <p className="text-zinc-400 text-sm">Malleshwaram, Jayanagar, Basavanagudi, Gandhi Bazaar</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Legendary Spots</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>CTR (Central Tiffin Room) - Malleshwaram</h3>
            <p>The most famous dosa in Bangalore. Their benne (butter) dosa has been drawing crowds since 1920. Cash only, expect queues.</p>
            <h3>MTR (Mavalli Tiffin Room)</h3>
            <p>Invented the rava idli during a rice shortage. A Bangalore institution since 1924. The full meals (thali) are exceptional.</p>
            <h3>Vidyarthi Bhavan - Gandhi Bazaar</h3>
            <p>Crispy masala dosa with legendary chutney. Another heritage spot that&apos;s been running since 1943.</p>
            <h3>Brahmin&apos;s Coffee Bar - Basavanagudi</h3>
            <p>Standing-only, no-frills, perfect idli-vada-coffee since 1960. Authentic Bangalore experience.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All South Indian Restaurants ({restaurants.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.slice(0, 30).map((r: any) => (
              <Link key={r.slug} href={`/venues/${r.slug}`} className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors">
                <div className="font-medium truncate">{r.name}</div>
                <div className="text-sm text-zinc-500 capitalize mt-1">{r.neighborhood?.replace(/-/g, ' ')}</div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  {r.google_rating && <span className="text-yellow-400">★ {r.google_rating}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Explore Other Cuisines</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/restaurants/north-indian" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">North Indian</Link>
            <Link href="/restaurants/street-food" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Street Food</Link>
            <Link href="/guides/best-street-food-bangalore" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm">Street Food Guide</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
