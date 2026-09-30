"use client";
import { TableColumnProps } from "@/types/common";
import React from "react";

export default function DynamicTable({
  columns,
  dataset,
}: {
  columns: TableColumnProps[];
  dataset: any[];
}) {
  return (
    <table className='w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-fg/10 text-sm'>
      <thead className='bg-raised text-left text-[11px] font-medium uppercase tracking-[0.2em] text-fgMuted'>
        <tr>
          {columns.map((column) => (
            <th className='border-b border-fg/10 px-2 py-3.5 xl:px-4' key={column.dataIndex}>
              {column.tableHeader}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='text-left font-light text-fg'>
        {dataset?.map((data, rowIdx) => (
          <tr key={rowIdx} className='transition-colors even:bg-raised/40 hover:bg-amber/[0.06]'>
            {columns.map((column) =>
              column.dataIndex !== "action" ? (
                <td
                  className='min-w-32 border-b border-fg/10 px-2 py-3 xl:px-4'
                  key={column.dataIndex}
                >
                  {data[column.dataIndex]}
                </td>
              ) : (
                // column.actions(data.id)
                <td
                  className='min-w-32 border-b border-fg/10 px-2 py-3 max-2xl:space-y-2 xl:px-4 2xl:space-x-2'
                  key={column.dataIndex}
                >
                  {column.renders && column.renders(data)}
                </td>
              )
            )}
          </tr>
        ))}
        {dataset?.length === 0 && (
          <tr>
            <td
              className='min-w-32 px-2 py-8 text-center text-fgMuted xl:px-4'
              colSpan={columns.length}
            >
              No data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
