"use client";
import Logo from "@/assets/svgs/logo";
import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { HeaderText } from "@/components/ui/Headers";
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
        <div className='space-y-4'>
          <Input label='Username' name='username' type='text' />
          <Input label='Email' name='email' type='text' />
          <Input label='Password' name='password' type='password' />
        </div>
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
};

export default withAuth(RegisterPageContent);
