import React from "react";
import ManageBlog from "./ManageBlog";
import ManageEvent from "./ManageEvent";

export default function ManageContent() {
  return (
    <section className='space-y-8'>
      <ManageBlog />
      <ManageEvent />
    </section>
  );
}
