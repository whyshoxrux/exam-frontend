"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Minus, Plus, Heart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOneProductQuery } from "@/lib/slices/userApi";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetOneProductQuery(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("blue");

  const colors = [
    { name: "blue", value: "#33A0FF" },
    { name: "red", value: "#FF3333" },
    { name: "black", value: "#000000" },
    { name: "yellow", value: "#FFD333" },
  ];

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  if (isLoading) {
    return <div className="py-12 text-center">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="py-12 text-center">Error loading product details</div>
    );
  }

  if (!product) {
    return <div className="py-12 text-center">Product not found</div>;
  }

  const images = product.product_image
    ? [product.product_image]
    : ["/placeholder.svg"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <img
              src={`http://localhost:3000${images[selectedImage]}`}
              alt={product.product_name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square relative rounded-lg overflow-hidden border ${
                  selectedImage === index ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={`http://localhost:3000${image}`}
                  alt={`${product.product_name} ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.product_name}</h1>
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < (product.rating || 0)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">
                ({product.reviews_count || 0} reviews)
              </span>
              <button className="text-blue-500 text-sm hover:underline">
                Submit a review
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-blue-500">
                ${product.price}
              </span>
              {product.original_price && (
                <span className="text-gray-500 line-through">
                  ${product.original_price}
                </span>
              )}
              {product.discount && (
                <span className="text-red-500">{product.discount}% Off</span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Availability:</span>
                <span className="text-green-500">
                  {product.in_stock ? "In stock" : "Out of stock"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span>{product.category?.category_name || "N/A"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Free shipping:</span>
                <span>{product.free_shipping ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Color:
              </label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color.name
                        ? "ring-2 ring-blue-500 ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size:</label>
              <Select defaultValue="xs">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  className="p-2 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="p-2 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Add To Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1 bg-[#3B5998] text-white border-[#3B5998] hover:bg-[#3B5998]/90"
              >
                Share on Facebook
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-[#1DA1F2] text-white border-[#1DA1F2] hover:bg-[#1DA1F2]/90"
              >
                Share on Twitter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">Product Information</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviews?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="another">Another tab</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="border-b py-2">
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </TabsContent>

          <TabsContent value="another">
            <p>Additional information here.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Best Seller Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">BEST SELLER</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div className="group">
            <div className="aspect-square relative rounded-lg overflow-hidden mb-2">
              <img
                src={images[0] || "/placeholder.svg"}
                alt="Best Seller Product"
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <div className="mt-1">
              <span className="text-red-500">$499</span>
              <span className="text-gray-500 line-through ml-2">$599</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
