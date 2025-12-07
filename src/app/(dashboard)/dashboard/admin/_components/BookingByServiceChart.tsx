'use client';

import LoadingComponent from '@/components/ui/LoadingComponent';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useGetAllBookingsQuery } from '@/redux/api/bookingApi';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function BookingByServiceChart() {
  const query: any = {};
  query['status'] = 'available';

  const { data, isLoading } = useGetServicesQuery({ ...query });
  const { data: bookingData, isLoading: isBookingLoading } = useGetAllBookingsQuery({});

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isLargerDevice = useMediaQuery('(min-width: 1536px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bookingByServiceData = data?.data?.data.map((data: any) => {
    return {
      id: data?.id,
      name: data?.serviceName,
      'Booking-Count': bookingData?.data?.data?.filter(
        (booking: any) => booking?.service?.id === data?.id,
      ).length,
    };
  });

  // Sort descending and take top 15
  const sortedServiceCounts = bookingByServiceData
    ?.sort((a: any, b: any) => b['Booking-Count'] - a['Booking-Count'])
    .slice(0, 15);

  const serviceNames = sortedServiceCounts?.map((item: any) =>
    isLargerDevice && item.name.length > 25 ? item.name.slice(0, 25) + '…' : item.name,
  );

  const serviceCounts = sortedServiceCounts?.map((item: any) => item['Booking-Count']);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: resolvedTheme === 'dark' ? '#1F2937' : '#fff',
      borderColor: resolvedTheme === 'dark' ? '#374151' : '#E5E7EB',
      textStyle: {
        color: resolvedTheme === 'dark' ? '#F3F4F6' : '#111827',
      },
    },
    title: {
      text: 'Bookings For Each Available Service',
      left: 'center',
      textStyle: {
        color: resolvedTheme === 'dark' ? '#E5E7EB' : '#374151',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      minInterval: 1,
      axisLabel: {
        formatter: '{value}',
        color: resolvedTheme === 'dark' ? '#9CA3AF' : '#6B7280',
      },
      splitLine: {
        lineStyle: {
          color: resolvedTheme === 'dark' ? '#374151' : '#E5E7EB',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: serviceNames,
      axisLabel: {
        color: resolvedTheme === 'dark' ? '#9CA3AF' : '#6B7280',
        margin: 15,
        width: 150, // Limit width if labels are long
        overflow: 'truncate',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: resolvedTheme === 'dark' ? '#374151' : '#E5E7EB',
        },
      },
    },
    series: [
      {
        name: 'Total Bookings',
        type: 'bar',
        data: serviceCounts,
        itemStyle: { color: 'rgb(118, 171, 174)' },
        barWidth: '60%',
      },
    ],
  };

  if (isLoading || isBookingLoading) {
    return (
      <section className="border dark:border-neutral p-4 rounded h-96 flex items-center justify-center">
        <LoadingComponent />
      </section>
    );
  }

  return (
    <section className="border dark:border-neutral p-4 rounded">
      <div className="w-full">
        <ReactECharts
          theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
          option={option}
          style={{ height: '425px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
          notMerge={true}
          lazyUpdate={true}
          onChartReady={(chart) => {
            const handleResize = () => {
              chart.resize();
            };
            window.addEventListener('resize', handleResize);
          }}
        />
      </div>
    </section>
  );
}
