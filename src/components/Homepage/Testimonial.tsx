import { dummyReview } from "@/constant/global";
import { InfiniteSlider } from "../ui/Slider";
import { TestimonialCard } from "../ui/Cards";
import { HeaderText } from "../ui/Headers";

export function Testimonial() {
  const testimonialCards = dummyReview
    .concat(dummyReview)
    .map((item, idx) => <TestimonialCard key={idx} data={item} />);

  return (
    <div className='container mx-auto my-16'>
      <HeaderText
        title='Trusted by Nomads Worldwide'
        subtitle="See what our community has to say about their experience with Nomad Horizon's services"
      />
      <InfiniteSlider cardArr={testimonialCards} />
    </div>
  );
}