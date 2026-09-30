'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import { ServiceProps } from '@/types/common';
import { ArrowPictogram, ServicesPictogram, WifiPictogram } from './Pictograms';
import { SignHeader } from './SignHeader';

export const topServiceQuery = {
  limit: 3,
  page: 1,
  sortBy: 'popularity',
  sortOrder: 'desc',
  status: 'available',
};

export const upcomingServiceQuery = {
  limit: '3',
  page: 1,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  status: 'upcoming',
};

export function TopService() {
  const { data: serviceData, isFetching } = useGetServicesQuery({ ...topServiceQuery });
  const services: ServiceProps[] = serviceData?.data?.data ?? [];

  return (
    <section className="relative isolate pt-20 lg:pt-28">
      <WifiPictogram className="nh-pictogram-bg pointer-events-none absolute -left-[8vw] top-10 -z-10 size-[42vw]" />
      <div className="nh-container">
        <SignHeader
          Pictogram={ServicesPictogram}
          zone="Concourse A — now boarding"
          title="Our Top Services"
          subtitle="Discover our top-rated services designed to keep you connected, secure, and efficient wherever your journey takes you"
        />

        {isFetching ? (
          <div aria-busy="true" aria-label="Loading services" className="mt-10 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-lg bg-surface motion-reduce:animate-none" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service, idx) => (
              <GateCard key={service.id} data={service} gate={`A${idx + 1}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function GateCard({ data, gate }: { data: ServiceProps; gate: string }) {
  return (
    <Link
      href={`/services/${data.id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-surface ring-1 ring-ink/10 transition-colors hover:ring-ink/30 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-sign"
    >
      <figure className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={data.image}
          alt={data.serviceName}
          fill
          sizes="(min-width: 768px) 30vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* yellow fare tab */}
        <span className="absolute left-0 top-4 rounded-r-md bg-sign py-1.5 pl-4 pr-3 font-sign text-2xl font-extrabold leading-none text-onSign">
          ${data.price}
        </span>
        {/* gate number */}
        <span className="absolute right-3 top-3 flex flex-col items-center rounded-md bg-board px-2.5 py-1 text-sign">
          <span className="font-sign text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">Gate</span>
          <span className="font-sign text-2xl font-extrabold leading-none">{gate}</span>
        </span>
      </figure>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-sign text-3xl font-bold leading-none">{data.serviceName}</h3>
        <p className="mt-3 line-clamp-2 flex-1 text-inkMuted">{data.content}</p>
        <span className="mt-5 flex items-center justify-between border-t border-ink/15 pt-4 font-sign text-lg font-bold uppercase tracking-[0.06em]">
          Explore service
          <ArrowPictogram className="size-6 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function UpcomingService() {
  const { data: serviceData, isFetching } = useGetServicesQuery({ ...upcomingServiceQuery });
  const services: ServiceProps[] = serviceData?.data?.data ?? [];

  return (
    <section className="nh-container pt-20 lg:pt-28">
      <SignHeader
        Pictogram={ServicesPictogram}
        zone="Concourse B — delayed, coming soon"
        title="Our Upcoming Services"
        subtitle="Stay tuned for the latest innovations in nomad services, coming soon to make your adventures even more seamless"
      />

      {isFetching ? (
        <div aria-busy="true" aria-label="Loading upcoming services" className="mt-10 space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-surface motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {services.map((service) => (
            <li
              key={service.id}
              className="grid overflow-hidden rounded-lg bg-surface ring-1 ring-ink/10 sm:grid-cols-[12rem_1fr] lg:grid-cols-[14rem_1fr_auto]"
            >
              <figure className="relative aspect-[16/9] sm:aspect-auto">
                <Image
                  src={service.image}
                  alt={service.serviceName}
                  fill
                  sizes="(min-width: 640px) 14rem, 100vw"
                  className="object-cover grayscale-[40%]"
                />
              </figure>
              <div className="p-5">
                <p className="inline-flex items-center gap-2 rounded-sm bg-board px-2 py-1 font-sign text-sm font-bold uppercase tracking-[0.1em] text-wait">
                  <span aria-hidden="true" className="size-2 rounded-full bg-wait" />
                  Coming soon
                </p>
                <h3 className="mt-3 font-sign text-3xl font-bold leading-none">{service.serviceName}</h3>
                <p className="mt-2 text-inkMuted">{service.content}</p>
              </div>
              <div className="flex items-center justify-between gap-6 border-t border-ink/10 p-5 sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-end lg:justify-center lg:border-l lg:border-t-0 lg:px-8">
                <span className="font-sign text-sm font-semibold uppercase tracking-[0.14em] text-inkMuted">
                  Launching soon
                </span>
                <span className="font-sign text-4xl font-extrabold leading-none">${service.price}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
