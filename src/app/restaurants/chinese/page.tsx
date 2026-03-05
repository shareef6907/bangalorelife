import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Best Chinese Restaurants in Bangalore 2025 | BangaloreLife",
  description: "Find the best Chinese restaurants in Bangalore. From authentic Sichuan to Indo-Chinese fusion, discover top spots for dim sum, noodles, and more.",
  keywords: "chinese restaurants bangalore, indo chinese bangalore, dim sum bangalore, sichuan bangalore, best chinese food bangalore",
};

async function getRestaurants() {
  const { data } = await supabase
    .from("venues")
    .select("name, slug, neighborhood, google_rating")
    .eq("type", "restaurant")
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(30);
  return data || [];
}

export const revalidate = 86400;

export default async function ChinesePage() {
  const restaurants = await getRestaurants();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/restaurants" className="hover:text-white">Restaurants</Link><span>/</span>
          <span className="text-white">Chinese</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chinese Restaurants in Bangalore</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            From authentic Cantonese dim sum to beloved Indo-Chinese fusion, Bangalore has a 
            diverse Chinese food scene catering to all tastes.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🥡 Must-Try</h3>
            <p className="text-zinc-400 text-sm">Dim Sum, Kung Pao, Manchurian, Schezwan, Fried Rice, Noodles</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💰 Price Range</h3>
            <p className="text-zinc-400 text-sm">₹300-800 (casual) to ₹2,000+ (fine dining)</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🌶️ Style</h3>
            <p className="text-zinc-400 text-sm">Cantonese, Sichuan, Indo-Chinese, Pan-Asian</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Picks</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>Mainland China</h3>
            <p>Reliable chain with good Sichuan and Cantonese options. Multiple locations.</p>
            <h3>Szechuan Dragon</h3>
            <p>Authentic Sichuan spices. Not for the faint-hearted — the mapo tofu is fiery.</p>
            <h3>The Fatty Bao</h3>
            <p>Modern Asian with creative dim sum and baos. Great for groups.</p>
            <h3>Chung Wah</h3>
            <p>Old-school Bangalore favorite for Indo-Chinese. Generous portions, affordable.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All Chinese Restaurants ({restaurants.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((r: any) => (
              <Link key={r.slug} href={`/venues/${r.slug}`} className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors">
                <div className="font-medium truncate">{r.name}</div>
                <div className="text-sm text-zinc-500 capitalize mt-1">{r.neighborhood?.replace(/-/g, ' ')}</div>
                {r.google_rating && <span className="text-yellow-400 text-sm mt-2 block">★ {r.google_rating}</span>}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Explore Other Cuisines</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/restaurants/north-indian" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">North Indian</Link>
            <Link href="/restaurants/italian" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Italian</Link>
            <Link href="/restaurants/fine-dining" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Fine Dining</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
