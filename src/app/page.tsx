import { BlogSection } from "@/components/Homepage/BlogSection";
import { CallToAction } from "@/components/Homepage/CallToAction";
import { Events } from "@/components/Homepage/Events";
import { HeroSection } from "@/components/Homepage/HeroSection";
import { LatestNews } from "@/components/Homepage/LatestNews";
import { Overview } from "@/components/Homepage/Overview";
import { TopService, UpcomingService } from "@/components/Homepage/Services";
import { Testimonial } from "@/components/Homepage/Testimonial";

const Homepage = () => {
  return (
    <div className='bg-mainBg'>
      <HeroSection />
      <div className='container mx-auto px-4 2xl:px-0 space-y-16 mt-16 pb-16'>
        <TopService />
        <UpcomingService />
        <Testimonial />
        <Overview />
        <CallToAction />
        <Events />
        <BlogSection />
        <LatestNews />
      </div>
    </div>
  );
};

export default Homepage;
