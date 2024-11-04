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
import Pagination from "@/components/ui/Pagination";

export default function AllTable() {
  // pagination
  const query: any = {};
  const [limit, setLimit] = useState({
    value: "6",
    label: "6",
  });
  const [currentPage, setCurrentPage] = useState(1);

  query["limit"] = limit.value;
  query["page"] = currentPage;

  const { data, isLoading } = useGetAllBookingsQuery({ ...query });
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const [rowId, setRowId] = useState<string>("");
  const dispatch = useAppDispatch();

  const bookingData = data?.data?.data?.map((data: any) => ({
    id: data?.id,
    username: data?.user?.username,
    serviceName: data?.service?.serviceName,
    date: formatISODatetoHumanReadable(data?.date),
    startTime: convertTo12HourFormat(data?.startTime),
    endTime: convertTo12HourFormat(data?.endTime),
    bookingStatus:
      data?.bookingStatus[0].toUpperCase() + data?.bookingStatus.slice(1),
    createdAt: formatDateTime(data?.createdAt),
  }));
  if (isLoading) {
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
    <section className='px-6'>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={AllBookingsColumn(completeHandler, deleteModal)}
          dataset={bookingData}
        />
      </div>
      <div>
        <Pagination
          totalPages={data?.data?.meta?.totalPage}
          currentPage={currentPage}
          handlePageChange={(page) => setCurrentPage(page)}
          dbPageCount={data?.data?.meta?.page}
          limit={limit}
          handleLimitChange={(limit) =>
            setLimit({ value: limit, label: limit })
          }
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
    </section>
  );
}
