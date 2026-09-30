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
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/95 backdrop-blur-[2px]">
      <nav className="nh-container flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="Nomad Horizon home">
          <span className="nh-soft font-display text-2xl font-semibold tracking-tight lg:text-[1.7rem]">
            Nomad <em className="nh-wonk font-light italic text-terracotta">Horizon</em>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-[0.95rem] lg:flex">
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
                className="size-9 rounded-full border-ink/30 p-0 font-display text-lg uppercase text-ink"
              />
            </>
          ) : (
            <ul className="flex items-center gap-6 text-[0.95rem]">
              {loginRouteOptions.map(({ label, route }) => (
                <NavLink key={label} route={route} label={label} />
              ))}
            </ul>
          )}
          <ThemeSwitch />
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          {isLoggedIn && <NotificationMenu />}
          <ThemeSwitch />
          <button
            className="font-meta text-[11px] uppercase tracking-[0.22em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracottaInk"
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
          'grid overflow-hidden border-ink/15 bg-paper transition-[grid-template-rows] duration-500 ease-out lg:hidden',
          showMobileMenu ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]',
        )}
      >
        <ul className="nh-container flex min-h-0 flex-col divide-y divide-ink/10">
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
              <li className="py-3 font-meta text-[11px] uppercase tracking-[0.22em] text-inkMuted">
                Signed in as {username}
              </li>
              <NavLink route={`/dashboard/${role}`} label="Dashboard" isVisible={showMobileMenu} large />
              <li className="py-3">
                <button
                  tabIndex={showMobileMenu ? 0 : -1}
                  onClick={editModal}
                  className="font-display text-2xl"
                >
                  Edit Profile
                </button>
              </li>
              <li className="py-3">
                <button
                  tabIndex={showMobileMenu ? 0 : -1}
                  onClick={handleLogOut}
                  className="font-display text-2xl text-terracottaInk"
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

  return (
    <li className={cn(large && 'py-3')}>
      <Link
        href={route}
        tabIndex={isVisible ? 0 : -1}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'relative inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-terracottaInk',
          large && 'font-display text-2xl',
          isActive &&
            'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-terracotta',
        )}
      >
        {label}
        {label === 'Cart' && (
          <span
            aria-label={`${cartCount} items in cart`}
            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-terracottaInk px-1 font-meta text-[10px] font-medium leading-none text-paper"
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
      className="flex items-center gap-1.5 font-meta text-[11px] uppercase tracking-[0.2em] text-inkMuted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracottaInk"
    >
      <span className={cn(mounted && !isDark && 'text-ink underline decoration-terracotta underline-offset-4')}>
        Day
      </span>
      <span aria-hidden="true">/</span>
      <span className={cn(mounted && isDark && 'text-ink underline decoration-terracotta underline-offset-4')}>
        Night
      </span>
    </button>
  );
}
