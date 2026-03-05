import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Best Fine Dining Restaurants in Bangalore 2025 | BangaloreLife",
  description: "Discover Bangalore's finest restaurants. From Karavalli to Le Cirque, find the best fine dining experiences for special occasions.",
  keywords: "fine dining bangalore, luxury restaurants bangalore, karavalli bangalore, le cirque bangalore, best restaurants bangalore",
};

async function getRestaurants() {
  const { data } = await supabase
    .from("venues")
    .select("name, slug, neighborhood, google_rating, google_reviews_count")
    .eq("type", "restaurant")
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(40);
  return data || [];
}

export const revalidate = 86400;

export default async function FineDiningPage() {
  const restaurants = await getRestaurants();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/restaurants" className="hover:text-white">Restaurants</Link><span>/</span>
          <span className="text-white">Fine Dining</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fine Dining in Bangalore</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            When you want to celebrate, impress, or simply eat exceptionally well. 
            Bangalore&apos;s finest restaurants for special occasions.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💰 Budget</h3>
            <p className="text-zinc-400 text-sm">₹3,000-10,000+ for two with drinks</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">👔 Dress Code</h3>
            <p className="text-zinc-400 text-sm">Smart casual to formal. No shorts or flip-flops.</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">📅 Reservations</h3>
            <p className="text-zinc-400 text-sm">Book 2-3 days ahead, especially weekends</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">The Icons</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>Karavalli — Taj Gateway</h3>
            <p>Coastal Karnataka cuisine elevated to art. The crab ghee roast and appam with stew are legendary. ₹4,000-6,000 for two.</p>
            <h3>Le Cirque Signature — The Leela Palace</h3>
            <p>French-Italian fine dining in one of India&apos;s most beautiful hotel settings. ₹8,000+ for two.</p>
            <h3>Caperberry — The Leela Palace</h3>
            <p>Modern European with molecular gastronomy touches. Chef&apos;s tasting menu recommended.</p>
            <h3>Olive Beach — JP Nagar</h3>
            <p>Mediterranean in a stunning white villa. Perfect for anniversaries and proposals.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top-Rated Restaurants ({restaurants.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((r: any) => (
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
          <h2 className="text-xl font-bold mb-4">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-fine-dining-bangalore" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm">Fine Dining Guide</Link>
            <Link href="/guides/best-brunches-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Best Brunches</Link>
            <Link href="/restaurants/rooftop" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Rooftop Dining</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
