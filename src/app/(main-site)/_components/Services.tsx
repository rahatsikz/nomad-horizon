'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import { ServiceProps } from '@/types/common';
import { Reveal } from '@/components/ui/Reveal';

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
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollReel = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.6,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="pt-24 lg:pt-36">
      <Reveal className="nh-container flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="nh-label text-amberText">Now showing</p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,6.4vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
            Our Top
            <br />
            Services
          </h2>
        </div>
        <div className="flex max-w-md flex-col gap-6 lg:items-end lg:text-right">
          <p className="text-lg leading-relaxed text-fgMuted">
            Discover our top-rated services designed to keep you connected, secure, and efficient
            wherever your journey takes you
          </p>
          <div className="flex gap-3">
            <ReelButton label="Scroll services left" onClick={() => scrollReel(-1)}>
              ←
            </ReelButton>
            <ReelButton label="Scroll services right" onClick={() => scrollReel(1)}>
              →
            </ReelButton>
          </div>
        </div>
      </Reveal>

      <div
        ref={scrollerRef}
        role="region"
        aria-label="Top services"
        tabIndex={0}
        className="nh-container mt-12 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto pb-4 [scrollbar-width:none] focus-visible:outline-none sm:scroll-px-6 lg:scroll-px-10 lg:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {isFetching
          ? [0, 1, 2].map((i) => (
              <div
                key={i}
                aria-hidden="true"
                className="aspect-[3/4] w-[78vw] shrink-0 animate-pulse bg-raised motion-reduce:animate-none sm:w-[24rem] lg:w-[30rem]"
              />
            ))
          : services.map((service, idx) => <PosterCard key={service.id} data={service} index={idx} />)}
      </div>
    </section>
  );
}

function ReelButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex size-12 items-center justify-center rounded-full border border-fg/25 text-lg transition-colors hover:border-amber hover:bg-amber hover:text-onAmber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
    >
      {children}
    </button>
  );
}

function PosterCard({ data, index }: { data: ServiceProps; index: number }) {
  return (
    <Link
      href={`/services/${data.id}`}
      className="group relative block aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden bg-film text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber sm:w-[24rem] lg:w-[30rem]"
    >
      <Image
        src={data.image}
        alt={data.serviceName}
        fill
        sizes="(min-width: 1024px) 30rem, (min-width: 640px) 24rem, 78vw"
        className="object-cover brightness-[0.62] saturate-[0.85] transition duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-film via-film/45 via-45% to-transparent" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-[10px] font-medium uppercase tracking-[0.3em] text-cream/80">
        <span>No. {pad(index + 1)}</span>
        {data.category && <span>{data.category}</span>}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-amber">
          ${data.price} <span className="text-cream/70">USD</span>
        </p>
        <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em] lg:text-4xl">
          {data.serviceName}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream/80">{data.content}</p>
        <span className="relative mt-5 inline-flex items-center gap-2 pb-1 text-sm font-normal after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-700 after:ease-out group-hover:after:scale-x-100">
          Explore service
          <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
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
    <section id="upcoming" className="nh-container scroll-mt-24 pt-24 lg:pt-36">
      <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <p className="nh-label text-amberText">Coming attractions</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em]">
            Our Upcoming <span className="font-accent font-normal normal-case italic tracking-[-0.01em]">Services</span>
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-fgMuted lg:col-span-5 lg:col-start-8">
          Stay tuned for the latest innovations in nomad services, coming soon to make your
          adventures even more seamless
        </p>
      </Reveal>

      {isFetching ? (
        <div aria-busy="true" aria-label="Loading upcoming services" className="mt-14 grid gap-8 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-[4/5] animate-pulse bg-raised motion-reduce:animate-none" />
          ))}
        </div>
      ) : (
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {services.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 120} className={idx === 1 ? 'md:mt-24' : idx === 2 ? 'md:mt-12' : undefined}>
              <UpcomingCard data={service} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

function UpcomingCard({ data }: { data: ServiceProps }) {
  return (
    <article className="group">
      <figure className="relative aspect-[4/5] overflow-hidden bg-film">
        <Image
          src={data.image}
          alt={data.serviceName}
          fill
          sizes="(min-width: 768px) 30vw, 100vw"
          className="object-cover opacity-80 grayscale transition duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
        />
        <span className="absolute left-4 top-4 rounded-full bg-amber px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-onAmber">
          Coming soon
        </span>
      </figure>
      <h3 className="mt-6 font-display text-2xl font-bold uppercase leading-tight tracking-[-0.02em]">
        {data.serviceName}
      </h3>
      <p className="mt-2 line-clamp-3 leading-relaxed text-fgMuted">{data.content}</p>
      <div className="mt-5 flex items-baseline justify-between border-t border-fg/15 pt-4">
        <span className="nh-label text-fgMuted">Launching soon</span>
        <span className="font-display text-xl font-bold">${data.price}</span>
      </div>
    </article>
  );
}
