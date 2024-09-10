import { HeroSection } from "@/components/Homepage/HeroSection";
import { Navbar } from "@/components/ui/Navbar";
import React from "react";

const Homepage = () => {
  return (
    <div className='bg-mainBg text-secondary h-screen'>
      <Navbar />
      <HeroSection />
      <h1>Homepage</h1>
    </div>
  );
};

export default Homepage;
