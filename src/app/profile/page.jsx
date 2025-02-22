"use client";

import React from "react";
import { ArrowLeft, ChevronRight, Camera } from "lucide-react";
import Link from "next/link";
import { useGetUserQuery, useUpdateUserMutation } from "@/lib/slices/userApi";
import { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@/config";

export default function ProfilePage() {
  const { data: user, isLoading: isUserLoading, refetch } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
    profile_image: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({ ...prevData, ...user }));
      console.log("User data loaded:", user);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    // Ensure we have a user ID
    if (!user?.id) {
      setError("User ID not available. Please try again.");
      return;
    }

    try {
      setError(null);
      const formDataToSend = new FormData();
      formDataToSend.append("profile_image", file);

      // Pass both ID and FormData to the mutation
      const result = await updateUser({
        id: user.id,
        formData: formDataToSend,
      }).unwrap();
      console.log("Upload result:", result);

      // Update local state with new image URL
      const newImageUrl = result.profile_image.startsWith("/")
        ? result.profile_image
        : `/${result.profile_image}`;
      setFormData((prev) => ({
        ...prev,
        profile_image: newImageUrl,
      }));

      // Refetch user data to ensure consistency
      await refetch();
    } catch (err) {
      console.error("Upload error details:");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Link href="/" className="rounded-lg p-2 hover:bg-gray-100 md:hidden">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Content */}
        <div className="col-span-2 space-y-6 lg:col-span-3">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-black bg-pink-100">
                <img
                  className="w-full h-full object-cover"
                  src={`${API_BASE_URL}${formData.profile_image}`}
                  alt="Profile"
                  onError={(e) => {
                    e.currentTarget.src = "/default_profile.png";
                    console.log("Image load failed, using fallback");
                  }}
                />
              </div>
              <button
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 p-1.5 bg-red-500 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                disabled={isUpdating || isUserLoading}
                aria-label="Update profile picture"
              >
                <Camera className="h-4 w-4 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/gif"
                onChange={handleImageUpload}
                disabled={isUpdating || isUserLoading}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold">{formData.first_name}</h2>
              <p className="text-gray-500">{formData.email}</p>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              {isUpdating && (
                <p className="text-sm text-blue-500 mt-1">
                  Updating profile picture...
                </p>
              )}
            </div>
          </div>

          {/* Profile Details - Unchanged */}
          <div className="space-y-1 rounded-lg border">
            <Link
              href="/profile/gender"
              className="flex items-center justify-between border-b p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Gender</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>Male</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            <Link
              href="/profile/birthday"
              className="flex items-center justify-between border-b p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Birthday</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>12-12-2000</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            <Link
              href="/profile/email"
              className="flex items-center justify-between border-b p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Email</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>{formData.email}</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            <Link
              href="/profile/phone"
              className="flex items-center justify-between border-b p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Phone Number</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>(307) 555-0133</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>

            <Link
              href="/profile/password"
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Change Password</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>••••••••••••</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
