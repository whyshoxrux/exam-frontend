"use client";

import { useState, useMemo } from "react";
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
import { useGetCategoryQuery } from "@/lib/service/category.api";

const PRODUCTS_PER_PAGE = 8;

export default function BestSellerPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE);

  const { data: productsData, isLoading, error } = useGetProductsQuery();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoryQuery();

  const categories = useMemo(() => {
    if (!categoriesData) return ["All"];
    return ["All", ...categoriesData.map((cat) => cat.category_name)];
  }, [categoriesData]);

  const products = useMemo(() => {
    if (!productsData) return [];
    return productsData.map((product, index) => ({
      ...product,
      hot: index < 8,
    }));
  }, [productsData]);

  const categoryFiltered = useMemo(() => {
    if (!products) return [];
    return selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category?.category_name === selectedCategory
        );
  }, [selectedCategory, products]);

  const filteredProducts = useMemo(() => {
    return categoryFiltered.filter((product) => product.hot);
  }, [categoryFiltered]);

  if (isLoading || categoriesLoading)
    return <div className="py-12 text-center">Loading...</div>;

  if (error || categoriesError)
    return (
      <div className="py-12 text-center">
        Error loading data: {error?.message || categoriesError?.message}
      </div>
    );

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-2xl font-bold mb-8">BEST SELLER</h2>

      {/* Categories Section */}
      <div className="w-full max-w-4xl mx-auto">
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
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4"
                // O'lchamni auto qilamiz
                style={{ width: "auto", flex: "0 0 auto" }}
              >
                <div className="p-1">
                  <Button
                    variant="outline"
                    className={`h-12 whitespace-nowrap px-6 font-semibold transition-all hover:bg-blue-500 hover:text-white ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : ""
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
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="block"
          >
            <Card
              className="relative border-none shadow-none group bg-white"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <span className="absolute top-0 left-0 bg-[#FF4858] text-white text-xs px-3 py-1 rounded-br z-10">
                HOT
              </span>
              <div className="relative h-64 bg-[#F6F7F8] rounded-lg mb-4">
                <img
                  src={`http://localhost:3000${product.product_image}`}
                  alt={product.product_name || "Product"}
                  className="w-full h-full object-contain p-4"
                />
                {hoveredProduct === product.id && (
                  <div className="absolute right-2 top-2 flex flex-col gap-2">
                    <Link href="/cart">
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                        <ShoppingCart className="w-5 h-5 text-blue-500" />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <CardContent className="text-center p-0">
                <h3 className="text-[#223263] font-bold mb-2 hover:text-blue-500 transition-colors truncate px-2">
                  {product.product_name || "Product Name"}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#40BFFF] font-bold text-base">
                    ${product.price || "0.00"}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[#9098B1] text-sm line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-[#FB7181] text-sm">
                      {product.discount}% Off
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
