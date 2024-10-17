import { Button } from "@/components/ui/Button";

export const BookingCancelColumn = (deleteModal: any) => [
  {
    tableHeader: "Username",
    dataIndex: "username",
  },
  {
    tableHeader: "Service Name",
    dataIndex: "serviceName",
  },
  {
    tableHeader: "Booking Status",
    dataIndex: "bookingStatus",
  },
  {
    tableHeader: "Cancelled At",
    dataIndex: "updatedAt",
  },
  {
    tableHeader: "Action",
    dataIndex: "action",
    renders: (data: any) => {
      return (
        <Button
          variant='solid'
          className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
          onClick={() => deleteModal(data?.id)}
        >
          Delete Booking
        </Button>
      );
    },
  },
];

export const BookingProcessingColumn = (
  rejectModal: any,
  adjustModal: any,
  confirmHandler: any
) => [
  {
    tableHeader: "Username",
    dataIndex: "username",
  },
  {
    tableHeader: "Service Name",
    dataIndex: "serviceName",
  },
  {
    tableHeader: "Service Date",
    dataIndex: "date",
  },
  {
    tableHeader: "Session Starts",
    dataIndex: "startTime",
  },
  {
    tableHeader: "Session Ends",
    dataIndex: "endTime",
  },
  {
    tableHeader: "Booking Status",
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
        <div className='flex gap-2 flex-wrap'>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5'
            onClick={() => confirmHandler(data?.id)}
          >
            Confirm
          </Button>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5'
            onClick={() => adjustModal(data?.id)}
          >
            Adjust
          </Button>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
            onClick={() => rejectModal(data?.id)}
          >
            Reject
          </Button>
        </div>
      );
    },
  },
];

export const AllBookingsColumn = (completeHandler: any, deleteModal: any) => [
  {
    tableHeader: "Username",
    dataIndex: "username",
  },
  {
    tableHeader: "Service Name",
    dataIndex: "serviceName",
  },
  {
    tableHeader: "Service Date",
    dataIndex: "date",
  },
  {
    tableHeader: "Session Starts",
    dataIndex: "startTime",
  },
  {
    tableHeader: "Session Ends",
    dataIndex: "endTime",
  },
  {
    tableHeader: "Booking Status",
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
        <div className='flex gap-2 flex-wrap'>
          {(data?.bookingStatus === "adjusted" ||
            data?.bookingStatus === "confirmed") && (
            <Button
              variant='solid'
              className='text-sm px-2.5 py-0.5'
              onClick={() => completeHandler(data?.id)}
            >
              Mark Completed
            </Button>
          )}

          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
            onClick={() => deleteModal(data?.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
