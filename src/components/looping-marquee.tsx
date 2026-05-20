"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MarqueeItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  category: string;
}

const marqueeItems: MarqueeItem[] = [
  {
    id: "1",
    title: "Heritage Textiles",
    subtitle: "Timeless weaves from master artisans",
    image: "https://i.postimg.cc/1zFGnhQV/image.png",
    link: "/collections/textiles",
    category: "Collection V1",
  },
  {
    id: "2",
    title: "Sacred Pottery",
    subtitle: "Clay vessels shaped by generations",
    image: "https://i.postimg.cc/MZtTy5Cj/images-12.jpg",
    link: "/collections/pottery",
    category: "Collection V2",
  },
  {
    id: "3",
    title: "Artisan Woodwork",
    subtitle: "Carved stories in every grain",
    image: "https://i.postimg.cc/hGyJKrKm/images-19.jpg",
    link: "/collections/woodwork",
    category: "Collection V3",
  },
  {
    id: "4",
    title: "Metal Mastery",
    subtitle: "Forged with fire and tradition",
    image: "https://i.postimg.cc/fbG11G1g/images-28.jpg",
    link: "/collections/metalwork",
    category: "Collection V4",
  },
  {
    id: "5",
    title: "Embroidered Dreams",
    subtitle: "Threads of cultural heritage",
    image: "https://i.postimg.cc/kMF7LRSC/images-51.jpg",
    link: "/collections/embroidery",
    category: "Collection V5",
  },
  {
    id: "6",
    title: "Living Paintings",
    subtitle: "Colors that tell ancient tales",
    image: "https://i.postimg.cc/Gtkt5MCn/images-54.jpg",
    link: "/collections/paintings",
    category: "Collection V6",
  },
];

export function LoopingMarquee() {
  const x = useMotionValue(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  const startAnimation = () => {
    const width = marqueeRef.current?.scrollWidth ?? 2400; // fallback width
    animationRef.current = animate(x, [0, -width / 3], {
      ease: "linear",
      duration: 40,
      repeat: Infinity,
      repeatType: "loop",
    });
  };

  const stopAnimation = () => {
    animationRef.current?.stop();
  };

  useEffect(() => {
    startAnimation();
    return () => stopAnimation();
  }, []);

  return (
    <section className="py-20 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-6xl font-serif bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Curated Collections
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover our handpicked collections, each telling a unique story of
          craftsmanship and heritage
        </p>
        <div className="mt-8 text-sm text-gray-500 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span>Hover to pause • Click to explore</span>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={stopAnimation}
        onMouseLeave={startAnimation}
      >
        <motion.div className="flex gap-8 w-max" ref={marqueeRef} style={{ x }}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <Link href={item.link}>
                  <div className="relative w-80 h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
                    <div className="relative h-3/4 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    </div>
                    <div className="p-6 h-1/4 flex flex-col justify-center">
                      <h3 className="text-xl font-serif text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </motion.div>

        {/* Edge fade */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
