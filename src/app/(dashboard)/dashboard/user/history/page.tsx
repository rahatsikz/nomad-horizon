import DynamicTable from "@/components/ui/DynamicTable";
import React from "react";
import { dummyColumns } from "./DummyColumn";
import { dataset } from "@/constant/global";

export default function HistoryPage() {
  return (
    <section className='px-4 py-8 text-secondary'>
      <div className='w-full overflow-x-auto'>
        <DynamicTable columns={dummyColumns} dataset={dataset} />
      </div>
    </section>
  );
}
