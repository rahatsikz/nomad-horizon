'use client';
import { useGetNewsQuery } from '@/redux/api/newsApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { NewsProps } from '@/types/common';
import { LegHeader } from './LegHeader';

export function LatestNews() {
  const { data: newsData } = useGetNewsQuery({
    showOnHomepage: true,
  });

  const news: NewsProps[] = newsData?.data ?? [];

  if (news.length === 0) return null;

  return (
    <section className="nh-container pt-24 lg:pt-32">
      <LegHeader
        leg="07"
        label="Dispatches"
        title="Latest News"
        subtitle="Stay Updated with the Latest Trends and Insights in the Digital Nomad World"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item, idx) => (
          <article
            key={item.id}
            className="flex flex-col rounded-sm border border-dashed border-ink/40 bg-tag p-6"
          >
            <div className="flex items-center justify-between border-b border-ink/25 pb-3 font-ticket text-[10px] uppercase tracking-[0.14em]">
              <span>Dispatch {String(idx + 1).padStart(2, '0')}</span>
              <span className="text-inkMuted">{formatISODatetoHumanReadable(item.date)}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-[-0.02em]">{item.title}</h3>
            <p className="mt-3 line-clamp-5 leading-relaxed text-inkMuted">{item.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
