"use client";
import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { DashboardHeaderText } from "@/components/ui/Headers";
import Textarea from "@/components/ui/Textarea";
import { useAddFeedbackMutation } from "@/redux/api/feedbackApi";
import { feedbackSchema } from "@/schemas/feedback";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import toast from "react-hot-toast";

export default function FeedbackPageContent() {
  const [addFeedback] = useAddFeedbackMutation();

  const onSubmit = async (data: any) => {
    try {
      const response = await addFeedback(data).unwrap();
      console.log(response);

      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <section className='px-4 py-8 text-secondary lg:w-1/2 max-lg:w-full'>
      <DashboardHeaderText
        title='Tell Us About Your Experience'
        subtitle="We'd love to hear from you. Please share your feedback with us"
      />
      <Form
        submitHandler={onSubmit}
        className='space-y-4'
        resolver={yupResolver(feedbackSchema)}
      >
        <Textarea
          label='Feedback'
          name='content'
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
