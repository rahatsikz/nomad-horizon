import { cn } from "@/lib/utils";
import Select, { Option } from "./Select";
import Form from "./Form";
import { useEffect } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  dbPageCount: number;
  limit: Option;
  handleLimitChange: (limit: string) => void;
};
export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
  handleLimitChange,
  dbPageCount,
  limit,
}: PaginationProps) {
  // if (totalPages < 1) return null;
  useEffect(() => {
    if (dbPageCount > totalPages) {
      handlePageChange(1);
    }
  }, [dbPageCount, totalPages, handlePageChange]);
  return (
    <div className='mt-12 flex flex-wrap items-center justify-center gap-4 border-t border-fg/10 pt-6 sm:justify-between'>
      <nav aria-label='Pagination' className='flex flex-wrap items-center gap-2'>
        {totalPages >= 2
          ? Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                aria-label={`Page ${i + 1}`}
                aria-current={currentPage === i + 1 ? "page" : undefined}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber",
                  {
                    "border-amber bg-amber text-onAmber": currentPage === i + 1,
                    "border-fg/20 text-fgMuted hover:border-amber hover:text-fg":
                      currentPage !== i + 1,
                  }
                )}
                onClick={() => handlePageChange(i + 1)}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))
          : null}
      </nav>
      <div className='flex items-center gap-3'>
        <span className='nh-label text-fgMuted'>Per page</span>
        <Form submitHandler={() => {}} className='w-20'>
          <Select
            // label='Category'
            name='categoryId'
            placeholder={limit?.label}
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
    </div>
  );
}
