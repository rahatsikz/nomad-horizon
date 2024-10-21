import { Button } from "@/components/ui/Button";

export const ServiceTableColumn = (editModal: any, scheduleModal: any) => [
  {
    tableHeader: "Service Name",
    dataIndex: "serviceName",
  },

  {
    tableHeader: "Service Status",
    dataIndex: "status",
  },
  {
    tableHeader: "Price",
    dataIndex: "price",
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
            onClick={() => editModal(data?.id)}
          >
            Edit
          </Button>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5'
            onClick={() => scheduleModal(data?.id)}
          >
            Schedule
          </Button>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
            onClick={() => console.log(data?.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

/* 
 serviceName String
  content     String
  image       String
  status      Status          @default(available)
  price       Int
*/
