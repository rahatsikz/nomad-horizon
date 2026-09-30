'use client';
import { useGetEventsQuery } from '@/redux/api/eventApi';
import { formatISODatetoHumanReadable } from '@/lib/utils';
import { EventProps } from '@/types/common';
import { Reveal } from '@/components/ui/Reveal';

export function Events() {
  const { data: eventData } = useGetEventsQuery({
    showOnHomepage: true,
  });

  const events: EventProps[] = eventData?.data?.slice(0, 2) ?? [];

  if (events.length === 0) return null;

  return (
    <section className="nh-container pt-24 lg:pt-36">
      <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="nh-label text-amberText">Premieres</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em]">
            Upcoming Events
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-fgMuted lg:text-right">
          Our exclusive upcoming events, designed to inspire and connect digital nomads from around
          the globe
        </p>
      </Reveal>

      <ol className="mt-12 border-t border-fg/15">
        {events.map((event, idx) => {
          const [day, month, year] = formatISODatetoHumanReadable(event.date).split(' ');
          return (
            <li key={event.id ?? idx} className="group border-b border-fg/15">
              <Reveal delay={idx * 100} className="grid gap-6 py-10 transition-colors md:grid-cols-12 md:items-center">
                <p className="flex items-baseline gap-3 md:col-span-3">
                  <span className="font-display text-6xl font-extrabold leading-none tracking-[-0.05em] transition-colors group-hover:text-amberText">
                    {day}
                  </span>
                  <span className="nh-label text-fgMuted">
                    {month} {year}
                  </span>
                </p>
                <div className="md:col-span-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[-0.02em] sm:text-3xl">{event.title}</h3>
                  <p className="mt-2 line-clamp-2 leading-relaxed text-fgMuted">{event.content}</p>
                </div>
                <p className="nh-label text-fgMuted md:col-span-3 md:text-right">
                  {event.city}, {event.country}
                </p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
