import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Frazer Town Bangalore — Biryani Capital & Culinary Heritage | BangaloreLife",
  description: "Explore Frazer Town, Bangalore's food destination. Famous for biryani, kebabs, and diverse culinary heritage from the Anglo-Indian community.",
  keywords: "frazer town bangalore, frazer town biryani, frazer town restaurants, shivaji nagar, bangalore food street",
};

async function getVenues() {
  const { data } = await supabase.from("venues").select("name, slug, type, google_rating").eq("neighborhood", "frazer-town").order("google_rating", { ascending: false }).limit(20);
  return data || [];
}

export const revalidate = 86400;

export default async function FrazerTownPage() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/neighborhoods" className="hover:text-white">Neighborhoods</Link><span>/</span>
          <span className="text-white">Frazer Town</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frazer Town</h1>
          <p className="text-xl text-violet-400 mb-4">Bangalore&apos;s Biryani Capital</p>
          <p className="text-lg text-zinc-400 max-w-3xl">A culinary pilgrimage site for food lovers. Frazer Town&apos;s Anglo-Indian and Muslim heritage has created a unique food scene featuring legendary biryani houses, kebab joints, and multicultural eateries.</p>
        </header>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 bg-zinc-800">
          <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&q=80" alt="Frazer Town Food" className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🍖 Famous For</h3>
            <p className="text-zinc-400 text-sm">Biryani, kebabs, Mughlai food, bakeries, Ramadan specials</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🕌 Heritage</h3>
            <p className="text-zinc-400 text-sm">Anglo-Indian history, Muslim community, churches, mosques</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">📍 Location</h3>
            <p className="text-zinc-400 text-sm">Near Shivaji Nagar, ~5 km from MG Road</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Must-Try Food</h2>
          <div className="prose prose-invert max-w-none">
            <h3>Legendary Biryani Houses</h3>
            <ul>
              <li><strong>Meghana Foods:</strong> Consistently great Andhra-style biryani</li>
              <li><strong>Shivaji Military Hotel:</strong> Old-school mutton biryani</li>
              <li><strong>Empire:</strong> Late-night biryani institution</li>
            </ul>
            <h3>Kebabs & Grills</h3>
            <p>The area around Mosque Road comes alive in the evening with kebab stalls and grill houses. During Ramadan, this becomes one of Bangalore&apos;s most exciting food destinations.</p>
            <h3>Bakeries</h3>
            <p>Albert Bakery and others carry on the Anglo-Indian baking tradition — try the puffs, cakes, and savory pastries.</p>
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
            <Link href="/neighborhoods/mg-road-brigade-road" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">MG Road</Link>
            <Link href="/neighborhoods/indiranagar" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Indiranagar</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
