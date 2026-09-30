import Image from 'next/image';
import { LegHeader } from './LegHeader';

export function Overview() {
  return (
    <section className="nh-container pt-24 lg:pt-32">
      <LegHeader
        leg="04"
        label="Field notes"
        title="Overview"
        subtitle="Focus on your adventures and career without the worry of losing connectivity or facing tech issues"
      />

      <div className="relative mt-12 overflow-hidden rounded-[1.25rem] border-2 border-ink bg-surface">
        {/* notebook spine stitching */}
        <div aria-hidden="true" className="absolute inset-y-0 left-6 hidden border-l-2 border-dashed border-ink/25 lg:block" />

        <div className="nh-dot-grid grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:py-14 lg:pl-20 lg:pr-14">
          <figure className="relative mx-auto w-full max-w-lg rotate-[-2deg] lg:col-span-6">
            <span aria-hidden="true" className="absolute -left-4 -top-3 z-10 h-7 w-24 -rotate-12 bg-tag/90 ring-1 ring-ink/10" />
            <span aria-hidden="true" className="absolute -right-4 -top-3 z-10 h-7 w-24 rotate-12 bg-tag/90 ring-1 ring-ink/10" />
            <div className="border border-ink/15 bg-ground p-3 pb-12">
              <div className="group relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/17767273/pexels-photo-17767273/free-photo-of-man-sitting-with-laptop-on-wooden-bench-on-meadow-under-tree.jpeg"
                  alt="Remote worker using a laptop outdoors"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="absolute bottom-4 left-3 right-3 flex justify-between font-ticket text-[10px] uppercase tracking-[0.14em] text-inkMuted">
                <span>Work without borders</span>
                <span>Fig. 04</span>
              </figcaption>
            </div>
          </figure>

          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="font-ticket text-[10px] uppercase tracking-[0.16em] text-signalText sm:text-[11px]">
              The Nomad Horizon standard
            </p>
            <h3 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Your workday should travel as well as you do.
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-inkMuted sm:text-xl">
              We keep nomads and remote teams connected, productive, and ready for whatever comes next.
              From dependable internet to quick device support, the essentials stay within reach.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6">
              {overviewStats.map((stat) => (
                <div key={stat.label} className="border-t-2 border-ink pt-3">
                  <dt className="font-ticket text-[10px] uppercase tracking-[0.14em] text-inkMuted">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-5xl font-extrabold tracking-[-0.04em]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

const overviewStats = [
  { value: '24/7', label: 'Support mindset' },
  { value: '1', label: 'Connected mission' },
];
