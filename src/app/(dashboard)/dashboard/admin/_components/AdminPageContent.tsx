"use client";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { useAppSelector } from "@/redux/hooks";
import BookingByServiceChart from "./BookingByServiceChart";
import BookingByDaysChart from "./BookingByDaysChart";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { useGetAllCustomersQuery } from "@/redux/api/userApi";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";

export default function AdminPageContent() {
  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;

  const { username, isFetching } = useLoggedUserInfo(accessToken);

  const { data: customerData, isLoading: isCustomerLoading } =
    useGetAllCustomersQuery({});
  const { data: serviceData, isLoading: isServiceLoading } =
    useGetServicesQuery({
      status: "available",
    });
  const { data: bookingData, isLoading: isBookingLoading } =
    useGetAllBookingsQuery({
      bookingStatus: "processing",
    });

  const statsArr = [
    {
      label: "Active Customers",
      value: customerData?.data?.length,
      loadingStatus: isCustomerLoading,
    },
    {
      label: "Available Services",
      value: serviceData?.data?.data?.length,
      loadingStatus: isServiceLoading,
    },
    {
      label: "Recent Bookings",
      value: bookingData?.data?.data?.length,
      loadingStatus: isBookingLoading,
    },
  ];

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <section className='h-full px-6 py-4 lg:py-2 space-y-6'>
      <div>
        <p className='nh-label text-amberText'>Site overview</p>
        <h2 className='mt-3 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] sm:text-4xl'>
          Welcome{" "}
          <span className='font-accent font-normal normal-case italic tracking-normal text-amberText'>
            {username}
          </span>
        </h2>
        <p className='mt-2 text-fgMuted'>Have a look at your Admin dashboard</p>
      </div>
      {/* stats */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {statsArr.map((data) => (
          <StatsCard key={data.label} data={data} />
        ))}
      </div>
      {/*charts  */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
        <BookingByServiceChart />
        <BookingByDaysChart />
      </div>
    </section>
  );
}

const StatsCard = ({
  data,
}: {
  data: {
    label: string;
    value: number;
    loadingStatus: boolean;
  };
}) => {
  return (
    <div className='rounded-2xl border border-fg/10 bg-raised/40 px-6 py-6'>
      {data.loadingStatus ? (
        <p className='text-sm text-fgMuted'>
          Data coming from the server...
        </p>
      ) : (
        <div className='flex items-end justify-between gap-6'>
          <p className='nh-label max-w-24 text-fgMuted'>{data.label}</p>
          <span className='font-display text-6xl font-extrabold leading-none tracking-[-0.05em]'>
            {data.value.toString().length < 2 ? `0${data.value}` : data.value}
          </span>
        </div>
      )}
    </div>
  );
};
