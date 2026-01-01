"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  Search,
  Grid,
  List,
  Heart,
  Star,
  ShoppingBag,
  Eye,
  Sparkles,
  Zap,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";

interface Product {
  id: string;
  name: string;
  artisan: string;
  location: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  description: string;
  tags: string[];
  craftTechnique: string;
  materials: string[];
  timeToMake: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Monsoon Garden Kantha Quilt",
    artisan: "Kamala Devi",
    location: "Jaipur, Rajasthan",
    price: 4500,
    originalPrice: 6000,
    category: "Textiles",
    subcategory: "Quilts",
    images: [
      "https://i.postimg.cc/wB6ry3vX/images-67.jpg?height=600&width=600&text=Kantha+Quilt+1",
      "https://i.postimg.cc/5yFKdC7V/images-66.jpg?height=600&width=600&text=Kantha+Quilt+2",
      "https://i.postimg.cc/Bt9Yqnk1/images-65.jpg?height=600&width=600&text=Kantha+Quilt+3",
      "https://i.postimg.cc/Kc6xKryt/images-64.jpg?height=600&width=600&text=Kantha+Quilt+4",
    ],
    rating: 5,
    reviews: 24,
    isNew: true,
    isFeatured: true,
    description:
      "Hand-stitched with stories of monsoon rains and garden blooms",
    tags: ["Handmade", "Natural Dyes", "Traditional"],
    craftTechnique: "Running Stitch Embroidery",
    materials: ["Cotton", "Natural Dyes"],
    timeToMake: "3 weeks",
  },
  {
    id: "2",
    name: "Blue Pottery Vase Collection",
    artisan: "Ravi Kumar",
    location: "Khurja, UP",
    price: 850,
    category: "Pottery",
    subcategory: "Vases",
    images: [
      "https://i.postimg.cc/MZtTy5Cj/images-12.jpg?height=600&width=600&text=Blue+Pottery+1",
      "https://i.postimg.cc/XqX0Kf5w/images-13.jpg?height=600&width=600&text=Blue+Pottery+2",
      "https://i.postimg.cc/L6tMt8YQ/images-15.jpg?height=600&width=600&text=Blue+Pottery+3",
      "https://i.postimg.cc/1X8LV9xB/images-14.jpg?height=600&width=600&text=Blue+Pottery+4",
    ],
    rating: 4.8,
    reviews: 18,
    description: "Traditional blue pottery with intricate floral patterns",
    tags: ["Ceramic", "Glazed", "Decorative"],
    craftTechnique: "Wheel Throwing & Glazing",
    materials: ["Clay", "Natural Glazes"],
    timeToMake: "1 week",
  },
  {
    id: "3",
    name: "Banarasi Silk Saree",
    artisan: "Meera Sharma",
    location: "Varanasi, UP",
    price: 12000,
    originalPrice: 15000,
    category: "Textiles",
    subcategory: "Sarees",
    images: [
      "https://i.postimg.cc/t4Ytbnv5/image.png?height=600&width=600&text=Banarasi+Silk+1",
      "https://i.postimg.cc/1zFGnhQV/image.png?height=600&width=600&text=Banarasi+Silk+2",
      "https://i.postimg.cc/Twqn0VhR/image.png?height=600&width=600&text=Banarasi+Silk+3",
      "https://i.postimg.cc/jSwNm0C3/image.png?height=600&width=600&text=Banarasi+Silk+4",
    ],
    rating: 5,
    reviews: 42,
    isFeatured: true,
    description: "Golden threads woven with centuries-old techniques",
    tags: ["Silk", "Gold Thread", "Luxury"],
    craftTechnique: "Jacquard Weaving",
    materials: ["Silk", "Gold Thread"],
    timeToMake: "2 months",
  },
  {
    id: "4",
    name: "Carved Wooden Jewelry Box",
    artisan: "Gopal Singh",
    location: "Saharanpur, UP",
    price: 1800,
    category: "Woodwork",
    subcategory: "Boxes",
    images: [
      "https://i.postimg.cc/pLKynvRP/images-17.jpg?height=600&width=600&text=Wooden+Box+1",
      "https://i.postimg.cc/TYD3Zxyn/images-18.jpg?height=600&width=600&text=Wooden+Box+2",
      "https://i.postimg.cc/hGyJKrKm/images-19.jpg?height=600&width=600&text=Wooden+Box+3",
      "https://i.postimg.cc/mDsn2QVb/images-21.jpg?height=600&width=600&text=Wooden+Box+4",
    ],
    rating: 4.9,
    reviews: 31,
    description: "Intricate carvings telling tales of ancient forests",
    tags: ["Carved", "Sheesham Wood", "Storage"],
    craftTechnique: "Relief Carving",
    materials: ["Sheesham Wood"],
    timeToMake: "10 days",
  },
  {
    id: "5",
    name: "Brass Temple Diya Set",
    artisan: "Arjun Patel",
    location: "Moradabad, UP",
    price: 1200,
    category: "Metalwork",
    subcategory: "Religious",
    images: [
      "https://i.postimg.cc/mZXtMV96/images-24.jpg?height=600&width=600&text=Brass+Diya+1",
      "https://i.postimg.cc/jdMQDzqs/images-23.jpg?height=600&width=600&text=Brass+Diya+2",
      "https://i.postimg.cc/tJxQsXWb/images-25.jpg?height=600&width=600&text=Brass+Diya+3",
      "https://i.postimg.cc/4y6G8fd5/images-27.jpg?height=600&width=600&text=Brass+Diya+4",
    ],
    rating: 4.7,
    reviews: 15,
    isNew: true,
    description: "Sacred flames dance in handcrafted brass vessels",
    tags: ["Brass", "Religious", "Handcrafted"],
    craftTechnique: "Metal Spinning & Engraving",
    materials: ["Brass"],
    timeToMake: "5 days",
  },
  {
    id: "6",
    name: "Chikankari Kurta Set",
    artisan: "Lakshmi Bai",
    location: "Lucknow, UP",
    price: 3500,
    category: "Textiles",
    subcategory: "Clothing",
    images: [
      "https://i.postimg.cc/5yz4hc4P/9870685-E-CDCC-4170-BF4-E-6-DE2-F5-C69-E08.jpg?height=600&width=600&text=Chikankari+1",
      "https://i.postimg.cc/yx0KfFjt/061-E29-C3-4-ED8-45-B0-A815-279-A80673-B76.jpg?height=600&width=600&text=Chikankari+2",
      "https://i.postimg.cc/dtXRRrpw/516-E6565-496-E-49-A1-A490-CFDBE432-EF05.jpg?height=600&width=600&text=Chikankari+3",
      "https://i.postimg.cc/KYYgdYdJ/04-D46850-B52-E-4-E88-93-E8-FE132-B8-DD17-F.jpg?height=600&width=600&text=Chikankari+4",
    ],
    rating: 4.9,
    reviews: 28,
    description: "Delicate white-on-white embroidery like morning mist",
    tags: ["Embroidered", "Cotton", "Traditional"],
    craftTechnique: "Shadow Work Embroidery",
    materials: ["Cotton", "Silk Thread"],
    timeToMake: "3 weeks",
  },
  {
    id: "7",
    name: "Madhubani Painting",
    artisan: "Sita Devi",
    location: "Madhubani, Bihar",
    price: 2800,
    category: "Art",
    subcategory: "Paintings",
    images: [
      "https://i.postimg.cc/K8GR6Vtf/images-7.jpg?height=600&width=600&text=Madhubani+1",
      "https://i.postimg.cc/Y2N2tRrs/images-8.jpg?height=600&width=600&text=Madhubani+2",
      "https://i.postimg.cc/gkSW0BfN/images-10.jpg?height=600&width=600&text=Madhubani+3",
      "https://i.postimg.cc/4x0sWFPm/images-9.jpg?height=600&width=600&text=Madhubani+4",
    ],
    rating: 4.8,
    reviews: 22,
    isFeatured: true,
    description: "Vibrant folk art depicting mythological stories",
    tags: ["Folk Art", "Natural Pigments", "Mythological"],
    craftTechnique: "Traditional Brush Painting",
    materials: ["Natural Pigments", "Handmade Paper"],
    timeToMake: "1 week",
  },
  {
    id: "8",
    name: "Pashmina Shawl",
    artisan: "Abdul Rahman",
    location: "Kashmir",
    price: 8500,
    originalPrice: 10000,
    category: "Textiles",
    subcategory: "Shawls",
    images: [
      "https://i.postimg.cc/hvhX5Z6v/images-33.jpg?height=600&width=600&text=Pashmina+1",
      "https://i.postimg.cc/kXm484XD/images-34.jpg?height=600&width=600&text=Pashmina+2",
      "https://i.postimg.cc/tJyj1stj/images-35.jpg?height=600&width=600&text=Pashmina+3",
      "https://i.postimg.cc/wv2WV3YH/images-37.jpg?height=600&width=600&text=Pashmina+4",
    ],
    rating: 5,
    reviews: 35,
    description: "Finest cashmere wool woven into ethereal softness",
    tags: ["Cashmere", "Luxury", "Warm"],
    craftTechnique: "Hand Spinning & Weaving",
    materials: ["Cashmere Wool"],
    timeToMake: "1 month",
  },
];

const categories = [
  "All",
  "Textiles",
  "Pottery",
  "Woodwork",
  "Metalwork",
  "Art",
];
const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Rating",
];

// Custom Cursor Component - Fixed to not block interactions
function CustomCursor({ hoveredProduct }: { hoveredProduct: Product | null }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 100);
      cursorY.set(e.clientY - 100);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (hoveredProduct) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prev) => (prev + 1) % hoveredProduct.images.length
        );
      }, 800);
      return () => clearInterval(interval);
    }
  }, [hoveredProduct]);

  if (!hoveredProduct) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-30"
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
        className="relative pointer-events-none"
      >
        {/* Main Image Container */}
        <motion.div
          className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 pointer-events-none"
          animate={{
            boxShadow: [
              "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              "0 25px 50px -12px rgba(59, 130, 246, 0.3)",
              "0 25px 50px -12px rgba(147, 51, 234, 0.3)",
              "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.2, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative w-full h-full pointer-events-none"
            >
              <Image
                src={hoveredProduct.images[currentImageIndex]}
                alt={hoveredProduct.name}
                fill
                className="object-cover pointer-events-none"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Product Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
                <motion.h3
                  className="font-serif text-sm mb-1 line-clamp-2"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {hoveredProduct.name}
                </motion.h3>
                <p className="text-xs opacity-80">
                  ₹{hoveredProduct.price.toLocaleString()}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles className="w-4 h-4 text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <Heart className="w-3 h-3 text-white" />
        </motion.div>

        {/* Image Counter */}
        <motion.div
          className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white pointer-events-none"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          {currentImageIndex + 1}/{hoveredProduct.images.length}
        </motion.div>

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-blue-400/50 pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </motion.div>
  );
}

// Enhanced Product Card Component
function ProductCard({
  product,
  onHover,
  onLeave,
}: {
  product: Product;
  onHover: (product: Product) => void;
  onLeave: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isLiked = favorites.some((fav) => fav.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.name,
      image: product.images[0],
      price: product.price,
      artisan: product.artisan,
      category: product.category,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        title: product.name,
        image: product.images[0],
        artisan: product.artisan,
        category: product.category,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group cursor-pointer relative z-10"
      onMouseEnter={() => onHover(product)}
      onMouseLeave={onLeave}
    >
      <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/90 backdrop-blur-sm relative z-10">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700"
              />

              {/* Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
              {product.isNew && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                    <Zap className="w-3 h-3 mr-1" />
                    New
                  </Badge>
                </motion.div>
              )}
              {product.isFeatured && (
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                    <Flame className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <motion.div
              className="absolute top-4 right-4 flex flex-col gap-2 z-20"
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 relative z-30 ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleFavorite}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </motion.button>

              <motion.button
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30 flex items-center justify-center transition-all duration-300 relative z-30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Image Navigation Dots */}
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-20"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 relative z-30 ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/50"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </motion.div>

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Content */}
          <div className="p-6 relative z-10">
            {/* Category */}
            <motion.p
              className="text-sm text-terracotta font-medium mb-2"
              whileHover={{ scale: 1.05 }}
            >
              {product.category} • {product.subcategory}
            </motion.p>

            {/* Title */}
            <motion.h3
              className="font-serif text-lg text-deep-indigo mb-2 line-clamp-2 group-hover:text-terracotta transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {product.name}
            </motion.h3>

            {/* Artisan */}
            <p className="text-sm text-deep-indigo/70 mb-3">
              by <span className="font-medium">{product.artisan}</span> •{" "}
              {product.location}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-deep-indigo/60">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.span
                  className="text-2xl font-bold text-deep-indigo"
                  whileHover={{ scale: 1.05 }}
                >
                  ₹{product.price.toLocaleString()}
                </motion.span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <Badge className="bg-green-100 text-green-800 border-0">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </Badge>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {product.tags.slice(0, 3).map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Add to Cart Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-terracotta to-red-500 hover:from-red-500 hover:to-terracotta text-white rounded-full shadow-lg relative overflow-hidden group z-20"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 pointer-events-none"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </span>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function BrowseCraftsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artisan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "Rating":
        return b.rating - a.rating;
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-warm-ivory via-gray-50 to-warm-ivory pt-20">
      {/* Custom Cursor */}
      <AnimatePresence>
        <CustomCursor hoveredProduct={hoveredProduct} />
      </AnimatePresence>

      {/* Hero Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto text-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #E07A5F 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-serif text-deep-indigo mb-6 leading-tight"
            animate={{
              backgroundImage: [
                "linear-gradient(45deg, #264653, #E07A5F)",
                "linear-gradient(45deg, #E07A5F, #F2CC8F)",
                "linear-gradient(45deg, #F2CC8F, #264653)",
                "linear-gradient(45deg, #264653, #E07A5F)",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Browse Crafts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-deep-indigo/70 max-w-3xl mx-auto leading-relaxed"
          >
            Discover handcrafted treasures from master artisans across India.
            Each piece tells a story of tradition, skill, and passionate
            craftsmanship.
          </motion.p>
        </motion.div>
      </section>

      {/* Filters and Controls */}
      <section className="px-4 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deep-indigo/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search crafts or artisans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-deep-indigo/20 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20 bg-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-terracotta to-red-500 text-white shadow-lg scale-105"
                      : "bg-white/50 text-deep-indigo hover:bg-terracotta/10 hover:text-terracotta border border-deep-indigo/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-deep-indigo/20 focus:border-terracotta focus:outline-none bg-white/50 backdrop-blur-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full p-1 border border-deep-indigo/20">
                <motion.button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-terracotta text-white"
                      : "text-deep-indigo/60 hover:text-terracotta"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-terracotta text-white"
                      : "text-deep-indigo/60 hover:text-terracotta"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="px-4 max-w-7xl mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onHover={setHoveredProduct}
                onLeave={() => setHoveredProduct(null)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-serif text-deep-indigo mb-2">
              No crafts found
            </h3>
            <p className="text-deep-indigo/70">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
}
