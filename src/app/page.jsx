"use client";
import React from "react";
import Hero from "../components/Hero";
import BestSeller from "../components/BestSeller";
import Adidas from "../components/Adidas";
import { ServicesSection } from "../components/ServiceSection";
import { LatestNews } from "../components/Latest.News";
import { SearchBar } from "../components/SearchBar";
import { FeaturedProducts } from "../components/FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <BestSeller />
      <Adidas />
      <ServicesSection />
      <LatestNews />
      <FeaturedProducts />
      <SearchBar />
    </div>
  );
};

export default HomePage;
