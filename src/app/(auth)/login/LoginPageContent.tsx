"use client";
import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { Wordmark } from "@/components/ui/Wordmark";
import Input from "@/components/ui/Input";
import { setCookie } from "@/lib/cookies";
import withAuth from "@/lib/withAuth";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setAccessToken } from "@/redux/slice/user/userSlice";
import { loginSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const LoginPageContent = () => {
  const [userLogin] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const [showCredential, setShowCredential] = useState<any>("");

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      // console.log(data);
      const response = await userLogin({ ...data }).unwrap();
      // console.log(response);
      if (response.statusCode === 200) {
        setCookie("accessToken", response.data.accessToken);
        dispatch(setAccessToken(response.data.accessToken));
        toast.success("Login successful");
      }
    } catch (error: any) {
      // console.log(error);
      toast.error(error.data.message);
    }
  };

  const defaultValues = {
    admin: {
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_ADMIN_PASS,
    },
    user: {
      email: process.env.NEXT_PUBLIC_USER_EMAIL,
      password: process.env.NEXT_PUBLIC_USER_PASS,
    },
  } as any;

  return (
    <div className='nh-fade-up flex w-full flex-col'>
      <Wordmark className='w-fit text-lg lg:hidden' />
      <p className='nh-label mt-10 text-amberText lg:mt-0'>Check in</p>
      <h1 className='mt-4 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em] sm:text-6xl'>
        Sign <span className='font-accent font-normal normal-case italic tracking-normal text-amberText'>in</span>
      </h1>
      <p className='mt-4 text-fgMuted'>Sign in to your account to continue</p>

      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(loginSchema)}
        className='mt-10 w-full space-y-8'
        defaultValues={defaultValues[showCredential]}
        isDefaultValueResetable={true}
      >
        <div className='space-y-5'>
          <Input label='Email' name='email' type='text' />
          <Input label='Password' name='password' type='password' />
        </div>
        <Button variant='solid' type='submit' className='w-full py-3.5'>
          Login
        </Button>
      </Form>

      <p className='mt-6 text-sm text-fgMuted'>
        New to Nomad Horizon?&nbsp;
        <Link href='/register' className='text-amberText underline decoration-amber/50 underline-offset-4 hover:decoration-amber'>
          Register
        </Link>
      </p>

      <div className='mt-10 border-t border-fg/10 pt-6'>
        <p className='nh-label text-fgMuted'>Just looking around?</p>
        <div className='mt-4 flex flex-wrap gap-2'>
          <button
            type='button'
            className='rounded-full border border-fg/20 px-4 py-2 text-xs transition-colors hover:border-amber hover:text-amberText focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber'
            onClick={() => setShowCredential("user")}
          >
            Demo User Login Credential
          </button>
          <button
            type='button'
            className='rounded-full border border-fg/20 px-4 py-2 text-xs transition-colors hover:border-amber hover:text-amberText focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber'
            onClick={() => setShowCredential("admin")}
          >
            Demo Admin Login Credential
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(LoginPageContent);
