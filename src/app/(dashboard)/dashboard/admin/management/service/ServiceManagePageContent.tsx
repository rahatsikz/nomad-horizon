"use client";
import { cn } from "@/lib/utils";
import AddService from "./AddService";
import { useState } from "react";

export default function ServiceManagePageContent() {
  const tabsData = [
    {
      id: 1,
      title: "Create Service",
      children: <AddService />,
    },
    {
      id: 2,
      title: "Manage Service",
      children: <div>Manage Service</div>,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0]);

  return (
    <div>
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
    </div>
  );
}
