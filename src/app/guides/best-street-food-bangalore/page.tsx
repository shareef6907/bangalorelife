import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Street Food in Bangalore (2026) — 15 Must-Try Spots",
  description: "The ultimate Bangalore street food guide. VV Puram, Jayanagar, Commercial Street - where to find the best dosas, chaats, and local specialties.",
  keywords: "bangalore street food, vv puram food street, bangalore chaat, bangalore dosa, best street food bangalore, bangalore local food",
};

const streetFoodSpots = [
  {
    name: "VV Puram Food Street",
    area: "VV Puram",
    specialty: "Everything",
    description: "Bangalore's most famous food street. Dosas, chaats, sweets, and more line both sides of this evening food paradise.",
    mustTry: ["Dosa varieties", "Pani Puri", "Holige", "Maddur Vada"],
    timing: "5pm – 10pm",
  },
  {
    name: "Vidyarthi Bhavan",
    area: "Basavanagudi",
    specialty: "Dosa",
    description: "The legendary dosa since 1943. The crispy, buttery masala dosa here is an institution.",
    mustTry: ["Benne Masala Dosa"],
    timing: "6:30am – 12pm, 3pm – 8pm (Closed Tuesday)",
  },
  {
    name: "Brahmin's Coffee Bar",
    area: "Shankarapuram",
    specialty: "Idli & Coffee",
    description: "No-frills standing-room-only cafe. Soft idlis, filter coffee, and pure tradition since 1958.",
    mustTry: ["Idli Vada", "Filter Coffee"],
    timing: "6am – 12pm, 2:30pm – 8pm",
  },
  {
    name: "Shivaji Military Hotel",
    area: "Jayanagar",
    specialty: "Non-Veg",
    description: "Old-school mutton dishes in a chaotic, authentic setting. The brain fry and liver fry are legendary.",
    mustTry: ["Mutton Dry", "Brain Fry", "Paya"],
    timing: "12pm – 4pm, 6pm – 10pm",
  },
  {
    name: "Commercial Street Chaats",
    area: "Commercial Street",
    specialty: "Chaat",
    description: "Multiple stalls serving up tangy, spicy chaats. Refuel while shopping.",
    mustTry: ["Pani Puri", "Bhel Puri", "Sev Puri"],
    timing: "11am – 9pm",
  },
  {
    name: "CTR (Central Tiffin Room)",
    area: "Malleshwaram",
    specialty: "Dosa",
    description: "Rivals Vidyarthi Bhavan for the best dosa title. The butter-drenched benne dosa is incredible.",
    mustTry: ["Benne Masala Dosa", "Khara Bath"],
    timing: "7am – 12pm, 3:30pm – 8pm",
  },
  {
    name: "SLV",
    area: "Multiple Locations",
    specialty: "South Indian",
    description: "Chain of excellent South Indian restaurants with street food vibes and prices.",
    mustTry: ["Masala Dosa", "Filter Coffee", "Rava Idli"],
    timing: "7am – 10pm",
  },
  {
    name: "Thindi Beedi (Food Street) Gandhi Bazaar",
    area: "Basavanagudi",
    specialty: "Chaat & Sweets",
    description: "Sunday morning market with fresh fruits, flowers, and street food stalls.",
    mustTry: ["Fresh juice", "Churmuri", "Bajji"],
    timing: "Sunday morning 6am – 12pm",
  },
];

export default function StreetFoodPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main>
        <section className="relative">
          <div className="aspect-[3/1] md:aspect-[4/1]">
            <img 
              src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1920&q=80" 
              alt="Bangalore street food"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-orange-400 font-medium mb-2">Food Guide</p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                Best Street Food in Bangalore
              </h1>
              <p className="text-lg text-white/90">15 must-try spots for local flavors (2026)</p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-zinc-300 leading-relaxed">
              Bangalore's street food scene is where the city's culinary soul lives. From the 
              legendary <strong>dosas</strong> of Vidyarthi Bhavan to the evening chaos of 
              <strong>VV Puram Food Street</strong>, these spots serve food that's been 
              perfected over generations.
            </p>
            <p>
              Skip the fancy restaurants for a meal and eat where the locals eat. Your taste 
              buds (and wallet) will thank you.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            {streetFoodSpots.map((spot, i) => (
              <div key={spot.name} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-orange-600 font-semibold text-sm">#{i + 1}</span>
                    <h2 className="text-xl font-semibold text-white">{spot.name}</h2>
                    <p className="text-zinc-500 text-sm">{spot.area} • {spot.specialty}</p>
                  </div>
                </div>
                <p className="text-zinc-300 mb-4">{spot.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {spot.mustTry.map((item) => (
                    <span key={item} className="px-2 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-zinc-500">⏰ {spot.timing}</p>
              </div>
            ))}
          </section>

          <section className="mb-12 bg-orange-50 rounded-xl p-6 border border-orange-200">
            <h2 className="text-lg font-semibold text-orange-900 mb-4">🍽️ Street Food Tips</h2>
            <ul className="space-y-2 text-orange-800 text-sm">
              <li>• <strong>Cash only:</strong> Most street food stalls don't take cards.</li>
              <li>• <strong>Go hungry:</strong> You'll want to try multiple things.</li>
              <li>• <strong>Evening is best:</strong> VV Puram and most food streets come alive after 5pm.</li>
              <li>• <strong>Morning for dosas:</strong> The legendary dosa spots are morning/early afternoon.</li>
              <li>• <strong>No reservations:</strong> Queuing is part of the experience.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif font-bold text-white mb-4">Related</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/best-restaurants-bangalore" className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors">
                Best Restaurants →
              </Link>
              <Link href="/guides/best-biryani-bangalore" className="px-4 py-2 bg-zinc-900 rounded-full text-zinc-300 hover:bg-violet-500/20 hover:text-violet-400 transition-colors">
                Best Biryani →
              </Link>
            </div>
          </section>

          <div className="text-center text-sm text-zinc-500">Last updated: February 2026</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
