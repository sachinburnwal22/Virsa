"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Sparkles, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImages = [
  "https://i.postimg.cc/1zFGnhQV/image.png ?height=1080&width=1920&text=Artisan+Hands+Weaving",
  "https://i.postimg.cc/MZtTy5Cj/images-12.jpg?height=1080&width=1920&text=Potter+at+Wheel",
  "https://i.postimg.cc/pLKynvRP/images-17.jpg?height=1080&width=1920&text=Wood+Carver+Working",
  "https://i.postimg.cc/jdMQDzqs/images-23.jpg?height=1080&width=1920&text=Embroidery+Details",
];

const floatingElements = [
  { icon: Heart, delay: 0, x: "10%", y: "20%" },
  { icon: Star, delay: 0.5, x: "80%", y: "30%" },
  { icon: Sparkles, delay: 1, x: "15%", y: "70%" },
  { icon: Heart, delay: 1.5, x: "85%", y: "80%" },
];

export function EnhancedHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <motion.div
          initial={{ opacity: 1, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src="/video/v111.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 z-10" />

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute z-20 text-white/30"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <element.icon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Celebrating 1000+ Master Artisans
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </span>
        </motion.div>

        {/* Main Heading with Typewriter Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-8xl font-serif mb-6 leading-tight"
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Every creation
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="inline-block"
          >
            has a{" "}
            <span className="relative">
              <span className="text-yellow-400">story</span>
              <motion.div
                className="absolute -inset-2 bg-yellow-400/20 rounded-lg -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </span>
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-3xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed"
        >
          Discover the legacy of{" "}
          <motion.span
            className="text-blue-300 font-medium"
            animate={{ color: ["#93c5fd", "#a78bfa", "#f9a8d4", "#93c5fd"] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            master craftspeople
          </motion.span>{" "}
          and bring their timeless creations into your world
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium rounded-full shadow-2xl border-0 relative overflow-hidden group"
            >
              <Link href="/artisans">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Meet Our Karigars
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
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-full backdrop-blur-sm bg-transparent"
            >
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: "1000+", label: "Master Artisans" },
            { number: "50+", label: "Traditional Crafts" },
            { number: "25+", label: "Indian States" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-2xl md:text-4xl font-bold text-white mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  );
}
