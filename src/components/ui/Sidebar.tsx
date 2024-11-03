"use client";
import { CloseSidebarIcon, OpenSidebarIcon } from "@/assets/svgs/heroIcons";
import { sidebarRoutes } from "@/constant/global";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { getCookie } from "@/lib/cookies";

export default function Sidebar({
  setShowSidebar,
  showSidebar,
  reference,
}: {
  showSidebar: boolean;
  setShowSidebar: (value: any) => void;
  reference: React.RefObject<HTMLDivElement>;
}) {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const autoToggleSidebar = () => {
      if (reference.current?.clientWidth) {
        if (reference.current.clientWidth <= 1024) {
          setShowSidebar(false);
        } else {
          setShowSidebar(true);
        }
      }
    };

    autoToggleSidebar();

    window.addEventListener("resize", autoToggleSidebar);
  }, [setShowSidebar, reference]);

  useEffect(() => {
    const getToken = async () => {
      const token = await getCookie("accessToken");
      if (!token) {
        return;
      }
      setAccessToken(token);
    };

    getToken();
  }, []);

  const { role } = useLoggedUserInfo(accessToken);

  return (
    <>
      <div
        className={cn(
          "border-r dark:border-neutral transition-transform duration-300 ease-in-out fixed lg:top-[106px] top-[96px] left-0 bottom-0 bg-mainBg z-[2]",
          {
            "block w-60 ": showSidebar,
          },
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className='flex flex-col justify-between h-full'>
          <ul className='py-4 px-4 space-y-3'>
            {sidebarRoutes[role]?.map((route: any) => (
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
            "block rounded-none hover:bg-primary hover:text-white fixed top-[106px] mt-0 lg:mt-2.5 left-0 z-[2]",
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
