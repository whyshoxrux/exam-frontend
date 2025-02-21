"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

// Slide data
const slides = [
  {
    id: 1,
    image: "/jordan.jpg",
    title: "Super Flash Sale",
    subtitle: "50% Off",
  },
  {
    id: 2,
    image: "/yellow-sneakers.jpg",
    title: "New Collection",
    subtitle: "Spring 2024",
  },
  {
    id: 3,
    image: "/malvestida-DMl5gG0yWWY-unsplash.jpg",
    title: "Limited Edition",
    subtitle: "Shop Now",
  },
  {
    id: 4,
    image: "/paul-volkmer-updW-QUccFE-unsplash.jpg",
    title: "Exclusive Deals",
    subtitle: "Up to 70% Off",
  },
  {
    id: 5,
    image: "/fachry-zella-devandra-bNSdIkCBJOs-unsplash.jpg",
    title: "New Arrivals",
    subtitle: "Check it Out",
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 7000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="relative w-full overflow-hidden pb-16 md:pb-32">
      {/* Slides Container */}
      <div className="relative w-full h-[300px] md:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Desktop Content */}
        <div className="hidden md:block tracking-[0.4rem]">
          <h1 className="text-4xl lg:text-[2.5rem] font-extrabold text-white">
            {slides[currentSlide].title} <br />
            {slides[currentSlide].subtitle}
          </h1>
        </div>

        {/* Mobile/Tablet Content */}
        <div className="md:hidden space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-[0.2em]">
            {slides[currentSlide].title} <br />
            {slides[currentSlide].subtitle}
          </h1>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero

