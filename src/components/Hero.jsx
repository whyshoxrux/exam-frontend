"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden pb-16 md:pb-32">
      {/* Background Image Container */}
      <div className="relative w-full h-[300px] md:h-[500px]">
        <Image
          src="/jordan.jpg"
          alt="Featured Sneakers"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container - Centered with consistent max-width */}
      <div className="absolute inset-0 flex flex-col justify-center items-start w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Desktop Content */}
        <div className="hidden md:block tracking-[0.4rem]">
          <h1 className="text-4xl lg:text-[2.5rem] font-extrabold text-white">
            Super Flash Sale <br />
            50% Off
          </h1>

          
        </div>

        {/* Mobile/Tablet Content */}
        <div className="md:hidden space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-[0.2em]">
            Super Flash Sale <br />
            50% Off
          </h1>

        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        <button
          className="w-2 h-2 rounded-full bg-white/50"
          aria-label="Go to slide 1"
        />
        <button
          className="w-2 h-2 rounded-full bg-white/50"
          aria-label="Go to slide 2"
        />
        <button
          className="w-2 h-2 rounded-full bg-white"
          aria-label="Go to slide 3"
        />
        <button
          className="w-2 h-2 rounded-full bg-white/50"
          aria-label="Go to slide 4"
        />
        <button
          className="w-2 h-2 rounded-full bg-white/50"
          aria-label="Go to slide 5"
        />
      </div>
    </div>
  );
};

export default Hero;
