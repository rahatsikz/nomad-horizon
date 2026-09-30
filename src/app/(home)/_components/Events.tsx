'use client';
import { useGetEventsQuery } from '@/redux/api/eventApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { EventProps } from '@/types/common';
import { SectionHead } from './SectionHead';

export function Events() {
  const { data: eventData } = useGetEventsQuery({
    showOnHomepage: true,
  });

  const events: EventProps[] = eventData?.data?.slice(0, 2) ?? [];

  if (events.length === 0) return null;

  return (
    <section className="nh-container pt-16 lg:pt-24">
      <div className="border border-ink">
        <SectionHead
          index="06"
          title="Upcoming Events"
          note="Our exclusive upcoming events, designed to inspire and connect digital nomads from around the globe"
        />
        <ol>
          {events.map((event, idx) => {
            const [day, month, year] = formatISODatetoHumanReadable(event.date).split(' ');
            return (
              <li key={event.id ?? idx} className="grid border-b border-ink last:border-b-0 md:grid-cols-12">
                <p className="flex items-end gap-3 border-b border-ink p-5 md:col-span-3 md:flex-col md:items-start md:justify-between md:border-b-0 md:border-r lg:p-6">
                  <span className="nh-wide text-6xl font-black leading-[0.8] tracking-[-0.04em]">{day}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.14em]">
                    {month} {year}
                  </span>
                </p>
                <div className="p-5 md:col-span-6 lg:p-6">
                  <h3 className="nh-semi-wide text-2xl font-black uppercase leading-tight tracking-[-0.02em]">{event.title}</h3>
                  <p className="mt-2 line-clamp-3 leading-relaxed text-inkMuted">{event.content}</p>
                </div>
                <p className="border-t border-ink p-5 text-xs font-bold uppercase tracking-[0.14em] md:col-span-3 md:border-l md:border-t-0 lg:p-6">
                  {event.city}
                  <br />
                  <span className="text-inkMuted">{event.country}</span>
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
