import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
);

const GUIDES_DIR = path.join(__dirname, '../src/app/guides');

interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  heroImage: string;
  readTime: string;
  content: string;
  faqs: { question: string; answer: string }[];
  relatedVenueType?: string;
  relatedNeighborhood?: string;
}

async function generateWithOllama(prompt: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-r1:32b',
        prompt: prompt,
        stream: false,
        options: { temperature: 0.7, num_predict: 2000 }
      })
    });
    
    const data = await response.json();
    return data.response || '';
  } catch (error) {
    console.log('Ollama error, using fallback content');
    return '';
  }
}

async function getTopVenues(type: string, limit: number = 10): Promise<any[]> {
  const { data } = await supabase
    .from('venues')
    .select('name, slug, neighborhood, google_rating, type')
    .eq('type', type)
    .order('google_rating', { ascending: false, nullsFirst: false })
    .limit(limit);
  return data || [];
}

async function getVenuesByNeighborhood(neighborhood: string, limit: number = 10): Promise<any[]> {
  const { data } = await supabase
    .from('venues')
    .select('name, slug, neighborhood, google_rating, type')
    .eq('neighborhood', neighborhood)
    .order('google_rating', { ascending: false, nullsFirst: false })
    .limit(limit);
  return data || [];
}

async function getMalls(limit: number = 10): Promise<any[]> {
  const { data } = await supabase
    .from('malls')
    .select('name, slug, neighborhood, google_rating')
    .order('google_reviews_count', { ascending: false })
    .limit(limit);
  return data || [];
}

async function getHotels(limit: number = 10): Promise<any[]> {
  const { data } = await supabase
    .from('hotels')
    .select('name, slug, hotel_type, google_rating, neighborhood')
    .order('google_rating', { ascending: false, nullsFirst: false })
    .limit(limit);
  return data || [];
}

function createGuidePage(guide: Guide): string {
  const venueLinks = guide.relatedVenueType ? 
    `// TODO: Pull from DB` : '';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return `import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "${guide.metaTitle}",
  description: "${guide.metaDescription}",
  keywords: "${guide.slug.split('-').join(', ')}, bangalore guide, ${guide.category.toLowerCase()}",
  openGraph: {
    title: "${guide.title}",
    description: "${guide.metaDescription}",
    type: "article",
  }
};

const faqSchema = ${JSON.stringify(faqSchema, null, 2)};

export default function ${guide.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Page() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-white">Guides</Link>
          <span>/</span>
          <span className="text-white">${guide.title}</span>
        </nav>

        {/* Hero */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-sm text-violet-400">
              ${guide.category}
            </span>
            <span className="text-zinc-500 text-sm">${guide.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">${guide.title}</h1>
          <p className="text-xl text-zinc-400">${guide.metaDescription}</p>
        </header>

        {/* Hero Image */}
        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
          <img 
            src="${guide.heroImage}" 
            alt="${guide.title}"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          ${guide.content}
        </article>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {${JSON.stringify(guide.faqs)}.map((faq: any, idx: number) => (
              <details key={idx} className="bg-zinc-900 rounded-xl p-4 group">
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-violet-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-zinc-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section className="mt-16 pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold mb-4">More Bangalore Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/best-pubs-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Pubs</Link>
            <Link href="/guides/best-cafes-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Best Cafes</Link>
            <Link href="/guides/best-street-food-bangalore" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Street Food</Link>
            <Link href="/malls" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm transition-colors">Shopping Malls</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
`;
}

// Guide definitions with pre-written content
const GUIDES: Guide[] = [
  {
    slug: "best-restaurants-bangalore-2025",
    title: "Best Restaurants in Bangalore 2025",
    metaTitle: "25 Best Restaurants in Bangalore 2025 — BangaloreLife",
    metaDescription: "From fine dining to hidden gems, discover the best restaurants in Bangalore. Curated list with ratings, prices, and what to order.",
    category: "Food",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    readTime: "12 min read",
    faqs: [
      { question: "What are the best restaurants in Bangalore for couples?", answer: "For romantic dining, try Olive Beach in JP Nagar, Karavalli at Taj Gateway, or Toast & Tonic in UB City. These offer intimate ambiance with excellent food." },
      { question: "Where can I find the best biryani in Bangalore?", answer: "Meghana Foods is the local favorite for Andhra-style biryani. For Hyderabadi style, try Paradise or Behrouz Biryani." },
      { question: "What's the average cost for a meal at a good restaurant in Bangalore?", answer: "A meal for two at a mid-range restaurant costs ₹1,000-2,000. Fine dining ranges from ₹3,000-8,000+ for two." },
    ],
    content: \`
          <h2>The Bangalore Food Scene in 2025</h2>
          <p>Bangalore's restaurant scene has exploded. From Michelin-worthy fine dining to hole-in-the-wall gems, this city delivers. Here's our curated list of the absolute best places to eat in 2025.</p>
          
          <h2>Fine Dining</h2>
          <h3>1. Karavalli — Taj Gateway</h3>
          <p>Coastal Karnataka cuisine at its finest. The crab ghee roast is legendary. Book ahead — this place is always packed. <strong>Price:</strong> ₹₹₹₹</p>
          
          <h3>2. Le Cirque — The Leela Palace</h3>
          <p>French-Italian fine dining in an opulent setting. Tasting menus that rival the best in Mumbai and Delhi. <strong>Price:</strong> ₹₹₹₹</p>
          
          <h3>3. Ottimo — West Gate</h3>
          <p>Authentic Italian with handmade pasta and wood-fired pizzas. The truffle risotto is divine. <strong>Price:</strong> ₹₹₹</p>
          
          <h2>Best for Groups</h2>
          <h3>4. Meghana Foods — Multiple Locations</h3>
          <p>The gold standard for Andhra meals in Bangalore. Their biryani has a cult following. Affordable and always fresh. <strong>Price:</strong> ₹₹</p>
          
          <h3>5. Truffles — Koramangala</h3>
          <p>Where Bangalore goes for burgers. The American Beef Burger and Truffles Special are iconic. Always a queue. <strong>Price:</strong> ₹₹</p>
          
          <h2>Hidden Gems</h2>
          <h3>6. Nagarjuna — Residency Road</h3>
          <p>The original Andhra meals spot. Fiery, authentic, unforgettable. Eat with your hands. <strong>Price:</strong> ₹</p>
          
          <h3>7. CTR — Malleshwaram</h3>
          <p>Benne dosa that's worth the wait. A Bangalore institution since 1920. Cash only. <strong>Price:</strong> ₹</p>
          
          <h2>Best Rooftop Restaurants</h2>
          <h3>8. Skyye Lounge — UB City</h3>
          <p>Best views in the city. Come for sundowners, stay for pan-Asian cuisine. <strong>Price:</strong> ₹₹₹</p>
          
          <h3>9. High Ultra Lounge — World Trade Center</h3>
          <p>360-degree views from the 26th floor. The cocktails match the altitude. <strong>Price:</strong> ₹₹₹₹</p>
          
          <h2>Best for Vegetarians</h2>
          <p>Bangalore is vegetarian-friendly. MVS Foods, Vidyarthi Bhavan, and Brahmin's Coffee Bar serve legendary South Indian vegetarian food.</p>
          
          <h2>Final Tips</h2>
          <ul>
            <li>Book ahead for fine dining, especially weekends</li>
            <li>Koramangala and Indiranagar have the highest concentration of quality restaurants</li>
            <li>Most restaurants accept cards, but keep cash for street food</li>
            <li>Zomato Gold and EazyDiner offer good discounts</li>
          </ul>
        \`
  },
  {
    slug: "best-malls-bangalore",
    title: "Best Malls in Bangalore: Complete Shopping Guide",
    metaTitle: "Best Malls in Bangalore 2025 — Shopping, Dining & Entertainment Guide",
    metaDescription: "Phoenix Marketcity, UB City, Orion Mall and more. Complete guide to shopping malls in Bangalore with stores, restaurants, and entertainment options.",
    category: "Shopping",
    heroImage: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80",
    readTime: "10 min read",
    faqs: [
      { question: "Which is the biggest mall in Bangalore?", answer: "Phoenix Marketcity in Whitefield is the largest with over 1.4 million sq ft of retail space, followed by Orion Mall and Lulu Mall." },
      { question: "Which mall is best for luxury shopping in Bangalore?", answer: "UB City Mall is Bangalore's premier luxury destination with brands like Louis Vuitton, Gucci, Burberry, and Canali." },
      { question: "What time do malls open and close in Bangalore?", answer: "Most malls open at 10 AM and close at 10 PM. Food courts and cinemas may stay open until 11 PM." },
    ],
    content: \`
          <h2>Shopping in Bangalore</h2>
          <p>Bangalore has transformed into a shopping paradise with malls ranging from luxury to budget-friendly. Here's your complete guide to the best shopping destinations in the city.</p>
          
          <h2>Top 10 Malls in Bangalore</h2>
          
          <h3>1. Phoenix Marketcity — Whitefield</h3>
          <p>The king of Bangalore malls. With 300+ stores, a massive food court, PVR, and entertainment zones, this is a full-day destination. <a href="/malls/phoenix-marketcity">View Details →</a></p>
          <p><strong>Best for:</strong> Everything — fashion, electronics, dining, entertainment</p>
          
          <h3>2. UB City Mall — Vittal Mallya Road</h3>
          <p>Bangalore's only luxury mall. Home to Louis Vuitton, Gucci, Rolex, and the city's finest restaurants. <a href="/malls/ub-city">View Details →</a></p>
          <p><strong>Best for:</strong> Luxury shopping, fine dining</p>
          
          <h3>3. Orion Mall — Rajajinagar</h3>
          <p>Massive mall with Metro connectivity. Great mix of brands, excellent food court, and IMAX cinema. <a href="/malls/orion-mall">View Details →</a></p>
          <p><strong>Best for:</strong> Families, movies, weekend shopping</p>
          
          <h3>4. Mantri Square Mall — Malleshwaram</h3>
          <p>Connected to Mantri Square Metro station. Lifestyle, Central, and plenty of dining options. <a href="/malls/mantri-square-mall">View Details →</a></p>
          <p><strong>Best for:</strong> Quick shopping, Metro-accessible</p>
          
          <h3>5. Nexus Koramangala (Forum Mall)</h3>
          <p>Koramangala's favorite mall. Great for catching up with friends over food and shopping. <a href="/malls/nexus-mall-koramangala">View Details →</a></p>
          <p><strong>Best for:</strong> Casual shopping, dining with friends</p>
          
          <h2>By Category</h2>
          
          <h3>Best for Electronics</h3>
          <ul>
            <li>Croma and Reliance Digital at most major malls</li>
            <li>SP Road for budget electronics and repairs</li>
            <li>Phoenix Marketcity has the biggest electronics floor</li>
          </ul>
          
          <h3>Best for Fashion</h3>
          <ul>
            <li>Zara, H&M, Uniqlo at Phoenix, Orion, VR Bengaluru</li>
            <li>UB City for luxury (Gucci, LV, Armani)</li>
            <li>Commercial Street for budget fashion</li>
          </ul>
          
          <h2>Pro Tips</h2>
          <ul>
            <li>Weekday evenings are less crowded</li>
            <li>Most malls have paid parking (₹20-50 for 2 hours)</li>
            <li>Download mall apps for loyalty points and offers</li>
            <li>Food courts are cheaper than standalone restaurants</li>
          </ul>
        \`
  },
  {
    slug: "indiranagar-complete-guide",
    title: "Indiranagar Food & Nightlife Guide",
    metaTitle: "Indiranagar Guide 2025 — Best Bars, Cafes & Restaurants | BangaloreLife",
    metaDescription: "The complete guide to Indiranagar. Best cafes, bars, restaurants, breweries and things to do in Bangalore's coolest neighborhood.",
    category: "Neighborhoods",
    heroImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",
    readTime: "14 min read",
    faqs: [
      { question: "Why is Indiranagar famous?", answer: "Indiranagar is Bangalore's coolest neighborhood, known for its cafe culture, craft beer scene (Toit!), boutique shopping on 100 Feet Road, and vibrant nightlife." },
      { question: "What are the best bars in Indiranagar?", answer: "Toit Brewpub is the most famous. Also check out Toast & Tonic, Bob's Bar, Sanchez, and The Permit Room for diverse vibes." },
      { question: "Is Indiranagar expensive?", answer: "It's one of the pricier neighborhoods in Bangalore. Expect to pay premium prices at most establishments, though there are budget-friendly options too." },
    ],
    content: \`
          <h2>Welcome to Indiranagar</h2>
          <p>Indiranagar is where Bangalore's creative class comes to play. This tree-lined neighborhood has transformed from a quiet residential area into the city's most vibrant food and nightlife destination.</p>
          
          <h2>The Iconic Spots</h2>
          
          <h3>Toit Brewpub</h3>
          <p>The brewery that started Bangalore's craft beer revolution. Since 2010, Toit has been the gold standard. The Toit Weiss and Tintin Toit are must-tries. Always packed, especially weekends. <a href="/venues/toit-brewpub">View Details →</a></p>
          
          <h3>100 Feet Road</h3>
          <p>The main artery of Indiranagar's cafe and bar scene. Walk from one end to the other and you'll pass 50+ establishments. Start at Toit, end at The Permit Room.</p>
          
          <h2>Best Cafes</h2>
          <h3>Third Wave Coffee Roasters</h3>
          <p>The cafe that brought specialty coffee to Bangalore. Great for remote work with fast WiFi and good coffee.</p>
          
          <h3>Dyu Art Cafe</h3>
          <p>Art gallery meets cafe. Beautiful space with rotating exhibitions and excellent filter coffee.</p>
          
          <h3>Glen's Bakehouse</h3>
          <p>Best croissants in Bangalore. Period. Get here early for fresh pastries.</p>
          
          <h2>Best Bars & Nightlife</h2>
          <h3>Toast & Tonic</h3>
          <p>Craft cocktails and modern European food. The interior is stunning. Perfect for dates.</p>
          
          <h3>Sanchez</h3>
          <p>Mexican food and mezcal in a fun, casual setting. Great for groups.</p>
          
          <h3>The Permit Room</h3>
          <p>South Indian bar food with creative cocktails. The filter coffee martini is iconic.</p>
          
          <h2>Getting There</h2>
          <ul>
            <li><strong>Metro:</strong> Indiranagar Metro Station (Purple Line) — walk to 100 Feet Road</li>
            <li><strong>Auto:</strong> ₹100-200 from Koramangala, ₹200-300 from MG Road</li>
            <li><strong>Parking:</strong> Limited street parking. Use valet at restaurants.</li>
          </ul>
        \`
  },
  {
    slug: "koramangala-guide",
    title: "Koramangala Complete Neighborhood Guide",
    metaTitle: "Koramangala Guide 2025 — Food, Nightlife & Startups | BangaloreLife",
    metaDescription: "Startup hub meets foodie paradise. Complete guide to Koramangala with best restaurants, cafes, bars, and things to do.",
    category: "Neighborhoods",
    heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    readTime: "12 min read",
    faqs: [
      { question: "Why is Koramangala popular?", answer: "Koramangala is Bangalore's startup hub and foodie paradise. It has the highest concentration of restaurants, cafes, and coworking spaces in the city." },
      { question: "What is Koramangala famous for?", answer: "Famous for being the birthplace of Indian unicorns (Flipkart, Swiggy started here), amazing food scene, and Forum Mall." },
      { question: "Is Koramangala safe at night?", answer: "Yes, Koramangala is generally safe. The main areas (5th, 6th, 7th blocks) are well-lit with plenty of restaurants and foot traffic until late." },
    ],
    content: \`
          <h2>The Startup Capital</h2>
          <p>Koramangala is where Indian startups were born. Flipkart started in a 2BHK here. Today, it's a buzzing neighborhood that perfectly blends work, food, and play.</p>
          
          <h2>The Blocks Explained</h2>
          <ul>
            <li><strong>1st Block:</strong> Residential, quieter</li>
            <li><strong>4th Block:</strong> Truffles territory, great for students</li>
            <li><strong>5th Block:</strong> The heart — Forum Mall, best restaurants</li>
            <li><strong>6th Block:</strong> Cafes, coworking, startup offices</li>
            <li><strong>7th Block:</strong> Pubs and nightlife</li>
            <li><strong>8th Block:</strong> Mix of residential and commercial</li>
          </ul>
          
          <h2>Must-Visit Restaurants</h2>
          <h3>Truffles</h3>
          <p>Bangalore's burger institution. The queue is always worth it. Get the Truffles Special or American Beef Burger.</p>
          
          <h3>Meghana Foods</h3>
          <p>Andhra meals and biryani that's almost religious. Multiple outlets — the 5th Block one is most popular.</p>
          
          <h3>Bier Library</h3>
          <p>Craft beer heaven. Rotating taps with rare styles. <a href="/venues/the-bier-library">View Details →</a></p>
          
          <h2>Coworking Spaces</h2>
          <ul>
            <li><strong>WeWork Embassy:</strong> Premium, great for funded startups</li>
            <li><strong>91Springboard:</strong> Community-focused, good events</li>
            <li><strong>Dialogues Cafe:</strong> Cafe + coworking hybrid</li>
          </ul>
        \`
  },
  {
    slug: "best-coworking-spaces-bangalore",
    title: "Top Coworking Spaces in Bangalore",
    metaTitle: "15 Best Coworking Spaces in Bangalore 2025 | BangaloreLife",
    metaDescription: "WeWork, 91springboard, Awfis and indie spaces. Complete guide to coworking in Bangalore with prices, amenities, and locations.",
    category: "Work",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    readTime: "10 min read",
    faqs: [
      { question: "What is the cheapest coworking space in Bangalore?", answer: "Innov8 and BHIVE offer some of the most affordable options starting at ₹5,000-7,000/month for hot desks." },
      { question: "Which coworking is best for startups in Bangalore?", answer: "WeWork Embassy (Koramangala) and 91Springboard (JP Nagar, HSR) are popular with funded startups for their networking opportunities." },
      { question: "Do coworking spaces in Bangalore offer day passes?", answer: "Yes, most spaces offer day passes ranging from ₹500-1,500 depending on the location and amenities." },
    ],
    content: \`
          <h2>The Rise of Coworking in Bangalore</h2>
          <p>Bangalore is India's startup capital, and its coworking scene reflects that. From global giants to indie spaces, there's something for every budget and work style.</p>
          
          <h2>Premium Coworking</h2>
          
          <h3>WeWork</h3>
          <p>Multiple locations across Bangalore. Embassy Golf Links and Prestige Atlanta are most popular. Beautiful spaces, great events, premium pricing.</p>
          <p><strong>Price:</strong> ₹15,000-25,000/month for hot desk</p>
          
          <h3>Cowrks</h3>
          <p>Indian alternative to WeWork. Good locations in Whitefield and Koramangala.</p>
          <p><strong>Price:</strong> ₹12,000-18,000/month</p>
          
          <h2>Mid-Range Options</h2>
          
          <h3>91Springboard</h3>
          <p>Great community, regular events, decent pricing. JP Nagar and HSR locations are excellent.</p>
          <p><strong>Price:</strong> ₹8,000-12,000/month</p>
          
          <h3>BHIVE</h3>
          <p>Homegrown Bangalore brand. Multiple locations. The HSR Layout space is particularly good.</p>
          <p><strong>Price:</strong> ₹6,000-10,000/month</p>
          
          <h2>Budget-Friendly</h2>
          
          <h3>Innov8</h3>
          <p>Affordable without compromising on basics. Good for freelancers and small teams.</p>
          <p><strong>Price:</strong> ₹5,000-8,000/month</p>
          
          <h3>Cafe + Coworking</h3>
          <p>Dialogues Cafe and Third Wave Coffee are popular alternatives — buy coffee, get a workspace.</p>
          
          <h2>By Area</h2>
          <ul>
            <li><strong>Koramangala:</strong> WeWork Embassy, 91Springboard, BHIVE</li>
            <li><strong>Indiranagar:</strong> Cowrks, Regus</li>
            <li><strong>Whitefield:</strong> WeWork, BHIVE, Awfis</li>
            <li><strong>HSR Layout:</strong> 91Springboard, BHIVE, Innov8</li>
          </ul>
        \`
  },
  {
    slug: "best-hotels-bangalore",
    title: "Best Hotels in Bangalore for Every Budget",
    metaTitle: "Best Hotels in Bangalore 2025 — Luxury to Budget | BangaloreLife",
    metaDescription: "From The Leela Palace to budget stays, find the perfect hotel in Bangalore. Sorted by area, price, and traveler type.",
    category: "Stay",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    readTime: "11 min read",
    faqs: [
      { question: "What is the best area to stay in Bangalore?", answer: "For business: Whitefield or Outer Ring Road. For nightlife: Koramangala or Indiranagar. For luxury: MG Road area (near UB City). For budget: Hosur Road or Majestic area." },
      { question: "How much do hotels cost in Bangalore?", answer: "Budget hotels: ₹1,500-3,000/night. Mid-range: ₹4,000-8,000/night. Luxury 5-star: ₹12,000-35,000/night." },
      { question: "Which is the best 5-star hotel in Bangalore?", answer: "The Leela Palace and Taj West End are consistently rated as the best luxury hotels in Bangalore." },
    ],
    content: \`
          <h2>Where to Stay in Bangalore</h2>
          <p>Bangalore's hotel scene caters to everyone from backpackers to business travelers. Here's our curated guide to the best stays across all budgets.</p>
          
          <h2>Luxury (₹15,000+/night)</h2>
          
          <h3>The Leela Palace</h3>
          <p>The gold standard of luxury in Bangalore. Stunning architecture, impeccable service, world-class restaurants. Where royalty stays.</p>
          
          <h3>Taj West End</h3>
          <p>Colonial heritage hotel with 20 acres of gardens. Perfect escape in the heart of the city. The Sunday brunch is legendary.</p>
          
          <h3>ITC Gardenia</h3>
          <p>LEED Platinum certified luxury. Great for business travelers. The Cubbon Pavilion restaurant is excellent.</p>
          
          <h2>Mid-Range (₹5,000-12,000/night)</h2>
          
          <h3>Taj MG Road</h3>
          <p>Business-friendly, great location, consistent quality. Walking distance to UB City and Commercial Street.</p>
          
          <h3>JW Marriott</h3>
          <p>Modern luxury at reasonable prices. Vittal Mallya Road location is prime.</p>
          
          <h3>Conrad Bengaluru</h3>
          <p>Contemporary design, excellent restaurants. Popular with tech executives.</p>
          
          <h2>Budget-Friendly (₹2,000-5,000/night)</h2>
          
          <h3>Lemon Tree Hotels</h3>
          <p>Multiple locations. Reliable, clean, good value. Electronics City and Whitefield properties are well-rated.</p>
          
          <h3>Treebo & FabHotels</h3>
          <p>Standardized budget hotels across the city. Book via their apps for best rates.</p>
          
          <h2>By Area</h2>
          <ul>
            <li><strong>MG Road/UB City:</strong> Best for luxury and central location</li>
            <li><strong>Whitefield:</strong> Best for IT professionals</li>
            <li><strong>Koramangala:</strong> Best for nightlife and food</li>
            <li><strong>Airport Road:</strong> Best for transit stays</li>
          </ul>
        \`
  },
  {
    slug: "whitefield-area-guide",
    title: "Whitefield Area Guide",
    metaTitle: "Whitefield Guide 2025 — Malls, Restaurants & IT Parks | BangaloreLife",
    metaDescription: "Tech hub with great malls, breweries and restaurants. Complete guide to living and visiting Whitefield, Bangalore.",
    category: "Neighborhoods",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    readTime: "10 min read",
    faqs: [
      { question: "Is Whitefield a good place to live in Bangalore?", answer: "Yes, especially for IT professionals. It has excellent infrastructure, malls, restaurants, and good schools. Traffic during peak hours is the main downside." },
      { question: "What is Whitefield famous for?", answer: "Whitefield is Bangalore's IT hub with tech parks (ITPL), international schools (Whitefield Global School, TISB), and Phoenix Marketcity mall." },
      { question: "How far is Whitefield from Bangalore city center?", answer: "Whitefield is about 16 km from MG Road. It takes 30-90 minutes depending on traffic." },
    ],
    content: \`
          <h2>Bangalore's Tech Suburb</h2>
          <p>Whitefield transformed from a small settlement into Bangalore's biggest IT hub. Today, it's practically a self-contained city with everything you need.</p>
          
          <h2>Shopping & Entertainment</h2>
          
          <h3>Phoenix Marketcity</h3>
          <p>The biggest mall in Bangalore. You could spend an entire day here. <a href="/malls/phoenix-marketcity">Full guide →</a></p>
          
          <h3>VR Bengaluru</h3>
          <p>Premium mall with good restaurants and IMAX cinema. Less crowded than Phoenix. <a href="/malls/vr-bengaluru">View Details →</a></p>
          
          <h3>Forum Shantiniketan</h3>
          <p>Neighborhood mall with essentials. Good for quick shopping trips.</p>
          
          <h2>Best Restaurants</h2>
          
          <h3>Windmills Craftworks</h3>
          <p>Whitefield's best brewery. Belgian-style beers and great food. <a href="/venues/windmills-craftworks">View Details →</a></p>
          
          <h3>The Black Pearl</h3>
          <p>Excellent North Indian and Chinese. Popular for family dinners.</p>
          
          <h2>IT Parks</h2>
          <ul>
            <li><strong>ITPL:</strong> The original tech park, home to major companies</li>
            <li><strong>Embassy Tech Village:</strong> Modern campus with great amenities</li>
            <li><strong>RMZ Ecoworld:</strong> Premium tech park</li>
          </ul>
          
          <h2>Getting Around</h2>
          <p>Metro connectivity is coming soon (Purple Line extension). For now, rely on cabs and autos. Traffic can be brutal during peak hours — leave early.</p>
        \`
  },
  {
    slug: "best-brunches-bangalore",
    title: "Best Brunches in Bangalore",
    metaTitle: "15 Best Brunch Spots in Bangalore 2025 | BangaloreLife",
    metaDescription: "Lazy weekend brunches, unlimited buffets, and Instagram-worthy spreads. The best brunch spots in Bangalore.",
    category: "Food",
    heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    readTime: "9 min read",
    faqs: [
      { question: "Which hotel has the best brunch in Bangalore?", answer: "Taj West End's Blue Ginger and ITC Gardenia's Cubbon Pavilion are consistently rated as the best hotel brunches." },
      { question: "How much does brunch cost in Bangalore?", answer: "Cafe brunches: ₹500-1,000. Hotel buffet brunches: ₹2,000-4,000 per person. Luxury brunches with alcohol: ₹3,500-5,000+." },
      { question: "What time is brunch in Bangalore?", answer: "Most brunch spots operate from 11 AM to 3 PM on weekends. Hotel brunches typically run 12:30 PM to 4 PM." },
    ],
    content: \`
          <h2>Weekend Brunch Culture</h2>
          <p>Bangalore's brunch scene has evolved from basic buffets to elaborate culinary experiences. Here's where to spend your lazy Sunday.</p>
          
          <h2>Hotel Brunches (Premium)</h2>
          
          <h3>Taj West End — Blue Ginger</h3>
          <p>The Sunday brunch to end all brunches. Vietnamese cuisine with unlimited bubbles. ₹4,500 with alcohol. Book a week ahead.</p>
          
          <h3>ITC Gardenia — Cubbon Pavilion</h3>
          <p>Massive spread covering cuisines from around the world. Live counters everywhere. ₹3,500+.</p>
          
          <h3>The Leela Palace</h3>
          <p>Opulent setting, champagne brunch. Perfect for special occasions. ₹5,000+.</p>
          
          <h2>Cafe Brunches (Casual)</h2>
          
          <h3>Smoke House Deli</h3>
          <p>European-style brunch with excellent eggs benedict and pancakes. Multiple locations.</p>
          
          <h3>Glen's Bakehouse</h3>
          <p>Best pastries, great coffee. Come early for fresh croissants.</p>
          
          <h3>Cafe Azzure — Koramangala</h3>
          <p>All-day breakfast menu. The Full English is solid.</p>
          
          <h2>Bottomless Brunches</h2>
          <ul>
            <li><strong>Toast & Tonic:</strong> Unlimited prosecco brunch</li>
            <li><strong>Arbor Brewing:</strong> Beer brunch with craft pours</li>
            <li><strong>Olive Beach:</strong> Mediterranean brunch with drinks</li>
          </ul>
        \`
  },
  {
    slug: "bangalore-nightlife-guide",
    title: "Bangalore Nightlife Guide",
    metaTitle: "Bangalore Nightlife Guide 2025 — Clubs, Bars & Live Music | BangaloreLife",
    metaDescription: "Clubs, bars, live music venues and late-night eats. The complete guide to partying in Bangalore.",
    category: "Nightlife",
    heroImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80",
    readTime: "13 min read",
    faqs: [
      { question: "What time do clubs close in Bangalore?", answer: "Most clubs close at 11:30 PM on weekdays and 1 AM on weekends. Some premium clubs with special permits operate until 3 AM." },
      { question: "Which is the best area for nightlife in Bangalore?", answer: "Indiranagar and Koramangala have the best concentration of bars and pubs. MG Road/Brigade Road has clubs. UB City area for upscale lounges." },
      { question: "What's the drinking age in Bangalore?", answer: "The legal drinking age in Karnataka is 21. Carry ID — most places check." },
    ],
    content: \`
          <h2>Partying in India's Pub Capital</h2>
          <p>Bangalore has the best nightlife in India. From legendary brewpubs to high-energy clubs, here's how to make the most of it.</p>
          
          <h2>Best Clubs</h2>
          
          <h3>Loft 38</h3>
          <p>The city's best club right now. Great DJs, good crowd, premium experience. Dress well — there's a strict door policy.</p>
          
          <h3>Playboy Club — Worli</h3>
          <p>Yes, it's here. VIP experience, international DJs on weekends.</p>
          
          <h2>Live Music Venues</h2>
          
          <h3>The Humming Tree</h3>
          <p>Bangalore's best live music venue. Indie bands, stand-up comedy, eclectic programming.</p>
          
          <h3>Hard Rock Cafe</h3>
          <p>Consistent live music every weekend. Rock covers and tribute bands.</p>
          
          <h2>Late Night Eats</h2>
          
          <h3>Empire Restaurant</h3>
          <p>Open until 3 AM. The biryani hits different at 2 AM.</p>
          
          <h3>CTR — Malleshwaram</h3>
          <p>Late-night dosas. The benne dosa is worth staying up for.</p>
          
          <h2>Pro Tips</h2>
          <ul>
            <li>Start early — most places fill up by 10 PM</li>
            <li>Couples and mixed groups get preference at clubs</li>
            <li>Keep cash for autos — Uber/Ola surge late night</li>
            <li>Indiranagar is walkable — pub hop on 100 Feet Road</li>
          </ul>
        \`
  },
  {
    slug: "best-coffee-shops-bangalore",
    title: "Best Coffee Shops in Bangalore",
    metaTitle: "Best Coffee Shops in Bangalore 2025 — Third Wave & Specialty | BangaloreLife",
    metaDescription: "Third wave coffee, specialty roasters, and the best cappuccinos in town. Guide to Bangalore's coffee scene.",
    category: "Cafes",
    heroImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    readTime: "8 min read",
    faqs: [
      { question: "What is the best coffee shop in Bangalore?", answer: "Third Wave Coffee Roasters is the most popular specialty coffee chain. For single-origin and pour-overs, try Blue Tokai, Subko, or Maverick & Farmer." },
      { question: "Where can I get filter coffee in Bangalore?", answer: "For authentic South Indian filter coffee, try Brahmin's Coffee Bar (Basavanagudi), Vidyarthi Bhavan, or Indian Coffee House." },
      { question: "Are there good cafes for remote work in Bangalore?", answer: "Yes! Third Wave, Dialogues Cafe, and Starbucks Reserve offer WiFi and work-friendly environments." },
    ],
    content: \`
          <h2>Coffee Culture in Bangalore</h2>
          <p>Bangalore's coffee scene spans from traditional South Indian filter kaapi to world-class third wave roasters. Here's your caffeine guide.</p>
          
          <h2>Third Wave / Specialty</h2>
          
          <h3>Third Wave Coffee Roasters</h3>
          <p>The chain that started it all. Single-origin beans, skilled baristas, and work-friendly spaces. 20+ locations across the city.</p>
          
          <h3>Blue Tokai</h3>
          <p>Delhi-born roaster now in Bangalore. Great pour-overs and retail beans. Indiranagar and Koramangala locations.</p>
          
          <h3>Subko</h3>
          <p>Mumbai's beloved roaster. Beautiful space in Indiranagar. Try their signature cold brew.</p>
          
          <h2>Traditional Filter Coffee</h2>
          
          <h3>Brahmin's Coffee Bar</h3>
          <p>Since 1960. Authentic filter coffee and idli-vada in a no-frills setting. Cash only.</p>
          
          <h3>Vidyarthi Bhavan</h3>
          <p>Legendary crispy dosas and strong filter coffee. Always a queue.</p>
          
          <h3>Indian Coffee House</h3>
          <p>Heritage cafe with waiters in signature caps. Cheap filter coffee and classic snacks.</p>
          
          <h2>Best for Working</h2>
          <ul>
            <li><strong>Third Wave:</strong> Reliable WiFi, good seating</li>
            <li><strong>Dialogues Cafe:</strong> Coworking + cafe hybrid</li>
            <li><strong>Starbucks Reserve:</strong> Premium, quieter locations</li>
          </ul>
        \`
  },
  {
    slug: "kid-friendly-bangalore",
    title: "Kid-Friendly Activities in Bangalore",
    metaTitle: "Kid-Friendly Activities in Bangalore 2025 — Family Fun Guide | BangaloreLife",
    metaDescription: "Theme parks, museums, play areas and family restaurants. The best things to do with kids in Bangalore.",
    category: "Family",
    heroImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80",
    readTime: "10 min read",
    faqs: [
      { question: "What are the best places to take kids in Bangalore?", answer: "Wonderla Amusement Park, Lumbini Gardens, HAL Aerospace Museum, and Phoenix Marketcity's entertainment zone are family favorites." },
      { question: "Are there indoor play areas in Bangalore?", answer: "Yes! Fun City (in malls), Play Factory, Timezone, and Smaaash offer indoor entertainment for kids." },
      { question: "Which malls are best for families in Bangalore?", answer: "Phoenix Marketcity and Orion Mall have the best family entertainment options with gaming zones, cinemas, and kid-friendly dining." },
    ],
    content: \`
          <h2>Bangalore with Kids</h2>
          <p>Bangalore has plenty to keep little ones entertained. From amusement parks to science museums, here's how to plan family-friendly outings.</p>
          
          <h2>Theme Parks</h2>
          
          <h3>Wonderla</h3>
          <p>Bangalore's best amusement and water park. Full day activity. Go on weekdays to avoid crowds. ₹1,500 per person.</p>
          
          <h3>Innovative Film City</h3>
          <p>Theme park with rides, shows, and movie sets. Good for half-day visits.</p>
          
          <h2>Museums & Learning</h2>
          
          <h3>Visvesvaraya Industrial & Technological Museum</h3>
          <p>Hands-on science exhibits that kids love. The Engine Hall and Space Gallery are highlights. ₹80 entry.</p>
          
          <h3>HAL Aerospace Museum</h3>
          <p>Real aircraft, flight simulators, and aviation history. Perfect for future pilots. ₹100 entry.</p>
          
          <h2>Parks & Outdoors</h2>
          
          <h3>Cubbon Park</h3>
          <p>Central park with playgrounds, walking paths, and toy train. Free entry.</p>
          
          <h3>Lalbagh Botanical Garden</h3>
          <p>Beautiful gardens, glass house, and lake. Great for picnics.</p>
          
          <h3>Lumbini Gardens</h3>
          <p>Boating, wave pool, and gardens. Fun weekend activity. ₹300 entry.</p>
          
          <h2>Indoor Play Areas</h2>
          <ul>
            <li><strong>Fun City:</strong> Available in Phoenix, Orion malls</li>
            <li><strong>Timezone:</strong> Gaming arcades in major malls</li>
            <li><strong>Play Factory:</strong> Indoor play zones for toddlers</li>
          </ul>
        \`
  },
  {
    slug: "best-fine-dining-bangalore",
    title: "Best Fine Dining Restaurants in Bangalore",
    metaTitle: "Best Fine Dining Restaurants in Bangalore 2025 | BangaloreLife",
    metaDescription: "Michelin-worthy experiences, tasting menus, and special occasion restaurants in Bangalore.",
    category: "Food",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    readTime: "9 min read",
    faqs: [
      { question: "What is the most expensive restaurant in Bangalore?", answer: "Le Cirque at The Leela Palace and Karavalli at Taj Gateway are among the most expensive, with meals for two running ₹8,000-15,000+." },
      { question: "Do I need reservations for fine dining in Bangalore?", answer: "Yes, especially for weekend dinners. Book at least 2-3 days ahead for popular restaurants like Karavalli, Le Cirque, and Caperberry." },
      { question: "What's the dress code for fine dining in Bangalore?", answer: "Smart casual to business casual. Avoid shorts, flip-flops, and sleeveless shirts. Some places require closed shoes for men." },
    ],
    content: \`
          <h2>Fine Dining in Bangalore</h2>
          <p>When you want to celebrate, impress, or simply eat exceptionally well, these restaurants deliver world-class experiences.</p>
          
          <h2>The Icons</h2>
          
          <h3>Karavalli — Taj Gateway</h3>
          <p>Coastal Karnataka cuisine elevated to art. The crab ghee roast and appam with stew are legendary. ₹4,000-6,000 for two. Book days ahead.</p>
          
          <h3>Le Cirque Signature — The Leela Palace</h3>
          <p>French-Italian fine dining in one of India's most beautiful hotel restaurants. Tasting menus that rival international standards. ₹8,000+ for two.</p>
          
          <h3>Caperberry — Leela Palace</h3>
          <p>Modern European with molecular gastronomy touches. Chef's tasting menu is the way to go.</p>
          
          <h2>Modern Indian</h2>
          
          <h3>Indian Accent (Coming Soon)</h3>
          <p>Chef Manish Mehrotra's celebrated restaurant is expanding to Bangalore. Watch this space.</p>
          
          <h3>Olive Beach</h3>
          <p>Mediterranean fine dining in a stunning white villa. Perfect for anniversaries and proposals.</p>
          
          <h2>Asian Fine Dining</h2>
          
          <h3>Shiro — UB City</h3>
          <p>Pan-Asian in a dramatic Buddha-themed setting. Great for groups and celebrations.</p>
          
          <h3>Hakkasan</h3>
          <p>When it opens. The global Cantonese fine dining chain is reportedly coming to Bangalore.</p>
          
          <h2>Tips</h2>
          <ul>
            <li>Book at least 3 days ahead for weekends</li>
            <li>Mention special occasions when booking</li>
            <li>Budget ₹5,000-10,000 for two with drinks</li>
            <li>Most accept major credit cards</li>
          </ul>
        \`
  }
];

async function createGuides() {
  console.log('📝 Creating Guide Articles...\n');
  
  for (const guide of GUIDES) {
    const guideDir = path.join(GUIDES_DIR, guide.slug);
    const pagePath = path.join(guideDir, 'page.tsx');
    
    // Create directory
    if (!fs.existsSync(guideDir)) {
      fs.mkdirSync(guideDir, { recursive: true });
    }
    
    // Create page content
    const pageContent = createGuidePage(guide);
    
    fs.writeFileSync(pagePath, pageContent);
    console.log(`✅ Created: /guides/${guide.slug}`);
  }
  
  console.log(`\n🎉 Created ${GUIDES.length} guide articles!`);
}

createGuides().catch(console.error);
