import CreateAdmin from "./_components/forms/CreateAdmin";
import ManageAdmin from "./_components/table/ManageAdmin";
import Tabs from "@/components/ui/Tabs";

export default function ManageAdminPage() {
  const tabsData = [
    {
      id: 1,
      title: "Add Admin",
      children: <CreateAdmin />,
    },
    {
      id: 2,
      title: "Manage Admins",
      children: <ManageAdmin />,
    },
  ];
  return <Tabs tabsData={tabsData} />;
}
