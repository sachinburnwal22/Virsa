"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFavorites } from "@/contexts/favorites-context";
import { useCart } from "@/contexts/cart-context";

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesSidebar({ isOpen, onClose }: FavoritesSidebarProps) {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleAddToCart = (favorite: any) => {
    addToCart({
      id: favorite.id,
      title: favorite.title,
      image: favorite.image,
      price: 2500, // Default price since favorites don't store price
      artisan: favorite.artisan,
      category: favorite.category,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-deep-indigo">
                    Favorites
                  </h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-gray-600 mt-2">
                {favorites.length} {favorites.length === 1 ? "item" : "items"}{" "}
                saved
              </p>
            </div>

            <div className="flex-1 p-6">
              {favorites.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-gray-500">
                    Save items you love to see them here!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-deep-indigo">
                      Saved Items
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFavorites}
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      Clear All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {favorites.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex space-x-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />

                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-deep-indigo text-sm line-clamp-2 mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-gray-600 mb-2">
                                  by {item.artisan}
                                </p>
                                <p className="text-xs text-terracotta mb-3">
                                  {item.category}
                                </p>

                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddToCart(item)}
                                    className="flex-1 text-xs"
                                  >
                                    <ShoppingBag className="w-3 h-3 mr-1" />
                                    Add to Cart
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFromFavorites(item.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Heart className="w-4 h-4 fill-current" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
