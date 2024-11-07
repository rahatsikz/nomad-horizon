import React from "react";

export default function LoadingComponent() {
  return (
    <section className='flex h-60 justify-center items-center'>
      <div className='flex justify-center items-center gap-2'>
        <div className='flex'>
          <div
            className='w-6 h-6 rounded-full animate-bounce bg-primary'
            style={{ animationDelay: "200ms" }}
          ></div>
        </div>

        <div className='flex'>
          <div
            className='w-6 h-6 rounded-full animate-bounce bg-primary'
            style={{ animationDelay: "500ms" }}
          ></div>
        </div>

        <div className='flex'>
          <div
            className='w-6 h-6 rounded-full animate-bounce bg-primary'
            style={{ animationDelay: "700ms" }}
          ></div>
        </div>
      </div>
    </section>
  );
}

export const SkeletonServiceLoading = () => {
  return (
    <div className='flex flex-col overflow-hidden bg-nomadGray rounded text-secondary shadow-main sm:flex-row animate-pulse'>
      <figure className='flex-1 h-32 bg-lightPrimary'></figure>

      <div className='flex-1 px-6 sm:px-0 flex flex-col justify-between gap-4 max-sm:py-6'>
        <div className='space-y-3 sm:mx-6 pt-6'>
          <div className='h-4 bg-lightPrimary w-3/4 mb-2'></div>
          <div className='h-4 bg-lightPrimary mb-2'></div>
          <div className='h-4 bg-lightPrimary'></div>
        </div>

        <div className='text-sm text-neutral sm:mx-6'>
          <div className='h-4 bg-lightPrimary w-1/4'></div>
        </div>

        <div className='sm:flex flex-col max-sm:space-y-4 gap-4 items-end w-full'>
          <div className='h-8 w-12 bg-lightPrimary mb-2'></div>
          <div className='h-8 w-24 bg-lightPrimary'></div>
        </div>
      </div>
    </div>
  );
};
