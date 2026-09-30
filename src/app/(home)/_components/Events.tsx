'use client';
import { cn } from '@/lib/utils';
import { EventCard } from '../../../components/ui/Cards';
import { HeaderText } from '../../../components/ui/Headers';
import { useGetEventsQuery } from '@/redux/api/eventApi';

export function Events() {
  const { data: eventData } = useGetEventsQuery({
    showOnHomepage: true,
  });

  const eventDataLength = eventData?.data?.length;

  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-nomadGray bg-[radial-gradient(circle_at_100%_0%,rgba(118,171,174,0.2),transparent_35%),rgb(var(--nomad-gray))] p-5 shadow-main sm:p-8">
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full border-[18px] border-nomadGray" />
      {eventDataLength > 0 && (
        <>
          <div className="relative">
            <HeaderText
              title="Upcoming Events"
              subtitle="Our exclusive upcoming events, designed to inspire and connect digital nomads from around the globe"
            />
            <div
              className={cn(
                'grid gap-4',
                eventDataLength > 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-1',
              )}
            >
              {eventData?.data?.slice(0, 2)?.map((data: any, idx: number) => (
                <EventCard key={idx} data={data} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
