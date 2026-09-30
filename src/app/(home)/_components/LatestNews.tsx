'use client';
import { useGetNewsQuery } from '@/redux/api/newsApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { NewsProps } from '@/types/common';
import { Folio } from './Folio';

export function LatestNews() {
  const { data: newsData } = useGetNewsQuery({
    showOnHomepage: true,
  });

  const news: NewsProps[] = newsData?.data ?? [];

  if (news.length === 0) return null;

  return (
    <section className="nh-container pt-24 lg:pt-32">
      <Folio number="07" label="Briefings" />
      <header className="pt-8">
        <h2 className="nh-soft font-display text-4xl font-light leading-none tracking-[-0.02em] sm:text-5xl">
          Latest News
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-inkMuted">
          Stay Updated with the Latest Trends and Insights in the Digital Nomad World
        </p>
      </header>

      <div className="mt-10 grid border-t-2 border-ink md:grid-cols-2 lg:grid-cols-3 md:divide-x md:divide-ink/15">
        {news.map((item) => (
          <article key={item.id} className="border-b border-ink/15 py-8 md:px-6 md:first:pl-0 lg:last:pr-0">
            <p className="font-meta text-[11px] uppercase tracking-[0.2em] text-terracottaInk">
              {formatISODatetoHumanReadable(item.date)}
            </p>
            <h3 className="nh-soft mt-3 font-display text-2xl leading-tight">{item.title}</h3>
            <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-inkMuted">{item.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
