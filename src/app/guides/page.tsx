import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bangalore Guides — Best Pubs, Restaurants, Things to Do & More",
  description: "The best of Bangalore, curated. Our definitive guides to pubs, breweries, restaurants, date nights, day trips, and everything worth doing in the city.",
  keywords: "bangalore guides, best pubs bangalore, best restaurants bangalore, things to do bangalore, bangalore brewery guide, bangalore food guide",
};

const guides = [
  {
    category: "Nightlife & Drinks",
    items: [
      {
        title: "15 Best Pubs in Bangalore",
        slug: "best-pubs-bangalore",
        description: "From legendary brewpubs to hidden speakeasies — the definitive guide.",
        image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&q=80",
      },
      {
        title: "12 Best Breweries in Bangalore",
        slug: "best-breweries-bangalore",
        description: "India's craft beer capital. Here's where to find the best brews.",
        image: "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=600&q=80",
      },
      {
        title: "10 Best Rooftop Bars",
        slug: "best-rooftop-bars-bangalore",
        description: "Stunning views, craft cocktails, and Bangalore's perfect weather.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
      },
      {
        title: "Best Cocktail Bars",
        slug: "best-cocktail-bars-bangalore",
        description: "Where to find expertly crafted drinks and creative mixology.",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
      },
      {
        title: "Ladies Night Deals",
        slug: "ladies-night-bangalore",
        description: "Every day of the week has a ladies night somewhere. Here's the map.",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
      },
    ],
  },
  {
    category: "Food & Dining",
    items: [
      {
        title: "Best Restaurants in Bangalore",
        slug: "best-restaurants-bangalore",
        description: "From fine dining to hidden gems — our picks across all budgets.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
      },
      {
        title: "Best Street Food Spots",
        slug: "best-street-food-bangalore",
        description: "Chaat, dosas, kebabs, and more. The essential street food guide.",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
      },
      {
        title: "Best Biryani in Bangalore",
        slug: "best-biryani-bangalore",
        description: "The great biryani debate, settled. (Just kidding. But here are our favorites.)",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
      },
      {
        title: "Best Brunch Spots",
        slug: "best-brunch-bangalore",
        description: "Where to spend your lazy weekend mornings.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
      },
      {
        title: "Best Cafes for Work & Coffee",
        slug: "best-cafes-bangalore",
        description: "Good WiFi, great coffee, and the perfect work-from-cafe spots.",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
      },
    ],
  },
  {
    category: "Things to Do",
    items: [
      {
        title: "50 Things to Do in Bangalore",
        slug: "things-to-do-bangalore",
        description: "The ultimate list. Everything worth doing in the city.",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80",
      },
      {
        title: "25 Best Date Night Ideas",
        slug: "date-night-bangalore",
        description: "Romantic spots, unique experiences, and memorable evenings.",
        image: "https://images.unsplash.com/photo-1529417305485-480f579e7578?w=600&q=80",
      },
      {
        title: "15 Best Day Trips",
        slug: "day-trips-from-bangalore",
        description: "Weekend getaways within 3 hours of the city.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      },
      {
        title: "Adventure Activities",
        slug: "adventure-activities-near-bangalore",
        description: "Trekking, camping, water sports, and outdoor adventures.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
      },
      {
        title: "Things to Do with Kids",
        slug: "bangalore-with-kids",
        description: "Family-friendly activities, parks, and entertainment.",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
      },
    ],
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Bangalore Guides
            </h1>
            <p className="text-xl text-emerald-100">
              The best of Bangalore, curated. Our definitive guides to everything worth doing.
            </p>
          </div>
        </section>

        {/* Guides by Category */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {guides.map((category) => (
              <div key={category.category} className="mb-16">
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 pb-3 border-b border-stone-200">
                  {category.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-stone-200"
                    >
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img 
                          src={guide.image} 
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-stone-500 text-sm mt-1">
                          {guide.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
