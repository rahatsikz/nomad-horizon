import { Button } from "@/components/ui/Button";

export const UserTableColumn = (editModal: any, deleteModal: any) => [
  {
    tableHeader: "Username",
    dataIndex: "username",
  },

  {
    tableHeader: "User Email",
    dataIndex: "email",
  },
  {
    tableHeader: "Contact No",
    dataIndex: "contactNo",
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

/* 
username  String
  email     String   @unique
  password  String
  role      Role     @default(customer)
  contactNo String?
  address   String?
  createdAt DateTime @default(now())
*/
