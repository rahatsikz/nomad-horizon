"use client";
import { CloseSidebarIcon, OpenSidebarIcon } from "@/assets/svgs/heroIcons";
import { sidebarRoutes } from "@/constant/global";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./Button";

export default function Sidebar({
  setShowSidebar,
  showSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (value: any) => void;
}) {
  //!replace with user data
  const role = "user";

  return (
    <>
      <div
        className={cn(
          "border-r dark:border-neutral transition-transform duration-300 ease-in-out fixed lg:top-[106px] top-[98px] left-0 bottom-0 bg-mainBg",
          {
            "block w-60 ": showSidebar,
          },
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className='flex flex-col justify-between h-full'>
          <ul className='py-4 px-4 space-y-3'>
            {sidebarRoutes[role].map((route) => (
              <SidebarItem
                key={route.id}
                label={route.label}
                path={route.path}
              />
            ))}
          </ul>
          <Button
            className='w-full flex justify-center items-center rounded-none hover:bg-primary hover:text-white'
            variant='solid'
            onClick={() => setShowSidebar(false)}
          >
            <CloseSidebarIcon />
          </Button>
        </div>
      </div>
      <div>
        <Button
          variant='solid'
          className={cn(
            "block rounded-none hover:bg-primary hover:text-white fixed top-[106px] mt-0 lg:mt-2.5 left-0",
            { hidden: showSidebar }
          )}
          onClick={() => setShowSidebar((prev: any) => !prev)}
        >
          <OpenSidebarIcon />
        </Button>
      </div>
    </>
  );
}

function SidebarItem({ label, path }: { label: string; path: string }) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={cn("hover:text-primary text-secondary", {
          "text-primary": path === pathname,
        })}
      >
        {label}
      </Link>
    </li>
  );
}
