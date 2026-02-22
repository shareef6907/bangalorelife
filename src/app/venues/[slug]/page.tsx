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

interface Venue {
  id: string;
  name: string;
  slug: string;
  type: string;
  neighborhood: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  google_maps_url: string | null;
  google_rating: number | null;
  cuisine_types: string[] | null;
  features: string[] | null;
  price_range: string | null;
  opening_hours: any;
  lat: number | null;
  lng: number | null;
}

async function getVenue(slug: string): Promise<Venue | null> {
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return data;
}

interface SimilarVenue {
  id: string;
  name: string;
  slug: string;
  type: string;
  neighborhood: string;
  google_rating: number | null;
  cuisine_types: string[] | null;
}

async function getSimilarVenues(venue: Venue): Promise<SimilarVenue[]> {
  const { data } = await supabase
    .from("venues")
    .select("id, name, slug, type, neighborhood, google_rating, cuisine_types")
    .eq("type", venue.type)
    .eq("neighborhood", venue.neighborhood)
    .neq("id", venue.id)
    .eq("is_active", true)
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(6);

  return data || [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenue(slug);

  if (!venue) {
    return { title: "Venue Not Found | BangaloreLife" };
  }

  const neighborhood = venue.neighborhood.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const cuisines = venue.cuisine_types?.slice(0, 3).join(", ") || venue.type;

  return {
    title: `${venue.name} - ${neighborhood} | BangaloreLife`,
    description: `${venue.name} in ${neighborhood}, Bangalore. ${cuisines}. ${venue.google_rating ? `Rated ${venue.google_rating}/5.` : ""} Find address, phone, menu, and reviews.`,
    keywords: `${venue.name}, ${neighborhood}, ${venue.type} bangalore, ${cuisines}`,
    openGraph: {
      title: `${venue.name} | BangaloreLife`,
      description: `${venue.name} - ${cuisines} in ${neighborhood}. ${venue.price_range ? `Price: ${venue.price_range}` : ""}`,
      type: "website",
    },
  };
}

// Generate static paths for popular venues
export async function generateStaticParams() {
  const { data } = await supabase
    .from("venues")
    .select("slug")
    .eq("is_active", true)
    .not("google_rating", "is", null)
    .order("google_rating", { ascending: false })
    .limit(100);

  return (data || []).map((v) => ({ slug: v.slug }));
}

export const revalidate = 86400; // Revalidate every 24 hours

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenue(slug);

  if (!venue) {
    notFound();
  }

  const similarVenues = await getSimilarVenues(venue);
  const neighborhood = venue.neighborhood.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  // Format opening hours
  const formatHours = (hours: any) => {
    if (!hours) return null;
    if (typeof hours === "string") return hours;
    if (Array.isArray(hours)) return hours.join(", ");
    return null;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/venues" className="hover:text-white">Venues</Link>
          <span>/</span>
          <Link href={`/neighborhoods/${venue.neighborhood}`} className="hover:text-white">{neighborhood}</Link>
          <span>/</span>
          <span className="text-zinc-300">{venue.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{venue.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-zinc-400">
                <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm capitalize">{venue.type}</span>
                <span>{neighborhood}</span>
                {venue.price_range && (
                  <span className="text-emerald-400 font-medium">{venue.price_range}</span>
                )}
              </div>
            </div>

            {venue.google_rating && (
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-1 text-amber-400">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <span className="text-2xl font-bold">{venue.google_rating}</span>
                </div>
                <span className="text-zinc-500 text-sm">Google Rating</span>
              </div>
            )}
          </div>
        </div>

        {/* Cuisines & Features */}
        {(venue.cuisine_types?.length || venue.features?.length) && (
          <div className="mb-8 space-y-4">
            {venue.cuisine_types && venue.cuisine_types.length > 0 && (
              <div>
                <h3 className="text-sm text-zinc-500 mb-2">Cuisine</h3>
                <div className="flex flex-wrap gap-2">
                  {venue.cuisine_types.map((cuisine) => (
                    <span key={cuisine} className="px-3 py-1.5 bg-violet-500/20 text-violet-300 rounded-lg text-sm">
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {venue.features && venue.features.length > 0 && (
              <div>
                <h3 className="text-sm text-zinc-500 mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {venue.features.map((feature) => (
                    <span key={feature} className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-lg text-sm">
                      {feature.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact & Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold mb-4">Contact & Location</h2>
            <div className="space-y-4">
              {venue.address && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="text-zinc-300">{venue.address}</span>
                </div>
              )}
              {venue.phone && (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-zinc-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <a href={`tel:${venue.phone}`} className="text-violet-400 hover:text-violet-300">{venue.phone}</a>
                </div>
              )}
              {venue.website && (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-zinc-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                  <a href={venue.website} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 truncate">
                    {venue.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </div>
              )}
              {formatHours(venue.opening_hours) && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-zinc-300">{formatHours(venue.opening_hours)}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-zinc-800">
              {venue.google_maps_url && (
                <a
                  href={venue.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  </svg>
                  Directions
                </a>
              )}
              {venue.phone && (
                <a
                  href={`tel:${venue.phone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Call
                </a>
              )}
            </div>
          </div>

          {/* Map placeholder or static map */}
          {venue.lat && venue.lng && (
            <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
              <a
                href={venue.google_maps_url || `https://www.google.com/maps?q=${venue.lat},${venue.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${venue.lat},${venue.lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${venue.lat},${venue.lng}&key=${process.env.GOOGLE_MAPS_API_KEY || ""}`}
                  alt={`Map showing ${venue.name}`}
                  className="w-full h-full object-cover min-h-[200px]"
                  onError={(e) => {
                    // Hide broken image
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </a>
            </div>
          )}
        </div>

        {/* Similar Venues */}
        {similarVenues.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Similar Places in {neighborhood}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarVenues.map((v) => (
                <Link
                  key={v.id}
                  href={`/venues/${v.slug}`}
                  className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-violet-500/50 transition-colors"
                >
                  <h3 className="font-medium mb-1">{v.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500 capitalize">{v.type}</span>
                    {v.google_rating && (
                      <span className="flex items-center gap-1 text-amber-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        {v.google_rating}
                      </span>
                    )}
                  </div>
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
              "@type": venue.type === "restaurant" ? "Restaurant" : "LocalBusiness",
              name: venue.name,
              address: {
                "@type": "PostalAddress",
                streetAddress: venue.address,
                addressLocality: neighborhood,
                addressRegion: "Karnataka",
                addressCountry: "IN",
              },
              telephone: venue.phone,
              url: venue.website,
              aggregateRating: venue.google_rating
                ? {
                    "@type": "AggregateRating",
                    ratingValue: venue.google_rating,
                    bestRating: 5,
                  }
                : undefined,
              servesCuisine: venue.cuisine_types,
              priceRange: venue.price_range,
            }),
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
