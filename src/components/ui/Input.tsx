"use client";
import { manageFormError } from "@/lib/utils";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  label: string;
  type: "number" | "text" | "email" | "password" | "search";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onchange?: (value: string) => void;
};

const Input = ({
  name,
  type,
  label,
  placeholder,
  disabled,
  onchange,
}: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = manageFormError(errors, name);

  return (
    <div>
      <div className='flex justify-between'>
        <label htmlFor={name} className='text-sm text-secondary mb-1'>
          {label}
        </label>
        <small className='text-red-400'>{errorMessage}</small>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            min={type === "number" ? 0 : undefined}
            max={type === "number" ? 360 : undefined}
            placeholder={placeholder}
            onChange={(e) => onchange && onchange(e.target.value)}
            className='h-10 w-full bg-transparent text-secondary rounded border dark:border-neutral px-4 text-sm  outline-none transition-all autofill:bg-transparent focus:border-primary focus:outline-none disabled:text-neutral disabled:cursor-not-allowed'
            autoComplete='off'
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

export default Input;
