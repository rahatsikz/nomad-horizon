import React from "react";
import AddContent from "./_components/AddContent";
import ManageContent from "./_components/ManageContent";
import Tabs from "@/components/ui/Tabs";

export default function ContentPage() {
  const tabsData = [
    {
      id: 1,
      title: "Create Content",
      children: <AddContent />,
    },
    {
      id: 2,
      title: "Manage Content",
      children: <ManageContent />,
    },
  ];
  return <Tabs tabsData={tabsData} />;
}
