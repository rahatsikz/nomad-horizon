'use client';
import { useGetNewsQuery } from '@/redux/api/newsApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { NewsProps } from '@/types/common';
import { SpeakerPictogram } from './Pictograms';
import { SignHeader } from './SignHeader';

export function LatestNews() {
  const { data: newsData } = useGetNewsQuery({
    showOnHomepage: true,
  });

  const news: NewsProps[] = newsData?.data ?? [];

  if (news.length === 0) return null;

  return (
    <section className="nh-container pt-20 lg:pt-28">
      <SignHeader
        Pictogram={SpeakerPictogram}
        zone="Announcements"
        title="Latest News"
        subtitle="Stay Updated with the Latest Trends and Insights in the Digital Nomad World"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <article key={item.id} className="flex flex-col rounded-lg bg-surface p-5 ring-1 ring-ink/10 sm:p-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-sm bg-board px-2 py-1 font-sign text-sm font-bold uppercase tracking-[0.1em] text-sign">
              <SpeakerPictogram className="size-4" />
              {formatISODatetoHumanReadable(item.date)}
            </p>
            <h3 className="mt-4 font-sign text-2xl font-bold leading-tight">{item.title}</h3>
            <p className="mt-2 line-clamp-5 text-inkMuted">{item.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
