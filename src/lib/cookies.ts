"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setCookie = (name: string, value: string, options?: any) => {
  cookies().set(name, value, {
    secure: true,
  });
  if (options.redirectTo) {
    redirect(options.redirectTo);
  }
};

export const getCookie = (name: string) => {
  return cookies().get(name)?.value;
};

export const deleteCookie = (name: string) => {
  cookies().delete(name);
};
