"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface GridItem {
  id: string;
  title: string;
  artisan: string;
  price: string;
  image: string;
  artisanImage: string;
  category: string;
}

const gridItems: GridItem[] = [
  {
    id: "1",
    title: "Monsoon Garden Kantha Quilt",
    artisan: "Kamala Devi",
    price: "₹4,500",
    image:
      "https://i.postimg.cc/jSwNm0C3/image.png?height=400&width=400&text=Kantha+Quilt",
    artisanImage: "/images/p.jpg?height=60&width=60&text=Kamala",
    category: "Textiles",
  },
  {
    id: "2",
    title: "Terracotta Water Pot",
    artisan: "Ravi Kumar",
    price: "₹850",
    image:
      "https://i.postimg.cc/1t8yLvDY/images-38.jpg?height=400&width=400&text=Water+Pot",
    artisanImage:
      "https://i.postimg.cc/1X8LV9xB/images-14.jpg?height=60&width=60&text=Ravi",
    category: "Pottery",
  },
  {
    id: "3",
    title: "Handwoven Silk Scarf",
    artisan: "Meera Sharma",
    price: "₹2,200",
    image:
      "https://i.postimg.cc/wv2WV3YH/images-37.jpg?height=400&width=400&text=Silk+Scarf",
    artisanImage: "https://postimg.cc/tZg328My?height=60&width=60&text=Meera",
    category: "Textiles",
  },
  {
    id: "4",
    title: "Wooden Jewelry Box",
    artisan: "Gopal Singh",
    price: "₹1,800",
    image:
      "https://i.postimg.cc/mDsn2QVb/images-21.jpg?height=400&width=400&text=Jewelry+Box",
    artisanImage: "https://postimg.cc/9Rj39t8G?height=60&width=60&text=Gopal",
    category: "Woodwork",
  },
  {
    id: "5",
    title: "Brass Diya Set",
    artisan: "Arjun Patel",
    price: "₹1,200",
    image:
      "https://i.postimg.cc/jdMQDzqs/images-23.jpg?height=400&width=400&text=Brass+Diya",
    artisanImage: "https://postimg.cc/XXLMZ5wC?height=60&width=60&text=Arjun",
    category: "Metalwork",
  },
  {
    id: "6",
    title: "Chikankari Kurta",
    artisan: "Lakshmi Bai",
    price: "₹3,500",
    image:
      "https://i.postimg.cc/yx0KfFjt/061-E29-C3-4-ED8-45-B0-A815-279-A80673-B76.jpg?height=400&width=400&text=Chikankari",
    artisanImage: "https://postimg.cc/QVwQJ4kG?height=60&width=60&text=Lakshmi",
    category: "Embroidery",
  },
];

export function InteractiveImageGrid() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const gridRef = useRef<HTMLDivElement>(null);

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

  const handleMouseEnter = (item: GridItem) => {
    setHoveredItem(item.id);
    setCursorVariant("hover");
    setCursorText("View");
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setCursorVariant("default");
    setCursorText("");
  };

  const variants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(224, 122, 95, 0.8)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      scale: 3,
      backgroundColor: "rgba(242, 204, 143, 0.9)",
      mixBlendMode: "normal" as const,
    },
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto relative">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 rounded-full flex items-center justify-center text-xs font-medium text-deep-indigo"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-serif text-deep-indigo mb-4">
          Curated Treasures
        </h2>
        <p className="text-deep-indigo/70 max-w-2xl mx-auto">
          Discover handcrafted pieces that tell stories of tradition, skill, and
          love
        </p>
      </motion.div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-none"
      >
        {gridItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={`/products/${item.id}`}>
              <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Artisan Badge */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{
                      scale: hoveredItem === item.id ? 1 : 0.8,
                      rotate: hoveredItem === item.id ? 0 : -180,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <Image
                      src={item.artisanImage || "/placeholder.svg"}
                      alt={item.artisan}
                      width={48}
                      height={48}
                      className="rounded-full border-3 border-white shadow-lg"
                    />
                  </motion.div>

                  {/* Category Tag */}
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

                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: hoveredItem === item.id ? 1 : 0,
                      opacity: hoveredItem === item.id ? [0, 0.3, 0] : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  >
                    <div className="w-full h-full bg-terracotta/20 rounded-full" />
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  className="p-6"
                  animate={{
                    y: hoveredItem === item.id ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3
                    className="font-medium text-deep-indigo mb-2 text-lg"
                    animate={{
                      color: hoveredItem === item.id ? "#E07A5F" : "#264653",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>

                  <p className="text-sm text-deep-indigo/60 mb-3">
                    by {item.artisan}
                  </p>

                  <div className="flex items-center justify-between">
                    <motion.span
                      className="text-xl font-semibold text-deep-indigo"
                      animate={{
                        scale: hoveredItem === item.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.price}
                    </motion.span>

                    <motion.div
                      className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center"
                      animate={{
                        scale: hoveredItem === item.id ? 1.2 : 1,
                        backgroundColor:
                          hoveredItem === item.id
                            ? "#E07A5F"
                            : "rgba(224, 122, 95, 0.1)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        animate={{
                          backgroundColor:
                            hoveredItem === item.id ? "#FDF6E3" : "#E07A5F",
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Magnetic Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-transparent"
                  animate={{
                    borderColor:
                      hoveredItem === item.id ? "#F2CC8F" : "transparent",
                    boxShadow:
                      hoveredItem === item.id
                        ? "0 20px 40px rgba(224, 122, 95, 0.2)"
                        : "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #E07A5F 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </section>
  );
}
