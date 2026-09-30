'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import { ServiceProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { ArrowPictogram, PlanePictogram } from './Pictograms';
import { FlapText, useFlapClock } from './SplitFlap';
import { topServiceQuery, upcomingServiceQuery } from './Services';

// Column widths in flaps (each flap is 1em + 0.1em gap). Header and rows share one template so
// they align; keep the literal class below in sync with COLS (Tailwind needs it spelled out).
const COLS = { flight: 5, service: 24, destination: 8, status: 11, fare: 5 };
const gridTemplate =
  'lg:[grid-template-columns:calc(5*1.1em)_calc(24*1.1em)_calc(8*1.1em)_calc(11*1.1em)_calc(5*1.1em)_1fr]';

const ROW_STAGGER = 7;

type BoardRow = { service: ServiceProps; flight: string; live: boolean };

export function DepartureBoard() {
  const { data: live, isFetching: liveLoading } = useGetServicesQuery({ ...topServiceQuery });
  const { data: upcoming, isFetching: upcomingLoading } = useGetServicesQuery({ ...upcomingServiceQuery });

  const rows: BoardRow[] = [
    ...((live?.data?.data ?? []) as ServiceProps[]).map((service) => ({ service, live: true })),
    ...((upcoming?.data?.data ?? []) as ServiceProps[]).map((service) => ({ service, live: false })),
  ].map((row, idx) => ({ ...row, flight: `NH${String(101 + idx)}` }));

  const ready = !liveLoading && !upcomingLoading && rows.length > 0;
  const totalTicks = rows.length * ROW_STAGGER + COLS.service + 20;
  const tick = useFlapClock(ready, totalTicks);

  return (
    <section id="departures" className="nh-container scroll-mt-24 pt-6 lg:pt-10">
      <div className="overflow-hidden rounded-xl bg-board text-flapInk ring-1 ring-black/40">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-sign text-onSign">
              <PlanePictogram className="size-7 rotate-45" />
            </span>
            <div>
              <h2 className="font-sign text-3xl font-extrabold uppercase leading-none tracking-[0.02em] text-sign sm:text-4xl">
                Departures
              </h2>
              <p className="mt-1 font-sign text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
                Services from Nomad Horizon
              </p>
            </div>
          </div>
          <BoardClock />
        </header>

        <div className="px-3 pb-3 sm:px-6 sm:pb-5">
          <div
            aria-hidden="true"
            className={cn(
              'hidden gap-x-5 border-b border-white/10 py-3 font-sign text-sm font-semibold uppercase tracking-[0.14em] text-sign lg:grid lg:text-[13px] xl:text-[17px]',
              gridTemplate,
            )}
          >
            <span className="text-sm">Flight</span>
            <span className="text-sm">Service</span>
            <span className="text-sm">Destination</span>
            <span className="text-sm">Status</span>
            <span className="text-sm">Fare</span>
          </div>

          {!ready ? (
            <div aria-busy="true" aria-label="Loading departures" className="space-y-2 py-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-9 rounded-sm bg-flap/70" />
              ))}
            </div>
          ) : (
            <ul>
              {rows.map((row, idx) => {
                const start = idx * ROW_STAGGER;
                const status = row.live ? 'BOARDING' : 'COMING SOON';
                return (
                  <li key={row.service.id} className="border-b border-white/10 last:border-b-0">
                    <Link
                      href={`/services/${row.service.id}`}
                      className={cn(
                        'group grid grid-cols-2 items-center gap-x-5 gap-y-2 rounded-sm px-1 py-3 text-[12px] transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sign sm:text-[16px] lg:py-2.5 lg:text-[13px] xl:text-[17px]',
                        gridTemplate,
                      )}
                    >
                      <span className="sr-only">
                        {row.service.serviceName}, destination anywhere, {row.live ? 'boarding now' : 'coming soon'}, fare ${row.service.price}
                      </span>
                      <FlapText text={row.flight} width={COLS.flight} tick={tick} start={start} settle={start + 3} className="hidden lg:flex" />
                      <FlapText
                        text={row.service.serviceName}
                        width={COLS.service}
                        tick={tick}
                        start={start}
                        settle={start + 5}
                        className="col-span-2 lg:col-span-1"
                      />
                      <FlapText text="Anywhere" width={COLS.destination} tick={tick} start={start} settle={start + 9} className="hidden lg:flex" />
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className={cn('size-2 shrink-0 rounded-full lg:hidden', row.live ? 'nh-status-dot bg-go' : 'bg-wait')}
                        />
                        <FlapText
                          text={status}
                          width={COLS.status}
                          tick={tick}
                          start={start}
                          settle={start + 12}
                          className={row.live ? 'text-go' : 'text-wait'}
                        />
                      </span>
                      <FlapText
                        text={`$${row.service.price}`}
                        width={COLS.fare}
                        tick={tick}
                        start={start}
                        settle={start + 15}
                        className="justify-self-end text-sign lg:justify-self-start"
                      />
                      <span aria-hidden="true" className="hidden justify-self-end pr-2 text-sign lg:block">
                        <ArrowPictogram className="size-6 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function BoardClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="flex items-baseline gap-3 font-sign text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
      Local time
      <span className="font-board text-2xl tracking-normal text-sign" suppressHydrationWarning>
        {time ?? '--:--'}
      </span>
    </p>
  );
}
