import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  id: string;
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Modal = ({ children, id, title, ...props }: ModalProps) => {
  const { isModalOpen, id: modalId } = useAppSelector((state) => state.modal);
  return (
    <>
      {isModalOpen && modalId === id ? (
        <div className='fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-film/70 px-4 pt-[7rem] backdrop-blur-sm'>
          <div
            role='dialog'
            aria-modal='true'
            aria-label={title}
            className={cn(
              "nh-fade-up relative flex max-h-[80vh] w-full max-w-xl flex-col gap-4 overflow-y-auto rounded-2xl border border-fg/10 bg-raised px-6 py-7 font-light text-fg shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)] sm:px-8",
              props.className
            )}
          >
            {title && (
              <h2 className='font-display text-2xl font-extrabold uppercase tracking-[-0.02em]'>
                {title}
              </h2>
            )}
            {/* Modal content */}
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
