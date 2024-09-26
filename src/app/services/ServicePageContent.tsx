"use client";
import { CloseSidebarIcon, OpenSidebarIcon } from "@/assets/svgs/heroIcons";
import { Button } from "@/components/ui/Button";
import { CardVariantThree } from "@/components/ui/Cards";
import { HeaderText } from "@/components/ui/Headers";
import Input from "@/components/ui/Input";
import Pagination from "@/components/ui/Pagination";
import { RangeSlide } from "@/components/ui/RangeSlide";
import Select, { Option } from "@/components/ui/Select";
import { dummyServices } from "@/constant/global";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export default function ServicePageContent() {
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
              {dummyServices.slice(0, 4).map((data, idx) => (
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
      <div className='fixed top-24 mt-0 lg:mt-2.5 bottom-0 left-0 2xl:hidden max-sm:w-full z-[2]'>
        <Button
          variant='solid'
          className={cn(
            "block rounded-none hover:bg-primary hover:text-white",
            { hidden: showSidebar }
          )}
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <OpenSidebarIcon />
        </Button>
        <div
          className={cn(
            "transition-transform duration-300 ease-in-out max-sm:w-full",
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

  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState({
    value: "1",
    label: "Category 1",
  });

  const handleSelectChange = (option: Option) => {
    setCategory(option);
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div className='self-start bg-nomadGray'>
      <div className='px-6 pt-6 pb-16  space-y-4'>
        <Input
          label='Search'
          type='search'
          placeholder='Search'
          name={`search-${displayIt}`}
          value={search}
          handleChange={handleSearchChange}
        />

        <Select
          label='Categories'
          onChange={handleSelectChange}
          options={[
            { value: "1", label: "Category 1" },
            { value: "2", label: "Category 2" },
            { value: "3", label: "Category 3" },
          ]}
          value={category}
        />
        <RangeSlide
          label='Price'
          handleChange={handleRangeChange}
          value={price}
        />
      </div>
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
