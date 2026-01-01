"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  Sparkles,
  Zap,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  artisan: string;
  location: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  year: string;
  technique: string;
  story: string;
  colors: string[];
  inspiration: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Monsoon Garden Kantha",
    artisan: "Kamala Devi",
    location: "Jaipur, Rajasthan",
    category: "Textiles",
    image:
      "https://i.postimg.cc/1zFGnhQV/image.png?height=800&width=600&text=Kantha+Quilt",
    description:
      "Hand-stitched with stories of monsoon rains and garden blooms",
    tags: ["Traditional", "Handwoven", "Natural Dyes"],
    year: "2024",
    technique: "Running Stitch Embroidery",
    story:
      "Every rainy season, Kamala sits by her window watching the garden bloom, stitching these memories into fabric.",
    colors: ["Indigo", "Turmeric Yellow", "Madder Red"],
    inspiration: "Monsoon gardens and childhood memories",
  },
  {
    id: "2",
    title: "Celestial Blue Pottery",
    artisan: "Ravi Kumar",
    location: "Khurja, UP",
    category: "Pottery",
    image:
      "https://i.postimg.cc/L6tMt8YQ/images-15.jpg?height=800&width=600&text=Blue+Pottery",
    description: "Traditional blue pottery with intricate celestial patterns",
    tags: ["Ceramic", "Glazed", "Astronomical"],
    year: "2024",
    technique: "Wheel Throwing & Glazing",
    story:
      "Inspired by ancient astronomical texts, each piece maps the journey of stars across the night sky.",
    colors: ["Cobalt Blue", "Silver", "White"],
    inspiration: "Ancient star maps and celestial movements",
  },
  {
    id: "3",
    title: "Golden Threads of Time",
    artisan: "Meera Sharma",
    location: "Varanasi, UP",
    category: "Textiles",
    image:
      "https://i.postimg.cc/Dzy5znbM/images-36.jpg?height=800&width=600&text=Banarasi+Silk",
    description:
      "Banarasi silk weaving with golden threads capturing time itself",
    tags: ["Silk", "Gold Thread", "Luxury"],
    year: "2024",
    technique: "Jacquard Weaving",
    story:
      "Each thread represents a moment in time, woven together to create eternity in silk.",
    colors: ["Gold", "Deep Purple", "Emerald"],
    inspiration: "The flow of time and eternal moments",
  },
  {
    id: "4",
    title: "Forest Whispers",
    artisan: "Gopal Singh",
    location: "Saharanpur, UP",
    category: "Woodwork",
    image:
      "https://i.postimg.cc/mDsn2QVb/images-21.jpg?height=800&width=600&text=Wooden+Carving",
    description:
      "Intricate wood carvings that echo the whispers of ancient forests",
    tags: ["Carved", "Sheesham Wood", "Nature"],
    year: "2024",
    technique: "Relief Carving",
    story:
      "Growing up in the forests, Gopal learned to listen to trees and carve their stories into wood.",
    colors: ["Natural Wood", "Earth Brown", "Forest Green"],
    inspiration: "Ancient forests and tree spirits",
  },
  {
    id: "5",
    title: "Sacred Flames",
    artisan: "Arjun Patel",
    location: "Moradabad, UP",
    category: "Metalwork",
    image:
      "https://i.postimg.cc/mZXtMV96/images-24.jpg?height=800&width=600&text=Brass+Diya",
    description: "Brass diyas that hold the sacred flames of devotion",
    tags: ["Brass", "Religious", "Sacred"],
    year: "2024",
    technique: "Metal Spinning & Engraving",
    story:
      "Each diya is blessed with prayers and crafted to hold the light of a thousand devotions.",
    colors: ["Golden Brass", "Copper", "Silver"],
    inspiration: "Temple rituals and divine light",
  },
  {
    id: "6",
    title: "Moonlight Embroidery",
    artisan: "Lakshmi Bai",
    location: "Lucknow, UP",
    category: "Embroidery",
    image:
      "https://i.postimg.cc/KYYgdYdJ/04-D46850-B52-E-4-E88-93-E8-FE132-B8-DD17-F.jpg?height=800&width=600&text=Chikankari",
    description: "Chikankari embroidery as delicate as moonlight on water",
    tags: ["Embroidered", "Cotton", "Delicate"],
    year: "2024",
    technique: "Shadow Work Embroidery",
    story:
      "Working by moonlight, Lakshmi creates embroidery so fine it seems to glow with lunar magic.",
    colors: ["Pure White", "Silver", "Ivory"],
    inspiration: "Moonlit nights and flowing water",
  },
  {
    id: "7",
    title: "Mythological Dreams",
    artisan: "Sita Devi",
    location: "Madhubani, Bihar",
    category: "Painting",
    image:
      "https://i.postimg.cc/gkSW0BfN/images-10.jpg?height=800&width=600&text=Madhubani+Art",
    description: "Madhubani paintings bringing ancient myths to vivid life",
    tags: ["Folk Art", "Natural Pigments", "Mythological"],
    year: "2024",
    technique: "Traditional Brush Painting",
    story:
      "Each painting is a dream where gods and mortals dance together in eternal stories.",
    colors: ["Vermillion", "Turmeric", "Indigo", "Ochre"],
    inspiration: "Ancient myths and divine stories",
  },
  {
    id: "8",
    title: "Himalayan Whispers",
    artisan: "Abdul Rahman",
    location: "Kashmir",
    category: "Textiles",
    image:
      "https://i.postimg.cc/yx0KfFjt/061-E29-C3-4-ED8-45-B0-A815-279-A80673-B76.jpg?height=800&width=600&text=Pashmina+Shawl",
    description: "Pashmina shawls carrying the whispers of Himalayan winds",
    tags: ["Cashmere", "Luxury", "Mountain"],
    year: "2024",
    technique: "Hand Spinning & Weaving",
    story:
      "Woven from the softest cashmere, each shawl carries the breath of mountain peaks and valley winds.",
    colors: ["Snow White", "Mountain Blue", "Sunset Orange"],
    inspiration: "Himalayan peaks and valley winds",
  },
  {
    id: "9",
    title: "Ocean's Memory",
    artisan: "Priya Nair",
    location: "Kochi, Kerala",
    category: "Textiles",
    image:
      "https://i.postimg.cc/kXm484XD/images-34.jpg?height=800&width=600&text=Kerala+Textile",
    description: "Handwoven textiles that capture the rhythm of ocean waves",
    tags: ["Handwoven", "Coastal", "Traditional"],
    year: "2024",
    technique: "Traditional Loom Weaving",
    story:
      "Living by the sea, Priya weaves the eternal dance of waves into every thread.",
    colors: ["Ocean Blue", "Pearl White", "Coral Pink"],
    inspiration: "Ocean waves and coastal life",
  },
];

// Floating Cursor Component
function FloatingCursor({ hoveredItem }: { hoveredItem: GalleryItem | null }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 75);
      cursorY.set(e.clientY - 75);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!hoveredItem) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-terracotta via-marigold to-deep-indigo p-1 shadow-2xl"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <div className="w-full h-full rounded-full bg-white p-2">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={hoveredItem.image || "/placeholder.svg"}
                alt={hoveredItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-white text-center">
                <p className="text-xs font-medium line-clamp-1">
                  {hoveredItem.title}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.3, 1],
            rotate: 360,
          }}
          transition={{
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
            rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <Sparkles className="w-3 h-3 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Individual Gallery Card
function GalleryCard({
  item,
  index,
  onHover,
  onLeave,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onHover: (item: GalleryItem) => void;
  onLeave: () => void;
  onClick: (item: GalleryItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="group cursor-none relative"
      onMouseEnter={() => onHover(item)}
      onMouseLeave={onLeave}
      onClick={() => onClick(item)}
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-xl"
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          rotateX: 5,
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-gradient-to-r from-terracotta to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              {item.category}
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col gap-2"
            initial={{ x: 20, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.2, rotate: -15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.h3
              className="text-2xl font-serif mb-2 line-clamp-2"
              whileHover={{ scale: 1.05 }}
            >
              {item.title}
            </motion.h3>

            <motion.p
              className="text-sm opacity-90 mb-1"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              by {item.artisan}
            </motion.p>

            <motion.p
              className="text-xs opacity-75 mb-3"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {item.location} • {item.year}
            </motion.p>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-1 mb-3"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {item.tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-sm leading-relaxed line-clamp-2"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {item.description}
            </motion.p>
          </div>

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Magical Particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -20, -40],
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </div>

        {/* 3D Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-transparent"
          whileHover={{
            borderColor: "#F2CC8F",
            boxShadow:
              "0 0 30px rgba(242, 204, 143, 0.5), inset 0 0 30px rgba(242, 204, 143, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

// Enhanced Modal
function EnhancedModal({
  item,
  onClose,
  onNavigate,
}: {
  item: GalleryItem | null;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-7xl w-full max-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Navigation */}
          <motion.button
            onClick={() => onNavigate("prev")}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={() => onNavigate("next")}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <div className="grid md:grid-cols-2 h-full">
            {/* Image Side */}
            <div className="relative">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            </div>

            {/* Content Side */}
            <div className="p-8 flex flex-col justify-center text-white overflow-y-auto">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-6">
                  <span className="bg-gradient-to-r from-terracotta to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>

                <h2 className="text-4xl font-serif mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {item.title}
                </h2>

                <p className="text-gray-300 mb-2">
                  Crafted by{" "}
                  <span className="font-medium text-marigold">
                    {item.artisan}
                  </span>
                </p>
                <p className="text-gray-400 mb-2 text-sm">{item.location}</p>
                <p className="text-gray-400 mb-6 text-sm">
                  Technique: {item.technique}
                </p>

                <p className="text-gray-200 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Story Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-marigold mb-2">
                    The Story
                  </h4>
                  <p className="text-gray-300 leading-relaxed italic">
                    {item.story}
                  </p>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-marigold mb-2">
                    Colors Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.colors.map((color, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-marigold mb-2">
                    Characteristics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button
                    className="bg-gradient-to-r from-terracotta to-red-500 hover:from-red-500 hover:to-terracotta text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Collection
                  </motion.button>
                  <motion.button
                    className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Meet Artisan
                  </motion.button>
                  <motion.button
                    className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function RevolutionaryGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const navigateItem = (direction: "prev" | "next") => {
    if (!selectedItem) return;

    const currentIndex = galleryItems.findIndex(
      (item) => item.id === selectedItem.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
    } else {
      newIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedItem(galleryItems[newIndex]);
  };

  return (
    <>
      {/* Floating Cursor */}
      <AnimatePresence>
        <FloatingCursor hoveredItem={hoveredItem} />
      </AnimatePresence>

      <section
        ref={containerRef}
        className="py-20 px-4 max-w-7xl mx-auto cursor-none relative overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ y: backgroundY }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #E07A5F 1px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative z-10"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-serif mb-6 leading-tight bg-gradient-to-r from-deep-indigo via-terracotta to-marigold bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Heritage Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-deep-indigo/70 max-w-4xl mx-auto leading-relaxed"
          >
            Journey through our curated collection where each masterpiece tells
            a story of tradition, innovation, and the eternal dance between
            artisan and art.
          </motion.p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {galleryItems.map((item, index) => (
            <div key={item.id} className="break-inside-avoid">
              <GalleryCard
                item={item}
                index={index}
                onHover={setHoveredItem}
                onLeave={() => setHoveredItem(null)}
                onClick={handleItemClick}
              />
            </div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.button
            className="bg-gradient-to-r from-deep-indigo via-terracotta to-marigold text-white px-12 py-4 rounded-full font-medium text-lg shadow-2xl relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Discover More Treasures
              <Zap className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </section>

      {/* Enhanced Modal */}
      <EnhancedModal
        item={selectedItem}
        onClose={closeModal}
        onNavigate={navigateItem}
      />
    </>
  );
}
