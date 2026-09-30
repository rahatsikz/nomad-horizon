'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { DropdownMenu } from './DropdownMenu';
import { usePathname, useRouter } from 'next/navigation';
import { loginRouteOptions, navOptions } from '@/constant/global';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteCookie } from '@/lib/cookies';
import { removeAccessToken } from '@/redux/slice/user/userSlice';
import { useLoggedUserInfo } from '@/hooks/useLoggedUser';
// import { clearCart } from "@/redux/slice/cart/cartSlice";
import NotificationMenu from './NotificationMenu';
import Modal from './Modal';
import Form from './Form';
import Input from './Input';
import Textarea from './Textarea';
import { Button } from './Button';
import { Wordmark } from './Wordmark';
import { toggleModal } from '@/redux/slice/modal/modalSlice';
import { useUpdateProfileMutation } from '@/redux/api/userApi';
import toast from 'react-hot-toast';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export function useNavbarSession() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { username, role, user: loggedUser } = useLoggedUserInfo(accessToken);

  const handleLogOut = () => {
    deleteCookie(['accessToken', 'refreshToken']);
    dispatch(removeAccessToken());
    // dispatch(clearCart());
    router.refresh();
  };

  const editModal = () => {
    dispatch(toggleModal({ isModalOpen: true, id: 'edit-profile' }));
  };

  return { accessToken, username, role, loggedUser, handleLogOut, editModal };
}

export function useCartCount() {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { user: loggedUser } = useLoggedUserInfo(user.accessToken);

  const userCart = cart?.filter((item) =>
    item.user ? item.user === loggedUser?.data?.id : !item.user,
  );

  return userCart?.length ?? 0;
}

/**
 * Fixed, transparent over the page until scrolled, then a blurred canvas bar.
 * Pages sit underneath it, so they add their own top offset (PageHero does).
 */
export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { accessToken, username, role, loggedUser, handleLogOut, editModal } = useNavbarSession();
  const isLoggedIn = Boolean(username && accessToken);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setShowMobileMenu(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, []);

  const solid = scrolled || showMobileMenu;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
          solid
            ? 'border-b border-fg/10 bg-canvas/85 backdrop-blur-md'
            : 'border-b border-transparent',
        )}
      >
        <nav className="nh-container flex h-16 items-center justify-between gap-6 lg:h-20">
          <Wordmark className="shrink-0 text-sm sm:text-lg lg:text-xl" />

          <ul className="hidden items-center gap-9 lg:flex">
            {navOptions.map(({ label, route }) => (
              <NavLink key={label} route={route} label={label} />
            ))}
          </ul>

          <div className="hidden items-center gap-7 lg:flex">
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
                  className="size-9 rounded-full border-fg/40 p-0 font-display font-bold uppercase text-fg"
                />
              </>
            ) : (
              <ul className="flex items-center gap-7">
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
              className="nh-label focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-expanded={showMobileMenu}
              aria-controls="site-mobile-menu"
            >
              {showMobileMenu ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>

        <div
          id="site-mobile-menu"
          className={cn(
            'grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out lg:hidden',
            showMobileMenu ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <ul className="nh-container flex min-h-0 flex-col gap-1 font-display text-3xl font-bold uppercase tracking-[-0.02em]">
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
                <li className="nh-label pt-4 text-fgMuted">{username}</li>
                <NavLink
                  route={`/dashboard/${role}`}
                  label="Dashboard"
                  isVisible={showMobileMenu}
                  onClick={() => setShowMobileMenu(false)}
                  large
                />
                <li className="py-2">
                  <button
                    tabIndex={showMobileMenu ? 0 : -1}
                    onClick={editModal}
                    className="uppercase"
                  >
                    Edit Profile
                  </button>
                </li>
                <li className="py-2 pb-6">
                  <button
                    tabIndex={showMobileMenu ? 0 : -1}
                    onClick={handleLogOut}
                    className="uppercase text-amberText"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              loginRouteOptions.map(({ label, route }) => (
                <NavLink
                  key={label}
                  route={route}
                  label={label}
                  isVisible={showMobileMenu}
                  onClick={() => setShowMobileMenu(false)}
                  large
                />
              ))
            )}
          </ul>
        </div>
      </header>
      <EditProfileModal userData={loggedUser} />
    </>
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
  const isActive =
    route === '/' ? pathname === '/' : pathname === route || pathname.startsWith(`${route}/`);

  return (
    <li className={cn(large && 'py-2 first:pt-4 last:pb-6')}>
      <Link
        href={route}
        tabIndex={isVisible ? 0 : -1}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group relative inline-flex items-center gap-2 transition-colors duration-300 hover:text-amberText',
          !large && 'nh-label',
          !large &&
            'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-500 hover:after:scale-x-100',
          isActive && !large && 'after:scale-x-100',
          isActive && large && 'text-amberText',
        )}
      >
        {label}
        {label === 'Cart' && (
          <span
            aria-label={`${cartCount} items in cart`}
            className="inline-flex size-5 items-center justify-center rounded-full bg-amber font-text text-[10px] font-medium tracking-normal text-onAmber"
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
      aria-label={isDark ? 'Switch to noon (light) theme' : 'Switch to golden hour (dark) theme'}
      className="nh-label flex items-center gap-2 text-fgMuted transition-colors hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-2.5 rounded-full',
          mounted && isDark
            ? 'bg-amber shadow-[0_0_12px_rgb(var(--nh-amber))]'
            : 'border border-fg',
        )}
      />
      <span className="hidden sm:inline">{mounted && isDark ? 'Dusk' : 'Noon'}</span>
    </button>
  );
}

export const EditProfileModal = (userData: any) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const [updateProfile] = useUpdateProfileMutation();

  const onUpdate = async (data: any) => {
    console.log(data);
    try {
      const response = await updateProfile(data).unwrap();
      console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }

    dispatch(toggleModal({ isModalOpen: false, id: 'edit-profile' }));
  };

  useEffect(() => {
    dispatch(toggleModal({ isModalOpen: false, id: 'edit-profile' }));
  }, [dispatch, pathname]);

  const { username, email, contactNo, address } = userData?.userData?.data || {};

  return (
    <Modal id="edit-profile" title="Edit profile">
      <Form
        submitHandler={onUpdate}
        className="space-y-4"
        defaultValues={{
          username: username ?? '',
          email: email ?? '',
          contactNo: contactNo ?? '',
          address: address ?? '',
        }}
      >
        <Input label="Username" name="username" type="text" />
        <Input label="Email" name="email" type="email" disabled />
        <Input label="Contact No" name="contactNo" type="text" />
        <Textarea label="Address" name="address" />
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => dispatch(toggleModal({ isModalOpen: false, id: 'edit-profile' }))}
          >
            Cancel
          </Button>
          <Button variant="solid" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
