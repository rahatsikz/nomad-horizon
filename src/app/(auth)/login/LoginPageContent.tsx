"use client";
import Logo from "@/assets/svgs/logo";
import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { HeaderText } from "@/components/ui/Headers";
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
    <div className='container mx-auto px-8 flex flex-col items-center justify-center w-full h-full'>
      <div className='flex flex-col items-center'>
        <Link href='/' title='Click to go homepage'>
          <Logo />
        </Link>
        <HeaderText
          title='Sign in'
          subtitle='sign in to your account to continue'
        />
      </div>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(loginSchema)}
        className='space-y-8 w-full'
        defaultValues={defaultValues[showCredential]}
        isDefaultValueResetable={true}
      >
        <div className='space-y-4'>
          <Input label='Email' name='email' type='text' />
          <Input label='Password' name='password' type='password' />
        </div>
        <Button variant='solid' type='submit' className='w-full'>
          Login
        </Button>
      </Form>
      <small className='mt-4'>
        New to Nomad Horizon?&nbsp;
        <Link href='/register' className='text-primary'>
          Register
        </Link>
      </small>
      <div className='md:divide-x md:space-x-2 text-primary mt-4 max-md:text-center max-md:space-y-1'>
        <button className='text-xs' onClick={() => setShowCredential("user")}>
          Demo User Login Credential
        </button>
        <button
          className='md:pl-2 text-xs max-md:block'
          onClick={() => setShowCredential("admin")}
        >
          Demo Admin Login Credential
        </button>
      </div>
    </div>
  );
};

export default withAuth(LoginPageContent);
