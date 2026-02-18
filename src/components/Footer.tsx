import Link from "next/link";

const footerLinks = {
  explore: [
    { name: "Nightlife", href: "/nightlife" },
    { name: "Breweries", href: "/breweries" },
    { name: "Restaurants", href: "/restaurants" },
    { name: "Cafes", href: "/cafes" },
    { name: "Events", href: "/events" },
    { name: "Cinema", href: "/cinema" },
  ],
  areas: [
    { name: "Indiranagar", href: "/areas/indiranagar" },
    { name: "Koramangala", href: "/areas/koramangala" },
    { name: "MG Road", href: "/areas/mg-road" },
    { name: "Whitefield", href: "/areas/whitefield" },
    { name: "HSR Layout", href: "/areas/hsr-layout" },
    { name: "JP Nagar", href: "/areas/jp-nagar" },
  ],
  guides: [
    { name: "Things to Do", href: "/things-to-do" },
    { name: "Weekend Getaways", href: "/weekend-getaways" },
    { name: "Date Night", href: "/guides/date-night" },
    { name: "Pub Crawl Guide", href: "/guides/pub-crawl" },
    { name: "First Time in Bangalore", href: "/guides/first-time" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-light">
              Bangalore<span className="text-violet-400 font-medium">Life</span>
            </Link>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              Your ultimate guide to Bangalore&apos;s nightlife, restaurants, events, and experiences. 
              Discover Namma Bengaluru.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Explore</h3>
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

          {/* Areas */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Areas</h3>
            <ul className="space-y-3">
              {footerLinks.areas.map((link) => (
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
            <h3 className="text-sm font-medium text-white mb-4">Guides</h3>
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
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
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
