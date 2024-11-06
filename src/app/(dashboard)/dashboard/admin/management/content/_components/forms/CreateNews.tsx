"use client";
import Accordion from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useAddNewsMutation } from "@/redux/api/newsApi";
import { newsSchema } from "@/schemas/content";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import toast from "react-hot-toast";

export default function CreateNews() {
  const [addNews] = useAddNewsMutation();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const response = await addNews(data).unwrap();
      //   console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Accordion header='Create News' id='news'>
      <Form
        submitHandler={onSubmit}
        className='space-y-4 text-center'
        resolver={yupResolver(newsSchema)}
      >
        <div className='grid lg:grid-cols-2 gap-4'>
          <Input label='Title' name='title' type='text' />
          <DatePicker label='Date' name='date' />
        </div>
        <Textarea label='Content' name='content' />

        <Button className='xl:w-2/12' variant='solid' type='submit'>
          Create
        </Button>
      </Form>
    </Accordion>
  );
}
