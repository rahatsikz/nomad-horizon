'use client';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import { topServiceQuery, upcomingServiceQuery } from './Services';

const pad = (n?: number) => (typeof n === 'number' ? String(n).padStart(2, '0') : '––');

/** "06 services live · 03 launching · worldwide" — counts come from the API totals. */
export function LiveCounts() {
  const { data: live } = useGetServicesQuery({ ...topServiceQuery });
  const { data: upcoming } = useGetServicesQuery({ ...upcomingServiceQuery });

  const cells = [
    { value: pad(live?.data?.meta?.total), label: 'Services live', blink: true },
    { value: pad(upcoming?.data?.meta?.total), label: 'Launching' },
    { value: '∞', label: 'Worldwide' },
  ];

  return (
    <>
      {cells.map((cell, idx) => (
        <div
          key={cell.label}
          className={`nh-cell flex flex-col justify-between gap-6 px-4 py-5 md:col-span-2 ${idx === 0 ? 'nh-cell-no-left' : ''} ${idx === 2 ? 'col-span-2 md:col-span-2' : ''}`}
          style={{ '--d': `${240 + idx * 60}ms` } as React.CSSProperties}
        >
          <p
            className="nh-wipe flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
            style={{ '--d': `${1000 + idx * 100}ms` } as React.CSSProperties}
          >
            {cell.blink && <span aria-hidden="true" className="nh-blink size-2 bg-signal" />}
            {cell.label}
          </p>
          <p
            className="nh-wipe nh-wide text-5xl font-black leading-none tracking-[-0.03em] lg:text-6xl"
            style={{ '--d': `${1050 + idx * 100}ms` } as React.CSSProperties}
          >
            {cell.value}
          </p>
        </div>
      ))}
    </>
  );
}
