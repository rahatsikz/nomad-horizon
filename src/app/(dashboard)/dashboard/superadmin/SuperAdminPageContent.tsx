"use client";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

export default function SuperAdminPageContent() {
  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;

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
