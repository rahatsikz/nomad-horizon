import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 bg-mainBg'>{children}</div>
      <Footer />
    </div>
  );
}
