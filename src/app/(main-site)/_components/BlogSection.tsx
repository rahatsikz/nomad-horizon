'use client';
import { BlogCard } from '../../../components/ui/Cards';
import { HeaderText } from '../../../components/ui/Headers';
import { useGetBlogsQuery } from '@/redux/api/blogApi';
import LoadingComponent from '../../../components/ui/LoadingComponent';
import { cn } from '@/lib/utils';

export function BlogSection() {
  const { data: allBlogs, isFetching } = useGetBlogsQuery({
    showOnHomepage: true,
  });

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-nomadGray bg-[radial-gradient(circle_at_0%_100%,rgba(118,171,174,0.18),transparent_35%),rgb(var(--main-bg))] p-5 shadow-main sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rotate-12 opacity-80"
      >
        <div className="absolute inset-0 rounded-full border-[14px] border-nomadGray border-r-transparent transition-transform duration-700" />
        <div className="absolute inset-6 rounded-full border-[10px] border-nomadGray border-l-transparent" />
        <span className="absolute bottom-5 left-0 h-3 w-3 rounded-full bg-primary/70 shadow-[0_0_0_7px_rgba(118,171,174,0.12)]" />
      </div>
      {allBlogs?.data?.length > 0 && (
        <>
          <div className="relative">
            <HeaderText
              title="Most Popular Blogs"
              subtitle="Your Ultimate Resource for Digital Nomads: Practical Tips, Inspiring Stories, and Expert Guides"
            />
            <div
              className={cn(
                'grid',
                allBlogs?.data?.length === 1 ? 'grid-cols-1' : 'grid-cols-1 gap-6 xl:grid-cols-2',
              )}
            >
              {allBlogs?.data?.slice(0, 2).map((data: any) => (
                <BlogCard key={data.id} data={data} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
