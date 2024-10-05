"use client";
import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { DashboardHeaderText } from "@/components/ui/Headers";
import Textarea from "@/components/ui/Textarea";
import React from "react";

export default function FeedbackPageContent() {
  return (
    <section className='px-4 py-8 text-secondary lg:w-1/2 max-lg:w-full'>
      <DashboardHeaderText
        title='Tell Us About Your Experience'
        subtitle="We'd love to hear from you. Please share your feedback with us"
      />
      <Form submitHandler={() => {}} className='space-y-4'>
        <Textarea
          label='Feedback'
          name='feedback'
          rows={6}
          placeholder='Enter your feedback'
        />

        <Button variant='solid' type='submit'>
          Submit
        </Button>
      </Form>
    </section>
  );
}
