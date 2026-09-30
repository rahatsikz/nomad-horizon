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
import {
  BaggagePictogram,
  CheckInPictogram,
  HomePictogram,
  MoonPictogram,
  NewspaperPictogram,
  PersonPlusPictogram,
  PlanePictogram,
  ServicesPictogram,
  SunPictogram,
} from './Pictograms';

const pictograms: Record<string, (p: { className?: string }) => React.ReactElement> = {
  Home: HomePictogram,
  Services: ServicesPictogram,
  Cart: BaggagePictogram,
  Blogs: NewspaperPictogram,
  Login: CheckInPictogram,
  Register: PersonPlusPictogram,
};

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
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-ground/95 backdrop-blur">
      <nav className="nh-container flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" className="group flex items-center gap-3" aria-label="Nomad Horizon home">
          <span className="flex size-9 items-center justify-center rounded-md bg-sign text-onSign">
            <PlanePictogram className="size-6 rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span className="font-sign text-2xl font-bold uppercase leading-none tracking-[0.02em]">Nomad Horizon</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navOptions.map(({ label, route }) => (
            <NavLink key={label} route={route} label={label} />
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
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
                className="size-9 rounded-md border-0 bg-sign p-0 font-sign text-lg font-bold uppercase text-onSign"
              />
            </>
          ) : (
            <ul className="flex items-center gap-1">
              {loginRouteOptions.map(({ label, route }) => (
                <NavLink key={label} route={route} label={label} />
              ))}
            </ul>
          )}
          <ThemeSwitch />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {isLoggedIn && <NotificationMenu />}
          <ThemeSwitch />
          <button
            className="rounded-md border border-ink/30 px-3 py-2 font-sign text-sm font-bold uppercase tracking-[0.08em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sign"
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
          'grid overflow-hidden border-ink/15 bg-ground transition-[grid-template-rows] duration-500 ease-out lg:hidden',
          showMobileMenu ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]',
        )}
      >
        <ul className="nh-container flex min-h-0 flex-col gap-1">
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
              <li className="px-3 pt-3 font-sign text-sm font-semibold uppercase tracking-[0.1em] text-inkMuted">
                Passenger — {username}
              </li>
              <NavLink route={`/dashboard/${role}`} label="Dashboard" isVisible={showMobileMenu} large />
              <li>
                <button
                  tabIndex={showMobileMenu ? 0 : -1}
                  onClick={editModal}
                  className="w-full px-3 py-3 text-left font-sign text-2xl font-bold uppercase"
                >
                  Edit Profile
                </button>
              </li>
              <li className="pb-4">
                <button
                  tabIndex={showMobileMenu ? 0 : -1}
                  onClick={handleLogOut}
                  className="w-full px-3 py-3 text-left font-sign text-2xl font-bold uppercase"
                >
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
  const Pictogram = pictograms[label];

  return (
    <li className={cn(large && 'first:pt-3 last:pb-4')}>
      <Link
        href={route}
        tabIndex={isVisible ? 0 : -1}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'relative flex items-center gap-2 rounded-md px-3 py-2 font-sign font-semibold uppercase tracking-[0.06em] transition-colors hover:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sign',
          large ? 'py-3 text-2xl font-bold' : 'text-[1.05rem]',
          isActive && 'after:absolute after:inset-x-3 after:-bottom-[0.9rem] after:h-[3px] after:bg-sign',
          isActive && large && 'bg-sign text-onSign after:hidden hover:bg-sign',
        )}
      >
        {Pictogram && <Pictogram className={large ? 'size-6' : 'size-[1.15rem]'} />}
        {label}
        {label === 'Cart' && (
          <span
            aria-label={`${cartCount} items in cart`}
            className="inline-flex size-5 items-center justify-center rounded-full bg-sign font-text text-[11px] font-bold tracking-normal text-onSign ring-1 ring-onSign/20"
          >
            {cartCount}
          </span>
        )}
      </Link>
    </li>
  );
}

function ThemeSwitch() {
  const { mounted, isDark, toggleTheme } = useThemeToggle();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex size-10 items-center justify-center rounded-md border border-ink/25 transition-colors hover:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sign"
    >
      {mounted && isDark ? <MoonPictogram className="size-5" /> : <SunPictogram className="size-5" />}
    </button>
  );
}
