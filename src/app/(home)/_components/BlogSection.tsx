'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetBlogsQuery } from '@/redux/api/blogApi';
import { BlogProps } from '@/types/common';
import { LegHeader } from './LegHeader';

export function BlogSection() {
  const { data: allBlogs, isFetching } = useGetBlogsQuery({
    showOnHomepage: true,
  });

  const blogs: BlogProps[] = allBlogs?.data?.slice(0, 2) ?? [];

  if (!isFetching && blogs.length === 0) return null;

  return (
    <section className="nh-container pt-24 lg:pt-32">
      <LegHeader
        leg="06"
        label="Field notes from the road"
        title="Most Popular Blogs"
        subtitle="Your Ultimate Resource for Digital Nomads: Practical Tips, Inspiring Stories, and Expert Guides"
      />

      {isFetching ? (
        <div aria-busy="true" aria-label="Loading blogs" className="mt-12 grid gap-8 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="h-96 animate-pulse rounded-xl border-2 border-dashed border-ink/25 motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {blogs.map((blog, idx) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border-2 border-ink bg-surface transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-0.5deg]"
            >
              <div className="flex items-center justify-between border-b-2 border-ink px-5 py-3 font-ticket text-[10px] uppercase tracking-[0.16em]">
                <span>Field notes Nº {String(idx + 1).padStart(2, '0')}</span>
                <span className="text-inkMuted">Memo book</span>
              </div>
              <figure className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </figure>
              <div className="nh-dot-grid flex flex-1 flex-col p-6">
                <h3 className="font-display text-3xl font-extrabold leading-[1] tracking-[-0.035em]">{blog.title}</h3>
                <p className="mt-2 font-ticket text-[10px] uppercase tracking-[0.14em] text-signalText">
                  Filed by {blog.author}
                </p>
                <p className="mt-4 line-clamp-3 text-lg leading-relaxed text-inkMuted">{blog.content}</p>
                <span className="mt-6 font-display font-bold underline decoration-dashed decoration-2 underline-offset-4 group-hover:text-signalText">
                  Read the note →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
