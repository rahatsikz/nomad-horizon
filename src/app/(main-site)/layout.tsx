import { Footer } from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-canvas font-light">
      <div aria-hidden="true" className="nh-grain" />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
