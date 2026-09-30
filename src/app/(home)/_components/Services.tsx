'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import { ServiceProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { Folio } from './Folio';

const pad = (n: number) => String(n).padStart(2, '0');

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
  const [feature, ...rest] = services;

  return (
    <section id="top-services" className="nh-container scroll-mt-24 pt-24 lg:pt-32">
      <Folio number="01" label="The essentials" />
      <header className="grid gap-6 pt-8 lg:grid-cols-12 lg:items-end">
        <h2 className="nh-soft font-display text-5xl font-light leading-[0.95] tracking-[-0.03em] sm:text-7xl lg:col-span-7">
          Our Top <em className="nh-wonk font-extrabold italic">Services</em>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-inkMuted lg:col-span-4 lg:col-start-9">
          Discover our top-rated services designed to keep you connected, secure, and efficient
          wherever your journey takes you
        </p>
      </header>

      {isFetching ? (
        <SpreadSkeleton />
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          {feature && <FeatureCard data={feature} index={1} />}
          {rest.length > 0 && (
            <div className="flex flex-col divide-y divide-ink/15 border-t border-ink/15 lg:col-span-5 lg:border-t-0">
              {rest.map((service, idx) => (
                <CompactCard key={service.id} data={service} index={idx + 2} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function FeatureCard({ data, index }: { data: ServiceProps; index: number }) {
  return (
    <Link
      href={`/services/${data.id}`}
      className="group block transition-transform duration-500 ease-out hover:-translate-y-1 lg:col-span-7"
    >
      <figure className="relative aspect-[4/3] overflow-hidden bg-paperAlt">
        <Image
          src={data.image}
          alt={data.serviceName}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          priority
        />
      </figure>
      <div className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
        <span className="font-meta text-xs text-terracottaInk">{pad(index)}</span>
        <div>
          <h3 className="nh-soft font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            {data.serviceName}
          </h3>
          <p className="mt-3 max-w-xl leading-relaxed text-inkMuted">{data.content}</p>
          <CardFooter price={data.price} />
        </div>
      </div>
    </Link>
  );
}

function CompactCard({ data, index }: { data: ServiceProps; index: number }) {
  return (
    <Link
      href={`/services/${data.id}`}
      className="group grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 py-6 transition-transform duration-500 ease-out first:pt-6 hover:-translate-y-1 lg:first:pt-0"
    >
      <figure className="relative aspect-[4/5] overflow-hidden bg-paperAlt">
        <Image
          src={data.image}
          alt={data.serviceName}
          fill
          sizes="(min-width: 1024px) 16vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </figure>
      <div className="flex flex-col">
        <span className="font-meta text-xs text-terracottaInk">{pad(index)}</span>
        <h3 className="nh-soft mt-3 font-display text-2xl leading-tight tracking-tight">
          {data.serviceName}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-inkMuted">{data.content}</p>
        <div className="mt-auto">
          <CardFooter price={data.price} compact />
        </div>
      </div>
    </Link>
  );
}

function CardFooter({ price, compact }: { price: number; compact?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-baseline justify-between gap-4 border-t border-ink/15',
        compact ? 'mt-4 pt-3' : 'mt-6 pt-4',
      )}
    >
      <span className="font-meta text-sm">
        ${price} <span className="text-[11px] text-inkMuted">USD</span>
      </span>
      <span className="text-sm font-medium text-terracottaInk">
        Explore service{' '}
        <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </div>
  );
}

function SpreadSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading services" className="mt-12 grid gap-12 lg:grid-cols-12">
      <div className="aspect-[4/3] animate-pulse bg-paperAlt motion-reduce:animate-none lg:col-span-7" />
      <div className="space-y-6 lg:col-span-5">
        <div className="aspect-[16/9] animate-pulse bg-paperAlt motion-reduce:animate-none" />
        <div className="aspect-[16/9] animate-pulse bg-paperAlt motion-reduce:animate-none" />
      </div>
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
    <section id="upcoming" className="nh-container scroll-mt-24 pt-24 lg:pt-32">
      <Folio number="02" label="Next issue" />
      <header className="flex flex-col gap-4 pt-8 md:flex-row md:items-end md:justify-between">
        <h2 className="nh-soft font-display text-4xl font-light leading-none tracking-[-0.02em] sm:text-5xl">
          Our Upcoming Services
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-inkMuted">
          Stay tuned for the latest innovations in nomad services, coming soon to make your
          adventures even more seamless
        </p>
      </header>

      {isFetching ? (
        <div aria-busy="true" aria-label="Loading upcoming services" className="mt-10 grid gap-8 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-[16/11] animate-pulse bg-paperAlt motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid border-t border-ink/15 md:grid-cols-3 md:divide-x md:divide-ink/15">
          {services.map((service) => (
            <UpcomingCard key={service.id} data={service} />
          ))}
        </div>
      )}
    </section>
  );
}

function UpcomingCard({ data }: { data: ServiceProps }) {
  return (
    <article className="group flex flex-col border-b border-ink/15 py-8 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0">
      <figure className="relative aspect-[16/11] overflow-hidden bg-paperAlt">
        <Image
          src={data.image}
          alt={data.serviceName}
          fill
          sizes="(min-width: 768px) 30vw, 100vw"
          className="object-cover opacity-80 grayscale sepia-[.25] transition duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-[40%]"
        />
      </figure>
      <p className="mt-5 flex items-center gap-2 font-meta text-[11px] uppercase tracking-[0.22em] text-terracottaInk">
        <span className="size-1.5 rounded-full bg-terracotta" />
        Coming soon
      </p>
      <h3 className="nh-soft mt-3 font-display text-2xl leading-tight">{data.serviceName}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-inkMuted">{data.content}</p>
      <div className="mt-6 flex items-baseline justify-between border-t border-ink/15 pt-3 font-meta text-xs">
        <span className="uppercase tracking-[0.18em] text-inkMuted">Launching soon</span>
        <span>
          ${data.price} <span className="text-[11px] text-inkMuted">USD</span>
        </span>
      </div>
    </article>
  );
}
