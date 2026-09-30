'use client';
import { useEffect, useState } from 'react';
import { dummyReview } from '@/constant/global';
import { cn } from '@/lib/utils';
import { Folio } from './Folio';

const ROTATE_MS = 9000;

export function Testimonial() {
  const reviews = dummyReview;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || prefersReducedMotion || reviews.length < 2) return;

    const timer = setTimeout(() => setActive((i) => (i + 1) % reviews.length), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, reviews.length]);

  const go = (step: number) => setActive((i) => (i + step + reviews.length) % reviews.length);

  return (
    <section id="letters" className="mt-24 scroll-mt-24 bg-paperAlt lg:mt-32">
      <div className="nh-container pb-16 lg:pb-24">
        <Folio number="03" label="Letters from the road" />

        <div
          className="grid gap-12 pt-10 lg:grid-cols-12 lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <header className="lg:col-span-4 lg:order-2">
            <h2 className="nh-soft font-display text-4xl font-light leading-[1] tracking-[-0.02em] sm:text-5xl">
              Trusted by Nomads <em className="nh-wonk font-extrabold italic">Worldwide</em>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-inkMuted">
              See what our community has to say about their experience with Nomad Horizon&apos;s
              services
            </p>

            <ol className="mt-10 border-t border-ink/15" aria-label="Choose a testimonial">
              {reviews.map((review, idx) => (
                <li key={review.id} className="border-b border-ink/15">
                  <button
                    onClick={() => setActive(idx)}
                    aria-current={active === idx ? 'true' : undefined}
                    className={cn(
                      'flex w-full items-baseline gap-4 py-3 text-left transition-colors hover:text-terracottaInk focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracottaInk',
                      active === idx ? 'text-ink' : 'text-inkMuted',
                    )}
                  >
                    <span className="font-meta text-[11px] text-terracottaInk">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-lg">{review.name}</span>
                    <span className="ml-auto hidden font-meta text-[11px] uppercase tracking-[0.16em] sm:inline">
                      {review.city.split(',')[0]}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </header>

          <div className="relative lg:col-span-8 lg:order-1">
            <span
              aria-hidden="true"
              className="nh-wonk pointer-events-none absolute -left-1 top-0 select-none font-display text-[9rem] font-extrabold leading-[0.8] text-terracotta sm:text-[13rem] lg:-left-3"
            >
              &ldquo;
            </span>

            <div className="grid pt-20 sm:pt-32" aria-live={paused ? 'polite' : 'off'}>
              {reviews.map((review, idx) => (
                <figure
                  key={review.id}
                  aria-hidden={active !== idx}
                  className={cn(
                    'nh-quote [grid-area:1/1]',
                    active === idx ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
                  )}
                >
                  <blockquote className="nh-soft font-display text-[1.7rem] font-light leading-[1.2] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]">
                    <p>{review.review}</p>
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-xl italic">— {review.name}</span>
                    <span className="font-meta text-[11px] uppercase tracking-[0.2em] text-inkMuted">
                      {review.city}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6 font-meta text-xs">
              <button
                onClick={() => go(-1)}
                className="border border-ink/30 px-4 py-2 transition-colors hover:border-terracottaInk hover:text-terracottaInk"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <span className="text-inkMuted">
                <span className="text-ink">{String(active + 1).padStart(2, '0')}</span> /{' '}
                {String(reviews.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => go(1)}
                className="border border-ink/30 px-4 py-2 transition-colors hover:border-terracottaInk hover:text-terracottaInk"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
