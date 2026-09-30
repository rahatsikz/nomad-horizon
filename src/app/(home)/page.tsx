import { BlogSection } from "./_components/BlogSection";
import { CallToAction } from "./_components/CallToAction";
import { Events } from "./_components/Events";
import { HeroSection } from "./_components/HeroSection";
import { LatestNews } from "./_components/LatestNews";
import { Overview } from "./_components/Overview";
import { TopService, UpcomingService } from "./_components/Services";
import { Testimonial } from "./_components/Testimonial";
import { FlightPath } from "./_components/Topo";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <FlightPath className="mt-8" />
      <TopService />
      <UpcomingService />
      <FlightPath flip className="mt-16" />
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
