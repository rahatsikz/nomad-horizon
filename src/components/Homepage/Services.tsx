"use client";
import { CardVariantOne, CardVariantTwo } from "../ui/Cards";
import { HeaderText } from "../ui/Headers";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import LoadingComponent from "../ui/LoadingComponent";
import { ServiceProps } from "@/types/common";

export function TopService() {
  const query: any = {};

  query["limit"] = "3";
  query["page"] = 1;

  query["sortBy"] = "popularity";
  query["sortOrder"] = "desc";

  query["status"] = "available";

  const { data: serviceData, isFetching } = useGetServicesQuery({ ...query });

  return (
    <div>
      <HeaderText
        title='Our Top Services'
        subtitle='Discover our top-rated services designed to keep you connected, secure, and efficient wherever your journey takes you'
      />
      <>
        {isFetching ? (
          <LoadingComponent />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 2xl:px-0'>
            {serviceData?.data?.data.map((data: ServiceProps) => (
              <CardVariantOne key={data?.id} data={data} />
            ))}
          </div>
        )}
      </>
    </div>
  );
}
export function UpcomingService() {
  const query: any = {};

  query["limit"] = "3";
  query["page"] = 1;

  query["sortBy"] = "createdAt";
  query["sortOrder"] = "desc";

  query["status"] = "upcoming";

  const { data: serviceData, isFetching } = useGetServicesQuery({ ...query });

  return (
    <div>
      <HeaderText
        title='Our Upcoming Services'
        subtitle='Stay tuned for the latest innovations in nomad services, coming soon to make your adventures even more seamless'
      />
      <>
        {isFetching ? (
          <LoadingComponent />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 2xl:px-0'>
            {serviceData?.data?.data.map((data: ServiceProps) => (
              <CardVariantTwo key={data?.id} data={data} />
            ))}
          </div>
        )}
      </>
    </div>
  );
}
