import React from "react";
import CreateBlog from "./CreateBlog";
import CreateEvent from "./CreateEvent";
import CreateNews from "./CreateNews";

export default function AddContent() {
  return (
    <>
      <CreateBlog />
      <CreateEvent />
      <CreateNews />
    </>
  );
}