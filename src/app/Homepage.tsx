import { BlogSection } from "@/components/Homepage/BlogSection";
import { Events } from "@/components/Homepage/Events";
import { HeroSection } from "@/components/Homepage/HeroSection";
import { LatestNews } from "@/components/Homepage/LatestNews";
import { Overview } from "@/components/Homepage/Overview";
import { TopService, UpcomingService } from "@/components/Homepage/Services";
import { Testimonial } from "@/components/Homepage/Testimonial";

import React from "react";

const Homepage = () => {
  return (
    <div className='bg-mainBg'>
      <HeroSection />
      <TopService />
      <UpcomingService />
      <Testimonial />
      <Overview />
      <Events />
      <BlogSection />
      <LatestNews />
    </div>
  );
};

export default Homepage;
