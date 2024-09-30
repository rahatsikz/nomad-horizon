"use client";
import Logo from "@/assets/svgs/logo";
import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { HeaderText } from "@/components/ui/Headers";
import Input from "@/components/ui/Input";
import { registerSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React from "react";
import { SubmitHandler } from "react-hook-form";
export default function RegisterPageContent() {
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='container mx-auto px-8 flex flex-col items-center justify-center w-full h-full'>
      <div className='flex flex-col items-center'>
        <Link href='/'>
          <Logo />
        </Link>
        <HeaderText
          title='Sign Up'
          subtitle='To use Digital Service, sign up to our site'
        />
      </div>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(registerSchema)}
        className='space-y-8 w-full'
      >
        <Input label='Username' name='username' type='text' />
        <Input label='Email' name='email' type='text' />
        <Input label='Password' name='password' type='password' />
        <Button variant='solid' type='submit' className='w-full'>
          Register
        </Button>
      </Form>
      <small className='mt-4'>
        Already have an account?&nbsp;
        <Link href='/login' className='text-primary'>
          Login Here
        </Link>
      </small>
    </div>
  );
}
