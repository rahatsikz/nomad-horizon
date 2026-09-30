'use client';
import { useEffect, useState } from 'react';
import { dummyReview } from '@/constant/global';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

const SCENE_MS = 8000;

export function Testimonial() {
  const reviews = dummyReview;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    setAutoplay(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!autoplay || paused || reviews.length < 2) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % reviews.length), SCENE_MS);
    return () => clearTimeout(timer);
  }, [active, autoplay, paused, reviews.length]);

  return (
    <section className="relative isolate mt-24 overflow-hidden py-24 lg:mt-36 lg:py-36">
      <div aria-hidden="true" className="nh-glow absolute -left-[25vw] top-1/2 -z-10 size-[60vw] -translate-y-1/2" />

      <div
        className="nh-container"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="nh-label text-amberText">Trusted by Nomads Worldwide</h2>
          <p className="max-w-sm text-sm text-fgMuted sm:text-right">
            See what our community has to say about their experience with Nomad Horizon&apos;s
            services
          </p>
        </Reveal>

        <div className="mt-12 grid lg:mt-16" aria-live={paused || !autoplay ? 'polite' : 'off'}>
          {reviews.map((review, idx) => (
            <figure
              key={review.id}
              aria-hidden={active !== idx}
              className={cn(
                'nh-crossfade [grid-area:1/1]',
                active === idx ? 'opacity-100 blur-0' : 'pointer-events-none opacity-0 blur-sm',
              )}
            >
              <blockquote className="font-accent text-[clamp(1.9rem,4.4vw,4.5rem)] leading-[1.06] tracking-[-0.01em]">
                <p>
                  <span className="text-amberText">&ldquo;</span>
                  {review.review}
                  <span className="text-amberText">&rdquo;</span>
                </p>
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span className="font-display text-xl font-bold uppercase tracking-[-0.01em]">{review.name}</span>
                <span className="nh-label text-fgMuted">{review.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-5" role="tablist" aria-label="Choose a testimonial">
          {reviews.map((review, idx) => (
            <button
              key={review.id}
              role="tab"
              aria-selected={active === idx}
              aria-label={`Testimonial from ${review.name}`}
              onClick={() => setActive(idx)}
              className="group py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              <span className="relative block h-px w-full overflow-hidden bg-fg/20">
                {active === idx && (
                  <span
                    key={`${active}-${paused}`}
                    className={cn('absolute inset-0 bg-amber', autoplay && !paused ? 'nh-progress' : '')}
                    style={autoplay && !paused ? { animationDuration: `${SCENE_MS}ms` } : undefined}
                  />
                )}
                {idx < active && <span className="absolute inset-0 bg-fg/50" />}
              </span>
              <span
                className={cn(
                  'nh-label mt-3 hidden transition-colors sm:block',
                  active === idx ? 'text-fg' : 'text-fgMuted group-hover:text-fg',
                )}
              >
                {String(idx + 1).padStart(2, '0')} — {review.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
