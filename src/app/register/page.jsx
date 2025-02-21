"use client";

import { Mail, Lock, Facebook, Google, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRegisterUserMutation } from "@/lib/service/api";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/slices/authlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData).unwrap();

      dispatch(setUser(response));

      router.push("/login");
    } catch (error) {
      console.log("Register error:", error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center">
          <div className="mb-6 rounded-xl bg-blue-500 p-3">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Let's Get Started
          </h2>
          <p className="mt-2 text-sm text-gray-600 opacity-[60%]">
            Create a new account
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            <div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Second name"
                  name="second_name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Password again"
                  name="password_confirm"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex flex-col items-center space-y-4 text-sm">
          <p className="text-gray-600">
            Have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
