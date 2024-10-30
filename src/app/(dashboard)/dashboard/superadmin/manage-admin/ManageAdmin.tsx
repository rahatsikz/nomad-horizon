import DynamicTable from "@/components/ui/DynamicTable";
import React, { useState } from "react";
import { AdminTableColumn } from "./AdminTableColumn";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { toggleModal } from "@/redux/slice/modal/modalSlice";
import {
  useDeleteUserMutation,
  useGetAllAdminsQuery,
} from "@/redux/api/userApi";
import { useAppDispatch } from "@/redux/hooks";
import toast from "react-hot-toast";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { formatDateTime } from "@/lib/utils";

export default function ManageAdmin() {
  const [rowId, setRowId] = useState("");
  const dispatch = useAppDispatch();
  // get all
  const { data: adminData, isFetching } = useGetAllAdminsQuery({});
  const allAdminData = adminData?.data?.map((data: any) => ({
    id: data?.id,
    username: data?.username,
    email: data?.email,
    createdAt: formatDateTime(data?.createdAt),
  }));

  //   delete
  const [deleteUser] = useDeleteUserMutation();

  const deleteModal = (id: any) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "delete-admin" }));
  };

  const deleteHandler = async () => {
    try {
      console.log(rowId);
      const response = await deleteUser(rowId).unwrap();
      console.log(response);

      if (response.statusCode === 200) {
        toast.success("Admin deleted successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
    dispatch(toggleModal({ isModalOpen: false, id: "delete-admin" }));
  };

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <section className='px-6'>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={AdminTableColumn(deleteModal)}
          dataset={allAdminData}
        />
      </div>
      <Modal id='delete-admin'>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to delete this admin?</p>
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
                dispatch(toggleModal({ isModalOpen: false, id: "delete-news" }))
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
