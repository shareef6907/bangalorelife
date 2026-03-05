import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "BTM Layout Bangalore — Affordable Living & Growing Food Scene | BangaloreLife",
  description: "Explore BTM Layout, Bangalore's affordable residential hub. Great connectivity, emerging cafes, and proximity to Silk Board and ORR.",
  keywords: "btm layout bangalore, btm restaurants, btm cafes, silk board area, south bangalore affordable",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "btm-layout").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

export const revalidate = 86400;

export default async function BTMLayoutPage() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">BTM Layout</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BTM Layout</h1>
          <p className="text-xl text-violet-400 mb-4">Affordable Living & Emerging Scene</p>
          <p className="text-lg text-zinc-400 max-w-3xl">BTM (Byrasandra, Tavarekere, Madiwala) Layout offers affordable housing with excellent connectivity to both Silk Board junction and Koramangala. A rising neighborhood with new cafes and restaurants opening regularly.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80" alt="BTM Layout Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💰 Why BTM?</h3>
            <p className="text-zinc-400 text-sm">Affordable rent, young crowd, close to Koramangala & HSR</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🍽️ Food Scene</h3>
            <p className="text-zinc-400 text-sm">Growing cafes, good delivery options, local favorites</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🚇 Getting There</h3>
            <p className="text-zinc-400 text-sm">Silk Board Metro (Yellow Line), ORR access, bus connectivity</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About BTM Layout</h2>
          <div className="prose prose-invert max-w-none">
            <p>BTM Layout is organized into stages (1st Stage, 2nd Stage). The area sits between Jayanagar and Koramangala, making it convenient for those working in either area.</p>
            <h3>Living Here</h3>
            <p>Popular with students, young professionals, and startups looking for affordable space. The neighborhood has a residential feel but benefits from proximity to Koramangala&apos;s restaurants and nightlife.</p>
            <h3>Silk Board Junction</h3>
            <p>Infamous for traffic, but the new Metro has improved things significantly. Plan your commute times accordingly.</p>
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
            <Link href="/neighborhoods/koramangala" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Koramangala</Link>
            <Link href="/neighborhoods/hsr-layout" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">HSR Layout</Link>
            <Link href="/neighborhoods/jayanagar" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Jayanagar</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
