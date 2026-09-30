'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import { ServiceProps } from '@/types/common';

/** Thin film strip of the top services along the bottom edge of the hero. */
export function FilmStrip() {
  const { data: serviceData } = useGetServicesQuery({
    limit: 3,
    page: 1,
    sortBy: 'popularity',
    sortOrder: 'desc',
    status: 'available',
  });
  const services: ServiceProps[] = serviceData?.data?.data ?? [];

  return (
    <div className="nh-fade-up bg-film/90 text-cream" style={{ animationDelay: '2200ms' }}>
      <div aria-hidden="true" className="nh-sprockets h-2.5" />
      <div className="nh-container flex items-center gap-6 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <p className="nh-label hidden shrink-0 text-cream/70 md:block">Reel 01 — Top services</p>
        <ul className="flex min-h-14 flex-1 gap-3 md:justify-end">
          {services.map((service, idx) => (
            <li key={service.id} className="shrink-0">
              <Link
                href={`/services/${service.id}`}
                className="group flex items-center gap-3 border border-cream/15 bg-cream/5 p-1.5 pr-4 transition-colors hover:border-amber/70"
              >
                <span className="relative block h-11 w-16 overflow-hidden">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover brightness-75 transition duration-500 group-hover:brightness-100"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-cream/60">
                    {String(idx + 1).padStart(2, '0')} · ${service.price}
                  </span>
                  <span className="text-sm font-normal">{service.serviceName}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden="true" className="nh-sprockets h-2.5" />
    </div>
  );
}
