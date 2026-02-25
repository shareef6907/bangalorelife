import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import mallsData from '@/data/malls.json';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return mallsData.malls.map((mall) => ({
    slug: mall.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mall = mallsData.malls.find((m) => m.slug === params.slug);
  if (!mall) return { title: 'Mall Not Found' };

  return {
    title: `${mall.name} ${mall.location} | Stores, Restaurants & More | BangaloreLife`,
    description: `Complete directory of ${mall.name} in ${mall.location}, Bangalore. Find all stores, restaurants, entertainment, timings, parking, and directions. ${mall.description}`,
    keywords: `${mall.name}, ${mall.location} mall, ${mall.name} stores, ${mall.name} restaurants, ${mall.name} timings, shopping mall Bangalore`,
  };
}

export default function MallPage({ params }: Props) {
  const mall = mallsData.malls.find((m) => m.slug === params.slug);
  
  if (!mall) {
    notFound();
  }

  // Group stores by category
  const storesByCategory = mall.stores?.reduce((acc, store) => {
    const category = store.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(store);
    return acc;
  }, {} as Record<string, typeof mall.stores>) || {};

  // Group restaurants by type
  const restaurantsByType = mall.restaurants?.reduce((acc, restaurant) => {
    const type = restaurant.type || 'other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(restaurant);
    return acc;
  }, {} as Record<string, typeof mall.restaurants>) || {};

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4">
            <Link href="/shopping-malls" className="text-purple-200 hover:text-white">
              Shopping Malls
            </Link>
            <span className="mx-2">/</span>
            <span>{mall.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{mall.name}</h1>
          <p className="text-xl text-purple-100 mb-6">{mall.location}, Bangalore</p>
          <div className="flex flex-wrap gap-3">
            {mall.highlights.map((highlight, i) => (
              <span key={i} className="bg-white/20 px-4 py-1 rounded-full text-sm">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-500">Hours</div>
              <div className="font-semibold">{mall.hours}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Area</div>
              <div className="font-semibold">
                {mall.area_sqft ? `${(mall.area_sqft / 1000000).toFixed(1)}M sq ft` : 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Floors</div>
              <div className="font-semibold">{mall.floors || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Stores</div>
              <div className="font-semibold">{mall.stores?.length || '100+'}+</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">About {mall.name}</h2>
              <p className="text-gray-600 leading-relaxed">{mall.description}</p>
            </section>

            {/* Store Directory */}
            {Object.keys(storesByCategory).length > 0 && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Store Directory</h2>
                <div className="space-y-6">
                  {Object.entries(storesByCategory).map(([category, stores]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-purple-600 mb-3">{category}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {stores.map((store, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium">{store.name}</div>
                            <div className="text-sm text-gray-500">{store.floor}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Restaurants */}
            {Object.keys(restaurantsByType).length > 0 && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Restaurants & Food</h2>
                <div className="space-y-6">
                  {Object.entries(restaurantsByType).map(([type, restaurants]) => (
                    <div key={type}>
                      <h3 className="font-semibold text-purple-600 mb-3 capitalize">
                        {type.replace('-', ' ')}
                      </h3>
                      <div className="grid gap-3">
                        {restaurants.map((restaurant, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{restaurant.name}</div>
                              <div className="text-sm text-gray-500">{restaurant.cuisine}</div>
                            </div>
                            <div className="text-sm text-gray-400">{restaurant.floor}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Entertainment */}
            {mall.entertainment && mall.entertainment.length > 0 && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Entertainment</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {mall.entertainment.map((item, i) => (
                    <div key={i} className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-purple-600 capitalize">{item.type}</div>
                      {item.screens && (
                        <div className="text-sm text-gray-500">{item.screens} screens</div>
                      )}
                      {item.features && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.features.map((feature: string, j: number) => (
                            <span key={j} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold mb-4">Location & Contact</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">Address</div>
                  <div>{mall.address}</div>
                </div>
                {mall.metro && (
                  <div>
                    <div className="text-gray-500">Metro Access</div>
                    <div>{mall.metro}</div>
                  </div>
                )}
                {mall.parking && (
                  <div>
                    <div className="text-gray-500">Parking</div>
                    <div>{mall.parking}</div>
                  </div>
                )}
                {mall.website && (
                  <a
                    href={mall.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-purple-600 hover:underline"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </div>

            {/* Anchor Stores */}
            {mall.anchor_stores && mall.anchor_stores.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold mb-4">Anchor Stores</h3>
                <div className="flex flex-wrap gap-2">
                  {mall.anchor_stores.map((store, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {store}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {mall.services && mall.services.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold mb-4">Services</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {mall.services.map((service, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Data Status */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
              <div className="font-medium text-yellow-800">Data Status: {mall.data_status}</div>
              <div className="text-yellow-700">Last verified: {mall.last_verified}</div>
              <div className="text-yellow-600 mt-2">
                Help us improve! If you notice any outdated information, let us know.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
