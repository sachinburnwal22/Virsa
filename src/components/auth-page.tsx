"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Palette,
  ShoppingBag,
  BookOpen,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, type UserRole } from "../contexts/auth-context";

const roleOptions = [
  {
    id: "buyer" as UserRole,
    title: "Art Enthusiast",
    description: "Discover and collect beautiful handcrafted pieces",
    icon: ShoppingBag,
    color: "from-blue-500 to-purple-600",
    features: [
      "Browse curated collections",
      "Save favorites",
      "Secure purchasing",
      "Track orders",
    ],
  },
  {
    id: "artisan" as UserRole,
    title: "Master Artisan",
    description: "Share your craft and connect with art lovers",
    icon: Palette,
    color: "from-orange-500 to-red-600",
    features: [
      "Showcase your work",
      "Tell your story",
      "Sell directly",
      "Build your brand",
    ],
  },
  {
    id: "storyteller" as UserRole,
    title: "Story Curator",
    description: "Document and preserve cultural heritage",
    icon: BookOpen,
    color: "from-green-500 to-teal-600",
    features: [
      "Share cultural stories",
      "Document traditions",
      "Connect communities",
      "Preserve heritage",
    ],
  },
  {
    id: "collector" as UserRole,
    title: "Heritage Collector",
    description: "Curate and preserve traditional art forms",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
    features: [
      "Build collections",
      "Support artisans",
      "Cultural preservation",
      "Expert insights",
    ],
  },
];

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password, selectedRole);
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        await signup(
          formData.name,
          formData.email,
          formData.password,
          selectedRole
        );
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-beige via-white to-sage-green flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-terracotta to-deep-indigo rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">V</span>
            </div>
          </div>
          <h1 className="text-4xl font-serif font-bold text-deep-indigo mb-2">
            Welcome to Virasa
          </h1>
          <p className="text-gray-600 text-lg">
            Where every craft tells a story, and every story finds its home
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold text-deep-indigo mb-2">
                Choose Your Journey
              </h2>
              <p className="text-gray-600">
                Select how you'd like to experience Virasa
              </p>
            </div>

            <div className="grid gap-4">
              {roleOptions.map((role, index) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedRole === role.id
                        ? "border-terracotta bg-terracotta/5 shadow-lg"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-deep-indigo mb-1">
                          {role.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {role.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {role.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-xs text-gray-500"
                            >
                              <div className="w-1.5 h-1.5 bg-terracotta rounded-full mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {selectedRole === role.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-terracotta rounded-full flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="flex justify-center space-x-1 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isLogin
                      ? "bg-deep-indigo text-white"
                      : "text-gray-600 hover:text-deep-indigo"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    !isLogin
                      ? "bg-deep-indigo text-white"
                      : "text-gray-600 hover:text-deep-indigo"
                  }`}
                >
                  Sign Up
                </button>
              </div>
              <h3 className="text-xl font-semibold text-deep-indigo">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {isLogin
                  ? "Sign in to continue your journey"
                  : "Join our community of creators"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all duration-300"
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all duration-300"
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={!selectedRole || isLoading}
                className="w-full py-3 bg-gradient-to-r from-terracotta to-deep-indigo text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {selectedRole && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-r ${
                      roleOptions.find((r) => r.id === selectedRole)?.color
                    } flex items-center justify-center`}
                  >
                    {(() => {
                      const role = roleOptions.find(
                        (r) => r.id === selectedRole
                      );
                      const Icon = role?.icon;
                      return Icon ? (
                        <Icon className="w-4 h-4 text-white" />
                      ) : null;
                    })()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-indigo">
                      Joining as{" "}
                      {roleOptions.find((r) => r.id === selectedRole)?.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      You can change this later in your profile
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
