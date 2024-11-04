"use client";
import { Navbar } from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import withAuth from "@/lib/withAuth";
import { useRef, useState } from "react";

const DashboardLayoutPanel = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 bg-mainBg flex'>
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          reference={sidebarRef}
        />
        <div
          className={cn(
            "transition-all duration-300 ease-in-out mt-7 mb-6 max-xl:mb-12 w-full overflow-x-hidden",
            showSidebar ? "lg:ml-60" : "ml-0"
          )}
          ref={sidebarRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default withAuth(DashboardLayoutPanel);
