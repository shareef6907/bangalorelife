import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Vegan & Plant-Based Restaurants in Bangalore 2025 | BangaloreLife",
  description: "Find vegan and plant-based restaurants in Bangalore. From raw cafes to vegan fine dining, discover the best meat-free options.",
  keywords: "vegan restaurants bangalore, plant based bangalore, vegan cafe bangalore, vegetarian bangalore, healthy food bangalore",
};

export default function VeganPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/restaurants" className="hover:text-white">Restaurants</Link><span>/</span>
          <span className="text-white">Vegan</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vegan & Plant-Based in Bangalore</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            Bangalore&apos;s vegan scene is growing rapidly. From dedicated plant-based cafes to 
            vegan-friendly restaurants, here are your best options.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">🌱 Types</h3>
            <p className="text-zinc-400 text-sm">Fully vegan, vegan-friendly, raw food, organic cafes</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💡 Tip</h3>
            <p className="text-zinc-400 text-sm">Most South Indian food is naturally vegetarian/vegan</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">📍 Best Areas</h3>
            <p className="text-zinc-400 text-sm">Indiranagar, Koramangala, HSR Layout</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Dedicated Vegan Spots</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>Carrots</h3>
            <p>One of Bangalore&apos;s first fully vegan restaurants. Creative menu with burgers, pastas, and desserts.</p>
            
            <h3>The Vegan Kitchen (TVK)</h3>
            <p>Small but mighty. Excellent vegan versions of Indian classics.</p>
            
            <h3>Earthen Oven</h3>
            <p>Organic, plant-based with a focus on healthy eating.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Vegan-Friendly Restaurants</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>Smoke House Deli</h3>
            <p>European cafe with clear vegan labeling and good options.</p>
            
            <h3>Third Wave Coffee</h3>
            <p>Oat milk and almond milk available. Some vegan food options.</p>
            
            <h3>Most South Indian Restaurants</h3>
            <p>Traditional South Indian food (dosa, idli, sambar) is often naturally vegan. Just confirm no ghee/curd.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tips for Vegans in Bangalore</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-zinc-300">🥛 Ask for &quot;no curd, no ghee&quot; at Indian restaurants</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-zinc-300">🍳 Confirm no egg wash on breads/pastries</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-zinc-300">📱 Use HappyCow app for verified vegan spots</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-4">
              <p className="text-zinc-300">🛒 Nature&apos;s Basket and Organic stores have vegan products</p>
            </div>
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/restaurants/south-indian" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">South Indian</Link>
            <Link href="/guides/best-cafes-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Best Cafes</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
