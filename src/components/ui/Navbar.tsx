"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { usePathname } from "next/navigation";
import Logo from "@/assets/svgs/logo";
import { loginRouteOptions, navOptions } from "@/constant/global";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCookie } from "@/lib/cookies";
import { removeAccessToken } from "@/redux/slice/user/userSlice";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { clearCart } from "@/redux/slice/cart/cartSlice";
import NotificationMenu from "./NotificationMenu";

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dispatch = useAppDispatch();

  // useLoggedUser();

  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { username, role } = useLoggedUserInfo(accessToken);

  const myRef = useRef<HTMLDivElement>(null);

  // const user = "Rahat";

  useEffect(() => {
    const autoCloseNavbar = () => {
      if (myRef.current?.clientWidth) {
        if (myRef.current.clientWidth > 1024) {
          setShowMobileMenu(false);
        }
      }
    };

    autoCloseNavbar();

    window.addEventListener("resize", autoCloseNavbar);
  }, []);

  const handleLogOut = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    dispatch(removeAccessToken());
    dispatch(clearCart());
  };

  return (
    <header className='sticky top-0 left-0 z-10' ref={myRef}>
      <nav className='relative flex justify-between items-center py-8 px-8 lg:px-16 z-50 bg-mainBg shadow dark:shadow-gray-50/10'>
        <Link href='/' className='mt-1.5'>
          <Logo />
        </Link>
        <ul className='lg:flex items-center gap-6 hidden h-10'>
          {navOptions.map(({ label, route }) => (
            <NavLink
              key={label}
              route={route}
              label={label}
              isVisible={!showMobileMenu}
            />
          ))}
          {username && accessToken ? (
            <>
              <NotificationMenu />
              <DropdownMenu
                contents={[
                  { label: "Dashboard", route: `/dashboard/${role}` },
                  { label: "Edit Profile", route: "/profile" },
                  { label: "Logout", onClick: handleLogOut },
                ]}
                trigger={username[0]}
                className='bg-primary rounded-full text-white'
              />
            </>
          ) : (
            loginRouteOptions.map(({ label, route }) => (
              <NavLink
                key={label}
                route={route}
                label={label}
                isVisible={!showMobileMenu}
              />
            ))
          )}
        </ul>
        <div className='lg:hidden flex items-center gap-4'>
          {username && accessToken && <NotificationMenu />}
          <button
            className='lg:hidden focus-visible:ring-2 focus-visible:ring-offset-8 focus:outline-none'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label='Open Mobile Menu'
            title='Open Mobile Menu'
          >
            <HamburgerMenu showMobileMenu={showMobileMenu} />
          </button>
        </div>
      </nav>
      <div
        className={cn(
          "absolute z-10 w-full bg-mainBg transition-transform duration-700 ease-in-out backdrop-blur-sm shadow-md",
          {
            "translate-y-14 top-8": showMobileMenu,
            "-translate-y-full top-0": !showMobileMenu,
          }
        )}
      >
        <ul className='flex flex-col gap-4 px-8 py-6'>
          {navOptions.map(({ label, route }) => (
            <NavLink
              key={label}
              route={route}
              label={label}
              isVisible={showMobileMenu}
            />
          ))}
          {username && accessToken ? (
            <div className='border-t w-full space-y-2'>
              <p className='pt-2 text-blue-400'>{username}</p>
              <NavLink
                route={`/dashboard/${role}`}
                label='Dashboard'
                isVisible={showMobileMenu}
              />
              <NavLink
                route='/profile'
                label='Edit Profile'
                isVisible={showMobileMenu}
              />
              <button
                tabIndex={showMobileMenu ? 0 : -1}
                onClick={handleLogOut}
                className='text-secondary hover:text-primary transition-colors duration-300'
              >
                Logout
              </button>
            </div>
          ) : (
            loginRouteOptions.map(({ label, route }) => (
              <NavLink
                key={label}
                route={route}
                label={label}
                isVisible={showMobileMenu}
              />
            ))
          )}
        </ul>
      </div>
    </header>
  );
}

const NavLink = ({
  route,
  label,
  isVisible,
}: {
  route: string;
  label: string;
  isVisible?: boolean;
}) => {
  const pathname = usePathname();
  const { cart } = useAppSelector((state) => state.cart);

  if (label === "Cart") {
    return (
      <li>
        <Link
          href={route}
          tabIndex={isVisible ? 0 : -1}
          className={cn(
            "hover:text-primary transition-colors duration-300 relative",
            {
              "text-primary": route === pathname,
              "text-secondary": route !== pathname,
            }
          )}
        >
          <span>{label}</span>
          <span className='text-white bg-primary rounded-full size-4 text-xs flex items-center justify-center absolute bottom-4 -right-4'>
            {cart?.length}
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={route}
        tabIndex={isVisible ? 0 : -1}
        className={cn("hover:text-primary transition-colors duration-300", {
          "text-primary": route === pathname,
          "text-secondary": route !== pathname,
        })}
      >
        {label}
      </Link>
    </li>
  );
};

const HamburgerMenu = ({ showMobileMenu }: { showMobileMenu: boolean }) => {
  return (
    <div className={cn({ "space-y-1": !showMobileMenu })}>
      <span
        className={cn(
          "block w-6 h-0.5 bg-secondary transition-transform duration-300",
          { "rotate-45": showMobileMenu }
        )}
      ></span>
      <span
        className={cn("w-3 h-0.5 bg-secondary", {
          "opacity-0": showMobileMenu,
          block: !showMobileMenu,
        })}
      ></span>
      <span
        className={cn(
          "block w-6 h-0.5 bg-secondary  transition-transform duration-300",
          {
            "-rotate-45 -translate-y-full": showMobileMenu,
          }
        )}
      ></span>
    </div>
  );
};
