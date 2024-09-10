import { dummyServices } from "@/constant/global";
import { CardVariantOne, CardVariantTwo } from "../ui/Cards";
import { HeaderText } from "../ui/Headers";

export function TopService() {
  const topService = dummyServices.filter((data) => data?.status === "active");
  return (
    <div className='container mx-auto my-16'>
      <HeaderText
        title='Our Top Services'
        subtitle='Discover our top-rated services designed to keep you connected, secure, and efficient wherever your journey takes you'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 2xl:px-0'>
        {topService.map((data) => (
          <CardVariantOne key={data?.id} data={data} />
        ))}
      </div>
    </div>
  );
}
export function UpcomingService() {
  const upcomingService = dummyServices.filter(
    (data) => data?.status === "upcoming"
  );
  return (
    <div className='container mx-auto my-16'>
      <HeaderText
        title='Our Upcoming Services'
        subtitle='Stay tuned for the latest innovations in nomad services, coming soon to make your adventures even more seamless'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 2xl:px-0'>
        {upcomingService.map((data) => (
          <CardVariantTwo key={data?.id} data={data} />
        ))}
      </div>
    </div>
  );
}
