"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  Heart,
  ShoppingBag,
  BookOpen,
  LogOut,
  Edit,
  MapPin,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/auth-context";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout, updateProfile } = useAuth();

  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    specialties: user?.specialties?.join(", ") || "",
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowEditProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveProfile = () => {
    updateProfile({
      name: editForm.name,
      bio: editForm.bio,
      location: editForm.location,
      specialties: editForm.specialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    setShowEditProfile(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "buyer":
        return "from-blue-500 to-purple-600";
      case "artisan":
        return "from-orange-500 to-red-600";
      case "storyteller":
        return "from-green-500 to-teal-600";
      case "collector":
        return "from-pink-500 to-rose-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case "buyer":
        return "Art Enthusiast";
      case "artisan":
        return "Master Artisan";
      case "storyteller":
        return "Story Curator";
      case "collector":
        return "Heritage Collector";
      default:
        return "Member";
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-terracotta to-deep-indigo flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            {!showEditProfile ? (
              <>
                {/* Profile Header */}
                <div className="p-6 bg-gradient-to-r from-warm-beige to-sage-green">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg">
                      {user.avatar ? (
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-terracotta to-deep-indigo flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-deep-indigo text-lg">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getRoleColor(
                          user.role
                        )} mt-2`}
                      >
                        {getRoleTitle(user.role)}
                      </div>
                    </div>
                  </div>

                  {user.bio && (
                    <p className="text-sm text-gray-700 mt-3 bg-white/50 rounded-lg p-3">
                      {user.bio}
                    </p>
                  )}

                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-600">
                    {user.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Joined {new Date(user.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200"
                  >
                    <Edit className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Edit Profile</span>
                  </button>

                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200">
                    <Heart className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">My Favorites</span>
                  </button>

                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200">
                    <ShoppingBag className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">My Orders</span>
                  </button>

                  {user.role === "storyteller" && (
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200">
                      <BookOpen className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">My Stories</span>
                    </button>
                  )}

                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Settings</span>
                  </button>

                  <div className="border-t border-gray-100 my-2" />

                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors duration-200 text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              /* Edit Profile Form */
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-deep-indigo">
                    Edit Profile
                  </h3>
                  <button
                    onClick={() => setShowEditProfile(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) =>
                        setEditForm({ ...editForm, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) =>
                        setEditForm({ ...editForm, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>

                  {user.role === "artisan" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialties
                      </label>
                      <input
                        type="text"
                        value={editForm.specialties}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            specialties: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                        placeholder="Pottery, Weaving, Painting..."
                      />
                    </div>
                  )}
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-terracotta hover:bg-terracotta/90"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setShowEditProfile(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
