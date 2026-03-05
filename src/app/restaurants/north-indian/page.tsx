import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Best North Indian Restaurants in Bangalore 2025 | BangaloreLife",
  description: "Discover the best North Indian restaurants in Bangalore. From butter chicken to biryani, find top-rated Mughlai, Punjabi, and North Indian cuisine.",
  keywords: "north indian restaurants bangalore, punjabi food bangalore, mughlai bangalore, butter chicken bangalore, biryani bangalore",
};

async function getRestaurants() {
  const { data } = await supabase
    .from("venues")
    .select("name, slug, neighborhood, google_rating, google_reviews_count, address")
    .eq("type", "restaurant")
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(50);
  return data || [];
}

export const revalidate = 86400;

export default async function NorthIndianPage() {
  const restaurants = await getRestaurants();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/restaurants" className="hover:text-white">Restaurants</Link><span>/</span>
          <span className="text-white">North Indian</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">North Indian Restaurants in Bangalore</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            From rich Mughlai curries to tandoori delights, Bangalore has excellent North Indian cuisine. 
            Find the best Punjabi dhabas, fine dining options, and everything in between.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🍗 Must-Try Dishes</h3>
            <p className="text-zinc-400 text-sm">Butter Chicken, Dal Makhani, Biryani, Tandoori, Naan, Kebabs</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💰 Price Range</h3>
            <p className="text-zinc-400 text-sm">₹200-500 (casual) to ₹1,500+ (fine dining) per person</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">📍 Best Areas</h3>
            <p className="text-zinc-400 text-sm">Frazer Town, Koramangala, Indiranagar, MG Road</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Picks</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>Punjabi By Nature</h3>
            <p>Authentic Punjabi cuisine in a fun setting. The butter chicken and dal makhani are crowd favorites.</p>
            <h3>Peshawri - ITC Gardenia</h3>
            <p>Fine dining North Indian at its best. The dal bukhara takes 18 hours to cook.</p>
            <h3>Meghana Foods</h3>
            <p>Andhra-style biryani that&apos;s become a Bangalore institution. Multiple locations, always packed.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All North Indian Restaurants ({restaurants.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((r: any) => (
              <Link key={r.slug} href={`/venues/${r.slug}`} className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors">
                <div className="font-medium truncate">{r.name}</div>
                <div className="text-sm text-zinc-500 capitalize mt-1">{r.neighborhood?.replace(/-/g, ' ')}</div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  {r.google_rating && <span className="text-yellow-400">★ {r.google_rating}</span>}
                  {r.google_reviews_count && <span className="text-zinc-500">{r.google_reviews_count.toLocaleString()} reviews</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Explore Other Cuisines</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/restaurants/south-indian" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">South Indian</Link>
            <Link href="/restaurants/chinese" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Chinese</Link>
            <Link href="/restaurants/fine-dining" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Fine Dining</Link>
            <Link href="/restaurants/street-food" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Street Food</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
