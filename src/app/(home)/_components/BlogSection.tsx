'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetBlogsQuery } from '@/redux/api/blogApi';
import { BlogProps } from '@/types/common';
import { Folio } from './Folio';

export function BlogSection() {
  const { data: allBlogs, isFetching } = useGetBlogsQuery({
    showOnHomepage: true,
  });

  const blogs: BlogProps[] = allBlogs?.data?.slice(0, 2) ?? [];

  if (!isFetching && blogs.length === 0) return null;

  return (
    <section className="nh-container pt-24 lg:pt-32">
      <Folio number="06" label="From the journal" />
      <header className="flex flex-col gap-4 pt-8 md:flex-row md:items-end md:justify-between">
        <h2 className="nh-soft font-display text-4xl font-light leading-none tracking-[-0.02em] sm:text-5xl">
          Most Popular Blogs
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-inkMuted">
          Your Ultimate Resource for Digital Nomads: Practical Tips, Inspiring Stories, and Expert
          Guides
        </p>
      </header>

      {isFetching ? (
        <div aria-busy="true" aria-label="Loading blogs" className="mt-10 grid gap-10 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="aspect-[3/2] animate-pulse bg-paperAlt motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-10">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group block transition-transform duration-500 ease-out hover:-translate-y-1"
            >
              <figure className="relative aspect-[3/2] overflow-hidden bg-paperAlt">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </figure>
              <p className="mt-5 font-meta text-[11px] uppercase tracking-[0.2em] text-inkMuted">
                By <span className="text-terracottaInk">{blog.author}</span>
              </p>
              <h3 className="nh-soft mt-2 font-display text-3xl leading-tight tracking-tight">{blog.title}</h3>
              <p className="mt-3 line-clamp-3 leading-relaxed text-inkMuted">{blog.content}</p>
              <span className="mt-4 inline-block text-sm font-medium text-terracottaInk">
                Read the story{' '}
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
