"use client";
import { cn } from "@/lib/utils";
import { EventCard } from "../ui/Cards";
import { HeaderText } from "../ui/Headers";
import { useGetEventsQuery } from "@/redux/api/eventApi";

export function Events() {
  const { data: eventData } = useGetEventsQuery({
    showOnHomepage: true,
  });

  const eventDataLength = eventData?.data?.length;

  return (
    <div>
      {eventDataLength > 0 && (
        <>
          <HeaderText
            title='Upcoming Events'
            subtitle='Our exclusive upcoming events, designed to inspire and connect digital nomads from around the globe'
          />
          <div
            className={cn(
              "grid dark:divide-neutral",
              eventDataLength > 1
                ? "lg:grid-cols-2 max-lg:divide-y-2 lg:divide-x-2"
                : "lg:grid-cols-1"
            )}
          >
            {eventData?.data?.slice(0, 2)?.map((data: any, idx: number) => (
              <EventCard key={idx} data={data} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
