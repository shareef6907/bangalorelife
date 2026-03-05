import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const metadata: Metadata = {
  title: "Best Rooftop Restaurants & Bars in Bangalore 2025 | BangaloreLife",
  description: "Discover Bangalore's best rooftop dining experiences. Stunning views, craft cocktails, and great food at the city's top rooftop venues.",
  keywords: "rooftop restaurants bangalore, rooftop bars bangalore, skyye lounge, high ultra lounge, rooftop dining bangalore",
};

async function getVenues() {
  const { data } = await supabase
    .from("venues")
    .select("name, slug, neighborhood, google_rating, type")
    .or("type.eq.restaurant,type.eq.bar,type.eq.lounge")
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(30);
  return data || [];
}

export const revalidate = 86400;

export default async function RooftopPage() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/restaurants" className="hover:text-white">Restaurants</Link><span>/</span>
          <span className="text-white">Rooftop</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rooftop Restaurants & Bars</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            Bangalore&apos;s perfect weather makes rooftop dining a year-round pleasure. 
            From sunset cocktails to starlit dinners, here are the best spots with views.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🌅 Best Time</h3>
            <p className="text-zinc-400 text-sm">Sunset hours (5:30-7 PM) for golden hour magic</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💰 Budget</h3>
            <p className="text-zinc-400 text-sm">₹1,500-4,000 for two with drinks</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">📍 Best Areas</h3>
            <p className="text-zinc-400 text-sm">UB City, MG Road, Indiranagar, Koramangala</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Rooftops</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>Skyye Lounge — UB City</h3>
            <p>The most iconic rooftop in Bangalore. Stunning 360° views from atop UB City. Great for sundowners. <Link href="/venues/skyye-lounge" className="text-violet-400">View Details →</Link></p>
            
            <h3>High Ultra Lounge — World Trade Center</h3>
            <p>26th floor views and premium cocktails. One of the highest rooftops in the city.</p>
            
            <h3>Loft 38 — Indiranagar</h3>
            <p>Trendy rooftop with great music and crowd. More club than restaurant late night.</p>
            
            <h3>13th Floor — Barton Centre</h3>
            <p>MG Road views and reliable food. Good for groups and celebrations.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">More Rooftop Venues ({venues.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((v: any) => (
              <Link key={v.slug} href={`/venues/${v.slug}`} className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors">
                <div className="font-medium truncate">{v.name}</div>
                <div className="text-sm text-zinc-500 capitalize mt-1">{v.neighborhood?.replace(/-/g, ' ')}</div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="capitalize text-zinc-500">{v.type}</span>
                  {v.google_rating && <span className="text-yellow-400">★ {v.google_rating}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-rooftop-bars-bangalore" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm">Rooftop Bars Guide</Link>
            <Link href="/restaurants/fine-dining" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Fine Dining</Link>
            <Link href="/nightlife" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Nightlife</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
