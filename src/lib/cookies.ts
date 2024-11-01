"use server";
import { cookies } from "next/headers";

export const setCookie = (name: string, value: string) => {
  cookies().set(name, value, {
    secure: true,
  });
};

export const getCookie = (name: string) => {
  return cookies().get(name)?.value;
};

export const deleteCookie = (names: string[]) => {
  names.forEach((name) => {
    cookies().delete(name);
  });
};
