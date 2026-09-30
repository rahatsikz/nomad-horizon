'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetBlogsQuery } from '@/redux/api/blogApi';
import { BlogProps } from '@/types/common';
import { SectionHead } from './SectionHead';

export function BlogSection() {
  const { data: allBlogs, isFetching } = useGetBlogsQuery({
    showOnHomepage: true,
  });

  const blogs: BlogProps[] = allBlogs?.data?.slice(0, 2) ?? [];

  if (!isFetching && blogs.length === 0) return null;

  return (
    <section className="nh-container pt-16 lg:pt-24">
      <div className="border border-ink">
        <SectionHead
          index="07"
          title="Most Popular Blogs"
          note="Your Ultimate Resource for Digital Nomads: Practical Tips, Inspiring Stories, and Expert Guides"
        />
        {isFetching ? (
          <div aria-busy="true" aria-label="Loading blogs" className="grid md:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="h-96 animate-pulse bg-ink/5 motion-reduce:animate-none md:first:border-r md:first:border-ink" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2">
            {blogs.map((blog, idx) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="nh-focus group flex flex-col border-b border-ink last:border-b-0 hover:bg-ink hover:text-paper md:border-b-0 md:first:border-r"
              >
                <div className="relative aspect-[16/9] border-b border-ink">
                  <Image src={blog.image} alt={blog.title} fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
                  <span className="absolute left-0 top-0 bg-paper px-3 py-2 text-xs font-bold text-ink">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 lg:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-inkMuted group-hover:text-paper/80">
                    {blog.author}
                  </p>
                  <h3 className="nh-semi-wide mt-3 text-2xl font-black uppercase leading-tight tracking-[-0.02em] lg:text-3xl">
                    {blog.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 leading-relaxed text-inkMuted group-hover:text-paper/80">{blog.content}</p>
                  <span className="mt-6 text-sm font-bold uppercase tracking-[0.1em]">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
