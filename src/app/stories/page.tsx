"use client";

import type React from "react";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomCursor } from "@/components/custom-cursor";
import { StorySubmissionModal } from "../../components/story-submission-modal";
import { useFavorites } from "@/contexts/favorites-context";
import {
  Heart,
  Star,
  Clock,
  MapPin,
  Users,
  Award,
  Sparkles,
  BookOpen,
  Camera,
  Play,
  ChevronRight,
  Quote,
  X,
} from "lucide-react";

const stories = [
  {
    id: "story-1",
    title: "The Master Weaver's Legacy",
    artisan: "Kamala Devi",
    location: "Varanasi, Uttar Pradesh",
    craft: "Banarasi Silk Weaving",
    duration: "45 years of craftsmanship",
    image: "/images/p.jpg?height=400&width=600&text=Kamala+Devi+Weaving",
    story:
      "In the narrow lanes of Varanasi, where the Ganges flows with ancient wisdom, Kamala Devi has been weaving dreams into silk for over four decades. Her fingers dance across the loom with the grace of a classical dancer, creating patterns that tell stories of gods and goddesses.",
    highlights: [
      "First woman to win National Craft Award in her village",
      "Trained over 200 young weavers",
      "Preserved 15 traditional patterns from extinction",
    ],
    videoUrl: "#",
    featured: true,
    category: "Heritage Craft",
    readTime: "8 min read",
    likes: 1247,
    views: 15632,
  },
  {
    id: "story-2",
    title: "Clay Whispers: A Potter's Journey",
    artisan: "Ravi Kumar",
    location: "Khurja, Uttar Pradesh",
    craft: "Blue Pottery",
    duration: "30 years of innovation",
    image:
      "https://i.postimg.cc/L6L89Qwc/images-39.jpg?height=400&width=600&text=Ravi+Kumar+Pottery",
    story:
      "From the red earth of Khurja emerges art that speaks in shades of blue and white. Ravi Kumar's hands shape not just clay, but centuries of tradition, breathing new life into ancient techniques while honoring the masters who came before.",
    highlights: [
      "Revived the dying art of Khurja pottery",
      "Exports to 12 countries",
      "Sustainable practices using local materials",
    ],
    videoUrl: "#",
    featured: false,
    category: "Pottery",
    readTime: "6 min read",
    likes: 892,
    views: 8743,
  },
  {
    id: "story-3",
    title: "Threads of Time: Chikankari Chronicles",
    artisan: "Fatima Begum",
    location: "Lucknow, Uttar Pradesh",
    craft: "Chikankari Embroidery",
    duration: "25 years of delicate artistry",
    image:
      "https://i.postimg.cc/QCDnptNk/images-48.jpg?height=400&width=600&text=Fatima+Begum+Chikankari",
    story:
      "In the royal city of Lucknow, where nawabs once held court, Fatima Begum continues a tradition that adorned the garments of emperors. Each stitch is a prayer, each pattern a poem written in thread on the canvas of fine muslin.",
    highlights: [
      "Master of 32 traditional chikankari stitches",
      "Featured in Vogue India",
      "Mentors 50+ women artisans",
    ],
    videoUrl: "#",
    featured: true,
    category: "Embroidery",
    readTime: "7 min read",
    likes: 1456,
    views: 12890,
  },
  {
    id: "story-4",
    title: "The Brass Whisperer",
    artisan: "Mohan Lal",
    location: "Moradabad, Uttar Pradesh",
    craft: "Brass Handicrafts",
    duration: "35 years of metalwork mastery",
    image:
      "https://i.postimg.cc/6qRtQTjr/images-40.jpg?height=400&width=600&text=Mohan+Lal+Brass",
    story:
      "The rhythmic hammering echoes through the bylanes of Moradabad as Mohan Lal transforms cold brass into warm, living art. His workshop is a symphony of creation where metal sings under the touch of a master craftsman.",
    highlights: [
      "Pioneered eco-friendly brass finishing",
      "Supplies to luxury hotels worldwide",
      "Preserved ancient Mughal techniques",
    ],
    videoUrl: "#",
    featured: false,
    category: "Metalwork",
    readTime: "5 min read",
    likes: 743,
    views: 6521,
  },
  {
    id: "story-5",
    title: "Colors of Rajasthan: A Miniature Marvel",
    artisan: "Shanti Sharma",
    location: "Udaipur, Rajasthan",
    craft: "Miniature Painting",
    duration: "20 years of detailed artistry",
    image:
      "https://i.postimg.cc/B6TmQ058/images.jpg?height=400&width=600&text=Shanti+Sharma+Miniature",
    story:
      "With brushes made from squirrel hair and pigments ground from precious stones, Shanti Sharma paints worlds within worlds. Her miniature paintings capture the grandeur of Rajput courts in spaces smaller than a postcard.",
    highlights: [
      "Uses traditional stone pigments",
      "Paintings displayed in museums",
      "Teaches at art schools",
    ],
    videoUrl: "#",
    featured: false,
    category: "Painting",
    readTime: "9 min read",
    likes: 1089,
    views: 9876,
  },
  {
    id: "story-6",
    title: "Wooden Dreams: Carving Stories",
    artisan: "Govind Singh",
    location: "Saharanpur, Uttar Pradesh",
    craft: "Wood Carving",
    duration: "40 years of sculptural excellence",
    image:
      "https://i.postimg.cc/8PQT0Bct/images-43.jpg?height=400&width=600&text=Govind+Singh+Wood",
    story:
      "In the fragrant workshop filled with wood shavings, Govind Singh breathes life into timber. His chisels dance across the grain, revealing hidden stories that have slept within the wood for decades.",
    highlights: [
      "Created sculptures for temples across India",
      "Trains underprivileged youth",
      "Sustainable sourcing practices",
    ],
    videoUrl: "#",
    featured: true,
    category: "Wood Craft",
    readTime: "6 min read",
    likes: 967,
    views: 7654,
  },
];

const categories = [
  "All Stories",
  "Heritage Craft",
  "Pottery",
  "Embroidery",
  "Metalwork",
  "Painting",
  "Wood Craft",
];

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [selectedStory, setSelectedStory] = useState<
    (typeof stories)[0] | null
  >(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const filteredStories =
    selectedCategory === "All Stories"
      ? stories
      : stories.filter((story) => story.category === selectedCategory);

  const featuredStories = stories.filter((story) => story.featured);

  const handleFavoriteClick = (
    story: (typeof stories)[0],
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    const favoriteItem = {
      id: story.id,
      type: "story" as const,
      title: story.title,
      image: story.image,
      artisan: story.artisan,
      location: story.location,
      category: story.category,
    };

    if (isFavorite(story.id)) {
      removeFromFavorites(story.id);
    } else {
      addToFavorites(favoriteItem);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-ivory via-white to-marigold/20">
      <CustomCursor />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y, opacity }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-terracotta/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-deep-indigo mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              style={{
                background:
                  "linear-gradient(45deg, #264653, #e07a5f, #f2cc8f, #264653)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              अनोखी कहानियाँ
            </motion.h1>
            <motion.h2
              className="text-3xl md:text-5xl font-serif text-terracotta mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unique Stories
            </motion.h2>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Journey through the extraordinary tales of master artisans who weave
            magic into every creation. Each story is a testament to the enduring
            spirit of Indian craftsmanship.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-4 text-lg"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Stories
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white px-8 py-4 text-lg bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Videos
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-marigold/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-terracotta/30 rounded-full"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.section>

      {/* Featured Stories Carousel */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-deep-indigo mb-4">
              Featured Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most inspiring tales of creativity, tradition, and
              innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedStory(story)}
              >
                <Card className="overflow-hidden h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <motion.div
                        className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Sparkles className="inline w-4 h-4 mr-1" />
                        Featured
                      </motion.div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleFavoriteClick(story, e)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          isFavorite(story.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFavorite(story.id) ? "fill-current" : ""
                          }`}
                        />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {story.readTime}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {story.likes}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-terracotta font-medium bg-terracotta/10 px-2 py-1 rounded">
                        {story.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {story.location.split(",")[0]}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-deep-indigo mb-2 group-hover:text-terracotta transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {story.story}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-deep-indigo">
                          {story.artisan}
                        </p>
                        <p className="text-sm text-gray-500">
                          {story.duration}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="text-terracotta"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-deep-indigo mb-8">
              Explore by Craft
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-terracotta text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-terracotta/10 hover:text-terracotta border border-gray-200"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stories Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedStory(story)}
              >
                <Card className="overflow-hidden h-full bg-white border-0 shadow-md hover:shadow-xl transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {story.featured && (
                      <div className="absolute top-3 left-3">
                        <motion.div
                          className="bg-marigold text-deep-indigo p-2 rounded-full"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Star className="w-4 h-4" />
                        </motion.div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleFavoriteClick(story, e)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          isFavorite(story.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFavorite(story.id) ? "fill-current" : ""
                          }`}
                        />
                      </motion.button>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-terracotta font-medium bg-terracotta/10 px-2 py-1 rounded">
                        {story.category}
                      </span>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {story.readTime}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {story.likes}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-deep-indigo mb-2 group-hover:text-terracotta transition-colors line-clamp-2">
                      {story.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {story.story}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-deep-indigo text-sm">
                          {story.artisan}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {story.location.split(",")[0]}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ x: 3 }}
                        className="text-terracotta"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedStory(null)}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl" />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute top-4 left-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(selectedStory, e);
                  }}
                  className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                    isFavorite(selectedStory.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(selectedStory.id) ? "fill-current" : ""
                    }`}
                  />
                </motion.button>
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {selectedStory.title}
                </h1>
                <p className="text-lg opacity-90">
                  {selectedStory.artisan} • {selectedStory.location}
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm font-medium">
                  {selectedStory.category}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedStory.readTime}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Heart className="w-4 h-4 mr-1" />
                  {selectedStory.likes} likes
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  {selectedStory.views} views
                </span>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <div className="flex items-start mb-6">
                  <Quote className="w-8 h-8 text-terracotta mr-4 mt-1 flex-shrink-0" />
                  <p className="text-xl text-gray-700 italic leading-relaxed">
                    {selectedStory.story}
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-deep-indigo mb-4">
                  Key Achievements
                </h3>
                <ul className="space-y-3">
                  {selectedStory.highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <Award className="w-5 h-5 text-terracotta mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-terracotta hover:bg-terracotta/90">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Video Story
                </Button>
                <Button
                  variant="outline"
                  className="border-terracotta text-terracotta hover:bg-terracotta hover:text-white bg-transparent"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  View Gallery
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(selectedStory, e);
                  }}
                  className={
                    isFavorite(selectedStory.id)
                      ? "bg-red-50 border-red-200 text-red-600"
                      : ""
                  }
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      isFavorite(selectedStory.id) ? "fill-current" : ""
                    }`}
                  />
                  {isFavorite(selectedStory.id) ? "Saved" : "Save Story"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-deep-indigo to-terracotta text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Share Your Story
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Are you an artisan with a unique story? We'd love to feature your
              journey and craft.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsSubmissionModalOpen(true)}
                className="border-white text-white hover:bg-white hover:text-deep-indigo px-8 py-4 text-lg bg-transparent"
              >
                Submit Your Story
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Submission Modal */}
      <StorySubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />
    </div>
  );
}
