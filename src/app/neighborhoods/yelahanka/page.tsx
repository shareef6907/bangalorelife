import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Yelahanka Bangalore — Air Force Base, Airport Proximity & Quiet Living | BangaloreLife",
  description: "Explore Yelahanka in North Bangalore. Known for the Air Force base, airport proximity, and peaceful residential neighborhoods.",
  keywords: "yelahanka bangalore, yelahanka air force, yelahanka restaurants, north bangalore, yelahanka new town",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "yelahanka").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

export const revalidate = 86400;

export default async function YelahankaPage() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Yelahanka</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Yelahanka</h1>
          <p className="text-xl text-violet-400 mb-4">North Bangalore&apos;s Peaceful Hub</p>
          <p className="text-lg text-zinc-400 max-w-3xl">Home to the Indian Air Force&apos;s Yelahanka base and close to the international airport, this area offers quieter living away from the city center while maintaining good connectivity.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80" alt="Yelahanka Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">✈️ Airport</h3>
            <p className="text-zinc-400 text-sm">~15 km to KIA, perfect for frequent travelers</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🛩️ Air Force</h3>
            <p className="text-zinc-400 text-sm">IAF Yelahanka base, Aero India venue</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🏠 Living</h3>
            <p className="text-zinc-400 text-sm">Yelahanka New Town, affordable housing, gated communities</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About Yelahanka</h2>
          <div className="prose prose-invert max-w-none">
            <p>Yelahanka has evolved from a satellite town to an integrated part of Bangalore. The area is split between Old Yelahanka (traditional) and Yelahanka New Town (planned residential).</p>
            <h3>Aero India</h3>
            <p>Every two years, Yelahanka hosts Aero India at the Air Force station — one of Asia&apos;s largest aerospace exhibitions.</p>
            <h3>Living Here</h3>
            <p>More affordable than central Bangalore with good infrastructure. Popular with airport workers, defense personnel, and those who prefer quieter surroundings.</p>
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
            <Link href="/neighborhoods/hebbal" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Hebbal</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
