'use client';

import LoadingComponent from '@/components/ui/LoadingComponent';
import { useBookingCountByIntervalQuery } from '@/redux/api/bookingApi';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function BookingByDaysChart() {
  const { data, isLoading } = useBookingCountByIntervalQuery({});
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Transform the API data for the chart
  const chartData = data?.data || [];
  const days = chartData.map((item: any) => item.dayCount);
  const counts = chartData.map((item: any) => item.bookingCountInInterval);
  const totalDays = chartData.length > 0 ? chartData[chartData.length - 1]?.dayCount : 0;

  const option = {
    backgroundColor: 'transparent',
    title: {
      text: `Bookings Count Across Service for last ${totalDays} days`,
      left: 'center',
      textStyle: {
        color: resolvedTheme === 'dark' ? '#E5E7EB' : '#374151', // text-gray-200 : text-gray-700
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: resolvedTheme === 'dark' ? '#1F2937' : '#fff',
      borderColor: resolvedTheme === 'dark' ? '#374151' : '#E5E7EB',
      textStyle: {
        color: resolvedTheme === 'dark' ? '#F3F4F6' : '#111827',
      },
      formatter: (params: any) => {
        const item = params[0];
        return `${item.marker} ${item.seriesName}: ${item.value}`;
      },
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '18%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: days,
      axisLabel: {
        show: true,
        // interval: 0, // Show all labels if manageable, or let standard be 'money'
        color: resolvedTheme === 'dark' ? '#9CA3AF' : '#6B7280',
      },
      axisLine: {
        lineStyle: {
          color: resolvedTheme === 'dark' ? '#374151' : '#E5E7EB',
        },
      },
    },
    yAxis: {
      type: 'value',
      minInterval: 1, // ensure integer y-axis
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
    series: [
      {
        name: 'Bookings',
        data: counts,
        type: 'line',
        smooth: 0.5,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(118, 171, 174, 0.5)' },
              { offset: 1, color: 'rgba(118, 171, 174, 0)' },
            ],
          },
        },
        lineStyle: { color: 'rgb(118, 171, 174)', width: 3 },
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: 'rgb(118, 171, 174)' },
      },
    ],
  };

  if (isLoading) {
    return (
      <section className="border dark:border-neutral p-4 rounded h-96 flex items-center justify-center">
        <LoadingComponent />
      </section>
    );
  }

  return (
    <section className="border dark:border-neutral p-4 rounded">
      <div className="w-full h-full">
        <ReactECharts
          theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
          option={option}
          style={{ height: '430px', width: '100%' }}
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
