'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { 
    name: 'Neighborhoods', 
    href: '/neighborhoods',
    submenu: [
      { name: 'Koramangala', href: '/neighborhoods/koramangala' },
      { name: 'Indiranagar', href: '/neighborhoods/indiranagar' },
      { name: 'MG Road', href: '/neighborhoods/mg-road-brigade-road' },
      { name: 'Whitefield', href: '/neighborhoods/whitefield' },
      { name: 'HSR Layout', href: '/neighborhoods/hsr-layout' },
    ]
  },
  { 
    name: 'Guides', 
    href: '/guides',
    submenu: [
      { name: 'Best Pubs', href: '/guides/best-pubs-bangalore' },
      { name: 'Best Breweries', href: '/guides/best-breweries-bangalore' },
      { name: 'Best Rooftop Bars', href: '/guides/best-rooftop-bars-bangalore' },
      { name: 'Date Night Ideas', href: '/guides/date-night-bangalore' },
      { name: 'Things to Do', href: '/guides/things-to-do-bangalore' },
    ]
  },
  { name: 'Venues', href: '/venues' },
  { 
    name: 'Things to Do', 
    href: '/things-to-do',
    submenu: [
      { name: 'Nightlife', href: '/things-to-do/nightlife' },
      { name: 'Food & Drink', href: '/things-to-do/food-and-drink' },
      { name: 'Outdoors', href: '/things-to-do/outdoors' },
      { name: 'Day Trips', href: '/things-to-do/day-trips' },
    ]
  },
  { name: 'This Weekend', href: '/this-weekend' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌃</span>
            <span className="text-xl font-serif font-bold text-stone-900">
              BangaloreLife
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.submenu && setOpenSubmenu(link.name)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <Link
                  href={link.href}
                  className="px-4 py-2 text-stone-700 hover:text-emerald-700 font-medium text-sm transition-colors rounded-lg hover:bg-stone-100"
                >
                  {link.name}
                  {link.submenu && (
                    <span className="ml-1 text-stone-400">▾</span>
                  )}
                </Link>
                
                {/* Dropdown */}
                {link.submenu && openSubmenu === link.name && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-stone-200 py-2">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-stone-700 hover:text-emerald-700 hover:bg-stone-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="border-t border-stone-100 mt-2 pt-2">
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-stone-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className="block py-3 text-stone-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.submenu && (
                  <div className="pl-4 pb-2">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-stone-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
