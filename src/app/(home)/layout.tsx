import { Hanken_Grotesk, Instrument_Serif, Syne } from 'next/font/google';
import { HomeFooter } from './_components/HomeFooter';
import { HomeNavbar } from './_components/HomeNavbar';
import './home.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-hanken',
  display: 'swap',
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${syne.variable} ${instrumentSerif.variable} ${hanken.variable} nh-home relative flex min-h-screen flex-col overflow-x-clip bg-canvas font-text font-light text-fg antialiased`}
    >
      <div aria-hidden="true" className="nh-curtain" />
      <div aria-hidden="true" className="nh-grain" />
      <HomeNavbar />
      <main className="flex-1">{children}</main>
      <HomeFooter />
    </div>
  );
}
