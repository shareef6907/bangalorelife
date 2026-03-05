import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Italian Restaurants in Bangalore 2025 | BangaloreLife",
  description: "Find the best Italian restaurants in Bangalore. From authentic wood-fired pizzas to handmade pasta, discover top Italian dining spots.",
  keywords: "italian restaurants bangalore, pizza bangalore, pasta bangalore, best italian food bangalore, wood fired pizza",
};

export default function ItalianPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/restaurants" className="hover:text-white">Restaurants</Link><span>/</span>
          <span className="text-white">Italian</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Italian Restaurants in Bangalore</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            From wood-fired Neapolitan pizzas to handmade pasta, Bangalore has excellent Italian options. 
            Here&apos;s where to find the best.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Picks</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>Ottimo — ITC Gardenia</h3>
            <p>Premium Italian with handmade pasta and wood-fired pizzas. The truffle risotto is exceptional. Business lunch favorite.</p>
            
            <h3>Toscano — UB City</h3>
            <p>Upscale Italian in the UB City complex. Great for special occasions.</p>
            
            <h3>The Pasta Bowl Company</h3>
            <p>Casual and affordable pasta spot with generous portions. Multiple locations.</p>
            
            <h3>Smoke House Deli</h3>
            <p>Not purely Italian but excellent pizzas and European fare. Great brunch spot.</p>
            
            <h3>Little Italy</h3>
            <p>Vegetarian Italian chain with reliable pizzas and pastas.</p>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🍕 Must-Try</h3>
            <p className="text-zinc-400 text-sm">Margherita Pizza, Carbonara, Risotto, Tiramisu, Bruschetta</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💰 Price Range</h3>
            <p className="text-zinc-400 text-sm">₹400-800 (casual) to ₹2,000+ (fine dining)</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">📍 Best Areas</h3>
            <p className="text-zinc-400 text-sm">Indiranagar, Koramangala, UB City, Whitefield</p>
          </div>
        </div>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Explore Other Cuisines</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/restaurants/fine-dining" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Fine Dining</Link>
            <Link href="/restaurants/chinese" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Chinese</Link>
            <Link href="/guides/best-brunches-bangalore" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm">Best Brunches</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
