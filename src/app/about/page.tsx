import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About BangaloreLife - Your Guide to Namma Bengaluru",
  description: "BangaloreLife is your ultimate guide to Bangalore's nightlife, restaurants, events, and experiences. Discover the best of India's pub capital.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-16">
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-zinc-500 hover:text-violet-400 text-sm">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-violet-400 text-sm">About</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extralight text-white mb-8">
              About <span className="text-gradient">BangaloreLife</span>
            </h1>
            
            <div className="prose prose-invert prose-zinc max-w-none font-light">
              <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                BangaloreLife is your definitive guide to experiencing Namma Bengaluru. 
                From legendary breweries to hidden speakeasies, from street food to 
                fine dining, we cover everything that makes Bangalore India&apos;s most 
                exciting city.
              </p>

              <h2 className="text-2xl font-extralight text-white mt-12 mb-4">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                We believe locals and visitors deserve a better way to discover 
                Bangalore. Not generic listicles or paid promotions — but honest, 
                curated recommendations from people who actually know the city.
              </p>

              <h2 className="text-2xl font-extralight text-white mt-12 mb-4">What We Cover</h2>
              <ul className="text-zinc-400 leading-relaxed space-y-3">
                <li><strong className="text-white">Nightlife:</strong> Breweries, pubs, rooftop bars, clubs, and live music venues</li>
                <li><strong className="text-white">Food:</strong> Restaurants, street food, cafes, and hidden gems</li>
                <li><strong className="text-white">Events:</strong> Concerts, comedy shows, festivals, and experiences</li>
                <li><strong className="text-white">Areas:</strong> Neighborhood guides for every part of the city</li>
                <li><strong className="text-white">Getaways:</strong> Weekend escapes from the city</li>
              </ul>

              <h2 className="text-2xl font-extralight text-white mt-12 mb-4">Part of NightsOut Network</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                BangaloreLife is part of the NightsOut network, covering cities 
                across India and the Middle East. Our sister sites include guides 
                for Dubai, Riyadh, and more.
              </p>

              <div className="mt-12 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-lg font-light text-white mb-2">Get in Touch</h3>
                <p className="text-zinc-400 text-sm">
                  Have a suggestion or correction? Want to partner with us?
                </p>
                <p className="text-violet-400 mt-2">hello@bangalorelife.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
