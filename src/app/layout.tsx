import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "BangaloreLife — Discover the Best of India's Tech Capital",
    template: "%s | BangaloreLife",
  },
  verification: {
    google: "GcTFRelyYHQrXzlxKMPLEFJp_GjNah7i7G6g3zcY6E8",
  },
  description: "Your guide to the best pubs, breweries, restaurants, and things to do in Bangalore. Real Google ratings, reviews, and insider tips for India's tech capital.",
  keywords: ["bangalore pubs", "bangalore nightlife", "bangalore breweries", "best restaurants bangalore", "things to do bangalore", "koramangala pubs", "indiranagar bars", "bangalore bars"],
  authors: [{ name: "BangaloreLife" }],
  creator: "BangaloreLife",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bangalorelife.com",
    siteName: "BangaloreLife",
    title: "BangaloreLife — Discover the Best of Bangalore",
    description: "The ultimate guide to pubs, breweries, restaurants, and experiences in India's tech capital.",
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
    title: "BangaloreLife — Discover Bangalore",
    description: "The ultimate guide to pubs, breweries, restaurants, and experiences in India's tech capital.",
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
      <body className="antialiased bg-zinc-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
