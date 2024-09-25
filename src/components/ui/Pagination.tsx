import { cn } from "@/lib/utils";
import Select, { Option } from "./Select";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  limit: Option;
  handleLimitChange: (limit: Option) => void;
};
export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
  limit,
  handleLimitChange,
}: PaginationProps) {
  if (totalPages < 2) return null;

  return (
    <div className='flex flex-col sm:flex-row gap-2 sm:gap-6 justify-end items-center mt-8 '>
      <div className='flex flex-wrap gap-2'>
        {Array.from({ length: totalPages }, (_, i) => (
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
        ))}
      </div>
      <div className='w-16'>
        <Select
          options={[
            { value: "2", label: "2" },
            { value: "4", label: "4" },
            { value: "6", label: "6" },
            { value: "8", label: "8" },
          ]}
          onChange={(limit) => handleLimitChange(limit)}
          value={limit}
          searchable={false}
        />
      </div>
    </div>
  );
}
