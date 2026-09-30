import { dummyReview } from '@/constant/global';
import { SectionHead } from './SectionHead';

export function Testimonial() {
  return (
    <section className="nh-container pt-16 lg:pt-24">
      <div className="border border-ink">
        <SectionHead
          index="04"
          title="Trusted by Nomads Worldwide"
          note="See what our community has to say about their experience with Nomad Horizon's services"
        />
        <div className="grid md:grid-cols-3">
          {dummyReview.map((review, idx) => (
            <figure
              key={review.id}
              className="flex flex-col justify-between gap-10 border-b border-ink p-5 last:border-b-0 sm:p-6 md:border-b-0 md:border-r md:last:border-r-0 lg:p-8"
            >
              <div>
                <p className="flex items-start justify-between text-sm font-bold">
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <span aria-hidden="true" className="nh-wide text-6xl font-black leading-[0.6]">
                    &ldquo;
                  </span>
                </p>
                <blockquote className="mt-6 text-lg leading-snug lg:text-xl">
                  <p>{review.review}</p>
                </blockquote>
              </div>
              <figcaption className="grid grid-cols-2 border-t border-ink pt-3 text-xs font-bold uppercase tracking-[0.12em]">
                <span>{review.name}</span>
                <cite className="text-right not-italic text-inkMuted">{review.city}</cite>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
