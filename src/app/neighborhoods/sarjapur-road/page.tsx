import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Sarjapur Road Bangalore — IT Corridor, New Developments & Family Living | BangaloreLife",
  description: "Explore Sarjapur Road, one of Bangalore's fastest-growing IT corridors. Premium apartments, international schools, and improving infrastructure.",
  keywords: "sarjapur road bangalore, sarjapur restaurants, sarjapur road apartments, total mall sarjapur, east bangalore",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "sarjapur").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

export const revalidate = 86400;

export default async function SarjapurRoadPage() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Sarjapur Road</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sarjapur Road</h1>
          <p className="text-xl text-violet-400 mb-4">Fast-Growing IT Corridor</p>
          <p className="text-lg text-zinc-400 max-w-3xl">One of Bangalore&apos;s newest IT corridors, Sarjapur Road has transformed from farmland to a bustling tech and residential hub. New apartments, international schools, and improving connectivity make it attractive for families.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80" alt="Sarjapur Road Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🏢 Tech Parks</h3>
            <p className="text-zinc-400 text-sm">Wipro, Cisco, Oracle, Intel, multiple IT SEZs</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🏫 Schools</h3>
            <p className="text-zinc-400 text-sm">Inventure Academy, Greenwood High, Oakridge</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🚗 Connectivity</h3>
            <p className="text-zinc-400 text-sm">Connects to ORR, Ring Road under construction</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About Sarjapur Road</h2>
          <div className="prose prose-invert max-w-none">
            <p>Sarjapur Road runs from Koramangala/HSR junction towards Sarjapur town, with most development concentrated in the first 10-15 km stretch.</p>
            <h3>Living Here</h3>
            <p>New premium apartment complexes, gated communities, and villas. More affordable than Koramangala or Whitefield. Great for families with school-going children.</p>
            <h3>Challenges</h3>
            <p>Road infrastructure is catching up with rapid development. Traffic can be unpredictable. Metro connectivity is planned but not yet operational.</p>
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
            <Link href="/neighborhoods/hsr-layout" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">HSR Layout</Link>
            <Link href="/neighborhoods/bellandur" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Bellandur</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
