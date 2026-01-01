import type React from "react";
import { CustomCursor } from "@/components/custom-cursor";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FavoritesProvider } from "@/contexts/favorites-context";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "../contexts/auth-context";
import { AppWrapper } from "../components/app-wrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Virasa - Authentic Indian Handicrafts Marketplace",
  description:
    "Discover authentic handcrafted treasures from master artisans across India. Each piece tells a story of tradition, skill, and passionate craftsmanship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <CustomCursor />
        <AuthProvider>
          <AppWrapper>
            <FavoritesProvider>
              <CartProvider>
                <Navigation />
                {children}
                <Footer />
              </CartProvider>
            </FavoritesProvider>
          </AppWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
