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
    name: 'Explore', 
    href: '/things-to-do',
    submenu: [
      { name: 'Nightlife', href: '/nightlife' },
      { name: 'Breweries', href: '/breweries' },
      { name: 'Restaurants', href: '/restaurants' },
      { name: 'Cafes', href: '/cafes' },
    ]
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">⚡</span>
            <span className="text-xl font-bold text-white tracking-tight">
              Bangalore<span className="text-violet-400">Life</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.submenu && setOpenSubmenu(link.name)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <Link
                  href={link.href}
                  className="px-4 py-2 text-zinc-300 hover:text-white font-medium text-sm transition-colors rounded-lg hover:bg-zinc-800/50"
                >
                  {link.name}
                  {link.submenu && (
                    <span className="ml-1 text-zinc-500">▾</span>
                  )}
                </Link>
                
                {/* Dropdown */}
                {link.submenu && openSubmenu === link.name && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="border-t border-zinc-800 mt-2 pt-2">
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-sm text-violet-400 hover:text-violet-300 font-medium"
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (Expanded) */}
        {searchOpen && (
          <div className="py-4 border-t border-zinc-800 animate-in slide-in-from-top-2 duration-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search venues, neighborhoods, guides..."
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
                autoFocus
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-800 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <div key={link.name} className="py-1">
                <Link
                  href={link.href}
                  className="block py-3 text-white font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.submenu && (
                  <div className="pl-4 pb-2 space-y-1">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-zinc-400 hover:text-white transition-colors"
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
