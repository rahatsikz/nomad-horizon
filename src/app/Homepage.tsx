import { Events } from "@/components/Homepage/Events";
import { HeroSection } from "@/components/Homepage/HeroSection";
import { LatestNews } from "@/components/Homepage/LatestNews";
import { Overview } from "@/components/Homepage/Overview";
import { TopService, UpcomingService } from "@/components/Homepage/Services";
import { Testimonial } from "@/components/Homepage/Testimonial";
import { Navbar } from "@/components/ui/Navbar";
import React from "react";

const Homepage = () => {
  return (
    <div className='bg-mainBg'>
      <Navbar />
      <HeroSection />
      <TopService />
      <UpcomingService />
      <Testimonial />
      <Overview />
      <Events />
      <LatestNews />
      <h1>Homepage</h1>
    </div>
  );
};

export default Homepage;
