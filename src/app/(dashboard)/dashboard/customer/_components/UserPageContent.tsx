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
    <section className='flex h-96 justify-center w-full items-center'>
      <h2 className='text-3xl text-secondary w-full text-center'>
        Welcome <span className='text-primary'>{username}</span>, This is your
        dashboard
      </h2>
    </section>
  );
}
