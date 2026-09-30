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
      {/* film-opening curtain, home page only */}
      <div aria-hidden="true" className="nh-curtain" />
      <HeroSection />
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
