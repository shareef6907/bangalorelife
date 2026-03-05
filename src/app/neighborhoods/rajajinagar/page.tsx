import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Rajajinagar Bangalore — Industrial Area Turned Commercial Hub | BangaloreLife",
  description: "Explore Rajajinagar in West Bangalore. Home to Orion Mall, industrial heritage, and excellent Metro connectivity.",
  keywords: "rajajinagar bangalore, orion mall rajajinagar, rajajinagar restaurants, west bangalore, rajajinagar metro",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "rajajinagar").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

async function getMalls() {
  const { data } = await supabase.from("malls").select("name, slug, google_rating").or("neighborhood.eq.rajajinagar,neighborhood.eq.malleshwaram").limit(5);
  return data || [];
}

export const revalidate = 86400;

export default async function RajajinagarPage() {
  const [venues, malls] = await Promise.all([getVenues(), getMalls()]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Rajajinagar</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rajajinagar</h1>
          <p className="text-xl text-violet-400 mb-4">Industrial Heritage Meets Modern Malls</p>
          <p className="text-lg text-zinc-400 max-w-3xl">West Bangalore&apos;s commercial hub, Rajajinagar has evolved from an industrial area to a shopping destination anchored by Orion Mall. Excellent Metro connectivity makes it accessible from across the city.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80" alt="Rajajinagar Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🛍️ Shopping</h3>
            <p className="text-zinc-400 text-sm">Orion Mall, Lulu Mall nearby, Industrial Estate</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🚇 Metro</h3>
            <p className="text-zinc-400 text-sm">Rajajinagar Metro (Green Line), excellent connectivity</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🏭 Character</h3>
            <p className="text-zinc-400 text-sm">Mix of old industrial area and new commercial development</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About Rajajinagar</h2>
          <div className="prose prose-invert max-w-none">
            <h3>Orion Mall</h3>
            <p>One of Bangalore&apos;s largest malls, Orion Mall has transformed this area into a weekend destination. IMAX cinema, diverse dining, and major brands. <Link href="/malls/orion-mall" className="text-violet-400">See full guide →</Link></p>
            <h3>Industrial Estate</h3>
            <p>Rajajinagar Industrial Estate still operates but is gradually making way for commercial and residential development. Some interesting warehouse-style venues are emerging.</p>
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
            <Link href="/neighborhoods/malleshwaram" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Malleshwaram</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
