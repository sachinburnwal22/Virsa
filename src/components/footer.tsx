import Link from "next/link";
import { Heart, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-deep-indigo text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif">Virasa</h3>
            <p className="text-white/80 leading-relaxed">
              Honoring the enduring spirit of our elders by creating a heartfelt
              marketplace where their life's stories and handcrafted creations
              can be discovered and cherished.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 text-white/60 hover:text-marigold cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-white/60 hover:text-marigold cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-white/60 hover:text-marigold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Discover */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Discover</h4>
            <div className="space-y-2">
              <Link
                href="/artisans"
                className="block text-white/80 hover:text-marigold transition-colors"
              >
                Meet Our Karigars
              </Link>
              <Link
                href="/products"
                className="block text-white/80 hover:text-marigold transition-colors"
              >
                Browse Crafts
              </Link>
              <Link
                href="/stories"
                className="block text-white/80 hover:text-marigold transition-colors"
              >
                Anokhi Kahaniyan
              </Link>
              <Link
                href="/mission"
                className="block text-white/80 hover:text-marigold transition-colors"
              >
                Our Mission
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Support</h4>
            <div className="space-y-2">
              <Link
                href="/help"
                className="block text-white/80 hover:text-marigold transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/shipping"
                className="block text-white/80 hover:text-marigold transition-colors"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="block text-white/80 hover:text-marigold transition-colors"
              >
                Returns
              </Link>
              <Link
                href="/contact"
                className="block text-white/80 hover:text-marigold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Stay Connected</h4>
            <p className="text-white/80 text-sm">
              Subscribe to hear the latest stories from our artisans and
              discover new treasures.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:border-marigold"
              />
              <button className="w-full bg-terracotta hover:bg-terracotta/90 text-white py-2 rounded transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/60 text-sm">
            © 2025 Virasa. Made with{" "}
            <Heart className="w-4 h-4 inline text-terracotta" /> for our
            artisans.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-white/60 hover:text-marigold text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/60 hover:text-marigold text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
