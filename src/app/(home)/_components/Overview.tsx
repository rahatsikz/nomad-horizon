import Image from 'next/image';
import { SectionHead } from './SectionHead';

export function Overview() {
  return (
    <section className="nh-container pt-16 lg:pt-24">
      <div className="border border-ink">
        <SectionHead
          index="05"
          title="Overview"
          note="Focus on your adventures and career without the worry of losing connectivity or facing tech issues"
        />
        <div className="grid lg:grid-cols-12">
          <figure className="relative border-b border-ink lg:col-span-6 lg:border-b-0 lg:border-r">
            <div className="group relative aspect-[4/3] h-full w-full overflow-hidden lg:aspect-auto lg:min-h-[34rem]">
              <Image
                src="https://images.pexels.com/photos/17767273/pexels-photo-17767273/free-photo-of-man-sitting-with-laptop-on-wooden-bench-on-meadow-under-tree.jpeg"
                alt="Remote worker using a laptop outdoors"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover grayscale-[0.15]"
              />
            </div>
            <figcaption className="absolute bottom-0 left-0 bg-paper px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em]">
              Fig. 05 — Work without borders
            </figcaption>
          </figure>

          <div className="flex flex-col lg:col-span-6">
            <div className="border-b border-ink p-5 sm:p-6 lg:p-8">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]">
                <span aria-hidden="true" className="size-2.5 bg-signal" />
                The Nomad Horizon standard
              </p>
              <h3 className="nh-wide mt-6 text-[clamp(2rem,3.6vw,3.5rem)] font-black uppercase leading-[0.92] tracking-[-0.035em]">
                Your workday should travel as well as you do.
              </h3>
            </div>
            <p className="border-b border-ink p-5 text-lg leading-relaxed sm:p-6 lg:p-8">
              We keep nomads and remote teams connected, productive, and ready for whatever comes next.
              From dependable internet to quick device support, the essentials stay within reach.
            </p>

            {/* spec sheet */}
            <dl className="grid flex-1 grid-cols-2">
              {overviewStats.map((stat, idx) => (
                <div key={stat.label} className="flex flex-col justify-between gap-8 p-5 first:border-r first:border-ink sm:p-6 lg:p-8">
                  <dt className="flex justify-between text-xs font-bold uppercase tracking-[0.14em] text-inkMuted">
                    <span>{stat.label}</span>
                    <span>{String(idx + 1).padStart(2, '0')}</span>
                  </dt>
                  <dd className="nh-wide text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[0.8] tracking-[-0.05em]">
                    {stat.value}
                  </dd>
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
