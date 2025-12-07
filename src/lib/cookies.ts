'use server';
import { cookies } from 'next/headers';

export const setCookie = async (name: string, value: string) => {
  (await cookies()).set(name, value, {
    secure: true,
  });
};

export const getCookie = async (name: string) => {
  return (await cookies()).get(name)?.value;
};

export const deleteCookie = async (names: string[]) => {
  const cookieStore = await cookies();
  names.forEach((name) => {
    cookieStore.delete(name);
  });
};
