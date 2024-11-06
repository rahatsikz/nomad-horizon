"use client";
import Accordion from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useAddEventMutation } from "@/redux/api/eventApi";
import { eventSchema } from "@/schemas/content";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import toast from "react-hot-toast";

export default function CreateEvent() {
  const [addEvent] = useAddEventMutation();
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const response = await addEvent(data).unwrap();
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Accordion header='Create Event' id='event'>
      <Form
        submitHandler={onSubmit}
        className='space-y-4 text-center'
        resolver={yupResolver(eventSchema)}
      >
        <div className='grid lg:grid-cols-2 gap-4'>
          <Input label='Title' name='title' type='text' />
          <DatePicker label='Date' name='date' />
          <Input label='City' name='city' type='text' />
          <Input label='Country' name='country' type='text' />
        </div>
        <Textarea label='Content' name='content' />

        <Button className='xl:w-2/12' variant='solid' type='submit'>
          Create
        </Button>
      </Form>
    </Accordion>
  );
}
