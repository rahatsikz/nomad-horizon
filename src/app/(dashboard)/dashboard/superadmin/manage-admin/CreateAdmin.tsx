import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { registerSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateAdmin() {
  const [createUser] = useCreateUserMutation();
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data["role"] = "admin";
    try {
      //   console.log(data);
      const response = await createUser(data).unwrap();
      console.log(response);
      if (response.statusCode === 200) {
        toast.success("Admin created successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };
  return (
    <div className='px-6'>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(registerSchema)}
        className='w-full space-y-8 text-center'
      >
        <div className='grid lg:grid-cols-3 gap-4'>
          <Input label='Admin Username' name='username' type='text' />
          <Input label='Email' name='email' type='text' />
          <Input label='Password' name='password' type='password' />
        </div>
        <Button variant='solid' type='submit' className='xl:w-2/12'>
          Create
        </Button>
      </Form>
    </div>
  );
}
