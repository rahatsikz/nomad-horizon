import { dummyReview } from '@/constant/global';
import { ArrivalPictogram } from './Pictograms';
import { FlapText } from './SplitFlap';

/** Testimonials as an "Arrivals" board: origin city, traveller, quote, landed status. */
export function Testimonial() {
  return (
    <section className="nh-container pt-20 lg:pt-28">
      <div className="overflow-hidden rounded-xl bg-board text-flapInk ring-1 ring-black/40">
        <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-sign text-onSign">
              <ArrivalPictogram className="size-7" />
            </span>
            <div>
              <p className="font-sign text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Arrivals</p>
              <h2 className="font-sign text-3xl font-extrabold leading-none text-sign sm:text-4xl">
                Trusted by Nomads Worldwide
              </h2>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/75 md:text-right">
            See what our community has to say about their experience with Nomad Horizon&apos;s services
          </p>
        </header>

        <ul className="divide-y divide-white/10 px-4 sm:px-6">
          {dummyReview.map((review) => {
            const [city] = review.city.split(',');
            return (
              <li key={review.id} className="grid gap-4 py-6 lg:grid-cols-[16rem_1fr_10rem] lg:gap-8">
                <figure className="contents">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <FlapText text={city.slice(0, 3)} width={3} tick={null} className="text-2xl text-sign" />
                    <div>
                      <p className="font-sign text-xs font-semibold uppercase tracking-[0.14em] text-white/70">From</p>
                      <p className="font-sign text-xl font-bold uppercase leading-tight">{review.city}</p>
                    </div>
                  </div>
                  <blockquote className="text-lg leading-relaxed text-white/90">
                    <p>&ldquo;{review.review}&rdquo;</p>
                  </blockquote>
                  <figcaption className="flex items-center justify-between gap-3 lg:flex-col lg:items-end lg:justify-start">
                    <span className="font-sign text-xl font-bold uppercase">{review.name}</span>
                    <span className="inline-flex items-center gap-2 font-board text-sm uppercase text-go">
                      <span aria-hidden="true" className="size-2 rounded-full bg-go" />
                      Landed
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
