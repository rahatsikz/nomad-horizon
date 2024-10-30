"use client";
import DynamicTable from "@/components/ui/DynamicTable";
import React, { useState } from "react";
import {
  useCancelBookingMutation,
  useMyBookingsQuery,
} from "@/redux/api/bookingApi";
import {
  convertTo12HourFormat,
  formatDateTime,
  formatISODatetoHumanReadable,
} from "@/lib/utils";
import { HistoryTableColumn } from "./HistoryTableColumn";
import LoadingComponent from "@/components/ui/LoadingComponent";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/redux/hooks";
import { toggleModal } from "@/redux/slice/modal/modalSlice";
import toast from "react-hot-toast";
import RatingInput from "@/components/ui/RatingInput";
import Form from "@/components/ui/Form";
import Textarea from "@/components/ui/Textarea";
import {
  useAddReviewMutation,
  useGetReviewsQuery,
} from "@/redux/api/reviewApi";

export default function HistoryPageContent() {
  const { data, isFetching } = useMyBookingsQuery(
    {},
    {
      refetchOnFocus: true,
    }
  );
  const [cancelBooking] = useCancelBookingMutation();
  const { data: reviews } = useGetReviewsQuery({});
  const serviceData = data?.data.map((d: any) => ({
    id: d.id,
    serviceName: d.service?.serviceName,
    serviceId: d.service?.id,
    date: formatISODatetoHumanReadable(d.date),
    startTime: convertTo12HourFormat(d.startTime),
    endTime: convertTo12HourFormat(d.endTime),
    bookingStatus: d.bookingStatus,
    createdAt: formatDateTime(d.createdAt),
    isReviewed: reviews?.data.some((review: any) => review.bookingId === d.id),
  }));

  const dispatch = useAppDispatch();
  const [rowId, setRowId] = useState<string>("");
  const openModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "1" }));
  };

  const cancelHandler = async () => {
    // console.log(rowId);
    const response = await cancelBooking(rowId).unwrap();
    // console.log(response);

    dispatch(toggleModal({ isModalOpen: false, id: "1" }));
    if (response.statusCode === 200) {
      toast.success(response.message);
    }
  };

  // review

  const [addReview] = useAddReviewMutation();

  const reviewModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "review" }));
  };

  const onReview = async (data: any) => {
    console.log(data);

    try {
      const response = await addReview({
        ...data,
        bookingId: rowId,
      }).unwrap();
      console.log(response);
      if (response.statusCode === 200) {
        toast.success("Thank you for your review");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }

    dispatch(toggleModal({ isModalOpen: false, id: "review" }));
  };

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <section className='px-4 py-8 text-secondary'>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={HistoryTableColumn(openModal, reviewModal)}
          dataset={serviceData}
        />
      </div>
      <Modal id={"1"}>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to cancel this booking?</p>
          <div className='flex justify-end gap-2'>
            <Button
              variant='solid'
              className='py-1 bg-red-400 hover:border-red-400 hover:text-red-400'
              onClick={cancelHandler}
            >
              Yes
            </Button>
            <Button
              variant='solid'
              className='py-1 '
              onClick={() =>
                dispatch(toggleModal({ isModalOpen: false, id: "1" }))
              }
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
      <Modal id='review'>
        <Form submitHandler={onReview} className='space-y-4'>
          <RatingInput name='rating' label='Rating' />
          <Textarea name='content' label='Your Review' />
          <div className='space-x-4 flex justify-end'>
            <Button variant='solid' type='submit'>
              Submit
            </Button>
            <Button
              variant='outline'
              onClick={() =>
                dispatch(toggleModal({ isModalOpen: false, id: "review" }))
              }
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </section>
  );
}
