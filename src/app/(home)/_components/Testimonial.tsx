'use client';
import { useRef } from 'react';
import { dummyReview } from '@/constant/global';
import { ReviewProps } from '@/types/common';
import { LegHeader } from './LegHeader';

const postcardTilt = [-1.2, 0.9, -0.5];

export function Testimonial() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>('[data-postcard]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scroller.scrollBy({
      left: direction * ((card?.offsetWidth ?? 400) + 24),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="pt-10 lg:pt-14">
      <div className="nh-container">
        <LegHeader
          leg="03"
          label="Mail call — postmarked worldwide"
          title="Trusted by Nomads Worldwide"
          subtitle="See what our community has to say about their experience with Nomad Horizon's services"
        >
          <div className="flex gap-3">
            <CarouselButton label="Previous postcard" onClick={() => scrollByCard(-1)}>
              ←
            </CarouselButton>
            <CarouselButton label="Next postcard" onClick={() => scrollByCard(1)}>
              →
            </CarouselButton>
          </div>
        </LegHeader>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-label="Testimonials"
        tabIndex={0}
        className="nh-container mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto py-8 [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
      >
        {dummyReview.map((review, idx) => (
          <Postcard key={review.id} data={review} index={idx} />
        ))}
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex size-12 items-center justify-center rounded-full border-2 border-ink font-display text-lg font-bold transition-colors hover:bg-ink hover:text-ground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
    >
      {children}
    </button>
  );
}

function Postcard({ data, index }: { data: ReviewProps; index: number }) {
  const [city, country] = data.city.split(',').map((s) => s.trim());

  return (
    <figure
      data-postcard
      className="relative w-[88%] shrink-0 snap-center overflow-hidden rounded-md border border-ink/20 bg-surface transition-transform duration-500 hover:rotate-0 sm:w-[36rem]"
      style={{ rotate: `${postcardTilt[index % postcardTilt.length]}deg` }}
    >
      {/* air-mail border */}
      <div
        aria-hidden="true"
        className="h-2 w-full"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgb(var(--nh-signal)) 0 12px, transparent 12px 20px, rgb(var(--nh-map)) 20px 32px, transparent 32px 40px)',
        }}
      />
      <div className="grid gap-6 p-5 sm:grid-cols-[1.35fr_1fr] sm:gap-0 sm:p-7">
        <blockquote className="font-text text-lg italic leading-relaxed sm:pr-6 sm:text-xl">
          <p>&ldquo;{data.review}&rdquo;</p>
        </blockquote>

        <div className="relative flex flex-col justify-between gap-6 border-t border-dashed border-ink/30 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <div className="flex items-start justify-between">
            <Postmark city={city} country={country ?? ''} id={`pm-${index}`} />
            <div className="flex size-16 flex-col items-center justify-center gap-1 border-2 border-dashed border-ink/40 p-1 text-center">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-signalText">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="rotate(45 12 12)" />
              </svg>
              <span className="font-ticket text-[7px] uppercase tracking-[0.12em]">Par avion</span>
            </div>
          </div>

          <figcaption className="space-y-2">
            <p className="flex items-baseline gap-2 border-b border-ink/25 pb-1">
              <span className="font-ticket text-[9px] uppercase tracking-[0.14em] text-inkMuted">From</span>
              <span className="font-display text-lg font-bold">{data.name}</span>
            </p>
            <p className="flex items-baseline gap-2 border-b border-ink/25 pb-1">
              <span className="font-ticket text-[9px] uppercase tracking-[0.14em] text-inkMuted">City</span>
              <cite className="font-text not-italic">{data.city}</cite>
            </p>
            <p className="flex items-baseline gap-2 border-b border-ink/25 pb-1">
              <span className="font-ticket text-[9px] uppercase tracking-[0.14em] text-inkMuted">To</span>
              <span className="font-text">Nomad Horizon</span>
            </p>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

function Postmark({ city, country, id }: { city: string; country: string; id: string }) {
  return (
    <svg viewBox="0 0 150 110" aria-hidden="true" className="-ml-2 h-24 w-32 -rotate-12 text-signalText" fill="none" stroke="currentColor">
      <defs>
        <path id={`${id}-top`} d="M18,55 a37,37 0 0,1 74,0" />
        <path id={`${id}-bottom`} d="M14,55 a41,41 0 0,0 82,0" />
      </defs>
      <circle cx="55" cy="55" r="48" strokeWidth="1.5" />
      <circle cx="55" cy="55" r="27" strokeWidth="1" />
      <text className="fill-current font-ticket" stroke="none" fontSize="8.5" fontWeight="600" letterSpacing="1">
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          {city.toUpperCase()}
        </textPath>
      </text>
      <text className="fill-current font-ticket" stroke="none" fontSize="7" letterSpacing="1">
        <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle" dominantBaseline="hanging">
          {country.toUpperCase()}
        </textPath>
      </text>
      <text x="55" y="59" textAnchor="middle" className="fill-current font-display" stroke="none" fontSize="11" fontWeight="800">
        NH
      </text>
      {[40, 50, 60, 70].map((y) => (
        <path key={y} d={`M100 ${y} q 8 -5 16 0 t 16 0 t 16 0`} strokeWidth="1.5" />
      ))}
    </svg>
  );
}
