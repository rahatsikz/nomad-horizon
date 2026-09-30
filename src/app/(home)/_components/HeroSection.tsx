import Image from 'next/image';
import Link from 'next/link';

const headlineLines = [
  { key: 'l1', content: 'Digital services' },
  {
    key: 'l2',
    content: (
      <>
        for <em className="nh-wonk font-extrabold italic text-terracotta">nomads</em>
      </>
    ),
  },
  { key: 'l3', content: 'worldwide.' },
];

const contents = [
  { number: '01', label: 'Top services', href: '#top-services' },
  { number: '02', label: 'Coming next', href: '#upcoming' },
  { number: '03', label: 'Letters from the road', href: '#letters' },
  { number: '04', label: 'The standard', href: '#standard' },
];

export function HeroSection() {
  return (
    <section className="nh-container pt-10 lg:pt-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col lg:col-span-8">
          <p
            className="nh-fade-up flex items-center gap-3 font-meta text-[11px] uppercase tracking-[0.26em] text-terracottaInk sm:text-xs"
            style={{ animationDelay: '80ms' }}
          >
            <span className="nh-draw-rule block h-px w-10 bg-terracotta" />
            Built for the moving life
          </p>

          <h1 className="nh-soft mt-6 font-display text-[clamp(3.4rem,10.4vw,10.5rem)] font-light leading-[0.9] tracking-[-0.035em]">
            {headlineLines.map((line, idx) => (
              <span key={line.key} className="nh-line">
                <span style={{ animationDelay: `${180 + idx * 120}ms` }}>{line.content}</span>
              </span>
            ))}
          </h1>

          <div
            className="nh-fade-up mt-10 grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-auto lg:pt-12"
            style={{ animationDelay: '720ms' }}
          >
            <p className="max-w-md text-lg leading-relaxed text-inkMuted">
              Your ultimate hub for seamless internet connectivity and mobile solutions to expert
              laptop servicing, we ensure you stay productive and worry-free.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 bg-terracottaInk px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink"
              >
                Browse services
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/blogs"
                className="text-sm font-medium underline decoration-ink/30 underline-offset-[6px] transition-colors hover:decoration-terracotta"
              >
                Read the journal
              </Link>
            </div>
          </div>
        </div>

        <figure className="lg:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-paperAlt lg:aspect-[3/4.4]">
            <Image
              src="https://images.pexels.com/photos/7893092/pexels-photo-7893092.jpeg"
              alt="A traveller with a backpack walking towards snow-capped mountains"
              fill
              priority
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="nh-settle object-cover object-[50%_35%]"
              style={{ animationDelay: '150ms' }}
            />
          </div>
          <figcaption
            className="nh-fade-up mt-3 flex items-baseline justify-between gap-4 border-t border-ink/20 pt-3 font-meta text-[11px] leading-relaxed text-inkMuted"
            style={{ animationDelay: '900ms' }}
          >
            <span>Fig. 01 — Above the snowline, between two deadlines.</span>
            <span className="shrink-0 text-terracottaInk">p. 01</span>
          </figcaption>
        </figure>
      </div>

      <nav
        aria-label="On this page"
        className="nh-fade-up mt-16 grid grid-cols-2 border-t border-ink md:grid-cols-4"
        style={{ animationDelay: '1000ms' }}
      >
        {contents.map(({ number, label, href }) => (
          <a
            key={href}
            href={href}
            className="group flex items-baseline gap-3 border-b border-ink/15 py-4 pr-4 transition-colors hover:text-terracottaInk md:border-b-0 md:border-r md:px-4 md:first:pl-0 md:last:border-r-0"
          >
            <span className="font-meta text-[11px] text-terracottaInk">{number}</span>
            <span className="font-display text-lg leading-tight">{label}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
