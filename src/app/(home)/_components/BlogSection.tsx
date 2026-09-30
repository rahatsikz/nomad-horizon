'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetBlogsQuery } from '@/redux/api/blogApi';
import { BlogProps } from '@/types/common';
import { Reveal } from './Reveal';

export function BlogSection() {
  const { data: allBlogs, isFetching } = useGetBlogsQuery({
    showOnHomepage: true,
  });

  const blogs: BlogProps[] = allBlogs?.data?.slice(0, 2) ?? [];

  if (!isFetching && blogs.length === 0) return null;

  return (
    <section className="nh-container pt-24 lg:pt-36">
      <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="nh-label text-amberText">Stories from the road</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em]">
            Most Popular Blogs
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-fgMuted lg:text-right">
          Your Ultimate Resource for Digital Nomads: Practical Tips, Inspiring Stories, and Expert
          Guides
        </p>
      </Reveal>

      {isFetching ? (
        <div aria-busy="true" aria-label="Loading blogs" className="mt-12 grid gap-6 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="aspect-[4/3] animate-pulse bg-raised motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {blogs.map((blog, idx) => (
            <Reveal key={blog.id} delay={idx * 120}>
              <Link
                href={`/blogs/${blog.id}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-film text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover brightness-[0.6] transition duration-[900ms] group-hover:scale-[1.03] group-hover:brightness-90"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-film via-film/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-amber">By {blog.author}</p>
                  <h3 className="mt-3 font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] lg:text-3xl">
                    {blog.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream/80">{blog.content}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
