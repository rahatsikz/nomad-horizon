'use client';
import { useGetEventsQuery } from '@/redux/api/eventApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { EventProps } from '@/types/common';
import { ArrowPictogram, CalendarPictogram } from './Pictograms';
import { SignHeader } from './SignHeader';

export function Events() {
  const { data: eventData } = useGetEventsQuery({
    showOnHomepage: true,
  });

  const events: EventProps[] = eventData?.data?.slice(0, 2) ?? [];

  if (events.length === 0) return null;

  return (
    <section className="nh-container pt-20 lg:pt-28">
      <SignHeader
        Pictogram={CalendarPictogram}
        zone="Connections"
        title="Upcoming Events"
        subtitle="Our exclusive upcoming events, designed to inspire and connect digital nomads from around the globe"
      />
      <ul className="mt-10 grid gap-4 lg:grid-cols-2">
        {events.map((event, idx) => {
          const [day, month, year] = formatISODatetoHumanReadable(event.date).split(' ');
          return (
            <li key={event.id ?? idx} className="flex overflow-hidden rounded-lg bg-surface ring-1 ring-ink/10">
              <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-board py-4 text-sign sm:w-28">
                <span className="font-sign text-5xl font-extrabold leading-none">{day}</span>
                <span className="font-sign text-sm font-bold uppercase tracking-[0.14em] text-white">{month}</span>
                <span className="font-sign text-xs font-semibold text-white/75">{year}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-sign text-2xl font-bold leading-tight">{event.title}</h3>
                <p className="line-clamp-2 text-inkMuted">{event.content}</p>
                <p className="mt-auto flex items-center gap-2 pt-2 font-sign text-base font-bold uppercase tracking-[0.06em]">
                  <ArrowPictogram className="size-5" />
                  {event.city}, {event.country}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
