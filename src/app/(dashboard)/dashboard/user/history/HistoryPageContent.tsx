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

export default function HistoryPageContent() {
  const { data, isFetching } = useMyBookingsQuery({});
  const [cancelBooking] = useCancelBookingMutation();
  const serviceData = data?.data.map((d: any) => ({
    id: d.id,
    serviceName: d.service?.serviceName,
    date: formatISODatetoHumanReadable(d.date),
    startTime: convertTo12HourFormat(d.startTime),
    endTime: convertTo12HourFormat(d.endTime),
    bookingStatus: d.bookingStatus,
    createdAt: formatDateTime(d.createdAt),
  }));

  const dispatch = useAppDispatch();
  const [rowId, setRowId] = useState<string>("");
  const openModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal(true));
  };

  const cancelHandler = async () => {
    // console.log(rowId);
    const response = await cancelBooking(rowId).unwrap();
    // console.log(response);

    dispatch(toggleModal(false));
    if (response.statusCode === 200) {
      toast.success(response.message);
    }
  };

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <section className='px-4 py-8 text-secondary'>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={HistoryTableColumn(openModal)}
          dataset={serviceData}
        />
      </div>
      <Modal>
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
              onClick={() => dispatch(toggleModal(false))}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
