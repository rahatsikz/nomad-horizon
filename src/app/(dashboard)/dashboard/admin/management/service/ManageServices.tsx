import DynamicTable from "@/components/ui/DynamicTable";
import React, { useEffect, useState } from "react";
import { ServiceTableColumn } from "./ServiceTableColumn";
import {
  useDeleteServiceMutation,
  useGetServiceQuery,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { cn, formatDateTime } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import { toggleModal } from "@/redux/slice/modal/modalSlice";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/redux/hooks";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import {
  endTime,
  serviceCategory,
  serviceStatus,
  startTime,
} from "@/constant/global";
import Textarea from "@/components/ui/Textarea";
import ImageInput from "@/components/ui/ImageInput";
import Form from "@/components/ui/Form";
import toast from "react-hot-toast";
import { useUpdateScheduleMutation } from "@/redux/api/scheduleApi";
import Pagination from "@/components/ui/Pagination";

export default function ManageServices() {
  // pagination
  const query: any = {};
  const [limit, setLimit] = useState({
    value: "4",
    label: "4",
  });
  const [currentPage, setCurrentPage] = useState(1);

  query["limit"] = limit.value ? limit.value : undefined;
  query["page"] = currentPage ? currentPage : undefined;

  const { data, isLoading } = useGetServicesQuery({ ...query });
  const imgBBUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;

  const allServiceData = data?.data?.data?.map((data: any) => ({
    id: data?.id,
    serviceName: data?.serviceName,
    category: data?.category[0].toUpperCase() + data?.category.slice(1),
    status: data?.status[0].toUpperCase() + data?.status.slice(1),
    price: data?.price + " USD",
    createdAt: formatDateTime(data?.createdAt),
  }));

  const [rowId, setRowId] = useState<string>("");
  // single service data
  const { data: singleServiceData, isFetching: isFetchingSingleService } =
    useGetServiceQuery(rowId);
  const dispatch = useAppDispatch();

  const editModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "edit" }));
  };
  // update service
  const [updateService] = useUpdateServiceMutation();

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

    data.price = Number(data.price);

    try {
      console.log(data);
      const response = await updateService({ id: rowId, data }).unwrap();
      console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
    dispatch(toggleModal({ isModalOpen: false, id: "edit" }));
  };

  const defaultValue = {
    serviceName: singleServiceData?.data?.serviceName,
    price: singleServiceData?.data?.price,
    category: singleServiceData?.data?.category,
    status: singleServiceData?.data?.status,
    content: singleServiceData?.data?.content,
    image: singleServiceData?.data?.image,
  };

  const [activeDays, setActiveDays] = useState<string[]>([]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const initialDays = singleServiceData?.data?.schedules?.map(
      (schedule: any) => schedule.daysOfWeek
    );
    setActiveDays(initialDays); // Setting the initial active days
  }, [singleServiceData?.data?.schedules]);

  const removeDay = (day: string) => {
    setActiveDays(activeDays.filter((d) => d !== day));
  };

  const insertDay = (day: string) => {
    setActiveDays([...activeDays, day]);
  };

  const scheduleModal = (id: any) => {
    console.log(activeDays);
    setRowId(id);

    dispatch(toggleModal({ isModalOpen: true, id: "schedule" }));
  };

  // delete service
  const [deleteService] = useDeleteServiceMutation();

  const deleteModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "delete" }));
  };

  const deleteHandler = async () => {
    try {
      const response = await deleteService(rowId).unwrap();
      // console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }

    dispatch(toggleModal({ isModalOpen: false, id: "delete" }));
  };

  // update schedule
  const [updateSchedule] = useUpdateScheduleMutation();

  // schedule submit
  const scheduleSubmit = async (data: any) => {
    // console.log(data);
    let unassignedDayIndex = 0; // Counter for unassigned days

    data.schedule = data.schedule.map((schedule: any, idx: number) => {
      const assignedDays = singleServiceData?.data?.schedules?.map(
        (schedule: any) => schedule.daysOfWeek
      );

      // Find the unassigned day for this iteration
      const unassignedDay = days.filter(
        (day: string) => !assignedDays.includes(day)
      );

      // Increment the counter after assigning a day
      if (!assignedDays.includes(schedule.daysOfWeek)) {
        unassignedDayIndex++;
      }

      console.log(unassignedDayIndex);

      return {
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        eachSessionDuration: Number(schedule.eachSessionDuration),
        daysOfWeek: assignedDays.includes(activeDays[idx])
          ? activeDays[idx]
          : unassignedDay[unassignedDayIndex - 1],
      };
    });
    data.schedule = data.schedule.filter((schedule: any) =>
      activeDays.includes(schedule.daysOfWeek)
    );

    console.log(data.schedule);

    try {
      const response = await updateSchedule({
        id: rowId,
        data: data.schedule,
      }).unwrap();
      // console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }

    dispatch(toggleModal({ isModalOpen: false, id: "schedule" }));
  };

  const defaultScheduleValue = {
    schedule: singleServiceData?.data?.schedules?.map((schedule: any) => ({
      startTime: schedule?.startTime,
      endTime: schedule?.endTime,
      eachSessionDuration: schedule?.eachSessionDuration,
      daysOfWeek: schedule?.daysOfWeek,
    })),
  };

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <section className='px-6'>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={ServiceTableColumn(editModal, scheduleModal, deleteModal)}
          dataset={allServiceData}
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
      {/* Edit Modal */}
      <Modal id='edit' className='overflow-y-auto max-h-[73vh]'>
        {isFetchingSingleService ? (
          <LoadingComponent />
        ) : (
          <Form
            submitHandler={onSubmit}
            defaultValues={defaultValue}
            className='space-y-4'
          >
            <div className='grid md:grid-cols-2 gap-4'>
              <Input label='Service Name' name='serviceName' type='text' />
              <Input label='Price' name='price' type='text' />
              <Select
                label='Category'
                name='category'
                placeholder='Select a Category'
                options={serviceCategory}
                searchable={false}
              />
              <Select
                label='Availability'
                name='status'
                placeholder='Select Service Status'
                options={serviceStatus}
                searchable={false}
              />
            </div>
            <Textarea label='Description' name='content' />
            <Input label='Image Link' name='image' type='text' />
            <div className='flex items-center gap-4 xl:w-5/1`2 mx-auto'>
              <div className='h-px w-full bg-secondary'></div>
              <p className='text-secondary'>OR</p>
              <div className='h-px w-full bg-secondary'></div>
            </div>
            <ImageInput name='image' />

            <div className='flex justify-end gap-2'>
              <Button
                type='submit'
                variant='solid'
                className='py-1 bg-red-400 hover:border-red-400 hover:text-red-400'
                //   onClick={editHandler}
              >
                Update
              </Button>
              <Button
                variant='solid'
                className='py-1 '
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
      {/* schedule Modal */}
      <Modal id='schedule' className='overflow-y-auto max-w-6xl'>
        {isFetchingSingleService ? (
          <LoadingComponent />
        ) : (
          <>
            <Form
              submitHandler={scheduleSubmit}
              defaultValues={defaultScheduleValue}
              className='w-full space-y-6'
            >
              <div className='space-y-6 md:space-y-4 max-md:divide-y-2 dark:divide-neutral'>
                {singleServiceData?.data?.schedules
                  ?.map((schedule: any) => schedule.daysOfWeek)
                  .map((day: string, idx: number) => (
                    <div
                      key={day}
                      className={cn(
                        "md:flex justify-between max-md:space-y-4  items-center gap-2 lg:gap-8 w-full"
                      )}
                    >
                      <h2
                        className={cn(
                          "text-secondary w-2/12 mt-6",
                          !activeDays?.includes(day) ? "opacity-20" : ""
                        )}
                      >
                        {day}
                      </h2>
                      <div
                        className={cn(
                          "w-full md:flex max-md:space-y-2 lg:gap-8 gap-4 items-center",
                          !activeDays?.includes(day) ? "opacity-20" : ""
                        )}
                      >
                        <div className='md:flex max-md:space-y-2 gap-4 xl:w-9/12 w-full items-center'>
                          <Select
                            label='Start Time'
                            // placeholder={startTime[0].label}
                            placeholder='Select'
                            name={`schedule[${idx}].startTime`}
                            options={startTime}
                            searchable={false}
                            disabled={!activeDays?.includes(day)}
                          />
                          <Select
                            label='End Time'
                            // placeholder={endTime[endTime.length - 1].label}
                            placeholder='Select'
                            name={`schedule[${idx}].endTime`}
                            options={endTime}
                            searchable={false}
                            disabled={!activeDays?.includes(day)}
                          />
                        </div>
                        <div className='md:w-full'>
                          <Input
                            label='Session Duration'
                            name={`schedule[${idx}].eachSessionDuration`}
                            placeholder='Each Session Duration in Minutes'
                            type='number'
                            disabled={!activeDays?.includes(day)}
                          />
                        </div>
                      </div>
                      <div className='mt-6'>
                        {!activeDays?.includes(day) ? (
                          <Button
                            variant='solid'
                            className='max-sm:w-full'
                            onClick={() => insertDay(day)}
                          >
                            Insert
                          </Button>
                        ) : (
                          <Button
                            variant='outline'
                            className='border-red-400 text-red-400 hover:bg-red-400 max-sm:w-full'
                            onClick={() => removeDay(day)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                {days
                  .filter(
                    (day: string) =>
                      !singleServiceData?.data?.schedules
                        ?.map((schedule: any) => schedule.daysOfWeek)
                        .includes(day)
                  )
                  .map((day: string, idx: number) => (
                    <div
                      key={day}
                      className={cn(
                        "md:flex justify-between max-md:space-y-4  items-center gap-2 lg:gap-8 w-full"
                      )}
                    >
                      <h2
                        className={cn(
                          "text-secondary w-2/12 mt-6",
                          !activeDays?.includes(day) ? "opacity-20" : ""
                        )}
                      >
                        {day}
                      </h2>
                      <div
                        className={cn(
                          "w-full md:flex max-md:space-y-2 lg:gap-8 gap-4 items-center",
                          !activeDays?.includes(day) ? "opacity-20" : ""
                        )}
                      >
                        <div className='md:flex max-md:space-y-2 gap-4 xl:w-9/12 w-full items-center'>
                          <Select
                            label='Start Time'
                            // placeholder={startTime[0].label}
                            placeholder='Select'
                            name={`schedule[${
                              idx + singleServiceData?.data?.schedules?.length
                            }].startTime`}
                            options={startTime}
                            searchable={false}
                            disabled={!activeDays?.includes(day)}
                          />
                          <Select
                            label='End Time'
                            // placeholder={endTime[endTime.length - 1].label}
                            placeholder='Select'
                            name={`schedule[${
                              idx + singleServiceData?.data?.schedules?.length
                            }].endTime`}
                            options={endTime}
                            searchable={false}
                            disabled={!activeDays?.includes(day)}
                          />
                        </div>
                        <div className='md:w-full'>
                          <Input
                            label='Session Duration'
                            name={`schedule[${
                              idx + singleServiceData?.data?.schedules?.length
                            }].eachSessionDuration`}
                            placeholder='Each Session Duration in Minutes'
                            type='number'
                            disabled={!activeDays?.includes(day)}
                          />
                        </div>
                      </div>
                      <div className='mt-6'>
                        {!activeDays?.includes(day) ? (
                          <Button
                            variant='solid'
                            className='max-sm:w-full'
                            onClick={() => insertDay(day)}
                          >
                            Insert
                          </Button>
                        ) : (
                          <Button
                            variant='outline'
                            className='border-red-400 text-red-400 hover:bg-red-400 max-sm:w-full'
                            onClick={() => removeDay(day)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              <div className='flex justify-end gap-2'>
                <Button
                  type='submit'
                  variant='solid'
                  className='py-1 bg-red-400 hover:border-red-400 hover:text-red-400'
                  //   onClick={editHandler}
                >
                  Update
                </Button>
                <Button
                  variant='solid'
                  className='py-1 '
                  onClick={() =>
                    dispatch(
                      toggleModal({ isModalOpen: false, id: "schedule" })
                    )
                  }
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </>
        )}
      </Modal>
      {/* Delete Modal */}
      <Modal id='delete'>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to delete this service?</p>
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
    </section>
  );
}
