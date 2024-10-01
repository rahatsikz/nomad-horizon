import DashboardLayoutPanel from "./DashboardLayoutPanel";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayoutPanel>{children}</DashboardLayoutPanel>;
}
