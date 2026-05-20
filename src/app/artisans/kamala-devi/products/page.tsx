"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Grid3X3,
  List,
  Search,
  Sparkles,
  Award,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample products data for Kamala Devi
const products = [
  {
    id: 1,
    name: "Marigold Bloom Table Runner",
    price: 2800,
    originalPrice: 3500,
    image:
      "https://i.postimg.cc/W4BHznh6/im1.webp?height=400&width=400&text=Marigold+Table+Runner",
    category: "Table Linens",
    description:
      "Hand-block printed with traditional marigold motifs using natural dyes",
    rating: 5,
    reviews: 24,
    isNew: true,
    isBestseller: false,
  },
  {
    id: 2,
    name: "Peacock Feather Dupatta",
    price: 4200,
    originalPrice: 5000,
    image:
      "https://i.postimg.cc/1XHCW1MJ/im2.webp?height=400&width=400&text=Peacock+Dupatta",
    category: "Clothing",
    description:
      "Exquisite peacock feather patterns on pure cotton with gold accents",
    rating: 5,
    reviews: 18,
    isNew: false,
    isBestseller: true,
  },
  {
    id: 3,
    name: "Lotus Garden Cushion Covers",
    price: 1800,
    originalPrice: 2200,
    image:
      "https://i.postimg.cc/rscZCwGD/im3.webp?height=400&width=400&text=Lotus+Cushions",
    category: "Home Decor",
    description:
      "Set of 2 cushion covers with intricate lotus garden block prints",
    rating: 4.8,
    reviews: 32,
    isNew: false,
    isBestseller: false,
  },
  {
    id: 4,
    name: "Royal Rajasthani Bedsheet Set",
    price: 6500,
    originalPrice: 8000,
    image:
      "https://i.postimg.cc/y6Xb60Bc/im4.jpg?height=400&width=400&text=Royal+Bedsheet",
    category: "Bedding",
    description:
      "King-size bedsheet with pillow covers featuring royal Rajasthani motifs",
    rating: 5,
    reviews: 15,
    isNew: true,
    isBestseller: true,
  },
  {
    id: 5,
    name: "Elephant Parade Wall Hanging",
    price: 3200,
    originalPrice: 4000,
    image:
      "https://i.postimg.cc/nzqwDDm8/im5.webp?height=400&width=400&text=Elephant+Wall+Hanging",
    category: "Wall Art",
    description: "Large wall hanging depicting a traditional elephant parade",
    rating: 4.9,
    reviews: 21,
    isNew: false,
    isBestseller: false,
  },
  {
    id: 6,
    name: "Mandala Meditation Mat",
    price: 2500,
    originalPrice: 3000,
    image:
      "https://i.postimg.cc/VLfHJ5LT/im6.jpg?height=400&width=400&text=Mandala+Mat",
    category: "Wellness",
    description:
      "Sacred geometry mandala design perfect for meditation and yoga",
    rating: 4.7,
    reviews: 28,
    isNew: false,
    isBestseller: false,
  },
];

const categories = [
  "All",
  "Table Linens",
  "Clothing",
  "Home Decor",
  "Bedding",
  "Wall Art",
  "Wellness",
];

// Floating elements component
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-terracotta/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

// Product card component
function ProductCard({
  product,
  viewMode,
}: {
  product: any;
  viewMode: "grid" | "list";
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      >
        <div className="flex">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isNew && (
              <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                New
              </div>
            )}
            {product.isBestseller && (
              <div className="absolute top-3 right-3 bg-terracotta text-white px-2 py-1 rounded-full text-xs font-medium">
                Bestseller
              </div>
            )}
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-deep-indigo mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-terracotta font-medium">
                    {product.category}
                  </p>
                </div>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <p className="text-deep-indigo/70 mb-4">{product.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-marigold text-marigold"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-deep-indigo/60">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-deep-indigo">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  className="bg-terracotta hover:bg-red-500 text-white rounded-full"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
            >
              New
            </motion.div>
          )}
          {product.isBestseller && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-terracotta text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
            >
              Bestseller
            </motion.div>
          )}
        </div>

        {/* Like button */}
        <motion.button
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          onClick={() => setIsLiked(!isLiked)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </motion.button>

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3"
            >
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full shadow-lg"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
              <Button
                size="sm"
                className="bg-terracotta hover:bg-red-500 text-white rounded-full shadow-lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-deep-indigo group-hover:text-terracotta transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-terracotta font-medium">
              {product.category}
            </p>
          </div>
        </div>

        <p className="text-deep-indigo/70 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-marigold text-marigold"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-deep-indigo/60">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-deep-indigo">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function KamalaDeviProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-warm-ivory">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-deep-indigo/5 via-terracotta/5 to-marigold/5 overflow-hidden">
        <FloatingElements />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Button
              asChild
              variant="ghost"
              className="mb-6 text-deep-indigo hover:text-terracotta transition-colors"
            >
              <Link
                href="/artisans/kamala-devi"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Kamala's Story
              </Link>
            </Button>

            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="w-3 h-3 bg-terracotta rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-terracotta font-medium uppercase tracking-wider text-sm">
                Handcrafted with Love
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-deep-indigo mb-6 leading-tight">
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
                Kamala's Creations
              </motion.span>
            </h1>

            <p className="text-xl text-deep-indigo/70 max-w-3xl mx-auto mb-8">
              Discover authentic block-printed treasures, each piece lovingly
              crafted by master artisan Kamala Devi using traditional techniques
              passed down through generations.
            </p>

            <div className="flex items-center justify-center gap-4 text-deep-indigo/60">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-terracotta" />
                <span>50+ Years Experience</span>
              </div>
              <div className="w-1 h-1 bg-deep-indigo/30 rounded-full" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-marigold" />
                <span>Natural Dyes Only</span>
              </div>
              <div className="w-1 h-1 bg-deep-indigo/30 rounded-full" />
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Made with Love</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-white/50 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search Kamala's creations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-terracotta"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-terracotta hover:bg-red-500 text-white"
                      : "border-gray-300 text-deep-indigo hover:border-terracotta hover:text-terracotta"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-full ${
                  viewMode === "grid" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-full ${
                  viewMode === "list" ? "bg-white shadow-sm" : ""
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-deep-indigo/70">
              Showing {filteredProducts.length} of {products.length} creations
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${viewMode}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-serif text-deep-indigo mb-4">
                No creations found
              </h3>
              <p className="text-deep-indigo/70 mb-8">
                Try adjusting your search or category filters to find what
                you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="bg-terracotta hover:bg-red-500 text-white rounded-full px-8"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-terracotta/10 to-marigold/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-deep-indigo mb-6">
              Bring Home Authentic Heritage
            </h2>
            <p className="text-xl text-deep-indigo/70 mb-8">
              Each piece tells a story of tradition, skill, and passionate
              craftsmanship. Support our artisans and preserve these beautiful
              traditions for future generations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-deep-indigo to-blue-600 hover:from-blue-600 hover:to-deep-indigo text-white px-8 py-4 rounded-full shadow-xl"
              >
                <Link href="/artisans/kamala-devi">Read Kamala's Story</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white px-8 py-4 rounded-full bg-transparent"
              >
                <Link href="/artisans">Meet Other Artisans</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
