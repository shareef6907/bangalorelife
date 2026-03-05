import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Marathahalli Bangalore — IT Corridor, Food & Nightlife | BangaloreLife",
  description: "Explore Marathahalli, on the Outer Ring Road IT corridor. Great restaurants, affordable living, and easy access to major tech parks.",
  keywords: "marathahalli bangalore, marathahalli restaurants, outer ring road bangalore, marathahalli pubs",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "marathahalli").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

export const revalidate = 86400;

export default async function MarathahalliPage() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Marathahalli</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Marathahalli</h1>
          <p className="text-xl text-violet-400 mb-4">ORR Tech Corridor & Affordable Living</p>
          <p className="text-lg text-zinc-400 max-w-3xl">Located on the Outer Ring Road, Marathahalli is a bustling hub for IT professionals. Known for affordable accommodation, diverse food options, and proximity to major tech parks like RMZ Ecospace and Prestige Tech Park.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80" alt="Marathahalli Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🍽️ Known For</h3>
            <p className="text-zinc-400 text-sm">Diverse cuisine, affordable eats, late-night food options</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🏢 Nearby Tech Parks</h3>
            <p className="text-zinc-400 text-sm">RMZ Ecospace, Prestige Tech Park, Cessna Business Park</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🚗 Getting There</h3>
            <p className="text-zinc-400 text-sm">On ORR, ~30 min from Koramangala, well connected by bus</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About Marathahalli</h2>
          <div className="prose prose-invert max-w-none">
            <p>Marathahalli sits at a strategic junction on the Outer Ring Road, making it popular with tech professionals working in nearby Bellandur, Whitefield, and Sarjapur areas.</p>
            <h3>Food Scene</h3>
            <p>The area has a great mix of North Indian, South Indian, and Chinese restaurants. Street food is abundant near the bridge. For something special, head to nearby Bellandur or Koramangala.</p>
            <h3>Living Here</h3>
            <ul>
              <li>Rent is more affordable than Koramangala or Indiranagar</li>
              <li>Good connectivity to all major IT hubs</li>
              <li>Traffic can be heavy during peak hours</li>
            </ul>
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
            <Link href="/neighborhoods/bellandur" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Bellandur</Link>
            <Link href="/neighborhoods/whitefield" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Whitefield</Link>
            <Link href="/neighborhoods/koramangala" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Koramangala</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
