"use client";

import { motion } from "framer-motion";

const quotes = [
  "To work with your hands is to pray with your heart.",
  "A thread of memory is woven into every cloth, a lifetime of sun baked into every pot.",
  "Every creation carries the soul of its maker.",
  "In the rhythm of the loom, I find the heartbeat of my ancestors.",
  "Clay remembers the touch of its creator long after the wheel stops turning.",
  "Each stitch tells a story, each pattern holds a prayer.",
];

export function EnhancedMarquee() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-terracotta/10 via-marigold/10 to-terracotta/10 py-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(224, 122, 95, 0.3) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Main Marquee */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {[...quotes, ...quotes, ...quotes].map((quote, index) => (
          <motion.span
            key={index}
            className="mx-12 text-deep-indigo/80 italic font-medium text-lg relative group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10">{quote}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-marigold/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 -z-10"
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-terracotta rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
      <motion.div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-marigold rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  );
}
