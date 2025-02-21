"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useGetUserQuery } from "@/lib/slices/userApi";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config";

export default function ProfilePage() {
  const { data: user, isLoading } = useGetUserQuery();
  // const [updateUser] = useUpdateUserMutation();
  // const [updateProfilePicture] = useUpdateProfilePictureMutation();
  // const [isEditing, setIsEditing] = useState(false);

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
    setFormData({ ...formData, ...user });
  }, [user]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/"
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Content */}
        <div className="col-span-2 space-y-6 lg:col-span-3">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
             <img
              width={80}
              height={80}
              className="rounded-full bg-pink-100"
              src={API_BASE_URL + formData.profile_image}
              alt="Profile"
            />

            <div>
              <h2 className="text-xl font-semibold">{formData.first_name}</h2>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-1 rounded-lg border bg-white">
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
