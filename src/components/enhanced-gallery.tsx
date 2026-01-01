"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  Eye,
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
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Monsoon Garden Kantha",
    artisan: "Kamala Devi",
    location: "Jaipur, Rajasthan",
    category: "Textiles",
    image:
      "https://i.postimg.cc/jSwNm0C3/image.png?height=600&width=400&text=Kantha+Quilt",
    description:
      "Hand-stitched with stories of monsoon rains and garden blooms, this Kantha quilt represents three generations of textile artistry.",
    tags: ["Traditional", "Handwoven", "Natural Dyes"],
    year: "2024",
    technique: "Running Stitch Embroidery",
  },
  {
    id: "2",
    title: "Blue Pottery Vase",
    artisan: "Ravi Kumar",
    location: "Khurja, UP",
    category: "Pottery",
    image:
      "https://i.postimg.cc/XqX0Kf5w/images-13.jpg?height=600&width=400&text=Blue+Pottery",
    description:
      "Traditional blue pottery with intricate floral patterns, fired at high temperatures for durability and beauty.",
    tags: ["Ceramic", "Glazed", "Floral"],
    year: "2024",
    technique: "Wheel Throwing & Glazing",
  },
  {
    id: "3",
    title: "Banarasi Silk Weave",
    artisan: "Meera Sharma",
    location: "Varanasi, UP",
    category: "Textiles",
    image:
      "https://i.postimg.cc/1zFGnhQV/image.png?height=600&width=400&text=Banarasi+Silk",
    description:
      "Golden threads woven with centuries-old techniques, creating patterns that shimmer like captured sunlight.",
    tags: ["Silk", "Gold Thread", "Luxury"],
    year: "2024",
    technique: "Jacquard Weaving",
  },
  {
    id: "4",
    title: "Carved Wooden Box",
    artisan: "Gopal Singh",
    location: "Saharanpur, UP",
    category: "Woodwork",
    image:
      "https://i.postimg.cc/hGyJKrKm/images-19.jpg?height=600&width=400&text=Wooden+Box",
    description:
      "Intricate carvings telling tales of ancient forests, each detail carved with precision and love.",
    tags: ["Carved", "Sheesham Wood", "Handcrafted"],
    year: "2024",
    technique: "Relief Carving",
  },
  {
    id: "5",
    title: "Brass Temple Diya",
    artisan: "Arjun Patel",
    location: "Moradabad, UP",
    category: "Metalwork",
    image:
      "https://i.postimg.cc/jdMQDzqs/images-23.jpg?height=600&width=400&text=Brass+Diya",
    description:
      "Sacred flames dance in handcrafted brass vessels, polished to perfection for divine illumination.",
    tags: ["Brass", "Religious", "Polished"],
    year: "2024",
    technique: "Metal Spinning & Engraving",
  },
  {
    id: "6",
    title: "Chikankari Ensemble",
    artisan: "Lakshmi Bai",
    location: "Lucknow, UP",
    category: "Embroidery",
    image:
      "https://i.postimg.cc/5yz4hc4P/9870685-E-CDCC-4170-BF4-E-6-DE2-F5-C69-E08.jpg?height=600&width=400&text=Chikankari",
    description:
      "Delicate white-on-white embroidery like morning mist, each stitch a whisper of elegance.",
    tags: ["Embroidered", "Cotton", "Delicate"],
    year: "2024",
    technique: "Shadow Work Embroidery",
  },
  {
    id: "7",
    title: "Madhubani Painting",
    artisan: "Sita Devi",
    location: "Madhubani, Bihar",
    category: "Painting",
    image:
      "https://i.postimg.cc/K8GR6Vtf/images-7.jpg?height=600&width=400&text=Madhubani+Art",
    description:
      "Vibrant folk art depicting mythological stories with natural pigments and traditional motifs.",
    tags: ["Folk Art", "Natural Pigments", "Mythological"],
    year: "2024",
    technique: "Traditional Brush Painting",
  },
  {
    id: "8",
    title: "Pashmina Shawl",
    artisan: "Abdul Rahman",
    location: "Kashmir",
    category: "Textiles",
    image:
      "https://i.postimg.cc/kXm484XD/images-34.jpg?height=600&width=400&text=Pashmina+Shawl",
    description:
      "Finest cashmere wool woven into ethereal softness, warm as a mountain embrace.",
    tags: ["Cashmere", "Luxury", "Warm"],
    year: "2024",
    technique: "Hand Spinning & Weaving",
  },
  {
    id: "9",
    title: "Copper Water Vessel",
    artisan: "Ramesh Thakur",
    location: "Jaipur, Rajasthan",
    category: "Metalwork",
    image:
      "https://i.postimg.cc/kMjTk3rM/images-20.jpg?height=600&width=400&text=Copper+Vessel",
    description:
      "Hammered copper vessel with health benefits, crafted using ancient Ayurvedic principles.",
    tags: ["Copper", "Health", "Hammered"],
    year: "2024",
    technique: "Hand Hammering",
  },
];

// Individual Gallery Card Component
function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Container */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
        style={{
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"
            : "0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            background: isHovered
              ? "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3))"
              : "transparent",
          }}
          transition={{ duration: 0.3 }}
          style={{
            padding: "2px",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl" />
        </motion.div>

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            animate={{
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{
              x: isHovered ? 0 : -20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              {item.category}
            </span>
          </motion.div>

          {/* Action Icons */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{
              x: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </motion.div>

          {/* View Count */}
          <motion.div
            className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1"
            initial={{ scale: 0 }}
            animate={{
              scale: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Eye className="w-3 h-3 text-white" />
            <span className="text-xs text-white">
              {Math.floor(Math.random() * 1000) + 100}
            </span>
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.div
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-serif mb-2 line-clamp-2">
                {item.title}
              </h3>

              <motion.p
                className="text-sm opacity-90 mb-1"
                animate={{
                  y: isHovered ? 0 : 10,
                  opacity: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                by {item.artisan}
              </motion.p>

              <motion.p
                className="text-xs opacity-75 mb-3"
                animate={{
                  y: isHovered ? 0 : 10,
                  opacity: isHovered ? 1 : 0.7,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {item.location} • {item.year}
              </motion.p>

              {/* Tags */}
              <motion.div
                className="flex flex-wrap gap-1 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 20,
                }}
                transition={{ duration: 0.3, delay: 0.15 }}
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

              {/* Description - Only shows on hover */}
              <motion.p
                className="text-sm leading-relaxed line-clamp-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 20,
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          </div>

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: "-100%" }}
            animate={{
              x: isHovered ? "100%" : "-100%",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EnhancedGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const categories = [
    "All",
    "Textiles",
    "Pottery",
    "Woodwork",
    "Metalwork",
    "Embroidery",
    "Painting",
  ];

  const filteredItems =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const navigateItem = (direction: "prev" | "next") => {
    if (!selectedItem) return;

    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedItem.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedItem(filteredItems[newIndex]);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-slate-950" : "bg-gray-50"
      }`}
    >
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              isDarkMode
                ? "rgba(59, 130, 246, 0.15)"
                : "rgba(59, 130, 246, 0.1)"
            } 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <section className="relative py-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2
              className={`text-4xl md:text-6xl font-serif ${
                isDarkMode ? "text-white" : "text-gray-900"
              } bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}
            >
              Heritage Gallery
            </h2>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white text-gray-900"
              } shadow-lg`}
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>
          </div>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto leading-relaxed`}
          >
            Discover the artistry and heritage of master craftspeople through
            our curated collection of handcrafted treasures.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                  : isDarkMode
                  ? "bg-slate-800 text-gray-300 hover:bg-slate-700"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <div key={item.id} onClick={() => handleItemClick(item)}>
                <GalleryCard item={item} index={index} />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <button
            className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
              isDarkMode
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
            } shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            Load More Treasures
          </button>
        </motion.div>
      </section>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateItem("prev")}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateItem("next")}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 h-full">
                {/* Image */}
                <div className="relative aspect-[3/4] md:aspect-auto">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center text-white">
                  <div className="mb-6">
                    <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                      {selectedItem.category}
                    </span>
                  </div>

                  <h2 className="text-4xl font-serif mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {selectedItem.title}
                  </h2>

                  <p className="text-gray-300 mb-2">
                    Crafted by{" "}
                    <span className="font-medium text-blue-400">
                      {selectedItem.artisan}
                    </span>
                  </p>

                  <p className="text-gray-400 mb-2 text-sm">
                    {selectedItem.location}
                  </p>
                  <p className="text-gray-400 mb-6 text-sm">
                    Technique: {selectedItem.technique}
                  </p>

                  <p className="text-gray-200 leading-relaxed mb-8">
                    {selectedItem.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                      View Details
                    </button>
                    <button className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm">
                      Meet Artisan
                    </button>
                    <button className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
