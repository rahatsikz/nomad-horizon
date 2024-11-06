import { BlogSection } from "./_components/BlogSection";
import { CallToAction } from "./_components/CallToAction";
import { Events } from "./_components/Events";
import { HeroSection } from "./_components/HeroSection";
import { LatestNews } from "./_components/LatestNews";
import { Overview } from "./_components/Overview";
import { TopService, UpcomingService } from "./_components/Services";
import { Testimonial } from "./_components/Testimonial";

const Homepage = () => {
  return (
    <>
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
    </>
  );
};

export default Homepage;
