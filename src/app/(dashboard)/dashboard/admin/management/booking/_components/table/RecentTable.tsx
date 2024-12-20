"use client";
import DynamicTable from "@/components/ui/DynamicTable";
import React, { useState } from "react";
import {
  useAdjustBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/api/bookingApi";
import {
  convertTo12HourFormat,
  formatDateTime,
  formatISODatetoHumanReadable,
  formatSelectedDateLikeIso,
} from "@/lib/utils";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useAppDispatch } from "@/redux/hooks";
import { toggleModal } from "@/redux/slice/modal/modalSlice";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ScheduleTimeProps } from "@/types/common";
import Calendar from "@/components/ui/Calendar";
import { useGetScheduleQuery } from "@/redux/api/scheduleApi";
import Pagination from "@/components/ui/Pagination";
import { TimeTable } from "@/components/ui/TimeGrid";
import { BookingProcessingColumn } from "./BookingTableColumn";

export default function RecentTable() {
  // pagination
  const query: any = {};
  const [limit, setLimit] = useState({
    value: "4",
    label: "4",
  });
  const [currentPage, setCurrentPage] = useState(1);

  query["limit"] = limit.value;
  query["page"] = currentPage;

  query["sortBy"] = "createdAt";
  query["sortOrder"] = "desc";

  const { data, isLoading } = useGetAllBookingsQuery({
    bookingStatus: "processing",
    ...query,
  });

  const bookingData = data?.data?.data?.map((data: any) => ({
    id: data?.id,
    username: data?.user?.username,
    serviceName: data?.service?.serviceName,
    serviceId: data?.service?.id,
    date: formatISODatetoHumanReadable(data?.date),
    dbDate: data?.date,
    startTime: convertTo12HourFormat(data?.startTime),
    endTime: convertTo12HourFormat(data?.endTime),
    bookingStatus:
      data?.bookingStatus[0].toUpperCase() + data?.bookingStatus.slice(1),
    createdAt: formatDateTime(data?.createdAt),
  }));

  const dispatch = useAppDispatch();
  const [rowId, setRowId] = useState<string>("");
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const rejectModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "reject" }));
  };

  const rejcetHandler = async () => {
    console.log(rowId);
    const response = await updateBookingStatus({
      id: rowId,
      data: { bookingStatus: "rejected" },
    }).unwrap();
    console.log(response);

    dispatch(toggleModal({ isModalOpen: false, id: "reject" }));
    if (response.statusCode === 200) {
      toast.success("Booking Rejected Successfully");
    }
  };

  const adjustModal = (id: any) => {
    setRowId(id);
    setSelectedDate(
      new Date(bookingData?.find((data: any) => data.id === id)?.dbDate)
    );
    setSelectedTime({
      sessionStarts: data?.data?.data?.find((data: any) => data.id === id)
        ?.startTime,
      sessionEnds: data?.data?.data?.find((data: any) => data.id === id)
        ?.endTime,
      available: data?.data?.data?.find((data: any) => data.id === id)
        ?.available,
    });
    dispatch(toggleModal({ isModalOpen: true, id: "adjust" }));
  };

  const [adjustBooking] = useAdjustBookingMutation();

  const adjustHandler = async () => {
    // console.log(rowId);
    const bookingDate = formatSelectedDateLikeIso(selectedDate);

    const data = {
      date: bookingDate,
      startTime: selectedTime?.sessionStarts,
      endTime: selectedTime?.sessionEnds,
      bookingStatus: "adjusted",
    };
    try {
      const response = await adjustBooking({ id: rowId, data }).unwrap();
      console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }

    dispatch(toggleModal({ isModalOpen: false, id: "adjust" }));
  };

  const confirmHandler = async (id: string) => {
    const response = await updateBookingStatus({
      id,
      data: { bookingStatus: "confirmed" },
    }).unwrap();
    console.log(response);

    if (response.statusCode === 200) {
      toast.success("Booking Confirmed Successfully");
    }
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<ScheduleTimeProps | null>(
    null
  );

  // date pick handler
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // time pick handler
  const handleTimeClick = (time: ScheduleTimeProps) => {
    setSelectedTime(time);
  };

  const {
    data: schedule,
    error,
    isFetching: isFetchingSchedule,
  } = useGetScheduleQuery(
    {
      serviceId: bookingData?.find((data: any) => data.id === rowId)?.serviceId,
      date: formatSelectedDateLikeIso(selectedDate),
    },
    {
      skip: !rowId,
    }
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className='px-6'>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={BookingProcessingColumn(
            rejectModal,
            adjustModal,
            confirmHandler
          )}
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

      {/* reject modal */}
      <Modal id={"reject"}>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to reject this booking?</p>
          <div className='flex justify-end gap-2'>
            <Button
              variant='solid'
              className='py-1 bg-red-400 hover:border-red-400 hover:text-red-400'
              onClick={rejcetHandler}
            >
              Yes
            </Button>
            <Button
              variant='solid'
              className='py-1 '
              onClick={() =>
                dispatch(toggleModal({ isModalOpen: false, id: "reject" }))
              }
            >
              No
            </Button>
          </div>
        </div>
      </Modal>

      {/* adjust modal */}
      <Modal id={"adjust"} className='max-w-4xl overflow-y-auto py-0 px-0 pb-6'>
        {/* topbar */}
        <div className='w-full h-fit md:h-20 border-b dark:border-neutral sticky top-0 left-0 bg-nomadGray rounded-tr-md rounded-tl-md z-[2]'>
          <div className='flex items-center justify-between  h-full px-8 py-4'>
            {selectedDate && (
              <div>
                <p className='text-lg text-secondary'>
                  {selectedDate.getDate()}{" "}
                  {selectedDate.toLocaleString("default", { month: "short" })}{" "}
                  {selectedDate.getFullYear()}
                </p>
                <p className='text-neutral'>
                  {selectedDate.toLocaleString("default", { weekday: "long" })}
                </p>
              </div>
            )}

            <div className='flex gap-2 md:gap-4 md:items-center md:flex-row flex-col md:divide-x-2'>
              {selectedTime && (
                <div className=''>
                  <p className='md:text-lg text-sm text-secondary'>
                    {selectedTime.sessionStarts} - {selectedTime.sessionEnds}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* calendar and time picker */}
        <div className='flex md:flex-row flex-col-reverse gap-8 md:items-center -mt-3 px-2'>
          <div className='flex-1 md:pl-8 pl-4'>
            <TimeTable
              onTimeClick={handleTimeClick}
              selectedTime={selectedTime}
              serviceSchedule={schedule?.data}
              isFetching={isFetchingSchedule}
              isError={error}
            />
          </div>
          <div className='md:pr-8'>
            <Calendar
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
          </div>
        </div>
        <div className='flex justify-end gap-2 px-6'>
          <Button
            variant='solid'
            className='py-1 bg-red-400 hover:border-red-400 hover:text-red-400'
            onClick={adjustHandler}
          >
            Update
          </Button>
          <Button
            variant='solid'
            className='py-1 '
            onClick={() =>
              dispatch(toggleModal({ isModalOpen: false, id: "adjust" }))
            }
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </section>
  );
}
