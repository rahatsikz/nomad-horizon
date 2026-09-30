'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import { ServiceProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

const pad = (n: number) => String(n).padStart(2, '0');

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

/** Image that follows the pointer while a table row is hovered (fine pointers only). */
function useCursorPreview() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const move = (event: React.MouseEvent) => {
    const preview = previewRef.current;
    if (!preview) return;
    const x = Math.min(event.clientX + 28, window.innerWidth - preview.offsetWidth - 16);
    const y = Math.max(16, event.clientY - preview.offsetHeight / 2);
    preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return { previewRef, active, setActive, move };
}

function CursorPreview({
  services,
  active,
  previewRef,
}: {
  services: ServiceProps[];
  active: number | null;
  previewRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={previewRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/3] w-72 border border-ink bg-paper [@media(pointer:fine)]:lg:block',
        active === null ? 'invisible' : 'visible',
      )}
    >
      {services.map((service, idx) => (
        <Image
          key={service.id}
          src={service.image}
          alt=""
          fill
          sizes="18rem"
          className={cn('object-cover', active === idx ? 'opacity-100' : 'opacity-0')}
        />
      ))}
    </div>
  );
}

export function TopService() {
  const { data: serviceData, isFetching } = useGetServicesQuery({ ...topServiceQuery });
  const services: ServiceProps[] = serviceData?.data?.data ?? [];
  const { previewRef, active, setActive, move } = useCursorPreview();

  return (
    <section className="nh-container pt-16 lg:pt-24">
      <div className="border border-ink">
        <SectionHead
          index="02"
          title="Our Top Services"
          note="Discover our top-rated services designed to keep you connected, secure, and efficient wherever your journey takes you"
          aside={<p className="text-xs font-bold uppercase tracking-[0.12em]">Index — sorted by popularity</p>}
        />

        <TableHeader columns={['No.', 'Service', 'Description', 'Price', '']} />

        {isFetching ? (
          <RowSkeleton />
        ) : (
          <ul onMouseMove={move} onMouseLeave={() => setActive(null)}>
            {services.map((service, idx) => (
              <li key={service.id} className="border-b border-ink last:border-b-0" onMouseEnter={() => setActive(idx)}>
                <Link
                  href={`/services/${service.id}`}
                  onFocus={() => setActive(null)}
                  className="nh-focus group grid grid-cols-6 md:grid-cols-12 md:items-stretch hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper"
                >
                  <span className="col-span-1 border-r border-current px-3 py-5 text-sm font-bold md:col-span-1">
                    {pad(idx + 1)}
                  </span>
                  <span className="nh-semi-wide col-span-5 flex items-center px-4 py-5 text-2xl font-black uppercase leading-[0.95] tracking-[-0.02em] md:col-span-4 lg:text-3xl">
                    {service.serviceName}
                  </span>
                  <span className="relative col-span-6 aspect-[16/9] border-y border-current md:hidden">
                    <Image src={service.image} alt="" fill sizes="100vw" className="object-cover" />
                  </span>
                  <span className="col-span-6 px-4 py-4 text-sm leading-relaxed text-inkMuted group-hover:text-paper/80 group-focus-visible:text-paper/80 md:col-span-3 md:flex md:items-center md:py-5">
                    {service.content}
                  </span>
                  <span className="col-span-4 flex items-end px-4 pb-4 text-[clamp(3.25rem,5.6vw,6rem)] font-black leading-[0.8] tracking-[-0.04em] md:col-span-3 md:items-center md:justify-end md:py-5">
                    <span className="self-start pt-[0.1em] text-[0.32em]">$</span>
                    {service.price}
                  </span>
                  <span className="col-span-2 flex items-center justify-center border-l border-current text-4xl font-light md:col-span-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <CursorPreview services={services} active={active} previewRef={previewRef} />
    </section>
  );
}

function TableHeader({ columns }: { columns: string[] }) {
  const spans = ['md:col-span-1', 'md:col-span-4', 'md:col-span-3', 'md:col-span-3 md:text-right', 'md:col-span-1'];
  return (
    <div aria-hidden="true" className="hidden grid-cols-12 border-b border-ink text-[11px] font-bold uppercase tracking-[0.14em] text-inkMuted md:grid">
      {columns.map((column, idx) => (
        <span key={idx} className={cn('px-4 py-2 first:border-r first:border-ink first:px-3 last:border-l last:border-ink', spans[idx])}>
          {column}
        </span>
      ))}
    </div>
  );
}

function RowSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading services">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-28 animate-pulse border-b border-ink bg-ink/5 last:border-b-0 motion-reduce:animate-none" />
      ))}
    </div>
  );
}

export function UpcomingService() {
  const { data: serviceData, isFetching } = useGetServicesQuery({ ...upcomingServiceQuery });
  const services: ServiceProps[] = serviceData?.data?.data ?? [];
  const { previewRef, active, setActive, move } = useCursorPreview();

  return (
    <section className="nh-container pt-16 lg:pt-24">
      <div className="border border-ink">
        <SectionHead
          index="03"
          title="Our Upcoming Services"
          note="Stay tuned for the latest innovations in nomad services, coming soon to make your adventures even more seamless"
          aside={<p className="text-xs font-bold uppercase tracking-[0.12em]">Status — launching soon</p>}
        />

        <TableHeader columns={['No.', 'Service', 'Description', 'Price', '']} />

        {isFetching ? (
          <RowSkeleton />
        ) : (
          <ul onMouseMove={move} onMouseLeave={() => setActive(null)}>
            {services.map((service, idx) => (
              <li
                key={service.id}
                onMouseEnter={() => setActive(idx)}
                className="grid grid-cols-6 border-b border-ink last:border-b-0 md:grid-cols-12"
              >
                <span className="col-span-1 border-r border-ink px-3 py-5 text-sm font-bold text-inkMuted">{pad(idx + 1)}</span>
                <span className="col-span-5 flex flex-wrap items-center gap-3 px-4 py-5 md:col-span-4">
                  <span className="nh-semi-wide text-2xl font-black uppercase leading-[0.95] tracking-[-0.02em] text-inkMuted lg:text-3xl">
                    {service.serviceName}
                  </span>
                  <span className="bg-signal px-2 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-onSignal">
                    Soon
                  </span>
                </span>
                <span className="relative col-span-6 aspect-[16/9] border-y border-ink grayscale md:hidden">
                  <Image src={service.image} alt="" fill sizes="100vw" className="object-cover" />
                </span>
                <span className="col-span-6 px-4 py-4 text-sm leading-relaxed text-inkMuted md:col-span-3 md:flex md:items-center md:py-5">
                  {service.content}
                </span>
                <span className="col-span-4 flex items-end px-4 pb-4 text-[clamp(3.25rem,5.6vw,6rem)] font-black leading-[0.8] tracking-[-0.04em] text-inkMuted line-through decoration-[3px] md:col-span-3 md:items-center md:justify-end md:py-5">
                  <span className="sr-only">Price when launched: </span>
                  <span className="self-start pt-[0.1em] text-[0.32em] no-underline">$</span>
                  {service.price}
                </span>
                <span className="col-span-2 flex items-center justify-center border-l border-ink px-2 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-inkMuted md:col-span-1">
                  Launching soon
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <CursorPreview services={services} active={active} previewRef={previewRef} />
    </section>
  );
}
