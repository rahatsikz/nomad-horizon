'use client';
import { cn } from '@/lib/utils';
import { NewsCard } from '@/components/ui/Cards';
import { HeaderText } from '@/components/ui/Headers';
import { useGetNewsQuery } from '@/redux/api/newsApi';
import { NewsProps } from '@/types/common';

function getNewsCardClassName(index: number, total: number) {
  const isLastCard = index === total - 1;

  return cn(
    isLastCard && total % 2 === 1 && 'md:max-lg:col-span-2',
    isLastCard && total % 3 === 1 && 'lg:col-span-3',
    isLastCard && total % 3 === 2 && 'lg:col-span-2',
  );
}

export function LatestNews() {
  const { data: newsData } = useGetNewsQuery({
    showOnHomepage: true,
  });

  const newsDataLength = newsData?.data?.length;

  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-nomadGray bg-[radial-gradient(circle_at_100%_100%,rgba(34,40,49,0.12),transparent_40%),rgb(var(--nomad-gray))] p-5 shadow-main sm:p-8">
      <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-primary opacity-15 blur-3xl" />
      {newsDataLength > 0 && (
        <>
          <div className="relative">
            <HeaderText
              title="Latest News"
              subtitle="Stay Updated with the Latest Trends and Insights in the Digital Nomad World"
            />
            <div
              className={cn(
                'grid gap-4',
                newsDataLength >= 3 && 'md:grid-cols-2 lg:grid-cols-3',
                newsDataLength === 2 && 'md:grid-cols-1 lg:grid-cols-2',
              )}
            >
              {newsData?.data?.map((data: NewsProps, idx: number, arr: NewsProps[]) => (
                <NewsCard key={idx} data={data} className={getNewsCardClassName(idx, arr.length)} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
