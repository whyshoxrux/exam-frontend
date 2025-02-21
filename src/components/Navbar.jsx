"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Home,
  ShoppingBag,
  Contact,
  LogOut,
  LogIn
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth, logout } from "@/lib/slices/authlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(logout());

    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white px-32">
        {/* Top Bar */}
        <div className="border-b">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Select defaultValue="en">
                <SelectTrigger className="w-[70px] border-none shadow-none">
                  <SelectValue placeholder="EN" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="ru">RU</SelectItem>
                    <SelectItem value="uz">UZ</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue="usd">
                <SelectTrigger className="w-[70px] border-none shadow-none">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icon.svg"
                alt="E-Comm Logo"
                width={134}
                height={44}
                className="rounded-full"
              />
            </Link>
            <div className="flex md:hidden items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-4 gap-7">
              <div className="flex gap-5">
                <Link
                  href="/contact"
                  className="flex items-center space-x-1 text-sm font-medium hover:underline"
                >
                  <span>Contact us</span>
                </Link>

                {isAuthenticated ? (
                  <div className="flex items-center space-x-5">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-1 text-sm font-medium hover:underline"
                    >
                      <User className="h-5 w-5" />
                      <span>My Profile</span>
                    </Link>

                    <button
                      onClick={handleLogOut}
                      className="flex items-center space-x-1 text-sm font-medium hover:underline"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center space-x-1 text-sm font-medium hover:underline"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative ">
                  <Link href="/cart" className="flex gap-2">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    3
                  </span>
                </div>
              </div>
              <button className="text-gray-600 hover:text-gray-900">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="container mx-auto px-4 py-6">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col items-center gap-6 pt-10">
              <Link
                href="/"
                className="text-blue-500 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/bags"
                className="text-gray-600 hover:text-blue-500 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                BAGS
              </Link>
              <Link
                href="/sneakers"
                className="text-gray-600 hover:text-blue-500 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                SNEAKERS
              </Link>
              <Link
                href="/belt"
                className="text-gray-600 hover:text-blue-500 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                BELT
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-500 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
            </nav>
            <div className="flex flex-col items-center gap-6 mt-10">
              <div className="flex items-center space-x-2 text-gray-600">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-lg">Cart (3 items)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
        <ul className="flex justify-around items-center h-16">
          <li>
            <Link
              href="/"
              className="flex flex-col items-center text-gray-600 hover:text-blue-500"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/bags"
              className="flex flex-col items-center text-gray-600 hover:text-blue-500"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="text-xs mt-1">Bags</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="flex flex-col items-center text-gray-600 hover:text-blue-500"
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex flex-col items-center text-gray-600 hover:text-blue-500"
            >
              <Contact className="h-6 w-6" />
              <span className="text-xs mt-1">Contact</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
