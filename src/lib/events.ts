/**
 * Events data fetching from Supabase
 * All events have INRDeals affiliate tracking built-in
 */

import { supabase, type Event } from './supabase';
import { generateAffiliateLink } from './affiliate';

export interface EventDisplay {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  venue_name?: string;
  city: string;
  price?: string;
  price_min?: number;
  image_url?: string;
  booking_url?: string;
  affiliate_url: string;
  start_date: string;
  end_date?: string;
  start_time?: string;
  is_featured: boolean;
  // Computed display fields
  date_display: string;
  category_emoji: string;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  comedy: '😂',
  concerts: '🎵',
  music: '🎵',
  theatre: '🎭',
  workshops: '🎨',
  sports: '🏏',
  kids: '👶',
  experiences: '✨',
  events: '🎉',
  screening: '🎬',
};

function formatDateDisplay(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  
  if (endDate && endDate !== startDate) {
    const end = new Date(endDate);
    return `${start.toLocaleDateString('en-IN', options)} - ${end.toLocaleDateString('en-IN', options)}`;
  }
  
  return start.toLocaleDateString('en-IN', { ...options, weekday: 'short' });
}

function transformEvent(event: Event): EventDisplay {
  return {
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    category: event.category,
    venue_name: event.venue_name,
    city: event.city,
    price: event.price,
    price_min: event.price_min,
    image_url: event.image_url,
    booking_url: event.booking_url,
    affiliate_url: event.affiliate_url || generateAffiliateLink(event.booking_url || '', event.category),
    start_date: event.start_date,
    end_date: event.end_date,
    start_time: event.start_time,
    is_featured: event.is_featured,
    date_display: formatDateDisplay(event.start_date, event.end_date),
    category_emoji: CATEGORY_EMOJIS[event.category] || '🎉',
  };
}

export async function getFeaturedEvents(limit = 6): Promise<EventDisplay[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .eq('city', 'bangalore')
    .gte('start_date', new Date().toISOString().split('T')[0])
    .order('start_date', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }

  return (data || []).map(transformEvent);
}

export async function getEventsByCategory(category: string, limit = 20): Promise<EventDisplay[]> {
  let query = supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .eq('city', 'bangalore')
    .gte('start_date', new Date().toISOString().split('T')[0])
    .order('start_date', { ascending: true })
    .limit(limit);

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching events by category:', error);
    return [];
  }

  return (data || []).map(transformEvent);
}

export async function getAllEvents(limit = 50): Promise<EventDisplay[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .eq('city', 'bangalore')
    .gte('start_date', new Date().toISOString().split('T')[0])
    .order('start_date', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching all events:', error);
    return [];
  }

  return (data || []).map(transformEvent);
}

export async function getEventBySlug(slug: string): Promise<EventDisplay | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching event:', error);
    return null;
  }

  return transformEvent(data);
}

export async function getEventCategories(): Promise<{ category: string; count: number; emoji: string }[]> {
  const { data, error } = await supabase
    .from('events')
    .select('category')
    .eq('is_active', true)
    .eq('city', 'bangalore')
    .gte('start_date', new Date().toISOString().split('T')[0]);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Count by category
  const counts: Record<string, number> = {};
  (data || []).forEach(e => {
    counts[e.category] = (counts[e.category] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([category, count]) => ({
      category,
      count,
      emoji: CATEGORY_EMOJIS[category] || '🎉',
    }))
    .sort((a, b) => b.count - a.count);
}
