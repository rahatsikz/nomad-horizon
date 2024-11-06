import React from "react";
import RecentTable from "./_components/table/RecentTable";
import CancelledTable from "./_components/table/CancelledTable";
import AllTable from "./_components/table/AllTable";
import Tabs from "@/components/ui/Tabs";

export default function BookingManagePage() {
  const tabsData = [
    {
      id: 1,
      title: "Recent Bookings",
      children: <RecentTable />,
    },
    {
      id: 2,
      title: "Cancelled Bookings",
      children: <CancelledTable />,
    },
    {
      id: 3,
      title: "All Bookings",
      children: <AllTable />,
    },
  ];
  return <Tabs tabsData={tabsData} />;
}
