"use client";
import { CloseSidebarIcon, OpenSidebarIcon } from "@/assets/svgs/heroIcons";
import { Button } from "@/components/ui/Button";
import { CardVariantThree } from "@/components/ui/Cards";
import Form from "@/components/ui/Form";
import { HeaderText } from "@/components/ui/Headers";
import Input from "@/components/ui/Input";
import LoadingComponent, {
  SkeletonServiceLoading,
} from "@/components/ui/LoadingComponent";
import Pagination from "@/components/ui/Pagination";
import { RangeSlide } from "@/components/ui/RangeSlide";
import Select from "@/components/ui/Select";
import { serviceCategory, serviceSortBy, sortOrder } from "@/constant/global";
import { cn } from "@/lib/utils";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import React, { useEffect, useRef, useState } from "react";

export default function ServicePageContent() {
  // filter states
  const [price, setPrice] = useState<number>(400);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState({
    value: "2",
    label: "2",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const query: any = {};

  query.price = price ? price : undefined;
  query.category = category ? category : undefined;
  query.search = search ? search : undefined;

  query["limit"] = limit.value ? limit.value : undefined;
  query["page"] = currentPage ? currentPage : undefined;

  query["sortBy"] = sortBy ? sortBy : undefined;
  query["sortOrder"] = sortOrder ? sortOrder : undefined;

  query["status"] = "available";

  const {
    data: serviceData,
    isLoading,
    isFetching,
  } = useGetServicesQuery({ ...query });

  // toggle sidebar
  const [showSidebar, setShowSidebar] = useState(false);
  const sideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const autoCloseSidebar = () => {
      if (sideRef.current?.clientWidth) {
        if (sideRef.current.clientWidth > 1536) {
          setShowSidebar(false);
        }
      }
    };

    autoCloseSidebar();

    window.addEventListener("resize", autoCloseSidebar);
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className='bg-mainBg relative' ref={sideRef}>
      <div
        className={cn(
          "container mx-auto px-4 2xl:px-0 py-8 transition-all duration-300 ease-in-out",
          {
            "blur-sm": showSidebar,
          }
        )}
      >
        <HeaderText
          title='Our Services'
          subtitle='Discover our services designed to keep you connected, secure and efficient wherever your journey takes you'
        />

        {serviceData?.data?.data?.length === 0 && !isFetching && (
          <h1 className='text-2xl text-primary text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-2xl:mt-20'>
            No service found
          </h1>
        )}

        <div className='flex gap-12'>
          <div className='w-1/5 hidden 2xl:block'>
            <FilterDiv
              stateToset={{
                setPrice,
                setCategory,
                setSearch,
                price,
                setSortBy,
                setSortOrder,
              }}
            />
          </div>

          <div className='flex-1 relative flex flex-col justify-between'>
            {/* overlay */}
            {showSidebar && (
              <div
                className='absolute inset-0 bg-transparent z-[1]'
                aria-hidden='true'
                // onClick={() => setShowSidebar(false)}
              />
            )}
            <div>
              <div className='grid xl:grid-cols-2 gap-8'>
                {!isFetching
                  ? serviceData?.data.data?.map((data: any, idx: any) => (
                      <CardVariantThree key={idx} data={data} />
                    ))
                  : Array.from({ length: Number(limit?.value) }, (_, idx) => (
                      <SkeletonServiceLoading key={idx} />
                    ))}
              </div>
            </div>
            <div
              className={cn(
                isFetching || !serviceData?.data?.data.length ? "hidden" : ""
              )}
            >
              <Pagination
                totalPages={serviceData?.data?.meta?.totalPage}
                dbPageCount={serviceData?.data?.meta?.page}
                currentPage={currentPage}
                handlePageChange={(page) => setCurrentPage(page)}
                limit={limit}
                handleLimitChange={(limit) =>
                  setLimit({ value: limit, label: limit })
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* sidebar for smaller screen */}
      <div className=' 2xl:hidden max-sm:w-full '>
        <Button
          variant='solid'
          className={cn(
            "block rounded-none hover:bg-primary hover:text-white fixed top-28 mt-0 lg:mt-2.5 left-0",
            { hidden: showSidebar }
          )}
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <OpenSidebarIcon />
        </Button>
        <div
          className={cn(
            "transition-transform duration-300 ease-in-out max-sm:w-full z-[2] fixed top-24 mt-0 lg:mt-2.5 left-0",
            showSidebar ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <FilterDiv
            // displayIt={showSidebar}
            closeSidebar={() => setShowSidebar(false)}
            stateToset={{
              setPrice,
              setCategory,
              setSearch,
              price,
              setSortBy,
              setSortOrder,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Filtering Service
const FilterDiv = ({
  closeSidebar,
  stateToset: {
    setPrice,
    setCategory,
    setSearch,
    price,
    setSortBy,
    setSortOrder,
  },
}: // displayIt = true,
{
  closeSidebar?: () => void;
  stateToset: {
    setPrice: React.Dispatch<React.SetStateAction<number>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    price: number;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  };
  // displayIt?: boolean;
}) => {
  const handleReset = () => {
    setPrice(400);
    setCategory("");
    setSearch("");
    setSortBy("");
    setSortOrder("");
  };

  return (
    <div className='dark:bg-nomadGray bg-mainBg shadow-main dark:shadow-none overflow-y-auto'>
      <Form
        submitHandler={() => {}}
        className='px-6 pt-6 lg:max-xl:pt-4 pb-6 space-y-3 xl:space-y-4'
      >
        <Input
          label='Search'
          type='search'
          placeholder='Search'
          name={`search`}
          onchange={(value) => setSearch(value)}
        />

        <Select
          label='Category'
          name='categoryId'
          placeholder='Select a Category'
          options={[
            {
              label: "All",
              value: "",
            },
            ...serviceCategory,
          ]}
          searchable={false}
          onChange={(value) => setCategory(value)}
        />
        <Select
          label='Sort By'
          name='sortBy'
          placeholder='Select a field'
          options={serviceSortBy}
          searchable={false}
          onChange={(value) => setSortBy(value)}
        />
        <Select
          label='Sort Order'
          name='sortOrder'
          placeholder='Select a order'
          options={sortOrder}
          searchable={false}
          onChange={(value) => setSortOrder(value)}
        />
        <RangeSlide
          label='Price'
          handleChange={(e) => setPrice(Number(e.target.value))}
          value={price}
          min={50}
          max={400}
          step={50}
        />
        <div>
          <Button
            variant='outline'
            type='reset'
            onClick={handleReset}
            className='w-full mt-3 border-red-400 text-red-400 hover:bg-red-400'
          >
            Reset
          </Button>
        </div>
      </Form>
      {closeSidebar && (
        <Button
          className='w-full flex justify-center items-center rounded-none hover:bg-primary hover:text-white'
          variant='solid'
          onClick={() => closeSidebar()}
        >
          <CloseSidebarIcon />
        </Button>
      )}
    </div>
  );
};
