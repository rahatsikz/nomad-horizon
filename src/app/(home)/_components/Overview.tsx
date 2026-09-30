import Image from 'next/image';
import { Reveal } from './Reveal';

export function Overview() {
  return (
    <section className="relative lg:grid lg:grid-cols-2">
      {/* sticky photo half */}
      <div className="relative h-[70svh] lg:sticky lg:top-0 lg:h-[100svh] lg:self-start">
        <Image
          src="https://images.pexels.com/photos/17767273/pexels-photo-17767273/free-photo-of-man-sitting-with-laptop-on-wooden-bench-on-meadow-under-tree.jpeg"
          alt="Remote worker using a laptop outdoors"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[45%_50%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-film/80 via-transparent to-film/20" />
        <p className="nh-label absolute bottom-8 left-6 flex items-center gap-3 text-cream sm:left-10">
          <span className="size-2 rounded-full bg-amber shadow-[0_0_14px_rgb(var(--nh-amber))]" />
          Work without borders
        </p>
      </div>

      {/* scrolling copy half */}
      <div className="flex flex-col gap-24 px-4 py-20 sm:px-10 lg:gap-40 lg:px-16 lg:py-40 xl:px-24">
        <Reveal>
          <p className="nh-label text-amberText">Overview</p>
          <p className="mt-6 font-accent text-3xl italic leading-tight sm:text-4xl">
            Focus on your adventures and career without the worry of losing connectivity or facing
            tech issues
          </p>
        </Reveal>

        <Reveal>
          <p className="nh-label text-fgMuted">The Nomad Horizon standard</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.6vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
            Your workday should travel as well as{' '}
            <span className="font-accent font-normal normal-case italic tracking-normal text-amberText">you do.</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-fgMuted sm:text-xl">
            We keep nomads and remote teams connected, productive, and ready for whatever comes next.
            From dependable internet to quick device support, the essentials stay within reach.
          </p>
        </Reveal>

        <dl className="grid gap-16 sm:grid-cols-2 lg:grid-cols-1 lg:gap-24">
          {overviewStats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 120}>
              <dt className="nh-label text-fgMuted">{stat.label}</dt>
              <dd className="mt-3 font-display text-[clamp(4.5rem,9vw,9rem)] font-extrabold leading-none tracking-[-0.05em]">
                {stat.value}
              </dd>
            </Reveal>
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
