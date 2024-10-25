import Accordion from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import ImageInput from "@/components/ui/ImageInput";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useAddBlogsMutation } from "@/redux/api/blogApi";
import { blogSchema } from "@/schemas/content";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import toast from "react-hot-toast";

export default function CreateBlog() {
  const imgBBUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;

  const [addBlogs] = useAddBlogsMutation();

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

    // console.log(data);
    try {
      const response = await addBlogs(data).unwrap();
      //   console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Accordion header='Create Blog' id='blog'>
      <Form
        submitHandler={onSubmit}
        className='space-y-4 text-center'
        resolver={yupResolver(blogSchema)}
      >
        <div className='grid lg:grid-cols-2 gap-4'>
          <Input label='Title' name='title' type='text' />
          <Input label='Author' name='author' type='text' />
        </div>
        <Textarea label='Content' name='content' />
        <Input label='Image Link' name='image' type='text' />
        <div className='flex items-center gap-4 xl:w-5/12 mx-auto'>
          <div className='h-px w-full bg-secondary'></div>
          <p className='text-secondary'>OR</p>
          <div className='h-px w-full bg-secondary'></div>
        </div>
        <ImageInput name='image' />
        <Button className='xl:w-2/12' variant='solid' type='submit'>
          Create
        </Button>
      </Form>
    </Accordion>
  );
}
