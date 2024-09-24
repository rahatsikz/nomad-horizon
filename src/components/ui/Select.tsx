"use client";
import React, { useEffect, useRef, useState } from "react";

export type Option = {
  value: string;
  label: string;
};

type SelectComponentProps = {
  onChange: (value: Option) => void;
  value: Option;
  options: Option[];
  label: string;
};

const Select = ({ options, onChange, value, label }: SelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLInputElement>(null);
  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
    setIsArrowRotated(false);
  };

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
      <label className='text-sm text-secondary'>{label}</label>
      <button
        onClick={handleOpen}
        className='text-left outline-none w-full flex justify-between items-center border border-neutral rounded px-4 py-[9px] text-sm bg-transparent text-secondary focus:border-primary'
      >
        {value?.label || options[0].label}
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
        <div className='absolute  mt-2 w-full bg-nomadGray text-secondary border border-neutral rounded shadow-lg '>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            ref={inputRef}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='block w-full border-b bg-nomadGray  border-neutral py-2 px-3 focus:outline-none'
          />
          <div className='max-h-60 h-fit overflow-y-auto'>
            {filteredOptions.map((option: Option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className='px-4 py-2 flex items-center gap-2 cursor-pointer hover:text-primary'
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
