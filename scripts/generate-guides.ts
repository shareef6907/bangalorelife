import * as fs from 'fs';
import * as path from 'path';

// Guides to create (12 new ones)
const NEW_GUIDES = [
  {
    slug: "best-restaurants-bangalore-2025",
    title: "Best Restaurants in Bangalore 2025",
    category: "Food",
    description: "From fine dining to hidden gems, the definitive guide to eating well in Bangalore.",
  },
  {
    slug: "best-malls-bangalore",
    title: "Best Malls in Bangalore: Complete Shopping Guide",
    category: "Shopping",
    description: "Phoenix Marketcity, UB City, Orion Mall and more. Everything you need to know about shopping in Bangalore.",
  },
  {
    slug: "indiranagar-complete-guide",
    title: "Indiranagar Food & Nightlife Guide",
    category: "Neighborhoods",
    description: "The complete guide to Bangalore's coolest neighborhood. Best cafes, bars, restaurants and things to do.",
  },
  {
    slug: "koramangala-guide",
    title: "Koramangala Complete Neighborhood Guide",
    category: "Neighborhoods",
    description: "Startup hub meets foodie paradise. Everything worth doing in Koramangala.",
  },
  {
    slug: "best-coworking-spaces-bangalore",
    title: "Top Coworking Spaces in Bangalore",
    category: "Work",
    description: "WeWork, 91springboard, Awfis and indie spaces. Where to work remotely in Bangalore.",
  },
  {
    slug: "best-hotels-bangalore",
    title: "Best Hotels in Bangalore for Every Budget",
    category: "Stay",
    description: "From luxury 5-stars to budget-friendly stays. Where to stay in Bangalore.",
  },
  {
    slug: "whitefield-area-guide",
    title: "Whitefield Area Guide",
    category: "Neighborhoods",
    description: "Tech hub with great malls, breweries and restaurants. The complete Whitefield guide.",
  },
  {
    slug: "best-brunches-bangalore",
    title: "Best Brunches in Bangalore",
    category: "Food",
    description: "Lazy weekend brunches, unlimited buffets, and Instagram-worthy spreads.",
  },
  {
    slug: "bangalore-nightlife-guide",
    title: "Bangalore Nightlife Guide",
    category: "Nightlife",
    description: "Clubs, bars, live music venues and late-night eats. How to party in Bangalore.",
  },
  {
    slug: "best-coffee-shops-bangalore",
    title: "Best Coffee Shops in Bangalore",
    category: "Cafes",
    description: "Third wave coffee, specialty roasters, and the best cappuccinos in town.",
  },
  {
    slug: "kid-friendly-bangalore",
    title: "Kid-Friendly Activities in Bangalore",
    category: "Family",
    description: "Theme parks, museums, play areas and family restaurants. Bangalore with kids.",
  },
  {
    slug: "best-fine-dining-bangalore",
    title: "Best Fine Dining Restaurants in Bangalore",
    category: "Food",
    description: "Michelin-worthy experiences, tasting menus, and special occasion restaurants.",
  },
];

console.log('Guides to create:', NEW_GUIDES.length);
NEW_GUIDES.forEach(g => console.log(`  - ${g.slug}: ${g.title}`));
