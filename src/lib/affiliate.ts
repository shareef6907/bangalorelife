/**
 * INRDeals Affiliate Link Generator for BangaloreLife.com
 * 
 * CRITICAL: Every BookMyShow link MUST use this function.
 * Never link directly to BookMyShow - always go through INRDeals tracking.
 * 
 * Account Details:
 * - INRDeals Username: eve678604838
 * - BookMyShow Store ID: 252
 * - Campaign Type: CPS (Cost Per Sale)
 * - Payout: ₹5.6 per successful sale
 * - Cookie Duration: 30 days
 */

const INRDEALS_PUBLISHER_ID = 'eve678604838';
const TRAFFIC_SOURCE = 'bangalorelife';
const CAMPAIGN_TYPE = 'cps';

/**
 * Generates an INRDeals affiliate tracking URL for BookMyShow links
 * 
 * @param bookMyShowUrl - The destination BookMyShow URL
 * @param subid - Optional tracking parameter for internal analytics
 * @returns The complete INRDeals tracking URL
 * 
 * @example
 * // Movies page
 * generateAffiliateLink('https://in.bookmyshow.com/explore/movies-bangalore')
 * 
 * // Specific event with tracking
 * generateAffiliateLink('https://in.bookmyshow.com/bengaluru/events/comedy-show/ET00123456', 'homepage-hero')
 */
export function generateAffiliateLink(bookMyShowUrl: string, subid?: string): string {
  const encodedUrl = encodeURIComponent(bookMyShowUrl);
  let link = `https://inr.deals/track?id=${INRDEALS_PUBLISHER_ID}&src=${TRAFFIC_SOURCE}&campaign=${CAMPAIGN_TYPE}&url=${encodedUrl}`;
  
  if (subid) {
    link += `&subid=${encodeURIComponent(subid)}`;
  }
  
  return link;
}

/**
 * Common BookMyShow URLs for Bangalore
 */
export const BOOKMYSHOW_URLS = {
  // Movies
  moviesExplore: 'https://in.bookmyshow.com/explore/movies-bangalore',
  moviesNowShowing: 'https://in.bookmyshow.com/bengaluru/movies',
  moviesComingSoon: 'https://in.bookmyshow.com/bengaluru/movies/coming-soon',
  
  // Events
  eventsExplore: 'https://in.bookmyshow.com/explore/events-bangalore',
  eventsAll: 'https://in.bookmyshow.com/bengaluru/events',
  
  // Event Categories
  eventsComedy: 'https://in.bookmyshow.com/explore/comedy-shows-bengaluru',
  eventsConcerts: 'https://in.bookmyshow.com/explore/music-shows-bengaluru',
  eventsTheatre: 'https://in.bookmyshow.com/explore/plays-bengaluru',
  eventsWorkshops: 'https://in.bookmyshow.com/explore/workshops-bengaluru',
  eventsSports: 'https://in.bookmyshow.com/explore/sports-bengaluru',
  eventsKids: 'https://in.bookmyshow.com/explore/kids-bengaluru',
  
  // Experiences
  experiences: 'https://in.bookmyshow.com/explore/experiences-bangalore',
};

/**
 * Pre-built affiliate links for common pages
 */
export const AFFILIATE_LINKS = {
  movies: generateAffiliateLink(BOOKMYSHOW_URLS.moviesExplore, 'nav-movies'),
  events: generateAffiliateLink(BOOKMYSHOW_URLS.eventsExplore, 'nav-events'),
  comedy: generateAffiliateLink(BOOKMYSHOW_URLS.eventsComedy, 'nav-comedy'),
  concerts: generateAffiliateLink(BOOKMYSHOW_URLS.eventsConcerts, 'nav-concerts'),
  experiences: generateAffiliateLink(BOOKMYSHOW_URLS.experiences, 'nav-experiences'),
};

/**
 * Generates a movie booking link
 */
export function getMovieBookingLink(movieTitle: string, movieId?: string): string {
  const baseUrl = movieId 
    ? `https://in.bookmyshow.com/bengaluru/movies/${movieId}`
    : BOOKMYSHOW_URLS.moviesNowShowing;
  
  const sluggedTitle = movieTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  return generateAffiliateLink(baseUrl, `movie-${sluggedTitle}`);
}

/**
 * Generates an event booking link
 */
export function getEventBookingLink(eventTitle: string, eventUrl?: string): string {
  const baseUrl = eventUrl || BOOKMYSHOW_URLS.eventsAll;
  const sluggedTitle = eventTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').slice(0, 30);
  return generateAffiliateLink(baseUrl, `event-${sluggedTitle}`);
}

/**
 * Link props for affiliate links (use on all <a> tags)
 */
export const affiliateLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
