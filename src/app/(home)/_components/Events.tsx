'use client';
import { useGetEventsQuery } from '@/redux/api/eventApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { EventProps } from '@/types/common';
import { Folio } from './Folio';

export function Events() {
  const { data: eventData } = useGetEventsQuery({
    showOnHomepage: true,
  });

  const events: EventProps[] = eventData?.data?.slice(0, 2) ?? [];

  if (events.length === 0) return null;

  return (
    <section className="nh-container pt-24 lg:pt-32">
      <Folio number="05" label="Gatherings" />
      <div className="grid gap-10 pt-8 lg:grid-cols-12">
        <header className="lg:col-span-4">
          <h2 className="nh-soft font-display text-4xl font-light leading-none tracking-[-0.02em] sm:text-5xl">
            Upcoming Events
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-inkMuted">
            Our exclusive upcoming events, designed to inspire and connect digital nomads from around
            the globe
          </p>
        </header>

        <ol className="divide-y divide-ink/15 border-y border-ink/15 lg:col-span-8">
          {events.map((event, idx) => {
            const [day, month, year] = formatISODatetoHumanReadable(event.date).split(' ');
            return (
              <li key={event.id ?? idx} className="grid gap-5 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8">
                <p className="flex items-baseline gap-2 sm:flex-col sm:gap-0">
                  <span className="nh-soft font-display text-6xl font-light leading-none">{day}</span>
                  <span className="font-meta text-[11px] uppercase tracking-[0.2em] text-inkMuted">
                    {month} {year}
                  </span>
                </p>
                <div>
                  <h3 className="nh-soft font-display text-2xl leading-tight sm:text-3xl">{event.title}</h3>
                  <p className="mt-3 line-clamp-3 leading-relaxed text-inkMuted">{event.content}</p>
                  <p className="mt-4 font-meta text-[11px] uppercase tracking-[0.2em] text-terracottaInk">
                    {event.city}, {event.country}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
