import { dummyReview } from "@/constant/global";
import { InfiniteSlider } from "../../../components/ui/Slider";
import { TestimonialCard } from "../../../components/ui/Cards";
import { HeaderText } from "../../../components/ui/Headers";

export function Testimonial() {
  const testimonialCards = dummyReview
    .concat(dummyReview)
    .map((item, idx) => <TestimonialCard key={idx} data={item} />);

  return (
    <div>
      <HeaderText
        title='Trusted by Nomads Worldwide'
        subtitle="See what our community has to say about their experience with Nomad Horizon's services"
      />
      <InfiniteSlider cardArr={testimonialCards} />
    </div>
  );
}
