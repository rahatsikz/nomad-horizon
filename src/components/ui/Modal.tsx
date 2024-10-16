import { useAppSelector } from "@/redux/hooks";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const { isModalOpen } = useAppSelector((state) => state.modal);
  return (
    <>
      {isModalOpen ? (
        <div className='fixed top-0 left-0 z-10 flex items-start pt-[7rem] justify-center w-screen h-screen bg-slate-900/40'>
          <div className='relative flex flex-col gap-4 max-h-[70vh] w-11/12 max-w-xl overflow-hidden rounded-md bg-mainBg py-6 px-8 text-secondary '>
            {/* Modal content */}
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
