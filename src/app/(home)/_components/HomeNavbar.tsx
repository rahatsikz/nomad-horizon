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
    <header className="sticky top-0 z-50 border-b border-ink bg-paper">
      <nav className="nh-container flex h-14 items-stretch justify-between lg:h-16">
        <Link
          href="/"
          aria-label="Nomad Horizon home"
          className="nh-focus nh-wide flex items-center border-x border-ink px-4 text-base font-black uppercase tracking-[-0.02em] hover:bg-ink hover:text-paper lg:text-lg"
        >
          Nomad Horizon
        </Link>

        <ul className="hidden flex-1 items-stretch lg:flex">
          {navOptions.map(({ label, route }) => (
            <NavCell key={label} route={route} label={label} />
          ))}
        </ul>

        <div className="hidden items-stretch lg:flex">
          {isLoggedIn ? (
            <>
              <div className="flex items-center border-l border-ink px-4">
                <NotificationMenu />
              </div>
              <div className="flex items-center border-l border-ink px-4">
                <DropdownMenu
                  contents={[
                    { label: 'Dashboard', route: `/dashboard/${role}` },
                    { label: 'Edit Profile', onClick: editModal },
                    { label: 'Logout', onClick: handleLogOut },
                  ]}
                  trigger={username[0]}
                  className="size-9 rounded-none border-ink p-0 font-black uppercase text-ink hover:bg-ink hover:text-paper"
                />
              </div>
            </>
          ) : (
            <ul className="flex items-stretch">
              {loginRouteOptions.map(({ label, route }) => (
                <NavCell key={label} route={route} label={label} />
              ))}
            </ul>
          )}
          <ThemeSegment />
        </div>

        <div className="flex items-stretch lg:hidden">
          {isLoggedIn && (
            <div className="flex items-center border-l border-ink px-3">
              <NotificationMenu />
            </div>
          )}
          <ThemeSegment compact />
          <button
            className="nh-focus border-x border-ink px-4 text-xs font-bold uppercase tracking-[0.12em] hover:bg-ink hover:text-paper"
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
          'grid overflow-hidden border-ink transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.7,0,0.2,1)] lg:hidden',
          showMobileMenu ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]',
        )}
      >
        <ul className="nh-container flex min-h-0 flex-col">
          {navOptions.map(({ label, route }) => (
            <NavCell
              key={label}
              route={route}
              label={label}
              isVisible={showMobileMenu}
              onClick={() => setShowMobileMenu(false)}
              stacked
            />
          ))}
          {isLoggedIn ? (
            <>
              <li className="border-x border-b border-ink px-4 py-3 text-xs uppercase tracking-[0.12em] text-inkMuted">
                Signed in — {username}
              </li>
              <NavCell route={`/dashboard/${role}`} label="Dashboard" isVisible={showMobileMenu} stacked />
              <li className="border-x border-b border-ink">
                <button
                  tabIndex={showMobileMenu ? 0 : -1}
                  onClick={editModal}
                  className="nh-focus nh-wide w-full px-4 py-4 text-left text-2xl font-black uppercase hover:bg-ink hover:text-paper"
                >
                  Edit Profile
                </button>
              </li>
              <li className="border-x border-b border-ink">
                <button
                  tabIndex={showMobileMenu ? 0 : -1}
                  onClick={handleLogOut}
                  className="nh-focus nh-wide w-full px-4 py-4 text-left text-2xl font-black uppercase hover:bg-ink hover:text-paper"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            loginRouteOptions.map(({ label, route }) => (
              <NavCell key={label} route={route} label={label} isVisible={showMobileMenu} stacked />
            ))
          )}
        </ul>
      </div>
      <EditProfileModal userData={loggedUser} />
    </header>
  );
}

function NavCell({
  route,
  label,
  isVisible = true,
  onClick,
  stacked,
}: {
  route: string;
  label: string;
  isVisible?: boolean;
  onClick?: () => void;
  stacked?: boolean;
}) {
  const pathname = usePathname();
  const cartCount = useCartCount();
  const isActive = route === pathname;

  return (
    <li className={cn('flex', stacked ? 'border-x border-b border-ink' : 'border-r border-ink first:border-l-0')}>
      <Link
        href={route}
        tabIndex={isVisible ? 0 : -1}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'nh-focus flex w-full items-center gap-3 hover:bg-ink hover:text-paper',
          stacked
            ? 'nh-wide px-4 py-4 text-2xl font-black uppercase'
            : 'px-5 text-sm font-semibold uppercase tracking-[0.06em]',
          isActive && 'bg-ink text-paper',
        )}
      >
        {label}
        {label === 'Cart' && (
          <span
            aria-label={`${cartCount} items in cart`}
            className="inline-flex h-5 min-w-5 items-center justify-center bg-signal px-1 text-[11px] font-bold leading-none text-onSignal"
          >
            {cartCount}
          </span>
        )}
      </Link>
    </li>
  );
}

function ThemeSegment({ compact }: { compact?: boolean }) {
  const { mounted, isDark, toggleTheme } = useThemeToggle();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="nh-focus flex items-stretch border-l border-ink text-[11px] font-bold uppercase tracking-[0.1em] lg:border-r"
    >
      {(compact ? [isDark ? 'Dark' : 'Light'] : ['Light', 'Dark']).map((mode) => {
        const active = mounted && (mode === 'Dark') === isDark;
        return (
          <span
            key={mode}
            className={cn(
              'flex items-center px-3 lg:px-4',
              !compact && active && 'bg-ink text-paper',
              !compact && !active && 'text-inkMuted',
            )}
          >
            {mode}
          </span>
        );
      })}
    </button>
  );
}
