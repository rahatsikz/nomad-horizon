import DynamicTable from "@/components/ui/DynamicTable";
import React, { useState } from "react";
import { AllBookingsColumn } from "./BookingTableColumn";
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/api/bookingApi";
import {
  convertTo12HourFormat,
  formatDateTime,
  formatISODatetoHumanReadable,
} from "@/lib/utils";
import LoadingComponent from "@/components/ui/LoadingComponent";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { toggleModal } from "@/redux/slice/modal/modalSlice";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export default function AllTable() {
  const { data, isFetching } = useGetAllBookingsQuery({});
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const [rowId, setRowId] = useState<string>("");
  const dispatch = useAppDispatch();

  const bookingData = data?.data?.map((data: any) => ({
    id: data?.id,
    username: data?.user?.username,
    serviceName: data?.service?.serviceName,
    date: formatISODatetoHumanReadable(data?.date),
    startTime: convertTo12HourFormat(data?.startTime),
    endTime: convertTo12HourFormat(data?.endTime),
    bookingStatus: data?.bookingStatus,
    createdAt: formatDateTime(data?.createdAt),
  }));
  if (isFetching) {
    return <LoadingComponent />;
  }

  const completeHandler = async (id: string) => {
    const response = await updateBookingStatus({
      id,
      data: { bookingStatus: "completed" },
    }).unwrap();
    console.log(response);

    if (response.statusCode === 200) {
      toast.success("Booking completed Successfully");
    }
  };

  const deleteModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "1" }));
  };

  const deleteHandler = async () => {
    console.log(rowId);
    const response = await deleteBooking(rowId).unwrap();
    console.log(response);

    dispatch(toggleModal({ isModalOpen: false, id: "1" }));
    if (response.statusCode === 200) {
      toast.success("Booking Deleted Successfully");
    }
  };

  return (
    <div className='px-6'>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={AllBookingsColumn(completeHandler, deleteModal)}
          dataset={bookingData}
        />
      </div>
      <Modal id={"1"}>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to delete this booking?</p>
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
                dispatch(toggleModal({ isModalOpen: false, id: "1" }))
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
