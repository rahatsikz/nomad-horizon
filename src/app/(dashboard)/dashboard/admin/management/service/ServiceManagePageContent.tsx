"use client";
import Form from "@/components/ui/Form";
import ImageInput from "@/components/ui/ImageInput";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import React from "react";

export default function ServiceManagePageContent() {
  return (
    <section className='px-4 py-8'>
      <Form submitHandler={() => {}} className='space-y-4'>
        <div className='grid md:grid-cols-2 gap-4'>
          <Input label='Service Name' name='serviceName' type='text' />
          <Input label='Price' name='price' type='text' />
          <Select
            label='Category'
            name='categoryId'
            placeholder='Select a Category'
            options={[
              { value: "1", label: "Category 1" },
              { value: "2", label: "Category 2" },
              { value: "3", label: "Category 3" },
            ]}
            searchable={false}
          />
          <Select
            label='Availability'
            name='status'
            placeholder='Select Service Status'
            options={[
              { value: "1", label: "Active" },
              { value: "2", label: "Upcoming" },
            ]}
            searchable={false}
          />
        </div>
        <Textarea label='Description' name='content' />
        <ImageInput name='image' />
      </Form>
    </section>
  );
}
