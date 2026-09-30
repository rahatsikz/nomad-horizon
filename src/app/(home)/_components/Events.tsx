'use client';
import { useGetEventsQuery } from '@/redux/api/eventApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { EventProps } from '@/types/common';
import { LegHeader } from './LegHeader';

export function Events() {
  const { data: eventData } = useGetEventsQuery({
    showOnHomepage: true,
  });

  const events: EventProps[] = eventData?.data?.slice(0, 2) ?? [];

  if (events.length === 0) return null;

  return (
    <section className="nh-container pt-24 lg:pt-32">
      <LegHeader
        leg="05"
        label="Itinerary"
        title="Upcoming Events"
        subtitle="Our exclusive upcoming events, designed to inspire and connect digital nomads from around the globe"
      />

      <ol className="relative mt-12 grid gap-6 lg:grid-cols-2">
        {/* dotted route linking the stops */}
        <span aria-hidden="true" className="absolute left-[25%] right-[25%] top-9 hidden border-t-2 border-dotted border-ink/40 lg:block" />
        {events.map((event, idx) => (
          <li key={event.id ?? idx} className="relative rounded-2xl border border-ink/20 bg-surface p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="relative z-10 flex size-6 items-center justify-center rounded-full border-2 border-ink bg-ground">
                <span className="size-2 rounded-full bg-signal" />
              </span>
              <p className="font-ticket text-[11px] uppercase tracking-[0.14em]">
                Stop {String(idx + 1).padStart(2, '0')} · {formatISODatetoHumanReadable(event.date)}
              </p>
            </div>
            <div className="mt-6 flex items-end gap-4">
              <p className="font-display text-6xl font-extrabold leading-none tracking-[-0.05em]">
                {event.city?.slice(0, 3).toUpperCase()}
              </p>
              <p className="pb-1 font-ticket text-[10px] uppercase tracking-[0.14em] text-inkMuted">
                {event.city}, {event.country}
              </p>
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.02em]">{event.title}</h3>
            <p className="mt-2 line-clamp-3 text-lg leading-relaxed text-inkMuted">{event.content}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
