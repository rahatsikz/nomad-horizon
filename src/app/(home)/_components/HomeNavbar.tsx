'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { EditProfileModal, useCartCount, useNavbarSession } from '@/components/ui/Navbar';
import NotificationMenu from '@/components/ui/NotificationMenu';
import { loginRouteOptions, navOptions } from '@/constant/global';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import { cn } from '@/lib/utils';

export function CompassMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none">
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 2" />
      <path d="M16 3.5 19 16h-6z" className="fill-signal" />
      <path d="M16 28.5 13 16h6z" fill="currentColor" />
    </svg>
  );
}

export function HomeNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { accessToken, username, role, loggedUser, handleLogOut, editModal } = useNavbarSession();
  const isLoggedIn = Boolean(username && accessToken);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setShowMobileMenu(false);
    };
    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-dashed border-ink/30 bg-ground/95 backdrop-blur-sm">
      <nav className="nh-container flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Nomad Horizon home">
          <CompassMark className="size-8 transition-transform duration-700 group-hover:rotate-[20deg]" />
          <span className="font-display text-xl font-extrabold tracking-[-0.04em] lg:text-2xl">
            Nomad Horizon
          </span>
        </Link>

        <ul className="hidden items-center gap-8 font-display text-[0.95rem] font-semibold lg:flex">
          {navOptions.map(({ label, route }) => (
            <NavLink key={label} route={route} label={label} />
          ))}
        </ul>

        <div className="hidden items-center gap-6 lg:flex">
          {isLoggedIn ? (
            <>
              <NotificationMenu />
              <DropdownMenu
                contents={[
                  { label: 'Dashboard', route: `/dashboard/${role}` },
                  { label: 'Edit Profile', onClick: editModal },
                  { label: 'Logout', onClick: handleLogOut },
                ]}
                trigger={username[0]}
                className="size-9 rounded-full border-2 border-ink p-0 font-display font-extrabold uppercase text-ink"
              />
            </>
          ) : (
            <ul className="flex items-center gap-6 font-display text-[0.95rem] font-semibold">
              {loginRouteOptions.map(({ label, route }) => (
                <NavLink key={label} route={route} label={label} />
              ))}
            </ul>
          )}
          <MapToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          {isLoggedIn && <NotificationMenu />}
          <MapToggle />
          <button
            className="rounded-full border-2 border-ink px-3 py-1 font-ticket text-[10px] uppercase tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-expanded={showMobileMenu}
            aria-controls="home-mobile-menu"
          >
            {showMobileMenu ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      <div
        id="home-mobile-menu"
        className={cn(
          'grid overflow-hidden border-dashed border-ink/30 bg-ground transition-[grid-template-rows] duration-500 ease-out lg:hidden',
          showMobileMenu ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]',
        )}
      >
        <ul className="nh-container flex min-h-0 flex-col font-display text-2xl font-bold">
          {navOptions.map(({ label, route }) => (
            <NavLink
              key={label}
              route={route}
              label={label}
              isVisible={showMobileMenu}
              onClick={() => setShowMobileMenu(false)}
              large
            />
          ))}
          {isLoggedIn ? (
            <>
              <li className="border-t border-dashed border-ink/25 pt-4 font-ticket text-[10px] font-normal uppercase tracking-[0.16em] text-inkMuted">
                Traveller: {username}
              </li>
              <NavLink route={`/dashboard/${role}`} label="Dashboard" isVisible={showMobileMenu} large />
              <li className="py-2.5">
                <button tabIndex={showMobileMenu ? 0 : -1} onClick={editModal}>
                  Edit Profile
                </button>
              </li>
              <li className="py-2.5 pb-5">
                <button tabIndex={showMobileMenu ? 0 : -1} onClick={handleLogOut} className="text-signalText">
                  Logout
                </button>
              </li>
            </>
          ) : (
            loginRouteOptions.map(({ label, route }) => (
              <NavLink key={label} route={route} label={label} isVisible={showMobileMenu} large />
            ))
          )}
        </ul>
      </div>
      <EditProfileModal userData={loggedUser} />
    </header>
  );
}

function NavLink({
  route,
  label,
  isVisible = true,
  onClick,
  large,
}: {
  route: string;
  label: string;
  isVisible?: boolean;
  onClick?: () => void;
  large?: boolean;
}) {
  const pathname = usePathname();
  const cartCount = useCartCount();
  const isActive = route === pathname;

  return (
    <li className={cn(large && 'py-2.5 first:pt-5 last:pb-5')}>
      <Link
        href={route}
        tabIndex={isVisible ? 0 : -1}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className="group relative inline-flex items-center gap-2 transition-colors duration-300 hover:text-signalText"
      >
        {isActive && <span aria-hidden="true" className="size-2 rotate-45 bg-signal" />}
        {label}
        {label === 'Cart' && (
          <span
            aria-label={`${cartCount} items in cart`}
            className="inline-flex h-6 min-w-6 -rotate-[8deg] items-center justify-center rounded-[3px] border-2 border-double border-signalText px-1 font-ticket text-[10px] font-medium leading-none text-signalText transition-transform group-hover:rotate-0"
          >
            {cartCount}
          </span>
        )}
      </Link>
    </li>
  );
}

function MapToggle() {
  const { mounted, isDark, toggleTheme } = useThemeToggle();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to day map (light theme)' : 'Switch to night map (dark theme)'}
      className="flex items-center gap-2 rounded-full border border-ink/40 py-1 pl-1 pr-3 font-ticket text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
    >
      <span className="flex size-5 items-center justify-center rounded-full bg-ink text-ground">
        {mounted && isDark ? (
          <svg viewBox="0 0 16 16" className="size-3" fill="currentColor" aria-hidden="true">
            <path d="M10.5 1.5a6.5 6.5 0 1 0 4 11.6A5.5 5.5 0 0 1 10.5 1.5Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" />
          </svg>
        )}
      </span>
      <span className="hidden sm:inline">{mounted && isDark ? 'Night map' : 'Day map'}</span>
    </button>
  );
}
