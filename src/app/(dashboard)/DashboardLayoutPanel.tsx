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
    <div className='flex min-h-screen flex-col bg-canvas'>
      <Navbar />
      <div className='flex flex-1 pt-16 lg:pt-20'>
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          reference={sidebarRef}
        />
        <div
          className={cn(
            "mb-6 mt-8 w-full overflow-x-hidden transition-all duration-300 ease-in-out max-xl:mb-12 lg:px-4",
            showSidebar ? "lg:ml-64" : "ml-0"
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
