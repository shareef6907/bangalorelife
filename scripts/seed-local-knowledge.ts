/**
 * Seed Local Knowledge Table
 * 
 * Populates neighbourhood context for RAG pipeline
 * Run with: npx tsx scripts/seed-local-knowledge.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Bangalore neighbourhood data - written like a local would describe it
const NEIGHBORHOODS = [
  {
    area_slug: 'koramangala',
    area_name: 'Koramangala',
    vibe: 'The OG startup and nightlife hub. Mix of tech bros, college kids, and weekend warriors. Always buzzing, always traffic.',
    known_for: ['startups', 'nightlife', 'breweries', 'street food', 'cafes', 'pubs'],
    best_time: 'Evenings and weekends. Weekday afternoons are chill for work cafes.',
    who_goes_there: 'Startup folks, young professionals, students from Christ University, foodies',
    local_tips: 'Parking is a nightmare — take an auto or bike. 80 Feet Road and 5th Block have the most action. 1st Block is quieter, good for brunch spots.',
    landmarks: ['Forum Mall', 'Sony Signal', 'Jyoti Nivas College', 'BDA Complex'],
    street_context: '80 Feet Road is the main drag — pubs and cafes everywhere. 100 Feet Road has bigger restaurants. 5th Block is the party zone.',
  },
  {
    area_slug: 'indiranagar',
    area_name: 'Indiranagar',
    vibe: 'Upscale, trendy, the "it" neighbourhood. Best brunch scene in the city. More polished than Koramangala.',
    known_for: ['brunch', 'rooftop bars', 'boutiques', 'fine dining', 'live music venues'],
    best_time: 'Weekend brunch is legendary. Friday nights for bar hopping on 12th Main.',
    who_goes_there: 'Expats, corporate crowd, couples on dates, Instagram influencers',
    local_tips: '12th Main is where it all happens — walk from one end to the other and you\'ll pass 50 bars. Double Road has the cafes. CMH Road for shopping.',
    landmarks: ['100 Feet Road', '12th Main', 'BDA Complex', 'CMH Road'],
    street_context: '12th Main Road is pub central — Toit, Permit Room, and dozens more. 100 Feet Road has the bigger restaurants. Defence Colony lanes are quieter with hidden gems.',
  },
  {
    area_slug: 'hsr-layout',
    area_name: 'HSR Layout',
    vibe: 'Residential turned trendy. Koramangala\'s younger sibling. Good food, less chaos.',
    known_for: ['cafes', 'co-working spaces', 'biryani joints', 'budget eats', 'weekend hangouts'],
    best_time: 'Anytime — it\'s more of a local vibe than a destination.',
    who_goes_there: 'IT crowd from nearby offices, students, young families',
    local_tips: 'Sector 7 has the most cafes. 27th Main has good food options. Close to Koramangala so you can hop between both.',
    landmarks: ['BDA Complex', '27th Main', 'Agara Lake'],
    street_context: 'Sector 7 is the cafe hub. 27th Main has biryani places and casual dining. Near Agara Lake for evening walks.',
  },
  {
    area_slug: 'whitefield',
    area_name: 'Whitefield',
    vibe: 'IT hub with a life of its own. Far from the city center but has everything you need. Traffic in, traffic out.',
    known_for: ['IT parks', 'malls', 'family restaurants', 'microbreweries', 'weekend getaways'],
    best_time: 'Weekends when the IT crowd is out. Avoid rush hours — the traffic is brutal.',
    who_goes_there: 'IT professionals, families, expats in gated communities',
    local_tips: 'ITPL Main Road has the malls and chains. Forum Neighbourhood Mall is good. If you\'re coming from the city, plan for an hour in traffic.',
    landmarks: ['ITPL', 'Phoenix Marketcity', 'Forum Mall', 'Prestige Shantiniketan'],
    street_context: 'ITPL Main Road is the central artery. Hope Farm Junction area has newer restaurants. Varthur Road side is more residential.',
  },
  {
    area_slug: 'mg-road',
    area_name: 'MG Road',
    vibe: 'The classic Bangalore. Where the city started partying in the 90s. Still iconic, slightly old school.',
    known_for: ['pubs', 'shopping', 'history', 'Metro access', 'corporate offices'],
    best_time: 'After work crowds, weekend evenings. Good Metro connectivity.',
    who_goes_there: 'Office crowd, shoppers, tourists, old-school Bangaloreans',
    local_tips: 'Church Street and Brigade Road are right there — walk around all three. Metro makes it easy to access. Parking is paid and limited.',
    landmarks: ['Trinity Circle', 'Brigade Road junction', 'MG Road Metro Station', 'Garuda Mall'],
    street_context: 'MG Road itself is the main boulevard — big brands and offices. Church Street has cafes and pubs. Brigade Road is the shopping strip.',
  },
  {
    area_slug: 'brigade-road',
    area_name: 'Brigade Road',
    vibe: 'Shopping and street food central. Connects MG Road to Commercial Street. Always crowded, always fun.',
    known_for: ['shopping', 'street food', 'pubs', 'people watching'],
    best_time: 'Evenings and weekends. Christmas time is magical with lights.',
    who_goes_there: 'Shoppers, tourists, college kids, families',
    local_tips: 'Walk from MG Road to Commercial Street through Brigade. Try the street food near Rex Theatre. Parking is tough — use Metro.',
    landmarks: ['Rex Theatre', 'Brigade Towers', 'Church Street junction'],
    street_context: 'One main road connecting MG Road to Residency Road. Side lanes have more shops and eateries.',
  },
  {
    area_slug: 'jayanagar',
    area_name: 'Jayanagar',
    vibe: 'Old Bangalore charm. Tree-lined streets, local joints, family crowd. More authentic than the new areas.',
    known_for: ['South Indian food', 'local eateries', 'shopping complex', 'cool weather', 'parks'],
    best_time: 'Mornings for breakfast, evenings for shopping. The 4th Block shopping complex is a landmark.',
    who_goes_there: 'Families, old-timers, foodies looking for authentic Karnataka food',
    local_tips: '4th Block is the heart — shopping, eating, everything. 9th Block has newer cafes. Best dosas in the city are here.',
    landmarks: ['Jayanagar Shopping Complex (4th Block)', 'Cool Joint', 'Ragigudda Temple'],
    street_context: '4th Block has the iconic shopping complex. 9th Block is more residential with new cafes. 3rd Block has good street food.',
  },
  {
    area_slug: 'jp-nagar',
    area_name: 'JP Nagar',
    vibe: 'Residential and practical. Not flashy, but has everything. Good value compared to Koramangala.',
    known_for: ['family dining', 'budget-friendly', 'local eateries', 'supermarkets'],
    best_time: 'Evenings. It\'s more of a residential area than a destination.',
    who_goes_there: 'Families, IT crowd living nearby, locals',
    local_tips: '6th Phase has newer restaurants. Close to Bannerghatta Road. Less crowded than Koramangala for similar options.',
    landmarks: ['Total Mall', 'Reliance Digital', 'Bannerghatta Road junction'],
    street_context: '15th Cross and 24th Main have most of the food options. 6th Phase is the newer, trendier part.',
  },
  {
    area_slug: 'malleshwaram',
    area_name: 'Malleshwaram',
    vibe: 'Heritage Bangalore. Traditional market vibes, temples, filter coffee. Where grandparents take you for shopping.',
    known_for: ['traditional shopping', 'South Indian breakfast', 'temples', 'flower market', 'heritage'],
    best_time: 'Morning for shopping and breakfast. Sankranti and festivals are special.',
    who_goes_there: 'Old-timers, families, heritage lovers, foodies seeking authentic food',
    local_tips: 'Sampige Road for shopping. 8th Cross for food. Visit Kadalekai Parishe (groundnut fair) in November. Best filter coffee spots.',
    landmarks: ['Mantri Mall', 'Kadu Malleshwara Temple', 'Sampige Road', '8th Cross'],
    street_context: 'Sampige Road is the shopping spine. 8th Cross (Gandhi Bazaar side) has legendary eateries. 18th Cross has newer cafes.',
  },
  {
    area_slug: 'electronic-city',
    area_name: 'Electronic City',
    vibe: 'IT hub number two. Far south, self-contained ecosystem. Work, eat, sleep — all within the township.',
    known_for: ['IT companies', 'Infosys campus', 'affordable dining', 'company canteens'],
    best_time: 'Weekday lunches for the IT crowd. Weekends are quiet.',
    who_goes_there: 'IT professionals, mostly people who work there',
    local_tips: 'Phase 1 has more options than Phase 2. The elevated expressway helps with traffic. Food delivery is king here.',
    landmarks: ['Infosys Campus', 'Wipro Gate', 'Electronic City flyover'],
    street_context: 'Neeladri Road has most restaurants. Phase 1 is more developed. Phase 2 is newer with fewer options.',
  },
  {
    area_slug: 'btm-layout',
    area_name: 'BTM Layout',
    vibe: 'Affordable and practical. Where PGs are plenty and startups bootstrap. Koramangala\'s budget version.',
    known_for: ['PGs', 'budget food', 'cafes', 'delivery kitchens', 'startup offices'],
    best_time: 'Evenings. Popular with the young working crowd.',
    who_goes_there: 'Young professionals, students, startup folks on a budget',
    local_tips: '1st Stage and 2nd Stage have different vibes — 2nd Stage is busier. Good biryani options. Lots of paying guest accommodations.',
    landmarks: ['Udupi Garden', 'BTM Lake', 'Madiwala Market nearby'],
    street_context: '16th Main in 2nd Stage has cafes. 1st Stage is quieter. Near Silk Board junction — traffic central.',
  },
  {
    area_slug: 'marathahalli',
    area_name: 'Marathahalli',
    vibe: 'Gateway to the ORR belt. Busy junction, lots of IT crowd, traffic nightmare but everything available.',
    known_for: ['IT proximity', 'budget food', 'malls', 'ORR access'],
    best_time: 'Off-peak hours. Avoid rush hour at all costs.',
    who_goes_there: 'IT crowd from the ORR belt, families in nearby apartments',
    local_tips: 'Marathahalli Bridge is the landmark. Brookefield is nearby for better options. Traffic is the worst in the city — factor that in.',
    landmarks: ['Marathahalli Bridge', 'Innovative Multiplex', 'ORR junction'],
    street_context: 'Main road along ORR has the commercial action. Inner roads are residential. Brookefield side has newer restaurants.',
  },
  {
    area_slug: 'yelahanka',
    area_name: 'Yelahanka',
    vibe: 'North Bangalore hub. Air Force area, quieter than the south, growing fast.',
    known_for: ['Air Force Station', 'Aerospace', 'lakes', 'quieter vibe'],
    best_time: 'Anytime — it\'s more residential than commercial.',
    who_goes_there: 'Defense families, people working in north Bangalore, locals',
    local_tips: 'New Town has more options than Old Town. Close to the airport. Good for weekend drives to Nandi Hills.',
    landmarks: ['Yelahanka Air Force Station', 'Allalasandra Lake', 'New Town'],
    street_context: 'New Town is the commercial center. Old Town has a more village feel. Near Jakkur for the flying club.',
  },
  {
    area_slug: 'hebbal',
    area_name: 'Hebbal',
    vibe: 'North Bangalore\'s growing hub. Manyata Tech Park proximity. Lake views if you\'re lucky.',
    known_for: ['Manyata Tech Park', 'lake', 'flyover', 'newer apartments'],
    best_time: 'Avoid office hours — Manyata traffic is real.',
    who_goes_there: 'IT crowd from Manyata, residents of new high-rises',
    local_tips: 'Hebbal Lake is nice for evening walks. The flyover is iconic. Close to airport makes it convenient.',
    landmarks: ['Hebbal Flyover', 'Manyata Tech Park', 'Hebbal Lake'],
    street_context: 'Outer Ring Road stretch has the commercial activity. Lake side is quieter residential.',
  },
  {
    area_slug: 'rajajinagar',
    area_name: 'Rajajinagar',
    vibe: 'Solid residential. Close to Malleshwaram, shares the old Bangalore character. Industrial history.',
    known_for: ['Orion Mall', 'industrial area', 'local food', 'quiet residential blocks'],
    best_time: 'Evenings. Orion Mall is the main attraction.',
    who_goes_there: 'Locals, families, mall-goers',
    local_tips: 'Orion Mall is the anchor. Dr. Rajkumar Road has shops. Near Malleshwaram so combine both.',
    landmarks: ['Orion Mall', 'Dr. Rajkumar Road', 'Industrial Area'],
    street_context: 'Dr. Rajkumar Road (80 Feet Road) is the main commercial stretch. Industrial area side is changing fast.',
  },
  {
    area_slug: 'sarjapur',
    area_name: 'Sarjapur Road',
    vibe: 'The ORR overflow. Tech parks, new apartments, still developing. Traffic is part of life.',
    known_for: ['tech parks', 'new restaurants', 'apartment complexes', 'schools'],
    best_time: 'Weekends when offices are closed and roads are clearer.',
    who_goes_there: 'IT crowd, young families in new apartments, people escaping city prices',
    local_tips: 'Wipro junction to Carmelaram stretch has most options. Traffic is brutal on weekdays. New places opening constantly.',
    landmarks: ['Wipro Sarjapur', 'Decathlon', 'Rainbow Drive'],
    street_context: 'Main Sarjapur Road has all the action. Cross roads lead to residential pockets. Carmelaram side is newer.',
  },
  {
    area_slug: 'basavanagudi',
    area_name: 'Basavanagudi',
    vibe: 'Old-world charm. The Bull Temple area. Traditional Bangalore at its finest.',
    known_for: ['Bull Temple', 'Bugle Rock', 'traditional eateries', 'Gandhi Bazaar', 'heritage'],
    best_time: 'Morning for the temple and breakfast. Evening for Gandhi Bazaar.',
    who_goes_there: 'Families, heritage lovers, foodies, temple visitors',
    local_tips: 'Gandhi Bazaar is a must for food and shopping. DVG Road has old eateries. Combine with Jayanagar visit.',
    landmarks: ['Bull Temple', 'Bugle Rock Park', 'Gandhi Bazaar', 'DVG Road'],
    street_context: 'DVG Road and Gandhi Bazaar are the food hubs. Bull Temple Road for heritage. Quieter residential lanes around.',
  },
  {
    area_slug: 'cunningham-road',
    area_name: 'Cunningham Road',
    vibe: 'Premium central area. Corporate offices, five-star hotels, expensive everything.',
    known_for: ['five-star hotels', 'corporate offices', 'upscale dining', 'Residency Road proximity'],
    best_time: 'Business lunches, evening drinks at hotel bars.',
    who_goes_there: 'Corporate executives, business travelers, hotel guests',
    local_tips: 'Good for business dining. Near UB City for luxury shopping. Parking usually at hotels.',
    landmarks: ['ITC Gardenia', 'Sheraton', 'Prestige Centre'],
    street_context: 'Main road has hotels and offices. Connects to Residency Road and MG Road easily.',
  },
  {
    area_slug: 'church-street',
    area_name: 'Church Street',
    vibe: 'The original cool. Cafes, bookshops, and bars. Pedestrian-friendly stretch.',
    known_for: ['cafes', 'pubs', 'bookshops', 'pedestrian zone', 'Koshy\'s'],
    best_time: 'Any evening. Sunday brunch is popular.',
    who_goes_there: 'Everyone — students, office crowd, tourists, locals on dates',
    local_tips: 'Walk from MG Road to Brigade Road through Church Street. Koshy\'s is legendary. The pedestrian zone is new and nice.',
    landmarks: ['Koshy\'s', 'Church Street Social', 'Blossom Book House'],
    street_context: 'The whole street is the attraction. One end connects to MG Road, other to Brigade Road. Fully walkable.',
  },
  {
    area_slug: 'ub-city',
    area_name: 'UB City',
    vibe: 'Luxury central. Where Bangalore goes to feel fancy. High-end everything.',
    known_for: ['luxury brands', 'fine dining', 'rooftop bars', 'corporate offices'],
    best_time: 'Evenings for drinks, lunch for business meetings.',
    who_goes_there: 'High-flyers, luxury shoppers, business executives, special occasions',
    local_tips: 'Rooftop bars have amazing views. Valet parking available. Dress code at some restaurants.',
    landmarks: ['UB Tower', 'The Collection', 'Vittal Mallya Road'],
    street_context: 'Self-contained luxury mall. Near Cunningham Road and MG Road. Vittal Mallya Road access.',
  },
];

/**
 * Generate embedding for neighbourhood text
 */
async function embedText(text: string): Promise<number[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'models/text-embedding-004',
      content: { parts: [{ text }] },
      taskType: 'RETRIEVAL_DOCUMENT'
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Embedding API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.embedding.values;
}

/**
 * Create embedding text for an area
 */
function createAreaText(area: typeof NEIGHBORHOODS[0]): string {
  const parts = [
    `${area.area_name} is a neighbourhood in Bangalore.`,
    `Vibe: ${area.vibe}`,
    `Known for: ${area.known_for.join(', ')}.`,
    `Who goes there: ${area.who_goes_there}`,
    `Best time to visit: ${area.best_time}`,
    `Local tips: ${area.local_tips}`,
    `Landmarks: ${area.landmarks.join(', ')}.`,
    area.street_context,
  ];
  return parts.join(' ');
}

async function main() {
  console.log('🏘️ Seeding Local Knowledge Table');
  console.log('=================================\n');

  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not set in .env.local');
    process.exit(1);
  }

  for (const area of NEIGHBORHOODS) {
    console.log(`📍 Processing ${area.area_name}...`);

    try {
      // Generate embedding
      const text = createAreaText(area);
      const embedding = await embedText(text);

      // Upsert to database
      const { error } = await supabase
        .from('local_knowledge')
        .upsert({
          area_slug: area.area_slug,
          area_name: area.area_name,
          vibe: area.vibe,
          known_for: area.known_for,
          best_time: area.best_time,
          who_goes_there: area.who_goes_there,
          local_tips: area.local_tips,
          landmarks: area.landmarks,
          street_context: area.street_context,
          embedding: `[${embedding.join(',')}]`,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'area_slug'
        });

      if (error) {
        console.log(`   ❌ Error: ${error.message}`);
      } else {
        console.log(`   ✅ Done`);
      }

      // Small delay for rate limiting
      await new Promise(r => setTimeout(r, 200));

    } catch (error: any) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  console.log('\n🎉 Local knowledge seeding complete!');
  console.log(`   Total areas: ${NEIGHBORHOODS.length}`);
}

main().catch(console.error);
