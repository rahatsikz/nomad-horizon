import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  id: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Modal = ({ children, id, ...props }: ModalProps) => {
  const { isModalOpen, id: modalId } = useAppSelector((state) => state.modal);
  return (
    <>
      {isModalOpen && modalId === id ? (
        <div className='fixed top-0 left-0 z-10 flex items-start pt-[7rem] justify-center w-screen h-screen bg-slate-900/40'>
          <div
            className={cn(
              "relative flex flex-col gap-4 max-h-[70vh] w-11/12 max-w-xl overflow-hidden rounded-md bg-mainBg py-6 px-8 text-secondary ",
              props.className
            )}
          >
            {/* Modal content */}
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
