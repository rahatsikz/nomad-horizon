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
import React from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const LoginPageContent = () => {
  const [userLogin] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  // const router = useRouter();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      // console.log(data);
      const response = await userLogin({ ...data }).unwrap();
      // console.log(response);
      if (response.statusCode === 200) {
        setCookie("accessToken", response.data.accessToken);
        dispatch(setAccessToken(response.data.accessToken));
        toast.success(response.message);

        // setTimeout(() => {
        //   router.back();
        // }, 3000);
      }
    } catch (error: any) {
      // console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className='container mx-auto px-8 flex flex-col items-center justify-center w-full h-full'>
      <div className='flex flex-col items-center'>
        <Link href='/'>
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
    </div>
  );
};

export default withAuth(LoginPageContent);
