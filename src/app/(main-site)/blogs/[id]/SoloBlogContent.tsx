"use client";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { formatISODatetoHumanReadable } from "@/lib/utils";
import { useGetBlogQuery } from "@/redux/api/blogApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SoloBlogContent({ id }: { id: string }) {
  const { back } = useRouter();
  const { data, isFetching } = useGetBlogQuery(id);

  if (isFetching) {
    return (
      <div className='pt-32'>
        <LoadingComponent />
      </div>
    );
  }

  const { title, content, author, image, createdAt } = data?.data;

  return (
    <article>
      <header className='relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden'>
        <div className='absolute inset-0 -z-20 bg-film'>
          <Image src={image} fill priority alt={title} sizes='100vw' className='nh-kenburns object-cover' />
          <div aria-hidden='true' className='nh-vignette absolute inset-0' />
        </div>
        <div aria-hidden='true' className='absolute inset-0 -z-10 bg-gradient-to-t from-canvas from-[10%] via-canvas/70 via-[45%] to-canvas/10' />
        <div aria-hidden='true' className='absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-canvas/70 to-transparent' />

        <div className='nh-container pb-12 pt-32'>
          <button
            onClick={() => back()}
            className='nh-label nh-fade-up mb-8 flex items-center gap-3 text-fgMuted transition-colors hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber'
          >
            <span aria-hidden='true'>←</span> Back to previous page
          </button>
          <p className='nh-label nh-fade-up flex flex-wrap items-center gap-x-4 gap-y-2 text-amberText' style={{ animationDelay: "100ms" }}>
            <span className='h-px w-10 bg-amber' />
            {author}
            <span className='text-fgMuted'>·</span>
            <span className='text-fgMuted'>Posted at {formatISODatetoHumanReadable(createdAt)}</span>
          </p>
          <h1
            className='nh-fade-up mt-5 max-w-5xl font-display text-[clamp(1.8rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-balance'
            style={{ animationDelay: "200ms" }}
          >
            {title}
          </h1>
        </div>
      </header>

      <div className='nh-container'>
        <div className='mx-auto max-w-2xl pt-6'>
          <p className='text-xl font-light leading-[1.8] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-accent first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-amberText sm:text-[1.35rem]'>
            {content}
          </p>
          <div className='mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-fg/10 pt-8'>
            <p className='nh-label text-fgMuted'>Filed by {author}</p>
            <Link
              href='/blogs'
              className='text-sm text-amberText underline decoration-amber/50 underline-offset-4 hover:decoration-amber'
            >
              More stories →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
