import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google';
import { HomeFooter } from './_components/HomeFooter';
import { HomeNavbar } from './_components/HomeNavbar';
import './home.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${fraunces.variable} ${instrumentSans.variable} ${plexMono.variable} nh-home relative flex min-h-screen flex-col bg-paper font-text text-ink antialiased`}
    >
      <div aria-hidden="true" className="nh-grain" />
      <HomeNavbar />
      <main className="flex-1">{children}</main>
      <HomeFooter />
    </div>
  );
}
