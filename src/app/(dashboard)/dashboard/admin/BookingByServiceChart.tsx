"use client";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BookingByServiceChart() {
  const query: any = {};
  query["status"] = "available";

  const { data, isLoading } = useGetServicesQuery({ ...query });
  const { data: bookingData, isLoading: isBookingLoading } =
    useGetAllBookingsQuery({});

  const bookingByServiceData = data?.data?.data.map((data: any) => {
    return {
      id: data?.id,
      name: data?.serviceName,
      "Booking-Count": bookingData?.data?.data?.filter(
        (booking: any) => booking?.service?.id === data?.id
      ).length,
    };
  });

  return (
    <section className='border dark:border-neutral p-4 rounded'>
      <h3 className='font-medium text-secondary mb-4 text-center'>
        Bookings For Each Available Service
      </h3>
      {!isLoading && !isBookingLoading ? (
        <div className='h-96'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              width={500}
              height={300}
              data={bookingByServiceData}
              margin={{
                top: 5,
                right: 30,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} stroke={"var(--neutral)"} />
              <XAxis
                dataKey='name'
                stroke={"var(--neutral)"}
                fontSize={14}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(label) =>
                  label.length > 10 ? `${label.slice(0, 10)}...` : label
                }
              />
              <YAxis stroke={"var(--neutral)"} tickMargin={10} />
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Bar
                dataKey={"Booking-Count"}
                fill={"var(--primary)"}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </section>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-lightPrimary p-2 rounded text-secondary'>
        <p>{label}</p>
        <p className='text-center'>
          {payload[0].value < 2
            ? `${payload[0].value} Booking`
            : `${payload[0].value} Bookings`}{" "}
        </p>
      </div>
    );
  }

  return null;
};
