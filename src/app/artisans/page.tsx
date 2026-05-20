"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

const artisans = [
  {
    id: "kamala-devi",
    name: "Kamala Devi",
    age: 72,
    craft: "Block Printing",
    location: "Jaipur, Rajasthan",
    experience: "50+ years",
    image: "/images/p.jpg?height=400&width=400",
    speciality: "Natural Dye Block Printing",
    rating: 5,
  },
  {
    id: "ravi-kumar",
    name: "Ravi Kumar",
    age: 58,
    craft: "Pottery",
    location: "Khurja, Uttar Pradesh",
    experience: "35+ years",
    image: "https://i.postimg.cc/6qRtQTjr/images-40.jpg?height=400&width=400",
    speciality: "Terracotta & Blue Pottery",
    rating: 5,
  },
  {
    id: "meera-sharma",
    name: "Meera Sharma",
    age: 45,
    craft: "Weaving",
    location: "Varanasi, Uttar Pradesh",
    experience: "25+ years",
    image: "https://i.postimg.cc/BQQmsRj6/images-44.jpg?height=400&width=400",
    speciality: "Banarasi Silk Weaving",
    rating: 5,
  },
  {
    id: "gopal-singh",
    name: "Gopal Singh",
    age: 65,
    craft: "Wood Carving",
    location: "Saharanpur, Uttar Pradesh",
    experience: "40+ years",
    image: "https://i.postimg.cc/8PQT0Bct/images-43.jpg?height=400&width=400",
    speciality: "Intricate Wood Inlay",
    rating: 5,
  },
  {
    id: "lakshmi-bai",
    name: "Lakshmi Bai",
    age: 55,
    craft: "Embroidery",
    location: "Lucknow, Uttar Pradesh",
    experience: "30+ years",
    image: "https://i.postimg.cc/B6TmQ058/images.jpg?height=400&width=400",
    speciality: "Chikankari Embroidery",
    rating: 5,
  },
  {
    id: "arjun-patel",
    name: "Arjun Patel",
    age: 62,
    craft: "Metal Work",
    location: "Moradabad, Uttar Pradesh",
    experience: "38+ years",
    image: "https://i.postimg.cc/8PQT0Bct/images-43.jpg?height=400&width=400",
    speciality: "Brass & Copper Work",
    rating: 5,
  },
];

const crafts = [
  "All",
  "Block Printing",
  "Pottery",
  "Weaving",
  "Wood Carving",
  "Embroidery",
  "Metal Work",
];
const regions = [
  "All",
  "Rajasthan",
  "Uttar Pradesh",
  "West Bengal",
  "Gujarat",
  "Karnataka",
];

export default function ArtisansPage() {
  const [selectedCraft, setSelectedCraft] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredArtisans = artisans.filter((artisan) => {
    const craftMatch =
      selectedCraft === "All" || artisan.craft === selectedCraft;
    const regionMatch =
      selectedRegion === "All" || artisan.location.includes(selectedRegion);
    return craftMatch && regionMatch;
  });

  return (
    <main className="min-h-screen bg-warm-ivory pt-20">
      {/* Header */}
      <section className="py-16 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif text-deep-indigo mb-6">
            The Hands and Hearts of Virasa
          </h1>
          <p className="text-lg text-deep-indigo/70 max-w-3xl mx-auto leading-relaxed">
            Meet the master craftspeople who pour their souls into every
            creation. Each artisan carries forward traditions passed down
            through generations, creating not just products, but pieces of
            living heritage.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="px-4 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 items-center justify-center"
        >
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-deep-indigo mr-2">
              Craft:
            </span>
            {crafts.map((craft) => (
              <Button
                key={craft}
                variant={selectedCraft === craft ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCraft(craft)}
                className={
                  selectedCraft === craft
                    ? "bg-terracotta hover:bg-terracotta/90 text-white"
                    : "border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                }
              >
                {craft}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-deep-indigo mr-2">
              Region:
            </span>
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region)}
                className={
                  selectedRegion === region
                    ? "bg-deep-indigo hover:bg-deep-indigo/90 text-white"
                    : "border-deep-indigo text-deep-indigo hover:bg-deep-indigo hover:text-white"
                }
              >
                {region}
              </Button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Artisans Grid */}
      <section className="px-4 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtisans.map((artisan, index) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/artisans/${artisan.id}`}>
                <Card className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={artisan.image}
                        alt={artisan.name}
                        width={400}
                        height={400}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge className="bg-marigold text-deep-indigo mb-2">
                          {artisan.craft}
                        </Badge>
                        <h3 className="text-xl font-serif mb-1">
                          {artisan.name}
                        </h3>
                        <p className="text-sm opacity-90">
                          {artisan.experience} of craftsmanship
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-serif text-deep-indigo group-hover:text-terracotta transition-colors">
                          {artisan.name}
                        </h3>
                        <span className="text-sm text-deep-indigo/60">
                          Age {artisan.age}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(artisan.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-marigold text-marigold"
                          />
                        ))}
                        <span className="text-sm text-deep-indigo/60 ml-2">
                          {artisan.experience}
                        </span>
                      </div>
                      <p className="text-deep-indigo/70 mb-3">
                        {artisan.speciality}
                      </p>
                      <div className="flex items-center text-sm text-deep-indigo/60">
                        <MapPin className="w-4 h-4 mr-1" />
                        {artisan.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
