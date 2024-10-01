import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 bg-mainBg flex'>
        <Sidebar />
        <div className='flex-1'>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
