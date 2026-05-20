"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Award,
  Heart,
  Sparkles,
  Quote,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Timeline data for Kamala's journey
const timelineEvents = [
  {
    year: "1974",
    title: "The Beginning",
    description:
      "At age 15, Kamala learned her first block printing techniques from her mother in their small courtyard in Jaipur.",
    icon: "🌱",
  },
  {
    year: "1982",
    title: "Master Recognition",
    description:
      "Received her first recognition as a master craftsperson from the Rajasthan Handicrafts Board.",
    icon: "🏆",
  },
  {
    year: "1995",
    title: "Teaching the Craft",
    description:
      "Started teaching block printing to young women in her community, passing on traditional techniques.",
    icon: "👥",
  },
  {
    year: "2010",
    title: "National Award",
    description:
      "Honored with the National Award for Master Craftspersons by the Government of India.",
    icon: "🎖️",
  },
  {
    year: "2024",
    title: "Digital Journey",
    description:
      "Joined Virasa to share her creations with the world while preserving traditional methods.",
    icon: "🌐",
  },
];

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-marigold/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// Hero section with parallax effect
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-warm-ivory via-marigold/10 to-terracotta/10">
      <FloatingParticles />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #E07A5F 1px, transparent 0)`,
          backgroundSize: "60px 60px",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              asChild
              variant="ghost"
              className="mb-6 text-deep-indigo hover:text-terracotta transition-colors"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-3 h-3 bg-terracotta rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-terracotta font-medium uppercase tracking-wider text-sm">
                Master Artisan Story
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-serif text-deep-indigo mb-6 leading-tight">
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#E07A5F" }}
                transition={{ duration: 0.3 }}
              >
                Kamala Devi
              </motion.span>
            </h1>

            <div className="flex items-center gap-6 mb-8 text-deep-indigo/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-terracotta" />
                <span className="font-medium">Jaipur, Rajasthan</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-terracotta" />
                <span className="font-medium">50+ Years Experience</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  >
                    <Star className="w-6 h-6 fill-marigold text-marigold" />
                  </motion.div>
                ))}
              </div>
              <span className="text-deep-indigo/60 ml-2 font-medium">
                Master Block Printer
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-deep-indigo/80 leading-relaxed mb-8"
          >
            A living legend whose hands have shaped countless stories through
            fabric and dye, Kamala Devi represents the soul of traditional
            Indian craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-terracotta to-red-500 hover:from-red-500 hover:to-terracotta text-white px-8 py-4 rounded-full shadow-xl"
            >
              <Link
                href="/artisans/kamala-devi/products"
                className="flex items-center gap-2"
              >
                View Her Creations
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-deep-indigo text-deep-indigo hover:bg-deep-indigo hover:text-white px-8 py-4 rounded-full bg-transparent"
              onClick={() =>
                document
                  .getElementById("story-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Read Her Journey
            </Button>
          </motion.div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative group"
        >
          <motion.div
            className="relative overflow-hidden rounded-3xl shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <Image
              src="/images/p.jpg?height=800&width=600&text=Kamala+Devi+Portrait"
              alt="Kamala Devi working on block printing"
              width={600}
              height={800}
              className="object-cover w-full transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Floating awards */}
            <motion.div
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Award className="w-6 h-6 text-marigold" />
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-marigold/30 to-terracotta/30 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </div>
    </section>
  );
}

// Story section with interactive timeline
function StorySection() {
  const [activeEvent, setActiveEvent] = useState(0);

  return (
    <section
      id="story-section"
      className="py-24 bg-gradient-to-br from-deep-indigo/5 to-terracotta/5 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-deep-indigo mb-6">
            Her Journey Through Time
          </h2>
          <p className="text-xl text-deep-indigo/70 max-w-3xl mx-auto">
            From a young girl learning at her mother's side to becoming a master
            craftsperson, Kamala's story is one of dedication, tradition, and
            timeless artistry.
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Timeline Navigation */}
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                    activeEvent === index
                      ? "bg-white shadow-xl border-2 border-terracotta"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  onClick={() => setActiveEvent(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-3xl ${
                        activeEvent === index ? "animate-bounce" : ""
                      }`}
                    >
                      {event.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-terracotta">
                          {event.year}
                        </span>
                        {activeEvent === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-terracotta rounded-full"
                          />
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-deep-indigo mb-2">
                        {event.title}
                      </h3>
                      <p className="text-deep-indigo/70">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Story Content */}
            <motion.div
              key={activeEvent}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Quote className="w-12 h-12 text-terracotta/30 mb-4" />
                    <blockquote className="text-2xl font-serif text-deep-indigo leading-relaxed mb-6">
                      {activeEvent === 0 &&
                        "Every thread tells a story, every pattern holds a memory. My mother's hands guided mine, and now I guide others."}
                      {activeEvent === 1 &&
                        "Recognition came not from seeking it, but from staying true to the craft that flows through my veins."}
                      {activeEvent === 2 &&
                        "Teaching is not just passing on technique—it's sharing the soul of our ancestors with the next generation."}
                      {activeEvent === 3 &&
                        "This award belongs not just to me, but to every woman who kept these traditions alive in her heart."}
                      {activeEvent === 4 &&
                        "The world has changed, but the essence of our craft remains eternal. Now, through technology, our stories reach every corner of the earth."}
                    </blockquote>
                    <cite className="text-terracotta font-medium">
                      — Kamala Devi
                    </cite>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-deep-indigo/70">
                        Loved by thousands
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-marigold" />
                      <span className="text-sm text-deep-indigo/70">
                        Master craftsperson
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Call to action section
function CallToActionSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-terracotta/10 to-marigold/10 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-deep-indigo mb-8">
            Experience Her Artistry
          </h2>
          <p className="text-xl text-deep-indigo/70 mb-12 leading-relaxed">
            Each piece created by Kamala Devi carries the wisdom of generations
            and the warmth of her loving hands. Discover her beautiful creations
            and bring home a piece of authentic Indian heritage.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-terracotta to-red-500 hover:from-red-500 hover:to-terracotta text-white px-12 py-6 text-xl rounded-full shadow-2xl"
              >
                <Link
                  href="/artisans/kamala-devi/products"
                  className="flex items-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  View Her Creations
                  <ChevronRight className="w-6 h-6" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-deep-indigo text-deep-indigo hover:bg-deep-indigo hover:text-white px-12 py-6 text-xl rounded-full bg-transparent"
              >
                <Link href="/artisans">Meet Other Artisans</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function KamalaDeviStoryPage() {
  return (
    <main className="min-h-screen bg-warm-ivory">
      <HeroSection />
      <StorySection />
      <CallToActionSection />
    </main>
  );
}
