import Image from 'next/image';
import { Folio } from './Folio';

export function Overview() {
  return (
    <section id="standard" className="nh-container scroll-mt-24 pt-24 lg:pt-32">
      <Folio number="04" label="Overview" />

      <header className="mx-auto max-w-5xl pt-12 text-center lg:pt-16">
        <p className="font-meta text-[11px] uppercase tracking-[0.26em] text-terracottaInk sm:text-xs">
          The Nomad Horizon standard
        </p>
        <h2 className="nh-soft mt-6 font-display text-[clamp(2.6rem,6.4vw,6rem)] font-light leading-[0.98] tracking-[-0.03em]">
          Your workday should travel as{' '}
          <em className="nh-wonk font-extrabold italic text-terracotta">well</em> as you do.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-display text-xl italic leading-snug text-inkMuted sm:text-2xl">
          Focus on your adventures and career without the worry of losing connectivity or facing
          tech issues
        </p>
      </header>

      <figure className="mt-12 lg:mt-16">
        <div className="group relative aspect-[4/3] overflow-hidden bg-paperAlt sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src="https://images.pexels.com/photos/17767273/pexels-photo-17767273/free-photo-of-man-sitting-with-laptop-on-wooden-bench-on-meadow-under-tree.jpeg"
            alt="Remote worker using a laptop outdoors"
            fill
            sizes="(min-width: 1440px) 88rem, 100vw"
            className="object-cover object-[50%_40%] transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <figcaption className="mt-3 flex justify-between border-t border-ink/20 pt-3 font-meta text-[11px] uppercase tracking-[0.2em] text-inkMuted">
          <span>Work without borders</span>
          <span className="text-terracottaInk">Fig. 02</span>
        </figcaption>
      </figure>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <p className="nh-dropcap text-lg leading-[1.75] sm:text-xl lg:col-span-7">
          We keep nomads and remote teams connected, productive, and ready for whatever comes next.
          From dependable internet to quick device support, the essentials stay within reach.
        </p>

        <dl className="grid grid-cols-2 gap-8 border-t border-ink pt-6 lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {overviewStats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-meta text-[11px] uppercase tracking-[0.2em] text-inkMuted">
                {stat.label}
              </dt>
              <dd className="nh-soft mt-1 font-display text-6xl font-light tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const overviewStats = [
  { value: '24/7', label: 'Support mindset' },
  { value: '1', label: 'Connected mission' },
];
