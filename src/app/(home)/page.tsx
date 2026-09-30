import { BlogSection } from "./_components/BlogSection";
import { CallToAction } from "./_components/CallToAction";
import { DepartureBoard } from "./_components/DepartureBoard";
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
      <DepartureBoard />
      <TopService />
      <UpcomingService />
      <Testimonial />
      <Overview />
      <CallToAction />
      <Events />
      <BlogSection />
      <LatestNews />
    </>
  );
};

export default Homepage;
