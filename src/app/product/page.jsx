"use client";

import { useState, useMemo } from "react";
import { Grid, List } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetProductsQuery,
  useGetOneProductQuery,
} from "@/lib/slices/userApi";

const brands = [
  { name: "Nike", count: 48 },
  { name: "Adidas", count: 23 },
  { name: "Vans", count: 15 },
  { name: "All Stars", count: 1 },
  { name: "Adidas", count: 95 },
];

const colors = ["blue", "red", "black", "yellow", "pink"];

const PRODUCTS_PER_PAGE = 9;

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([3.99, 25.99]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetProductsQuery();

  const products = data || [];

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  if (isLoading) {
    return <div className="py-12 text-center">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        Error loading products: {error.message}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="py-12 text-center">No products found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="space-y-6">
            {/* Hot Deals */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Hot Deals</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-600">{brand.name}</span>
                    <span className="text-xs text-gray-400">{brand.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4">PRICES</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[3.99, 25.99]}
                  max={100}
                  step={0.01}
                  className="mt-2"
                  onValueChange={setPriceRange}
                />
                <div className="mt-2 text-sm text-gray-600">
                  Range: ${priceRange[0]} - ${priceRange[1]}
                </div>
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="text-lg font-semibold mb-4">COLOR</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full ${
                      selectedColor === color
                        ? "ring-2 ring-blue-500 ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">BRAND</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-600">{brand.name}</span>
                    <span className="text-xs text-gray-400">{brand.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-[#33A0FF] text-white rounded-lg p-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">Adidas Men Running</h1>
                <h2 className="text-2xl">Sneakers</h2>
                <p className="text-sm">
                  Performance and design. Taken right to the edge.
                </p>
                <Button
                  variant="outline"
                  className="bg-[#33A0FF] border-2 text-white border-white hover:text-[#33A0FF] hover:bg-white"
                >
                  SHOP NOW
                </Button>
              </div>
              <img
                src="/krasovka.png"
                alt="Adidas Sneaker"
                width={300}
                height={200}
                className="hidden sm:block object-contain"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {products.length} items
              </span>
              <Select defaultValue="name">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid" ? "text-blue-500" : "text-gray-500"
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list" ? "text-blue-500" : "text-gray-500"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {paginatedProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div
                  className={`bg-white rounded-lg overflow-hidden shadow-sm ${
                    viewMode === "list" ? "flex items-center space-x-4" : ""
                  }`}
                >
                  <div className="relative">
                    {product.hot && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        HOT
                      </span>
                    )}
                    <img
                      src={`http://localhost:3000${product.product_image}`}
                      alt={product.product_name || product.name || "Product"}
                      width={viewMode === "list" ? 150 : 300}
                      height={viewMode === "list" ? 150 : 300}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">
                      {product.product_name || product.name || "Product Name"}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-500 font-bold">
                        ${product.currentPrice || product.price || "0.00"}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="text-red-500 text-sm">
                          {product.discount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className={
                      currentPage === page ? "bg-blue-500 text-white" : ""
                    }
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
