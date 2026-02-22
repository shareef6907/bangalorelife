import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hennur & Kalyan Nagar Guide — Brewery Belt of Bangalore (2026)",
  description: "Hennur and Kalyan Nagar - North Bangalore's brewery corridor with Byg Brewski, Uru Brewpark, and massive outdoor brewing spaces.",
  keywords: "hennur bangalore, kalyan nagar bangalore, byg brewski hennur, uru brewpark, north bangalore breweries",
};

const breweries = [
  { name: "Byg Brewski (Flagship)", type: "Mega Brewery", description: "One of India's largest brewery spaces. Lake views, multiple bars, massive capacity.", price: "₹1,400" },
  { name: "Uru Brewpark", type: "Brewery", description: "Expansive grounds, quality German-style brewing, beautiful landscaping.", price: "₹1,500" },
  { name: "Red Rhino", type: "Brewery", description: "Colorful and playful with solid easy-drinking beers.", price: "₹1,200" },
  { name: "Gilly's Restobar", type: "Pub", description: "Live music, good food, energetic crowd.", price: "₹1,000" },
];

export default function HennurPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=1920&q=80" 
              alt="Hennur Breweries"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-emerald-400 font-medium mb-2">Neighborhood Guide</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Hennur & Kalyan Nagar</h1>
              <p className="text-xl text-white/90">The Brewery Belt</p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-stone-700 leading-relaxed">
              North Bangalore's <strong>brewery corridor</strong>. Hennur and Kalyan Nagar have 
              become a destination for anyone who loves craft beer and outdoor drinking spaces.
            </p>
            <p>
              The breweries here think big — <strong>Byg Brewski's flagship</strong> location is 
              one of the largest brewery spaces in India. <strong>Uru Brewpark</strong> offers 
              beautifully landscaped grounds. These aren't cramped city bars — they're beer 
              destinations with space to breathe.
            </p>
            <p>
              Yes, it's a bit of a drive from central Bangalore. But on a Sunday afternoon, 
              the journey is worth it.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">🍺 Top Breweries</h2>
            <div className="space-y-4">
              {breweries.map((brewery, i) => (
                <div key={brewery.name} className="bg-white rounded-xl p-5 border border-stone-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-amber-600 font-semibold text-sm">#{i + 1}</span>
                      <h3 className="text-lg font-semibold text-stone-900">{brewery.name}</h3>
                      <p className="text-stone-500 text-sm">{brewery.type}</p>
                    </div>
                    <span className="text-stone-600 text-sm">{brewery.price} for two</span>
                  </div>
                  <p className="text-stone-600 mt-2">{brewery.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h2 className="text-lg font-semibold text-amber-900 mb-4">💡 Tips for Visiting</h2>
            <ul className="space-y-2 text-amber-800 text-sm">
              <li>• <strong>Plan for travel:</strong> It's 45-60 mins from Koramangala in traffic.</li>
              <li>• <strong>Best time:</strong> Sunday afternoon — arrive by 1pm, leave by sunset.</li>
              <li>• <strong>Parking:</strong> All spots have ample parking.</li>
              <li>• <strong>Groups:</strong> Perfect for large groups and celebrations.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-lg font-semibold text-stone-900 mb-3">Best For</h2>
            <div className="flex flex-wrap gap-2">
              {["Day Drinking", "Large Groups", "Outdoor Spaces", "Sunday Sessions", "Celebrations"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200">{tag}</span>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-4">Related</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/best-breweries-bangalore" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                All Breweries →
              </Link>
              <Link href="/venues/byg-brewski" className="px-4 py-2 bg-stone-100 rounded-full text-stone-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                Byg Brewski →
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
