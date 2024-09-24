"use client";
import React from "react";

type InputProps = {
  name: string;
  handleChange: (e: string) => void;
  label: string;
  type: "number" | "text" | "email" | "password" | "search";
  placeholder?: string;
  value?: string | number;
  //   defaultValue?: string;
};

const Input = ({
  name,
  handleChange,
  type,
  label,
  placeholder,
  //   defaultValue,
  value,
}: InputProps) => {
  return (
    <div className=''>
      <label htmlFor={name} className='text-sm text-secondary'>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        min={type === "number" ? 0 : undefined}
        max={type === "number" ? 100 : undefined}
        // defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        className='h-10 w-full  bg-transparent text-secondary rounded border border-neutral px-4 text-sm placeholder-transparent outline-none transition-all autofill:bg-transparent invalid:border-pink-500 invalid:text-pink-500 focus:border-primary focus:outline-none '
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
