import Image from "next/image"

export default function AdidasHero() {
  return (
    <div className="relative w-full min-h-[500px] bg-[#55ACEE] px-4 sm:px-8 lg:px-32 mt-10">
      <div className="container mx-auto py-16">
        <div className="max-w-xl relative z-10 mb-12 lg:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Adidas Men Running Sneakers
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl mb-8">
            Performance and design. Taken right to the edge.
          </p>
          <button className="bg-transparent text-white border-2 border-white px-6 py-2 hover:bg-white hover:text-[#55ACEE] transition-colors duration-300 font-bold">
            SHOP NOW
          </button>
        </div>

        {/* Sneaker Image - Hidden on mobile and tablet, visible only on desktop */}
        <div className="hidden lg:block lg:absolute lg:top-1/2 lg:right-0 lg:transform lg:-translate-y-1/2 lg:w-[60%] xl:w-[795px] max-h-[598px] z-10">
          <div className="relative w-full" style={{ paddingBottom: "75%" }}>
            {" "}
            <Image
              src="/krasovka.png"
              alt="Adidas Running Sneaker"
              fill
              sizes="(max-width: 1024px) 100vw, 795px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

