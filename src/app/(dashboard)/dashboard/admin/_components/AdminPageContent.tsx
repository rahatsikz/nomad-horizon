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
      <div className='flex justify-center w-full items-center'>
        <h2 className='text-2xl text-secondary w-full text-center'>
          Welcome <span className='text-primary'>{username}</span> <br /> Have a
          look at your Admin dashboard
        </h2>
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
    <div className='border dark:border-neutral px-4 py-6 rounded'>
      {data.loadingStatus ? (
        <p className='text-neutral text-sm text-center'>
          Data coming from the server...
        </p>
      ) : (
        <div className='flex justify-between items-center gap-8 max-w-56 mx-auto'>
          <span className='text-5xl'>
            {data.value.toString().length < 2 ? `0${data.value}` : data.value}
          </span>
          <p className='max-w-14 mx-auto'>{data.label}</p>
        </div>
      )}
    </div>
  );
};
