"use client";
import DynamicTable from "@/components/ui/DynamicTable";
import React, { useState } from "react";
import { UserTableColumn } from "./UserTableColumn";
import {
  useDeleteUserMutation,
  useGetAllCustomersQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { formatDateTime } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/redux/hooks";
import { toggleModal } from "@/redux/slice/modal/modalSlice";
import Textarea from "@/components/ui/Textarea";
import toast from "react-hot-toast";

export default function UserManagePageContent() {
  const [rowId, setRowId] = useState<string>("");
  const dispatch = useAppDispatch();

  const { data: allCustomerData, isLoading } = useGetAllCustomersQuery({});

  const customerDataFormated = allCustomerData?.data?.map((data: any) => ({
    ...data,
    createdAt: formatDateTime(data?.createdAt),
  }));

  //   update
  const editModal = (id: string) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "edit" }));
  };

  const [updateUser] = useUpdateUserMutation();
  const onUpdate = async (data: any) => {
    console.log(data);

    try {
      const response = await updateUser({
        id: rowId,
        data,
      }).unwrap();
      // console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }

    dispatch(toggleModal({ isModalOpen: false, id: "edit" }));
  };

  //   delete

  const [deleteUser] = useDeleteUserMutation();
  const deleteModal = (id: string) => {
    setRowId(id);
    dispatch(toggleModal({ isModalOpen: true, id: "delete" }));
  };

  const deleteHandler = async () => {
    try {
      const response = await deleteUser(rowId).unwrap();
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

  const defaultValue = allCustomerData?.data?.find(
    (data: any) => data?.id === rowId
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className='px-4 py-8'>
      <div className='w-full overflow-x-auto'>
        <DynamicTable
          columns={UserTableColumn(editModal, deleteModal)}
          dataset={customerDataFormated}
        />
      </div>

      <Modal id='edit'>
        <Form
          submitHandler={onUpdate}
          className='space-y-4'
          defaultValues={{
            username: defaultValue?.username,
            email: defaultValue?.email,
            contactNo: defaultValue?.contactNo || "",
            address: defaultValue?.address || "",
          }}
        >
          <Input label='Username' name='username' type='text' />
          <Input label='Email' name='email' type='email' disabled />
          <Input label='Contact No' name='contactNo' type='text' />
          <Textarea label='Address' name='address' />
          <div className='flex justify-end gap-2'>
            <Button
              variant='solid'
              type='submit'
              className='py-1 bg-red-400 hover:border-red-400 hover:text-red-400'
            >
              Update
            </Button>
            <Button
              variant='outline'
              className='py-1'
              onClick={() =>
                dispatch(toggleModal({ isModalOpen: false, id: "edit" }))
              }
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal id='delete'>
        <div className='flex flex-col justify-between h-24'>
          <p>Are you sure you want to delete this user?</p>
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
