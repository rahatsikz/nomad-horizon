import { HeroSection } from "@/components/Homepage/HeroSection";
import { TopService, UpcomingService } from "@/components/Homepage/Services";
import { Navbar } from "@/components/ui/Navbar";
import React from "react";

const Homepage = () => {
  return (
    <div className='bg-mainBg'>
      <Navbar />
      <HeroSection />
      <TopService />
      <UpcomingService />
      <h1>Homepage</h1>
    </div>
  );
};

export default Homepage;
