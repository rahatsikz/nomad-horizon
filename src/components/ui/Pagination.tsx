import { cn } from "@/lib/utils";
import Select, { Option } from "./Select";
import Form from "./Form";
import { useEffect } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  limit?: Option;
  totalItems: number;
  handleLimitChange: (limit: string) => void;
};
export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
  handleLimitChange,
  limit,
  totalItems,
}: PaginationProps) {
  // if (totalPages < 1) return null;
  useEffect(() => {
    if (totalItems <= Number(limit?.value)) {
      handlePageChange(1);
    }
  }, [totalItems, limit?.value, handlePageChange]);
  return (
    <div className='flex gap-2 sm:gap-6 sm:justify-end justify-center items-center mt-8 '>
      <div className='flex flex-wrap gap-2'>
        {totalPages >= 2
          ? Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={cn("size-8 rounded-full", {
                  "bg-primary text-white": currentPage === i + 1,
                  "bg-transparent text-primary": currentPage !== i + 1,
                })}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))
          : null}
      </div>
      <Form submitHandler={() => {}} className='w-16'>
        <Select
          // label='Category'
          name='categoryId'
          placeholder='2'
          options={[
            { value: "2", label: "2" },
            { value: "4", label: "4" },
            { value: "6", label: "6" },
            { value: "8", label: "8" },
          ]}
          searchable={false}
          onChange={(value) => handleLimitChange(value)}
        />
      </Form>
    </div>
  );
}
