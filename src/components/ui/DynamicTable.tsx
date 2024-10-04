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
    <table className='w-full border-separate border-spacing-0 shadow-lg'>
      <thead className='bg-lightPrimary text-secondary uppercase text-sm font-medium text-left'>
        <tr>
          {columns.map((column) => (
            <th className='xl:px-4 px-2 py-3' key={column.dataIndex}>
              {column.tableHeader}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='text-left text-secondary'>
        {dataset.map((data, rowIdx) => (
          <tr key={rowIdx} className='odd:bg-nomadGray even:bg-mainBg'>
            {columns.map((column) =>
              column.dataIndex !== "action" ? (
                <td
                  className='xl:px-4 px-2 py-3 border-b border-l first:border-l-0 min-w-32'
                  key={column.dataIndex}
                >
                  {data[column.dataIndex]}
                </td>
              ) : (
                // column.actions(data.id)
                <td
                  className='xl:px-4 px-2 py-3 border-b border-l min-w-32 xl:space-x-2 space-y-2'
                  key={column.dataIndex}
                >
                  {column.renders && column.renders(data.id)}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
