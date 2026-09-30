'use client';
import { CloseSidebarIcon, OpenSidebarIcon } from '@/assets/svgs/heroIcons';
import { sidebarRoutes } from '@/constant/global';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useLoggedUserInfo } from '@/hooks/useLoggedUser';
import { getCookie } from '@/lib/cookies';

export default function Sidebar({
  setShowSidebar,
  showSidebar,
  reference,
}: {
  showSidebar: boolean;
  setShowSidebar: (value: any) => void;
  reference: React.RefObject<HTMLDivElement | null>;
}) {
  const [accessToken, setAccessToken] = useState<string>('');

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

    window.addEventListener('resize', autoToggleSidebar);
  }, [setShowSidebar, reference]);

  useEffect(() => {
    const getToken = async () => {
      const token = await getCookie('accessToken');
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
      <aside
        aria-label="Dashboard navigation"
        className={cn(
          'fixed bottom-0 left-0 top-16 z-[2] w-64 overflow-auto border-r border-fg/10 bg-canvas transition-transform duration-300 ease-in-out lg:top-20',
          showSidebar ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="px-6 py-8">
            <p className="nh-label text-amberText">{role ? `${role} desk` : 'Dashboard'}</p>
            <ul className="mt-6 space-y-1">
              {sidebarRoutes[role]?.map((route: any) => (
                <SidebarItem key={route.id} label={route.label} path={route.path} />
              ))}
            </ul>
          </div>
          <button
            className="flex w-full items-center justify-center gap-3 border-t border-fg/10 py-4 text-fgMuted transition-colors hover:bg-raised hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
            onClick={() => setShowSidebar(false)}
            aria-label="Close sidebar"
          >
            <CloseSidebarIcon />
            <span className="nh-label">Hide</span>
          </button>
        </div>
      </aside>
      <button
        className={cn(
          'fixed left-0 top-20 z-[2] flex items-center gap-2 rounded-r-full bg-amber py-2.5 pl-3 pr-4 text-onAmber shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber lg:top-24',
          { hidden: showSidebar },
        )}
        onClick={() => setShowSidebar((prev: any) => !prev)}
        aria-label="Open sidebar"
      >
        <OpenSidebarIcon />
      </button>
    </>
  );
}

function SidebarItem({ label, path }: { label: string; path: string }) {
  const pathname = usePathname();
  const isActive = path === pathname;

  return (
    <li>
      <Link
        href={path}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'relative flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-raised hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber',
          isActive
            ? 'bg-raised font-medium text-fg before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-amber'
            : 'text-fgMuted',
        )}
      >
        {label}
      </Link>
    </li>
  );
}
