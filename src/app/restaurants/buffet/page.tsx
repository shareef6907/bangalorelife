import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Buffet Restaurants in Bangalore 2025 | BangaloreLife",
  description: "Find the best buffet restaurants in Bangalore. From luxury hotel spreads to affordable unlimited thalis, discover where to eat all you can.",
  keywords: "buffet restaurants bangalore, unlimited food bangalore, hotel buffet bangalore, sunday brunch bangalore",
};

export default function BuffetPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link><span>/</span>
          <Link href="/restaurants" className="hover:text-white">Restaurants</Link><span>/</span>
          <span className="text-white">Buffet</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Buffet Restaurants in Bangalore</h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            All-you-can-eat options from luxury hotel spreads to affordable unlimited meals. 
            Perfect for hungry appetites and group celebrations.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">💰 Price Range</h3>
            <p className="text-zinc-400 text-sm">₹300-500 (basic) to ₹3,000+ (luxury hotel)</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">⏰ Best Time</h3>
            <p className="text-zinc-400 text-sm">Sunday brunches (12-4 PM) are most popular</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3 className="font-semibold mb-2">📅 Reservations</h3>
            <p className="text-zinc-400 text-sm">Book ahead for hotel brunches, especially weekends</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Luxury Buffets</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>ITC Gardenia — Cubbon Pavilion</h3>
            <p>Massive spread covering cuisines from around the world. Live counters, premium ingredients. ₹3,500+ with drinks.</p>
            
            <h3>Taj West End</h3>
            <p>Legendary Sunday brunch in heritage surroundings. ₹4,000+ with bubbles.</p>
            
            <h3>JW Marriott — JW Kitchen</h3>
            <p>Family-friendly with excellent variety. Great dessert section. ₹3,000+</p>
            
            <h3>The Leela Palace</h3>
            <p>Opulent brunch experience. Champagne flowing. ₹5,000+</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Budget-Friendly Unlimited</h2>
          <div className="prose prose-invert max-w-none mb-8">
            <h3>Rajdhani</h3>
            <p>Unlimited Gujarati and Rajasthani thali. Great value at ₹500-700 per person.</p>
            
            <h3>Barbeque Nation</h3>
            <p>Tableside grills and unlimited buffet. Popular for birthdays. ₹800-1,200.</p>
            
            <h3>AB&apos;s Absolute Barbecue</h3>
            <p>Similar to BBQ Nation with live grills. Good vegetarian options too.</p>
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-brunches-bangalore" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm">Brunch Guide</Link>
            <Link href="/restaurants/fine-dining" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm">Fine Dining</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
