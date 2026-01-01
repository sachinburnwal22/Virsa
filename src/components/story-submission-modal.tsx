"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  X,
  Upload,
  User,
  Mail,
  Briefcase,
  BookOpen,
  Camera,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface StorySubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StorySubmissionModal({
  isOpen,
  onClose,
}: StorySubmissionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
    story: "",
    image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        image: "Please upload a valid image file",
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.profession.trim())
      newErrors.profession = "Profession is required";
    if (!formData.story.trim()) newErrors.story = "Story is required";
    else if (formData.story.length < 50)
      newErrors.story = "Story should be at least 50 characters long";
    if (!formData.image) newErrors.image = "Please upload an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        profession: "",
        story: "",
        image: null,
      });
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: "",
        email: "",
        profession: "",
        story: "",
        image: null,
      });
      setErrors({});
      setIsSubmitted(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-deep-indigo to-terracotta text-white p-8 rounded-t-2xl">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <BookOpen className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Share Your Story
                </h2>
                <p className="text-lg opacity-90">
                  Tell us about your craft, your journey, and your passion
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-deep-indigo mb-4">
                    Story Submitted Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for sharing your story with us. Our team will
                    review it and get back to you soon.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-terracotta rounded-full animate-pulse"></div>
                    <span>Closing automatically...</span>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Craft/Profession *
                    </label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors ${
                        errors.profession ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g., Silk Weaver, Potter, Wood Carver"
                    />
                    {errors.profession && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.profession}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Camera className="w-4 h-4 inline mr-2" />
                      Upload Your Work Image *
                    </label>
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive
                          ? "border-terracotta bg-terracotta/5"
                          : errors.image
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-terracotta hover:bg-terracotta/5"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          handleImageUpload(e.target.files[0])
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />

                      {formData.image ? (
                        <div className="space-y-2">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          </div>
                          <p className="text-green-600 font-medium">
                            {formData.image.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Click or drag to replace
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <Upload className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-600">
                            <span className="font-medium">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.image}
                      </p>
                    )}
                  </div>

                  {/* Story */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <BookOpen className="w-4 h-4 inline mr-2" />
                      Your Story *{" "}
                      <span className="text-sm text-gray-500">
                        (minimum 50 characters)
                      </span>
                    </label>
                    <textarea
                      name="story"
                      value={formData.story}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors resize-none ${
                        errors.story ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tell us about your journey, your craft, what inspires you, and what makes your work unique. Share the story behind your art..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.story ? (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.story}
                        </p>
                      ) : (
                        <div></div>
                      )}
                      <p className="text-sm text-gray-500">
                        {formData.story.length} characters
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-terracotta hover:bg-terracotta/90 px-8 py-3 min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-4 h-4 mr-2" />
                          Submit Story
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
