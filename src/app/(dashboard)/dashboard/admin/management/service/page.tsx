import Tabs from "@/components/ui/Tabs";
import AddService from "./_components/forms/AddService";
import ManageServices from "./_components/table/ManageServices";

export default function ServiceManagePage() {
  const tabsData = [
    {
      id: 1,
      title: "Create Service",
      children: <AddService />,
    },
    {
      id: 2,
      title: "Manage Service",
      children: <ManageServices />,
    },
  ];
  return <Tabs tabsData={tabsData} />;
}
