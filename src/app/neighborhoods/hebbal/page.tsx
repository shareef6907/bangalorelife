import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Hebbal Bangalore — Lake Views, Malls & North Bangalore Hub | BangaloreLife",
  description: "Explore Hebbal, the gateway to North Bangalore. Famous for Hebbal Lake, Esteem Mall, good connectivity, and emerging dining scene.",
  keywords: "hebbal bangalore, hebbal lake, esteem mall hebbal, hebbal restaurants, north bangalore",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "hebbal").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

async function getMalls() {
  const { data } = await supabase.from("malls").select("name, slug, google_rating").eq("neighborhood", "hebbal").limit(5);
  return data || [];
}

export const revalidate = 86400;

export default async function HebbalPage() {
  const [venues, malls] = await Promise.all([getVenues(), getMalls()]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Hebbal</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hebbal</h1>
          <p className="text-xl text-violet-400 mb-4">Lake Views & North Bangalore Gateway</p>
          <p className="text-lg text-zinc-400 max-w-3xl">A strategic junction connecting to the airport, Hebbal is known for its scenic lake, improving infrastructure, and growing commercial developments. Perfect for those who want airport accessibility with urban amenities.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Hebbal Lake Bangalore" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🏞️ Landmarks</h3>
            <p className="text-zinc-400 text-sm">Hebbal Lake, Esteem Mall, Manyata Tech Park</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">✈️ Airport Access</h3>
            <p className="text-zinc-400 text-sm">~25 km to KIA, direct flyover connectivity</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🚗 Connectivity</h3>
            <p className="text-zinc-400 text-sm">ORR junction, Bellary Road, upcoming Metro</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About Hebbal</h2>
          <div className="prose prose-invert max-w-none">
            <h3>Hebbal Lake</h3>
            <p>One of Bangalore&apos;s most picturesque lakes, Hebbal Lake is great for birdwatching and evening walks. The lakefront area is being developed with restaurants and promenades.</p>
            <h3>Living Here</h3>
            <p>Popular with frequent flyers and those working in North Bangalore tech parks. Good mix of apartments and gated communities. The flyover has dramatically improved commute times.</p>
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
            <Link href="/neighborhoods/yelahanka" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Yelahanka</Link>
            <Link href="/neighborhoods/hennur-kalyan-nagar" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Hennur</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
