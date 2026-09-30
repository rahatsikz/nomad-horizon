import { Archivo } from 'next/font/google';
import { HomeFooter } from './_components/HomeFooter';
import { HomeNavbar } from './_components/HomeNavbar';
import './home.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${archivo.variable} nh-home flex min-h-screen flex-col bg-paper font-archivo text-ink antialiased`}
    >
      <HomeNavbar />
      <main className="flex-1">{children}</main>
      <HomeFooter />
    </div>
  );
}
