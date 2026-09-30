'use client';

import LoadingComponent from '@/components/ui/LoadingComponent';
import { useBookingCountByIntervalQuery } from '@/redux/api/bookingApi';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { getChartPalette } from '@/lib/chartTheme';
import { useEffect, useState } from 'react';

export default function BookingByDaysChart() {
  const { data, isLoading } = useBookingCountByIntervalQuery({});
  const { resolvedTheme } = useTheme();
  const palette = getChartPalette(resolvedTheme);
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
        color: palette.title,
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: palette.tooltipBg,
      borderColor: palette.line,
      textStyle: {
        color: palette.tooltipText,
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
        color: palette.axisLabel,
      },
      axisLine: {
        lineStyle: {
          color: palette.line,
        },
      },
    },
    yAxis: {
      type: 'value',
      minInterval: 1, // ensure integer y-axis
      axisLabel: {
        formatter: '{value}',
        color: palette.axisLabel,
      },
      splitLine: {
        lineStyle: {
          color: palette.line,
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
              { offset: 0, color: palette.accentFade },
              { offset: 1, color: palette.accentClear },
            ],
          },
        },
        lineStyle: { color: palette.accent, width: 3 },
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: palette.accent },
      },
    ],
  };

  if (isLoading) {
    return (
      <section className="flex h-96 items-center justify-center rounded-2xl border border-fg/10 bg-raised/40 p-4">
        <LoadingComponent />
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-fg/10 bg-raised/40 p-4">
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
