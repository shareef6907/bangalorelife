import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Jayanagar Bangalore — Shopping, Food & Old Bangalore Charm | BangaloreLife",
  description: "Explore Jayanagar, one of Bangalore's best-planned neighborhoods. 4th Block shopping complex, traditional eateries, and authentic South Bangalore vibes.",
  keywords: "jayanagar bangalore, jayanagar 4th block, jayanagar shopping, jayanagar restaurants, south bangalore",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "jayanagar").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

export const revalidate = 86400;

export default async function JayanagarPage() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Jayanagar</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Jayanagar</h1>
          <p className="text-xl text-violet-400 mb-4">Shopping, Food & Old Bangalore Charm</p>
          <p className="text-lg text-zinc-400 max-w-3xl">One of Bangalore&apos;s first planned layouts from the 1940s, Jayanagar retains its charm with tree-lined avenues, the famous 4th Block shopping complex, and some of the city&apos;s best traditional restaurants.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80" alt="Jayanagar Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🛍️ Known For</h3>
            <p className="text-zinc-400 text-sm">4th Block Complex, Janatha Bazaar, South Indian food, saris</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🍽️ Must-Try</h3>
            <p className="text-zinc-400 text-sm">MTR, Vidyarthi Bhavan, Brahmin&apos;s Bar, Basaveshwara Katte</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🚇 Getting There</h3>
            <p className="text-zinc-400 text-sm">Jayanagar Metro (Green Line), well connected from South Bangalore</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About Jayanagar</h2>
          <div className="prose prose-invert max-w-none">
            <p>Jayanagar is organized into numbered blocks (1st to 9th), with 4th Block being the commercial heart. The neighborhood is known for its Bangalore traditionalism — you&apos;ll find old homes, temple streets, and a pace of life that feels removed from the startup chaos.</p>
            <h3>4th Block Complex</h3>
            <p>One of Bangalore&apos;s oldest and most beloved shopping destinations. Great for saris, gold jewelry, traditional wear, and everyday essentials. The atmosphere is quintessentially Bangalore.</p>
            <h3>Food Heritage</h3>
            <p>Home to legendary restaurants that have defined South Indian cuisine in Bangalore. MTR&apos;s rava idli was invented here. Vidyarthi Bhavan&apos;s masala dosa is a pilgrimage for food lovers.</p>
          </div>
        </section>

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
            <Link href="/neighborhoods/jp-nagar" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">JP Nagar</Link>
            <Link href="/neighborhoods/btm-layout" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">BTM Layout</Link>
            <Link href="/neighborhoods/koramangala" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Koramangala</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
