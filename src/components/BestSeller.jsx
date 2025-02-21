"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetProductsQuery } from "@/lib/slices/userApi";

const categories = ["All", "Bags", "Sneakers", "Belt", "Sunglasses"];
const PRODUCTS_PER_PAGE = 8;

export default function BestSellerPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE);
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading)
    return <div className="py-12 text-center">Loading products...</div>;

  if (error)
    return (
      <div className="py-12 text-center">
        Error loading products: {error.message}
      </div>
    );

  const products = data || [];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) =>
          product.category?.category_name === selectedCategory
        );

  const handleLoadMore = () => setVisibleProducts((prev) => prev + PRODUCTS_PER_PAGE);
  const handleLoadLess = () => setVisibleProducts((prev) => Math.max(PRODUCTS_PER_PAGE, prev - PRODUCTS_PER_PAGE));

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-2xl font-bold mb-8">BEST SELLER</h2>

      {/* Categories Section */}
      <div className="w-full max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Link
            href="/product"
            className="flex items-center space-x-1 text-sm font-medium text-blue-500 hover:underline"
          >
            <span>Show all</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4">
                <div className="p-1">
                  <Button
                    variant="outline"
                    className={`w-full py-6 font-semibold transition-all hover:bg-blue-500 hover:text-white ${
                      selectedCategory === category ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-background hover:bg-background border-primary text-primary" />
          <CarouselNext className="hidden md:flex -right-12 bg-background hover:bg-background border-primary text-primary" />
        </Carousel>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <Card
            key={product.id}
            className="relative border-none shadow-none group"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {product.hot && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                HOT
              </span>
            )}
            <div className="relative h-64 bg-gray-100 rounded-lg mb-4">
              <img
                src={`http://localhost:3000${product.product_image}`}
                alt={product.name || "Product"}
                className="object-contain p-4"
              />
              {hoveredProduct === product.id && (
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-blue-500" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-blue-500" />
                  </button>
                </div>
              )}
            </div>
            <CardContent className="text-center p-0">
              <h3 className="text-sm font-medium mb-2">
                {product.product_name || "Product Name"}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-blue-500 font-bold">
                  ${product.currentPrice || product.price || "0.00"}
                </span>
                <span className="text-gray-400 text-sm line-through">
                  ${product.originalPrice || "0.00"}
                </span>
                <span className="text-red-500 text-sm">
                  {product.discount || ""}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More & Load Less Buttons */}
      <div className="text-center mt-12">
        {visibleProducts < filteredProducts.length && (
          <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50" onClick={handleLoadMore}>
            LOAD MORE
          </Button>
        )}
        {visibleProducts > PRODUCTS_PER_PAGE && (
          <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-red-50 ml-4" onClick={handleLoadLess}>
            LOAD LESS
          </Button>
        )}
      </div>
    </div>
  );
}
