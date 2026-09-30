"use client";
import { NotificationIcon } from "@/assets/svgs/heroIcons";
import { cn } from "@/lib/utils";
import { useGetNotificationQuery } from "@/redux/api/notificationApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setNotifications } from "@/redux/slice/user/userSlice";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function NotificationMenu() {
  const { data: notificationData } = useGetNotificationQuery(
    {},
    {
      refetchOnFocus: true,
    }
  );

  // notification count
  const [notificationCount, setNotificationsCount] = useState(0);

  const { user } = useAppSelector((state) => state.user);

  const { seenNotifications } = user;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!notificationData) return;

    const unSeenNotifications = notificationData?.data?.filter(
      (n: any) => !seenNotifications.includes(n.id)
    );

    setNotificationsCount(unSeenNotifications.length);
  }, [notificationData, seenNotifications]);

  //state and refs
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
        // notification count manage
        const previousSeenNotificationIds = [...seenNotifications];
        const newNotificationIds = notificationData?.data
          ?.filter((n: any) => !previousSeenNotificationIds.includes(n.id))
          .map((n: any) => n.id);

        // Update seenNotifications state
        if (newNotificationIds) {
          dispatch(setNotifications(newNotificationIds));
        }
        // reset
        setNotificationsCount(0);
      }
    };

    if (open) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open, dispatch, notificationData, seenNotifications]);

  const handleDropdownPosition = () => {
    const menu = menuRef.current;
    if (!menu) return;

    const rect = menu.getBoundingClientRect();
    const availableSpaceBelow = window.innerHeight - rect.bottom;
    const availableSpaceRight = window.innerWidth - rect.right;
    // console.log(rect);

    const dropdownHeight = menu.offsetHeight;
    const dropdownWidth = menu.offsetWidth;

    // Check if there's enough space below
    const shouldOpenUpwards = availableSpaceBelow < dropdownHeight;

    // Check if there's enough space on the right
    const shouldAlignRight = availableSpaceRight < dropdownWidth;
    // Check if there's enough space on the left
    const shouldAlignLeft = !shouldAlignRight && rect.left < dropdownWidth;

    // Remove previous positioning classes
    menu.classList.remove(
      "top-full",
      "bottom-full",
      "right-0",
      "left-1/2",
      "right-1/2",
      "-translate-x-1/2",
      "top-auto",
      "left-0"
    );

    // Add positioning classes based on available space
    if (shouldOpenUpwards) {
      // menu.classList.add("bottom-full", "top-auto");
    } else {
      menu.classList.add("top-full");
    }

    if (shouldAlignRight) {
      menu.classList.add("right-0");
    } else if (shouldAlignLeft) {
      menu.classList.add("left-0");
    } else {
      menu.classList.add("left-1/2", "right-1/2", "-translate-x-1/2");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleDropdownPosition);
    handleDropdownPosition();
    return () => window.removeEventListener("resize", handleDropdownPosition);
  }, [open]);

  // Handle button click, with closing prevention
  const handleButtonClick = () => {
    if (closing) return; // Prevent immediate reopening
    setOpen(!open);
    // notification count manage
    const previousSeenNotificationIds = [...seenNotifications];
    const newNotificationIds = notificationData?.data
      ?.filter((n: any) => !previousSeenNotificationIds.includes(n.id))
      .map((n: any) => n.id);

    // Update seenNotifications state
    if (newNotificationIds) {
      dispatch(setNotifications(newNotificationIds));
    }
    // reset
    setNotificationsCount(0);
  };

  // Ensure there's a delay before reopening after close
  useEffect(() => {
    if (!open) {
      setClosing(true);
      const timeout = setTimeout(() => {
        setClosing(false);
      }, 200); // 200ms delay before dropdown can be reopened
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // showing toast when new notification comes
  useEffect(() => {
    const previousSeenNotificationIds = [...seenNotifications];
    const newNotification = notificationData?.data
      ?.slice(0, 3)
      .filter((n: any) => !previousSeenNotificationIds.includes(n.id));

    if (newNotification) {
      newNotification.forEach((n: any) => {
        toast.success(n.content, {
          duration: 6000,
          id: n.id,
        });
      });
    }
  }, [notificationData, seenNotifications]);

  return (
    <div className='relative inline-block'>
      <button
        ref={buttonRef}
        className={cn(
          "rounded-md py-2 text-fg focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
        )}
        onClick={handleButtonClick}
        aria-expanded={open}
        aria-haspopup='true'
      >
        <div className='relative'>
          <span>
            <NotificationIcon />
          </span>
          <span className='absolute -right-1.5 bottom-3.5 flex size-4 items-center justify-center rounded-full bg-amber text-[10px] font-medium text-onAmber'>
            {notificationCount}
          </span>
        </div>
      </button>
      {open && (
        <div
          ref={menuRef}
          className='absolute z-20 mt-3 w-72 overflow-hidden rounded-xl border border-fg/10 bg-raised shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)]'
        >
          <ul role='menu' className='divide-y divide-fg/10'>
            {notificationData?.data?.length > 0 ? (
              notificationData?.data
                ?.slice(0, 5)
                .map((item: any, index: number) => (
                  <li
                    key={index}
                    className='cursor-pointer px-5 py-3 text-sm font-light text-fg'
                    tabIndex={-1}
                    role='menuitem'
                  >
                    {item?.content}
                  </li>
                ))
            ) : (
              <li
                className='px-5 py-4 text-center text-sm text-fgMuted'
                tabIndex={-1}
                role='menuitem'
              >
                No notifications found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
