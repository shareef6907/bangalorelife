import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Bellandur Bangalore — ORR Tech Hub, Restaurants & Lake | BangaloreLife",
  description: "Explore Bellandur on the Outer Ring Road. Major tech parks, growing restaurant scene, and one of Bangalore's largest lakes.",
  keywords: "bellandur bangalore, bellandur lake, bellandur restaurants, outer ring road, ecospace bellandur",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "bellandur").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

export const revalidate = 86400;

export default async function BellandurPage() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Bellandur</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bellandur</h1>
          <p className="text-xl text-violet-400 mb-4">ORR Tech Hub & Growing Community</p>
          <p className="text-lg text-zinc-400 max-w-3xl">A key junction on the Outer Ring Road, Bellandur hosts major tech parks like RMZ Ecospace and has evolved into a residential hub with improving amenities. The lake, while controversial for pollution issues, remains a landmark.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" alt="Bellandur Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🏢 Tech Parks</h3>
            <p className="text-zinc-400 text-sm">RMZ Ecospace, Cessna Business Park, Embassy Tech Village</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🍽️ Dining</h3>
            <p className="text-zinc-400 text-sm">Growing restaurant scene, good delivery ecosystem</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🚗 Connectivity</h3>
            <p className="text-zinc-400 text-sm">ORR junction, connects to HSR, Marathahalli, Sarjapur</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About Bellandur</h2>
          <div className="prose prose-invert max-w-none">
            <p>Bellandur sits at the intersection of the Outer Ring Road and Sarjapur Road, making it strategically located for IT professionals working across East Bangalore.</p>
            <h3>Living Here</h3>
            <p>Mix of older villages and new apartment complexes. More affordable than Koramangala or Indiranagar while being well-connected. Good for working professionals who want ORR access.</p>
            <h3>The Lake</h3>
            <p>Bellandur Lake is one of Bangalore&apos;s largest, though it has faced environmental challenges. Restoration efforts are underway, and the area around it is being developed.</p>
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
            <Link href="/neighborhoods/marathahalli" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Marathahalli</Link>
            <Link href="/neighborhoods/hsr-layout" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">HSR Layout</Link>
            <Link href="/neighborhoods/sarjapur-road" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Sarjapur Road</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
