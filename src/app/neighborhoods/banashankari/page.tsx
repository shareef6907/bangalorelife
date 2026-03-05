import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Banashankari Bangalore — Temple Town & South Bangalore Living | BangaloreLife",
  description: "Explore Banashankari, known for the famous temple, ISKON, and authentic South Bangalore residential character.",
  keywords: "banashankari bangalore, banashankari temple, banashankari restaurants, south bangalore, bsk stages",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "banashankari").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

export const revalidate = 86400;

export default async function BanashankariPage() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Banashankari</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Banashankari</h1>
          <p className="text-xl text-violet-400 mb-4">Temple Town & Traditional South Bangalore</p>
          <p className="text-lg text-zinc-400 max-w-3xl">Named after the Banashankari Amma Temple, this area represents authentic South Bangalore culture. Known for religious significance, family-oriented living, and traditional South Indian food.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80" alt="Banashankari Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🛕 Landmarks</h3>
            <p className="text-zinc-400 text-sm">Banashankari Temple, ISKCON Temple, Big Bull Temple nearby</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🏠 Character</h3>
            <p className="text-zinc-400 text-sm">Traditional residential, family-oriented, BSK 1st-6th Stages</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🚇 Getting There</h3>
            <p className="text-zinc-400 text-sm">Banashankari Metro (Green Line), BMTC bus hub</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About Banashankari</h2>
          <div className="prose prose-invert max-w-none">
            <h3>Banashankari Temple</h3>
            <p>One of Bangalore&apos;s most important temples, dedicated to Goddess Banashankari (a form of Parvati). The temple and surrounding area come alive during festivals, especially Navaratri.</p>
            <h3>The Stages</h3>
            <p>Banashankari is divided into six stages, developed progressively. Each stage has its own character, with 2nd and 3rd stages being more developed commercially.</p>
            <h3>BMTC Hub</h3>
            <p>Banashankari bus station is one of Bangalore&apos;s largest, connecting to areas across the city. The Metro has further improved connectivity.</p>
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
            <Link href="/neighborhoods/jayanagar" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Jayanagar</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
