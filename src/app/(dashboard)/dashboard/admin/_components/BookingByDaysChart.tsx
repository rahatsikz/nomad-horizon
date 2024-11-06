import LoadingComponent from "@/components/ui/LoadingComponent";
import { useBookingCountByIntervalQuery } from "@/redux/api/bookingApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BookingByDaysChart() {
  const { data, isLoading } = useBookingCountByIntervalQuery({});

  return (
    <section className='border dark:border-neutral p-4 rounded'>
      <h3 className='font-medium text-secondary mb-4 text-center'>
        Bookings Count Across Service for last{" "}
        {data?.data[data?.data?.length - 1]?.dayCount} days
      </h3>
      {!isLoading ? (
        <div className='h-96'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              width={500}
              height={300}
              data={data?.data}
              margin={{
                top: 5,
                right: 30,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} stroke={"var(--neutral)"} />
              <XAxis
                dataKey='dayCount'
                tickMargin={10}
                stroke={"var(--neutral)"}
              />
              <YAxis
                stroke={"var(--neutral)"}
                tickMargin={10}
                interval={0}
                allowDecimals={false}
              />
              <Tooltip content={CustomTooltip} />

              <Line
                type='monotone'
                dataKey='bookingCountInInterval'
                stroke='var(--primary)'
              />
            </LineChart>
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
}: {
  active?: boolean;
  payload?: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-lightPrimary p-2 rounded text-secondary'>
        <p className='text-center'>
          {payload[0].value < 2
            ? `${payload[0].value} Booking`
            : `${payload[0].value} Bookings`}
        </p>
      </div>
    );
  }

  return null;
};
