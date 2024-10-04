"use client";
import { Button } from "@/components/ui/Button";

export const dummyColumns = [
  {
    tableHeader: "ID",
    dataIndex: "id",
  },
  {
    tableHeader: "Name",
    dataIndex: "name",
  },
  {
    tableHeader: "Email",
    dataIndex: "email",
  },
  {
    tableHeader: "Mobile No.",
    dataIndex: "mobileNo",
  },
  {
    tableHeader: "Address",
    dataIndex: "address",
  },
  {
    tableHeader: "Status",
    dataIndex: "status",
  },
  {
    tableHeader: "Action",
    dataIndex: "action",
    renders: (id: any) => {
      return (
        <>
          <Button
            variant='solid'
            className='text-sm px-2 py-0.5'
            onClick={() => console.log(id)}
          >
            View
          </Button>
          <Button
            variant='solid'
            className='text-sm px-2 py-0.5 bg-red-400'
            onClick={() => console.log(id)}
          >
            Delete
          </Button>
        </>
      );
    },
  },
];
