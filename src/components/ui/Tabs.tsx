"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function Tabs({
  tabsData,
}: {
  tabsData: { id: number; title: string; children: React.ReactNode }[];
}) {
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  return (
    <section>
      <div className='text-secondary flex justify-between w-full divide-x-2 dark:divide-neutral px-4 py-8'>
        {tabsData.map((data) => (
          <button
            key={data.id}
            className={cn(
              "w-full py-4 px-1",
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
