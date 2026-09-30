"use client";
import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { Wordmark } from "@/components/ui/Wordmark";
import Input from "@/components/ui/Input";
import withAuth from "@/lib/withAuth";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { registerSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
const RegisterPageContent = () => {
  const [createUser] = useCreateUserMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      // console.log(data);
      const response = await createUser(data).unwrap();
      // console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };
  return (
    <div className='nh-fade-up flex w-full flex-col'>
      <Wordmark className='w-fit text-lg lg:hidden' />
      <p className='nh-label mt-10 text-amberText lg:mt-0'>New passenger</p>
      <h1 className='mt-4 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em] sm:text-6xl'>
        Sign <span className='font-accent font-normal normal-case italic tracking-normal text-amberText'>up</span>
      </h1>
      <p className='mt-4 text-fgMuted'>To use Digital Service, sign up to our site</p>

      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(registerSchema)}
        className='mt-10 w-full space-y-8'
      >
        <div className='space-y-5'>
          <Input label='Username' name='username' type='text' />
          <Input label='Email' name='email' type='text' />
          <Input label='Password' name='password' type='password' />
        </div>
        <Button variant='solid' type='submit' className='w-full py-3.5'>
          Register
        </Button>
      </Form>

      <p className='mt-6 text-sm text-fgMuted'>
        Already have an account?&nbsp;
        <Link href='/login' className='text-amberText underline decoration-amber/50 underline-offset-4 hover:decoration-amber'>
          Login Here
        </Link>
      </p>
    </div>
  );
};

export default withAuth(RegisterPageContent);
