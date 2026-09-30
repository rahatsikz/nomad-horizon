'use client';
import { CloseSidebarIcon, OpenSidebarIcon } from '@/assets/svgs/heroIcons';
import { Button } from '@/components/ui/Button';
import { CardVariantThree } from '@/components/ui/Cards';
import Form from '@/components/ui/Form';
import { PageHero } from '@/components/ui/Headers';
import Input from '@/components/ui/Input';
import LoadingComponent, { SkeletonServiceLoading } from '@/components/ui/LoadingComponent';
import Pagination from '@/components/ui/Pagination';
import { RangeSlide } from '@/components/ui/RangeSlide';
import Select from '@/components/ui/Select';
import { serviceCategory, serviceSortBy, sortOrder } from '@/constant/global';
import { cn } from '@/lib/utils';
import { useGetServicesQuery } from '@/redux/api/serviceApi';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function ServicePageContent() {
  // filter states
  const [price, setPrice] = useState<number>(400);
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [limit, setLimit] = useState({
    value: '2',
    label: '2',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const query: any = {};

  query.price = price ? price : undefined;
  query.category = category ? category : undefined;
  query.search = search ? search : undefined;

  query['limit'] = limit.value ? limit.value : undefined;
  query['page'] = currentPage ? currentPage : undefined;

  query['sortBy'] = sortBy ? sortBy : undefined;
  query['sortOrder'] = sortOrder ? sortOrder : undefined;

  query['status'] = 'available';

  const { data: serviceData, isLoading, isFetching } = useGetServicesQuery({ ...query });

  // filter drawer for smaller screens
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setShowFilters(false);
    };
    closeOnDesktop();
    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!showFilters) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowFilters(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showFilters]);

  const filterState = {
    setPrice,
    setCategory,
    setSearch,
    price,
    setSortBy,
    setSortOrder,
  };

  const services = serviceData?.data?.data ?? [];
  const total = serviceData?.data?.meta?.total;

  return (
    <>
      <PageHero
        label="Now showing"
        title="Our"
        accent="Services"
        subtitle="Discover our services designed to keep you connected, secure and efficient wherever your journey takes you"
      />

      {isLoading ? (
        <LoadingComponent />
      ) : (
        <section className="nh-container">
          {/* toolbar */}
          <div className="flex items-center justify-between gap-4 border-y border-fg/10 py-4">
            <p className="nh-label text-fgMuted" aria-live="polite">
              {isFetching ? 'Searching…' : `${typeof total === 'number' ? String(total).padStart(2, '0') : '––'} services available`}
            </p>
            <button
              type="button"
              className="nh-label flex items-center gap-2 rounded-full border border-fg/20 px-4 py-2 text-fg transition-colors hover:border-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber lg:hidden"
              onClick={() => setShowFilters(true)}
              aria-expanded={showFilters}
              aria-controls="service-filters-drawer"
            >
              <OpenSidebarIcon />
              Filters
            </button>
          </div>

          <div className="mt-10 flex gap-12">
            {/* desktop filter rail */}
            <aside aria-label="Filter services" className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-28">
                <FilterDiv stateToset={filterState} />
              </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col justify-between">
              {!isFetching && services.length === 0 ? (
                <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-fg/20 p-10 text-center">
                  <p className="nh-label text-amberText">No results</p>
                  <p className="font-display text-3xl font-extrabold uppercase tracking-[-0.03em]">No service found</p>
                  <p className="max-w-sm text-fgMuted">Try widening the price range or clearing the filters.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {!isFetching
                    ? services.map((data: any, idx: number) => (
                        <CardVariantThree
                          key={data.id}
                          data={data}
                          index={(currentPage - 1) * Number(limit.value) + idx}
                        />
                      ))
                    : Array.from({ length: Number(limit?.value) }, (_, idx) => (
                        <SkeletonServiceLoading key={idx} />
                      ))}
                </div>
              )}
              <div className={cn(isFetching || !services.length ? 'hidden' : '')}>
                <Pagination
                  totalPages={serviceData?.data?.meta?.totalPage}
                  dbPageCount={serviceData?.data?.meta?.page}
                  currentPage={currentPage}
                  handlePageChange={(page) => setCurrentPage(page)}
                  limit={limit}
                  handleLimitChange={(limit) => setLimit({ value: limit, label: limit })}
                />
              </div>
            </div>
          </div>

          <p className="mt-16 text-center text-sm text-fgMuted">
            Looking for what&apos;s next?{' '}
            <Link href="/#upcoming" className="text-amberText underline decoration-amber/50 underline-offset-4 hover:decoration-amber">
              See upcoming services
            </Link>
          </p>
        </section>
      )}

      {/* filter drawer for smaller screens */}
      <div
        className={cn(
          'fixed inset-0 z-[55] bg-film/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          showFilters ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
        onClick={() => setShowFilters(false)}
      />
      <div
        id="service-filters-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Filter services"
        className={cn(
          'fixed inset-y-0 left-0 z-[56] flex w-full max-w-sm flex-col bg-canvas transition-transform duration-300 ease-in-out lg:hidden',
          showFilters ? 'translate-x-0' : 'invisible -translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-fg/10 px-6 py-5">
          <p className="font-display text-xl font-extrabold uppercase">Filters</p>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-fg/20 hover:border-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
            onClick={() => setShowFilters(false)}
            aria-label="Close filters"
          >
            <CloseSidebarIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <FilterDiv stateToset={filterState} />
        </div>
        <div className="border-t border-fg/10 p-6">
          <Button variant="solid" className="w-full" onClick={() => setShowFilters(false)}>
            Show results
          </Button>
        </div>
      </div>
    </>
  );
}

// Filtering Service
const FilterDiv = ({
  stateToset: { setPrice, setCategory, setSearch, price, setSortBy, setSortOrder },
}: {
  stateToset: {
    setPrice: React.Dispatch<React.SetStateAction<number>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    price: number;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  };
}) => {
  const handleReset = () => {
    setPrice(400);
    setCategory('');
    setSearch('');
    setSortBy('');
    setSortOrder('');
  };

  return (
    <Form submitHandler={() => {}} className="space-y-6">
      <Input
        label="Search"
        type="search"
        placeholder="Search services"
        name={`search`}
        onchange={(value) => setSearch(value)}
      />

      <Select
        label="Category"
        name="categoryId"
        placeholder="All categories"
        options={[
          {
            label: 'All',
            value: '',
          },
          ...serviceCategory,
        ]}
        searchable={false}
        onChange={(value) => setCategory(value)}
      />
      <Select
        label="Sort By"
        name="sortBy"
        placeholder="Select a field"
        options={serviceSortBy}
        searchable={false}
        onChange={(value) => setSortBy(value)}
      />
      <Select
        label="Sort Order"
        name="sortOrder"
        placeholder="Select an order"
        options={sortOrder}
        searchable={false}
        onChange={(value) => setSortOrder(value)}
      />
      <RangeSlide
        label="Price"
        handleChange={(e) => setPrice(Number(e.target.value))}
        value={price}
        min={50}
        max={400}
        step={50}
      />
      <Button
        variant="outline"
        type="reset"
        onClick={handleReset}
        className="w-full border-danger/60 text-danger hover:border-danger hover:bg-danger hover:text-onDanger"
      >
        Reset filters
      </Button>
    </Form>
  );
};
