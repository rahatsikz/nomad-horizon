import { Button } from "@/components/ui/Button";

export const AdminTableColumn = (deleteModal: any) => [
  {
    tableHeader: "Admin Username",
    dataIndex: "username",
  },
  {
    tableHeader: "Admin Email",
    dataIndex: "email",
  },
  {
    tableHeader: "Added On",
    dataIndex: "createdAt",
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
          Delete
        </Button>
      );
    },
  },
];
