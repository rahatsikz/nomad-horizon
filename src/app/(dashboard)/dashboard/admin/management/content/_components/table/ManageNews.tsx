"use client";
import DynamicTable from "@/components/ui/DynamicTable";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { toggleModal } from "@/redux/slice/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { formatISODatetoHumanReadable } from "@/lib/utils";
import LoadingComponent from "@/components/ui/LoadingComponent";
import toast from "react-hot-toast";
import Form from "@/components/ui/Form";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import { DashboardHeaderText } from "@/components/ui/Headers";
import DatePicker from "@/components/ui/DatePicker";
import {
  useDeleteNewsMutation,
  useGetNewsByIdQuery,
  useGetNewsQuery,
  useUpdateNewsMutation,
} from "@/redux/api/newsApi";
import { NewsColumn } from "./ContentTableColumn";

export default function ManageNews() {
  const [rowId, setRowId] = useState("");
  const dispatch = useAppDispatch();
  // fething all
  const { data: newsData, isLoading } = useGetNewsQuery({});
  const allNewsData = newsData?.data?.map((data: any) => ({
    ...data,
    date: formatISODatetoHumanReadable(data?.date),
  }));

  // shown count
  const shownOnHomepage = allNewsData?.filter(
    (data: any) => data?.showOnHomepage === true
  ).length;

  //   fetching single
  const { data: singleNewsData, isFetching: isFetchingSingle } =
    useGetNewsByIdQuery(rowId);
  const defaultValue = {
    title: singleNewsData?.data?.title,
    content: singleNewsData?.data?.content,
    date: singleNewsData?.data?.date,
  };

  //   delete
  const [deleteNews] = useDeleteNewsMutation();

  const deleteModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "delete-news" }));
  };

  const deleteHandler = async () => {
    try {
      console.log(rowId);
      const response = await deleteNews(rowId).unwrap();
      console.log(response);

      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
    dispatch(toggleModal({ isModalOpen: false, id: "delete-news" }));
  };

  //   edit
  const [updateNews] = useUpdateNewsMutation();
  const editModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "edit-news" }));
  };
  const onEdit = async (data: any) => {
    // console.log(data);
    try {
      const response = await updateNews({
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

    dispatch(toggleModal({ isModalOpen: false, id: "edit-news" }));
  };

  //   show
  const showModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "show-news" }));
  };

  const showHandler = async () => {
    try {
      console.log(rowId);
      const response = await updateNews({
        id: rowId,
        data: { showOnHomepage: true },
      }).unwrap();
      console.log(response);

      if (response.statusCode === 200) {
        toast.success("News added to homepage");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
    dispatch(toggleModal({ isModalOpen: false, id: "show-news" }));
  };

  const hideHandler = async (id: string) => {
    try {
      const response = await updateNews({
        id,
        data: { showOnHomepage: false },
      }).unwrap();

      if (response.statusCode === 200) {
        toast.success("News removed from homepage");
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
        <DashboardHeaderText title='Manage News' />
      </div>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={NewsColumn(
            deleteModal,
            editModal,
            showModal,
            hideHandler,
            shownOnHomepage
          )}
          dataset={allNewsData}
        />
      </div>
      <Modal id='delete-news'>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to delete this news?</p>
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
                dispatch(toggleModal({ isModalOpen: false, id: "delete-news" }))
              }
            >
              No
            </Button>
          </div>
        </div>
      </Modal>

      <Modal id='edit-news' className='overflow-y-auto h-[450px]'>
        {isFetchingSingle ? (
          <LoadingComponent />
        ) : (
          <Form
            submitHandler={onEdit}
            className='space-y-4 text-center'
            defaultValues={defaultValue}
          >
            <Input label='Title' name='title' type='text' />
            <DatePicker label='Date' name='date' />
            <Textarea label='Content' name='content' rows={5} />

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
                  dispatch(toggleModal({ isModalOpen: false, id: "edit-news" }))
                }
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Modal>

      <Modal id='show-news'>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to show this news in homepage?</p>
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
                dispatch(toggleModal({ isModalOpen: false, id: "show-news" }))
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
