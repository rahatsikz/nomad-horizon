'use client';
import { useGetNewsQuery } from '@/redux/api/newsApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { NewsProps } from '@/types/common';
import { Reveal } from './Reveal';

export function LatestNews() {
  const { data: newsData } = useGetNewsQuery({
    showOnHomepage: true,
  });

  const news: NewsProps[] = newsData?.data ?? [];

  if (news.length === 0) return null;

  return (
    <section className="nh-container pt-24 lg:pt-36">
      <Reveal>
        <p className="nh-label text-amberText">Bulletins</p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(2rem,4.6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em]">
            Latest News
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-fgMuted lg:text-right">
            Stay Updated with the Latest Trends and Insights in the Digital Nomad World
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-x-10 gap-y-12 border-t border-fg/15 pt-10 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item, idx) => (
          <Reveal key={item.id} delay={idx * 100}>
            <article>
              <p className="nh-label text-fgMuted">{formatISODatetoHumanReadable(item.date)}</p>
              <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-[-0.01em]">
                {item.title}
              </h3>
              <p className="mt-3 line-clamp-5 leading-relaxed text-fgMuted">{item.content}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
