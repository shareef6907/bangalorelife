import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Mall {
  id: string;
  name: string;
  slug: string;
  neighborhood: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  google_rating: number | null;
  google_reviews_count: number | null;
  cover_photo_url: string | null;
  photos: { reference: string; url: string }[];
  opening_hours: string[];
  phone: string | null;
  website: string | null;
  google_maps_url: string | null;
  floors: number | null;
  total_stores: number | null;
  anchor_stores: string[] | null;
  parking_info: string | null;
  description: string | null;
  highlights: string[] | null;
}

interface MallStore {
  id: string;
  name: string;
  slug: string;
  category: string;
  floor: string | null;
  google_rating: number | null;
  is_anchor_store: boolean;
  website: string | null;
}

async function getMall(slug: string): Promise<Mall | null> {
  const { data } = await supabase
    .from("malls")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  return data;
}

async function getMallStores(mallId: string): Promise<MallStore[]> {
  const { data } = await supabase
    .from("mall_stores")
    .select("*")
    .eq("mall_id", mallId)
    .eq("is_active", true)
    .order("is_anchor_store", { ascending: false })
    .order("google_rating", { ascending: false, nullsFirst: false });

  return data || [];
}

interface RelatedMall {
  id: string;
  name: string;
  slug: string;
  neighborhood: string;
  google_rating: number | null;
  cover_photo_url: string | null;
}

async function getRelatedMalls(neighborhood: string, currentId: string): Promise<RelatedMall[]> {
  const { data } = await supabase
    .from("malls")
    .select("id, name, slug, neighborhood, google_rating, cover_photo_url")
    .eq("is_active", true)
    .neq("id", currentId)
    .limit(4);

  return data || [];
}

function formatNeighborhood(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'fashion': '👗',
    'electronics': '📱',
    'food-dining': '🍽️',
    'entertainment': '🎬',
    'beauty': '💄',
    'sports': '⚽',
    'kids': '🧸',
    'jewelry': '💎',
    'supermarket': '🛒',
    'home-lifestyle': '🏠',
    'services': '🔧',
    'other': '🏪'
  };
  return icons[category] || '🏪';
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'fashion': 'Fashion & Apparel',
    'electronics': 'Electronics',
    'food-dining': 'Food & Dining',
    'entertainment': 'Entertainment',
    'beauty': 'Beauty & Wellness',
    'sports': 'Sports & Fitness',
    'kids': 'Kids & Toys',
    'jewelry': 'Jewelry & Watches',
    'supermarket': 'Supermarket & Grocery',
    'home-lifestyle': 'Home & Lifestyle',
    'services': 'Services',
    'other': 'Other Stores'
  };
  return labels[category] || category;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const mall = await getMall(slug);
  
  if (!mall) {
    return { title: "Mall Not Found | BangaloreLife" };
  }

  return {
    title: `${mall.name} - Stores, Restaurants, Timings | BangaloreLife`,
    description: `Complete guide to ${mall.name} in ${formatNeighborhood(mall.neighborhood)}, Bangalore. Find stores, restaurants, movie theaters, timings, and directions.`,
    keywords: `${mall.name}, ${mall.name} stores, ${mall.name} restaurants, ${formatNeighborhood(mall.neighborhood)} mall, bangalore mall`,
    openGraph: {
      title: `${mall.name} - Complete Shopping Guide`,
      description: `Explore ${mall.name} in Bangalore. Find stores, restaurants, entertainment options and more.`,
      images: mall.cover_photo_url ? [mall.cover_photo_url] : undefined,
    }
  };
}

export async function generateStaticParams() {
  const { data: malls } = await supabase
    .from("malls")
    .select("slug")
    .eq("is_active", true);

  return (malls || []).map((mall) => ({
    slug: mall.slug,
  }));
}

export const revalidate = 3600;

export default async function MallDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mall = await getMall(slug);

  if (!mall) {
    notFound();
  }

  const [stores, relatedMalls] = await Promise.all([
    getMallStores(mall.id),
    getRelatedMalls(mall.neighborhood, mall.id)
  ]);

  // Group stores by category
  const storesByCategory: Record<string, MallStore[]> = {};
  stores.forEach(store => {
    if (!storesByCategory[store.category]) {
      storesByCategory[store.category] = [];
    }
    storesByCategory[store.category].push(store);
  });

  // Sort categories by store count
  const sortedCategories = Object.entries(storesByCategory)
    .sort((a, b) => b[1].length - a[1].length);

  const anchorStores = stores.filter(s => s.is_anchor_store);

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ShoppingCenter",
    name: mall.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: mall.address,
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN"
    },
    geo: mall.latitude && mall.longitude ? {
      "@type": "GeoCoordinates",
      latitude: mall.latitude,
      longitude: mall.longitude
    } : undefined,
    aggregateRating: mall.google_rating ? {
      "@type": "AggregateRating",
      ratingValue: mall.google_rating,
      reviewCount: mall.google_reviews_count
    } : undefined,
    telephone: mall.phone,
    url: mall.website,
    openingHours: mall.opening_hours
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/malls" className="hover:text-white">Malls</Link>
          <span>/</span>
          <span className="text-white">{mall.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Photos */}
          <div className="space-y-4">
            {/* Main Photo */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-zinc-800">
              {mall.cover_photo_url ? (
                <img 
                  src={mall.cover_photo_url} 
                  alt={mall.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600/20 to-pink-600/20">
                  <span className="text-6xl">🏬</span>
                </div>
              )}
              {/* Rating Badge */}
              {mall.google_rating && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">★</span>
                  <div>
                    <span className="font-bold text-lg">{mall.google_rating}</span>
                    {mall.google_reviews_count && (
                      <span className="text-zinc-400 text-sm ml-1">
                        ({(mall.google_reviews_count / 1000).toFixed(0)}k)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Photo Gallery */}
            {mall.photos && mall.photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {mall.photos.slice(1, 5).map((photo, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-zinc-800">
                    <img 
                      src={photo.url} 
                      alt={`${mall.name} photo ${idx + 2}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mall Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{mall.name}</h1>
            <p className="text-xl text-violet-400 mb-6">{formatNeighborhood(mall.neighborhood)}, Bangalore</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-900 rounded-xl p-4">
                <div className="text-2xl font-bold text-violet-400">{stores.length}</div>
                <div className="text-zinc-400 text-sm">Stores & Restaurants</div>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4">
                <div className="text-2xl font-bold text-violet-400">{sortedCategories.length}</div>
                <div className="text-zinc-400 text-sm">Categories</div>
              </div>
            </div>

            {/* Address */}
            {mall.address && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-zinc-400 mb-1">Address</h3>
                <p className="text-white">{mall.address}</p>
              </div>
            )}

            {/* Opening Hours */}
            {mall.opening_hours && mall.opening_hours.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-zinc-400 mb-2">Opening Hours</h3>
                <div className="bg-zinc-900 rounded-xl p-4 space-y-1 text-sm">
                  {mall.opening_hours.map((hours, idx) => (
                    <div key={idx} className="text-zinc-300">{hours}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact & Links */}
            <div className="flex flex-wrap gap-3 mt-6">
              {mall.google_maps_url && (
                <a 
                  href={mall.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Get Directions
                </a>
              )}
              {mall.website && (
                <a 
                  href={mall.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Visit Website
                </a>
              )}
              {mall.phone && (
                <a 
                  href={`tel:${mall.phone}`}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {mall.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Google Map Embed */}
        {mall.latitude && mall.longitude && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="rounded-2xl overflow-hidden h-80">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_PLACES_API_KEY}&q=${encodeURIComponent(mall.name + ' Bangalore')}&center=${mall.latitude},${mall.longitude}&zoom=15`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        )}

        {/* Anchor Stores */}
        {anchorStores.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Major Stores</h2>
            <div className="flex flex-wrap gap-3">
              {anchorStores.map(store => (
                <div 
                  key={store.id}
                  className="bg-zinc-900 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <span>{getCategoryIcon(store.category)}</span>
                  <span className="font-medium">{store.name}</span>
                  {store.google_rating && (
                    <span className="text-zinc-400 text-sm">★ {store.google_rating}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stores by Category */}
        {sortedCategories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Store Directory</h2>
            <div className="space-y-8">
              {sortedCategories.map(([category, categoryStores]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>{getCategoryIcon(category)}</span>
                    {getCategoryLabel(category)}
                    <span className="text-zinc-500 font-normal">({categoryStores.length})</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {categoryStores.map(store => (
                      <div 
                        key={store.id}
                        className="bg-zinc-900 hover:bg-zinc-800 rounded-lg p-3 transition-colors"
                      >
                        <div className="font-medium truncate">{store.name}</div>
                        {store.google_rating && (
                          <div className="text-zinc-400 text-sm flex items-center gap-1 mt-1">
                            <span className="text-yellow-400">★</span>
                            {store.google_rating}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Malls */}
        {relatedMalls.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Other Malls You Might Like</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedMalls.map(related => (
                <Link 
                  key={related.id} 
                  href={`/malls/${related.slug}`}
                  className="group bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800/80 transition-all"
                >
                  <div className="h-32 bg-zinc-800">
                    {related.cover_photo_url ? (
                      <img 
                        src={related.cover_photo_url} 
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600/20 to-pink-600/20">
                        <span className="text-3xl">🏬</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold group-hover:text-violet-400 transition-colors truncate">{related.name}</h3>
                    <p className="text-zinc-400 text-sm">{formatNeighborhood(related.neighborhood)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Malls */}
        <div className="text-center">
          <Link 
            href="/malls"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Malls
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
