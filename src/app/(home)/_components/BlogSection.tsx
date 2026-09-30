'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetBlogsQuery } from '@/redux/api/blogApi';
import { BlogProps } from '@/types/common';
import { ArrowPictogram, NewspaperPictogram } from './Pictograms';
import { SignHeader } from './SignHeader';

export function BlogSection() {
  const { data: allBlogs, isFetching } = useGetBlogsQuery({
    showOnHomepage: true,
  });

  const blogs: BlogProps[] = allBlogs?.data?.slice(0, 2) ?? [];

  if (!isFetching && blogs.length === 0) return null;

  return (
    <section className="nh-container pt-20 lg:pt-28">
      <SignHeader
        Pictogram={NewspaperPictogram}
        zone="Lounge — reading room"
        title="Most Popular Blogs"
        subtitle="Your Ultimate Resource for Digital Nomads: Practical Tips, Inspiring Stories, and Expert Guides"
      />
      {isFetching ? (
        <div aria-busy="true" aria-label="Loading blogs" className="mt-10 grid gap-6 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-surface motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group flex flex-col overflow-hidden rounded-lg bg-surface ring-1 ring-ink/10 transition-colors hover:ring-ink/30 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-sign"
            >
              <figure className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </figure>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="font-sign text-sm font-semibold uppercase tracking-[0.14em] text-inkMuted">By {blog.author}</p>
                <h3 className="mt-2 font-sign text-3xl font-bold leading-none">{blog.title}</h3>
                <p className="mt-3 line-clamp-3 flex-1 text-inkMuted">{blog.content}</p>
                <span className="mt-5 flex items-center gap-2 font-sign text-lg font-bold uppercase tracking-[0.06em]">
                  Read
                  <ArrowPictogram className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
