import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client-side Supabase client (with anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client (with service role key - bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Get admin client for server components
export function getAdminClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Site configuration - BANGALORE
export const SITE_CONFIG = {
  city: 'bangalore',
  cityDisplayName: 'Bangalore',
  cityAltNames: ['Bengaluru', 'Bangalore'],
  country: 'India',
  timezone: 'Asia/Kolkata',
  currency: 'INR',
  currencySymbol: '₹',
  bookingPlatform: 'BookMyShow',
  affiliateId: 'eve678604838',
};

// Database types
export interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image_url?: string;
  category: string;
  venue_name?: string;
  venue_id?: string;
  city: string;
  price?: string;
  price_min?: number;
  price_currency: string;
  booking_url?: string;
  affiliate_url?: string;
  start_date: string;
  end_date?: string;
  start_time?: string;
  is_featured: boolean;
  is_active: boolean;
  source_name?: string;
  source_event_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  category: string; // pub, bar, club, brewery, lounge, restaurant, cafe
  neighborhood: string; // koramangala, indiranagar, mg-road, etc.
  address?: string;
  city: string;
  phone?: string;
  website?: string;
  google_maps_url?: string;
  price_range?: string; // ₹, ₹₹, ₹₹₹, ₹₹₹₹
  cuisine?: string[];
  features?: string[]; // rooftop, live-music, craft-beer, etc.
  timings?: string;
  rating?: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  overview?: string;
  poster_url?: string;
  backdrop_url?: string;
  trailer_url?: string;
  tmdb_id?: number;
  rating?: number;
  runtime?: number;
  release_date?: string;
  genres: string[];
  language: string;
  status: string; // now_showing, coming_soon
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}
