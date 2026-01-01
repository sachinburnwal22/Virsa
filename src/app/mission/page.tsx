"use client";

import { motion } from "framer-motion";
import { CustomCursor } from "@/components/custom-cursor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
  Star,
  Award,
  Target,
} from "lucide-react";

const missionValues = [
  {
    icon: Heart,
    title: "Preserve Heritage",
    description:
      "Safeguarding centuries-old craftsmanship techniques and passing them to future generations.",
    color: "text-red-500",
  },
  {
    icon: Users,
    title: "Empower Artisans",
    description:
      "Providing fair wages, global recognition, and sustainable livelihoods to master craftspeople.",
    color: "text-blue-500",
  },
  {
    icon: Globe,
    title: "Connect Cultures",
    description:
      "Bridging the gap between traditional Indian crafts and contemporary global markets.",
    color: "text-green-500",
  },
  {
    icon: Sparkles,
    title: "Celebrate Authenticity",
    description:
      "Every piece tells a story of dedication, skill, and cultural significance.",
    color: "text-purple-500",
  },
];

const impactStats = [
  { number: "500+", label: "Master Artisans", icon: Users },
  { number: "50+", label: "Traditional Crafts", icon: Award },
  { number: "25+", label: "States Covered", icon: Globe },
  { number: "10K+", label: "Happy Customers", icon: Star },
];

const journeySteps = [
  {
    year: "2020",
    title: "The Vision",
    description:
      "Founded with a dream to preserve India's rich craft heritage and support artisan communities.",
  },
  {
    year: "2021",
    title: "First Partnerships",
    description:
      "Collaborated with 50 master artisans across 5 states, establishing fair trade practices.",
  },
  {
    year: "2022",
    title: "Global Reach",
    description:
      "Expanded internationally, bringing Indian crafts to customers in 15+ countries.",
  },
  {
    year: "2023",
    title: "Community Impact",
    description:
      "Launched skill development programs and provided sustainable livelihoods to 500+ families.",
  },
  {
    year: "2024",
    title: "Future Forward",
    description:
      "Continuing to innovate while staying true to our roots, preserving heritage for tomorrow.",
  },
];

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-warm-ivory">
      <CustomCursor />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-indigo/5 to-terracotta/5" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block p-4 bg-terracotta/10 rounded-full mb-6"
          >
            <Heart className="w-12 h-12 text-terracotta" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-serif text-deep-indigo mb-6">
            Our{" "}
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-terracotta"
            >
              Mission
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-deep-indigo/80 max-w-4xl mx-auto leading-relaxed"
          >
            To preserve India's magnificent craft heritage while empowering
            artisans with sustainable livelihoods, connecting ancient wisdom
            with modern appreciation.
          </motion.p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-32 left-10 w-16 h-16 bg-terracotta/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-48 right-16 w-24 h-24 bg-deep-indigo/20 rounded-full blur-xl"
        />
      </section>

      {/* Mission Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-deep-indigo mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-deep-indigo/70 max-w-2xl mx-auto">
              Four pillars that guide everything we do at Virasa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missionValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                data-cursor-hover
              >
                <Card className="h-full bg-white/50 backdrop-blur-sm border-terracotta/20 hover:border-terracotta/40 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-block p-4 rounded-full bg-gradient-to-br from-white to-gray-50 mb-6 ${value.color}`}
                    >
                      <value.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-deep-indigo mb-4">
                      {value.title}
                    </h3>
                    <p className="text-deep-indigo/70 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-gradient-to-r from-deep-indigo to-terracotta">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Our Impact
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Numbers that tell the story of our journey and commitment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
                data-cursor-hover
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  className="inline-block p-4 bg-white/20 rounded-full mb-4"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-deep-indigo mb-6">
              Our Journey
            </h2>
            <p className="text-lg text-deep-indigo/70 max-w-2xl mx-auto">
              From a vision to a movement - the story of Virasa
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-terracotta to-deep-indigo rounded-full" />

            {journeySteps.map((step, index) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                  }`}
                >
                  <Card className="bg-white/70 backdrop-blur-sm border-terracotta/20 hover:border-terracotta/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-terracotta mb-2">
                        {step.year}
                      </div>
                      <h3 className="text-xl font-semibold text-deep-indigo mb-3">
                        {step.title}
                      </h3>
                      <p className="text-deep-indigo/70">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-terracotta rounded-full border-4 border-white shadow-lg z-10"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-warm-ivory to-sage-green/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Target className="w-16 h-16 text-terracotta mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif text-deep-indigo mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-deep-indigo/80 mb-8 leading-relaxed">
              Be part of preserving India's craft heritage. Every purchase
              supports an artisan, every story shared keeps traditions alive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-4 text-lg"
                  data-cursor-hover
                >
                  Explore Crafts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-deep-indigo text-deep-indigo hover:bg-deep-indigo hover:text-white px-8 py-4 text-lg bg-transparent"
                  data-cursor-hover
                >
                  Meet Artisans
                  <Heart className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
