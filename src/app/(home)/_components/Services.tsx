'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import { ServiceProps } from '@/types/common';
import { LegHeader } from './LegHeader';

const pad = (n: number) => String(n).padStart(2, '0');

/** Three-letter "airport" code derived from the service name, e.g. Remote Internet Setup → RIS. */
function routeCode(name: string) {
  const words = name.replace(/[^A-Za-z ]/g, '').trim().split(/\s+/);
  const initials = words.map((w) => w[0]).join('');
  const tail = words[words.length - 1].slice(1).replace(/[aeiou]/gi, '');
  return (initials.length >= 3 ? initials : initials + tail).slice(0, 3).toUpperCase();
}

export function TopService() {
  const query = {
    limit: 3,
    page: 1,
    sortBy: 'popularity',
    sortOrder: 'desc',
    status: 'available',
  };

  const { data: serviceData, isFetching } = useGetServicesQuery({ ...query });
  const services: ServiceProps[] = serviceData?.data?.data ?? [];

  return (
    <section className="nh-container pt-10 lg:pt-14">
      <LegHeader
        leg="01"
        label="Departures — boarding now"
        title="Our Top Services"
        subtitle="Discover our top-rated services designed to keep you connected, secure, and efficient wherever your journey takes you"
      />

      {isFetching ? (
        <div aria-busy="true" aria-label="Loading services" className="mt-12 space-y-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-56 animate-pulse rounded-2xl border border-dashed border-ink/25 bg-surface/60 motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <div className="mt-12 space-y-6 lg:space-y-8">
          {services.map((service, idx) => (
            <BoardingPass key={service.id} data={service} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
}

function BoardingPass({ data, index }: { data: ServiceProps; index: number }) {
  const code = routeCode(data.serviceName);

  return (
    <Link
      href={`/services/${data.id}`}
      className="nh-pass nh-slide-up group grid focus-visible:outline-none md:grid-cols-[minmax(0,1fr)_15rem] lg:grid-cols-[minmax(0,1fr)_17rem]"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="grid overflow-hidden rounded-t-2xl border border-b-0 border-ink/20 bg-surface group-focus-visible:border-signal sm:grid-cols-[12rem_minmax(0,1fr)] md:rounded-l-2xl md:rounded-tr-none md:border-b md:border-r-0 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <figure className="relative aspect-[16/9] overflow-hidden sm:aspect-auto">
          <Image
            src={data.image}
            alt={data.serviceName}
            fill
            sizes="(min-width: 1024px) 17rem, (min-width: 640px) 12rem, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-surface px-2.5 py-1 font-ticket text-[9px] uppercase tracking-[0.14em]">
            Seat {pad(index + 1)}A
          </span>
        </figure>

        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between font-ticket text-[10px] uppercase tracking-[0.16em] text-inkMuted">
            <span>Nomad Horizon · Boarding pass</span>
            <span className="hidden sm:inline">NH-{pad(index + 1)}</span>
          </div>

          <div className="flex items-end gap-4 sm:gap-6">
            <div>
              <p className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] sm:text-5xl">{code}</p>
              <p className="mt-1 font-ticket text-[9px] uppercase tracking-[0.14em] text-inkMuted">From · you</p>
            </div>
            <div className="relative mb-5 flex-1 border-t-2 border-dotted border-ink/40">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-1/2 top-0 size-5 -translate-x-1/2 -translate-y-1/2 bg-surface fill-ink">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="rotate(90 12 12)" />
              </svg>
            </div>
            <div className="text-right">
              <p className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] sm:text-5xl">ANY</p>
              <p className="mt-1 font-ticket text-[9px] uppercase tracking-[0.14em] text-inkMuted">To · anywhere</p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">{data.serviceName}</h3>
            <p className="mt-1 line-clamp-2 text-inkMuted">{data.content}</p>
          </div>

          <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-dashed border-ink/25 pt-4 font-ticket text-[10px] uppercase tracking-[0.12em]">
            <PassField label="Class" value={data.category ?? 'Standard'} />
            <PassField label="Gate" value={`NH${index + 1}`} />
            <PassField label="Status" value="Boarding" highlight />
          </dl>
        </div>
      </div>

      <div className="nh-pass-stub flex flex-col gap-4 rounded-b-2xl border border-ink/20 bg-surface p-5 [border-top-style:dashed] [border-top-width:2px] sm:p-6 md:rounded-bl-none md:rounded-r-2xl md:[border-left-style:dashed] md:[border-left-width:2px] md:[border-top-style:solid] md:[border-top-width:1px]">
        <div className="flex items-start justify-between gap-4 md:flex-col md:items-stretch">
          <div>
            <p className="font-ticket text-[10px] uppercase tracking-[0.16em] text-inkMuted">Fare</p>
            <p className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] lg:text-6xl">
              ${data.price}
              <span className="ml-1 font-ticket text-xs font-normal tracking-normal text-inkMuted">USD</span>
            </p>
          </div>
          <p className="font-ticket text-xs uppercase tracking-[0.14em] md:mt-1">
            {code} <span className="text-signalText">→</span> ANY
          </p>
        </div>
        <div aria-hidden="true" className="nh-barcode h-10 w-full opacity-80" />
        <span className="mt-auto inline-flex items-center justify-between gap-2 rounded-full bg-signal px-4 py-2.5 font-display font-bold text-onSignal">
          Explore service
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function PassField({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <dt className="text-inkMuted">{label}</dt>
      <dd className={highlight ? 'mt-1 font-medium text-signalText' : 'mt-1 font-medium'}>{value}</dd>
    </div>
  );
}

export function UpcomingService() {
  const query: any = {};

  query['limit'] = '3';
  query['page'] = 1;

  query['sortBy'] = 'createdAt';
  query['sortOrder'] = 'desc';

  query['status'] = 'upcoming';

  const { data: serviceData, isFetching } = useGetServicesQuery({ ...query });
  const services: ServiceProps[] = serviceData?.data?.data ?? [];

  return (
    <section className="nh-container overflow-x-clip pt-24 lg:pt-32">
      <LegHeader
        leg="02"
        label="Checked luggage — arriving soon"
        title="Our Upcoming Services"
        subtitle="Stay tuned for the latest innovations in nomad services, coming soon to make your adventures even more seamless"
      />

      {isFetching ? (
        <div aria-busy="true" aria-label="Loading upcoming services" className="mt-14 grid gap-10 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="nh-tag-shape h-[28rem] animate-pulse bg-tag motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-3">
          {services.map((service, idx) => (
            <LuggageTag key={service.id} data={service} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
}

const tagTilt = ['-2deg', '1.5deg', '-1deg'];

function LuggageTag({ data, index }: { data: ServiceProps; index: number }) {
  return (
    <article
      className="nh-slide-up nh-tag-hang group relative pt-12"
      style={{ animationDelay: `${index * 130}ms`, ['--nh-tilt' as string]: tagTilt[index % 3] }}
    >
      {/* the string, threaded through the eyelet */}
      <svg aria-hidden="true" viewBox="0 0 60 80" className="absolute left-1/2 top-0 z-10 h-20 w-14 -translate-x-1/2 text-inkMuted" fill="none">
        <path d="M30 76 C 26 50, 44 30, 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 76 C 36 52, 16 28, 38 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <div className="nh-tag-shape bg-ink/25 p-px">
        <div className="nh-tag-shape relative bg-tag px-5 pb-6 pt-14 sm:px-6">
          <span aria-hidden="true" className="absolute left-1/2 top-5 size-6 -translate-x-1/2 rounded-full bg-ground ring-4 ring-ink/15" />

          <div className="flex items-center justify-between font-ticket text-[10px] uppercase tracking-[0.14em] text-inkMuted">
            <span>Tag Nº {pad(index + 1)}</span>
            <span>Handle with care</span>
          </div>

          <figure className="relative mt-4 aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={data.image}
              alt={data.serviceName}
              fill
              sizes="(min-width: 768px) 30vw, 100vw"
              className="object-cover grayscale-[35%] sepia-[.2] transition duration-700 group-hover:grayscale-0 group-hover:sepia-0"
            />
          </figure>

          <span
            className="nh-stamp absolute right-4 top-[45%] z-10 rounded-md border-[3px] border-double border-signalText bg-tag/70 px-3 py-1.5 font-ticket text-[11px] font-bold uppercase tracking-[0.18em] text-signalText"
            style={{ animationDelay: `${600 + index * 150}ms` }}
          >
            Coming soon
          </span>

          <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em]">
            {data.serviceName}
          </h3>
          <p className="mt-2 line-clamp-3 text-inkMuted">{data.content}</p>

          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-dashed border-ink/30 pt-4 font-ticket text-[10px] uppercase tracking-[0.12em]">
            <div>
              <dt className="text-inkMuted">Status</dt>
              <dd className="mt-1 font-medium">Launching soon</dd>
            </div>
            <div className="text-right">
              <dt className="text-inkMuted">Fare</dt>
              <dd className="mt-1 font-display text-2xl font-extrabold normal-case tracking-[-0.02em]">
                ${data.price}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}
