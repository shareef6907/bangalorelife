import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const metadata: Metadata = {
  title: "Hotels in Bangalore | BangaloreLife",
  description: "Find the best hotels in Bangalore. From luxury 5-star hotels to budget-friendly stays, boutique hotels, and resorts near Bangalore.",
  keywords: "hotels bangalore, hotels in bangalore, best hotels bangalore, luxury hotels bangalore, budget hotels bangalore, resorts near bangalore",
};

interface Hotel {
  id: string;
  name: string;
  slug: string;
  hotel_type: string;
  neighborhood: string | null;
  star_rating: number | null;
  google_rating: number | null;
  price_min_per_night: number | null;
  amenities: string[] | null;
  featured_photo: string | null;
}

async function getHotels(): Promise<Hotel[]> {
  const { data } = await supabase
    .from("hotels")
    .select("id, name, slug, hotel_type, neighborhood, star_rating, google_rating, price_min_per_night, amenities, featured_photo")
    .eq("is_active", true)
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(100);

  return data || [];
}

async function getHotelTypes(): Promise<{ type: string; count: number }[]> {
  const { data } = await supabase
    .from("hotels")
    .select("hotel_type")
    .eq("is_active", true);

  if (!data) return [];

  const counts: Record<string, number> = {};
  data.forEach(h => {
    counts[h.hotel_type] = (counts[h.hotel_type] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

export const revalidate = 3600; // Revalidate every hour

export default async function HotelsPage() {
  const [hotels, hotelTypes] = await Promise.all([
    getHotels(),
    getHotelTypes()
  ]);

  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, i) => (
      <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hotels in Bangalore</h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Find the perfect stay in Bangalore. From luxury hotels to budget-friendly options, 
            boutique stays to resorts near the city.
          </p>
        </div>

        {/* Filter Pills */}
        {hotelTypes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-4 py-2 bg-violet-600 rounded-full text-sm font-medium">
              All ({hotels.length})
            </span>
            {hotelTypes.map(({ type, count }) => (
              <span 
                key={type}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-medium capitalize cursor-pointer transition-colors"
              >
                {type}s ({count})
              </span>
            ))}
          </div>
        )}

        {/* Hotels Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <Link
              key={hotel.id}
              href={`/hotels/${hotel.slug}`}
              className="group bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-violet-500/50 transition-all overflow-hidden"
            >
              {/* Photo */}
              <div className="aspect-[4/3] bg-zinc-800 relative overflow-hidden">
                {hotel.featured_photo ? (
                  <img 
                    src={hotel.featured_photo} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                )}
                {/* Star Rating Badge */}
                {hotel.star_rating && (
                  <div className="absolute top-3 left-3 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                    {renderStars(hotel.star_rating)}
                  </div>
                )}
                {/* Type Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-violet-600/90 backdrop-blur-sm rounded-lg text-xs font-medium capitalize">
                  {hotel.hotel_type}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1 truncate group-hover:text-violet-400 transition-colors">
                  {hotel.name}
                </h2>
                <p className="text-sm text-zinc-400 mb-3 capitalize">
                  {hotel.neighborhood?.replace(/-/g, " ") || "Bangalore"}
                </p>
                
                <div className="flex items-center justify-between">
                  {/* Rating */}
                  {hotel.google_rating ? (
                    <div className="flex items-center gap-1 text-amber-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="font-medium">{hotel.google_rating}</span>
                    </div>
                  ) : (
                    <div className="text-sm text-zinc-500">No rating yet</div>
                  )}
                  
                  {/* Price */}
                  {hotel.price_min_per_night && (
                    <div className="text-emerald-400 text-sm font-medium">
                      From ₹{hotel.price_min_per_night.toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Amenities Preview */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-400 capitalize">
                        {amenity.replace(/-/g, " ")}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="px-2 py-0.5 text-xs text-zinc-500">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-lg">No hotels found. Check back soon!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
