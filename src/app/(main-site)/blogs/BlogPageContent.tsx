"use client";
import { PageHero } from "@/components/ui/Headers";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogPageContent() {
  const { data, isFetching } = useGetBlogsQuery({});
  const blogs: any[] = data?.data ?? [];
  const [feature, ...rest] = blogs;

  return (
    <>
      <PageHero
        label='Stories from the road'
        title='Useful'
        accent='Blogs'
        subtitle="We've got you covered for all your nomadic needs"
      />

      {isFetching ? (
        <LoadingComponent />
      ) : (
        <section className='nh-container space-y-6'>
          {feature && <BlogCard data={feature} featured />}
          {rest.length > 0 && (
            <div className='grid gap-6 md:grid-cols-2'>
              {rest.map((blog, idx) => (
                <Reveal key={blog?.id} delay={(idx % 2) * 120}>
                  <BlogCard data={blog} />
                </Reveal>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}

function BlogCard({ data, featured }: { data: any; featured?: boolean }) {
  return (
    <Link
      href={`/blogs/${data?.id}`}
      className={cn(
        "group relative block overflow-hidden bg-film text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber",
        featured ? "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]"
      )}
    >
      <Image
        sizes={featured ? "100vw" : "(min-width: 768px) 45vw, 100vw"}
        fill
        src={data?.image}
        alt={data?.title}
        priority={featured}
        className='object-cover brightness-[0.6] transition duration-[900ms] group-hover:scale-[1.03] group-hover:brightness-90'
      />
      <div aria-hidden='true' className='absolute inset-0 bg-gradient-to-t from-film via-film/40 to-transparent' />
      <div className={cn("absolute inset-x-0 bottom-0 p-6", featured ? "sm:p-10 lg:p-14" : "lg:p-8")}>
        <p className='text-[11px] font-medium uppercase tracking-[0.3em] text-amber'>
          {featured && <span className='mr-3 text-cream/70'>Featured ·</span>}
          By {data?.author}
        </p>
        <h2
          className={cn(
            "mt-3 font-display font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-balance",
            featured ? "max-w-4xl text-3xl sm:text-5xl lg:text-6xl" : "text-2xl lg:text-3xl"
          )}
        >
          {data?.title}
        </h2>
        <p className={cn("mt-4 line-clamp-2 font-light leading-relaxed text-cream/80", featured ? "max-w-2xl text-base sm:text-lg" : "text-sm")}>
          {data?.content}
        </p>
        <span className='relative mt-6 inline-flex items-center gap-2 pb-1 text-sm after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-700 group-hover:after:scale-x-100'>
          Read More <span aria-hidden='true'>→</span>
        </span>
      </div>
    </Link>
  );
}
