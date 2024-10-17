"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import CancelledTable from "./CancelledTable";
import RecentTable from "./RecentTable";
import AllTable from "./AllTable";

export default function BookingManagePageContent() {
  const tabsData = [
    {
      id: 1,
      title: "Recent Bookings",
      children: <RecentTable />,
    },
    {
      id: 2,
      title: "Cancelled Bookings",
      children: <CancelledTable />,
    },
    {
      id: 3,
      title: "All Bookings",
      children: <AllTable />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0]);
  return (
    <section>
      <div className='text-secondary flex justify-between w-full divide-x-2 dark:divide-neutral px-4 py-8'>
        {tabsData.map((data) => (
          <button
            key={data.id}
            className={cn(
              "w-full py-4",
              activeTab.id === data.id ? "bg-primary" : "bg-nomadGray"
            )}
            onClick={() => setActiveTab(data)}
          >
            <span className='text-center w-full'>{data.title}</span>
          </button>
        ))}
      </div>

      {activeTab.children}
    </section>
  );
}
