import React from "react";

export default function Loading() {
  return (
    <div className='min-h-screen bg-mainBg h-full'>
      <section className='flex h-[440px] justify-center items-center'>
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
    </div>
  );
}