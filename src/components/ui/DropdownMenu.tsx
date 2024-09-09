"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

type DropdownMenuProps = {
  contents: {
    label: string;
    route?: string;
    onClick?: () => void;
  }[];
  trigger: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const DropdownMenu = ({
  contents,
  trigger,
  ...props
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (open) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev === null ? 0 : (prev + 1) % contents.length
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev === null
            ? contents.length - 1
            : (prev - 1 + contents.length) % contents.length
        );
      } else if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus(); // Refocus on button after closing
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, focusedIndex]);

  const handleDropdownPosition = () => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    const rect = dropdown.getBoundingClientRect();
    const availableSpaceBelow = window.innerHeight - rect.bottom;
    const availableSpaceRight = window.innerWidth - rect.right;
    // console.log(rect);

    const dropdownHeight = dropdown.offsetHeight;
    const dropdownWidth = dropdown.offsetWidth;

    // Check if there's enough space below
    const shouldOpenUpwards = availableSpaceBelow < dropdownHeight;

    // Check if there's enough space on the right
    const shouldAlignRight = availableSpaceRight < dropdownWidth;
    // Check if there's enough space on the left
    const shouldAlignLeft = !shouldAlignRight && rect.left < dropdownWidth;

    // Remove previous positioning classes
    dropdown.classList.remove(
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
      dropdown.classList.add("bottom-full", "top-auto");
    } else {
      dropdown.classList.add("top-full");
    }

    if (shouldAlignRight) {
      dropdown.classList.add("right-0");
    } else if (shouldAlignLeft) {
      dropdown.classList.add("left-0");
    } else {
      dropdown.classList.add("left-1/2", "right-1/2", "-translate-x-1/2");
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

  return (
    <div className='relative inline-block'>
      <button
        ref={buttonRef}
        className={cn(
          "px-4 py-2 border rounded-md focus:outline-none focus-visible:ring-1",
          props?.className
        )}
        onClick={handleButtonClick}
        aria-expanded={open}
        aria-haspopup='true'
      >
        {trigger}
      </button>
      {open && (
        <div
          ref={dropdownRef}
          className='absolute mt-2 w-48 bg-mainBg shadow-main rounded-md overflow-hidden'
        >
          <ul role='menu' className='divide-y divide-gray-200'>
            {contents.map((item, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer ${
                  focusedIndex === index ? "text-primary" : ""
                }`}
                tabIndex={-1}
                role='menuitem'
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => {
                  console.log(`Selected: ${item.label}`);
                  item.onClick && item.onClick();
                  setOpen(false);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
