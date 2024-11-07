"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import errorImg from "@/assets/images/error-amico.png";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/");
    }, 5000);
  }, [push]);

  return (
    <section className='flex justify-center items-center bg-mainBg h-screen'>
      <Image
        src={errorImg.src}
        alt='error'
        width={100}
        height={100}
        sizes='100vw'
        style={{ height: "auto" }}
        className='object-cover xl:w-1/3 w-1/2 mx-auto'
      />
    </section>
  );
}
