"use client";
import { CardVariantThree } from "@/components/ui/Cards";
import Input from "@/components/ui/Input";
import Pagination from "@/components/ui/Pagination";
import { RangeSlide } from "@/components/ui/RangeSlide";
import Select, { Option } from "@/components/ui/Select";
import { dummyServices } from "@/constant/global";
import React, { useState } from "react";

const ServicePageContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState({
    value: "2",
    label: "2",
  });

  return (
    <div className='bg-mainBg'>
      <div className='container mx-auto px-4 2xl:px-0 flex gap-12 py-12'>
        <div className='w-1/5 hidden lg:flex'>
          <FilterDiv />
        </div>
        <div className=' flex-1 '>
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
  );
};

export default ServicePageContent;

// Filtering Service
const FilterDiv = () => {
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
          name='search'
          value={search}
          handleChange={handleSearchChange}
        />
        <RangeSlide
          label='Price'
          handleChange={handleRangeChange}
          value={price}
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
      </div>
    </div>
  );
};
