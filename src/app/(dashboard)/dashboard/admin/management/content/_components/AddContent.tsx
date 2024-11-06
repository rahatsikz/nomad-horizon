import CreateBlog from "./forms/CreateBlog";
import CreateEvent from "./forms/CreateEvent";
import CreateNews from "./forms/CreateNews";

export default function AddContent() {
  return (
    <>
      <CreateBlog />
      <CreateEvent />
      <CreateNews />
    </>
  );
}
