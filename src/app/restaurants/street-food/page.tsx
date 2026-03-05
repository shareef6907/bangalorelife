import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Street Food in Bangalore 2025 | BangaloreLife",
  description: "Discover Bangalore's best street food spots. From VV Puram food street to local chaat corners, find authentic street eats across the city.",
  keywords: "street food bangalore, vv puram food street, chaat bangalore, bangalore food stalls, cheap eats bangalore",
};

export default function StreetFoodPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/restaurants" className="hover:text-white">Restaurants</Link><span>/</span>
          <span className="text-white">Street Food</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Street Food in Bangalore</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            From VV Puram&apos;s legendary food street to local chaat corners, Bangalore&apos;s street food 
            scene is diverse and delicious. Here&apos;s where to find the best bites.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🍽️ Must-Try</h3>
            <p className="text-zinc-400 text-sm">Dosa, Pani Puri, Bhel, Pav Bhaji, Gobi Manchurian, Kebabs</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💰 Budget</h3>
            <p className="text-zinc-400 text-sm">₹30-150 per item. ₹200-300 for a full meal.</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">⏰ Best Time</h3>
            <p className="text-zinc-400 text-sm">Evening (5-10 PM). Some spots open late night.</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Street Food Destinations</h2>
          <div className="prose prose-invert max-w-none">
            <h3>VV Puram Food Street</h3>
            <p>Bangalore&apos;s most famous food street. Dozens of stalls serving everything from dosas to churros. Best visited 6-9 PM. Try the holige (sweet flatbread) and butter-laden dosas.</p>
            
            <h3>Commercial Street</h3>
            <p>Shopping and eating go hand in hand. Pani puri stalls, juice centers, and local snacks between shopping sprees.</p>
            
            <h3>Gandhi Bazaar</h3>
            <p>Traditional Bangalore street food near Basavanagudi. Great for South Indian snacks and filter coffee.</p>
            
            <h3>Mosque Road (Frazer Town)</h3>
            <p>Kebabs, biryani, and meat delicacies. Especially vibrant during Ramadan with special night markets.</p>
            
            <h3>Shivaji Nagar</h3>
            <p>Raw, authentic, and delicious. Biryani stalls, kebab joints, and no-frills eating.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Street Food Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-zinc-300">🧼 Look for stalls with high turnover — fresher food, less risk</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-zinc-300">💵 Carry cash — most street vendors don&apos;t accept cards</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-zinc-300">🍶 Avoid raw water/ice at street stalls if you have a sensitive stomach</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-zinc-300">🚶 Go with a local for the best hidden spots</p>
            </div>
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-street-food-bangalore" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm">Street Food Guide</Link>
            <Link href="/restaurants/south-indian" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">South Indian</Link>
            <Link href="/neighborhoods/frazer-town" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Frazer Town</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
