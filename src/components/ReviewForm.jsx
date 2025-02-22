"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAddReviewMutation } from "@/lib/service/userApi";

export default function ReviewForm({ productId, refetch }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    try {
      await addReview({ product_id: productId, rating, comment }).unwrap();
      setRating(0);
      setComment("");
      alert("Review submitted successfully!");
      refetch();
    } catch (error) {
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Write a Review</h3>
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating:</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          Your Review:
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
        />
      </div>
      <Button
        type="submit"
        className="bg-[#40BFFF] hover:bg-[#40BFFF]/90"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
