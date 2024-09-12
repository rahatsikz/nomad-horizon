import { dummyEvent } from "@/constant/global";
import { EventCard } from "../ui/Cards";
import { HeaderText } from "../ui/Headers";

export function Events() {
  return (
    <div className='container mx-auto my-12 px-4 2xl:px-0'>
      <HeaderText
        title='Upcoming Events'
        subtitle='Our exclusive upcoming events, designed to inspire and connect digital nomads from around the globe'
      />
      <div className='grid lg:grid-cols-2 max-lg:divide-y-2 lg:divide-x-2 divide-neutral'>
        {dummyEvent.map((data, idx) => (
          <EventCard key={idx} data={data} />
        ))}
      </div>
    </div>
  );
}
