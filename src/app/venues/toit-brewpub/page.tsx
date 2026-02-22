import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateAffiliateLink, affiliateLinkProps } from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Toit Brewpub — Bangalore's Legendary Craft Beer Destination",
  description: "Toit is Bangalore's most iconic brewpub. Rated 4.4⭐ with 15,000+ reviews. Try their famous Toit Weiss and Tintin Toit. Located in Indiranagar.",
  keywords: "toit bangalore, toit brewpub, toit indiranagar, best brewery bangalore, craft beer bangalore, toit weiss",
};

// Placeholder - will come from Supabase/Google Places
const venue = {
  name: "Toit Brewpub",
  slug: "toit-brewpub",
  type: "Brewery",
  neighborhood: "Indiranagar",
  address: "298, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
  phone: "+91 80 4116 9900",
  website: "https://toit.in",
  google_maps_url: "https://maps.google.com/?q=Toit+Brewpub+Indiranagar+Bangalore",
  google_rating: 4.4,
  google_reviews_count: 15420,
  google_price_level: 2,
  opening_hours: [
    { day: "Monday", hours: "12:00 PM – 1:00 AM" },
    { day: "Tuesday", hours: "12:00 PM – 1:00 AM" },
    { day: "Wednesday", hours: "12:00 PM – 1:00 AM" },
    { day: "Thursday", hours: "12:00 PM – 1:00 AM" },
    { day: "Friday", hours: "12:00 PM – 1:00 AM" },
    { day: "Saturday", hours: "12:00 PM – 1:00 AM" },
    { day: "Sunday", hours: "12:00 PM – 1:00 AM" },
  ],
  photos: [
    "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=1200&q=80",
    "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&q=80",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
  ],
  best_for_tags: ["Craft Beer", "Groups", "Live Music", "Late Night", "Date Night"],
  editorial_content: `
If there's one pub that defines Bangalore's craft beer revolution, it's Toit. Since 2010, this Indiranagar institution has been setting the standard for what a brewpub should be — and it's still the best place to experience Bangalore's beer culture.

## The Beer

The beer is brewed on-site, and the rotating taps mean there's always something new to try. The **Toit Weiss** (a refreshing wheat beer) and **Tintin Toit** (a Belgian-style strong ale) are legends for good reason. But don't sleep on the Basmati Blonde or their seasonal specials.

With 8 core beers and rotating seasonal brews, Toit takes craft beer seriously. The brewmasters experiment constantly, and if you're lucky, you might catch a limited release.

## The Vibe

Beyond the beer, Toit gets the pub experience right: good food, energetic crowds, and a buzz that never dies down. It's always packed, especially on weekends — get there early or prepare to wait.

The two-floor layout means you can find a spot that suits your mood. Downstairs is louder and more social; upstairs offers slightly more intimate seating. On weekends, both floors are shoulder-to-shoulder by 9 PM.

## What to Order

- **Toit Weiss** — Light, refreshing wheat beer. Perfect starter.
- **Tintin Toit** — Strong ale with Belgian notes. The crowd favorite.
- **Basmati Blonde** — Unique Indian-inspired brew with basmati rice.
- **Buffalo Wings** — Possibly the best in Bangalore.
- **Pulled Pork Sliders** — Great with a cold beer.

## Pro Tips

- **Get there by 7 PM on weekends** to avoid the wait.
- **The second floor** is slightly less chaotic.
- **Happy hours (3-7 PM)** offer great deals on select beers.
- **They have a Koramangala location too** if Indiranagar is packed.

## The Verdict

Toit isn't just a brewpub — it's a Bangalore institution. Whether you're a craft beer enthusiast or just looking for a great night out, this is the place to be. After 14 years, it's still the gold standard.
  `.trim(),
  has_events: true,
};

export default function VenuePage() {
  const eventsUrl = generateAffiliateLink(
    "https://in.bookmyshow.com/explore/live-events-bengaluru",
    "toit-venue"
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-zinc-900/50 border-b border-zinc-800/50 px-4 py-3">
          <div className="max-w-6xl mx-auto text-sm text-zinc-500">
            <Link href="/" className="hover:text-violet-400">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/venues" className="hover:text-violet-400">Venues</Link>
            <span className="mx-2">→</span>
            <span className="text-white">{venue.name}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="aspect-[21/9] md:aspect-[3/1]">
            <img 
              src={venue.photos[0]}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
              <div className="inline-block px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-400 text-sm font-medium mb-4">
                {venue.type}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {venue.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-lg">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 rounded-lg">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-bold text-yellow-500">{venue.google_rating}</span>
                  <span className="text-zinc-400 text-sm">
                    ({venue.google_reviews_count.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="text-zinc-400">
                  📍 {venue.neighborhood}
                </div>
                <div className="text-green-400 font-medium">
                  {"₹".repeat(venue.google_price_level)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {venue.best_for_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Editorial Content */}
              <article className="prose prose-invert prose-lg max-w-none">
                {venue.editorial_content.split('\n\n').map((para, i) => {
                  if (para.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-white">{para.replace('## ', '')}</h2>;
                  }
                  if (para.startsWith('- ')) {
                    const items = para.split('\n').filter(l => l.startsWith('- '));
                    return (
                      <ul key={i} className="space-y-2 mb-6">
                        {items.map((item, j) => (
                          <li key={j} className="text-zinc-300" dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="text-zinc-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
                })}
              </article>

              {/* Photo Gallery */}
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {venue.photos.map((photo, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden">
                      <img src={photo} alt={`${venue.name} photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Events CTA (only if venue has events) */}
              {venue.has_events && (
                <section className="mt-12 p-6 bg-gradient-to-r from-violet-900/30 to-cyan-900/30 rounded-2xl border border-violet-500/20">
                  <h3 className="text-xl font-bold mb-2">🎵 Live Music & Events</h3>
                  <p className="text-zinc-400 mb-4">
                    Toit regularly hosts live music, comedy nights, and special events.
                  </p>
                  <a
                    href={eventsUrl}
                    {...affiliateLinkProps}
                    className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-medium transition-colors"
                  >
                    See What&apos;s On →
                  </a>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
                  <h3 className="font-bold mb-4">Quick Info</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Address</div>
                      <div className="text-sm">{venue.address}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Phone</div>
                      <a href={`tel:${venue.phone}`} className="text-sm text-violet-400 hover:text-violet-300">
                        {venue.phone}
                      </a>
                    </div>
                    
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Website</div>
                      <a href={venue.website} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-400 hover:text-violet-300">
                        {venue.website.replace('https://', '')}
                      </a>
                    </div>
                    
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Price Range</div>
                      <div className="text-sm text-green-400">{"₹".repeat(venue.google_price_level)} · ₹1,200–1,600 for two</div>
                    </div>
                  </div>
                  
                  <a
                    href={venue.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    View on Google Maps
                  </a>
                </div>

                {/* Opening Hours Card */}
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
                  <h3 className="font-bold mb-4">Opening Hours</h3>
                  <div className="space-y-2">
                    {venue.opening_hours.map((item) => (
                      <div key={item.day} className="flex justify-between text-sm">
                        <span className="text-zinc-500">{item.day}</span>
                        <span>{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Google Rating Card */}
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-1">
                    {venue.google_rating}
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= Math.round(venue.google_rating) ? "text-yellow-500" : "text-zinc-700"}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-zinc-500">
                    Based on {venue.google_reviews_count.toLocaleString()} Google reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Venues Section */}
        <section className="py-16 px-4 bg-zinc-900/30 border-t border-zinc-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">More in {venue.neighborhood}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "Loft 38", type: "Rooftop Bar", rating: 4.2 },
                { name: "Toast & Tonic", type: "Gastropub", rating: 4.3 },
                { name: "The Permit Room", type: "Cocktail Bar", rating: 4.1 },
              ].map((v) => (
                <Link
                  key={v.name}
                  href={`/venues/${v.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-violet-500/50 transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">{v.rating}</span>
                  </div>
                  <h3 className="font-semibold">{v.name}</h3>
                  <p className="text-sm text-zinc-500">{v.type}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
