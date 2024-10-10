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
};

const Select = ({
  options,
  name,
  label,
  placeholder = "Select an option",
  searchable = true,
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

  return (
    <div className='relative lg:w-full w-full ' ref={selectRef}>
      <div className='flex justify-between'>
        <p className='text-sm text-secondary mb-1'>{label}</p>
        <small className='text-red-400'>{errorMessage}</small>
      </div>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <button
              onClick={handleOpen}
              className='text-left outline-none w-full flex justify-between items-center border dark:border-neutral rounded px-4 py-[9px] text-sm bg-transparent text-secondary focus:border-primary'
            >
              {options.find((option) => option.value.includes(field.value))
                ?.label || placeholder}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-3 w-3  transition-transform ${
                  isArrowRotated ? "transform rotate-180" : ""
                }`}
                viewBox='0 0 20 20'
                fill='none'
                stroke='#B3B8C2'
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
              <div className='absolute  mt-2 w-full  bg-mainBg text-secondary border dark:border-neutral rounded shadow-lg z-[1]'>
                {searchable && (
                  <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    ref={inputRef}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='block w-full border-b  bg-mainBg  dark:border-neutral py-2 px-3 focus:outline-none'
                  />
                )}
                <div className='max-h-60 h-fit overflow-y-auto'>
                  {filteredOptions.map((option: Option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        field.onChange(option.value);
                        setIsOpen(false);
                        setIsArrowRotated(false);
                      }}
                      className='px-4 py-2 flex items-center gap-2 cursor-pointer hover:text-primary'
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
