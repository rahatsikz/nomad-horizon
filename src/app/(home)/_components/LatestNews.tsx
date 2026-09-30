'use client';
import { useGetNewsQuery } from '@/redux/api/newsApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { NewsProps } from '@/types/common';
import { SectionHead } from './SectionHead';

export function LatestNews() {
  const { data: newsData } = useGetNewsQuery({
    showOnHomepage: true,
  });

  const news: NewsProps[] = newsData?.data ?? [];

  if (news.length === 0) return null;

  return (
    <section className="nh-container pt-16 lg:pt-24">
      <div className="border border-ink">
        <SectionHead
          index="08"
          title="Latest News"
          note="Stay Updated with the Latest Trends and Insights in the Digital Nomad World"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, idx) => (
            <article
              key={item.id}
              className="flex flex-col border-b border-ink p-5 last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:p-6 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <p className="flex justify-between text-xs font-bold uppercase tracking-[0.14em]">
                <span>{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-inkMuted">{formatISODatetoHumanReadable(item.date)}</span>
              </p>
              <h3 className="nh-semi-wide mt-6 text-xl font-black uppercase leading-tight tracking-[-0.01em]">{item.title}</h3>
              <p className="mt-3 line-clamp-5 leading-relaxed text-inkMuted">{item.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
