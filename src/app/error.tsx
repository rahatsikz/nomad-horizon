'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-film font-light text-cream">
      <div aria-hidden="true" className="nh-grain" />

      <Image
        src="https://images.pexels.com/photos/31415635/pexels-photo-31415635.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="nh-kenburns -z-20 object-cover brightness-50"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-film via-film/60 to-film/20"
      />
      <div aria-hidden="true" className="nh-vignette absolute inset-0 -z-10" />

      <div className="nh-container pb-16 pt-32">
        <p className="nh-label flex items-center gap-4 text-amber">
          <span className="h-px w-12 bg-amber" />
          Something went wrong
        </p>

        <h1 className="mt-6 max-w-5xl font-display text-[clamp(3rem,10vw,10rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em]">
          Lost in
          <br />
          <span className="font-accent font-normal normal-case italic tracking-[-0.02em] text-amber">
            transit
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-cream/80">
            We could not load this page right now. Try again in a moment.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex w-fit items-center gap-3 rounded-full bg-amber px-7 py-4 text-sm font-medium text-film transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            Try again
            <span aria-hidden="true">↻</span>
          </button>
        </div>
      </div>
    </section>
  );
}
