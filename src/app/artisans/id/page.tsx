import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Heart, Calendar, Award } from "lucide-react";

// This would typically come from a database or API
const artisanData = {
  "kamala-devi": {
    name: "Kamala Devi",
    age: 72,
    craft: "Block Printing",
    location: "Jaipur, Rajasthan",
    experience: "50+ years",
    image: "/images/p.jpg?height=600&width=500",
    speciality: "Natural Dye Block Printing",
    rating: 5,
    bio: "Kamala Devi has lived in the same sun-drenched courtyard for over fifty years, her hands rarely still. She learned the art of block-printing from her mother, who learned it from hers. For Kamala, each piece of cloth is a conversation with her ancestors. She uses only natural dyes—turmeric for yellow, indigo for blue, pomegranate for red—and her motifs are drawn from the birds she sees outside her window and the stories her grandmother used to tell.",
    philosophy:
      "The faint scent of marigold that clings to my fabrics is the smell of a happy memory. When you touch my work, you touch fifty years of morning prayers, afternoon stories, and evening songs.",
    timeline: [
      {
        year: 1952,
        event: "Born in Jaipur to a family of traditional block printers",
      },
      {
        year: 1965,
        event: "Began learning block printing from her mother at age 13",
      },
      {
        year: 1972,
        event:
          "Married and moved to her husband's ancestral home with printing workshop",
      },
      {
        year: 1980,
        event: "Started experimenting with natural dyes from her garden",
      },
      { year: 1995, event: "Began teaching block printing to local women" },
      {
        year: 2010,
        event:
          "Received state recognition for preserving traditional techniques",
      },
      { year: 2020, event: "Joined Virasa to share her craft with the world" },
    ],
    products: [
      {
        id: 1,
        name: "Monsoon Garden Kantha Quilt",
        price: "₹450",
        image:
          "https://i.postimg.cc/hvhX5Z6v/images-33.jpg?height=300&width=300",
      },
      {
        id: 2,
        name: "Marigold Block Print Scarf",
        price: "₹120",
        image:
          "https://i.postimg.cc/wv2WV3YH/images-37.jpg?height=300&width=300",
      },
      {
        id: 3,
        name: "Indigo Dreams Table Runner",
        price: "₹800",
        image:
          "https://i.postimg.cc/mDsn2QVb/images-21.jpg?height=300&width=300",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtisanProfile({ params }: PageProps) {
  const { id } = await params;
  const artisan = artisanData[id as keyof typeof artisanData];

  if (!artisan) {
    return <div>Artisan not found</div>;
  }

  return (
    <main className="min-h-screen bg-warm-ivory pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <Image
              src={artisan.image}
              alt={artisan.name}
              width={500}
              height={600}
              className="rounded-lg shadow-xl object-cover w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-marigold" />
                <span className="text-sm font-medium text-deep-indigo">
                  {artisan.experience}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="bg-terracotta text-white mb-4">
                {artisan.craft}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif text-deep-indigo mb-4">
                {artisan.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(artisan.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-marigold text-marigold"
                    />
                  ))}
                </div>
                <span className="text-deep-indigo/60">Master Craftsperson</span>
              </div>
              <div className="flex items-center text-deep-indigo/70 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                {artisan.location} • Age {artisan.age}
              </div>
            </div>

            <p className="text-lg text-deep-indigo/80 leading-relaxed">
              {artisan.speciality}
            </p>

            <div className="flex gap-4">
              <Button className="bg-terracotta hover:bg-terracotta/90 text-white">
                <Heart className="w-4 h-4 mr-2" />
                Follow Artisan
              </Button>
              <Button
                variant="outline"
                className="border-deep-indigo text-deep-indigo hover:bg-deep-indigo hover:text-white bg-transparent"
              >
                View All Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Life Story */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div
          className="space-y-8"
        >
          <h2 className="text-3xl font-serif text-deep-indigo text-center mb-8">
            My Story
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-deep-indigo/80 leading-relaxed text-lg mb-6">
              {artisan.bio}
            </p>
            <blockquote className="border-l-4 border-marigold pl-6 italic text-deep-indigo/70 text-lg">
              "{artisan.philosophy}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div>
          <h2 className="text-3xl font-serif text-deep-indigo text-center mb-12">
            Life Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-terracotta/30"></div>
            {artisan.timeline.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                  }`}
                >
                  <Card className="shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-terracotta" />
                        <span className="font-semibold text-terracotta">
                          {event.year}
                        </span>
                      </div>
                      <p className="text-deep-indigo/80">{event.event}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-terracotta rounded-full border-4 border-white shadow-md"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Gallery */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-serif text-deep-indigo text-center mb-12">
            Creations by {artisan.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisan.products.map((product, index) => (
              <div
                key={product.id}
              >
                <Card className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={
                          product.image ||
                          "https://i.postimg.cc/TYD3Zxyn/images-18.jpg"
                        }
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-medium text-deep-indigo mb-2 group-hover:text-terracotta transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-deep-indigo">
                          {product.price}
                        </span>
                        <Heart className="w-5 h-5 text-deep-indigo/40 hover:text-terracotta hover:fill-terracotta transition-colors cursor-pointer" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="bg-deep-indigo hover:bg-deep-indigo/90 text-white"
            >
              <Link href={`/artisans/${id}/products`}>
                View All Creations
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
