import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "BangaloreLife - Nightlife, Events & Things to Do in Bangalore",
    template: "%s | BangaloreLife",
  },
  verification: {
    google: "GcTFRelyYHQrXzlxKMPLEFJp_GjNah7i7G6g3zcY6E8",
  },
  description: "Your ultimate guide to Bangalore's nightlife, breweries, cafes, restaurants, concerts and events. Discover the best of Namma Bengaluru.",
  keywords: ["bangalore nightlife", "things to do in bangalore", "pubs in bangalore", "breweries bangalore", "events bangalore", "concerts bangalore", "restaurants bangalore"],
  authors: [{ name: "BangaloreLife" }],
  creator: "BangaloreLife",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bangalorelife.com",
    siteName: "BangaloreLife",
    title: "BangaloreLife - Nightlife, Events & Things to Do",
    description: "Your ultimate guide to Bangalore's nightlife, breweries, cafes, restaurants, concerts and events.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BangaloreLife - Discover Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BangaloreLife - Nightlife & Events in Bangalore",
    description: "Discover the best of Bangalore's nightlife, breweries, cafes, and events.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
