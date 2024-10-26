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
import { EventColumn } from "./ContentTableColumn";
import {
  useDeleteEventMutation,
  useGetEventQuery,
  useGetEventsQuery,
  useUpdateEventMutation,
} from "@/redux/api/eventApi";
import DatePicker from "@/components/ui/DatePicker";

export default function ManageEvent() {
  const [rowId, setRowId] = useState("");
  const dispatch = useAppDispatch();
  // fething all
  const { data: eventData, isFetching } = useGetEventsQuery({});
  const allEventsData = eventData?.data?.map((data: any) => ({
    ...data,
    date: formatISODatetoHumanReadable(data?.date),
  }));

  // shown count
  const shownOnHomepage = allEventsData?.filter(
    (data: any) => data?.showOnHomepage === true
  ).length;

  //   fetching single
  const { data: singleEventData, isFetching: isFetchingSingle } =
    useGetEventQuery(rowId);
  const defaultValue = {
    title: singleEventData?.data?.title,
    content: singleEventData?.data?.content,
    date: singleEventData?.data?.date,
    city: singleEventData?.data?.city,
    country: singleEventData?.data?.country,
  };

  console.log(defaultValue);

  //   delete
  const [deleteEvent] = useDeleteEventMutation();

  const deleteModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "delete-event" }));
  };

  const deleteHandler = async () => {
    try {
      console.log(rowId);
      const response = await deleteEvent(rowId).unwrap();
      console.log(response);

      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
    dispatch(toggleModal({ isModalOpen: false, id: "delete-event" }));
  };

  //   edit
  const [updateEvent] = useUpdateEventMutation();
  const editModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "edit-event" }));
  };
  const onEdit = async (data: any) => {
    // console.log(data);
    try {
      const response = await updateEvent({
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

    dispatch(toggleModal({ isModalOpen: false, id: "edit-event" }));
  };

  //   show
  const showModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "show-event" }));
  };

  const showHandler = async () => {
    try {
      console.log(rowId);
      const response = await updateEvent({
        id: rowId,
        data: { showOnHomepage: true },
      }).unwrap();
      console.log(response);

      if (response.statusCode === 200) {
        toast.success("Event added to homepage");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
    dispatch(toggleModal({ isModalOpen: false, id: "show-event" }));
  };

  const hideHandler = async (id: string) => {
    try {
      const response = await updateEvent({
        id,
        data: { showOnHomepage: false },
      }).unwrap();

      if (response.statusCode === 200) {
        toast.success("Event removed from homepage");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <div className='px-6'>
      <div className='flex justify-center'>
        <DashboardHeaderText title='Manage Events' />
      </div>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={EventColumn(
            deleteModal,
            editModal,
            showModal,
            hideHandler,
            shownOnHomepage
          )}
          dataset={allEventsData}
        />
      </div>
      <Modal id='delete-event'>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to delete this event?</p>
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
                dispatch(
                  toggleModal({ isModalOpen: false, id: "delete-event" })
                )
              }
            >
              No
            </Button>
          </div>
        </div>
      </Modal>

      <Modal id='edit-event' className='overflow-y-auto'>
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
            <div className='grid lg:grid-cols-2 gap-4'>
              <Input label='City' name='city' type='text' />
              <Input label='Country' name='country' type='text' />
            </div>
            <Textarea label='Content' name='content' />

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

      <Modal id='show-event'>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to show this event in homepage?</p>
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
                dispatch(toggleModal({ isModalOpen: false, id: "show-event" }))
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
