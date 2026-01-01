"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  artisan: string;
  location: string;
  category: string;
  image: string;
  description: string;
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
      "Hand-stitched with stories of monsoon rains and garden blooms",
  },
  {
    id: "2",
    title: "Blue Pottery Vase",
    artisan: "Ravi Kumar",
    location: "Khurja, UP",
    category: "Pottery",
    image:
      "https://i.postimg.cc/L6tMt8YQ/images-15.jpg?height=600&width=400&text=Blue+Pottery",
    description: "Traditional blue pottery with intricate floral patterns",
  },
  {
    id: "3",
    title: "Banarasi Silk Weave",
    artisan: "Meera Sharma",
    location: "Varanasi, UP",
    category: "Textiles",
    image:
      "https://i.postimg.cc/Twqn0VhR/image.png?height=600&width=400&text=Banarasi+Silk",
    description: "Golden threads woven with centuries-old techniques",
  },
  {
    id: "4",
    title: "Carved Wooden Box",
    artisan: "Gopal Singh",
    location: "Saharanpur, UP",
    category: "Woodwork",
    image:
      "https://i.postimg.cc/mDsn2QVb/images-21.jpg?height=600&width=400&text=Wooden+Box",
    description: "Intricate carvings telling tales of ancient forests",
  },
  {
    id: "5",
    title: "Brass Temple Diya",
    artisan: "Arjun Patel",
    location: "Moradabad, UP",
    category: "Metalwork",
    image:
      "https://i.postimg.cc/4y6G8fd5/images-27.jpg?height=600&width=400&text=Brass+Diya",
    description: "Sacred flames dance in handcrafted brass vessels",
  },
  {
    id: "6",
    title: "Chikankari Ensemble",
    artisan: "Lakshmi Bai",
    location: "Lucknow, UP",
    category: "Embroidery",
    image:
      "https://i.postimg.cc/kXm484XD/images-34.jpg?height=600&width=400&text=Chikankari",
    description: "Delicate white-on-white embroidery like morning mist",
  },
];

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const handleItemHover = (itemId: string | null) => {
    setHoveredItem(itemId);
    setCursorVariant(itemId ? "hover" : "default");
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

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(224, 122, 95, 0.8)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      scale: 4,
      backgroundColor: "rgba(242, 204, 143, 0.9)",
      mixBlendMode: "normal" as const,
    },
  };

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 rounded-full flex items-center justify-center text-xs font-medium text-deep-indigo"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        {cursorVariant === "hover" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="whitespace-nowrap"
          >
            View
          </motion.span>
        )}
      </motion.div>

      <section className="py-20 px-4 max-w-7xl mx-auto cursor-none">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-deep-indigo mb-6">
            Heritage Gallery
          </h2>
          <p className="text-lg text-deep-indigo/70 max-w-3xl mx-auto leading-relaxed">
            Step into our gallery where each piece tells a story of tradition,
            craftsmanship, and the enduring spirit of our master artisans.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              className="group relative cursor-none"
              onMouseEnter={() => handleItemHover(item.id)}
              onMouseLeave={() => handleItemHover(null)}
              onClick={() => handleItemClick(item)}
            >
              {/* Main Card */}
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-white shadow-lg"
                whileHover={{
                  y: -12,
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{
                      x: hoveredItem === item.id ? 0 : -20,
                      opacity: hoveredItem === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <span className="bg-marigold text-deep-indigo px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </motion.div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.h3
                      className="text-xl font-serif mb-2"
                      animate={{
                        y: hoveredItem === item.id ? 0 : 10,
                        opacity: hoveredItem === item.id ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.title}
                    </motion.h3>

                    <motion.p
                      className="text-sm opacity-90 mb-1"
                      animate={{
                        y: hoveredItem === item.id ? 0 : 10,
                        opacity: hoveredItem === item.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                    >
                      by {item.artisan}
                    </motion.p>

                    <motion.p
                      className="text-xs opacity-75"
                      animate={{
                        y: hoveredItem === item.id ? 0 : 10,
                        opacity: hoveredItem === item.id ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {item.location}
                    </motion.p>

                    {/* Description - Only shows on hover */}
                    <motion.p
                      className="text-sm mt-3 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredItem === item.id ? 1 : 0,
                        y: hoveredItem === item.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>

                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: hoveredItem === item.id ? 1.5 : 0,
                      opacity: hoveredItem === item.id ? [0, 0.2, 0] : 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  >
                    <div className="w-full h-full bg-terracotta/30 rounded-full" />
                  </motion.div>
                </div>

                {/* Enhanced Shadow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{
                    boxShadow:
                      hoveredItem === item.id
                        ? "0 25px 50px rgba(224, 122, 95, 0.25), 0 10px 20px rgba(0, 0, 0, 0.1)"
                        : "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-deep-indigo hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateItem("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-deep-indigo hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateItem("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-deep-indigo hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 h-full">
                {/* Image */}
                <div className="relative aspect-[3/4] md:aspect-auto">
                  <Image
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm font-medium">
                      {selectedItem.category}
                    </span>
                  </div>

                  <h2 className="text-3xl font-serif text-deep-indigo mb-4">
                    {selectedItem.title}
                  </h2>

                  <p className="text-deep-indigo/70 mb-2">
                    Crafted by{" "}
                    <span className="font-medium text-terracotta">
                      {selectedItem.artisan}
                    </span>
                  </p>

                  <p className="text-deep-indigo/60 mb-6 text-sm">
                    {selectedItem.location}
                  </p>

                  <p className="text-deep-indigo/80 leading-relaxed mb-8">
                    {selectedItem.description}
                  </p>

                  <div className="flex gap-4">
                    <button className="bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      View Details
                    </button>
                    <button className="border border-deep-indigo text-deep-indigo hover:bg-deep-indigo hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Meet Artisan
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
