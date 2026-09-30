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
      <div role='tablist' className='flex w-full flex-wrap gap-2 px-4 py-8'>
        {tabsData.map((data) => (
          <button
            key={data.id}
            role='tab'
            aria-selected={activeTab.id === data.id}
            className={cn(
              "flex-1 rounded-full border px-4 py-3 text-sm font-medium tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber",
              activeTab.id === data.id
                ? "border-amber bg-amber text-onAmber"
                : "border-fg/15 text-fgMuted hover:border-amber hover:text-fg"
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
