"use client";
import { CloseSidebarIcon, OpenSidebarIcon } from "@/assets/svgs/heroIcons";
import { Button } from "@/components/ui/Button";
import { CardVariantThree } from "@/components/ui/Cards";
import Form from "@/components/ui/Form";
import { HeaderText } from "@/components/ui/Headers";
import Input from "@/components/ui/Input";
import LoadingComponent from "@/components/ui/LoadingComponent";
import Pagination from "@/components/ui/Pagination";
import { RangeSlide } from "@/components/ui/RangeSlide";
import Select from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import React, { useEffect, useRef, useState } from "react";

export default function ServicePageContent() {
  const { data: serviceData, isLoading } = useGetServicesQuery({});

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState({
    value: "2",
    label: "2",
  });

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
        <div className='flex gap-12'>
          <div className='w-1/5 hidden 2xl:block'>
            <FilterDiv />
          </div>

          <div className='flex-1 relative'>
            {/* overlay */}
            {showSidebar && (
              <div
                className='absolute inset-0 bg-transparent z-[1]'
                aria-hidden='true'
                // onClick={() => setShowSidebar(false)}
              />
            )}
            <div className='grid xl:grid-cols-2 gap-8'>
              {serviceData?.data.map((data: any, idx: any) => (
                <CardVariantThree key={idx} data={data} />
              ))}
            </div>
            <div>
              <Pagination
                totalPages={8}
                currentPage={currentPage}
                handlePageChange={(page) => setCurrentPage(page)}
                limit={limit}
                handleLimitChange={(limit) => setLimit(limit)}
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
            displayIt={showSidebar}
            closeSidebar={() => setShowSidebar(false)}
          />
        </div>
      </div>
    </div>
  );
}

// Filtering Service
const FilterDiv = ({
  closeSidebar,
  displayIt = true,
}: {
  closeSidebar?: () => void;
  displayIt?: boolean;
}) => {
  const [price, setPrice] = useState<number>(100);

  // const [category, setCategory] = useState({
  //   value: "1",
  //   label: "Category 1",
  // });

  // const handleSelectChange = (option: Option) => {
  //   setCategory(option);
  // };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  return (
    <div className='self-start bg-nomadGray'>
      <Form submitHandler={() => {}} className='px-6 pt-6 pb-16  space-y-4'>
        <Input
          label='Search'
          type='search'
          placeholder='Search'
          name={`search-${displayIt}`}
        />

        <Select
          label='Category'
          name='categoryId'
          placeholder='Select a Category'
          options={[
            { value: "1", label: "Category 1" },
            { value: "2", label: "Category 2" },
            { value: "3", label: "Category 3" },
          ]}
          searchable={false}
        />
        <RangeSlide
          label='Price'
          handleChange={handleRangeChange}
          value={price}
        />
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
