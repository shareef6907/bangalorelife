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
  latitude: number | null;
  longitude: number | null;
}

// Clean venue name - remove non-English characters
function cleanVenueName(name: string): string {
  // Check if name contains mostly non-Latin characters
  const latinChars = name.match(/[a-zA-Z]/g)?.length || 0;
  const totalChars = name.replace(/\s/g, '').length;
  
  // If less than 30% Latin characters, it's probably not English
  if (totalChars > 0 && latinChars / totalChars < 0.3) {
    // Try to extract any English portion
    const englishPart = name.match(/[a-zA-Z][a-zA-Z\s&'-]*/)?.[0]?.trim();
    if (englishPart && englishPart.length > 2) {
      return englishPart;
    }
    return "Local Restaurant"; // Fallback
  }
  
  return name;
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

  const venueName = cleanVenueName(venue.name);
  const neighborhood = venue.neighborhood.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const cuisines = venue.cuisine_types?.slice(0, 3).join(", ") || venue.type;

  return {
    title: `${venueName} - ${neighborhood} | BangaloreLife`,
    description: `${venueName} in ${neighborhood}, Bangalore. ${cuisines}. ${venue.google_rating ? `Rated ${venue.google_rating}/5.` : ""} Find address, directions, and reviews.`,
    keywords: `${venueName}, ${neighborhood}, ${venue.type} bangalore, ${cuisines}`,
    openGraph: {
      title: `${venueName} | BangaloreLife`,
      description: `${venueName} - ${cuisines} in ${neighborhood}. ${venue.price_range ? `Price: ${venue.price_range}` : ""}`,
      type: "website",
    },
  };
}

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

export const revalidate = 86400;

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenue(slug);

  if (!venue) {
    notFound();
  }

  const similarVenues = await getSimilarVenues(venue);
  const venueName = cleanVenueName(venue.name);
  const neighborhood = venue.neighborhood.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  
  // Build Google Maps URLs
  const hasCoords = venue.latitude && venue.longitude;
  const mapsSearchUrl = hasCoords 
    ? `https://www.google.com/maps/search/?api=1&query=${venue.latitude},${venue.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName + ' ' + neighborhood + ' Bangalore')}`;
  const mapsDirectionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueName + ' ' + neighborhood + ' Bangalore')}`;
  const mapsEmbedUrl = hasCoords
    ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'}&q=${venue.latitude},${venue.longitude}&zoom=16`
    : null;

  // Format opening hours
  const formatHours = (hours: any) => {
    if (!hours) return null;
    if (typeof hours === "string") return hours;
    if (Array.isArray(hours)) return hours.join(", ");
    if (typeof hours === "object") {
      return Object.entries(hours).map(([day, time]) => `${day}: ${time}`).join(", ");
    }
    return null;
  };

  const shareUrl = `https://bangalorelife.com/venues/${venue.slug}`;
  const shareText = `Check out ${venueName} in ${neighborhood}, Bangalore`;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/venues" className="hover:text-white">Venues</Link>
          <span>/</span>
          <Link href={`/neighborhoods/${venue.neighborhood}`} className="hover:text-white">{neighborhood}</Link>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-[200px]">{venueName}</span>
        </nav>

        {/* Header with Rating */}
        <div className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{venueName}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-violet-600 rounded-full text-sm capitalize font-medium">{venue.type}</span>
                <span className="text-zinc-400">{neighborhood}</span>
                {venue.price_range && (
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-sm font-medium">{venue.price_range}</span>
                )}
                {venue.google_rating && (
                  <div className="flex items-center gap-1 text-amber-400">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="font-bold">{venue.google_rating}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Share Button */}
            <div className="flex gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                title="Share on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                title="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Actions - Prominent */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Get Directions
          </a>
          {venue.phone && (
            <a
              href={`tel:${venue.phone}`}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call Now
            </a>
          )}
          {venue.website && (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Website
            </a>
          )}
        </div>

        {/* Google Maps Embed - PROMINENT */}
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
              title={`Map of ${venueName}`}
              className="w-full"
            />
          </div>
        )}

        {/* Cuisines & Features */}
        {(venue.cuisine_types?.length || venue.features?.length) && (
          <div className="mb-8 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            {venue.cuisine_types && venue.cuisine_types.length > 0 && (
              <div className="mb-4">
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
                    <span key={feature} className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-lg text-sm capitalize">
                      {feature.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact Details */}
        <div className="mb-8 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <h2 className="text-lg font-semibold mb-4">Contact & Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {venue.address && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p className="text-zinc-500 text-sm">Address</p>
                  <p className="text-zinc-300">{venue.address}</p>
                </div>
              </div>
            )}
            {venue.phone && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <p className="text-zinc-500 text-sm">Phone</p>
                  <a href={`tel:${venue.phone}`} className="text-violet-400 hover:text-violet-300">{venue.phone}</a>
                </div>
              </div>
            )}
            {formatHours(venue.opening_hours) && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <p className="text-zinc-500 text-sm">Hours</p>
                  <p className="text-zinc-300">{formatHours(venue.opening_hours)}</p>
                </div>
              </div>
            )}
            {venue.website && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9"/>
                </svg>
                <div>
                  <p className="text-zinc-500 text-sm">Website</p>
                  <a href={venue.website} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 truncate block max-w-[200px]">
                    {venue.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </div>
              </div>
            )}
          </div>
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
                  <h3 className="font-medium mb-1 truncate">{cleanVenueName(v.name)}</h3>
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
              name: venueName,
              address: {
                "@type": "PostalAddress",
                streetAddress: venue.address,
                addressLocality: neighborhood,
                addressRegion: "Karnataka",
                addressCountry: "IN",
              },
              geo: hasCoords ? {
                "@type": "GeoCoordinates",
                latitude: venue.latitude,
                longitude: venue.longitude,
              } : undefined,
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
