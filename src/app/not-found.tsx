"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const REDIRECT_MS = 5000;

export default function NotFound() {
  const { push } = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      push("/");
    }, REDIRECT_MS);
    return () => clearTimeout(timer);
  }, [push]);

  return (
    <section className='relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-film font-light text-cream'>
      <div aria-hidden='true' className='nh-grain' />
      <Image
        src='https://images.pexels.com/photos/31415635/pexels-photo-31415635.jpeg'
        alt=''
        fill
        priority
        sizes='100vw'
        className='nh-kenburns -z-20 object-cover brightness-50'
      />
      <div aria-hidden='true' className='absolute inset-0 -z-10 bg-gradient-to-t from-film via-film/60 to-film/20' />
      <div aria-hidden='true' className='nh-vignette absolute inset-0 -z-10' />

      <div className='nh-container pb-16 pt-32'>
        <p className='nh-label flex items-center gap-4 text-amber'>
          <span className='h-px w-12 bg-amber' />
          Error 404
        </p>
        <h1 className='mt-6 font-display text-[clamp(3rem,10vw,10rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em]'>
          Lost in
          <br />
          <span className='font-accent font-normal normal-case italic tracking-[-0.01em] text-amber'>transit</span>
        </h1>
        <div className='mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
          <p className='max-w-md text-lg leading-relaxed text-cream/80'>
            This page wandered off the map. We&apos;ll take you back to the start in a few seconds.
          </p>
          <Link
            href='/'
            className='group inline-flex w-fit items-center gap-3 rounded-full bg-amber px-7 py-4 text-sm font-medium text-film focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber'
          >
            Take me home
            <span aria-hidden='true' className='transition-transform duration-300 group-hover:translate-x-1'>
              →
            </span>
          </Link>
        </div>
        <div aria-hidden='true' className='mt-10 h-px w-full bg-cream/15'>
          <div className='nh-progress h-full bg-amber' style={{ animationDuration: `${REDIRECT_MS}ms` }} />
        </div>
      </div>
    </section>
  );
}
