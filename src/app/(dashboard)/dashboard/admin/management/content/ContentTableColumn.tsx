import { Button } from "@/components/ui/Button";

export const BlogsColumn = (
  deleteModal: any,
  editModal: any,
  showModal: any,
  hideHandler: any,
  shownOnHomepage: number
) => [
  {
    tableHeader: "Blog Title",
    dataIndex: "title",
  },
  {
    tableHeader: "Author",
    dataIndex: "author",
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
        <div className='flex gap-2 flex-wrap max-lg:justify-center'>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
            onClick={() => deleteModal(data?.id)}
          >
            Delete
          </Button>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5'
            onClick={() => editModal(data?.id)}
          >
            Edit
          </Button>
          {data?.showOnHomepage && (
            <Button
              variant='solid'
              className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
              onClick={() => hideHandler(data?.id)}
            >
              Hide from Homepage
            </Button>
          )}
          {!data?.showOnHomepage && shownOnHomepage < 2 && (
            <Button
              variant='solid'
              className='text-sm px-2.5 py-0.5'
              onClick={() => showModal(data?.id)}
            >
              Show on Homepage
            </Button>
          )}
        </div>
      );
    },
  },
];

export const EventColumn = (
  deleteModal: any,
  editModal: any,
  showModal: any,
  hideHandler: any,
  shownOnHomepage: number
) => [
  {
    tableHeader: "Event Name",
    dataIndex: "title",
  },
  {
    tableHeader: "Event City",
    dataIndex: "city",
  },
  {
    tableHeader: "Country",
    dataIndex: "country",
  },
  {
    tableHeader: "Event Date",
    dataIndex: "date",
  },
  {
    tableHeader: "Action",
    dataIndex: "action",
    renders: (data: any) => {
      return (
        <div className='flex gap-2 flex-wrap max-lg:justify-center'>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
            onClick={() => deleteModal(data?.id)}
          >
            Delete
          </Button>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5'
            onClick={() => editModal(data?.id)}
          >
            Edit
          </Button>
          {data?.showOnHomepage && (
            <Button
              variant='solid'
              className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
              onClick={() => hideHandler(data?.id)}
            >
              Hide from Homepage
            </Button>
          )}
          {!data?.showOnHomepage && shownOnHomepage < 2 && (
            <Button
              variant='solid'
              className='text-sm px-2.5 py-0.5'
              onClick={() => showModal(data?.id)}
            >
              Show on Homepage
            </Button>
          )}
        </div>
      );
    },
  },
];

export const NewsColumn = (
  deleteModal: any,
  editModal: any,
  showModal: any,
  hideHandler: any,
  shownOnHomepage: number
) => [
  {
    tableHeader: "Headline",
    dataIndex: "title",
  },
  {
    tableHeader: "Written On",
    dataIndex: "date",
  },
  {
    tableHeader: "Action",
    dataIndex: "action",
    renders: (data: any) => {
      return (
        <div className='flex gap-2 flex-wrap max-lg:justify-center'>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
            onClick={() => deleteModal(data?.id)}
          >
            Delete
          </Button>
          <Button
            variant='solid'
            className='text-sm px-2.5 py-0.5'
            onClick={() => editModal(data?.id)}
          >
            Edit
          </Button>
          {data?.showOnHomepage && (
            <Button
              variant='solid'
              className='text-sm px-2.5 py-0.5 bg-red-400 hover:border-red-400 hover:text-red-400'
              onClick={() => hideHandler(data?.id)}
            >
              Hide from Homepage
            </Button>
          )}
          {!data?.showOnHomepage && shownOnHomepage < 3 && (
            <Button
              variant='solid'
              className='text-sm px-2.5 py-0.5'
              onClick={() => showModal(data?.id)}
            >
              Show on Homepage
            </Button>
          )}
        </div>
      );
    },
  },
];
