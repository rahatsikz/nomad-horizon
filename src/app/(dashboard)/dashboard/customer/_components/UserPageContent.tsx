"use client";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { getCookie } from "@/lib/cookies";
import React, { useEffect, useState } from "react";

export default function UserPageContent() {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      const token = await getCookie("accessToken");
      if (!token) {
        return;
      }
      setAccessToken(token);
    };

    getToken();
  }, []);

  const { username, isFetching } = useLoggedUserInfo(accessToken);

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <section className='relative isolate flex h-96 w-full flex-col justify-center overflow-hidden px-4 lg:px-6'>
      <div aria-hidden='true' className='nh-glow absolute -right-40 -top-40 -z-10 size-[36rem]' />
      <p className='nh-label text-amberText'>Customer desk</p>
      <h2 className='mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]'>
        Welcome{" "}
        <span className='font-accent font-normal normal-case italic tracking-normal text-amberText'>
          {username}
        </span>
      </h2>
      <p className='mt-3 text-lg text-fgMuted'>This is your dashboard</p>
    </section>
  );
}
