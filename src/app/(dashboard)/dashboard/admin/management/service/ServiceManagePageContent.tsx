"use client";
import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import ImageInput from "@/components/ui/ImageInput";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import {
  endTime,
  serviceCategory,
  serviceStatus,
  startTime,
} from "@/constant/global";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import React from "react";

export default function ServiceManagePageContent() {
  const imgBBUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;
  const [addService] = useAddServiceMutation();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("image", data.image);

    const response = await fetch(imgBBUrl, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (typeof data.image !== "string") {
      data.image = result.data.url;
    }

    data.price = Number(data.price);

    try {
      console.log(data);
      const response = await addService(data).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <section className='px-4 py-8'>
      <Form submitHandler={onSubmit} className='space-y-4'>
        <div className='grid md:grid-cols-2 gap-4'>
          <Input label='Service Name' name='serviceName' type='text' />
          <Input label='Price' name='price' type='text' />
          <Select
            label='Category'
            name='category'
            placeholder='Select a Category'
            options={serviceCategory}
            searchable={false}
          />
          <Select
            label='Availability'
            name='status'
            placeholder='Select Service Status'
            options={serviceStatus}
            searchable={false}
          />
        </div>
        <Textarea label='Description' name='content' />
        <Input label='Image Link' name='image' type='text' />
        <div className='flex items-center gap-4 xl:w-5/12 mx-auto'>
          <div className='h-px w-full bg-secondary'></div>
          <p className='text-secondary'>OR</p>
          <div className='h-px w-full bg-secondary'></div>
        </div>
        <ImageInput name='image' />
        <div className='border dark:border-neutral px-4 xl:px-8 py-6 rounded'>
          <div className='w-full space-y-6 md:space-y-4 max-md:divide-y-2 dark:divide-neutral'>
            {days.map((day, idx) => (
              <div
                key={day}
                className='md:flex justify-between max-md:space-y-4  items-center gap-2 w-full'
              >
                <h2 className='text-secondary w-2/12 2xl:w-1/12 mt-6'>{day}</h2>
                <div className='w-full md:flex max-md:space-y-2 lg:gap-8 gap-4 items-center'>
                  <div className='md:flex max-md:space-y-2 gap-4 xl:w-9/12 w-full items-center'>
                    <Select
                      label='Start Time'
                      placeholder={startTime[0].label}
                      name={`startTime[${idx}]`}
                      options={startTime}
                      searchable={false}
                    />
                    <Select
                      label='End Time'
                      placeholder={endTime[endTime.length - 1].label}
                      name={`endTime[${idx}]`}
                      options={endTime}
                      searchable={false}
                    />
                  </div>
                  <div className='md:w-full'>
                    <Input
                      label='Session Duration in Minutes'
                      name={`eachSessionDuration[${idx}]`}
                      type='number'
                    />
                  </div>
                </div>
                <div className='mt-6'>
                  <Button variant='outline'>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button variant='solid' type='submit'>
          Submit
        </Button>
      </Form>
    </section>
  );
}
