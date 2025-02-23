"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Minus, Plus, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOneProductQuery } from "@/lib/service/userApi";
import ReviewForm from "@/components/ReviewForm";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, refetch, isLoading, error } = useGetOneProductQuery(id);

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
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-[#40BFFF] rounded-full animate-pulse animation-delay-0"></div>
          <div className="w-3 h-3 bg-[#40BFFF] rounded-full animate-pulse animation-delay-200"></div>
          <div className="w-3 h-3 bg-[#40BFFF] rounded-full animate-pulse animation-delay-400"></div>
        </div>
        <span className="ml-4 text-gray-600">Loading product...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500">
        Error loading product: {error.message || "Unknown error"}
      </div>
    );
  }

  if (!product) {
    return <div className="py-12 text-center">Product not found</div>;
  }

  const images = product.product_image ? [product.product_image] : ["/placeholder.svg"];

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
              onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square relative rounded-lg overflow-hidden border ${
                  selectedImage === index ? "ring-2 ring-[#40BFFF]" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={`http://localhost:3000${image}`}
                  alt={`${product.product_name} ${index + 1}`}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
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
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= (product.average_rating || 0)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-[#40BFFF]">${product.price}</span>
              {product.original_price && (
                <span className="text-gray-500 line-through">${product.original_price}</span>
              )}
              {product.discount && (
                <span className="text-red-500">{product.discount}% Off</span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Availability:</span>
                <span className={product.in_stock ? "text-green-500" : "text-red-500"}>
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
              <label className="block text-sm font-medium mb-2">Select Color:</label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color.name ? "ring-2 ring-[#40BFFF] ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
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
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4">{quantity}</span>
                <button className="p-2 hover:bg-gray-100" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button className="bg-[#40BFFF] hover:bg-[#40BFFF]/90" disabled={!product.in_stock}>
                Add To Cart
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
            <TabsTrigger value="reviews">Reviews ({product.reviews?.length || 0})</TabsTrigger>
            <TabsTrigger value="another">Another Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description || "No description available"}</p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <div key={review.id} className="border-b py-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium">
                        {review.user?.first_name} {review.user?.second_name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
              <ReviewForm refetch={refetch} productId={product.id} />
            </div>
          </TabsContent>

          <TabsContent value="another" className="mt-6">
            <p className="text-gray-600">Additional information here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}