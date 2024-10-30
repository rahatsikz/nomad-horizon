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
import { cn } from "@/lib/utils";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import { serviceSchema } from "@/schemas/service";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddService() {
  const [removedDays, setRemovedDays] = useState<string[]>([]);

  const imgBBUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;
  const [addService] = useAddServiceMutation();

  const onSubmit = async (data: any) => {
    let result;

    if (typeof data.image !== "string" && typeof data.image !== "undefined") {
      const formData = new FormData();
      formData.append("image", data.image);

      const response = await fetch(imgBBUrl, {
        method: "POST",
        body: formData,
      });

      result = await response.json();
    }

    if (typeof data.image !== "string" && typeof data.image !== "undefined") {
      data.image = result.data.url;
    }

    data.price = Number(data.price);

    data.schedule = data.schedule.map((schedule: any, idx: number) => {
      return {
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        eachSessionDuration: Number(schedule.eachSessionDuration),
        daysOfWeek: days[idx],
      };
    });

    data.schedule = data.schedule.filter(
      (schedule: any) => !removedDays.includes(schedule.daysOfWeek)
    );

    if (
      data.schedule.find(
        (schedule: any) =>
          !schedule.startTime ||
          !schedule.endTime ||
          !schedule.eachSessionDuration
      )
    ) {
      return toast.error("Please fill up the schedule fields");
    }

    try {
      // console.log(data, typeof data.image);
      const response = await addService(data).unwrap();
      console.log(response);
      if (response.statusCode === 200) {
        setRemovedDays([]);
        toast.success(response.message);
      }
    } catch (error: any) {
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

  const removeDay = (day: string) => {
    setRemovedDays([...removedDays, day]);
  };

  const insertDay = (day: string) => {
    setRemovedDays(removedDays.filter((d) => d !== day));
  };

  return (
    <section className='px-6 py-8'>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(serviceSchema)}
        className='space-y-4'
      >
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
          <div className='w-full space-y-6 md:space-y-4 max-lg:divide-y-2 dark:divide-neutral'>
            {days.map((day, idx) => (
              <div
                key={day}
                className={cn(
                  "lg:flex justify-between max-lg:space-y-4  items-center gap-2 lg:gap-8 w-full"
                )}
              >
                <h2
                  className={cn(
                    "text-secondary w-2/12 2xl:w-1/12 mt-6",
                    removedDays.includes(day) ? "opacity-20" : ""
                  )}
                >
                  {day}
                </h2>
                <div
                  className={cn(
                    "w-full lg:flex max-lg:space-y-2 lg:gap-8 gap-4 items-center",
                    removedDays.includes(day) ? "opacity-20" : ""
                  )}
                >
                  <div className='md:flex max-md:space-y-2 gap-4 xl:w-9/12 w-full items-center'>
                    <Select
                      label='Start Time'
                      // placeholder={startTime[0].label}
                      placeholder='Select'
                      name={`schedule[${idx}].startTime`}
                      options={startTime}
                      searchable={false}
                      disabled={removedDays.includes(day)}
                    />
                    <Select
                      label='End Time'
                      // placeholder={endTime[endTime.length - 1].label}
                      placeholder='Select'
                      name={`schedule[${idx}].endTime`}
                      options={endTime}
                      searchable={false}
                      disabled={removedDays.includes(day)}
                    />
                  </div>
                  <div className='md:w-full'>
                    <Input
                      label='Session Duration'
                      name={`schedule[${idx}].eachSessionDuration`}
                      placeholder='Each Session Duration in Minutes'
                      type='number'
                      disabled={removedDays.includes(day)}
                    />
                  </div>
                </div>
                <div className='mt-6'>
                  {removedDays.includes(day) ? (
                    <Button
                      variant='solid'
                      className='max-lg:w-full'
                      onClick={() => insertDay(day)}
                    >
                      Insert
                    </Button>
                  ) : (
                    <Button
                      variant='outline'
                      className='border-red-400 text-red-400 hover:bg-red-400 max-lg:w-full'
                      onClick={() => removeDay(day)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='text-center'>
          <Button variant='solid' type='submit' className='xl:w-2/12'>
            Submit
          </Button>
        </div>
      </Form>
    </section>
  );
}
