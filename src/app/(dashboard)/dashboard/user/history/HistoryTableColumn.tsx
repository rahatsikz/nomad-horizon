"use client";
import { Button } from "@/components/ui/Button";

export const HistoryTableColumn = (openModal: any) => [
  {
    tableHeader: "Service Name",
    dataIndex: "serviceName",
  },
  {
    tableHeader: "Service Date",
    dataIndex: "date",
  },
  {
    tableHeader: "Session start time",
    dataIndex: "startTime",
  },
  {
    tableHeader: "Session end time",
    dataIndex: "endTime",
  },
  {
    tableHeader: "Status",
    dataIndex: "bookingStatus",
  },
  {
    tableHeader: "Created At",
    dataIndex: "createdAt",
  },
  {
    tableHeader: "Action",
    dataIndex: "action",
    renders: (data: any) => {
      return (
        <>
          {data?.bookingStatus === "processing" && (
            <Button
              variant='solid'
              className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
              onClick={() => openModal(data?.id)}
            >
              Cancel Booking
            </Button>
          )}
          {data?.bookingStatus === "cancelled" && (
            <p className='text-red-400'>Cancelled</p>
          )}
        </>
      );
    },
  },
];
