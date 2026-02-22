import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Cafes in Bangalore (2026) — Coffee, Work & Vibes",
  description: "The best cafes in Bangalore for coffee, work, and good vibes. Third Wave, specialty roasters, and the perfect work-from-cafe spots.",
  keywords: "best cafes bangalore, third wave coffee bangalore, specialty coffee bangalore, work from cafe bangalore, bangalore coffee shops",
};

const cafes = [
  {
    name: "Third Wave Coffee",
    area: "Multiple Locations",
    type: "Specialty Chain",
    description: "Bangalore's homegrown specialty coffee chain. Consistent quality, good Wi-Fi, and the unofficial office of half the city's freelancers.",
    forWork: true,
    mustTry: ["Cold Brew", "Flat White", "Pour Over"],
    price: "₹300-500 for two",
  },
  {
    name: "Blue Tokai Coffee",
    area: "Multiple Locations",
    type: "Specialty Roaster",
    description: "Indian specialty coffee pioneers. Their single-origin beans are exceptional, and the cafes are beautifully designed.",
    forWork: true,
    mustTry: ["Estate coffees", "Cold brew"],
    price: "₹400-600 for two",
  },
  {
    name: "Dyu Art Cafe",
    area: "Koramangala",
    type: "Art Cafe",
    description: "Art gallery meets cafe. Quirky interiors, good coffee, and art on every wall. More for hanging out than grinding.",
    forWork: false,
    mustTry: ["Iced coffee", "Sandwiches"],
    price: "₹500-700 for two",
  },
  {
    name: "Matteo Coffea",
    area: "Church Street",
    type: "European Cafe",
    description: "Old-world European charm. The space feels like a Parisian cafe, and the pastries match the setting.",
    forWork: false,
    mustTry: ["Espresso", "Croissants"],
    price: "₹400-600 for two",
  },
  {
    name: "Hatti Kaapi",
    area: "Multiple Locations",
    type: "Traditional",
    description: "Filter coffee the traditional way. Standing-only in most locations, pure Bangalore authenticity.",
    forWork: false,
    mustTry: ["Filter Coffee"],
    price: "₹50-100",
  },
  {
    name: "Indian Coffee House",
    area: "MG Road",
    type: "Heritage",
    description: "Colonial-era cafe with waiters in turbans. The coffee is basic, but the atmosphere is pure history.",
    forWork: false,
    mustTry: ["South Indian Coffee", "Snacks"],
    price: "₹100-200 for two",
  },
  {
    name: "Roastery Coffee House",
    area: "Indiranagar",
    type: "Specialty",
    description: "Exposed roasting, single-origin focus, and serious about the craft. For the coffee nerds.",
    forWork: true,
    mustTry: ["Single Origin Pour Over"],
    price: "₹400-600 for two",
  },
  {
    name: "Glen's Bakehouse",
    area: "Multiple Locations",
    type: "Bakery Cafe",
    description: "Legendary cakes meet solid coffee. The carrot cake alone justifies a visit.",
    forWork: false,
    mustTry: ["Carrot Cake", "Latte"],
    price: "₹500-700 for two",
  },
];

export default function BestCafesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80" 
              alt="Bangalore cafes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-amber-400 font-medium mb-2">Food & Drink Guide</p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                Best Cafes in Bangalore
              </h1>
              <p className="text-lg text-white/90">Coffee, work, and good vibes (2026)</p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              Bangalore's cafe culture runs deep. From <strong>filter coffee</strong> served in 
              steel tumblers at heritage cafes to <strong>single-origin pour overs</strong> at 
              specialty roasters — the city takes its coffee seriously.
            </p>
            <p>
              Whether you need a spot to work, a place for a first date, or just really good 
              coffee, these are the cafes worth knowing.
            </p>
          </section>

          {/* Work-Friendly Cafes */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">💻 Best for Working</h2>
            <div className="space-y-4">
              {cafes.filter(c => c.forWork).map((cafe) => (
                <div key={cafe.name} className="bg-white rounded-xl p-5 border border-stone-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900">{cafe.name}</h3>
                      <p className="text-stone-500 text-sm">{cafe.area} • {cafe.type}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">WiFi ✓</span>
                  </div>
                  <p className="text-stone-600 mt-2 text-sm">{cafe.description}</p>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-amber-600">Try: {cafe.mustTry.join(", ")}</span>
                    <span className="text-stone-500">{cafe.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Vibe Cafes */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">☕ Best for Vibes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {cafes.filter(c => !c.forWork).map((cafe) => (
                <div key={cafe.name} className="bg-white rounded-xl p-5 border border-stone-200">
                  <h3 className="font-semibold text-stone-900">{cafe.name}</h3>
                  <p className="text-stone-500 text-sm">{cafe.area} • {cafe.type}</p>
                  <p className="text-stone-600 mt-2 text-sm">{cafe.description}</p>
                  <p className="text-amber-600 text-sm mt-2">Try: {cafe.mustTry.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Related</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/best-brunch-bangalore" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Best Brunch →
              </Link>
              <Link href="/neighborhoods/church-street" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Church Street →
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
