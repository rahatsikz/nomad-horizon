"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/assets/svgs/logo";
import { loginRouteOptions, navOptions } from "@/constant/global";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCookie } from "@/lib/cookies";
import { removeAccessToken } from "@/redux/slice/user/userSlice";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
// import { clearCart } from "@/redux/slice/cart/cartSlice";
import NotificationMenu from "./NotificationMenu";
import Modal from "./Modal";
import Form from "./Form";
import Input from "./Input";
import Textarea from "./Textarea";
import { Button } from "./Button";
import { toggleModal } from "@/redux/slice/modal/modalSlice";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/assets/svgs/heroIcons";

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // useLoggedUser();

  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { username, role, user: loggedUser } = useLoggedUserInfo(accessToken);

  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const autoCloseNavbar = () => {
      if (myRef.current?.clientWidth) {
        if (myRef.current.clientWidth >= 1024) {
          setShowMobileMenu(false);
        }
      }
    };

    autoCloseNavbar();

    window.addEventListener("resize", autoCloseNavbar);
  }, []);

  const handleLogOut = () => {
    deleteCookie(["accessToken", "refreshToken"]);
    dispatch(removeAccessToken());
    // dispatch(clearCart());
    router.refresh();
  };

  const editModal = () => {
    dispatch(toggleModal({ isModalOpen: true, id: "edit-profile" }));
  };

  return (
    <header className='sticky top-0 left-0 z-10' ref={myRef}>
      <nav className='relative flex justify-between items-center py-8 px-4 sm:px-8 lg:px-16 z-50 bg-mainBg shadow dark:shadow-gray-900'>
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
                  { label: "Edit Profile", onClick: editModal },
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
          <ThemeToggler />
        </ul>
        <div className='lg:hidden flex items-center gap-4'>
          {username && accessToken && <NotificationMenu />}
          <ThemeToggler />
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
            "translate-y-14 top-10": showMobileMenu,
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
              <p className='pt-2 text-neutral'>{username}</p>
              <NavLink
                route={`/dashboard/${role}`}
                label='Dashboard'
                isVisible={showMobileMenu}
              />
              <NavLink
                route=''
                onClick={editModal}
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
      <EditProfileModal userData={loggedUser} />
    </header>
  );
}

const NavLink = ({
  route,
  label,
  isVisible,
  onClick,
}: {
  route: string;
  label: string;
  isVisible?: boolean;
  onClick?: () => void;
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
    <li onClick={onClick}>
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

const EditProfileModal = (userData: any) => {
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

    dispatch(toggleModal({ isModalOpen: false, id: "edit-profile" }));
  };

  useEffect(() => {
    dispatch(toggleModal({ isModalOpen: false, id: "edit-profile" }));
  }, [dispatch, pathname]);

  const { username, email, contactNo, address } =
    userData?.userData?.data || {};

  return (
    <Modal id='edit-profile'>
      <Form
        submitHandler={onUpdate}
        className='space-y-4'
        defaultValues={{
          username: username ?? "",
          email: email ?? "",
          contactNo: contactNo ?? "",
          address: address ?? "",
        }}
      >
        <Input label='Username' name='username' type='text' />
        <Input label='Email' name='email' type='email' disabled />
        <Input label='Contact No' name='contactNo' type='text' />
        <Textarea label='Address' name='address' />
        <div className='flex justify-end gap-2'>
          <Button
            variant='solid'
            type='submit'
            className='py-1 bg-red-400 hover:border-red-400 hover:text-red-400'
          >
            Update
          </Button>
          <Button
            variant='outline'
            className='py-1'
            onClick={() =>
              dispatch(toggleModal({ isModalOpen: false, id: "edit-profile" }))
            }
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant='ghost'
      className='px-0 py-1 hover:bg-transparent'
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
