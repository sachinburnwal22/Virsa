"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Star,
  Sparkles,
  Heart,
  Award,
  Users,
  Globe,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EnhancedHero } from "@/components/enhanced-hero";
import { EnhancedMarquee } from "@/components/enhanced-marquee";
import { LoopingMarquee } from "@/components/looping-marquee";
import { RevolutionaryGallery } from "@/components/revolutionary-gallery";

// Enhanced Loader Component (keeping the great one)
function EnhancedLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center z-50"
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            className="mx-auto"
          >
            <motion.circle
              cx="75"
              cy="75"
              r="60"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              initial={{ pathLength: 0, rotate: 0 }}
              animate={{ pathLength: 1, rotate: 360 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.path
              d="M75 25 L95 45 L85 65 L105 85 L75 115 L45 85 L65 65 L25 45 Z"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.circle
              cx="75"
              cy="75"
              r="8"
              fill="url(#gradient3)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ delay: 2, duration: 1 }}
            />
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <radialGradient id="gradient3">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </radialGradient>
            </defs>
          </svg>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="text-5xl font-serif bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
        >
          Virasa
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="text-gray-300 text-lg"
        >
          Crafting Stories, Weaving Dreams...
        </motion.p>
        <motion.div
          className="w-64 h-1 bg-gray-800 rounded-full mx-auto mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 3.2, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Enhanced Stats Section
function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: "1000+",
      label: "Master Artisans",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      number: "50+",
      label: "Traditional Crafts",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      number: "25+",
      label: "Indian States",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Heart,
      number: "10K+",
      label: "Happy Customers",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-warm-ivory to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #E07A5F 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-deep-indigo mb-4">
            Celebrating Heritage Through Numbers
          </h2>
          <p className="text-lg text-deep-indigo/70 max-w-2xl mx-auto">
            Our growing community of artisans and craft lovers spans across
            India
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    className="text-4xl font-bold text-deep-indigo mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-deep-indigo/70 font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced Featured Artisan Component
function EnhancedFeaturedArtisan() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #E07A5F 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-20 items-center relative z-10"
      >
        {/* Image Side */}
        <motion.div
          className="relative group order-2 lg:order-1"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/p.jpg?height=700&width=600&text=Kamala+Devi+Master+Artisan"
              alt="Kamala Devi, Master Artisan"
              width={600}
              height={700}
              className="object-cover w-full transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Floating Badge */}
            <motion.div
              className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-deep-indigo font-medium text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-marigold" />
                Artisan of the Week
              </span>
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              className="absolute bottom-6 right-6 bg-terracotta/95 backdrop-blur-sm rounded-full px-6 py-3 text-white shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="font-bold text-lg">50+ Years</span>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-marigold/30 to-terracotta/30 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Content Side */}
        <div className="space-y-8 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-3 h-3 bg-terracotta rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <h3 className="text-sm uppercase tracking-wider text-terracotta font-medium">
                Featured Master Craftsperson
              </h3>
            </div>

            <h2 className="text-5xl lg:text-7xl font-serif text-deep-indigo mb-6 leading-tight">
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#E07A5F" }}
                transition={{ duration: 0.3 }}
              >
                Kamala Devi
              </motion.span>
            </h2>

            <p className="text-deep-indigo/70 mb-6 text-xl">
              Master Block Printer • Jaipur, Rajasthan
            </p>

            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Star className="w-6 h-6 fill-marigold text-marigold" />
                  </motion.div>
                ))}
              </div>
              <span className="text-deep-indigo/60 ml-2 font-medium">
                Master of Traditional Crafts
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-deep-indigo/80 leading-relaxed text-lg"
          >
            For over fifty years, Kamala has lived in the same sun-drenched
            courtyard in Jaipur, her hands rarely still. She learned
            block-printing from her mother, using only natural dyes and motifs
            drawn from the birds outside her window. Each piece she creates
            carries the wisdom of generations and the warmth of her loving
            hands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-terracotta to-red-500 hover:from-red-500 hover:to-terracotta text-white px-10 py-4 text-lg rounded-full shadow-xl relative overflow-hidden group"
              >
                <Link href="/artisans/kamala-devi">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Read Her Story
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-deep-indigo text-deep-indigo hover:bg-deep-indigo hover:text-white px-10 py-4 text-lg rounded-full bg-transparent"
              >
                <Link href="/artisans/kamala-devi/products">
                  View Her Creations
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// Enhanced Mission Snippet Component
function EnhancedMissionSnippet() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-deep-indigo/5 via-terracotta/5 to-marigold/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(224, 122, 95, 0.1) 50%, transparent 60%)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        <motion.div
          className="mb-12"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="inline-block text-8xl">🏺</span>
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-serif text-deep-indigo mb-8 leading-tight">
          <motion.span
            className="inline-block bg-gradient-to-r from-deep-indigo via-terracotta to-marigold bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Our Mission
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-deep-indigo/80 leading-relaxed mb-16 max-w-5xl mx-auto"
        >
          We honor the enduring spirit of our elders by creating a heartfelt
          marketplace where their life's stories and handcrafted creations can
          be discovered, cherished, and woven into the fabric of a new
          generation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-deep-indigo to-blue-600 hover:from-blue-600 hover:to-deep-indigo text-white px-12 py-5 text-xl rounded-full shadow-2xl relative overflow-hidden group"
            >
              <Link href="/mission">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Learn More About Our Journey
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white px-12 py-5 text-xl rounded-full bg-transparent"
            >
              <Link href="/artisans">Meet Our Artisans</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Scroll to Next Section Component
function ScrollIndicator() {
  return (
    <motion.div
      className="flex justify-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 text-deep-indigo/60 cursor-pointer group"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-sm font-medium group-hover:text-terracotta transition-colors">
          Discover More
        </span>
        <ArrowDown className="w-5 h-5 group-hover:text-terracotta transition-colors" />
      </motion.div>
    </motion.div>
  );
}

// Main Homepage Component
export default function Homepage() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <EnhancedLoader onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showLoader && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-warm-ivory"
          >
            <EnhancedHero />
            <ScrollIndicator />
            <EnhancedMarquee />
            <StatsSection />
            <EnhancedFeaturedArtisan />
            <LoopingMarquee />
            <RevolutionaryGallery />
            <EnhancedMissionSnippet />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
