"use client";
import { Mail, Lock, Facebook, Google } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLoginUserMutation } from "@/lib/service/api";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setUser } from "@/lib/slices/authlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let { status, ...response } = await loginUser(formData).unwrap();

      if (status == 200) {
        let { accessToken: token, user } = response;

        dispatch(setUser({ token, user }));

        return router.push("/");
      }
    } catch (error) {
      console.log("Login error", error);
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
          <h2 className="text-2xl font-bold text-gray-900">Welcome to E-com</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
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
                  onChange={handleChange}
                  name="email"
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
                  onChange={handleChange}
                  name="password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gray-50 px-4 text-gray-500">OR</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-4">
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Image src="globe.svg" alt="Google" width={20} height={20} />
            Login with Google
          </button>

          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Facebook className="text-blue-500" />
            Login with Facebook
          </button>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col items-center space-y-4 text-sm">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
