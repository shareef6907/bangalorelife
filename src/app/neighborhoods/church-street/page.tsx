import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Church Street Guide — Culture, Coffee & Cocktails (2026)",
  description: "Church Street Bangalore guide - bookshops, cafes, cocktails, and old Bangalore charm. A pedestrian-friendly cultural hub.",
  keywords: "church street bangalore, church street cafes, koshys bangalore, church street shopping, bangalore bookshops",
};

const mustVisit = [
  { name: "Koshy's", type: "Heritage Cafe", description: "Bangalore institution since 1940. Politicians, artists, writers — everyone comes here." },
  { name: "Church Street Social", type: "Cafe Bar", description: "Work-by-day, drinks-by-night in a heritage building." },
  { name: "Blossoms Book House", type: "Bookshop", description: "Used books treasure trove. You'll lose hours here." },
  { name: "The Only Place", type: "Steakhouse", description: "Old-school steaks in an old-school setting." },
];

export default function ChurchStreetPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80" 
              alt="Church Street Bangalore"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-emerald-400 font-medium mb-2">Neighborhood Guide</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Church Street</h1>
              <p className="text-xl text-white/90">Culture, Coffee & Cocktails</p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              <strong>Church Street</strong> is a pedestrian-friendly slice of old Bangalore charm 
              in the heart of the city. Bookstores, heritage cafes, boutiques, and some of the 
              city's most interesting bars line this walkable stretch.
            </p>
            <p>
              Start with coffee at <strong>Koshy's</strong> — a 1940s institution where 
              politicians, artists, and writers have held court for generations. Browse 
              books at <strong>Blossoms</strong>, and as evening falls, the street transforms 
              with cocktail bars and live venues coming alive.
            </p>
            <p>
              It's also connected to MG Road and Brigade Road, making it perfect for an 
              afternoon-to-evening exploration.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">📍 Must Visit</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mustVisit.map((spot) => (
                <div key={spot.name} className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-900">{spot.name}</h3>
                  <p className="text-emerald-600 text-sm">{spot.type}</p>
                  <p className="text-stone-600 text-sm mt-2">{spot.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 bg-stone-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">The Perfect Church Street Day</h2>
            <ol className="space-y-2 text-stone-700 text-sm">
              <li>1. <strong>3pm:</strong> Coffee and conversation at Koshy's</li>
              <li>2. <strong>4pm:</strong> Browse Blossoms Book House</li>
              <li>3. <strong>5pm:</strong> Window shop the boutiques</li>
              <li>4. <strong>6pm:</strong> Sundowners at Church Street Social</li>
              <li>5. <strong>8pm:</strong> Walk to MG Road for dinner</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-stone-900 mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["Books", "Coffee", "Heritage", "Walking", "Afternoon Dates", "Culture"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Nearby</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/neighborhoods/mg-road-brigade-road" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                MG Road & Brigade →
              </Link>
              <Link href="/neighborhoods/indiranagar" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Indiranagar →
              </Link>
            </div>
          </section>

          <div className="text-center text-sm text-stone-500">Last updated: February 2026</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
