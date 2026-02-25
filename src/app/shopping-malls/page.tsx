import { Metadata } from 'next';
import Link from 'next/link';
import mallsData from '@/data/malls.json';

export const metadata: Metadata = {
  title: 'Shopping Malls in Bangalore | Complete Mall Directory 2026 | BangaloreLife',
  description: 'Complete guide to all shopping malls in Bangalore. Find store directories, opening hours, locations, and restaurants for Phoenix Marketcity, Orion Mall, UB City, Forum Mall, Mantri Square and more.',
  keywords: 'Bangalore malls, shopping malls Bangalore, Phoenix Marketcity, Orion Mall, UB City, Forum Mall, Mantri Square, mall directory Bangalore',
};

export default function ShoppingMallsPage() {
  const malls = mallsData.malls;
  
  // Group malls by location
  const mallsByLocation = malls.reduce((acc, mall) => {
    const location = mall.location;
    if (!acc[location]) acc[location] = [];
    acc[location].push(mall);
    return acc;
  }, {} as Record<string, typeof malls>);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shopping Malls in Bangalore
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Your complete guide to {malls.length} shopping malls in Bangalore. 
            Find store directories, restaurants, entertainment options, and more.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">{malls.length}</div>
              <div className="text-gray-600">Malls Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">1000+</div>
              <div className="text-gray-600">Stores</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-gray-600">Restaurants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600">Cinema Screens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a store, brand, or mall..."
                className="w-full px-6 py-4 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg"
              />
              <button className="absolute right-2 top-2 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Malls */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Malls</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {malls.slice(0, 6).map((mall) => (
              <Link 
                key={mall.id} 
                href={`/shopping-malls/${mall.slug}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/20 group-hover:text-white/40 transition">
                    {mall.name.charAt(0)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition">
                    {mall.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{mall.location}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{mall.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mall.highlights.slice(0, 2).map((highlight, i) => (
                      <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Malls by Location */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Malls by Area</h2>
          {Object.entries(mallsByLocation).map(([location, locationMalls]) => (
            <div key={location} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                {location}
                <span className="text-sm font-normal text-gray-400">
                  ({locationMalls.length} {locationMalls.length === 1 ? 'mall' : 'malls'})
                </span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locationMalls.map((mall) => (
                  <Link
                    key={mall.id}
                    href={`/shopping-malls/${mall.slug}`}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition group"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold group-hover:bg-purple-600 group-hover:text-white transition">
                      {mall.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-purple-600 transition">{mall.name}</h4>
                      <p className="text-sm text-gray-500">{mall.hours}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Searches */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Popular Searches</h2>
          <div className="flex flex-wrap gap-3">
            {['Zara Bangalore', 'H&M locations', 'Nike stores', 'Sephora', 'Apple Store', 'PVR IMAX', 'Food courts', 'Gaming zones', 'Kids stores'].map((term) => (
              <Link
                key={term}
                href={`/shopping-malls?q=${encodeURIComponent(term)}`}
                className="px-4 py-2 bg-white rounded-full text-gray-700 hover:bg-purple-600 hover:text-white transition border"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the biggest mall in Bangalore?</h3>
              <p className="text-gray-600">Mantri Square Mall is the largest mall in India by area at 1.7 million sq ft. Phoenix Marketcity Whitefield is the largest mall in Bangalore by retail space with 1 million sq ft.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Which mall has Zara in Bangalore?</h3>
              <p className="text-gray-600">Zara has stores in Phoenix Marketcity (Whitefield), Forum Mall (Koramangala), and Orion Mall (Rajajinagar).</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">What time do malls open in Bangalore?</h3>
              <p className="text-gray-600">Most malls in Bangalore open at 10:00 AM or 10:30 AM and close at 10:00 PM. Some stores within malls may have slightly different timings.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Which mall is best for luxury shopping in Bangalore?</h3>
              <p className="text-gray-600">UB City Mall on Vittal Mallya Road is India's first luxury mall and the best destination for premium brands like Louis Vuitton, Gucci, and Burberry in Bangalore.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
