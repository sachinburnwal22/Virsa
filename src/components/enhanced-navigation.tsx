"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Search,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  User,
  ChevronRight,
} from "lucide-react";

export function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(253, 246, 227, 0)", "rgba(253, 246, 227, 0.95)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  const navItems = [
    { name: "Meet Our Karigars", href: "/artisans", icon: User },
    { name: "Browse Crafts", href: "/products", icon: Sparkles },
    { name: "Heritage Gallery", href: "/gallery", icon: Heart },
    { name: "Anokhi Kahaniyan", href: "/stories", icon: Search },
    { name: "Our Mission", href: "/mission", icon: Heart },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="relative group">
              <motion.h1
                className={`text-3xl font-serif transition-colors duration-300 ${
                  isScrolled ? "text-deep-indigo" : "text-white"
                }`}
                animate={{
                  textShadow: isScrolled
                    ? "0 0 0 transparent"
                    : "0 0 20px rgba(255, 255, 255, 0.5)",
                }}
              >
                Virasa
              </motion.h1>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 -z-10"
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={item.href}
                  className={`relative group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? "text-deep-indigo hover:text-terracotta hover:bg-terracotta/10"
                      : "text-white hover:text-blue-300 hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 -z-10"
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {[
              { icon: Search, label: "Search" },
              { icon: Heart, label: "Wishlist", badge: "3" },
              { icon: ShoppingBag, label: "Cart", badge: "2" },
            ].map((action, index) => (
              <motion.div
                key={action.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative p-3 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? "text-deep-indigo hover:text-terracotta hover:bg-terracotta/10"
                      : "text-white hover:text-blue-300 hover:bg-white/10"
                  }`}
                >
                  <action.icon className="w-5 h-5" />
                  {action.badge && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      {action.badge}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden"
          >
            <Button
              variant="ghost"
              size="sm"
              className={`p-3 rounded-full ${
                isScrolled ? "text-deep-indigo" : "text-white"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-warm-ivory/95 backdrop-blur-lg border-t border-terracotta/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 p-4 rounded-xl text-deep-indigo hover:text-terracotta hover:bg-terracotta/10 transition-all duration-300 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.name}</span>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}

              <div className="flex items-center justify-center space-x-4 pt-6 border-t border-terracotta/20">
                {[
                  { icon: Search, label: "Search" },
                  { icon: Heart, label: "Wishlist" },
                  { icon: ShoppingBag, label: "Cart" },
                ].map((action, index) => (
                  <motion.div
                    key={action.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-3 rounded-full text-deep-indigo hover:text-terracotta hover:bg-terracotta/10"
                    >
                      <action.icon className="w-5 h-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
