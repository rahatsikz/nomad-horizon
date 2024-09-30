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
};

const Input = ({ name, type, label, placeholder }: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = manageFormError(errors, name);

  return (
    <div>
      <div className='flex justify-between'>
        <label htmlFor={name} className='text-sm text-secondary'>
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
            max={type === "number" ? 100 : undefined}
            placeholder={placeholder}
            value={field.value ?? ""}
            className='h-10 w-full bg-transparent text-secondary rounded border border-neutral px-4 text-sm placeholder-transparent outline-none transition-all autofill:bg-transparent focus:border-primary focus:outline-none '
            autoComplete='off'
          />
        )}
      />
    </div>
  );
};

export default Input;
