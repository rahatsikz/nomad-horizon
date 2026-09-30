'use client';
import { CardVariantOne, CardVariantTwo } from '../../../components/ui/Cards';
import { HeaderText } from '../../../components/ui/Headers';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import LoadingComponent from '../../../components/ui/LoadingComponent';
import { ServiceProps } from '@/types/common';

export function TopService() {
  const query = {
    limit: 3,
    page: 1,
    sortBy: 'popularity',
    sortOrder: 'desc',
    status: 'available',
  };

  const { data: serviceData, isFetching } = useGetServicesQuery({ ...query });

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(118,171,174,0.2),transparent_34%),linear-gradient(135deg,rgba(241,245,249,0.8),rgba(253,253,253,0.96))] px-5 py-8 dark:bg-[radial-gradient(circle_at_top_right,rgba(118,171,174,0.18),transparent_34%),linear-gradient(135deg,rgba(31,41,55,0.98),rgba(34,40,49,1))] md:px-10 md:py-10 border border-nomadGray">
      <div className="pointer-events-none absolute -left-16 -top-16 -z-10 h-44 w-44 rounded-full border-[18px] border-slate-200 dark:border-nomadGray" />
      <HeaderText
        title="Our Top Services"
        subtitle="Discover our top-rated services designed to keep you connected, secure, and efficient wherever your journey takes you"
      />
      <>
        {isFetching ? (
          <LoadingComponent />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {serviceData?.data?.data.map((data: ServiceProps) => (
              <CardVariantOne key={data?.id} data={data} className="last:md:max-lg:col-span-full" />
            ))}
          </div>
        )}
      </>
    </section>
  );
}
export function UpcomingService() {
  const query: any = {};

  query['limit'] = '3';
  query['page'] = 1;

  query['sortBy'] = 'createdAt';
  query['sortOrder'] = 'desc';

  query['status'] = 'upcoming';

  const { data: serviceData, isFetching } = useGetServicesQuery({ ...query });

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_bottom_left,rgba(34,40,49,0.08),transparent_38%),linear-gradient(135deg,rgba(253,253,253,0.98),rgba(241,245,249,0.86))] px-5 py-8 dark:bg-[radial-gradient(circle_at_bottom_left,rgba(118,171,174,0.16),transparent_38%),linear-gradient(135deg,rgba(34,40,49,1),rgba(31,41,55,0.98))] md:px-10 md:py-10 border border-nomadGray">
      <div className="pointer-events-none absolute -bottom-20 -right-14 -z-10 h-48 w-48 rotate-12 border-[18px] border-slate-200 dark:border-nomadGray" />
      <HeaderText
        title="Our Upcoming Services"
        subtitle="Stay tuned for the latest innovations in nomad services, coming soon to make your adventures even more seamless"
      />
      <>
        {isFetching ? (
          <LoadingComponent />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {serviceData?.data?.data.map((data: ServiceProps) => (
              <CardVariantTwo key={data?.id} data={data} className="last:md:max-lg:col-span-full" />
            ))}
          </div>
        )}
      </>
    </section>
  );
}
