import ManageBlog from "./table/ManageBlog";
import ManageEvent from "./table/ManageEvent";
import ManageNews from "./table/ManageNews";

export default function ManageContent() {
  return (
    <section className='space-y-8 mb-8'>
      <ManageBlog />
      <ManageEvent />
      <ManageNews />
    </section>
  );
}
