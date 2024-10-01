"use client";
import { Navbar } from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function DashboardLayoutPanel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 bg-mainBg flex'>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div
          className={cn(
            "transition-all duration-300 ease-in-out mt-6 w-full",
            showSidebar ? "lg:ml-60" : "ml-0"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
