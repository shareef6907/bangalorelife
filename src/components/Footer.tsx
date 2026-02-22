import Link from "next/link";

const footerLinks = {
  explore: [
    { name: "Venues", href: "/venues" },
    { name: "Nightlife", href: "/nightlife" },
    { name: "Breweries", href: "/breweries" },
    { name: "Restaurants", href: "/restaurants" },
    { name: "Cafes", href: "/cafes" },
  ],
  neighborhoods: [
    { name: "Koramangala", href: "/neighborhoods/koramangala" },
    { name: "Indiranagar", href: "/neighborhoods/indiranagar" },
    { name: "MG Road", href: "/neighborhoods/mg-road-brigade-road" },
    { name: "Whitefield", href: "/neighborhoods/whitefield" },
    { name: "HSR Layout", href: "/neighborhoods/hsr-layout" },
    { name: "Church Street", href: "/neighborhoods/church-street" },
  ],
  guides: [
    { name: "Best Pubs", href: "/guides/best-pubs-bangalore" },
    { name: "Best Breweries", href: "/guides/best-breweries-bangalore" },
    { name: "Best Rooftop Bars", href: "/guides/best-rooftop-bars-bangalore" },
    { name: "Date Night Ideas", href: "/guides/date-night-bangalore" },
    { name: "Things to Do", href: "/guides/things-to-do-bangalore" },
    { name: "Day Trips", href: "/guides/day-trips-from-bangalore" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold text-white">
                Bangalore<span className="text-violet-400">Life</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed max-w-xs">
              Discover the best pubs, breweries, restaurants, and things to do in India&apos;s tech capital.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://twitter.com/bangalorelife" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-violet-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/bangalorelife" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-violet-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-violet-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Neighborhoods</h3>
            <ul className="space-y-3">
              {footerLinks.neighborhoods.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-violet-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Guides</h3>
            <ul className="space-y-3">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-violet-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} BangaloreLife. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-600">
            <Link href="/about" className="hover:text-violet-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-violet-400 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-violet-400 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
