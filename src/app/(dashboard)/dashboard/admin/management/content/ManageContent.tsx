import React from "react";
import ManageBlog from "./ManageBlog";
import ManageEvent from "./ManageEvent";
import ManageNews from "./ManageNews";

export default function ManageContent() {
  return (
    <section className='space-y-8 mb-8'>
      <ManageBlog />
      <ManageEvent />
      <ManageNews />
    </section>
  );
}
