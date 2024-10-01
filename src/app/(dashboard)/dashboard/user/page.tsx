import React from "react";

export default function UserPage() {
  const user = "Rahat";

  return (
    <section className='flex h-96 w-full items-center'>
      <h2 className='text-3xl text-secondary w-full text-center'>
        Welcome <span className='text-primary'>{user}</span>, This is your
        dashboard
      </h2>
    </section>
  );
}
