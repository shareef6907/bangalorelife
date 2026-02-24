import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Hotel {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  hotel_type: string;
  neighborhood: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  booking_url: string | null;
  star_rating: number | null;
  review_score: number | null;
  google_rating: number | null;
  price_min_per_night: number | null;
  price_max_per_night: number | null;
  amenities: string[] | null;
  photos: string[] | null;
  featured_photo: string | null;
  latitude: number | null;
  longitude: number | null;
  check_in_time: string | null;
  check_out_time: string | null;
}

async function getHotel(slug: string): Promise<Hotel | null> {
  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return data;
}

interface SimilarHotel {
  id: string;
  name: string;
  slug: string;
  hotel_type: string;
  neighborhood: string | null;
  star_rating: number | null;
  google_rating: number | null;
  price_min_per_night: number | null;
}

async function getSimilarHotels(hotel: Hotel): Promise<SimilarHotel[]> {
  let query = supabase
    .from("hotels")
    .select("id, name, slug, hotel_type, neighborhood, star_rating, google_rating, price_min_per_night")
    .eq("is_active", true)
    .neq("id", hotel.id)
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(6);

  // Try to find similar by neighborhood first
  if (hotel.neighborhood) {
    query = query.eq("neighborhood", hotel.neighborhood);
  }

  const { data } = await query;
  
  // If not enough results, get top rated hotels of same type
  if (!data || data.length < 3) {
    const { data: fallback } = await supabase
      .from("hotels")
      .select("id, name, slug, hotel_type, neighborhood, star_rating, google_rating, price_min_per_night")
      .eq("is_active", true)
      .eq("hotel_type", hotel.hotel_type)
      .neq("id", hotel.id)
      .order("google_rating", { ascending: false, nullsFirst: false })
      .limit(6);
    return fallback || [];
  }

  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hotel = await getHotel(slug);

  if (!hotel) {
    return { title: "Hotel Not Found | BangaloreLife" };
  }

  const neighborhood = hotel.neighborhood?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Bangalore";
  const stars = hotel.star_rating ? `${hotel.star_rating}-Star ` : "";
  const price = hotel.price_min_per_night ? `From ₹${hotel.price_min_per_night}/night. ` : "";

  return {
    title: `${hotel.name} - ${neighborhood} | BangaloreLife`,
    description: `${stars}${hotel.hotel_type} in ${neighborhood}, Bangalore. ${price}${hotel.google_rating ? `Rated ${hotel.google_rating}/5.` : ""} Book now, find address and contact.`,
    keywords: `${hotel.name}, ${neighborhood}, hotels bangalore, ${hotel.hotel_type}, accommodation bangalore`,
    openGraph: {
      title: `${hotel.name} | BangaloreLife`,
      description: `${stars}${hotel.hotel_type} in ${neighborhood}. ${price}`,
      type: "website",
      images: hotel.featured_photo ? [hotel.featured_photo] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from("hotels")
    .select("slug")
    .eq("is_active", true)
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(100);

  return (data || []).map((h) => ({ slug: h.slug }));
}

export const revalidate = 86400;

export default async function HotelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = await getHotel(slug);

  if (!hotel) {
    notFound();
  }

  const similarHotels = await getSimilarHotels(hotel);
  const neighborhood = hotel.neighborhood?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Bangalore";
  
  // Build Google Maps URLs
  const hasCoords = hotel.latitude && hotel.longitude;
  const mapsSearchUrl = hasCoords 
    ? `https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ' ' + neighborhood + ' Bangalore')}`;
  const mapsDirectionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotel.name + ' ' + neighborhood + ' Bangalore')}`;
  const mapsQuery = encodeURIComponent(`${hotel.name}, ${neighborhood}, Bangalore`);
  const mapsEmbedUrl = hasCoords
    ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'}&q=${mapsQuery}&center=${hotel.latitude},${hotel.longitude}&zoom=16`
    : null;

  const shareUrl = `https://bangalorelife.com/hotels/${hotel.slug}`;
  const shareText = `Check out ${hotel.name} in ${neighborhood}, Bangalore`;

  // Format price range
  const priceDisplay = () => {
    if (hotel.price_min_per_night && hotel.price_max_per_night) {
      return `₹${hotel.price_min_per_night.toLocaleString()} - ₹${hotel.price_max_per_night.toLocaleString()}/night`;
    }
    if (hotel.price_min_per_night) {
      return `From ₹${hotel.price_min_per_night.toLocaleString()}/night`;
    }
    return null;
  };

  // Star rating display
  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, i) => (
      <svg key={i} className="w-5 h-5 fill-amber-400" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/hotels" className="hover:text-white">Hotels</Link>
          {hotel.neighborhood && (
            <>
              <span>/</span>
              <Link href={`/neighborhoods/${hotel.neighborhood}`} className="hover:text-white">{neighborhood}</Link>
            </>
          )}
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-[200px]">{hotel.name}</span>
        </nav>

        {/* Featured Photo */}
        {hotel.featured_photo && (
          <div className="mb-6 rounded-2xl overflow-hidden">
            <img 
              src={hotel.featured_photo} 
              alt={hotel.name}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Header with Rating */}
        <div className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{hotel.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-violet-600 rounded-full text-sm capitalize font-medium">{hotel.hotel_type}</span>
                <span className="text-zinc-400">{neighborhood}</span>
                {hotel.star_rating && (
                  <div className="flex items-center gap-0.5">
                    {renderStars(hotel.star_rating)}
                  </div>
                )}
                {hotel.google_rating && (
                  <div className="flex items-center gap-1 text-amber-400">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="font-bold">{hotel.google_rating}</span>
                  </div>
                )}
                {priceDisplay() && (
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-sm font-medium">
                    {priceDisplay()}
                  </span>
                )}
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="flex gap-1">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                title="Share on WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                title="Share on X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        {hotel.description && (
          <div className="mb-8 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <p className="text-zinc-300 leading-relaxed">{hotel.description}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* CALL - Primary Action */}
          {hotel.phone ? (
            <a
              href={`tel:${hotel.phone}`}
              className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-emerald-600/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call {hotel.phone}
            </a>
          ) : (
            <div className="flex items-center gap-2 px-6 py-3.5 bg-zinc-800 rounded-xl text-zinc-500 cursor-not-allowed">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Phone not available
            </div>
          )}
          
          {/* Book Now - If booking URL exists */}
          {hotel.booking_url && (
            <a
              href={hotel.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold text-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Book Now
            </a>
          )}
          
          {/* Get Directions */}
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Directions
          </a>
          
          {/* Website */}
          {hotel.website && (
            <a
              href={hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Website
            </a>
          )}
          
          {/* View on Google Maps */}
          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Google Maps
          </a>
          
          {/* Book on Google Hotels */}
          <a
            href={`https://www.google.com/travel/hotels/entity/${encodeURIComponent(hotel.name.toLowerCase().replace(/\s+/g, '-'))}-bangalore`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V6H1v15h2v-3h18v3h2V10c0-2.21-1.79-4-4-4z"/>
            </svg>
            Google Hotels
          </a>
        </div>

        {/* Google Maps Embed */}
        {hasCoords && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-zinc-800">
            <iframe
              src={mapsEmbedUrl!}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${hotel.name}`}
              className="w-full"
            />
          </div>
        )}

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="mb-8 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <span key={amenity} className="px-3 py-1.5 bg-violet-500/20 text-violet-300 rounded-lg text-sm capitalize">
                  {amenity.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Details */}
        <div className="mb-8 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <h2 className="text-lg font-semibold mb-4">Contact & Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {hotel.address && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p className="text-zinc-500 text-sm">Address</p>
                  <p className="text-zinc-300">{hotel.address}</p>
                </div>
              </div>
            )}
            {hotel.phone && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <p className="text-zinc-500 text-sm">Phone</p>
                  <a href={`tel:${hotel.phone}`} className="text-violet-400 hover:text-violet-300">{hotel.phone}</a>
                </div>
              </div>
            )}
            {hotel.email && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <div>
                  <p className="text-zinc-500 text-sm">Email</p>
                  <a href={`mailto:${hotel.email}`} className="text-violet-400 hover:text-violet-300">{hotel.email}</a>
                </div>
              </div>
            )}
            {(hotel.check_in_time || hotel.check_out_time) && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <p className="text-zinc-500 text-sm">Check-in / Check-out</p>
                  <p className="text-zinc-300">
                    {hotel.check_in_time && `In: ${hotel.check_in_time}`}
                    {hotel.check_in_time && hotel.check_out_time && ' · '}
                    {hotel.check_out_time && `Out: ${hotel.check_out_time}`}
                  </p>
                </div>
              </div>
            )}
            {hotel.website && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9"/>
                </svg>
                <div>
                  <p className="text-zinc-500 text-sm">Website</p>
                  <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 truncate block max-w-[200px]">
                    {hotel.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Hotels */}
        {similarHotels.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Similar Hotels</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarHotels.map((h) => (
                <Link
                  key={h.id}
                  href={`/hotels/${h.slug}`}
                  className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-violet-500/50 transition-colors"
                >
                  <h3 className="font-medium mb-1 truncate">{h.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500 capitalize">
                      {h.hotel_type}
                      {h.star_rating && ` · ${h.star_rating}★`}
                    </span>
                    {h.google_rating && (
                      <span className="flex items-center gap-1 text-amber-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        {h.google_rating}
                      </span>
                    )}
                  </div>
                  {h.price_min_per_night && (
                    <p className="text-xs text-emerald-400 mt-1">From ₹{h.price_min_per_night.toLocaleString()}/night</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: hotel.name,
              description: hotel.description,
              address: {
                "@type": "PostalAddress",
                streetAddress: hotel.address,
                addressLocality: neighborhood,
                addressRegion: "Karnataka",
                addressCountry: "IN",
              },
              geo: hasCoords ? {
                "@type": "GeoCoordinates",
                latitude: hotel.latitude,
                longitude: hotel.longitude,
              } : undefined,
              telephone: hotel.phone,
              email: hotel.email,
              url: hotel.website,
              image: hotel.featured_photo,
              starRating: hotel.star_rating ? {
                "@type": "Rating",
                ratingValue: hotel.star_rating,
                bestRating: 5,
              } : undefined,
              aggregateRating: hotel.google_rating
                ? {
                    "@type": "AggregateRating",
                    ratingValue: hotel.google_rating,
                    bestRating: 5,
                  }
                : undefined,
              priceRange: priceDisplay() || undefined,
              amenityFeature: hotel.amenities?.map(a => ({
                "@type": "LocationFeatureSpecification",
                name: a,
              })),
              checkinTime: hotel.check_in_time,
              checkoutTime: hotel.check_out_time,
            }),
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
