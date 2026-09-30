"use client";
import { manageFormError } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type Option = {
  value: string;
  label: string;
};

type SelectComponentProps = {
  label?: string;
  name: string;
  options: Option[];
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const Select = ({
  options,
  name,
  label,
  placeholder = "Select an option",
  searchable = true,
  disabled = false,
  onChange,
}: SelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLInputElement>(null);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = manageFormError(errors, name);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (disabled) return;

    setIsOpen(!isOpen);
    setIsArrowRotated(!isArrowRotated);
    // if (!isOpen && inputRef.current) {
    //   inputRef.current.focus();
    // }
  };
  useEffect(() => {
    // Focus on the input field when the dropdown is opened
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsArrowRotated(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // useEffect(() => {}, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

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
  }, [isOpen]);

  return (
    <div className='relative lg:w-full w-full ' ref={selectRef}>
      <div className='flex justify-between'>
        {label && <p className='nh-label mb-2 text-fgMuted'>{label}</p>}
        <small className='text-xs text-danger'>{errorMessage}</small>
      </div>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <button
              onClick={handleOpen}
              type='button'
              aria-haspopup='listbox'
              aria-expanded={isOpen}
              className='flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-fg/20 bg-raised/60 px-4 text-left text-sm text-fg outline-none transition-colors hover:border-fg/35 focus-visible:border-amber focus-visible:ring-1 focus-visible:ring-amber'
            >
              {options.find((option) => option.value.includes(field.value))
                ?.label || placeholder}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-3 w-3 shrink-0 text-fgMuted transition-transform ${
                  isArrowRotated ? "transform rotate-180" : ""
                }`}
                viewBox='0 0 20 20'
                fill='none'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
            {isOpen && (
              <div
                role='listbox'
                className='absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-fg/15 bg-raised text-fg shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)]'
                ref={dropdownRef}
              >
                {searchable && (
                  <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    ref={inputRef}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='block w-full border-b border-fg/10 bg-transparent px-4 py-2.5 text-sm text-fg placeholder:text-fgMuted focus:outline-none'
                  />
                )}
                <div className='max-h-60 h-fit overflow-y-auto'>
                  {filteredOptions.map((option: Option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        field.onChange(option.value);
                        onChange && onChange(option.value);
                        setIsOpen(false);
                        setIsArrowRotated(false);
                      }}
                      role='option'
                      aria-selected={field.value === option.value}
                      className='flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-amber/15 hover:text-amberText'
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Select;
