import DynamicTable from "@/components/ui/DynamicTable";
import React, { useState } from "react";
import { BlogsColumn } from "./ContentTableColumn";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { toggleModal } from "@/redux/slice/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";
import { formatDateTime } from "@/lib/utils";
import LoadingComponent from "@/components/ui/LoadingComponent";
import toast from "react-hot-toast";
import Form from "@/components/ui/Form";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import ImageInput from "@/components/ui/ImageInput";
import { DashboardHeaderText } from "@/components/ui/Headers";

export default function ManageBlog() {
  const [rowId, setRowId] = useState("");
  const dispatch = useAppDispatch();
  const imgBBUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;
  // fething all
  const { data: blogsData, isLoading } = useGetBlogsQuery({});
  const allBlogsData = blogsData?.data?.map((data: any) => ({
    ...data,
    createdAt: formatDateTime(data?.createdAt),
  }));

  // shown count
  const shownOnHomepage = allBlogsData?.filter(
    (data: any) => data?.showOnHomepage === true
  ).length;

  //   fetching single
  const { data: blogData, isFetching: isFetchingSingle } =
    useGetBlogQuery(rowId);
  const defaultValue = {
    title: blogData?.data?.title,
    content: blogData?.data?.content,
    author: blogData?.data?.author,
    image: blogData?.data?.image,
  };

  //   delete
  const [deleteBlog] = useDeleteBlogMutation();

  const deleteModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "delete" }));
  };

  const deleteHandler = async () => {
    try {
      console.log(rowId);
      const response = await deleteBlog(rowId).unwrap();
      console.log(response);

      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
    dispatch(toggleModal({ isModalOpen: false, id: "delete" }));
  };

  //   edit
  const [updateBlog] = useUpdateBlogMutation();
  const editModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "edit" }));
  };
  const onEdit = async (data: any) => {
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
      const response = await updateBlog({
        id: rowId,
        data,
      }).unwrap();
      //   console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }

    dispatch(toggleModal({ isModalOpen: false, id: "edit" }));
  };

  //   show
  const showModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "show" }));
  };

  const showHandler = async () => {
    try {
      console.log(rowId);
      const response = await updateBlog({
        id: rowId,
        data: { showOnHomepage: true },
      }).unwrap();
      console.log(response);

      if (response.statusCode === 200) {
        toast.success("Blog added to homepage");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
    dispatch(toggleModal({ isModalOpen: false, id: "show" }));
  };

  const hideHandler = async (id: string) => {
    try {
      const response = await updateBlog({
        id,
        data: { showOnHomepage: false },
      }).unwrap();

      if (response.statusCode === 200) {
        toast.success("Blog removed from homepage");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className='px-6'>
      <div className='flex justify-center'>
        <DashboardHeaderText title='Manage Blogs' />
      </div>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={BlogsColumn(
            deleteModal,
            editModal,
            showModal,
            hideHandler,
            shownOnHomepage
          )}
          dataset={allBlogsData}
        />
      </div>
      <Modal id='delete'>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to delete this blog?</p>
          <div className='flex justify-end gap-2'>
            <Button
              variant='solid'
              className='py-1 bg-red-400 hover:border-red-400 hover:text-red-400'
              onClick={deleteHandler}
            >
              Yes
            </Button>
            <Button
              variant='solid'
              className='py-1 '
              onClick={() =>
                dispatch(toggleModal({ isModalOpen: false, id: "delete" }))
              }
            >
              No
            </Button>
          </div>
        </div>
      </Modal>

      <Modal id='edit' className='overflow-y-auto'>
        {isFetchingSingle ? (
          <LoadingComponent />
        ) : (
          <Form
            submitHandler={onEdit}
            className='space-y-4 text-center'
            defaultValues={defaultValue}
          >
            <div className='grid lg:grid-cols-2 gap-4'>
              <Input label='Title' name='title' type='text' />
              <Input label='Author' name='author' type='text' />
            </div>
            <Textarea label='Content' name='content' rows={5} />
            <Input label='Image Link' name='image' type='text' />
            <div className='flex items-center gap-4 xl:w-5/12 mx-auto'>
              <div className='h-px w-full bg-secondary'></div>
              <p className='text-secondary'>OR</p>
              <div className='h-px w-full bg-secondary'></div>
            </div>
            <ImageInput name='image' />
            <div className='space-x-4'>
              <Button
                className='bg-red-400 hover:border-red-400 hover:text-red-400'
                variant='solid'
                type='submit'
              >
                Update
              </Button>
              <Button
                variant='outline'
                onClick={() =>
                  dispatch(toggleModal({ isModalOpen: false, id: "edit" }))
                }
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Modal>

      <Modal id='show'>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to show this blog in homepage?</p>
          <div className='flex justify-end gap-2'>
            <Button
              variant='solid'
              className='py-1 bg-red-400 hover:border-red-400 hover:text-red-400'
              onClick={showHandler}
            >
              Yes
            </Button>
            <Button
              variant='solid'
              className='py-1 '
              onClick={() =>
                dispatch(toggleModal({ isModalOpen: false, id: "show" }))
              }
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
