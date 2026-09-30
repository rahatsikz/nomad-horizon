import Link from 'next/link';
import { Topo } from './Topo';

const headlineLines = [['Digital', 'services'], ['for', 'nomads'], ['worldwide']];

export function HeroSection() {
  let wordIndex = 0;

  return (
    <section className="relative isolate overflow-hidden border-b border-dashed border-ink/30">
      <Topo variant="hero" className="absolute inset-0 -z-10 size-full" />
      <GridTicks />

      <div className="nh-container relative pb-14 pt-10 sm:pt-14 lg:pb-20 lg:pt-16">
        <p className="sr-only">Built for the moving life</p>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <CompassBadge className="order-first self-end lg:order-last lg:mt-4" />

          <h1 className="font-display text-[clamp(3.4rem,10.2vw,10.5rem)] font-extrabold leading-[0.86] tracking-[-0.055em]">
            {headlineLines.map((line) => (
              <span key={line.join('-')} className="block">
                {line.map((word) => {
                  const delay = 350 + wordIndex++ * 120;
                  return (
                    <span key={word}>
                      <span className="nh-word" style={{ animationDelay: `${delay}ms` }}>
                        {word === 'nomads' ? (
                          <span className="inline-block -rotate-2 rounded-[0.12em] bg-signal px-[0.1em] pb-[0.04em] text-onSignal">
                            nomads
                          </span>
                        ) : (
                          word
                        )}
                      </span>{' '}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
        </div>

        <div
          className="nh-fade mt-10 grid gap-8 border-t border-dashed border-ink/30 pt-8 lg:mt-14 lg:grid-cols-12 lg:items-end"
          style={{ animationDelay: '1100ms' }}
        >
          <p className="font-display text-2xl font-extralight leading-snug tracking-[-0.01em] sm:text-[1.75rem] lg:col-span-7">
            Your ultimate hub for seamless internet connectivity and mobile solutions to expert
            laptop servicing, we ensure you stay productive and worry-free.
          </p>
          <div className="flex flex-col gap-6 lg:col-span-5 lg:items-end">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-display font-bold text-ground transition-colors hover:bg-signal hover:text-onSignal"
              >
                Explore services
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/blogs"
                className="font-display font-semibold underline decoration-dashed decoration-2 underline-offset-[6px] hover:text-signalText"
              >
                Read field notes
              </Link>
            </div>
            <ScaleBar />
          </div>
        </div>
      </div>
    </section>
  );
}

function CompassBadge({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`nh-fade relative size-28 shrink-0 text-ink sm:size-36 lg:size-44 ${className ?? ''}`}
      style={{ animationDelay: '200ms' }}
    >
      <svg viewBox="0 0 200 200" className="nh-spin-slow absolute inset-0 size-full">
        <defs>
          <path id="nh-badge-ring" d="M100,100 m-79,0 a79,79 0 1,1 158,0 a79,79 0 1,1 -158,0" />
        </defs>
        <circle cx="100" cy="100" r="98" className="fill-surface" stroke="currentColor" strokeWidth="1.5" />
        <text className="fill-current font-ticket" fontSize="12.5" fontWeight="500">
          <textPath href="#nh-badge-ring" textLength="492" lengthAdjust="spacing">
            BUILT FOR THE MOVING LIFE • BUILT FOR THE MOVING LIFE •
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="62" strokeWidth="1" />
        <circle cx="100" cy="100" r="52" strokeWidth="0.75" strokeDasharray="2 4" />
        {Array.from({ length: 16 }, (_, i) => (
          <line
            key={i}
            x1="100"
            y1="38"
            x2="100"
            y2={i % 4 === 0 ? 48 : 43}
            strokeWidth={i % 4 === 0 ? 2 : 1}
            transform={`rotate(${i * 22.5} 100 100)`}
          />
        ))}
        <path d="M100 56 108 100h-16z" className="fill-signal" stroke="none" />
        <path d="M100 144 92 100h16z" fill="currentColor" stroke="none" />
        <circle cx="100" cy="100" r="4" className="fill-surface" strokeWidth="2" />
      </svg>
    </div>
  );
}

function ScaleBar() {
  return (
    <div aria-hidden="true" className="w-56 font-ticket text-[9px] uppercase tracking-[0.12em] text-inkMuted">
      <div className="flex h-2 border border-ink">
        <span className="flex-1 bg-ink" />
        <span className="flex-1" />
        <span className="flex-1 bg-ink" />
        <span className="flex-1" />
      </div>
      <div className="mt-1 flex justify-between">
        <span>0</span>
        <span>Here</span>
        <span>Anywhere</span>
      </div>
    </div>
  );
}

/** Map-edge graticule ticks along the hero's top and left edges. */
function GridTicks() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden text-inkMuted/60 lg:block">
      <div className="absolute inset-x-0 top-0 flex h-3 justify-between px-[5%]">
        {Array.from({ length: 13 }, (_, i) => (
          <span key={i} className="w-px bg-current" />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 flex w-3 flex-col justify-between py-[5%]">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className="h-px bg-current" />
        ))}
      </div>
    </div>
  );
}
